"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userMenuNav } from "@/lib/nav-config";

/**
 * 사용자 프로필 드롭다운 메뉴
 * - 데모 사용자 정보 (실제 인증과 연결 시 props로 전환)
 * - 로그아웃 클릭 시 toast 알림 (실제 로그아웃은 프로젝트별 구현)
 */
export function UserMenu() {
  /** 데모용 사용자 정보 (실제로는 세션/스토어에서 주입) */
  const user = {
    name: "김개발",
    email: "kim.dev@example.com",
    avatarUrl: undefined as string | undefined,
  };

  const initials = user.name.charAt(0);

  /** 로그아웃 핸들러 - 데모는 toast만 표시 */
  const handleLogout = () => {
    toast.success("로그아웃되었습니다.");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="사용자 메뉴"
          className="rounded-full"
        >
          <Avatar className="size-8">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground truncate">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userMenuNav.map((item) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem key={item.href} asChild>
              <Link
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                {Icon && <Icon className="mr-2 size-4" />}
                {item.title}
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 size-4" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
