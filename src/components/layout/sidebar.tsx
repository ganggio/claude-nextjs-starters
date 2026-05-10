import Link from "next/link";
import { Sparkles } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { APP_NAME } from "@/lib/constants";

/**
 * 데스크탑 사이드바 (lg 이상에서만 표시)
 * - 좌측 고정 (fixed inset-y-0)
 * - w-64 너비, 헤더 색상과 분리되도록 border-r 사용
 */
export function Sidebar() {
  return (
    <aside
      aria-label="메인 사이드바"
      className="hidden lg:flex fixed inset-y-0 left-0 z-30 w-64 flex-col border-r bg-card"
    >
      <div className="flex h-14 items-center gap-2 px-5 border-b">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <Sparkles className="size-5 text-primary" aria-hidden />
          <span className="text-base">{APP_NAME}</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <SidebarNav />
      </ScrollArea>
      <Separator />
      <div className="px-5 py-3 text-xs text-muted-foreground">
        v0.1.0 · 스타터킷
      </div>
    </aside>
  );
}
