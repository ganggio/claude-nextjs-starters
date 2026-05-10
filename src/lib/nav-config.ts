import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  Settings,
  CircleHelp,
  ExternalLink,
  BookOpen,
  Layers,
  Inbox,
  Package,
  Bell,
} from "lucide-react";

import type { NavGroup, NavItem } from "@/types";

/**
 * 사이드바 메뉴 구성
 * 그룹별로 묶어 표시 가독성을 높인다. 새 메뉴 추가 시 이 파일 한 곳만 수정하면 된다.
 */
export const sidebarNav: NavGroup[] = [
  {
    title: "개요",
    items: [
      {
        title: "대시보드",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "관리",
    items: [
      {
        title: "사용자",
        href: "/users",
        icon: Users,
      },
      {
        title: "폼 데모",
        href: "/forms",
        icon: FileText,
      },
      {
        title: "모달 데모",
        href: "/modals",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "가이드",
    items: [
      {
        title: "시작하기",
        href: "/guide",
        icon: BookOpen,
      },
      {
        title: "컴포넌트",
        href: "/guide/components",
        icon: Layers,
      },
      {
        title: "폼",
        href: "/guide/forms",
        icon: FileText,
      },
      {
        title: "데이터 표시",
        href: "/guide/data-display",
        icon: Package,
      },
      {
        title: "피드백",
        href: "/guide/feedback",
        icon: Bell,
      },
      {
        title: "라이브러리",
        href: "/guide/libraries",
        icon: Inbox,
      },
    ],
  },
  {
    title: "기타",
    items: [
      {
        title: "설정",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

/** 사용자 프로필 드롭다운 메뉴 항목 */
export const userMenuNav: NavItem[] = [
  {
    title: "프로필",
    href: "/settings/profile",
    icon: Users,
  },
  {
    title: "설정",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "도움말",
    href: "https://nextjs.org/docs",
    icon: CircleHelp,
    external: true,
  },
];

/** 푸터/외부 링크 */
export const externalLinks: NavItem[] = [
  {
    title: "Next.js 문서",
    href: "https://nextjs.org/docs",
    icon: ExternalLink,
    external: true,
  },
  {
    title: "shadcn/ui",
    href: "https://ui.shadcn.com",
    icon: ExternalLink,
    external: true,
  },
];
