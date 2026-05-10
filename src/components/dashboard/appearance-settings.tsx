"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useIsClient } from "usehooks-ts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";

/** 테마 옵션 정의 */
const THEME_OPTIONS = [
  { value: "light", label: "라이트", icon: Sun },
  { value: "dark", label: "다크", icon: Moon },
  { value: "system", label: "시스템", icon: Monitor },
] as const;

/**
 * 외관 설정 (테마 라디오 선택)
 * - next-themes의 useTheme을 RadioGroup으로 시각화
 * - SSR 미스매치 방지를 위해 마운트 전에는 Skeleton 표시
 */
export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();

  return (
    <Card>
      <CardHeader>
        <CardTitle>테마</CardTitle>
        <CardDescription>화면 색상 모드를 선택하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        {isClient ? (
          <RadioGroup
            value={theme}
            onValueChange={setTheme}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {THEME_OPTIONS.map((option) => {
              const Icon = option.icon;
              return (
                <Label
                  key={option.value}
                  htmlFor={`theme-${option.value}`}
                  className="flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer hover:bg-muted has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-muted/50"
                >
                  <RadioGroupItem
                    id={`theme-${option.value}`}
                    value={option.value}
                    className="sr-only"
                  />
                  <Icon className="size-6" aria-hidden />
                  <span className="text-sm font-medium">{option.label}</span>
                </Label>
              );
            })}
          </RadioGroup>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
