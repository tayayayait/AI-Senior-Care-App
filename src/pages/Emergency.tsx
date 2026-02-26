import { useEmergency } from "@/hooks/use-emergency";
import MobileLayout from "@/components/mobile/MobileLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { EmergencyButton } from "@/components/patterns/EmergencyButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Emergency() {
  const {
    contacts,
    confirmType,
    countdown,
    goBack,
    openConfirm,
    closeConfirm,
    startCountdown,
    cancelCountdown,
  } = useEmergency();

  return (
    <MobileLayout>
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-card px-4">
        <button onClick={goBack} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <span className="type-headline text-foreground">긴급 신고</span>
      </header>

      <div className="space-y-4 p-4 animate-slide-up">
        <p className="type-body text-muted-foreground">
          위급한 상황에서 빠르게 도움을 요청하세요.
        </p>

        {/* 119 */}
        <EmergencyButton className="w-full mb-4" />

        {/* Police */}
        <button
          onClick={() => openConfirm("112")}
          className="flex h-16 w-full items-center justify-center gap-3 rounded-[12px] bg-primary text-primary-foreground shadow-2 transition-all duration-200 active:scale-[0.98]"
        >
          <Shield className="h-6 w-6" />
          <span className="type-headline">112 경찰 연결</span>
        </button>

        {/* Emergency contacts */}
        <div className="mt-6">
          <h3 className="mb-3 type-headline text-foreground">비상 연락처</h3>
          {contacts.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-[12px] border border-border bg-card p-4 mb-3 shadow-1 transition-all">
              <div>
                <p className="type-callout font-semibold text-foreground">{c.name}</p>
                <p className="type-caption text-muted-foreground">{c.relation}</p>
              </div>
              <a
                href={`tel:${c.phone}`}
                className="flex h-10 items-center rounded-[8px] bg-primary px-4 text-primary-foreground type-callout font-medium hover:bg-primary/90 transition-colors"
              >
                전화
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Modal */}
      <Dialog open={!!confirmType && countdown === null} onOpenChange={() => closeConfirm()}>
        <DialogContent className="mx-auto max-w-[360px] rounded-[20px]">
          <DialogHeader>
            <DialogTitle className="type-title">정말 신고하시겠습니까?</DialogTitle>
            <DialogDescription className="type-body text-muted-foreground">
              {confirmType === "119" ? "119 소방/구급" : "112 경찰"}에 연결됩니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button className="h-[48px] w-full rounded-[12px] bg-emergency text-emergency-foreground type-headline hover:bg-emergency/90" onClick={startCountdown}>
              네, 신고합니다
            </Button>
            <Button variant="outline" className="h-[48px] w-full rounded-[12px]" onClick={closeConfirm}>
              취소
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Countdown */}
      <Dialog open={countdown !== null} onOpenChange={() => {}}>
        <DialogContent className="mx-auto max-w-[360px] rounded-[20px]" onPointerDownOutside={(e) => e.preventDefault()}>
          <div className="flex flex-col items-center py-6">
            <p className="mb-4 type-body text-muted-foreground">연결 중...</p>
            <span className="mb-4 text-6xl font-bold text-emergency">{countdown}</span>
            <Button variant="outline" className="h-[48px] w-full rounded-[12px]" onClick={cancelCountdown}>
              취소
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
