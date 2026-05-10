import type { Metadata } from "next";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/data-table/data-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { PageHeader } from "@/components/feedback/page-header";
import { usersColumns } from "@/components/users/users-columns";
import { formatRelativeTime } from "@/lib/format";
import { mockKpiStats, mockRecentActivities, mockUsers } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "대시보드",
};

/**
 * 대시보드 홈 페이지
 * - KPI 카드 4개 (사용자/세션/매출/전환율)
 * - 최근 활동 리스트
 * - 사용자 데이터 테이블 (전체 보기 링크)
 */
export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="대시보드"
        description="주요 지표와 최근 활동을 한눈에 확인하세요."
        actions={
          <Button>
            <Plus className="mr-1 size-4" />
            새로 만들기
          </Button>
        }
      />

      <section
        aria-label="주요 지표"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {mockKpiStats.map((stat) => (
          <KpiCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            isCurrency={"isCurrency" in stat ? stat.isCurrency : false}
            isPercent={"isPercent" in stat ? stat.isPercent : false}
          />
        ))}
      </section>

      <section
        aria-label="최근 활동 및 사용자 목록"
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6"
      >
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">최근 활동</CardTitle>
            <CardDescription>팀 멤버의 최근 활동 내역</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-3">
              {mockRecentActivities.map((activity) => (
                <li
                  key={activity.id}
                  className="flex items-start gap-3 text-sm"
                >
                  <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p>
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">
                        {activity.action}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatRelativeTime(activity.timestamp)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">사용자 목록</CardTitle>
            <CardDescription>
              가장 최근에 추가된 사용자 일부를 표시합니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={usersColumns}
              data={mockUsers.slice(0, 5)}
              searchColumnId="email"
              searchPlaceholder="이메일로 검색..."
            />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
