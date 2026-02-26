import * as React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Phone, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function EmergencyButton({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  const [countdown, setCountdown] = React.useState(3)
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
  const currentAddressRef = React.useRef<string>("위치 확인 중...")
  const { toast } = useToast()

  const handleStartEmergency = () => {
    setOpen(true)
    setCountdown(3)

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          let address = `위도: ${latitude}, 경도: ${longitude}`;
          
          const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
          if (apiKey) {
            try {
              const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&language=ko`);
              const data = await res.json();
              if (data.results && data.results.length > 0) {
                address = data.results[0].formatted_address;
              }
            } catch (err) {
              console.error("Geocoding Error:", err);
            }
          }
          currentAddressRef.current = address;
        },
        (error) => {
          console.error("Geolocation Error:", error);
          currentAddressRef.current = "위치를 가져올 수 없습니다.";
        }
      );
    }
  }

  const handleCancel = () => {
    setOpen(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  React.useEffect(() => {
    if (open) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            setOpen(false)
            toast({
              variant: "destructive",
              title: "신고 접수 완료",
              description: `119에 구조 요청을 보냈습니다. (위치: ${currentAddressRef.current})`,
              duration: 5000,
            })
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [open, toast])


  return (
    <div className={className}>
      <Button 
        onClick={handleStartEmergency}
        className="h-16 w-full rounded-[16px] bg-emergency text-emergency-foreground hover:bg-emergency/90 active:bg-emergency/80 active:scale-[0.98] shadow-2 transition-all duration-200"
      >
        <Phone className="mr-2 h-6 w-6" />
        <span className="text-[18px] font-bold leading-[26px] tracking-tight">긴급 신고 (119)</span>
      </Button>

      <Dialog open={open} onOpenChange={handleCancel}>
        <DialogContent 
          onInteractOutside={(e) => e.preventDefault()}
          className="text-center rounded-[20px]"
        >
          <DialogHeader className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-emergency/10 p-4">
              <AlertTriangle className="h-12 w-12 text-emergency animate-pulse" />
            </div>
            <DialogTitle className="type-title">긴급 신고 접수 중</DialogTitle>
            <DialogDescription className="type-body">
              {countdown}초 후 119로 자동 연결 및 <br/>위치가 전송됩니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 sm:justify-center flex-col sm:flex-col sm:space-x-0 w-full gap-2">
            <Button size="lg" variant="outline" className="w-full type-callout font-bold h-12 rounded-[12px]" onClick={handleCancel}>
              취소하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
