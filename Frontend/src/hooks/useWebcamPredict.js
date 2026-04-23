import { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const useWebcamPredict = (targetSign, apiUrl = `${API_BASE_URL}/predict`) => {
    const [accuracy, setAccuracy] = useState(0);
    const [prediction, setPrediction] = useState("");
    const [isPredicting, setIsPredicting] = useState(false);
    const [streak, setStreak] = useState(0);
    const streakRequired = 4;
    const [isConfirmed, setIsConfirmed] = useState(false);
    const webcamRef = useRef(null);
    const isFetchingRef = useRef(false);

    const resetStreak = useCallback(() => {
        setStreak(0);
        setIsConfirmed(false);
    }, []);

    const captureAndPredict = useCallback(async () => {
        // Prevent overlapping requests
        if (!webcamRef.current || isConfirmed || isFetchingRef.current) return;
        
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;

        isFetchingRef.current = true;

        try {
            // More efficient way to convert data URL to Blob
            const response_blob = await fetch(imageSrc);
            const blob = await response_blob.blob();

            const formData = new FormData();
            formData.append("file", blob, "frame.jpg");

            const response = await axios.post(apiUrl, formData);

            const detectedSign = response.data.sign;
            const confidence = response.data.confidence;
            const confidencePct = Math.round(confidence * 100);

            setPrediction(detectedSign === "no_hand" ? "No hand detected" : detectedSign);
            setAccuracy(confidencePct);

            if (detectedSign === targetSign && confidence >= 0.70) {
                setStreak(prev => {
                    const next = prev + 1;
                    if (next >= streakRequired) {
                        setIsConfirmed(true);
                    }
                    return next;
                });
            } else {
                setStreak(0);
            }
        } catch (error) {
            console.error("Prediction error:", error);
            setPrediction("Error");
            setAccuracy(0);
            setStreak(0);
        } finally {
            isFetchingRef.current = false;
        }
    }, [apiUrl, targetSign, isConfirmed, streakRequired]);

    useEffect(() => {
        let timer;
        if (isPredicting && !isConfirmed) {
            const run = async () => {
                await captureAndPredict();
                // Schedule next run only after the current one finishes
                timer = setTimeout(run, 400);
            };
            run();
        }
        return () => clearTimeout(timer);
    }, [isPredicting, captureAndPredict, isConfirmed]);

    return {
        accuracy,
        prediction,
        isPredicting,
        setIsPredicting,
        webcamRef,
        streak,
        streakRequired,
        isConfirmed,
        setIsConfirmed,
        resetStreak
    };
};


