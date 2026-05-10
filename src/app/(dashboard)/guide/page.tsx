import type { Metadata } from "next";
import Link from "next/link";
import {
  Layers,
  FileText,
  Package,
  Bell,
  Inbox,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "가이드",
};

/** 카테고리별 빠른 진입 카드 데이터 */
const GUIDE_CATEGORIES = [
  {
    href: "/guide/components",
    icon: Layers,
    title: "컴포넌트",
    description:
      "Button, Card, Badge, Avatar, Dialog 등 자주 쓰이는 UI 원자 컴포넌트의 사용법",
  },
  {
    href: "/guide/forms",
    icon: FileText,
    title: "폼",
    description:
      "Input, Textarea, Select, Checkbox와 React Hook Form + Zod 통합 패턴",
  },
  {
    href: "/guide/data-display",
    icon: Package,
    title: "데이터 표시",
    description: "DataTable, Tabs, Accordion, Avatar Group 등 정보 표시 패턴",
  },
  {
    href: "/guide/feedback",
    icon: Bell,
    title: "피드백",
    description:
      "Toast(sonner), Skeleton, Progress, EmptyState, ConfirmDialog 등 사용자 피드백",
  },
  {
    href: "/guide/libraries",
    icon: Inbox,
    title: "라이브러리",
    description:
      "next-themes, usehooks-ts, date-fns, cmdk 등 외부 라이브러리 활용법",
  },
] as const;

/**
 * 가이드 시작 페이지
 * - 5개 카테고리로 빠른 진입
 * - 각 카드는 클릭 시 해당 카테고리 페이지로 이동
 */
export default function GuideHomePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>스타터킷 사용 가이드에 오신 것을 환영합니다</CardTitle>
          <CardDescription>
            이 가이드는 처음 프로젝트를 시작하는 작업자를 위해 구성되었습니다.
            각 페이지에서 미리보기와 코드 스니펫을 함께 확인할 수 있으니, 그대로
            복사해서 사용해 보세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-md border bg-muted/30 p-4 space-y-2 text-sm">
            <p className="font-medium">📚 학습 순서 (추천)</p>
            <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
              <li>
                <strong>컴포넌트</strong> — 가장 기본인 UI 원자부터 익힙니다.
              </li>
              <li>
                <strong>폼</strong> — React Hook Form + Zod 패턴을 배웁니다.
              </li>
              <li>
                <strong>데이터 표시</strong> — DataTable과 같은 조합 컴포넌트를
                활용합니다.
              </li>
              <li>
                <strong>피드백</strong> — 토스트와 로딩 상태로 UX를 개선합니다.
              </li>
              <li>
                <strong>라이브러리</strong> — 테마, 훅 등 외부 도구를 활용합니다.
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GUIDE_CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <Link key={category.href} href={category.href} className="group">
              <Card className="h-full transition-colors hover:border-primary/50 hover:bg-muted/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-base flex-1">
                      {category.title}
                    </CardTitle>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
