import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { mockAdminEmergencies } from "@/data/mockData";

const statusFilters = ["전체", "접수", "처리중", "완료"] as const;

export default function EmergenciesManagement() {
  const [filter, setFilter] = useState<string>("전체");

  const filtered = filter === "전체"
    ? mockAdminEmergencies
    : mockAdminEmergencies.filter((e) => e.status === filter);

  return (
    <AdminLayout>
      <h1 className="mb-6 type-display text-foreground">긴급 신고 관리</h1>

      <div className="mb-4 flex gap-2">
        {statusFilters.map((s) => (
          <Button
            key={s}
            variant={filter === s ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(s)}
            className="rounded-full"
          >
            {s}
          </Button>
        ))}
      </div>

      <div className="rounded-[12px] border border-border bg-card shadow-1 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="h-[44px] type-callout font-semibold">사용자</TableHead>
              <TableHead className="h-[44px] type-callout font-semibold">유형</TableHead>
              <TableHead className="h-[44px] type-callout font-semibold">일시</TableHead>
              <TableHead className="h-[44px] type-callout font-semibold">상태</TableHead>
              <TableHead className="h-[44px] type-callout font-semibold">설명</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((e, i) => (
              <TableRow key={e.id} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <TableCell className="h-[44px] type-callout font-medium">{e.userName}</TableCell>
                <TableCell className="h-[44px]">
                  <span className={`rounded-full px-2 py-1 type-caption ${
                    e.type === "119" ? "bg-destructive/10 text-destructive" :
                    e.type === "경찰" ? "bg-primary/10 text-primary" :
                    "bg-warning/10 text-warning"
                  }`}>{e.type}</span>
                </TableCell>
                <TableCell className="h-[44px] type-caption">{e.date}</TableCell>
                <TableCell className="h-[44px]">
                  <span className={`rounded-full px-2 py-1 type-caption ${
                    e.status === "완료" ? "bg-success/10 text-success" :
                    e.status === "처리중" ? "bg-warning/10 text-warning" :
                    "bg-destructive/10 text-destructive"
                  }`}>{e.status}</span>
                </TableCell>
                <TableCell className="h-[44px] type-caption text-muted-foreground">{e.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
