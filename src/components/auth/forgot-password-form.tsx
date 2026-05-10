"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/validations/auth";

/** 가짜 메일 발송 지연 (ms) */
const FAKE_SEND_DELAY_MS = 800;

/**
 * 비밀번호 찾기 폼 (UI 셔틀)
 * - 이메일 1개 필드만 받아 가짜 발송 toast 표시
 */
export function ForgotPasswordForm() {
  const [isPending, setIsPending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordInput) => {
    try {
      setIsPending(true);
      await new Promise((resolve) => setTimeout(resolve, FAKE_SEND_DELAY_MS));
      toast.success("재설정 링크를 보내드렸습니다.", {
        description: `${values.email}으로 발송된 메일을 확인해 주세요.`,
      });
      setIsSent(true);
    } catch {
      toast.error("메일 발송에 실패했습니다.");
    } finally {
      setIsPending(false);
    }
  };

  if (isSent) {
    return (
      <div className="text-center space-y-2 py-4">
        <p className="text-sm">메일을 발송했습니다.</p>
        <p className="text-sm text-muted-foreground">
          받은 편지함에서 재설정 링크를 확인해 주세요.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-1 size-4 animate-spin" />}
          재설정 링크 받기
        </Button>
      </form>
    </Form>
  );
}
