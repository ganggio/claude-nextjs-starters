import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/components/layout/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "로그인",
};

/**
 * 로그인 페이지
 * - AuthShell 안에 LoginForm을 배치
 * - 하단에 회원가입/비밀번호 찾기 보조 링크
 */
export default function LoginPage() {
  return (
    <AuthShell
      title="로그인"
      description="이메일과 비밀번호로 로그인하세요."
      footer={
        <span className="flex flex-wrap justify-center gap-1">
          <span>계정이 없으신가요?</span>
          <Link
            href="/register"
            className="font-medium text-foreground hover:underline"
          >
            회원가입
          </Link>
          <span aria-hidden>·</span>
          <Link
            href="/forgot-password"
            className="font-medium text-foreground hover:underline"
          >
            비밀번호를 잊으셨나요?
          </Link>
        </span>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
