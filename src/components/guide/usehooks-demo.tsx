"use client";

import { useState } from "react";
import {
  useDebounceValue,
  useLocalStorage,
  useMediaQuery,
  useToggle,
} from "usehooks-ts";
import { Monitor, Smartphone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** 디바운스 지연 (ms) */
const DEBOUNCE_DELAY = 500;

/** localStorage 카운터 키 (다른 탭과 동기화 시연) */
const COUNTER_KEY = "guide-demo-counter";

/**
 * usehooks-ts 4가지 훅 라이브 데모
 * - useMediaQuery: 화면 크기에 따른 분기
 * - useDebounceValue: 입력 디바운스
 * - useLocalStorage: 영속 상태 + 다른 탭 동기화
 * - useToggle: boolean 토글
 */
export function UseHooksDemo() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounceValue(query, DEBOUNCE_DELAY);

  const [count, setCount] = useLocalStorage(COUNTER_KEY, 0);

  const [visible, toggleVisible] = useToggle(true);

  return (
    <div className="w-full max-w-md space-y-5">
      <div className="space-y-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          useMediaQuery
        </p>
        <div className="flex items-center gap-2">
          {isDesktop ? (
            <>
              <Monitor className="size-4" />
              <Badge>데스크탑 (≥ 1024px)</Badge>
            </>
          ) : (
            <>
              <Smartphone className="size-4" />
              <Badge variant="secondary">모바일/태블릿 (&lt; 1024px)</Badge>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          useDebounceValue (500ms)
        </p>
        <Label htmlFor="debounce-input">검색어 입력</Label>
        <Input
          id="debounce-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="입력 후 0.5초 기다려 보세요"
        />
        <p className="text-xs text-muted-foreground">
          현재 입력: <span className="font-mono">{query || "(없음)"}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          디바운스 값:{" "}
          <span className="font-mono text-foreground">
            {debouncedQuery || "(없음)"}
          </span>
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          useLocalStorage (다른 탭에서도 동기화됨)
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCount(count - 1)}>
            -
          </Button>
          <span className="font-mono w-10 text-center">{count}</span>
          <Button variant="outline" size="sm" onClick={() => setCount(count + 1)}>
            +
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setCount(0)}>
            초기화
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          새 탭에서 같은 페이지를 열어 보세요. 값이 동기화됩니다.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          useToggle
        </p>
        <Button variant="outline" size="sm" onClick={() => toggleVisible()}>
          {visible ? "숨기기" : "보이기"}
        </Button>
        {visible && (
          <p className="text-sm">
            👋 안녕하세요! 토글 가능한 메시지입니다.
          </p>
        )}
      </div>
    </div>
  );
}
