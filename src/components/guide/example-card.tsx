import { AlertTriangle, Info } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/guide/code-block";
import { cn } from "@/lib/utils";

interface ExampleCardProps {
  /** 예제 제목 */
  title: string;
  /** 예제 설명 - 언제, 어떻게 쓰는지 */
  description: string;
  /** 미리보기 영역에 렌더할 React 노드 */
  preview: React.ReactNode;
  /** 코드 스니펫 문자열 */
  code: string;
  /** 추가 정보 - 함께 쓰는 컴포넌트, import 경로 등 */
  notes?: string[];
  /** 주의사항 - 자주 하는 실수, 필수 조건 등 */
  warnings?: string[];
}

/**
 * 가이드 페이지의 단일 예제 카드
 * - 제목/설명 헤더
 * - Tabs로 미리보기 / 코드 전환
 * - 추가 정보(notes)와 주의사항(warnings)을 별도 영역에 표시
 *
 * 모든 가이드 페이지가 이 카드를 반복 사용하므로 일관된 학습 경험 제공
 */
export function ExampleCard({
  title,
  description,
  preview,
  code,
  notes,
  warnings,
}: ExampleCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">미리보기</TabsTrigger>
            <TabsTrigger value="code">코드</TabsTrigger>
          </TabsList>
          <TabsContent
            value="preview"
            className="rounded-lg border bg-background p-6"
          >
            <div className="flex flex-wrap items-center gap-3">{preview}</div>
          </TabsContent>
          <TabsContent value="code" className="mt-2">
            <CodeBlock code={code} />
          </TabsContent>
        </Tabs>

        {(notes?.length || warnings?.length) && (
          <div className="space-y-2">
            {notes?.length ? (
              <InfoBlock variant="info" icon={Info} items={notes} />
            ) : null}
            {warnings?.length ? (
              <InfoBlock variant="warning" icon={AlertTriangle} items={warnings} />
            ) : null}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface InfoBlockProps {
  variant: "info" | "warning";
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
}

/** Info / Warning 두 종류의 안내 박스 */
function InfoBlock({ variant, icon: Icon, items }: InfoBlockProps) {
  return (
    <div
      className={cn(
        "rounded-md border px-4 py-3 text-sm",
        variant === "info"
          ? "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-200"
          : "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200",
      )}
    >
      <div className="flex gap-2">
        <Icon className="size-4 shrink-0 mt-0.5" aria-hidden />
        <div className="flex-1 space-y-1">
          <p className="font-medium text-xs uppercase tracking-wide">
            {variant === "info" ? "참고" : "주의"}
          </p>
          <ul className="space-y-1 list-disc pl-4">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
