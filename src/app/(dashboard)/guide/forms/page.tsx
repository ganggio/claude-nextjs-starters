import type { Metadata } from "next";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ExampleCard } from "@/components/guide/example-card";
import { MiniFormDemo } from "@/components/guide/mini-form-demo";

export const metadata: Metadata = {
  title: "폼 가이드",
};

/**
 * 폼 관련 컴포넌트와 RHF + Zod 통합 가이드
 * - 입력 컴포넌트 단위 사용법
 * - 가장 작은 단위의 RHF + Zod 데모
 * - 풀 데모는 /forms 페이지 참조
 */
export default function GuideFormsPage() {
  return (
    <>
      <ExampleCard
        title="Input + Label"
        description="가장 기본적인 텍스트 입력. 항상 Label과 짝지어 사용해 접근성을 보장합니다."
        preview={
          <div className="w-full max-w-sm space-y-2">
            <Label htmlFor="example-email">이메일</Label>
            <Input
              id="example-email"
              type="email"
              placeholder="user@example.com"
            />
          </div>
        }
        code={`import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div className="space-y-2">
  <Label htmlFor="email">이메일</Label>
  <Input id="email" type="email" placeholder="user@example.com" />
</div>`}
        notes={[
          "Label의 htmlFor와 Input의 id가 일치해야 클릭 시 포커스가 이동합니다.",
          "type 속성으로 email, password, number, search 등 적절한 입력 모드를 지정하세요.",
        ]}
        warnings={[
          "Label 없는 Input은 스크린 리더 사용자에게 무엇을 입력하는지 전달되지 않습니다.",
        ]}
      />

      <ExampleCard
        title="Textarea"
        description="여러 줄 텍스트 입력. 소개글, 설명, 메모 등에 사용."
        preview={
          <div className="w-full max-w-sm space-y-2">
            <Label htmlFor="example-bio">소개</Label>
            <Textarea
              id="example-bio"
              placeholder="자신을 소개해 주세요"
              className="min-h-24"
            />
          </div>
        }
        code={`import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

<div className="space-y-2">
  <Label htmlFor="bio">소개</Label>
  <Textarea
    id="bio"
    placeholder="자신을 소개해 주세요"
    className="min-h-24"
  />
</div>`}
        notes={[
          "min-h-* 클래스로 기본 높이를 조정하세요.",
          "resize-none을 추가하면 사용자가 크기를 조절할 수 없습니다.",
        ]}
      />

      <ExampleCard
        title="Select"
        description="여러 옵션 중 하나를 고르는 드롭다운."
        preview={
          <div className="w-full max-w-sm space-y-2">
            <Label>권한</Label>
            <Select defaultValue="viewer">
              <SelectTrigger>
                <SelectValue placeholder="권한 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">관리자</SelectItem>
                <SelectItem value="editor">편집자</SelectItem>
                <SelectItem value="viewer">뷰어</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
        code={`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select defaultValue="viewer">
  <SelectTrigger>
    <SelectValue placeholder="권한 선택" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="admin">관리자</SelectItem>
    <SelectItem value="editor">편집자</SelectItem>
    <SelectItem value="viewer">뷰어</SelectItem>
  </SelectContent>
</Select>`}
        notes={[
          "옵션이 5개 이상이면 검색 가능한 Combobox(향후 추가 예정)를 고려하세요.",
          "RHF와 함께 쓸 때는 onValueChange={field.onChange} 패턴을 사용합니다.",
        ]}
      />

      <ExampleCard
        title="Checkbox"
        description="여러 항목을 동시에 선택하거나 단일 동의를 받을 때 사용."
        preview={
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox id="agree-terms" defaultChecked />
              <Label htmlFor="agree-terms" className="cursor-pointer">
                이용약관에 동의합니다
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="receive-news" />
              <Label htmlFor="receive-news" className="cursor-pointer">
                뉴스레터 수신
              </Label>
            </div>
          </div>
        }
        code={`import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

<div className="flex items-center gap-2">
  <Checkbox id="agree" defaultChecked />
  <Label htmlFor="agree" className="cursor-pointer">
    이용약관에 동의합니다
  </Label>
</div>`}
        notes={[
          "Label 클릭으로도 체크박스가 토글되도록 htmlFor를 꼭 연결하세요.",
        ]}
      />

      <ExampleCard
        title="RadioGroup"
        description="여러 옵션 중 단 하나만 선택. 옵션이 적을 때(2~5개) 권장."
        preview={
          <RadioGroup defaultValue="weekly" className="space-y-2">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="daily" id="freq-daily" />
              <Label htmlFor="freq-daily" className="cursor-pointer">
                매일
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="weekly" id="freq-weekly" />
              <Label htmlFor="freq-weekly" className="cursor-pointer">
                매주
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="monthly" id="freq-monthly" />
              <Label htmlFor="freq-monthly" className="cursor-pointer">
                매월
              </Label>
            </div>
          </RadioGroup>
        }
        code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

<RadioGroup defaultValue="weekly">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="daily" id="daily" />
    <Label htmlFor="daily">매일</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="weekly" id="weekly" />
    <Label htmlFor="weekly">매주</Label>
  </div>
</RadioGroup>`}
      />

      <ExampleCard
        title="Switch"
        description="ON/OFF 즉시 전환되는 토글. 설정값 변경에 자주 사용."
        preview={
          <div className="flex items-center gap-3">
            <Switch id="airplane" defaultChecked />
            <Label htmlFor="airplane" className="cursor-pointer">
              비행기 모드
            </Label>
          </div>
        }
        code={`import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

<div className="flex items-center gap-3">
  <Switch id="airplane" defaultChecked />
  <Label htmlFor="airplane">비행기 모드</Label>
</div>`}
        notes={[
          "Switch는 변경 즉시 반영되는 옵션에 어울립니다 (저장 버튼 없이).",
          "결과가 즉시 반영되지 않는다면 Checkbox + 저장 버튼이 더 적절합니다.",
        ]}
      />

      <ExampleCard
        title="React Hook Form + Zod (미니 예제)"
        description="실제 폼은 이 패턴을 그대로 확장합니다. 닉네임 1개 필드로 핵심 흐름을 익혀 보세요."
        preview={<MiniFormDemo />}
        code={`"use client";

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

const schema = z.object({
  nickname: z.string().min(2, "닉네임은 2자 이상이어야 합니다."),
});

type FormInput = z.infer<typeof schema>;

export function MiniFormDemo() {
  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: { nickname: "" },
  });

  const onSubmit = (values: FormInput) => {
    toast.success(\`안녕하세요, \${values.nickname}님!\`);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
        <Button type="submit">제출</Button>
      </form>
    </Form>
  );
}`}
        notes={[
          "Zod 스키마는 lib/validations/ 디렉토리에 모아 관리하세요.",
          "복잡한 폼 데모는 /forms 페이지의 ProfileForm을 참고하세요.",
          "Zod v4에서는 z.email()처럼 최상위 함수를 사용합니다 (z.string().email()은 deprecated).",
        ]}
        warnings={[
          "useForm을 사용하는 컴포넌트는 \"use client\" 지시어가 반드시 필요합니다.",
        ]}
      />
    </>
  );
}
