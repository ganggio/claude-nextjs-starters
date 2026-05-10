import type { Metadata } from "next";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExampleCard } from "@/components/guide/example-card";

export const metadata: Metadata = {
  title: "데이터 표시 가이드",
};

/**
 * 데이터 표시 패턴 가이드
 * - Card, Table, Tabs, Accordion 등
 * - DataTable 본 사용은 /users 페이지에서 풀 데모 확인
 */
export default function GuideDataDisplayPage() {
  return (
    <>
      <ExampleCard
        title="Card"
        description="콘텐츠를 묶어 시각적 단위로 표시. 대시보드 KPI, 폼 그룹, 콘텐츠 리스트에 자주 활용."
        preview={
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>새 알림</CardTitle>
              <CardDescription>최근 1시간 동안의 활동</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">3건의 새 댓글이 있습니다.</p>
            </CardContent>
          </Card>
        }
        code={`import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>새 알림</CardTitle>
    <CardDescription>최근 1시간 동안의 활동</CardDescription>
  </CardHeader>
  <CardContent>
    <p>3건의 새 댓글이 있습니다.</p>
  </CardContent>
</Card>`}
        notes={[
          "CardFooter도 함께 사용 가능 — 카드 하단에 액션 버튼을 두려면 import 하세요.",
        ]}
      />

      <ExampleCard
        title="Tabs"
        description="여러 뷰를 같은 영역에서 전환. 설정 페이지, 미리보기/코드 전환 등에 사용."
        preview={
          <Tabs defaultValue="overview" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="overview">개요</TabsTrigger>
              <TabsTrigger value="details">상세</TabsTrigger>
              <TabsTrigger value="logs">로그</TabsTrigger>
            </TabsList>
            <TabsContent
              value="overview"
              className="mt-3 rounded-md border p-4 text-sm"
            >
              개요 영역의 콘텐츠가 표시됩니다.
            </TabsContent>
            <TabsContent
              value="details"
              className="mt-3 rounded-md border p-4 text-sm"
            >
              상세 정보가 표시됩니다.
            </TabsContent>
            <TabsContent
              value="logs"
              className="mt-3 rounded-md border p-4 text-sm"
            >
              로그가 표시됩니다.
            </TabsContent>
          </Tabs>
        }
        code={`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">개요</TabsTrigger>
    <TabsTrigger value="details">상세</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">개요 콘텐츠</TabsContent>
  <TabsContent value="details">상세 콘텐츠</TabsContent>
</Tabs>`}
        notes={[
          "라우트별로 분리하고 싶다면 Tabs 대신 settings-nav 같은 Link 기반 패턴을 고려하세요.",
        ]}
      />

      <ExampleCard
        title="Accordion"
        description="긴 콘텐츠를 접었다 펼 수 있게 표시. FAQ, 도움말 등에 활용."
        preview={
          <Accordion type="single" collapsible className="w-full max-w-md">
            <AccordionItem value="item-1">
              <AccordionTrigger>스타터킷에 무엇이 포함되어 있나요?</AccordionTrigger>
              <AccordionContent>
                레이아웃, 데이터 테이블, 폼, 모달, 인증 UI 등 자주 쓰이는 패턴이
                미리 구성되어 있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>다크모드는 어떻게 동작하나요?</AccordionTrigger>
              <AccordionContent>
                next-themes 라이브러리로 라이트/다크/시스템 3가지 모드를
                지원하며 FOUC가 자동으로 방지됩니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        }
        code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>질문 1</AccordionTrigger>
    <AccordionContent>답변 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>질문 2</AccordionTrigger>
    <AccordionContent>답변 2</AccordionContent>
  </AccordionItem>
</Accordion>`}
        notes={[
          'type="single"은 한 번에 하나만, type="multiple"은 여러 개 동시 펼치기.',
          "collapsible 속성을 주면 열린 항목을 다시 닫을 수 있습니다.",
        ]}
      />

      <ExampleCard
        title="Table (원자 단위)"
        description="단순한 표 표시. 정렬/검색/페이지네이션이 필요하면 DataTable을 사용하세요."
        preview={
          <Table className="w-full max-w-md">
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>권한</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>김개발</TableCell>
                <TableCell className="text-muted-foreground">
                  kim@example.com
                </TableCell>
                <TableCell>관리자</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>이디자인</TableCell>
                <TableCell className="text-muted-foreground">
                  lee@example.com
                </TableCell>
                <TableCell>편집자</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        }
        code={`import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>이름</TableHead>
      <TableHead>이메일</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>김개발</TableCell>
      <TableCell>kim@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        notes={[
          "정렬, 검색, 페이지네이션, 컬럼 visibility가 필요하면 DataTable 컴포넌트를 사용하세요.",
          "/users 페이지에 풀 데모가 있습니다.",
        ]}
      />

      <ExampleCard
        title="DataTable (조합)"
        description="@tanstack/react-table 기반의 풀 기능 데이터 테이블. 컬럼 정의만으로 정렬/검색/페이지네이션/visibility가 모두 동작."
        preview={
          <div className="text-sm text-muted-foreground">
            DataTable의 풀 데모는{" "}
            <Link href="/users" className="text-foreground underline">
              /users
            </Link>{" "}
            페이지에서 직접 확인하실 수 있습니다.
          </div>
        }
        code={`import { DataTable } from "@/components/data-table/data-table";
import { usersColumns } from "@/components/users/users-columns";
import { mockUsers } from "@/lib/mock-data";

<DataTable
  columns={usersColumns}
  data={mockUsers}
  searchColumnId="email"
  searchPlaceholder="이메일로 검색..."
  emptyMessage="등록된 사용자가 없습니다."
/>`}
        notes={[
          "컬럼 정의는 별도 파일(예: users-columns.tsx)로 분리해 재사용성을 높이세요.",
          "DataTableColumnHeader를 헤더로 쓰면 정렬/숨김 메뉴가 자동 추가됩니다.",
          "searchColumnId를 지정하면 해당 컬럼에 대한 단일 검색 입력이 활성화됩니다.",
        ]}
      />
    </>
  );
}
