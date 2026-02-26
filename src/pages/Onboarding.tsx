import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Shield, MessageCircle } from "lucide-react";

const slides = [
  {
    icon: Heart,
    title: "따뜻한 AI 감성 대화",
    description: "매일 당신의 이야기를 들어드립니다.\n혼자가 아니에요, 언제든 말씀해주세요.",
  },
  {
    icon: MessageCircle,
    title: "마음 건강 챙기기",
    description: "일상 대화를 통해 마음의 변화를 살피고\n필요할 때 전문가 도움을 연결해드려요.",
  },
  {
    icon: Shield,
    title: "긴급 안전망",
    description: "위급한 상황에서 119, 경찰, 비상연락처에\n빠르게 도움을 요청할 수 있어요.",
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  if (step < 0) setStep(0);

  const isLast = step === slides.length - 1;
  const slide = slides[step];

  return (
    <div className="mx-auto flex min-h-screen max-w-[414px] flex-col bg-background">
      {/* Splash area */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 animate-fade-in">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-accent">
          <slide.icon className="h-10 w-10 text-primary" />
        </div>

        {step === 0 && (
          <p className="mb-2 type-caption text-muted-foreground tracking-wider uppercase">5060 시니어 케어</p>
        )}

        <h1 className="mb-4 text-center type-display text-foreground">{slide.title}</h1>
        <p className="mb-10 whitespace-pre-line text-center type-body text-muted-foreground">
          {slide.description}
        </p>

        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === step ? "w-7 bg-primary" : "w-2.5 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-10">
        {isLast ? (
          <Button
            onClick={() => navigate("/login")}
            className="h-[52px] w-full rounded-[12px] text-[17px] font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-1 transition-all duration-200"
          >
            시작하기
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="h-[52px] flex-1 text-muted-foreground hover:bg-muted/50"
            >
              건너뛰기
            </Button>
            <Button
              onClick={() => setStep(step + 1)}
              className="h-[52px] flex-1 rounded-[12px] text-[17px] font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-1 transition-all duration-200"
            >
              다음
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
