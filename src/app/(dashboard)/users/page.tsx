import type { Metadata } from "next";
import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { PageHeader } from "@/components/feedback/page-header";
import { usersColumns } from "@/components/users/users-columns";
import { mockUsers } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "사용자",
};

/**
 * 사용자 관리 페이지
 * - 데이터 테이블 풀 데모: 정렬/검색/필터/페이지네이션/컬럼 visibility
 */
export default function UsersPage() {
  return (
    <>
      <PageHeader
        title="사용자"
        description="모든 사용자를 한 곳에서 관리하세요."
        actions={
          <Button>
            <UserPlus className="mr-1 size-4" />
            사용자 초대
          </Button>
        }
      />
      <DataTable
        columns={usersColumns}
        data={mockUsers}
        searchColumnId="email"
        searchPlaceholder="이메일로 검색..."
        emptyMessage="등록된 사용자가 없습니다."
      />
    </>
  );
}
