import { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";

export const useWebcamPredict = (apiUrl = "https://dusty-noel-negihimanshu015-8d53b982.koyeb.app/predict") => {
    const [accuracy, setAccuracy] = useState(0);
    const [prediction, setPrediction] = useState("");
    const [isPredicting, setIsPredicting] = useState(false);
    const webcamRef = useRef(null);

    const captureAndPredict = useCallback(async () => {
        if (!webcamRef.current) return;
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;

        const byteString = atob(imageSrc.split(',')[1]);
        const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });

        const formData = new FormData();
        formData.append("file", blob, "frame.jpg");

        try {
            const response = await axios.post(apiUrl, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.sign === "no_hand") {
                setPrediction("No hand detected");
                setAccuracy(0);
            } else {
                setPrediction(response.data.sign);
                setAccuracy(Math.round(response.data.confidence * 100));
            }
        } catch (error) {
            console.error("Prediction error:", error);
            setPrediction("Error in prediction");
            setAccuracy(0);
        }
    }, [apiUrl]);

    useEffect(() => {
        let interval;
        if (isPredicting) {
            interval = setInterval(captureAndPredict, 1000);
        }
        return () => clearInterval(interval);
    }, [isPredicting, captureAndPredict]);

    return { accuracy, prediction, isPredicting, setIsPredicting, webcamRef };
};
