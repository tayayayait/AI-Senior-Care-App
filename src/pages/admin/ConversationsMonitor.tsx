import AdminLayout from "@/components/admin/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockAdminConversations } from "@/data/mockData";

export default function ConversationsMonitor() {
  return (
    <AdminLayout>
      <h1 className="mb-6 type-display text-foreground">대화 모니터링</h1>

      <div className="rounded-[12px] border border-border bg-card shadow-1 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="h-[44px] type-callout font-semibold">사용자</TableHead>
              <TableHead className="h-[44px] type-callout font-semibold">날짜</TableHead>
              <TableHead className="h-[44px] type-callout font-semibold">메시지 수</TableHead>
              <TableHead className="h-[44px] type-callout font-semibold">위험</TableHead>
              <TableHead className="h-[44px] type-callout font-semibold">요약</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAdminConversations.map((c, i) => (
              <TableRow key={c.id} className={`${i % 2 === 1 ? "bg-muted/20" : ""} ${c.hasRisk ? "border-l-4 border-l-warning" : ""}`}>
                <TableCell className="h-[44px] type-callout font-medium">{c.userName}</TableCell>
                <TableCell className="h-[44px] type-caption">{c.date}</TableCell>
                <TableCell className="h-[44px] type-caption">{c.messageCount}</TableCell>
                <TableCell className="h-[44px]">
                  {c.hasRisk ? (
                    <div className="flex flex-wrap gap-1">
                      {c.riskKeywords.map((kw) => (
                        <Badge key={kw} variant="destructive" className="type-caption">
                          {kw}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="type-caption text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="h-[44px] type-caption text-muted-foreground">{c.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
