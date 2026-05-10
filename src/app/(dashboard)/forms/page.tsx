import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileForm } from "@/components/forms/profile-form";
import { PageHeader } from "@/components/feedback/page-header";

export const metadata: Metadata = {
  title: "폼 데모",
};

/**
 * 폼 데모 페이지
 * - React Hook Form + Zod 검증의 표준 패턴 시연
 * - 제출 시 sonner 토스트로 결과 알림
 */
export default function FormsPage() {
  return (
    <>
      <PageHeader
        title="폼 데모"
        description="React Hook Form + Zod 기반의 폼 검증 패턴을 확인해 보세요."
      />
      <Card>
        <CardHeader>
          <CardTitle>프로필 정보 수정</CardTitle>
          <CardDescription>
            이름, 이메일, 소개, 권한, 알림 설정을 변경할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </>
  );
}
