import Link from "next/link";
import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * 글로벌 404 페이지
 * 라우트 매칭 실패 또는 notFound() 호출 시 표시
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-muted-foreground max-w-md">
          요청하신 주소가 잘못되었거나, 페이지가 이동/삭제되었을 수 있습니다.
        </p>
      </div>
      <Button asChild>
        <Link href="/dashboard">
          <Home className="mr-1 size-4" />
          대시보드로 이동
        </Link>
      </Button>
    </div>
  );
}
