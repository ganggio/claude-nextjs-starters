import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CommandMenu } from "@/components/layout/command-menu";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { NotificationsMenu } from "@/components/layout/notifications-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";

/**
 * 대시보드 상단 헤더
 * - sticky top-0 + backdrop-blur로 스크롤 시에도 가독성 유지
 * - lg:pl-64로 사이드바 너비만큼 좌측 오프셋
 *
 * 좌측: 모바일 햄버거 + 빵부스러기
 * 우측: 검색(Cmd+K) + 알림 + 테마 + 사용자
 */
export function Header() {
  return (
    <header className="sticky top-0 z-30 h-14 border-b bg-background/80 backdrop-blur lg:pl-64">
      <div className="h-full flex items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <MobileSidebar />
          <Breadcrumbs />
        </div>
        <div className="flex items-center gap-2">
          <CommandMenu />
          <NotificationsMenu />
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
