import type { LucideIcon } from "lucide-react";

/** 사이드바/헤더에서 사용하는 단일 네비게이션 항목 */
export interface NavItem {
  /** 화면에 표시될 메뉴 이름 */
  title: string;
  /** 라우팅될 경로 */
  href: string;
  /** lucide-react 아이콘 컴포넌트 */
  icon?: LucideIcon;
  /** 비활성화 여부 (개발 중 메뉴 등) */
  disabled?: boolean;
  /** 외부 링크 여부 (true면 새 탭으로 열림) */
  external?: boolean;
  /** 우측에 표시되는 작은 라벨 (예: "New", "Beta") */
  label?: string;
}

/** 사이드바 메뉴 그룹 - 같은 카테고리의 NavItem 묶음 */
export interface NavGroup {
  /** 그룹 제목 (예: "분석", "설정") */
  title: string;
  /** 해당 그룹에 속하는 메뉴 항목 */
  items: NavItem[];
}
