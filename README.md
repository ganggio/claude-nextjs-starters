# Claude Next.js 대시보드 스타터킷

Next.js 16 + React 19 + Tailwind CSS v4 + shadcn/ui(radix-nova) 기반의 모던 대시보드 스타터킷입니다.
빠르게 새로운 웹 애플리케이션을 시작할 수 있도록 자주 쓰이는 컴포넌트, 레이아웃, 예제 페이지를 미리 갖춘 시작점입니다.

## 기술 스택

| 영역          | 라이브러리                             |
| ------------- | -------------------------------------- |
| 프레임워크    | Next.js 16 (App Router, Turbopack)     |
| 라이브러리    | React 19                               |
| 언어          | TypeScript (strict)                    |
| 스타일        | Tailwind CSS v4 (`@theme inline`)      |
| UI 컴포넌트   | shadcn/ui (radix-nova) + radix-ui      |
| 아이콘        | lucide-react                           |
| 테마          | next-themes                            |
| 토스트        | sonner                                 |
| 데이터 테이블 | @tanstack/react-table v8               |
| 폼            | react-hook-form + zod v4               |
| 명령 팔레트   | cmdk                                   |
| 날짜          | date-fns                               |
| 공통 훅       | usehooks-ts                            |

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx                    # 루트 레이아웃 + Providers
│   ├── globals.css                   # Tailwind v4 + 테마 변수
│   ├── page.tsx                      # /dashboard 리다이렉트
│   ├── (dashboard)/                  # 대시보드 라우트 그룹
│   │   ├── layout.tsx                # Sidebar + Header
│   │   ├── dashboard/                # 대시보드 홈
│   │   ├── users/[id]/               # Promise<{id}> 패턴
│   │   ├── forms/                    # RHF + Zod 데모
│   │   ├── modals/                   # Dialog/Confirm 데모
│   │   └── settings/                 # 탭 기반 설정
│   └── (auth)/                       # 인증 라우트 그룹
│       ├── login/
│       ├── register/
│       └── forgot-password/
│
├── components/
│   ├── providers.tsx                 # next-themes + Toaster + TooltipProvider
│   ├── ui/                           # shadcn primitives (28개)
│   ├── layout/                       # Sidebar, Header, ThemeToggle 등
│   ├── data-table/                   # TanStack Table 래퍼
│   ├── forms/                        # ProfileForm 등
│   ├── feedback/                     # PageHeader, EmptyState, LoadingState
│   ├── dialogs/                      # ConfirmDialog
│   ├── dashboard/                    # KPI, Modals 데모, AppearanceSettings
│   ├── users/                        # users-columns
│   └── auth/                         # LoginForm, RegisterForm 등
│
├── lib/
│   ├── utils.ts                      # cn (clsx + twMerge)
│   ├── constants.ts                  # 매직 넘버 중앙화
│   ├── nav-config.ts                 # 사이드바 메뉴 정의
│   ├── format.ts                     # date-fns 래핑 + Intl
│   ├── validations/                  # Zod 스키마 (auth, user)
│   └── mock-data.ts                  # 데모 데이터
│
└── types/
    ├── nav.ts                        # NavItem, NavGroup
    └── user.ts                       # User, UserRole, UserStatus
```

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 자동으로 `/dashboard`로 이동합니다.

## 주요 기능

### 다크모드
`next-themes`의 `ThemeProvider`가 라이트/다크/시스템 3가지 모드를 지원하며 FOUC를 방지합니다.
헤더의 테마 토글 또는 `/settings/appearance` 페이지에서 변경할 수 있습니다.

### 명령 팔레트 (Cmd+K)
헤더의 검색 버튼을 클릭하거나 `Cmd+K` (Mac) / `Ctrl+K` (Windows) 단축키로 활성화됩니다.
사이드바의 모든 메뉴를 빠르게 검색하여 이동할 수 있습니다.

### 데이터 테이블
`@tanstack/react-table` v8 기반으로 정렬, 검색, 페이지네이션, 컬럼 visibility 토글이 모두 지원됩니다.
`/users` 페이지에서 풀 데모를 확인할 수 있습니다.

### 폼
`react-hook-form` + `zod` v4 + `@hookform/resolvers/zod` 조합의 표준 패턴을 사용합니다.
`/forms`에서 프로필 폼, `/login` `/register` `/forgot-password`에서 인증 폼을 확인할 수 있습니다.

### 반응형 레이아웃
- `lg` (1024px) 이상: 좌측 고정 사이드바 + 상단 헤더
- `lg` 미만: 햄버거 버튼 클릭 시 Sheet 기반 모바일 사이드바

## 스크립트

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

## shadcn 컴포넌트 추가

`components.json`이 `radix-nova` 스타일로 설정되어 있어 일관된 결과를 보장합니다.

```bash
npx shadcn@latest add <컴포넌트명>
```

## 코딩 규약

- 들여쓰기 2칸, camelCase, PascalCase (컴포넌트)
- 매직 넘버는 `lib/constants.ts`에 정의
- `any` 금지, `console.log` 금지 (sonner toast 활용)
- 함수에 한국어 JSDoc 주석
- shadcn 패턴 준수: `data-slot`, CVA, `cn()`

## 라이선스

MIT
