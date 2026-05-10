"use client";

import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  /** 검색에 사용할 컬럼 ID (예: "email") */
  searchColumnId?: string;
  /** 검색 placeholder */
  searchPlaceholder?: string;
}

/**
 * 데이터 테이블 상단 툴바
 * - 좌측: 컬럼 단위 검색 입력 (지정된 컬럼이 있을 때만 표시)
 * - 우측: 컬럼 visibility 토글 메뉴
 * - 필터링이 활성화되어 있으면 "초기화" 버튼 노출
 */
export function DataTableToolbar<TData>({
  table,
  searchColumnId,
  searchPlaceholder = "검색...",
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const searchColumn = searchColumnId
    ? table.getColumn(searchColumnId)
    : undefined;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-2">
        {searchColumn && (
          <Input
            placeholder={searchPlaceholder}
            value={(searchColumn.getFilterValue() as string) ?? ""}
            onChange={(event) => searchColumn.setFilterValue(event.target.value)}
            className="h-9 w-full max-w-sm"
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
            className="h-9"
          >
            초기화
            <X className="ml-1 size-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
