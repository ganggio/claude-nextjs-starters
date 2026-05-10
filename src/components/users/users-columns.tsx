"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, MoreHorizontal } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { formatDate } from "@/lib/format";
import type { User, UserRole, UserStatus } from "@/types";

/** 권한별 한국어 라벨 */
const ROLE_LABEL: Record<UserRole, string> = {
  admin: "관리자",
  editor: "편집자",
  viewer: "뷰어",
};

/** 상태별 한국어 라벨과 Badge variant */
const STATUS_META: Record<
  UserStatus,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  active: { label: "활성", variant: "default" },
  inactive: { label: "비활성", variant: "secondary" },
  pending: { label: "대기", variant: "outline" },
};

/**
 * Users 데이터 테이블 컬럼 정의
 * - 이름은 Avatar + 텍스트 조합으로 표시
 * - 역할/상태는 Badge로 시각화
 * - 마지막 로그인은 한국어 날짜 포맷
 * - 우측 끝에 액션 메뉴 (상세보기/수정/삭제)
 */
export const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="이름" />
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-2 min-w-0">
          <Avatar className="size-7">
            <AvatarFallback className="text-xs">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium truncate">{user.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="이메일" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">{row.original.email}</span>
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="권한" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="text-xs">
        {ROLE_LABEL[row.original.role]}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="상태" />
    ),
    cell: ({ row }) => {
      const meta = STATUS_META[row.original.status];
      return (
        <Badge variant={meta.variant} className="text-xs">
          {meta.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="가입일" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="작업 메뉴">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>작업</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/users/${user.id}`}>
                  <ArrowRight className="mr-2 size-4" />
                  상세 보기
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>수정</DropdownMenuItem>
              <DropdownMenuItem
                disabled
                className="text-destructive focus:text-destructive"
              >
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
