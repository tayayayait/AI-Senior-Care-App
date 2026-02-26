import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/mobile/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Heart, Shield, User } from "lucide-react";
import { mockUser, mockHealthTips } from "@/data/mockData";
import { EmergencyButton } from "@/components/patterns/EmergencyButton";

export default function HomePage() {
  const navigate = useNavigate();
  const tip = mockHealthTips[Math.floor(Math.random() * mockHealthTips.length)];

  return (
    <MobileLayout>
      {/* App Bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-card px-4">
        <span className="type-headline text-primary">5060 케어</span>
        <button
          onClick={() => navigate("/settings")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent transition-colors hover:bg-accent/80"
        >
          <User className="h-5 w-5 text-primary" />
        </button>
      </header>

      <div className="space-y-4 p-4 animate-slide-up">
        {/* Greeting */}
        <Card className="border-0 bg-primary shadow-2 rounded-[16px] overflow-hidden">
          <CardContent className="p-5">
            <p className="type-body text-primary-foreground/80">안녕하세요,</p>
            <h2 className="type-title text-primary-foreground">
              {mockUser.name}님, 오늘 하루는 어떠셨나요?
            </h2>
            <p className="mt-3 type-caption text-primary-foreground/70">
              <Heart className="mr-1 inline h-4 w-4" />
              {tip}
            </p>
          </CardContent>
        </Card>

        {/* Quick Menu */}
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="cursor-pointer border-border bg-card rounded-[16px] shadow-1 transition-all duration-200 hover:shadow-2 active:scale-[0.98]"
            onClick={() => navigate("/chat")}
          >
            <CardContent className="flex flex-col items-center gap-3 p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                <MessageCircle className="h-7 w-7 text-primary" />
              </div>
              <span className="type-callout font-semibold text-foreground">AI 대화</span>
              <span className="type-caption text-muted-foreground">마음 이야기 나누기</span>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer border-border bg-card rounded-[16px] shadow-1 transition-all duration-200 hover:shadow-2 active:scale-[0.98]"
            onClick={() => navigate("/emergency")}
          >
            <CardContent className="flex flex-col items-center gap-3 p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emergency/10">
                <Shield className="h-7 w-7 text-emergency" />
              </div>
              <span className="type-callout font-semibold text-foreground">긴급 연락</span>
              <span className="type-caption text-muted-foreground">빠른 도움 요청</span>
            </CardContent>
          </Card>
        </div>

        {/* Emergency contacts preview */}
        <Card className="border-border bg-card rounded-[16px] shadow-1">
          <CardContent className="p-5">
            <h3 className="mb-3 type-headline text-foreground">비상 연락처</h3>
            {mockUser.emergencyContacts.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="type-callout font-medium text-foreground">{c.name}</p>
                  <p className="type-caption text-muted-foreground">{c.relation}</p>
                </div>
                <a href={`tel:${c.phone}`} className="type-callout text-primary font-medium hover:underline">
                  {c.phone}
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Floating emergency button */}
      <EmergencyButton className="fixed bottom-[88px] left-1/2 z-50 flex w-[calc(100%-32px)] max-w-[382px] -translate-x-1/2" />
    </MobileLayout>
  );
}
