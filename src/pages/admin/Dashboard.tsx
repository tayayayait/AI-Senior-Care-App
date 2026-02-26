import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminStats, mockAdminEmergencies, mockAdminUsers } from "@/data/mockData";
import { Users, MessageSquare, AlertTriangle, Phone } from "lucide-react";

const statCards = [
  { label: "총 사용자", value: adminStats.totalUsers, icon: Users, color: "text-primary" },
  { label: "오늘 대화 수", value: adminStats.todayChats, icon: MessageSquare, color: "text-info" },
  { label: "위험 감지", value: adminStats.riskDetections, icon: AlertTriangle, color: "text-warning" },
  { label: "긴급 신고", value: adminStats.emergencyReports, icon: Phone, color: "text-emergency" },
];

export default function Dashboard() {
  return (
    <AdminLayout>
      <h1 className="mb-6 type-display text-foreground">대시보드</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <Card key={s.label} className="border-border bg-card rounded-[12px] shadow-1 hover:shadow-2 transition-shadow">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-accent">
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
              <div>
                <p className="type-caption text-muted-foreground">{s.label}</p>
                <p className="type-title text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent risk alerts */}
        <Card className="border-border bg-card rounded-[12px] shadow-1">
          <CardHeader>
            <CardTitle className="type-headline text-foreground">최근 위험 감지</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockAdminEmergencies.slice(0, 3).map((e) => (
              <div key={e.id} className="flex items-start justify-between rounded-[8px] border border-border p-3">
                <div>
                  <p className="type-callout font-medium text-foreground">{e.userName}</p>
                  <p className="type-caption text-muted-foreground">{e.description}</p>
                </div>
                <span className={`type-caption rounded-full px-2 py-1 ${
                  e.status === "완료" ? "bg-success/10 text-success" :
                  e.status === "처리중" ? "bg-warning/10 text-warning" :
                  "bg-destructive/10 text-destructive"
                }`}>{e.status}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent users */}
        <Card className="border-border bg-card rounded-[12px] shadow-1">
          <CardHeader>
            <CardTitle className="type-headline text-foreground">최근 가입 사용자</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockAdminUsers.slice(-4).reverse().map((u) => (
              <div key={u.id} className="flex items-center justify-between rounded-[8px] border border-border p-3">
                <div>
                  <p className="type-callout font-medium text-foreground">{u.name}</p>
                  <p className="type-caption text-muted-foreground">가입: {u.joinDate}</p>
                </div>
                <span className={`type-caption rounded-full px-2 py-1 ${
                  u.status === "활성" ? "bg-success/10 text-success" :
                  u.status === "주의" ? "bg-warning/10 text-warning" :
                  "bg-muted text-muted-foreground"
                }`}>{u.status}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
