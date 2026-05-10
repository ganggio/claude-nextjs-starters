# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 가장 중요: 이 Next.js는 당신이 아는 그것이 아닙니다

이 저장소는 **Next.js 16 + React 19 + Tailwind CSS v4** 위에 있습니다. API, 컨벤션, 파일 구조가 학습 데이터의 Next.js 13~15와 다를 수 있습니다.

- 코드를 작성/수정하기 전에 `node_modules/next/dist/docs/01-app/`의 관련 가이드를 먼저 읽으세요.
- deprecation 경고가 보이면 무시하지 말고 따르세요.
- 잘 모르겠으면 추측하지 말고 docs 또는 기존 코드 패턴을 확인하세요.

## 자주 쓰는 명령

```bash
npm run dev      # 개발 서버 (Turbopack 기본, http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint (eslint-config-next 기반)
```

테스트 러너는 설정되어 있지 않습니다. 검증은 `npm run lint`와 `npm run build`로 합니다. UI 동작 확인이 필요하면 dev 서버를 띄우고 Playwright MCP(`.mcp.json`에 등록됨)로 브라우저에서 검증하세요.

`npm run lint`에서 `src/components/data-table/data-table.tsx`의 React Compiler 호환성 경고 1건은 **알려진 외부 라이브러리(TanStack Table) 한계**이며 무시해도 됩니다. 새로 들어오는 경고/에러만 잡으세요.

## 알아두어야 할 Next 16 / React 19 패턴

이 저장소가 실제로 사용하는 패턴들 — 변경 시 그대로 따라야 합니다.

### 동적 라우트의 `params`는 Promise

`[id]` 같은 dynamic segment의 `params`는 **Promise로 전달**됩니다. `await`으로 풀어 쓰세요. `generateMetadata`에서도 마찬가지입니다.

```ts
// src/app/(dashboard)/users/[id]/page.tsx 참고
interface Props { params: Promise<{ id: string }>; }
export default async function Page({ params }: Props) {
  const { id } = await params;
}
```

### SSR / 첫 렌더 mismatch 가드

`useMediaQuery`, `useTheme`, 그 외 클라이언트 환경에 의존하는 훅은 SSR 결과(`window` 없음)와 클라이언트 첫 렌더 결과가 달라 hydration mismatch를 일으킵니다. 이 저장소의 컨벤션은 **`useIsClient`로 가드**하는 것입니다.

선례:
- `src/components/layout/theme-toggle.tsx` — 마운트 전에는 placeholder 아이콘
- `src/components/dashboard/appearance-settings.tsx` — 동일 패턴
- `src/components/guide/usehooks-demo.tsx` — `useMediaQuery` 분기 가드

새 클라이언트 컴포넌트에서 위 훅을 쓸 때마다 이 패턴을 그대로 적용하세요. `/guide/libraries` 페이지의 본문이 사용자 대상으로도 같은 가이드를 보여주고 있어, 데모 코드와 가이드 텍스트가 일치해야 합니다.

### 루트 레이아웃의 `suppressHydrationWarning`

`src/app/layout.tsx`의 `<html>` 태그에 붙어 있습니다. 이는 `next-themes`가 클라이언트에서 `class`를 변경하기 때문에 **필수**입니다. 제거하지 마세요.

## 아키텍처 대략

상세 디렉토리 트리는 `README.md`에 있습니다. 여기서는 여러 파일을 읽지 않으면 보이지 않는 부분만 정리합니다.

### 라우트 그룹 두 개

`src/app/` 아래에 두 그룹이 있고, **각 그룹이 자체 layout을 가집니다**.
- `(dashboard)` — Sidebar + Header 셸. 모든 내부 페이지는 이 셸 안에서 렌더됨.
- `(auth)` — 로그인/회원가입/비밀번호 찾기. 별도 미니멀 셸.

URL 경로에는 그룹 이름이 들어가지 않습니다. `/dashboard`, `/users`, `/login` 같은 식.

### Provider는 한 곳에만

`src/components/providers.tsx`가 `ThemeProvider` + `TooltipProvider` + `Toaster`(sonner)를 묶고, `app/layout.tsx`에서 단 한 번 마운트됩니다. 새 글로벌 provider가 필요하면 이 파일에 추가하세요. 페이지/그룹 layout에 provider를 추가하지 마세요.

### 사이드바·명령 팔레트는 같은 데이터 소스

`src/lib/nav-config.ts`의 `sidebarNav`가 사이드바와 cmdk 명령 팔레트(Cmd+K)의 **단일 소스**입니다. 메뉴를 추가하려면 이 파일만 수정하면 두 군데에 동시에 반영됩니다.

### Tailwind v4 + radix-nova shadcn

- Tailwind 설정은 `src/app/globals.css`의 `@theme inline` 블록에 있습니다 (v4 방식, `tailwind.config.*` 파일 없음).
- shadcn 컴포넌트는 `radix-nova` 스타일이며 `components.json`에 고정되어 있습니다. 추가는 `npx shadcn@latest add <name>`.
- 색상은 CSS 변수 기반. 새 컴포넌트도 `bg-background text-foreground` 같은 시맨틱 토큰을 쓰세요.

### 매직 넘버는 `lib/constants.ts`로

브레이크포인트, 사이드바 너비, 토스트 지속시간 등은 모두 `src/lib/constants.ts`에 모여 있습니다. 컴포넌트 안에 숫자를 박아넣지 말고 여기에 추가한 뒤 import하세요. Tailwind 클래스(`w-64`, `h-14` 등)와 상수가 짝을 이루므로 한쪽만 바꾸면 어긋납니다.

### Zod 스키마 위치

`src/lib/validations/`에 도메인별로 분리되어 있습니다 (`auth.ts`, `user.ts`). 새 폼은 RHF + zod v4 + `@hookform/resolvers/zod` 조합을 따르세요. 기존 폼(`src/components/auth/*`, `src/components/forms/*`)이 표준 패턴입니다.

## 코딩 규약 (이 저장소 한정)

전역 규칙은 사용자 `~/.claude/CLAUDE.md`에 있고, 여기서는 **이 저장소에서 특히 강제되는 것**만 적습니다.

- `console.log` 금지 → 사용자 피드백은 `sonner` toast로.
- `any` 금지 (tsconfig `strict: true`).
- 함수에 한국어 JSDoc 주석. 단, README/가이드 본문에서 자명한 내용은 생략.
- shadcn 컴포넌트 작성 시 `data-slot` 속성, CVA, `cn()` 유틸 패턴 유지.
- 경로 alias는 `@/*` → `src/*` 만 씁니다 (tsconfig).

## Playwright MCP로 UI 검증

`.mcp.json`에 Playwright MCP 서버가 등록되어 있어 Claude Code가 직접 브라우저로 페이지를 열고 콘솔/네트워크 에러를 수집할 수 있습니다. UI 변경 후 검증 흐름:

1. dev 서버가 떠 있는지 확인 (`http://localhost:3000`).
2. `mcp__playwright__browser_navigate`로 변경한 라우트 진입.
3. `mcp__playwright__browser_console_messages`로 에러/경고 0건 확인.
4. 회귀로 `/dashboard`, `/guide/libraries`(hydration 회귀 단골), 변경한 페이지를 한 번씩 점검.

`.playwright-mcp/` 디렉토리는 자동 생성되는 임시 산출물이며 `.gitignore`에 등록되어 있습니다.
