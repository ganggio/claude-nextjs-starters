"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/dialogs/confirm-dialog";

/** 가짜 비동기 삭제 지연 (ms) */
const FAKE_DELETE_DELAY_MS = 1000;

/**
 * 모달/다이얼로그 데모 컴포넌트
 * 3가지 패턴을 카드로 분리하여 시연:
 * 1) 정보 다이얼로그 - 단순 Dialog
 * 2) 폼 다이얼로그 - 입력 필드 포함
 * 3) 확인 다이얼로그 - ConfirmDialog (위험한 액션)
 */
export function ModalsDemo() {
  const [confirmOpen, setConfirmOpen] = useState(false);

  /** 가짜 삭제 핸들러 - 비동기 처리 시뮬레이션 */
  const handleDelete = async () => {
    await new Promise((resolve) => setTimeout(resolve, FAKE_DELETE_DELAY_MS));
    toast.success("항목이 삭제되었습니다.");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">정보 다이얼로그</CardTitle>
          <CardDescription>
            안내 메시지나 약관 등을 표시하는 단순 Dialog
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                열기
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>이용 약관</DialogTitle>
                <DialogDescription>
                  본 서비스를 이용하시려면 약관에 동의해 주셔야 합니다.
                </DialogDescription>
              </DialogHeader>
              <div className="text-sm text-muted-foreground py-4 leading-relaxed">
                본 약관은 서비스 이용과 관련하여 회사와 회원 간의 권리, 의무 및
                책임 사항을 규정함을 목적으로 합니다. 자세한 내용은 별도 문서를
                참고하세요.
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>확인</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">폼 다이얼로그</CardTitle>
          <CardDescription>
            간단한 입력을 받는 인라인 폼 Dialog
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                폴더 만들기
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>새 폴더</DialogTitle>
                <DialogDescription>
                  생성할 폴더의 이름을 입력하세요.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const name = String(formData.get("folderName") ?? "");
                  toast.success(`"${name}" 폴더를 만들었습니다.`);
                }}
                className="grid gap-4 py-2"
              >
                <div className="grid gap-2">
                  <Label htmlFor="folderName">폴더 이름</Label>
                  <Input
                    id="folderName"
                    name="folderName"
                    placeholder="새 폴더"
                    required
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      취소
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="submit">만들기</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">확인 다이얼로그</CardTitle>
          <CardDescription>
            위험한 액션 직전에 사용하는 표준 확인 패턴
          </CardDescription>
        </CardHeader>
        <CardContent />
        <CardFooter>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => setConfirmOpen(true)}
          >
            항목 삭제
          </Button>
          <ConfirmDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            title="정말 삭제하시겠어요?"
            description="이 작업은 되돌릴 수 없습니다. 항목이 영구적으로 삭제됩니다."
            confirmLabel="삭제"
            destructive
            onConfirm={handleDelete}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
