import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export interface WarningModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  onCancel: () => void
}

export function WarningModal({ open, onOpenChange, onConfirm, onCancel }: WarningModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        onInteractOutside={(e) => e.preventDefault()} 
        className="sm:max-w-[420px] p-0 overflow-hidden rounded-[20px]"
      >
        <div className="bg-warning/10 p-5 flex items-start gap-4 border-b border-warning/20">
          <AlertCircle className="w-8 h-8 text-warning shrink-0" />
          <div className="space-y-1">
            <DialogTitle className="type-headline font-bold text-foreground">
              안전 확인이 필요합니다
            </DialogTitle>
            <DialogDescription className="type-body text-foreground/80">
              위험한 상황이신가요? 연락이나 도움이 필요하신지 알려주세요.
            </DialogDescription>
          </div>
        </div>
        <DialogFooter className="p-5 flex-col space-y-3 sm:space-x-0 sm:space-y-3">
          <Button 
            size="lg" 
            variant="default" 
            onClick={onConfirm}
            className="w-full bg-emergency shadow-1 hover:bg-emergency/90 active:bg-emergency/80 text-white border-0 type-callout font-bold rounded-[12px]"
          >
            도움 받기 / 연락
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={onCancel}
            className="w-full type-callout rounded-[12px]"
          >
            괜찮아요
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
