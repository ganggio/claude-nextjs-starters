import { z } from "zod";

/** 비밀번호 최소 길이 */
const PASSWORD_MIN_LENGTH = 8;
/** 이름 최소 길이 */
const NAME_MIN_LENGTH = 2;

/**
 * 이메일 공통 스키마 (Zod v4: z.email() 사용)
 * 빈 값과 형식 오류 모두 한국어 메시지 제공
 */
const emailSchema = z.email({ message: "올바른 이메일 형식이 아닙니다." });

/**
 * 로그인 폼 스키마
 * 이메일 형식과 비밀번호 길이만 검증한다 (실제 인증은 서버 책임)
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`),
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * 회원가입 폼 스키마
 * 비밀번호 일치 여부까지 refine으로 검증한다.
 */
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(NAME_MIN_LENGTH, `이름은 ${NAME_MIN_LENGTH}자 이상이어야 합니다.`),
    email: emailSchema,
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((value) => value === true, {
      message: "약관에 동의해야 가입할 수 있습니다.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

/** 비밀번호 찾기 폼 스키마 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
