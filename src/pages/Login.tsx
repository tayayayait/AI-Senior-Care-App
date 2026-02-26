import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-[414px] flex-col bg-background px-6">
      <div className="flex flex-1 flex-col justify-center">
        <h1 className="mb-2 type-display text-foreground">로그인</h1>
        <p className="mb-10 type-body text-muted-foreground">
          전화번호로 간편하게 시작하세요
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="type-callout font-medium text-foreground">
              전화번호
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-[52px] rounded-[12px] border-border bg-card text-[17px] shadow-1 focus:border-primary focus:ring-2 focus:ring-ring"
              placeholder="010-0000-0000"
              autoComplete="tel"
            />
          </div>

          <Button
            type="submit"
            className="h-[52px] w-full rounded-[12px] bg-primary text-[17px] font-semibold text-primary-foreground hover:bg-primary/90 shadow-1 transition-all duration-200"
          >
            로그인
          </Button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/signup")}
            className="type-callout text-primary hover:underline transition-colors"
          >
            회원가입하기
          </button>
        </div>
      </div>
    </div>
  );
}
