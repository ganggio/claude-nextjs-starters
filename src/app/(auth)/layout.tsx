interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * 인증 라우트 그룹 레이아웃
 * - 사이드바/헤더 없이 children 그대로 렌더 (각 페이지가 AuthShell을 사용)
 * - Route group `(auth)`로 묶여 URL에는 노출되지 않음
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return <>{children}</>;
}
