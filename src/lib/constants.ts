/**
 * 프로젝트 전역 상수 모음
 * 매직 넘버/문자열을 한 곳에 모아 의미를 명시하고 일관성을 보장한다.
 */

/** 앱 이름 (헤더, 메타데이터, 인증 셸 등에서 공통 사용) */
export const APP_NAME = "Claude Starter Kit";

/** 앱 설명 (메타데이터 description) */
export const APP_DESCRIPTION = "Next.js 16 + Tailwind v4 + shadcn/ui 기반 모던 대시보드 스타터킷";

/** 데이터 테이블 기본 페이지 크기 */
export const DEFAULT_PAGE_SIZE = 10;

/** 데이터 테이블 페이지 크기 옵션 */
export const PAGE_SIZE_OPTIONS = [10, 20, 30, 50, 100] as const;

/** 검색 입력 디바운스 지연 (ms) */
export const SEARCH_DEBOUNCE_MS = 300;

/** Tailwind 브레이크포인트와 일치 (px 단위) */
export const BREAKPOINTS = {
  /** 모바일 - 태블릿 경계 */
  md: 768,
  /** 태블릿 - 데스크탑 경계 (사이드바가 고정으로 전환되는 지점) */
  lg: 1024,
  xl: 1280,
} as const;

/** 데스크탑 사이드바 너비 (px). Tailwind w-64와 일치 */
export const SIDEBAR_WIDTH_PX = 256;

/** 헤더 높이 (px). Tailwind h-14와 일치 */
export const HEADER_HEIGHT_PX = 56;

/** 토스트 자동 사라짐 시간 (ms) */
export const TOAST_DURATION_MS = 4000;
