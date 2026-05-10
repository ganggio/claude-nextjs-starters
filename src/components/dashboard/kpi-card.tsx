import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  /** 지표명 (예: "총 사용자") */
  label: string;
  /** 지표 값 (숫자) */
  value: number;
  /** 전기 대비 변화율 (-1.0 ~ 1.0 사이의 비율) */
  change?: number;
  /** 변화 추세 */
  trend?: "up" | "down";
  /** 통화로 표시할지 여부 */
  isCurrency?: boolean;
  /** 백분율로 표시할지 여부 */
  isPercent?: boolean;
}

/**
 * 대시보드 KPI 카드
 * - 지표명, 값, 변화율을 표준 카드 형태로 표시
 * - trend에 따라 색상과 화살표 방향 자동 설정
 */
export function KpiCard({
  label,
  value,
  change,
  trend = "up",
  isCurrency = false,
  isPercent = false,
}: KpiCardProps) {
  /** 표시값 포맷팅 - 통화/백분율/일반 숫자 */
  const formattedValue = isCurrency
    ? formatCurrency(value)
    : isPercent
      ? formatPercent(value)
      : formatNumber(value);

  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tracking-tight">
          {formattedValue}
        </div>
        {change !== undefined && (
          <div
            className={cn(
              "mt-1 flex items-center gap-1 text-xs",
              trend === "up" ? "text-emerald-600" : "text-red-600",
            )}
          >
            <TrendIcon className="size-3.5" />
            <span>{formatPercent(Math.abs(change))}</span>
            <span className="text-muted-foreground">전월 대비</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
