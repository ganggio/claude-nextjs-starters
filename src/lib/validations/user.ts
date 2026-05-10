import { z } from "zod";

/** 사용자 권한 enum (User 타입의 UserRole과 동기화) */
export const userRoleEnum = z.enum(["admin", "editor", "viewer"]);

/**
 * 사용자 프로필 수정 폼 스키마
 * 폼 페이지 데모와 설정 페이지에서 공통으로 사용
 */
export const userProfileSchema = z.object({
  name: z
    .string()
    .min(2, "이름은 2자 이상이어야 합니다.")
    .max(50, "이름은 50자를 초과할 수 없습니다."),
  email: z.email({ message: "올바른 이메일 형식이 아닙니다." }),
  bio: z.string().max(200, "소개는 200자를 초과할 수 없습니다.").optional(),
  role: userRoleEnum,
  receiveNotifications: z.boolean(),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;
