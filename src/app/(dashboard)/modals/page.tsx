import type { Metadata } from "next";

import { ModalsDemo } from "@/components/dashboard/modals-demo";
import { PageHeader } from "@/components/feedback/page-header";

export const metadata: Metadata = {
  title: "모달 데모",
};

/**
 * 모달/다이얼로그 데모 페이지
 * 3가지 패턴: 정보 / 폼 / 확인
 */
export default function ModalsPage() {
  return (
    <>
      <PageHeader
        title="모달 데모"
        description="자주 쓰이는 다이얼로그 패턴 3종을 확인하세요."
      />
      <ModalsDemo />
    </>
  );
}
