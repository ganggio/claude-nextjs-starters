"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

/** 설정 탭 항목 정의 */
const SETTINGS_TABS = [
  { href: "/settings", label: "일반" },
  { href: "/settings/profile", label: "프로필" },
  { href: "/settings/appearance", label: "외관" },
] as const;

/**
 * 설정 페이지 탭 네비게이션 (가로 탭)
 * - 현재 경로와 일치하는 탭만 활성 스타일
 * - shadcn Tabs 대신 단순 링크로 구현하여 라우팅 우선
 */
export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <ul className="-mb-px flex flex-wrap gap-2 sm:gap-6">
        {SETTINGS_TABS.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={cn(
                  "inline-flex h-10 items-center border-b-2 px-1 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
