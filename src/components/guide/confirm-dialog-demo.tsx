"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/dialogs/confirm-dialog";

/** 가짜 비동기 처리 지연 (ms) */
const FAKE_DELAY_MS = 800;

/**
 * ConfirmDialog 가이드용 데모
 * - 외부 상태로 open 제어
 * - onConfirm은 Promise 반환 → 자동 로딩 스피너
 */
export function ConfirmDialogDemo() {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_MS));
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
        description="이 작업은 되돌릴 수 없으며 모든 데이터가 영구적으로 삭제됩니다."
        confirmLabel="삭제"
        destructive
        onConfirm={handleConfirm}
      />
    </>
  );
}
