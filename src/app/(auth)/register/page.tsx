import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/components/layout/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "회원가입",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="회원가입"
      description="간단한 정보 입력으로 가입하세요."
      footer={
        <span className="flex flex-wrap justify-center gap-1">
          <span>이미 계정이 있으신가요?</span>
          <Link
            href="/login"
            className="font-medium text-foreground hover:underline"
          >
            로그인
          </Link>
        </span>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
