import { useState, useRef, useEffect } from "react";
import MobileLayout from "@/components/mobile/MobileLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Mic, Square } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AIChat } from "@/components/patterns/AIChat";
import { WarningModal } from "@/components/patterns/WarningModal";
import { useChat } from "@/hooks/use-chat";
import { useSpeech } from "@/hooks/use-speech";
import { useToast } from "@/hooks/use-toast";

const RISK_KEYWORDS = ["죽고싶", "자살", "죽을", "힘들어", "못살겠"];

export default function Chat() {
  const navigate = useNavigate();
  const { messages, isTyping, append } = useChat();
  const { isListening, listen, stopListening, speak, stopSpeaking } = useSpeech();
  const [input, setInput] = useState("");
  const [riskModalOpen, setRiskModalOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const detectRisk = (text: string) =>
    RISK_KEYWORDS.some((kw) => text.includes(kw));

  const sendMessage = async (text: string = input) => {
    if (!text.trim()) return;
    
    setInput("");
    
    if (detectRisk(text)) {
      setRiskModalOpen(true);
    }
    
    await append(text);
  };

  // When AI replies, speak the last message if it's from AI
  useEffect(() => {
    if (!isTyping && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === "ai" && lastMsg.text) {
        speak(lastMsg.text);
      }
    }
  }, [messages, isTyping, speak]);

  const toggleListen = () => {
    if (isListening) {
      stopListening();
    } else {
      listen((transcript) => {
        setInput(transcript);
        sendMessage(transcript);
      });
    }
  };

  return (
    <MobileLayout hideTabBar>
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-card px-4">
        <button onClick={() => { stopSpeaking(); navigate("/home"); }} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <span className="type-headline text-foreground">AI 감성 대화</span>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-44 bg-background">
        <AIChat messages={messages} isTyping={isTyping} />
        <div ref={bottomRef} className="h-4" />
      </div>

      <div className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-[414px] -translate-x-1/2 items-center gap-2 border-t border-border bg-card px-3 py-3 shadow-[0_-2px_8px_rgba(23,43,77,0.06)]">
        <Button 
          variant={isListening ? "destructive" : "secondary"} 
          size="icon" 
          onClick={toggleListen}
          className={`h-14 w-14 shrink-0 rounded-xl ${isListening ? 'bg-emergency hover:bg-emergency/90' : 'bg-accent text-primary hover:bg-accent/80'}`}
        >
          {isListening ? <Square className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="여기에 말씀하세요..."
          className="flex-1 rounded-xl border-2 border-border bg-card px-4 py-4 text-[17px] outline-none ring-ring transition-colors focus:border-primary focus:ring-2"
        />
        <Button onClick={() => sendMessage()} size="icon" className="h-14 w-14 shrink-0 rounded-xl bg-primary hover:bg-primary/90">
          <Send className="h-6 w-6" />
        </Button>
      </div>

      <WarningModal
        open={riskModalOpen}
        onOpenChange={setRiskModalOpen}
        onConfirm={() => {
          setRiskModalOpen(false);
          toast({
            variant: "destructive",
            title: "보호자 알림 전송",
            description: "보호자에게 긴급 알림 SMS가 전송되었습니다.",
          });
        }}
        onCancel={() => setRiskModalOpen(false)}
      />
    </MobileLayout>
  );
}
