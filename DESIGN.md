# Design System: 5060 시니어 케어 (Senior Care)

## 1. Visual Theme & Atmosphere

**Swiss Style + Modern Minimalist** 결합. 넓은 여백과 엄격한 그리드 시스템으로 시니어 사용자에게 **신뢰감과 심리적 안정감**을 전달합니다. 장식적 요소를 최소화하고, 대신 타이포그래피 위계와 색상 대비를 통해 정보를 명확히 전달합니다. 토스(Toss) 시니어 모드와 Apple Health 앱의 정갈한 레이아웃을 레퍼런스합니다.

- **Density**: Airy — 충분한 터치 영역과 넓은 여백
- **Mood**: Calm, Trustworthy, Warm — 차분하고 신뢰감 있는 분위기
- **Philosophy**: Less is More — 한 화면에 핵심 정보만 노출

## 2. Color Palette & Roles

| Role             | Name            | Hex       | HSL            | Usage                                       |
| ---------------- | --------------- | --------- | -------------- | ------------------------------------------- |
| **Primary**      | Deep Trust Blue | `#0052CC` | `214 100% 40%` | 주요 버튼, 헤더 강조, 활성 네비게이션, 링크 |
| **Primary FG**   | Pure White      | `#FFFFFF` | `0 0% 100%`    | Primary 위 텍스트                           |
| **Background**   | Soft Cloud      | `#F4F5F7` | `220 14% 96%`  | 전체 배경 — 눈의 피로도 최소화              |
| **Foreground**   | Deep Ink        | `#172B4D` | `216 38% 20%`  | 본문 텍스트, 제목                           |
| **Card**         | Clean White     | `#FFFFFF` | `0 0% 100%`    | 카드, 입력폼, 모달 배경                     |
| **Muted**        | Gentle Fog      | `#EBECF0` | `231 11% 92%`  | 비활성 배경, 구분선 대체                    |
| **Muted FG**     | Slate Grey      | `#6B778C` | `215 12% 48%`  | 보조 텍스트, 캡션, 비활성 아이콘            |
| **Accent**       | Sky Tint        | `#DEEBFF` | `215 100% 94%` | 아이콘 배경, 호버 상태, 뱃지 배경           |
| **Accent FG**    | Deep Trust Blue | `#0052CC` | `214 100% 40%` | Accent 위 아이콘                            |
| **Emergency**    | Alert Red       | `#FF5630` | `11 100% 60%`  | 긴급 버튼 전용 (119, 경찰)                  |
| **Emergency FG** | Pure White      | `#FFFFFF` | `0 0% 100%`    | Emergency 위 텍스트                         |
| **Destructive**  | Critical Red    | `#DE350B` | `14 91% 46%`   | 삭제, 탈퇴, 위험 경고                       |
| **Success**      | Safe Green      | `#00875A` | `156 100% 26%` | 완료 상태, 활성 뱃지                        |
| **Warning**      | Caution Amber   | `#FF991F` | `33 100% 56%`  | 주의 상태, 위험 감지 알림                   |
| **Info**         | Calm Blue       | `#0065FF` | `216 100% 50%` | 정보성 알림, 통계 아이콘                    |
| **Border**       | Whisper Grey    | `#DFE1E6` | `223 14% 90%`  | 카드 테두리, 구분선                         |
| **Input**        | Soft Edge       | `#DFE1E6` | `223 14% 90%`  | 입력 필드 테두리                            |
| **Ring**         | Focus Blue      | `#4C9AFF` | `214 100% 65%` | 포커스 링 색상                              |

## 3. Typography Rules

- **Font Family**: `Pretendard Variable` → `Apple SD Gothic Neo` → `Noto Sans KR` → `sans-serif`
- **Base Size**: 17px (시니어 가독성 최적화)
- **Line Height**: 본문 1.6, 제목 1.35

