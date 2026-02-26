import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const [form, setForm] = useState({ name: "", phone: "", emergencyName: "", emergencyPhone: "" });
  const navigate = useNavigate();

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-[414px] flex-col bg-background px-6">
      <div className="flex flex-1 flex-col justify-center">
        <h1 className="mb-2 type-display text-foreground">회원가입</h1>
        <p className="mb-8 type-body text-muted-foreground">
          간단한 정보를 입력해주세요
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="type-callout font-medium text-foreground">이름</Label>
            <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} className="h-[52px] rounded-[12px] border-border bg-card text-[17px] shadow-1 focus:border-primary focus:ring-2 focus:ring-ring" placeholder="홍길동" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="type-callout font-medium text-foreground">전화번호</Label>
            <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="h-[52px] rounded-[12px] border-border bg-card text-[17px] shadow-1 focus:border-primary focus:ring-2 focus:ring-ring" placeholder="010-0000-0000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eName" className="type-callout font-medium text-foreground">비상 연락처 (이름)</Label>
            <Input id="eName" value={form.emergencyName} onChange={(e) => update("emergencyName", e.target.value)} className="h-[52px] rounded-[12px] border-border bg-card text-[17px] shadow-1 focus:border-primary focus:ring-2 focus:ring-ring" placeholder="보호자 이름" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ePhone" className="type-callout font-medium text-foreground">비상 연락처 (전화번호)</Label>
            <Input id="ePhone" type="tel" value={form.emergencyPhone} onChange={(e) => update("emergencyPhone", e.target.value)} className="h-[52px] rounded-[12px] border-border bg-card text-[17px] shadow-1 focus:border-primary focus:ring-2 focus:ring-ring" placeholder="010-0000-0000" />
          </div>

          <Button type="submit" className="h-[52px] w-full rounded-[12px] bg-primary text-[17px] font-semibold text-primary-foreground hover:bg-primary/90 shadow-1 transition-all duration-200">
            가입하기
          </Button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={() => navigate("/login")} className="type-callout text-primary hover:underline transition-colors">
            이미 계정이 있으신가요?
          </button>
        </div>
      </div>
    </div>
  );
}
