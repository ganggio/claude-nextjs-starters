import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface LoadingStateProps {
  /** 로딩 메시지 (기본: "불러오는 중...") */
  message?: string;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 일반 로딩 상태 표시 (페이지 내 부분 영역용)
 * - 라우트 단위 로딩은 app/loading.tsx 사용
 * - 데이터 fetching 중 보조 표시에 활용
 */
export function LoadingState({
  message = "불러오는 중...",
  className,
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground",
        className,
      )}
    >
      <Loader2 className="size-6 animate-spin" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
