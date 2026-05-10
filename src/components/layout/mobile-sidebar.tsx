"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { APP_NAME } from "@/lib/constants";

/**
 * 모바일 사이드바 (lg 미만에서만 표시)
 * - 햄버거 버튼 클릭 시 좌측 Sheet로 슬라이드 인
 * - 메뉴 클릭 시 SidebarNav의 onNavigate 콜백으로 자동 close
 */
export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="메뉴 열기"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="h-14 px-5 border-b flex-row items-center">
          <SheetTitle asChild>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold tracking-tight"
            >
              <Sparkles className="size-5 text-primary" aria-hidden />
              <span className="text-base">{APP_NAME}</span>
            </Link>
          </SheetTitle>
          <SheetDescription className="sr-only">
            메인 네비게이션 메뉴
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <SidebarNav onNavigate={() => setOpen(false)} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
