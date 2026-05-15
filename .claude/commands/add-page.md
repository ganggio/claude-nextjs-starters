---
description: 라우트 그룹/dynamic segment/nav 등록까지 한 번에 처리하는 페이지 스캐폴더
argument-hint: <group> <route-path> [--dynamic] [--nav "메뉴 라벨"] [--icon LucideName]
---

# /add-page — Next.js 16 페이지 스캐폴더

이 저장소의 라우트 그룹 컨벤션과 `nav-config.ts` 단일 소스 패턴을 그대로 적용하는 페이지 생성 커맨드입니다.

## 입력

`$ARGUMENTS`로 다음을 받습니다.

- `<group>` — `dashboard` | `auth` (필수). `src/app/(dashboard)/` 또는 `src/app/(auth)/` 아래에 생성됩니다.
- `<route-path>` — 그룹 안에서의 경로. 예: `reports`, `reports/[id]`, `settings/api-keys`. 슬래시로 중첩 가능, `[xxx]` 표기로 dynamic segment 지정.
- `--nav "라벨"` — `(dashboard)` 그룹 한정. `src/lib/nav-config.ts`의 `sidebarNav`에 자동 등록할 메뉴 라벨. 미지정 시 nav 등록은 생략(상세 페이지처럼 메뉴에 안 띄울 때).
- `--icon LucideName` — `--nav`와 함께 쓸 lucide-react 아이콘 컴포넌트명. 미지정 시 `FileText`.
- `--group "그룹명"` — `sidebarNav`에서 항목을 넣을 그룹(`개요` | `관리` | `가이드` | `기타`). 미지정 시 `관리`.

인자가 부족하거나 그룹이 잘못되면 즉시 사용자에게 되묻고 진행하지 마세요. 추측 금지.

## 사전 체크

작성 전에 반드시 확인:

1. 대상 경로가 이미 존재하는지 — 존재하면 덮어쓰지 말고 사용자에게 알리고 중단.
2. `src/app/(dashboard)/layout.tsx` / `src/app/(auth)/layout.tsx`가 살아있는지 (셸 가정 깨지지 않았는지).
3. `auth` 그룹은 사이드바에 표시되지 않으므로 `--nav` 옵션이 같이 들어왔다면 무시하고 그 사실을 한 줄로 알려주기.

## 생성 규칙

### 공통

- 파일 위치: `src/app/(<group>)/<route-path>/page.tsx`
- `export const metadata: Metadata` 또는 dynamic이면 `generateMetadata` 둘 중 하나는 반드시 포함.
- 함수에는 한국어 JSDoc.
- 매직 넘버/색상 하드코딩 금지. shadcn 컴포넌트(`Card`, `Button` 등)와 `bg-background text-foreground` 같은 시맨틱 토큰 사용.
- `console.log` 금지. 사용자 피드백이 필요하면 `sonner` toast.
- `any` 금지.

### dashboard 그룹 (정적 페이지)

`src/components/feedback/page-header`의 `PageHeader`를 상단에 두고, 본문은 `Card`로 감싼 placeholder 한 개로 시작. 사용자가 즉시 채워 넣을 수 있도록 TODO 주석은 붙이지 않습니다(짜투리 코멘트 금지 컨벤션).

기본 골격:

```tsx
import type { Metadata } from "next";

import { PageHeader } from "@/components/feedback/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "<페이지 타이틀>",
};

/** <페이지 한 줄 설명> */
export default function Page() {
  return (
    <>
      <PageHeader title="<페이지 타이틀>" description="<설명>" />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">개요</CardTitle>
        </CardHeader>
        <CardContent />
      </Card>
    </>
  );
}
```

### dashboard 그룹 + dynamic segment (`[id]` 등)

`src/app/(dashboard)/users/[id]/page.tsx`를 표준 템플릿으로 따릅니다. 즉:

- `interface PageProps { params: Promise<{ <segment>: string }>; }` — **`params`는 Promise**. 절대 동기 객체로 쓰지 마세요.
- `generateMetadata`도 `await params`로 풀어야 합니다.
- 페이지 함수도 `async` + `await params`.
- 데이터 미존재 시 `notFound()` 호출 분기까지 포함 (실제 데이터 소스가 없으면 주석 없이 분기만 남기고 사용자가 채우게).

