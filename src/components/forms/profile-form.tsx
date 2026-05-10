"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  userProfileSchema,
  type UserProfileInput,
} from "@/lib/validations/user";

/** 가짜 비동기 제출 지연 (ms) */
const FAKE_SUBMIT_DELAY_MS = 800;

/**
 * 프로필 수정 폼 (RHF + Zod 데모)
 * - shadcn Form + react-hook-form + zod resolver의 표준 통합 패턴
 * - 제출 시 가짜 비동기 후 sonner toast 알림
 */
export function ProfileForm() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<UserProfileInput>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      role: "viewer",
      receiveNotifications: true,
    },
  });

  /** 폼 제출 핸들러 - 가짜 API 호출 시뮬레이션 */
  const onSubmit = async (values: UserProfileInput) => {
    try {
      setIsPending(true);
      await new Promise((resolve) => setTimeout(resolve, FAKE_SUBMIT_DELAY_MS));
      toast.success("프로필이 저장되었습니다.", {
        description: `${values.name}님의 정보가 업데이트되었습니다.`,
      });
      form.reset(values);
    } catch {
      toast.error("저장에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input placeholder="홍길동" {...field} />
              </FormControl>
              <FormDescription>
                다른 사용자에게 표시되는 이름입니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input type="email" placeholder="user@example.com" {...field} />
              </FormControl>
              <FormDescription>
                알림과 로그인에 사용되는 이메일입니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>소개</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="자신을 소개하는 짧은 글을 입력하세요."
                  className="resize-none min-h-24"
                  {...field}
                />
              </FormControl>
              <FormDescription>최대 200자까지 입력할 수 있습니다.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>권한</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="권한 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">관리자</SelectItem>
                  <SelectItem value="editor">편집자</SelectItem>
                  <SelectItem value="viewer">뷰어</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="receiveNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 rounded-lg border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-0.5">
                <FormLabel className="cursor-pointer">
                  이메일 알림 수신
                </FormLabel>
                <FormDescription>
                  주요 업데이트와 활동 알림을 이메일로 받습니다.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isPending}
          >
            초기화
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-1 size-4 animate-spin" />}
            저장
          </Button>
        </div>
      </form>
    </Form>
  );
}
