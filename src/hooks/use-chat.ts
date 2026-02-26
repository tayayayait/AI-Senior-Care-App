import { useState, useCallback } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});

export interface Message {
  id: string;
  text: string;
  role: "user" | "ai";
  timestamp: string;
}

const formatTime = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "오후" : "오전";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0시는 12시로
  const strMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${ampm} ${hours}:${strMinutes}`;
};

/**
 * AI 응답에서 마크다운 서식 기호를 제거합니다.
 * **, *, #, ```, - (목록) 등을 plain text로 변환합니다.
 */
function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, (match) => match.replace(/```/g, "").trim()) // 코드 블록
    .replace(/`([^`]+)`/g, "$1")      // 인라인 코드
    .replace(/\*\*([^*]+)\*\*/g, "$1") // 볼드
    .replace(/\*([^*]+)\*/g, "$1")     // 이탤릭
    .replace(/^#{1,6}\s+/gm, "")       // 헤딩 (#, ##, ### ...)
    .replace(/^[-*]\s+/gm, "• ")       // 목록 기호 → 한글 친화 점
    .replace(/^\d+\.\s+/gm, (m) => m)  // 번호 목록은 유지
    .trim();
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const append = useCallback(async (content: string) => {
    // 1. 사용자 메시지 추가
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: content,
      role: "user",
      timestamp: formatTime(new Date()),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // 2. Gemini API 스트리밍 요청
      const systemInstruction = `당신은 5060 시니어를 돕는 다정하고 친절한 AI 비서입니다.
어려운 전문 용어를 피하고, 이해하기 쉬운 단어로 공감하며 대답해주세요.
한 번에 너무 길게 답변하지 말고 대화하듯 짧고 명확하게 답변하세요.

[중요] 다음 규칙을 반드시 지켜주세요:
- 절대로 마크다운 서식(**, *, #, \`\`\`, - 등)을 사용하지 마세요.
- 강조할 때는 마크다운 대신 자연스러운 한국어 표현(큰따옴표, 느낌표 등)으로 표현하세요.
- 모든 답변을 일반 텍스트(plain text)로만 작성하세요.`;

      const contents = messages.map(m => ({
          role: m.role === "ai" ? "model" : "user",
          parts: [{ text: m.text }]
      }));
      contents.push({ role: "user", parts: [{ text: content }] });

      const stream = await ai.models.generateContentStream({
        model: "gemini-2.0-flash",
        contents,
        config: { systemInstruction }
      });

      // 3. AI 답변을 담을 임시 메시지 객체 생성 (스트리밍 시 업데이트)
      const aiMessageId = crypto.randomUUID();
      let aiText = "";

      setMessages((prev) => [
        ...prev,
        {
          id: aiMessageId,
          text: "",
          role: "ai",
          timestamp: formatTime(new Date()),
        },
      ]);
      
      setIsTyping(false);

      // 4. 스트림 읽으며 내용 업데이트 + 마크다운 strip
      for await (const chunk of stream) {
        const delta = chunk.text || "";
        if (delta) {
          aiText += delta;
          setMessages((prev) => 
            prev.map((msg) => 
              msg.id === aiMessageId ? { ...msg, text: stripMarkdown(aiText) } : msg
            )
          );
        }
      }

    } catch (error) {
      console.error("Gemini Chat Error:", error);
      setIsTyping(false);
    }
  }, [messages]);

  return {
    messages,
    isTyping,
    append,
  };
}