| Class            | Size | Weight         | Line-Height | Usage                    |
| ---------------- | ---- | -------------- | ----------- | ------------------------ |
| `.type-display`  | 28px | Bold (700)     | 38px        | 페이지 제목              |
| `.type-title`    | 24px | Bold (700)     | 32px        | 섹션 제목                |
| `.type-headline` | 20px | Semibold (600) | 28px        | 카드 헤더, 서브 타이틀   |
| `.type-callout`  | 17px | Medium (500)   | 26px        | 강조 레이블, 버튼 텍스트 |
| `.type-body`     | 16px | Regular (400)  | 26px        | 본문, 설명               |
| `.type-caption`  | 13px | Regular (400)  | 18px        | 도움말, 타임스탬프       |

## 4. Component Stylings

### Buttons

- **Primary**: Deep Trust Blue 배경, 흰 텍스트, `border-radius: 12px`, 높이 52px, 부드러운 그림자
- **Emergency**: Alert Red 배경, 흰 텍스트, `border-radius: 16px`, 높이 64px, 펄스 애니메이션 가능
- **Secondary/Outline**: 흰 배경, Deep Trust Blue 텍스트+테두리, 호버시 Sky Tint 배경
- **Ghost**: 투명 배경, 호버시 Gentle Fog 배경
- **최소 터치 영역**: 48×48px (WCAG 2.1)

### Cards/Containers

- 깨끗한 흰색 배경 (`#FFFFFF`)
- `border-radius: 16px` — 부드럽게 둥근 모서리
- `border: 1px solid #DFE1E6` — 미세한 테두리
- `box-shadow: 0 1px 3px rgba(23,43,77,0.06)` — 속삭이듯 부드러운 그림자
- 내부 패딩: 20px

### Inputs/Forms

- 높이: 52px (시니어 터치 편의)
- `border-radius: 12px`
- 기본: Whisper Grey 테두리, 포커스: Focus Blue 링 + Primary 테두리
- 폰트 크기: 17px
- `placeholder` 색상: Slate Grey

### Modals (Dialog)

- 최대 너비: 360px (모바일)
- 중앙 정렬, `border-radius: 20px`
- 배경 딤: `rgba(23,43,77,0.4)`
- 부드러운 slide-up 진입 애니메이션

### Navigation (Bottom Tab)

- 높이: 72px
- 흰 배경, 상단 미세 테두리
- 활성 탭: Deep Trust Blue 아이콘+텍스트
- 비활성 탭: Slate Grey 아이콘+텍스트

## 5. Layout Principles

- **Maximum Width**: 414px (모바일 기준)
- **Grid System**: 16px 기본 패딩, 12px 카드 간 간격
- **Whitespace**: 넉넉한 여백으로 정보 밀도 낮춤
- **Vertical Rhythm**: 섹션 간 24px, 요소 간 12-16px
- **Safe Area**: 하단 탭바 72px + 여유 공간 확보
- **반응형**: `rem` 기반, 시스템 폰트 크기에 유연하게 대응

## 6. Motion & Animation

- **Duration**: 빠른 150ms, 기본 200ms, 느린 300ms
- **Easing**: `cubic-bezier(0.2, 0, 0, 1)` — Material Standard
- **Page Transition**: slide-up fade (300ms)
- **Micro-interaction**: 버튼 press scale(0.98), 카드 hover shadow 증가
- **Reduced Motion**: `prefers-reduced-motion` 미디어 쿼리 존중

## 7. Stitch Prompting Context

> **모든 Stitch 프롬프트에 아래 Context를 포함하세요:**
>
> "This is a senior care mobile app for users aged 50-60+. Design style: Swiss Minimalist with Atlassian-inspired color system. Primary color: Deep Trust Blue #0052CC. Background: Soft Cloud #F4F5F7. Emergency: Alert Red #FF5630. Font: Pretendard Variable, 17px base. Must have large touch targets (min 48x48px), high contrast ratios (WCAG AA), generous whitespace, and clear visual hierarchy. Rounded corners (12-16px). Cards with subtle borders (#DFE1E6) and whisper-soft shadows. Mobile-first, max-width 414px."
