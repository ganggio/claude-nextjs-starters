import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/components/layout/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "비밀번호 찾기",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="비밀번호 찾기"
      description="가입 시 사용한 이메일로 재설정 링크를 보내드립니다."
      footer={
        <Link
          href="/login"
          className="font-medium text-foreground hover:underline"
        >
          로그인 페이지로 돌아가기
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
