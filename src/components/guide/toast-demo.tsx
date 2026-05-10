"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

/** Toast 데모용 가짜 비동기 지연 (ms) */
const FAKE_PROMISE_DELAY_MS = 1500;

/**
 * sonner toast 4가지 변형 데모 버튼 모음
 * - 성공/에러/정보/경고 + Promise 패턴
 */
export function ToastDemo() {
  return (
    <>
      <Button
        variant="outline"
        onClick={() => toast.success("저장되었습니다.")}
      >
        성공
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error("문제가 발생했습니다.", {
            description: "잠시 후 다시 시도해 주세요.",
          })
        }
      >
        에러 (설명 포함)
      </Button>
      <Button variant="outline" onClick={() => toast.info("새 업데이트가 있습니다.")}>
        정보
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning("저장하지 않은 변경사항이 있습니다.")}
      >
        경고
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          /** 비동기 작업의 진행/성공/실패를 한 번에 표시 */
          toast.promise(
            new Promise((resolve) => setTimeout(resolve, FAKE_PROMISE_DELAY_MS)),
            {
              loading: "업로드 중...",
              success: "업로드가 완료되었습니다.",
              error: "업로드에 실패했습니다.",
            },
          );
        }}
      >
        Promise (비동기)
      </Button>
    </>
  );
}
