import { redirect } from "next/navigation";

/**
 * 루트 진입 시 대시보드로 즉시 리다이렉트
 * 별도의 마케팅/랜딩 페이지가 없는 대시보드 스타터의 표준 패턴
 */
export default function RootPage() {
  redirect("/dashboard");
}
