import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, Users, MessageSquare, AlertTriangle } from "lucide-react";

const navItems = [
  { title: "대시보드", url: "/admin", icon: LayoutDashboard },
  { title: "사용자 관리", url: "/admin/users", icon: Users },
  { title: "대화 모니터링", url: "/admin/conversations", icon: MessageSquare },
  { title: "긴급 신고", url: "/admin/emergencies", icon: AlertTriangle },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="w-[280px] border-r border-border bg-card" collapsible="icon">
          <div className="flex h-14 items-center gap-2 border-b border-border px-4">
            <span className="type-headline text-primary">5060 관리자</span>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="type-caption text-muted-foreground/60">메뉴</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end={item.url === "/admin"}
                          className="hover:bg-accent rounded-[8px] transition-colors"
                          activeClassName="bg-accent text-primary font-medium"
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-6">
            <SidebarTrigger />
            <span className="type-callout text-muted-foreground">관리자 대시보드</span>
          </header>
          <main className="flex-1 overflow-y-auto bg-background">
            <div className="mx-auto max-w-[1200px] p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
