"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { sidebarNav } from "@/lib/nav-config";

interface SidebarNavProps {
  /** Sheet 닫기 등 부가 동작 (모바일에서 사용) */
  onNavigate?: () => void;
}

/**
 * 사이드바 메뉴 본체 (클라이언트)
 * - usePathname으로 현재 경로 감지 후 활성 항목 강조
 * - 그룹별 제목과 항목을 nav-config에서 가져와 렌더
 */
export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6 px-3 py-4">
      {sidebarNav.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <p className="px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
            {group.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={isActive ? "page" : undefined}
                    aria-disabled={item.disabled}
                    className={cn(
                      "group flex h-9 items-center gap-2.5 rounded-md px-3 text-sm font-medium transition-colors",
                      "hover:bg-muted hover:text-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground",
                      item.disabled && "pointer-events-none opacity-50",
                    )}
                  >
                    {Icon && <Icon className="size-4 shrink-0" aria-hidden />}
                    <span className="flex-1 truncate">{item.title}</span>
                    {item.label && (
                      <span className="rounded-sm bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
