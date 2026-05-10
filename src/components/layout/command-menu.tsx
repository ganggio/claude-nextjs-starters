"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { sidebarNav } from "@/lib/nav-config";

/**
 * Cmd+K (Mac) / Ctrl+K (Windows) 명령 팔레트
 * - 헤더 좌측 검색바 클릭 또는 단축키로 활성화
 * - cmdk 기반 (shadcn Command 컴포넌트 활용)
 */
export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  /** 단축키 핸들러: Cmd/Ctrl + K로 토글 */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /** 메뉴 항목 선택 시 라우트 이동 + 다이얼로그 close */
  const runCommand = (callback: () => void) => {
    setOpen(false);
    callback();
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="hidden md:flex h-9 w-full max-w-xs justify-start gap-2 text-muted-foreground"
      >
        <Search className="size-4" />
        <span className="flex-1 text-left">검색...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* 모바일에서는 아이콘 버튼 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="md:hidden"
        aria-label="검색"
      >
        <Search className="size-4" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="페이지 또는 명령 검색..." />
        <CommandList>
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          {sidebarNav.map((group, groupIndex) => (
            <div key={group.title}>
              <CommandGroup heading={group.title}>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={item.href}
                      value={`${group.title} ${item.title} ${item.href}`}
                      onSelect={() =>
                        runCommand(() => router.push(item.href))
                      }
                    >
                      {Icon && <Icon className="mr-2 size-4" />}
                      <span>{item.title}</span>
                      <CommandShortcut>{item.href}</CommandShortcut>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {groupIndex < sidebarNav.length - 1 && <CommandSeparator />}
            </div>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
