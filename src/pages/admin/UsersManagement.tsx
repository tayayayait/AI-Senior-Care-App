import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockAdminUsers } from "@/data/mockData";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UsersManagement() {
  const [search, setSearch] = useState("");

  const filtered = mockAdminUsers.filter(
    (u) => u.name.includes(search) || u.phone.includes(search)
  );

  return (
    <AdminLayout>
      <h1 className="mb-6 type-display text-foreground">사용자 관리</h1>

      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="이름 또는 전화번호 검색"
            className="h-[44px] pl-10 text-[15px]"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20">
          <p className="mb-4 type-body text-muted-foreground">데이터 없음</p>
          <Button variant="outline" onClick={() => setSearch("")}>필터 초기화</Button>
        </div>
      ) : (
        <div className="rounded-[12px] border border-border bg-card shadow-1 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="h-[44px] type-callout font-semibold">이름</TableHead>
                <TableHead className="h-[44px] type-callout font-semibold">전화번호</TableHead>
                <TableHead className="h-[44px] type-callout font-semibold">가입일</TableHead>
                <TableHead className="h-[44px] type-callout font-semibold">최근활동</TableHead>
                <TableHead className="h-[44px] type-callout font-semibold">대화수</TableHead>
                <TableHead className="h-[44px] type-callout font-semibold">위험</TableHead>
                <TableHead className="h-[44px] type-callout font-semibold">상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u, i) => (
                <TableRow key={u.id} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                  <TableCell className="h-[44px] type-callout font-medium">{u.name}</TableCell>
                  <TableCell className="h-[44px] type-caption">{u.phone}</TableCell>
                  <TableCell className="h-[44px] type-caption">{u.joinDate}</TableCell>
                  <TableCell className="h-[44px] type-caption">{u.lastActive}</TableCell>
                  <TableCell className="h-[44px] type-caption">{u.totalChats}</TableCell>
                  <TableCell className="h-[44px]">
                    {u.riskCount > 0 && (
                      <span className="rounded-full bg-destructive/10 px-2 py-1 type-caption text-destructive">
                        {u.riskCount}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="h-[44px]">
                    <span className={`rounded-full px-2 py-1 type-caption ${
                      u.status === "활성" ? "bg-success/10 text-success" :
                      u.status === "주의" ? "bg-warning/10 text-warning" :
                      "bg-muted text-muted-foreground"
                    }`}>{u.status}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
}
