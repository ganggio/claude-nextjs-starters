"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

/** 가이드 페이지 탭 정의 */
const GUIDE_TABS = [
  { href: "/guide", label: "시작하기" },
  { href: "/guide/components", label: "컴포넌트" },
  { href: "/guide/forms", label: "폼" },
  { href: "/guide/data-display", label: "데이터 표시" },
  { href: "/guide/feedback", label: "피드백" },
  { href: "/guide/libraries", label: "라이브러리" },
] as const;

/**
 * 가이드 페이지 가로 탭 네비게이션
 * - settings-nav와 같은 패턴으로 일관성 유지
 * - 현재 경로와 일치하는 탭만 활성 스타일
 */
export function GuideNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b overflow-x-auto">
      <ul className="-mb-px flex gap-2 sm:gap-6 whitespace-nowrap">
        {GUIDE_TABS.map((tab) => {
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
