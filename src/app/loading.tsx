import { Loader2 } from "lucide-react";

/**
 * 글로벌 로딩 UI
 * Suspense 폴백으로 사용되어 라우트 전환 시 표시된다.
 */
export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-muted-foreground">
      <Loader2 className="size-8 animate-spin" />
      <p className="text-sm">불러오는 중입니다...</p>
    </div>
  );
}
