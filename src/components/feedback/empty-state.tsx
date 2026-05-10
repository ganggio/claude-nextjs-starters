import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  /** 표시될 lucide 아이콘 (기본: Inbox) */
  icon?: LucideIcon;
  /** 제목 (예: "데이터가 없습니다") */
  title: string;
  /** 부가 설명 */
  description?: string;
  /** 액션 영역 (예: "새로 만들기" 버튼) */
  action?: React.ReactNode;
  className?: string;
}

/**
 * 빈 상태 표시 컴포넌트
 * - 데이터가 없을 때, 검색 결과 없음 등에 활용
 * - 아이콘 + 제목 + 설명 + 액션의 표준 구성
 */
export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12 px-6 text-center",
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Icon className="size-6 text-muted-foreground" aria-hidden />
      </div>
      <div className="space-y-1 max-w-sm">
        <p className="text-sm font-semibold">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
