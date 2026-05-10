import type { Metadata } from "next";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/feedback/empty-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { ExampleCard } from "@/components/guide/example-card";
import { ConfirmDialogDemo } from "@/components/guide/confirm-dialog-demo";
import { ToastDemo } from "@/components/guide/toast-demo";

export const metadata: Metadata = {
  title: "피드백 가이드",
};

/**
 * 사용자 피드백 패턴 가이드
 * - Toast (sonner): 결과 알림
 * - Skeleton, Progress, LoadingState: 로딩 상태
 * - EmptyState: 빈 상태
 * - ConfirmDialog: 위험한 액션 확인
 */
export default function GuideFeedbackPage() {
  return (
    <>
      <ExampleCard
        title="Toast (sonner)"
        description="작업 결과를 우측 하단에 일시적으로 표시. console.log 대신 사용하세요."
        preview={<ToastDemo />}
        code={`"use client";

import { toast } from "sonner";

// 성공 / 에러 / 정보 / 경고
toast.success("저장되었습니다.");
toast.error("문제가 발생했습니다.", {
  description: "잠시 후 다시 시도해 주세요.",
});
toast.info("새 업데이트가 있습니다.");
toast.warning("저장하지 않은 변경사항이 있습니다.");

// 비동기 작업 - 로딩/성공/실패 자동 전환
toast.promise(
  fetch("/api/upload").then((r) => r.json()),
  {
    loading: "업로드 중...",
    success: "업로드 완료!",
    error: "업로드 실패",
  },
);`}
        notes={[
          "Toaster는 이미 src/components/providers.tsx에 등록되어 있어 어디서든 toast 함수만 import해서 쓰면 됩니다.",
          "테마(라이트/다크)는 자동으로 동기화됩니다.",
        ]}
        warnings={[
          "console.log를 사용자 피드백 용도로 쓰지 마세요. 항상 toast를 사용합니다.",
        ]}
      />

      <ExampleCard
        title="ConfirmDialog (확인 다이얼로그)"
        description="삭제 등 되돌릴 수 없는 액션 직전에 확인을 받는 표준 패턴."
        preview={<ConfirmDialogDemo />}
        code={`"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/dialogs/confirm-dialog";

export function DeleteAccountButton() {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    await deleteAccount(); // 실제 API 호출
    toast.success("계정이 삭제되었습니다.");
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        계정 삭제
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="정말 계정을 삭제하시겠어요?"
        description="이 작업은 되돌릴 수 없습니다."
        confirmLabel="삭제"
        destructive
        onConfirm={handleConfirm}
      />
    </>
  );
}`}
        notes={[
          "onConfirm이 Promise를 반환하면 자동으로 로딩 스피너가 표시됩니다.",
          "destructive prop은 위험한 액션임을 시각적으로 강조합니다.",
        ]}
        warnings={[
          "삭제, 발행 취소, 멤버 추방 등 되돌리기 어려운 액션에는 반드시 사용하세요.",
        ]}
      />

      <ExampleCard
        title="Skeleton"
        description="비동기 로딩 동안 콘텐츠 자리를 잡아 레이아웃 흔들림 방지."
        preview={
          <div className="w-full max-w-sm space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
            <Skeleton className="h-20 w-full" />
          </div>
        }
        code={`import { Skeleton } from "@/components/ui/skeleton";

<div className="space-y-3">
  <div className="flex items-center gap-3">
    <Skeleton className="size-10 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  </div>
  <Skeleton className="h-20 w-full" />
</div>`}
        notes={[
          "실제 콘텐츠와 비슷한 비율로 만들면 로딩 → 표시 전환이 자연스럽습니다.",
        ]}
      />

      <ExampleCard
        title="Progress"
        description="진행률을 시각적으로 표시. 업로드, 단계별 작업 등에 활용."
        preview={
          <div className="w-full max-w-sm space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>업로드 중</span>
                <span className="text-muted-foreground">33%</span>
              </div>
              <Progress value={33} />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>거의 완료</span>
                <span className="text-muted-foreground">82%</span>
              </div>
              <Progress value={82} />
            </div>
          </div>
        }
        code={`import { Progress } from "@/components/ui/progress";

<Progress value={33} />
<Progress value={82} />

{/* 라벨과 함께 */}
<div className="space-y-1">
  <div className="flex justify-between text-xs">
    <span>업로드 중</span>
    <span>33%</span>
  </div>
  <Progress value={33} />
</div>`}
        notes={["value는 0~100 사이의 숫자입니다."]}
      />

      <ExampleCard
        title="LoadingState"
        description="페이지 내 부분 영역 로딩 표시. 라우트 단위 로딩은 app/loading.tsx를 사용하세요."
        preview={
          <div className="w-full max-w-sm rounded-md border">
            <LoadingState message="사용자 목록을 불러오는 중..." />
          </div>
        }
        code={`import { LoadingState } from "@/components/feedback/loading-state";

{isLoading ? (
  <LoadingState message="사용자 목록을 불러오는 중..." />
) : (
  <UserList users={users} />
)}`}
      />

      <ExampleCard
        title="EmptyState"
        description="데이터가 비어 있을 때 표시. 다음 액션을 안내하는 버튼을 함께 제공하면 UX가 좋아집니다."
        preview={
          <div className="w-full max-w-md rounded-md border">
            <EmptyState
              title="아직 등록된 항목이 없습니다"
              description="첫 번째 항목을 추가해 시작하세요."
              action={
                <Button>
                  <Plus />
                  항목 추가
                </Button>
              }
            />
          </div>
        }
        code={`import { EmptyState } from "@/components/feedback/empty-state";
import { Button } from "@/components/ui/button";
import { Plus, Inbox } from "lucide-react";

<EmptyState
  icon={Inbox} // 기본값
  title="아직 등록된 항목이 없습니다"
  description="첫 번째 항목을 추가해 시작하세요."
  action={
    <Button>
      <Plus />
      항목 추가
    </Button>
  }
/>`}
        notes={[
          "icon prop으로 lucide-react 아이콘을 전달할 수 있습니다 (기본은 Inbox).",
          "검색 결과 없음 같은 경우에도 활용하세요.",
        ]}
      />
    </>
  );
}
