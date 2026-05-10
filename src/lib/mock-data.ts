import type { User } from "@/types";

/**
 * 데모용 사용자 mock 데이터
 * 데이터 테이블, 상세 페이지 등에서 활용
 */
export const mockUsers: User[] = [
  {
    id: "1",
    name: "김개발",
    email: "kim.dev@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15T09:30:00Z",
    lastLoginAt: "2026-05-09T18:42:00Z",
  },
  {
    id: "2",
    name: "이디자인",
    email: "lee.design@example.com",
    role: "editor",
    status: "active",
    createdAt: "2024-03-22T11:15:00Z",
    lastLoginAt: "2026-05-10T08:20:00Z",
  },
  {
    id: "3",
    name: "박기획",
    email: "park.pm@example.com",
    role: "editor",
    status: "active",
    createdAt: "2024-05-08T14:00:00Z",
    lastLoginAt: "2026-05-08T15:33:00Z",
  },
  {
    id: "4",
    name: "최리뷰",
    email: "choi.review@example.com",
    role: "viewer",
    status: "inactive",
    createdAt: "2024-07-19T10:45:00Z",
    lastLoginAt: "2026-04-20T10:00:00Z",
  },
  {
    id: "5",
    name: "정신입",
    email: "jung.junior@example.com",
    role: "viewer",
    status: "pending",
    createdAt: "2026-05-01T09:00:00Z",
  },
  {
    id: "6",
    name: "강시니어",
    email: "kang.senior@example.com",
    role: "admin",
    status: "active",
    createdAt: "2023-11-02T16:20:00Z",
    lastLoginAt: "2026-05-10T07:15:00Z",
  },
  {
    id: "7",
    name: "조프론트",
    email: "cho.fe@example.com",
    role: "editor",
    status: "active",
    createdAt: "2025-02-14T12:00:00Z",
    lastLoginAt: "2026-05-09T22:00:00Z",
  },
  {
    id: "8",
    name: "윤백엔드",
    email: "yoon.be@example.com",
    role: "editor",
    status: "active",
    createdAt: "2025-04-05T08:30:00Z",
    lastLoginAt: "2026-05-09T19:45:00Z",
  },
  {
    id: "9",
    name: "한QA",
    email: "han.qa@example.com",
    role: "viewer",
    status: "active",
    createdAt: "2025-06-11T13:20:00Z",
    lastLoginAt: "2026-05-08T16:10:00Z",
  },
  {
    id: "10",
    name: "임데이터",
    email: "lim.data@example.com",
    role: "editor",
    status: "active",
    createdAt: "2025-08-29T10:00:00Z",
    lastLoginAt: "2026-05-10T09:30:00Z",
  },
  {
    id: "11",
    name: "오마케팅",
    email: "oh.mkt@example.com",
    role: "viewer",
    status: "inactive",
    createdAt: "2024-09-12T11:00:00Z",
    lastLoginAt: "2026-03-15T14:00:00Z",
  },
  {
    id: "12",
    name: "서운영",
    email: "seo.ops@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-12-01T07:00:00Z",
    lastLoginAt: "2026-05-10T06:00:00Z",
  },
];

/**
 * 대시보드 KPI 카드용 mock 데이터
 */
export const mockKpiStats = [
  {
    label: "총 사용자",
    value: 1284,
    change: 0.124,
    trend: "up" as const,
  },
  {
    label: "활성 세션",
    value: 423,
    change: -0.032,
    trend: "down" as const,
  },
  {
    label: "월 매출",
    value: 12_540_000,
    change: 0.087,
    trend: "up" as const,
    isCurrency: true,
  },
  {
    label: "전환율",
    value: 0.0342,
    change: 0.015,
    trend: "up" as const,
    isPercent: true,
  },
] as const;

/**
 * 최근 활동 mock 데이터
 */
export const mockRecentActivities = [
  {
    id: "a1",
    user: "김개발",
    action: "사용자 권한을 수정했습니다",
    timestamp: "2026-05-10T08:30:00Z",
  },
  {
    id: "a2",
    user: "이디자인",
    action: "새 프로젝트를 생성했습니다",
    timestamp: "2026-05-10T07:15:00Z",
  },
  {
    id: "a3",
    user: "박기획",
    action: "보고서를 업로드했습니다",
    timestamp: "2026-05-09T22:00:00Z",
  },
  {
    id: "a4",
    user: "강시니어",
    action: "시스템 설정을 변경했습니다",
    timestamp: "2026-05-09T18:45:00Z",
  },
  {
    id: "a5",
    user: "조프론트",
    action: "댓글을 작성했습니다",
    timestamp: "2026-05-09T15:20:00Z",
  },
] as const;
