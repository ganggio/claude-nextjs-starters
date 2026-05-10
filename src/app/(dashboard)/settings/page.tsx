import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const metadata: Metadata = {
  title: "일반 설정",
};

/**
 * 일반 설정 페이지
 * - 알림, 이메일 옵션 등 단순 토글류 모음
 */
export default function SettingsGeneralPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>일반</CardTitle>
        <CardDescription>알림 수신 설정과 기본 옵션</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ToggleRow
          id="email-marketing"
          label="마케팅 이메일 수신"
          description="새 기능, 이벤트 등의 안내를 이메일로 받습니다."
        />
        <ToggleRow
          id="security-alerts"
          label="보안 알림"
          description="이상 징후 발생 시 즉시 알림을 받습니다."
          defaultChecked
        />
        <ToggleRow
          id="weekly-digest"
          label="주간 다이제스트"
          description="매주 월요일에 활동 요약을 받습니다."
        />
      </CardContent>
    </Card>
  );
}

interface ToggleRowProps {
  id: string;
  label: string;
  description: string;
  defaultChecked?: boolean;
}

/** 라벨 + 설명 + Switch 한 줄 */
function ToggleRow({ id, label, description, defaultChecked }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-0.5">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} defaultChecked={defaultChecked} />
    </div>
  );
}
