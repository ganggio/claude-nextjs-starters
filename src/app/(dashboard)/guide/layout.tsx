import { PageHeader } from "@/components/feedback/page-header";
import { GuideNav } from "@/components/guide/guide-nav";

interface GuideLayoutProps {
  children: React.ReactNode;
}

/**
 * 가이드 페이지 공용 레이아웃
 * - 상단 페이지 헤더로 제목/설명 통일
 * - 그 아래 카테고리 탭 네비
 * - children: 카테고리별 예제 그리드
 */
export default function GuideLayout({ children }: GuideLayoutProps) {
  return (
    <>
      <PageHeader
        title="가이드"
        description="이 스타터킷에 포함된 컴포넌트와 라이브러리 사용법을 한눈에 확인하세요."
      />
      <GuideNav />
      <div className="mt-6 space-y-6">{children}</div>
    </>
  );
}