골격:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/feedback/page-header";

interface PageProps {
  /** Next.js 16: params는 Promise로 전달됨 */
  params: Promise<{ <segment>: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { <segment> } = await params;
  return { title: `<라벨> ${<segment>}` };
}

/** <페이지 설명> */
export default async function Page({ params }: PageProps) {
  const { <segment> } = await params;

  // 데이터 조회 실패 시 404
  // const item = await fetchItem(<segment>);
  // if (!item) notFound();

  return (
    <>
      <PageHeader title={`<라벨> ${<segment>}`} description="<설명>" />
    </>
  );
}
```

`notFound` import는 사용하지 않으면 빠뜨려도 무방하지만, dynamic 페이지는 거의 항상 필요하므로 기본 포함하고 사용처를 주석으로 남깁니다(이건 "왜 import되어 있는가"가 비자명한 케이스라 한 줄 주석 허용).

### auth 그룹

`src/app/(auth)/login/page.tsx` 류와 같이 폼 한 개를 담는 미니멀 카드 셸. `PageHeader`는 쓰지 않습니다(auth 레이아웃이 이미 중앙 정렬 셸 제공). 골격은 `Card` + `CardHeader`(타이틀/설명) + `CardContent`(폼 자리) 정도로만 시작.

폼이 들어갈 가능성이 높으므로 주석으로 RHF + Zod 조합 위치(`src/lib/validations/auth.ts`)만 한 줄 안내합니다.

## nav-config 자동 등록

`--nav`가 들어왔고 그룹이 `dashboard`면:

1. `src/lib/nav-config.ts` 상단의 lucide-react import 블록에 `--icon`으로 받은 아이콘을 추가(이미 import되어 있으면 스킵).
2. `--group` 옵션이 가리키는 `NavGroup`의 `items` 배열 끝에 새 항목 추가:

   ```ts
   {
     title: "<라벨>",
     href: "/<route-path 중 dynamic이 아닌 첫 segment까지>",
     icon: <LucideName>,
   },
   ```

3. dynamic segment(`[id]` 등)가 포함된 경로는 nav에 등록하지 않습니다. 사용자에게 "상세 페이지는 사이드바에 등록하지 않는 것이 컨벤션"이라고 한 줄로 알리고 nav 수정은 스킵.

수정 시 Edit 도구로 한 항목씩 정확히 추가. 들여쓰기는 스페이스 2칸, 기존 객체 포맷 그대로.

## 실행 후

1. `npm run lint`를 실행해서 새 파일에서 발생한 경고/에러가 없는지 확인.
   - 기존부터 있던 `data-table.tsx` React Compiler 경고 1건은 무시(CLAUDE.md에 명시됨).
2. dev 서버가 떠 있다면 Playwright MCP로 새 라우트 진입 + `mcp__playwright__browser_console_messages`로 에러 0건 확인. dev 서버가 없으면 사용자에게 "dev 서버 띄우면 자동 검증해줄게요"라고 한 줄 안내만.
3. nav 등록을 했다면 `/dashboard`에서 사이드바에 노출되는지, Cmd+K 팔레트에서도 검색되는지 확인하라고 한 줄 안내.

## 출력 형식

마지막에 사용자에게 다음 3줄로 요약:

- 생성한 파일 경로(클릭 가능한 `path:line` 형식, 페이지 함수 줄 번호 포함)
- nav-config 수정 여부 (했다면 추가된 그룹/라벨, 안 했다면 그 이유)
- 다음 행동 제안 1줄 (예: "이제 `<Card>` 안에 데이터 테이블을 넣어보세요")

장황한 사용 설명은 금지. 변경사항 + 다음 행동만.

## 인자 예시

```
/add-page dashboard reports --nav "리포트" --icon BarChart3 --group 관리
/add-page dashboard reports/[id]
/add-page dashboard settings/api-keys --nav "API 키" --icon Key --group 기타
/add-page auth verify-email
```
