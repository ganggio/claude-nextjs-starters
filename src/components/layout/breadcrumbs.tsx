"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/** 경로 세그먼트를 한국어 표시명으로 매핑 */
const SEGMENT_LABEL_MAP: Record<string, string> = {
  dashboard: "대시보드",
  users: "사용자",
  forms: "폼",
  modals: "모달",
  settings: "설정",
  profile: "프로필",
  appearance: "외관",
  login: "로그인",
  register: "회원가입",
  "forgot-password": "비밀번호 찾기",
};

/**
 * 현재 경로 기반 자동 빵부스러기
 * - usePathname을 / 단위로 분해해 각 세그먼트를 링크/현재 페이지로 표시
 * - 마지막 세그먼트는 BreadcrumbPage(링크 X)로 표시
 */
export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const label = SEGMENT_LABEL_MAP[segment] ?? segment;

          return (
            <Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
