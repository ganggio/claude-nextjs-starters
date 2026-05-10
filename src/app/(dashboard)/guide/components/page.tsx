import type { Metadata } from "next";
import { Mail, Plus, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExampleCard } from "@/components/guide/example-card";

export const metadata: Metadata = {
  title: "컴포넌트 가이드",
};

/**
 * UI 원자 컴포넌트 사용법 모음
 * - Button, Badge, Avatar, Tooltip, Skeleton 등
 * - 가장 자주 쓰이는 컴포넌트부터 배치
 */
export default function GuideComponentsPage() {
  return (
    <>
      <ExampleCard
        title="Button"
        description="가장 기본이 되는 액션 컴포넌트. variant와 size 조합으로 다양한 시각적 표현 가능."
        preview={
          <>
            <Button>기본</Button>
            <Button variant="secondary">보조</Button>
            <Button variant="outline">아웃라인</Button>
            <Button variant="ghost">고스트</Button>
            <Button variant="destructive">위험</Button>
            <Button variant="link">링크</Button>
            <Button size="sm">
              <Plus />
              작은 버튼
            </Button>
            <Button disabled>비활성</Button>
          </>
        }
        code={`import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

<Button>기본</Button>
<Button variant="secondary">보조</Button>
<Button variant="outline">아웃라인</Button>
<Button variant="ghost">고스트</Button>
<Button variant="destructive">위험</Button>
<Button variant="link">링크</Button>

{/* 아이콘 + 텍스트 */}
<Button size="sm">
  <Plus />
  작은 버튼
</Button>

{/* 비활성 상태 */}
<Button disabled>비활성</Button>`}
        notes={[
          "variant: default | secondary | outline | ghost | destructive | link",
          "size: default | xs | sm | lg | icon | icon-xs | icon-sm | icon-lg",
          "asChild prop을 쓰면 Link 등으로 감쌀 수 있습니다 (예: <Button asChild><Link href=\"/\">홈</Link></Button>)",
        ]}
        warnings={[
          "삭제 등 위험한 액션에는 반드시 variant=\"destructive\" + ConfirmDialog 조합을 사용하세요.",
        ]}
      />

      <ExampleCard
        title="Badge"
        description="상태나 카테고리를 짧은 라벨로 표시할 때 사용. 색상 구분으로 의미 전달."
        preview={
          <>
            <Badge>기본</Badge>
            <Badge variant="secondary">보조</Badge>
            <Badge variant="outline">아웃라인</Badge>
            <Badge variant="destructive">위험</Badge>
          </>
        }
        code={`import { Badge } from "@/components/ui/badge";

<Badge>기본</Badge>
<Badge variant="secondary">보조</Badge>
<Badge variant="outline">아웃라인</Badge>
<Badge variant="destructive">위험</Badge>`}
        notes={[
          "테이블 셀에서 상태 표시(활성/비활성/대기)에 자주 쓰입니다.",
          "텍스트는 한두 단어로 짧게 유지하세요.",
        ]}
      />

      <ExampleCard
        title="Avatar"
        description="사용자 프로필 이미지 표시. 이미지 로드 실패 시 Fallback이 자동 노출."
        preview={
          <>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>김</AvatarFallback>
            </Avatar>
            <Avatar className="size-12">
              <AvatarFallback className="text-base">홍길동</AvatarFallback>
            </Avatar>
          </>
        }
        code={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>SC</AvatarFallback>
</Avatar>

{/* 이미지 없이 이니셜만 */}
<Avatar>
  <AvatarFallback>김</AvatarFallback>
</Avatar>

{/* 크기 조절은 className으로 */}
<Avatar className="size-12">
  <AvatarFallback className="text-base">홍길동</AvatarFallback>
</Avatar>`}
        notes={[
          "AvatarFallback에는 이름의 첫 글자나 이니셜을 넣는 것이 일반적입니다.",
          "alt 속성은 접근성을 위해 반드시 의미 있는 값을 넣으세요.",
        ]}
      />

      <ExampleCard
        title="Tooltip"
        description="마우스 hover 시 추가 설명을 표시. 아이콘 버튼에 자주 활용."
        preview={
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Mail />
              </Button>
            </TooltipTrigger>
            <TooltipContent>이메일 보내기</TooltipContent>
          </Tooltip>
        }
        code={`import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Mail } from "lucide-react";

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline" size="icon">
      <Mail />
    </Button>
  </TooltipTrigger>
  <TooltipContent>이메일 보내기</TooltipContent>
</Tooltip>`}
        notes={[
          "TooltipProvider는 이미 src/components/providers.tsx에서 전역으로 감싸고 있습니다.",
          "텍스트만 있는 버튼에는 Tooltip 대신 명확한 라벨을 쓰세요.",
        ]}
        warnings={[
          "Tooltip은 hover/focus에서만 보이므로 모바일 사용자에게는 보이지 않을 수 있습니다. 핵심 정보는 다른 방식으로도 전달하세요.",
        ]}
      />

      <ExampleCard
        title="Skeleton"
        description="비동기 데이터 로딩 중 콘텐츠 자리를 잡아 레이아웃 흔들림 방지."
        preview={
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        }
        code={`import { Skeleton } from "@/components/ui/skeleton";

<div className="flex items-center gap-3">
  <Skeleton className="size-10 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-3 w-32" />
    <Skeleton className="h-3 w-48" />
  </div>
</div>`}
        notes={[
          "실제 콘텐츠와 비슷한 크기로 만들면 로딩 → 표시 전환이 자연스럽습니다.",
          "이미 마운트된 페이지의 부분 로딩에 사용하세요. 라우트 단위 로딩은 app/loading.tsx를 활용합니다.",
        ]}
      />

      <ExampleCard
        title="Separator"
        description="콘텐츠 영역을 시각적으로 분리하는 가로/세로 선."
        preview={
          <div className="w-full max-w-sm space-y-3">
            <p className="text-sm">위 영역</p>
            <Separator />
            <p className="text-sm">아래 영역</p>
            <div className="flex h-5 items-center gap-3 text-xs">
              <span>왼쪽</span>
              <Separator orientation="vertical" />
              <span>오른쪽</span>
            </div>
          </div>
        }
        code={`import { Separator } from "@/components/ui/separator";

{/* 가로 (기본) */}
<Separator />

{/* 세로 - 부모에 명시적 높이 필요 */}
<div className="flex h-5 items-center gap-3">
  <span>왼쪽</span>
  <Separator orientation="vertical" />
  <span>오른쪽</span>
</div>`}
        warnings={[
          "세로 방향(orientation=\"vertical\")일 때는 부모 요소에 명시적 높이가 있어야 합니다.",
        ]}
      />

      <ExampleCard
        title="아이콘 + 텍스트 조합"
        description="lucide-react 아이콘은 크기/색상이 자동으로 텍스트를 따라갑니다."
        preview={
          <>
            <Button variant="outline">
              <Plus />
              추가
            </Button>
            <Button variant="destructive">
              <Trash2 />
              삭제
            </Button>
            <Button variant="ghost" size="icon">
              <Mail />
            </Button>
          </>
        }
        code={`import { Plus, Trash2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

<Button variant="outline">
  <Plus />
  추가
</Button>

<Button variant="destructive">
  <Trash2 />
  삭제
</Button>

{/* 아이콘만 - aria-label 권장 */}
<Button variant="ghost" size="icon" aria-label="이메일 보내기">
  <Mail />
</Button>`}
        notes={[
          "아이콘은 className 없이 두면 버튼 size에 맞게 자동 조정됩니다.",
          "아이콘만 있는 버튼은 aria-label로 의미를 제공해 접근성을 챙기세요.",
        ]}
      />
    </>
  );
}
