import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * 대시보드 라우트 그룹 레이아웃
 * - 좌측 고정 Sidebar (lg 이상)
 * - 상단 sticky Header
 * - 메인 영역은 사이드바 너비만큼 좌측 패딩
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <Header />
      <main className="lg:pl-64">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
