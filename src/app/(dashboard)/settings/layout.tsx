import { PageHeader } from "@/components/feedback/page-header";
import { SettingsNav } from "@/components/dashboard/settings-nav";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

/**
 * 설정 페이지 공용 레이아웃
 * - 상단 페이지 헤더 + 탭 네비게이션
 * - 하단에 children (세부 설정 페이지)
 */
export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <PageHeader
        title="설정"
        description="계정, 프로필, 외관 등 환경설정을 관리합니다."
      />
      <SettingsNav />
      <div className="mt-6">{children}</div>
    </>
  );
}
