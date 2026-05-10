import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Shield, Calendar, Clock } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/feedback/page-header";
import { formatDateTime, formatRelativeTime } from "@/lib/format";
import { mockUsers } from "@/lib/mock-data";

interface UserDetailPageProps {
  /** Next.js 16: params는 Promise로 전달됨 */
  params: Promise<{ id: string }>;
}

/**
 * 사용자 상세 페이지 메타데이터 (Next.js 16 Promise params 패턴)
 */
export async function generateMetadata({
  params,
}: UserDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const user = mockUsers.find((item) => item.id === id);
  return {
    title: user ? `${user.name}` : "사용자를 찾을 수 없음",
  };
}

/**
 * 사용자 상세 페이지
 * - Next.js 16: params를 await으로 풀어서 사용
 * - 미존재 시 notFound() 호출하여 404 표시
 */
export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params;
  const user = mockUsers.find((item) => item.id === id);

  if (!user) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={user.name}
        description="사용자 상세 정보 및 활동 내역"
        actions={
          <Button variant="outline" asChild>
            <Link href="/users">
              <ArrowLeft className="mr-1 size-4" />
              목록으로
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">기본 정보</CardTitle>
            <CardDescription>프로필 및 식별 정보</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3 text-center">
            <Avatar className="size-20">
              <AvatarFallback className="text-2xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-lg">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Badge variant="outline">{user.role}</Badge>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">상세 정보</CardTitle>
            <CardDescription>가입 및 활동 시각</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoRow icon={Mail} label="이메일" value={user.email} />
            <Separator />
            <InfoRow icon={Shield} label="권한" value={user.role} />
            <Separator />
            <InfoRow
              icon={Calendar}
              label="가입일"
              value={formatDateTime(user.createdAt)}
            />
            <Separator />
            <InfoRow
              icon={Clock}
              label="마지막 로그인"
              value={
                user.lastLoginAt
                  ? `${formatDateTime(user.lastLoginAt)} (${formatRelativeTime(user.lastLoginAt)})`
                  : "기록 없음"
              }
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

interface InfoRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

/** 상세 정보 한 줄 (아이콘 + 라벨 + 값) */
function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm break-all">{value}</p>
      </div>
    </div>
  );
}
