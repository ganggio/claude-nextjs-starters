import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatNumber,
  formatPercent,
  formatRelativeTime,
} from "@/lib/format";

/** 데모 표시용 고정 날짜 (가이드 페이지가 매번 같은 결과를 보여주도록) */
const SAMPLE_DATE = "2026-05-09T10:00:00Z";
/** 1시간 전 (상대 시간 데모용) */
const ONE_HOUR_AGO = new Date(Date.now() - 60 * 60 * 1000).toISOString();

/** 포매터 결과를 라벨/값 한 줄로 표시 */
interface FormatRowProps {
  label: string;
  expr: string;
  value: string;
}

function FormatRow({ label, expr, value }: FormatRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-3 py-2 border-b last:border-b-0 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <code className="text-xs bg-muted px-1.5 py-0.5 rounded sm:col-span-1 self-center w-fit">
        {expr}
      </code>
      <span className="font-medium">{value}</span>
    </div>
  );
}

/**
 * lib/format.ts 포매터 결과 데모
 * - 날짜/시간/상대시간/숫자/통화/백분율
 */
export function FormatDemo() {
  return (
    <div className="w-full">
      <FormatRow
        label="날짜"
        expr="formatDate(date)"
        value={formatDate(SAMPLE_DATE)}
      />
      <FormatRow
        label="날짜 + 시간"
        expr="formatDateTime(date)"
        value={formatDateTime(SAMPLE_DATE)}
      />
      <FormatRow
        label="상대 시간"
        expr="formatRelativeTime(date)"
        value={formatRelativeTime(ONE_HOUR_AGO)}
      />
      <FormatRow
        label="숫자 (구분자)"
        expr="formatNumber(1234567)"
        value={formatNumber(1234567)}
      />
      <FormatRow
        label="통화 (원)"
        expr="formatCurrency(50000)"
        value={formatCurrency(50000)}
      />
      <FormatRow
        label="백분율"
        expr="formatPercent(0.157)"
        value={formatPercent(0.157)}
      />
    </div>
  );
}
