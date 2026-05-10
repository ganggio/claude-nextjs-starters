import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileForm } from "@/components/forms/profile-form";

export const metadata: Metadata = {
  title: "프로필 설정",
};

/**
 * 프로필 설정 페이지
 * - 폼 데모와 동일한 ProfileForm 재사용 (재사용성 시연)
 */
export default function SettingsProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>프로필</CardTitle>
        <CardDescription>다른 사용자에게 표시되는 정보입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileForm />
      </CardContent>
    </Card>
  );
}
