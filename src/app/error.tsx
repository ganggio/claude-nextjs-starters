"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 글로벌 에러 바운더리
 * 자식 라우트에서 throw된 에러를 캐치하여 폴백 UI를 표시한다.
 */
export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 실제 환경에서는 Sentry 등 에러 트래킹 서비스로 전송
    // console.log/error 사용 금지 규칙에 따라 주석 처리만 표시
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 text-center">
      <AlertTriangle className="size-12 text-destructive" />
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          문제가 발생했습니다
        </h1>
        <p className="text-muted-foreground max-w-md">
          예기치 못한 오류로 페이지를 표시할 수 없습니다. 잠시 후 다시 시도해
          주세요.
        </p>
        {error.digest && (
          <p className="text-xs font-mono text-muted-foreground/70">
            오류 코드: {error.digest}
          </p>
        )}
      </div>
      <Button onClick={reset}>
        <RefreshCw className="mr-1 size-4" />
        다시 시도
      </Button>
    </div>
  );
}
