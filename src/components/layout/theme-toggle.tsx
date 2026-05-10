"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useIsClient } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * 테마 토글 (라이트/다크/시스템 3-way)
 * - next-themes의 useTheme 훅 사용 (자체 구현 X)
 * - useIsClient로 SSR 미스매치 방지: 마운트 전에는 placeholder 아이콘 표시
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="테마 변경"
          className="relative"
        >
          {/* 마운트 전: 빈 아이콘 자리만 잡아 레이아웃 흔들림 방지 */}
          {isClient ? (
            <>
              <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </>
          ) : (
            <Sun className="size-4 opacity-50" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          aria-checked={theme === "light"}
        >
          <Sun className="mr-2 size-4" />
          라이트
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          aria-checked={theme === "dark"}
        >
          <Moon className="mr-2 size-4" />
          다크
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          aria-checked={theme === "system"}
        >
          <Monitor className="mr-2 size-4" />
          시스템
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
