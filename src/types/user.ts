/** 사용자 권한 (역할) */
export type UserRole = "admin" | "editor" | "viewer";

/** 사용자 활성화 상태 */
export type UserStatus = "active" | "inactive" | "pending";

/** 사용자 도메인 모델 */
export interface User {
  /** 고유 식별자 */
  id: string;
  /** 표시 이름 */
  name: string;
  /** 이메일 (로그인 ID 역할) */
  email: string;
  /** 권한 */
  role: UserRole;
  /** 활성화 상태 */
  status: UserStatus;
  /** 가입일 (ISO 8601 형식 문자열) */
  createdAt: string;
  /** 마지막 로그인 시각 (없을 수 있음) */
  lastLoginAt?: string;
  /** 프로필 이미지 URL */
  avatarUrl?: string;
}
