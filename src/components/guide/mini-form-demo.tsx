"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

/** 데모용 닉네임 최소 길이 */
const NICKNAME_MIN = 2;

/** 가이드 페이지 미니 폼 스키마 */
const miniSchema = z.object({
  nickname: z
    .string()
    .min(NICKNAME_MIN, `닉네임은 ${NICKNAME_MIN}자 이상이어야 합니다.`),
});

type MiniInput = z.infer<typeof miniSchema>;

/**
 * 가이드용 미니 폼 데모 (RHF + Zod 최소 예제)
 * - 1개 필드만으로 패턴을 이해할 수 있도록 구성
 * - 실제 페이지에서는 ProfileForm 같은 큰 예제를 참고
 */
export function MiniFormDemo() {
  const form = useForm<MiniInput>({
    resolver: zodResolver(miniSchema),
    defaultValues: { nickname: "" },
  });

  const onSubmit = (values: MiniInput) => {
    toast.success(`안녕하세요, ${values.nickname}님!`);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-3"
      >
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>닉네임</FormLabel>
              <FormControl>
                <Input placeholder="2자 이상" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          제출
        </Button>
      </form>
    </Form>
  );
}
