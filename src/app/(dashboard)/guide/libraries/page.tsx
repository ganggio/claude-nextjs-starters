import type { Metadata } from "next";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ExampleCard } from "@/components/guide/example-card";
import { FormatDemo } from "@/components/guide/format-demo";
import { UseHooksDemo } from "@/components/guide/usehooks-demo";

export const metadata: Metadata = {
  title: "라이브러리 가이드",
};

/**
 * 외부 라이브러리 활용 가이드
 * - next-themes: 다크모드
 * - usehooks-ts: 공통 훅 모음
 * - date-fns + Intl: 날짜/숫자 포매팅
 * - cmdk: 명령 팔레트
 */
export default function GuideLibrariesPage() {
  return (
    <>
      <ExampleCard
        title="next-themes (다크모드)"
        description="라이트/다크/시스템 3가지 테마를 자동 동기화. FOUC가 자동 방지됩니다."
        preview={
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="text-sm text-muted-foreground">
              👈 헤더의 토글과 동일한 컴포넌트입니다.
            </span>
          </div>
        }
        code={`"use client";

import { useTheme } from "next-themes";
import { useIsClient } from "usehooks-ts";

export function MyComponent() {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();

  // SSR 미스매치 방지: 마운트 전에는 placeholder 또는 null 반환
  if (!isClient) return null;

  return (
    <div>
      <p>현재 테마: {theme}</p>
      <button onClick={() => setTheme("dark")}>다크 모드</button>
      <button onClick={() => setTheme("light")}>라이트 모드</button>
      <button onClick={() => setTheme("system")}>시스템 따라가기</button>
    </div>
  );
}`}
        notes={[
          "ThemeProvider는 src/components/providers.tsx에 이미 등록되어 있습니다.",
          "테마 값은 localStorage에 저장되어 새로고침해도 유지됩니다.",
          "system 모드는 OS 설정 변경 시 자동으로 따라갑니다.",
        ]}
        warnings={[
          "useTheme를 쓰는 컴포넌트는 useIsClient(또는 useEffect 마운트 가드)로 SSR 미스매치를 방지하세요.",
          "useTheme를 쓰는 파일은 \"use client\" 지시어가 필수입니다.",
        ]}
      />

      <ExampleCard
        title="usehooks-ts (공통 훅)"
        description="자주 쓰이는 훅이 검증된 형태로 제공됩니다. 직접 작성하지 말고 이 라이브러리를 사용하세요."
        preview={<UseHooksDemo />}
        code={`"use client";

import {
  useDebounceValue,
  useLocalStorage,
  useMediaQuery,
  useToggle,
  useIsClient,
  useCopyToClipboard,
} from "usehooks-ts";

// 화면 크기 분기
const isDesktop = useMediaQuery("(min-width: 1024px)");

// 디바운스된 값 (검색 입력에 자주 활용)
const [debouncedQuery] = useDebounceValue(query, 500);

// localStorage와 동기화 (다른 탭과도 동기화됨)
const [count, setCount] = useLocalStorage("counter", 0);

// boolean 토글
const [open, toggle] = useToggle(false);

// SSR 미스매치 방지
const isClient = useIsClient();

// 클립보드 복사
const [, copy] = useCopyToClipboard();
await copy("복사할 텍스트");`}
        notes={[
          "더 많은 훅은 https://usehooks-ts.com 에서 확인하세요.",
          "useEventListener, useOnClickOutside, useIntersectionObserver 등도 자주 활용됩니다.",
        ]}
        warnings={[
          "이 훅들은 모두 클라이언트 전용입니다. 서버 컴포넌트에서는 사용할 수 없습니다.",
        ]}
      />

      <ExampleCard
        title="date-fns + Intl (날짜/숫자 포매팅)"
        description="lib/format.ts에 미리 작성된 포매터를 그대로 가져다 쓰세요. 추가 포맷이 필요하면 동일 파일에 추가합니다."
        preview={<FormatDemo />}
        code={`import {
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatNumber,
  formatCurrency,
  formatPercent,
} from "@/lib/format";

formatDate("2026-05-09T10:00:00Z");      // "2026년 5월 9일"
formatDateTime("2026-05-09T10:00:00Z");  // "2026년 5월 9일 오후 7:00"
formatRelativeTime(oneHourAgo);          // "약 1시간 전"

formatNumber(1234567);     // "1,234,567"
formatCurrency(50000);     // "₩50,000"
formatPercent(0.157);      // "15.7%"`}
        notes={[
          "date-fns의 ko 로케일이 적용되어 한국어로 출력됩니다.",
          "숫자/통화/백분율은 브라우저 내장 Intl.NumberFormat을 사용합니다.",
          "사용자 환경에 따른 자동 로케일이 필요하면 ko-KR 부분을 navigator.language로 교체하세요.",
        ]}
      />

      <ExampleCard
        title="cmdk (명령 팔레트)"
        description="Cmd+K (Mac) / Ctrl+K (Windows) 단축키로 빠르게 페이지를 검색하고 이동."
        preview={
          <div className="text-sm text-muted-foreground">
            ⌘K 또는 헤더의 검색 버튼을 눌러 보세요. 사이드바의 모든 메뉴가
            검색됩니다.
          </div>
        }
        code={`"use client";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

export function MyCommandMenu() {
  const [open, setOpen] = useState(false);

  // Cmd+K / Ctrl+K 단축키
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="검색..." />
      <CommandList>
        <CommandEmpty>결과 없음</CommandEmpty>
        <CommandGroup heading="페이지">
          <CommandItem onSelect={() => router.push("/users")}>
            사용자 관리
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}`}
        notes={[
          "이 스타터킷의 헤더에는 src/components/layout/command-menu.tsx로 미리 구현되어 있습니다.",
          "메뉴 항목은 lib/nav-config.ts에서 자동으로 가져옵니다 — 사이드바에 메뉴를 추가하면 명령 팔레트에도 즉시 반영됩니다.",
        ]}
      />
    </>
  );
}
