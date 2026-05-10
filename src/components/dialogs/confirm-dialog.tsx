"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
  /** 다이얼로그 열림 상태 */
  open: boolean;
  /** 열림 상태 변경 핸들러 (Esc, 외부 클릭 등) */
  onOpenChange: (open: boolean) => void;
  /** 다이얼로그 제목 */
  title: string;
  /** 본문 설명 */
  description?: string;
  /** 확인 버튼 라벨 (기본: "확인") */
  confirmLabel?: string;
  /** 취소 버튼 라벨 (기본: "취소") */
  cancelLabel?: string;
  /** 위험한 액션 여부 (true면 destructive variant) */
  destructive?: boolean;
  /** 확인 클릭 핸들러. Promise 반환 시 로딩 표시 */
  onConfirm: () => void | Promise<void>;
}

/**
 * 표준 확인 다이얼로그
 * - 삭제, 발행 취소 등 위험한 액션 전 확인용
 * - destructive prop으로 시각적으로 위험성 강조
 * - onConfirm이 비동기일 경우 자동으로 로딩 스피너 표시
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  destructive = false,
  onConfirm,
}: ConfirmDialogProps) {
  const [isPending, setIsPending] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsPending(true);
      await onConfirm();
      onOpenChange(false);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={destructive ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-1 size-4 animate-spin" />}
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
