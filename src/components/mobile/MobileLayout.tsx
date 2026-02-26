import { useLocation, useNavigate } from "react-router-dom";
import { Home, MessageCircle, Shield, Settings } from "lucide-react";

const tabs = [
  { path: "/home", label: "홈", icon: Home },
  { path: "/chat", label: "AI대화", icon: MessageCircle },
  { path: "/emergency", label: "안전", icon: Shield },
  { path: "/settings", label: "설정", icon: Settings },
];

interface MobileLayoutProps {
  children: React.ReactNode;
  hideTabBar?: boolean;
}

export default function MobileLayout({ children, hideTabBar }: MobileLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex min-h-screen max-w-[414px] flex-col bg-background">
      <div className="flex-1 overflow-y-auto pb-[72px]">{children}</div>

      {!hideTabBar && (
        <nav className="fixed bottom-0 left-1/2 z-50 flex h-[72px] w-full max-w-[414px] -translate-x-1/2 items-center justify-around border-t border-border bg-card shadow-[0_-2px_8px_rgba(23,43,77,0.06)]">
          {tabs.map((tab) => {
            const active = location.pathname === tab.path || (tab.path === "/home" && location.pathname === "/");
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex min-h-[48px] flex-col items-center justify-center gap-[2px] px-3 transition-colors duration-200 ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <tab.icon className="h-6 w-6" />
                <span className="text-[12px] font-medium leading-[16px]">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
