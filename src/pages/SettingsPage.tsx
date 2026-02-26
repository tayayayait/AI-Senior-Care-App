import { useSettings } from "@/hooks/use-settings";
import MobileLayout from "@/components/mobile/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, User, Phone, Bell, Type, LogOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function SettingsPage() {
  const {
    user,
    fontSize,
    setFontSize,
    notifications,
    setNotifications,
    deleteConfirm,
    deleteStep,
    openDeleteDialog,
    closeDeleteDialog,
    advanceDeleteStep,
    retreatDeleteStep,
    confirmDelete,
  } = useSettings();

  return (
    <MobileLayout>
      <header className="sticky top-0 z-40 flex h-14 items-center border-b border-border bg-card px-4">
        <span className="type-headline text-foreground">설정</span>
      </header>

      <div className="space-y-4 p-4 animate-slide-up">
        {/* Profile */}
        <Card className="border-border bg-card rounded-[16px] shadow-1">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                <User className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="type-headline text-foreground">{user.name}</p>
                <p className="type-callout text-muted-foreground">{user.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency contacts */}
        <Card className="border-border bg-card rounded-[16px] shadow-1">
          <CardContent className="p-5">
            <h3 className="mb-3 flex items-center gap-2 type-headline text-foreground">
              <Phone className="h-5 w-5 text-primary" />
              비상 연락처 관리
            </h3>
            {user.emergencyContacts.map((c) => (
              <div key={c.id} className="flex items-center justify-between border-b border-border py-3 last:border-0">
                <div>
                  <p className="type-callout font-medium">{c.name} ({c.relation})</p>
                  <p className="type-caption text-muted-foreground">{c.phone}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Font size */}
        <Card className="border-border bg-card rounded-[16px] shadow-1">
          <CardContent className="p-5">
            <h3 className="mb-3 flex items-center gap-2 type-headline text-foreground">
              <Type className="h-5 w-5 text-primary" />
              글자 크기
            </h3>
            <div className="flex items-center gap-4">
              <span className="type-caption text-muted-foreground">작게</span>
              <input
                type="range"
                min={14}
                max={24}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="flex-1 accent-primary h-2 rounded-full"
              />
              <span className="type-body text-foreground">크게</span>
            </div>
            <p className="mt-2 type-caption text-muted-foreground">현재: {fontSize}px</p>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border bg-card rounded-[16px] shadow-1">
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <span className="type-callout font-medium">알림 설정</span>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </CardContent>
        </Card>

        {/* Delete account */}
        <Button
          variant="ghost"
          className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive rounded-[12px]"
          onClick={openDeleteDialog}
        >
          <LogOut className="mr-2 h-4 w-4" />
          회원 탈퇴
        </Button>
      </div>

      {/* Delete confirmation */}
      <Dialog open={deleteConfirm} onOpenChange={closeDeleteDialog}>
        <DialogContent className="mx-auto max-w-[360px] rounded-[20px]">
          <DialogHeader>
            <DialogTitle className="type-title text-destructive">
              {deleteStep === 1 ? "회원 탈퇴" : "정말로 탈퇴하시겠습니까?"}
            </DialogTitle>
            <DialogDescription className="type-body text-muted-foreground">
              {deleteStep === 1
                ? "탈퇴하시면 모든 데이터가 삭제되며 복구할 수 없습니다."
                : "이 작업은 되돌릴 수 없습니다. 정말로 진행하시겠습니까?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            {deleteStep === 1 ? (
              <>
                <Button className="h-[48px] w-full rounded-[12px] bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={advanceDeleteStep}>
                  탈퇴 진행
                </Button>
                <Button variant="outline" className="h-[48px] w-full rounded-[12px]" onClick={closeDeleteDialog}>
                  취소
                </Button>
              </>
            ) : (
              <>
                <Button className="h-[48px] w-full rounded-[12px] bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={confirmDelete}>
                  최종 탈퇴
                </Button>
                <Button variant="outline" className="h-[48px] w-full rounded-[12px]" onClick={retreatDeleteStep}>
                  돌아가기
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
