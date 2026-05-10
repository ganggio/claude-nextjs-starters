import Link from "next/link";
import { Sparkles } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";

interface AuthShellProps {
  /** 카드 제목 (예: "로그인", "회원가입") */
  title: string;
  /** 카드 부제목 */
  description?: string;
  /** 폼/콘텐츠 본문 */
  children: React.ReactNode;
  /** 카드 하단에 표시할 보조 영역 (예: "계정이 없으신가요? 회원가입") */
  footer?: React.ReactNode;
}

/**
 * (auth) 라우트 그룹 공용 셸
 * - 사이드바/헤더 없이 중앙 정렬된 카드 형태
 * - 상단에 로고, 하단에 보조 링크
 */
export function AuthShell({
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="min-h-screen grid place-items-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <Sparkles className="size-5 text-primary" aria-hidden />
          {APP_NAME}
        </Link>
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
        {footer && (
          <p className="text-sm text-muted-foreground text-center">{footer}</p>
        )}
      </div>
    </div>
  );
}
