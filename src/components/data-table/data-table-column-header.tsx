"use client";

import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  /** TanStack Table column 인스턴스 */
  column: Column<TData, TValue>;
  /** 헤더에 표시될 라벨 */
  title: string;
}

/**
 * 정렬/숨김 가능한 데이터 테이블 컬럼 헤더
 * - 정렬 가능 컬럼: 드롭다운 메뉴로 오름/내림차순 + 숨김 옵션 제공
 * - 정렬 불가 컬럼: 단순 텍스트 표시
 */
export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn("text-sm font-medium", className)}>{title}</div>;
  }

  const sortDir = column.getIsSorted();

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 h-8 data-[state=open]:bg-muted"
          >
            <span className="text-sm font-medium">{title}</span>
            {sortDir === "asc" ? (
              <ArrowUp className="ml-1 size-3.5" />
            ) : sortDir === "desc" ? (
              <ArrowDown className="ml-1 size-3.5" />
            ) : (
              <ChevronsUpDown className="ml-1 size-3.5 opacity-50" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="mr-2 size-3.5 text-muted-foreground" />
            오름차순
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="mr-2 size-3.5 text-muted-foreground" />
            내림차순
          </DropdownMenuItem>
          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeOff className="mr-2 size-3.5 text-muted-foreground" />
                컬럼 숨김
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
