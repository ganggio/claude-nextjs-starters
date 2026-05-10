import type { Metadata } from "next";

import { AppearanceSettings } from "@/components/dashboard/appearance-settings";

export const metadata: Metadata = {
  title: "외관 설정",
};

/**
 * 외관 설정 페이지
 * - 테마(라이트/다크/시스템) 선택
 */
export default function SettingsAppearancePage() {
  return <AppearanceSettings />;
}
