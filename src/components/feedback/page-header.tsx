import { cn } from "@/lib/utils";

interface PageHeaderProps {
  /** 페이지 제목 (h1) */
  title: string;
  /** 부제목/설명 */
  description?: string;
  /** 우측 액션 영역 (예: 추가 버튼) */
  actions?: React.ReactNode;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 페이지 상단 공통 헤더
 * - 제목 + 설명 + 우측 액션 영역의 표준 레이아웃
 * - 모바일: 세로 배치, 데스크탑: 가로 배치
 */
export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 pb-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
