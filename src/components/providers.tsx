"use client";

import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TOAST_DURATION_MS } from "@/lib/constants";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * 앱 전역 Providers 묶음
 * - next-themes: 라이트/다크/시스템 테마 (FOUC 방지 내장)
 * - TooltipProvider: 모든 Tooltip 컴포넌트가 공유하는 최상위 컨텍스트
 * - Toaster (sonner): 글로벌 토스트 알림 (테마와 자동 동기화)
 *
 * 클라이언트 컴포넌트로 표시되지만, 자식 트리는 서버 컴포넌트로 유지된다.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={200}>
        {children}
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          duration={TOAST_DURATION_MS}
        />
      </TooltipProvider>
    </ThemeProvider>
  );
}
