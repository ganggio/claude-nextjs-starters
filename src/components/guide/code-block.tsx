"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  /** 표시할 코드 문자열 */
  code: string;
  /** 코드 언어 (기본: tsx) - 시각적 라벨용 */
  language?: string;
  /** 추가 클래스명 */
  className?: string;
}

/** 복사 버튼 피드백 표시 시간 (ms) */
const COPY_FEEDBACK_MS = 1500;

/**
 * 가이드 페이지용 코드 블록
 * - 우측 상단 복사 버튼 (usehooks-ts의 useCopyToClipboard 사용)
 * - 가로 스크롤 가능한 monospace 영역
 * - 복사 성공 시 1.5초간 체크 아이콘 표시
 */
export function CodeBlock({ code, language = "tsx", className }: CodeBlockProps) {
  const [, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  /** 복사 버튼 핸들러 - 성공 시 일시적 피드백 표시 */
  const handleCopy = async () => {
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
    }
  };

  return (
    <div className={cn("relative rounded-lg border bg-muted/30", className)}>
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="text-xs font-mono text-muted-foreground">
          {language}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={handleCopy}
          aria-label="코드 복사"
        >
          {copied ? (
            <>
              <Check className="size-3" />
              복사됨
            </>
          ) : (
            <>
              <Copy className="size-3" />
              복사
            </>
          )}
        </Button>
      </div>
      <ScrollArea className="max-h-[480px]">
        <pre className="p-4 text-xs leading-relaxed font-mono">
          <code>{code}</code>
        </pre>
      </ScrollArea>
    </div>
  );
}
