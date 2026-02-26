import { useState, useCallback, useRef } from "react";
import { GoogleGenAI } from "@google/genai";

// Gemini configuration
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function useSpeech() {
  const [isListening, setIsListening] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  // STT: Gemini 멀티모달 프롬프트 활용
  const listen = useCallback(async (onResult: (text: string) => void) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsListening(false);
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

        try {
          const base64Audio = await blobToBase64(audioBlob);
          const response = await ai.models.generateContent({
             model: "gemini-2.0-flash",
             contents: [
               { role: 'user', parts: [
                 { text: "사용자의 음성 메시지를 가능한 한 한국어로 정확하게 받아쓰세요. 어떠한 추가적인 설명이나 인사말 없이 오직 변환된 텍스트만 출력하세요." },
                 { inlineData: { data: base64Audio, mimeType: "audio/webm" } }
               ]}
             ]
          });
          if (response.text) {
            onResult(response.text.trim());
          }
        } catch (error) {
          console.error("Gemini STT Error:", error);
        }

        // Cleanup tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (err) {
      console.error("Microphone access denied or error:", err);
      alert("마이크 접근이 거부되었거나 오류가 발생했습니다.");
    }
  }, []);

  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  // TTS: Web Speech API (브라우저 내장)
  const speak = useCallback(async (text: string) => {
    try {
      stopSpeaking();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ko-KR";
      
      // 약간의 지연 후 목소리 설정 (크롬 버그 워크어라운드)
      setTimeout(() => {
        const voices = window.speechSynthesis.getVoices();
        const koreanVoice = voices.find(voice => voice.lang.includes("ko"));
        if (koreanVoice) {
          utterance.voice = koreanVoice;
        }
        window.speechSynthesis.speak(utterance);
      }, 50);
    } catch (error) {
      console.error("TTS Error:", error);
    }
  }, [stopSpeaking]);

  return {
    isListening,
    listen,
    stopListening,
    speak,
    stopSpeaking,
  };
}
