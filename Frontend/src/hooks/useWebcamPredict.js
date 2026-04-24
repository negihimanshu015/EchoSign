import { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");
const STREAK_REQUIRED = 8;
const POLL_INTERVAL_MS = 150;
const CONFIDENCE_THRESHOLD = 0.65;

export const useWebcamPredict = (targetSign, apiUrl = `${API_BASE_URL}/predict`) => {
    const [accuracy, setAccuracy] = useState(0);
    const [prediction, setPrediction] = useState("");
    const [isPredicting, setIsPredicting] = useState(false);
    const [streak, setStreak] = useState(0);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const webcamRef = useRef(null);

    // Refs so the polling loop always reads latest values without being recreated
    const isFetchingRef = useRef(false);
    const isConfirmedRef = useRef(false);
    const isPredictingRef = useRef(false);
    const targetSignRef = useRef(targetSign);
    const streakRef = useRef(0);
    const stopRef = useRef(false);

    // Keep refs in sync
    useEffect(() => { targetSignRef.current = targetSign; }, [targetSign]);
    useEffect(() => { isConfirmedRef.current = isConfirmed; }, [isConfirmed]);
    useEffect(() => { isPredictingRef.current = isPredicting; }, [isPredicting]);

    const resetStreak = useCallback(() => {
        streakRef.current = 0;
        setStreak(0);
        setIsConfirmed(false);
        isConfirmedRef.current = false;
    }, []);

    const captureAndPredict = useCallback(async () => {
        if (!webcamRef.current || isConfirmedRef.current || isFetchingRef.current) return;

        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;

        isFetchingRef.current = true;
        try {
            const response_blob = await fetch(imageSrc);
            const blob = await response_blob.blob();
            const formData = new FormData();
            formData.append("file", blob, "frame.jpg");

            const headers = {};
            const hfToken = import.meta.env.VITE_HF_TOKEN;
            if (hfToken) {
                headers["Authorization"] = `Bearer ${hfToken}`;
            }

            const response = await axios.post(apiUrl, formData, { headers });
            const detectedSign = response.data.sign;
            const confidence = response.data.confidence;
            const confidencePct = Math.round(confidence * 100);

            console.log(`Detected: ${detectedSign} (${confidencePct}%), Target: ${targetSignRef.current}`);
            setPrediction(detectedSign === "no_hand" ? "No hand detected" : detectedSign);
            setAccuracy(confidencePct);

            if (detectedSign === targetSignRef.current && confidence >= CONFIDENCE_THRESHOLD) {
                // Correct sign — increment streak
                const next = Math.min(streakRef.current + 1, STREAK_REQUIRED);
                streakRef.current = next;
                setStreak(next);
                if (next >= STREAK_REQUIRED) {
                    isConfirmedRef.current = true;
                    setIsConfirmed(true);
                }
            } else if (detectedSign === "no_hand") {
                // Lost tracking — ignore frame, don't punish
            } else {
                // Wrong sign — gentle decay
                const next = Math.max(0, streakRef.current - 1);
                streakRef.current = next;
                setStreak(next);
            }
        } catch (error) {
            // On 429 (rate limit) or network error — skip frame silently, never reset streak
            if (error?.response?.status !== 429) {
                console.warn("Prediction error:", error?.response?.status ?? error.message);
            }
        } finally {
            isFetchingRef.current = false;
        }
    }, [apiUrl]);

    // Self-contained polling loop — only starts/stops on isPredicting change
    useEffect(() => {
        if (!isPredicting) return;
        stopRef.current = false;

        const loop = async () => {
            if (stopRef.current) return;
            if (!isConfirmedRef.current) captureAndPredict(); // Don't await; poll at fixed frequency
            if (!stopRef.current) setTimeout(loop, POLL_INTERVAL_MS);
        };

        loop();
        return () => { stopRef.current = true; };
    }, [isPredicting, captureAndPredict]);

    return {
        accuracy,
        prediction,
        isPredicting,
        setIsPredicting,
        webcamRef,
        streak,
        streakRequired: STREAK_REQUIRED,
        isConfirmed,
        setIsConfirmed,
        resetStreak
    };
};


