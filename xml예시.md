# XML 예시 (AI 구조 파싱용 — 최적화 버전)

아래 XML은 `상세서.md`의 **전체 구조(9개 섹션, 모든 표/행/노트)**를 누락 없이 표현합니다.
기존 대비 개선: `<token />` self-closing 구조로 파싱 깊이 최소화, `<columns>` 반복 제거.

```xml
<?xml version='1.0' encoding='utf-8'?>
<uiuxSpec lang="ko" source="상세서.md" title="AI Senior Care App UI/UX 상세서 (명세 v1.0)" version="v1.0"
          columnDef="name|value|scope|rule">
  <frontMatter>
    <htmlComment>적용 스킬: ui-ux-pro-max(접근성/터치/레이아웃/모션 기준), writing-clearly-and-concisely(명료한 문장/규칙화), prompt-engineering(표 형식 일관성)</htmlComment>
    <paragraph>본 문서는 **5060세대 맞춤형 감성 대화 + 생활 안전망** 모바일 앱(Android/iOS) 및 관리자(Web) 화면을 **동일한 규칙/토큰**으로 구현하기 위한 UI/UX 구현 기준입니다.
용어: **필수(MUST)** / **권장(SHOULD)** / **허용(MAY)**.</paragraph>
    <divider />
  </frontMatter>
  <content>
    <!-- ============================== 1) 디자인 원칙 ============================== -->
    <section mdLevel="2" title="디자인 원칙(5060 맞춤)" number="1">
      <spec>
        <token name="가독성 최우선" value="본문 17px, 줄간 1.55" scope="전 화면" rule="본문 기본 크기 17px 유지, 16px 미만 금지(예외: 캡션 12px)" />
        <token name="터치 안전" value="최소 44×44px" scope="버튼/아이콘/리스트" rule="모든 인터랙션 요소는 터치 영역 44px 이상(시각 요소가 작아도 hit-area 확장)" />
        <token name="정서적 톤" value="따뜻함(Secondary) + 안정(Primary)" scope="감성 대화/알림" rule="위험/응급 제외, 경고색 남용 금지(정보/안내는 Primary 사용)" />
        <token name="불안 최소화" value="트랜지션 180ms" scope="로딩/화면전환" rule="로딩은 진행 중을 명확히, 불필요한 점멸/진동 금지" />
        <token name="실수 방지" value="파괴적 액션 2-step" scope="탈퇴/신고/긴급" rule="긴급/탈퇴/삭제는 확인 모달 + 명확한 결과 문구 필수" />
      </spec>
      <divider />
    </section>

    <!-- ============================== 2) 디자인 토큰 ============================== -->
    <section mdLevel="2" title="디자인 토큰(Design Tokens)" number="2">

      <!-- 2-1. 컬러 -->
      <section mdLevel="3" title="컬러(Color)" number="2-1">

        <!-- A. 브랜드/중립 팔레트 -->
        <section mdLevel="4" title="브랜드/중립 팔레트" number="A">
          <spec>
            <token name="color.primary.50" value="#F0FDFA" scope="배경 틴트" rule="넓은 면적 배경은 50~100만 사용(눈부심 방지)" />
            <token name="color.primary.100" value="#CCFBF1" scope="배경/포커스 틴트" rule="포커스 링 배경에 사용 가능" />
            <token name="color.primary.200" value="#99F6E4" scope="포커스/호버" rule="호버/포커스 보조(텍스트로 사용 금지)" />
            <token name="color.primary.300" value="#5EEAD4" scope="포커스 링" rule="포커스 링 보조색(링+배경 조합)" />
            <token name="color.primary.400" value="#2DD4BF" scope="포커스/아이콘" rule="아이콘/링에 사용, 본문 텍스트 금지" />
            <token name="color.primary.500" value="#14B8A6" scope="보조 버튼/링" rule="Primary 대비가 약하면 600~700 사용" />
            <token name="color.primary.600" value="#0D9488" scope="링크/강조" rule="링크는 600 이상, 밑줄/굵기 보조로만 강조" />
            <token name="color.primary.700" value="#0F766E" scope="주요 버튼/CTA" rule="Primary 버튼 기본 배경" />
            <token name="color.primary.800" value="#115E59" scope="호버/프레스" rule="Primary hover 배경(웹)" />
            <token name="color.primary.900" value="#134E4A" scope="active(눌림)" rule="Primary active 배경" />
            <token name="color.secondary.50" value="#FFFBEB" scope="감성 강조 배경" rule="카드 배경 틴트로 제한 사용" />
            <token name="color.secondary.600" value="#D97706" scope="포인트/배지" rule="배지/강조에만 사용(본문 장문 금지)" />
            <token name="color.secondary.700" value="#B45309" scope="포인트 텍스트" rule="보조 타이틀/배지 텍스트용" />
            <token name="color.neutral.0" value="#FFFFFF" scope="Surface" rule="기본 카드/입력 배경" />
            <token name="color.neutral.50" value="#F8FAFC" scope="App 배경" rule="기본 배경(라이트)" />
            <token name="color.neutral.100" value="#F1F5F9" scope="섹션 배경" rule="리스트/섹션 구분" />
            <token name="color.neutral.200" value="#E2E8F0" scope="Border" rule="기본 보더" />
            <token name="color.neutral.300" value="#CBD5E1" scope="Divider" rule="구분선/비활성 보더" />
            <token name="color.neutral.400" value="#94A3B8" scope="Placeholder" rule="placeholder/disabled 아이콘" />
            <token name="color.neutral.600" value="#475569" scope="보조 텍스트" rule="설명/헬프 텍스트" />
            <token name="color.neutral.900" value="#0F172A" scope="본문/헤드라인" rule="기본 텍스트(최대 대비)" />
            <token name="color.neutral.950" value="#020617" scope="최상 대비 텍스트" rule="다크 배경 위 텍스트에 제한" />
          </spec>
        </section>

        <!-- B. 시맨틱(상태) 컬러 -->
        <section mdLevel="4" title="시맨틱(상태) 컬러" number="B">
          <spec>
            <token name="color.info.600" value="#2563EB" scope="정보 토스트/배지" rule="정보는 파랑 계열로 Primary와 구분" />
            <token name="color.success.600" value="#16A34A" scope="성공/완료" rule="성공은 초록 600 고정(다른 초록 남용 금지)" />
            <token name="color.warning.600" value="#D97706" scope="주의/확인 필요" rule="경고는 Secondary와 동일 계열 사용 가능" />
            <token name="color.danger.600" value="#DC2626" scope="오류/위험" rule="오류 메시지, 입력 error 보더" />
            <token name="color.emergency.700" value="#B91C1C" scope="긴급 신고/119" rule="긴급 CTA는 emergency만 사용(Primary 금지)" />
            <token name="color.focus.ring" value="#2DD4BF" scope="포커스 링" rule="링 3px 권장(대상 외곽)" />
            <token name="color.scrim" value="rgba(2,6,23,0.48)" scope="모달/드로어 배경" rule="스크림 불투명도 48% 기본" />
          </spec>
        </section>

        <!-- C. 텍스트/배경 역할 토큰 -->
        <section mdLevel="4" title="텍스트/배경 역할 토큰(권장)" number="C">
          <spec>
            <token name="color.bg" value="#F8FAFC" scope="앱 배경" rule="전체 기본 배경" />
            <token name="color.surface" value="#FFFFFF" scope="카드/모달" rule="Surface는 항상 neutral.0" />
            <token name="color.surfaceAlt" value="#F1F5F9" scope="입력/칩" rule="구분 필요 시만 사용" />
            <token name="color.border" value="#E2E8F0" scope="보더" rule="1px 기본" />
            <token name="color.text" value="#0F172A" scope="본문" rule="대비 4.5:1 이상 유지" />
            <token name="color.textMuted" value="#475569" scope="보조" rule="보조 텍스트는 600 이하 금지(너무 연함)" />
            <token name="color.textDisabled" value="#94A3B8" scope="비활성" rule="disabled는 색+불투명도 둘 중 하나만 사용(중복 감쇠 금지)" />
            <token name="color.link" value="#0D9488" scope="링크" rule="링크는 밑줄(또는 굵기 600) 중 1개 필수" />
          </spec>
          <divider />
        </section>
      </section>

      <!-- 2-2. 타이포그래피 -->
      <section mdLevel="3" title="타이포그래피(Typography)" number="2-2">
        <section mdLevel="4" title="폰트 패밀리" number="A">
          <spec>
            <token name="font.family.sans" value="Pretendard" scope="앱/관리자 공통" rule="설치형/번들형 적용(불가 시 시스템 폰트 fallback)" />
            <token name="font.family.fallback.iOS" value="Apple SD Gothic Neo" scope="iOS" rule="Pretendard 미적용 시 fallback" />
            <token name="font.family.fallback.Android" value="Noto Sans KR" scope="Android" rule="Pretendard 미적용 시 fallback" />
            <token name="font.family.mono" value="ui-monospace" scope="관리자/로그" rule="표/ID/코드 표시용" />
          </spec>
        </section>
        <section mdLevel="4" title="타입 스케일(기본: 라이트 모드)" number="B">
          <spec>
            <token name="type.display" value="28px/36px, 700" scope="온보딩 헤드" rule="한 줄 18~22자 내 권장" />
            <token name="type.h1" value="24px/32px, 700" scope="주요 타이틀" rule="페이지 타이틀" />
            <token name="type.h2" value="20px/28px, 700" scope="섹션 타이틀" rule="카드/섹션 헤더" />
            <token name="type.h3" value="18px/26px, 700" scope="서브 타이틀" rule="리스트 헤더/대화 주제" />
            <token name="type.bodyLg" value="17px/26px, 500" scope="기본 본문" rule="앱 기본 본문(5060 기준)" />
            <token name="type.bodyMd" value="16px/24px, 400" scope="보조 본문" rule="관리자/설명 텍스트" />
            <token name="type.bodySm" value="14px/22px, 400" scope="보조/라벨" rule="폼 라벨, 작은 설명" />
            <token name="type.caption" value="12px/18px, 400" scope="캡션/메타" rule="날짜/보조 메타 정보" />
          </spec>
        </section>
        <section mdLevel="4" title="텍스트 규칙(가독성)" number="C">
          <spec>
            <token name="최소 본문 크기" value="16px" scope="모바일" rule="본문 16px 미만 금지(예외: caption 12px)" />
            <token name="줄 길이" value="45~70자" scope="관리자" rule="긴 문장은 70자 초과 시 줄바꿈/폭 제한" />
            <token name="줄간격" value="1.45~1.70" scope="장문" rule="감성 대화/도움말은 1.55 권장" />
            <token name="숫자/시간 표현" value="tabular-nums" scope="통계/대시보드" rule="숫자 폭 고정으로 가독성 확보" />
          </spec>
          <divider />
        </section>
      </section>

      <!-- 2-3. 간격/크기 -->
      <section mdLevel="3" title="간격(Spacing) / 크기(Sizing)" number="2-3">
        <spec>
          <token name="space.0" value="0px" scope="공통" rule="-" />
          <token name="space.1" value="4px" scope="공통" rule="4pt 그리드 준수" />
          <token name="space.2" value="8px" scope="공통" rule="아이콘-텍스트 간격" />
          <token name="space.3" value="12px" scope="공통" rule="리스트 아이템 내부 간격" />
          <token name="space.4" value="16px" scope="공통" rule="화면 기본 패딩(좌/우)" />
          <token name="space.5" value="20px" scope="공통" rule="섹션 간 간격(촘촘)" />
          <token name="space.6" value="24px" scope="공통" rule="섹션 간 간격(기본)" />
          <token name="space.8" value="32px" scope="공통" rule="큰 구획 분리" />
          <token name="touch.min" value="44×44px" scope="터치 요소" rule="최소 터치 영역(아이콘 버튼 포함)" />
          <token name="touch.comfort" value="48×48px" scope="주요 CTA" rule="5060 타깃 주요 버튼은 48 이상 권장" />
        </spec>
        <divider />
      </section>

      <!-- 2-4. 라운드/그림자 -->
      <section mdLevel="3" title="라운드/그림자(Shape &amp; Shadow)" number="2-4">
        <spec>
          <token name="radius.sm" value="8px" scope="입력/칩" rule="작은 컴포넌트" />
          <token name="radius.md" value="12px" scope="카드/버튼" rule="기본 라운드" />
          <token name="radius.lg" value="16px" scope="모달/드로어" rule="큰 Surface" />
          <token name="radius.pill" value="999px" scope="배지/토글" rule="pill 형태" />
          <token name="shadow.0" value="none" scope="공통" rule="-" />
          <token name="shadow.1" value="0 1px 2px rgba(2,6,23,0.06)" scope="카드" rule="기본 카드" />
          <token name="shadow.2" value="0 6px 18px rgba(2,6,23,0.10)" scope="모달/드로어" rule="떠 있는 Surface" />
          <token name="shadow.3" value="0 14px 34px rgba(2,6,23,0.14)" scope="중요 오버레이" rule="위험 알림 모달(과도 사용 금지)" />
        </spec>
        <divider />
      </section>

      <!-- 2-5. 모션 -->
      <section mdLevel="3" title="모션(Motion)" number="2-5">
        <spec>
          <token name="motion.duration.fast" value="120ms" scope="hover/pressed" rule="마이크로 인터랙션" />
          <token name="motion.duration.base" value="180ms" scope="버튼/포커스" rule="기본 전환" />
          <token name="motion.duration.slow" value="240ms" scope="모달/드로어" rule="오버레이 진입/이탈" />
          <token name="motion.duration.page" value="300ms" scope="화면 전환" rule="내비게이션 전환(과도한 모션 금지)" />
          <token name="motion.easing.standard" value="cubic-bezier(0.2,0,0,1)" scope="공통" rule="빠르게 시작해 부드럽게 종료" />
          <token name="motion.reduce" value="prefers-reduced-motion" scope="공통" rule="OS 설정 감지 시 비필수 애니메이션 0ms 처리" />
          <token name="motion.skeleton.loop" value="1200ms" scope="스켈레톤" rule="깜빡임 금지, 부드러운 쉬머" />
        </spec>
        <divider />
      </section>

      <!-- 2-6. Z-index -->
      <section mdLevel="3" title="Z-index 스케일" number="2-6">
        <spec>
          <token name="z.base" value="0" scope="기본 콘텐츠" rule="-" />
          <token name="z.sticky" value="10" scope="상단바/하단탭" rule="고정 요소" />
          <token name="z.dropdown" value="20" scope="메뉴/셀렉트" rule="드로어보다 낮게" />
          <token name="z.scrim" value="40" scope="스크림" rule="오버레이 배경" />
          <token name="z.drawer" value="50" scope="드로어/바텀시트" rule="모달보다 낮게" />
          <token name="z.modal" value="60" scope="모달" rule="최우선 대화상자" />
          <token name="z.toast" value="70" scope="토스트" rule="모달 위 금지(모달 열림 시 큐잉)" />
          <token name="z.tooltip" value="80" scope="툴팁" rule="관리자에서 제한 사용" />
        </spec>
        <divider />
      </section>
    </section>

    <!-- ============================== 3) 레이아웃 ============================== -->
    <section mdLevel="2" title="레이아웃(Layout)" number="3">
      <section mdLevel="3" title="브레이크포인트(관리자 Web 기준)" number="3-1">
        <spec>
          <token name="bp.mobileS" value="360px" scope="작은 폰" rule="모바일 최소 대응 폭" />
          <token name="bp.mobile" value="390px" scope="iPhone 표준" rule="대표 테스트 폭" />
          <token name="bp.mobileL" value="414px" scope="큰 폰" rule="폰 상한" />
          <token name="bp.tablet" value="768px" scope="태블릿" rule="2열 카드 가능" />
          <token name="bp.laptop" value="1024px" scope="관리자 기본" rule="사이드바+콘텐츠" />
          <token name="bp.desktop" value="1280px" scope="관리자 확장" rule="테이블/차트 여백 확장" />
          <token name="bp.wide" value="1440px" scope="대형 모니터" rule="max-width 적용" />
        </spec>
      </section>
      <section mdLevel="3" title="그리드/컨테이너" number="3-2">
        <spec>
          <token name="모바일 화면 패딩" value="16px" scope="앱 전 화면" rule="좌/우 16 고정(예외: 풀블리드 이미지)" />
          <token name="모바일 섹션 간격" value="24px" scope="앱 전 화면" rule="섹션 헤더~콘텐츠 12px, 섹션 간 24px" />
          <token name="모바일 카드 간격" value="12px" scope="리스트/피드" rule="카드 리스트는 12px 간격" />
          <token name="관리자 컨테이너 폭" value="max 1200px" scope="관리자" rule="본문 max-width 1200, 중앙 정렬" />
          <token name="관리자 그리드" value="12col, gutter 24px" scope="관리자" rule="1024px 이상 12컬럼, 768~1023은 8컬럼" />
          <token name="사이드바 폭" value="280px" scope="관리자" rule="1024px 이상 고정, 1024 미만은 Drawer 전환" />
        </spec>
      </section>
      <section mdLevel="3" title="스크롤/고정 규칙" number="3-3">
        <spec>
          <token name="상단 앱바 높이" value="56px" scope="앱" rule="iOS/Android 공통(필요 시 64px 허용)" />
          <token name="하단 탭바 높이" value="72px" scope="앱" rule="아이콘 24px + 라벨 12px, safe-area 포함" />
          <token name="채팅 입력 영역" value="min 64px" scope="AI 대화" rule="키보드 등장 시 입력창이 키보드 위로 이동(오버랩 금지)" />
          <token name="스크롤 바운스" value="기본" scope="앱" rule="iOS 기본 허용, 리스트는 스크롤 위치 유지" />
          <token name="모달/드로어 오픈" value="body scroll lock" scope="앱/관리자" rule="오픈 시 배경 스크롤 금지, 포커스 트랩" />
          <token name="토스트 위치" value="top 12px" scope="앱/관리자" rule="상단 안전영역 아래, 다중 토스트는 스택(최대 3개)" />
        </spec>
        <divider />
      </section>
    </section>

    <!-- ============================== 4) 컴포넌트 공통 상태 ============================== -->
    <section mdLevel="2" title="컴포넌트 공통 상태(State) 규칙" number="4">
      <note>아래 상태는 모든 컴포넌트에 적용되는 "기본 규칙"입니다. 각 컴포넌트 섹션에서 색/레이아웃만 덮어씁니다.</note>
      <spec>
        <token name="state.default" value="opacity 100%" scope="공통" rule="기본 상태" />
        <token name="state.hover" value="overlay 6%" scope="웹/포인터" rule="배경 위 6% 오버레이 또는 색상 1-step 진하게" />
        <token name="state.active" value="overlay 10%" scope="공통" rule="누름/프레스 시 10% 오버레이(모바일은 active만 사용)" />
        <token name="state.focus" value="ring 3px, #2DD4BF" scope="키보드/포커스" rule="포커스 링은 외곽, 대비 확보(스크린리더 포커스 포함)" />
        <token name="state.disabled" value="opacity 45%" scope="공통" rule="클릭 불가 + 시각적 비활성(색 변경과 중복 적용 금지)" />
        <token name="state.loading" value="spinner 16px, 1000ms loop" scope="비동기" rule="로딩 중 입력/버튼은 disabled 처리, 레이아웃 흔들림 금지" />
        <token name="state.error" value="#DC2626, 1px" scope="폼/오류" rule="오류는 색+문구 동시 제공(색만으로 표시 금지)" />
      </spec>
      <divider />
    </section>

    <!-- ============================== 5) 컴포넌트 규격 ============================== -->
    <section mdLevel="2" title="컴포넌트 규격(필수)" number="5">

      <!-- 5-1. Button -->
      <section mdLevel="3" title="Button" number="5-1">
        <section mdLevel="4" title="규격/변형" number="A">
          <spec>
            <token name="높이(L)" value="52px" scope="주요 CTA" rule="기본 버튼은 L 사용(5060 타깃)" />
            <token name="높이(M)" value="48px" scope="보조 CTA" rule="화면 밀도 높을 때만" />
            <token name="높이(S)" value="40px" scope="관리자/툴바" rule="모바일 주요 화면에서 남용 금지" />
            <token name="좌/우 패딩" value="16px" scope="버튼" rule="텍스트 길이 8~12자까지 무리 없이 수용" />
            <token name="아이콘 크기" value="20px" scope="버튼 아이콘" rule="leading/trailing 아이콘 동일" />
            <token name="라운드" value="12px" scope="버튼" rule="radius.md 고정" />
            <token name="텍스트" value="16px/24px, 600" scope="버튼" rule="버튼 라벨은 2줄 금지(줄임표 사용)" />
            <token name="최소 폭" value="120px" scope="단독 CTA" rule="화면 하단 단독 CTA는 full-width 권장" />
            <token name="간격" value="icon-gap 8px" scope="아이콘+텍스트" rule="space.2 고정" />
          </spec>
        </section>
        <section mdLevel="4" title="스타일(Variant)" number="B">
          <spec>
            <token name="Primary" value="bg #0F766E, text #FFFFFF" scope="기본 CTA" rule="1화면 1개 이하 권장(우선순위 명확)" />
            <token name="Secondary" value="bg #FFFFFF, border #0D9488, text #0D9488" scope="보조 CTA" rule="Primary와 함께 배치 시 사용" />
            <token name="Tertiary/Ghost" value="bg transparent, text #0D9488" scope="링크형 액션" rule="영역이 작으면 hit-area 확대" />
            <token name="Destructive" value="bg #B91C1C, text #FFFFFF" scope="탈퇴/삭제" rule="주변에 다른 CTA 함께 배치 금지" />
          </spec>
        </section>
        <section mdLevel="4" title="상태(필수 7종)" number="C">
          <spec>
            <token name="default" value="Primary bg #0F766E" scope="버튼" rule="위 Variant 기준 적용" />
            <token name="hover" value="Primary bg #115E59" scope="웹/관리자" rule="포인터 환경에서만 적용" />
            <token name="active" value="Primary bg #134E4A" scope="앱/웹" rule="눌림 시 120ms 이내 전환" />
            <token name="focus" value="ring 3px #2DD4BF" scope="키보드" rule="ring + aria-focus/접근성 트리 반영" />
            <token name="disabled" value="opacity 45%" scope="공통" rule="disabled 시 클릭/탭/키보드 포커스 불가" />
            <token name="loading" value="spinner 16px, text hidden" scope="공통" rule="로딩 중 텍스트는 투명 처리해 폭 유지(레이아웃 흔들림 금지)" />
            <token name="error" value="outline 1px #DC2626" scope="제출 실패" rule="버튼 자체 error는 제출 실패 맥락에서만(오류 문구 동반)" />
          </spec>
          <divider />
        </section>
      </section>

      <!-- 5-2. Input -->
      <section mdLevel="3" title="Input (Text)" number="5-2">
        <section mdLevel="4" title="규격" number="A">
          <spec>
            <token name="높이" value="52px" scope="폼 입력" rule="5060 타깃: 52px 고정 권장" />
            <token name="패딩" value="좌/우 14px" scope="입력" rule="텍스트 커서/가독성 확보" />
            <token name="라운드" value="12px" scope="입력" rule="radius.md" />
            <token name="보더" value="1px #CBD5E1" scope="입력" rule="default 보더" />
            <token name="텍스트" value="17px/26px" scope="입력" rule="본문과 동일(가독성 유지)" />
            <token name="라벨" value="14px/22px" scope="폼 라벨" rule="라벨은 항상 표시(placeholder=라벨 대체 금지)" />
            <token name="헬퍼/에러" value="12px/18px" scope="하단 문구" rule="입력 하단 1줄, 2줄 이상이면 도움말 화면으로 분리" />
            <token name="아이콘(옵션)" value="20px" scope="검색/비밀번호" rule="trailing 아이콘은 터치 44px 확보" />
          </spec>
        </section>
        <section mdLevel="4" title="상태(필수 7종)" number="B">
          <spec>
            <token name="default" value="bg #FFFFFF, border #CBD5E1" scope="입력" rule="placeholder #94A3B8" />
            <token name="hover" value="border #94A3B8" scope="관리자(웹)" rule="모바일은 hover 미사용" />
            <token name="active" value="border #64748B" scope="입력" rule="입력 중 강조(선택)" />
            <token name="focus" value="border #0D9488, ring 3px #CCFBF1" scope="입력" rule="focus 시 라벨 색은 #0D9488 허용" />
            <token name="disabled" value="bg #F1F5F9, opacity 45%" scope="입력" rule="텍스트 선택/키보드 호출 금지" />
            <token name="loading" value="spinner 16px trailing" scope="자동완성/검증" rule="입력은 유지하되 제출 액션만 disabled 권장" />
            <token name="error" value="border #DC2626, ring 3px rgba(220,38,38,0.18)" scope="입력" rule="에러 문구는 구체적으로(무엇을/어떻게)" />
          </spec>
          <divider />
        </section>
      </section>

      <!-- 5-3. Textarea -->
      <section mdLevel="3" title="Textarea" number="5-3">
        <section mdLevel="4" title="규격" number="A">
          <spec>
            <token name="최소 높이" value="120px" scope="감정/상담 입력" rule="3~5줄 기본" />
            <token name="최대 높이" value="240px" scope="긴 입력" rule="초과 시 내부 스크롤(페이지 스크롤과 충돌 금지)" />
            <token name="패딩" value="14px" scope="텍스트영역" rule="상/하/좌/우 동일" />
            <token name="라운드/보더" value="Input 동일" scope="공통" rule="Input 토큰 재사용" />
            <token name="글자" value="17px/26px" scope="입력" rule="자동 줄바꿈, 줄간 1.55 유지" />
          </spec>
        </section>
        <section mdLevel="4" title="상태(필수 7종)" number="B">
          <spec>
            <token name="default" value="Input 동일" scope="공통" rule="-" />
            <token name="hover" value="Input 동일" scope="웹" rule="-" />
            <token name="active" value="Input 동일" scope="공통" rule="-" />
            <token name="focus" value="Input 동일" scope="공통" rule="-" />
            <token name="disabled" value="Input 동일" scope="공통" rule="-" />
            <token name="loading" value="Input 동일" scope="공통" rule="-" />
            <token name="error" value="Input 동일" scope="공통" rule="-" />
          </spec>
          <divider />
        </section>
      </section>

      <!-- 5-4. Card -->
      <section mdLevel="3" title="Card" number="5-4">
        <section mdLevel="4" title="규격" number="A">
          <spec>
            <token name="배경" value="#FFFFFF" scope="카드" rule="Surface 고정" />
            <token name="패딩" value="16px" scope="카드" rule="카드 내부 기본" />
            <token name="라운드" value="16px" scope="카드" rule="radius.lg" />
            <token name="보더" value="1px #E2E8F0" scope="카드" rule="보더+shadow 동시 사용은 1개만(과밀 금지)" />
            <token name="그림자" value="shadow.1" scope="카드" rule="리스트 카드 기본" />
            <token name="헤더 간격" value="12px" scope="카드" rule="제목~본문 간격" />
            <token name="클릭 가능" value="cursor-pointer" scope="관리자" rule="클릭 카드에만 포인터/상태 적용" />
          </spec>
        </section>
        <section mdLevel="4" title="상태(필수 7종, interactive 카드에만 적용)" number="B">
          <spec>
            <token name="default" value="shadow.1" scope="카드" rule="기본" />
            <token name="hover" value="shadow.2" scope="웹" rule="그림자만 변화(레이아웃 이동 금지)" />
            <token name="active" value="shadow.1, overlay 10%" scope="앱/웹" rule="프레스 피드백 제공" />
            <token name="focus" value="ring 3px #2DD4BF" scope="키보드" rule="카드 내부 첫 포커스 대신 카드 자체 포커스 가능" />
            <token name="disabled" value="opacity 45%" scope="카드" rule="클릭 불가" />
            <token name="loading" value="skeleton" scope="카드" rule="스켈레톤은 카드 레이아웃 유지" />
            <token name="error" value="border 1px #DC2626" scope="카드" rule="오류 카드는 에러 문구/액션 포함" />
          </spec>
          <divider />
        </section>
      </section>

      <!-- 5-5. Modal -->
      <section mdLevel="3" title="Modal" number="5-5">
        <section mdLevel="4" title="규격/행동" number="A">
          <spec>
            <token name="배경 스크림" value="rgba(2,6,23,0.48)" scope="모달" rule="탭/클릭 시 닫힘 여부는 케이스별(위험 모달은 바깥 클릭 닫힘 금지)" />
            <token name="폭(모바일)" value="100% - 32px" scope="앱" rule="좌/우 16px 여백 유지" />
            <token name="폭(웹)" value="560px" scope="관리자" rule="560 기본, 폼이 길면 720 허용" />
            <token name="라운드" value="16px" scope="모달" rule="radius.lg" />
            <token name="패딩" value="20px" scope="모달" rule="제목/본문/버튼 간 16~24px 유지" />
            <token name="버튼 영역" value="1~2개" scope="모달" rule="3개 이상 금지, primary 1개 원칙" />
            <token name="포커스 트랩" value="필수" scope="모달" rule="오픈 시 첫 포커스=제목 또는 첫 입력, ESC 닫기(위험 모달은 ESC 허용 여부 정의)" />
          </spec>
        </section>
        <section mdLevel="4" title="상태(필수 7종)" number="B">
          <spec>
            <token name="default" value="enter 240ms" scope="모달" rule="열림 애니메이션 240ms" />
            <token name="hover" value="close btn overlay 6%" scope="웹" rule="닫기 버튼/액션 버튼 hover만 적용" />
            <token name="active" value="btn active" scope="공통" rule="모달 내부 버튼 규칙 따름" />
            <token name="focus" value="trap + ring" scope="공통" rule="탭 순서: 제목 → 본문 → 주요 버튼" />
            <token name="disabled" value="actions disabled" scope="공통" rule="제출 중 닫기 금지 케이스 명시" />
            <token name="loading" value="skeleton or spinner" scope="공통" rule="내용 영역 로딩 표시, 버튼 로딩 상태 적용" />
            <token name="error" value="danger text + icon" scope="공통" rule="오류는 상단 요약 + 해당 필드 인라인 표시" />
          </spec>
          <divider />
        </section>
      </section>

      <!-- 5-6. Drawer -->
      <section mdLevel="3" title="Drawer (Bottom Sheet/Side Drawer)" number="5-6">
        <section mdLevel="4" title="규격/행동" number="A">
          <spec>
            <token name="타입(모바일)" value="bottom sheet" scope="앱" rule="손쉬운 도달(엄지 영역)" />
            <token name="타입(웹/1024-)" value="side drawer" scope="관리자" rule="사이드바 대체" />
            <token name="최대 높이(모바일)" value="80vh" scope="앱" rule="넘치면 내부 스크롤" />
            <token name="핸들 높이" value="4px" scope="bottom sheet" rule="시각 핸들은 24px 영역에 포함" />
            <token name="라운드" value="16px(상단)" scope="모바일" rule="상단만 라운드" />
            <token name="스크림" value="rgba(2,6,23,0.32)" scope="드로어" rule="모달보다 약하게(모달 우선)" />
            <token name="제스처" value="drag to close" scope="모바일" rule="오작동 방지: 리스트 스크롤과 충돌 시 drag 우선순위 조절" />
          </spec>
        </section>
        <section mdLevel="4" title="상태(필수 7종)" number="B">
          <spec>
            <token name="default" value="enter 240ms" scope="드로어" rule="240ms 슬라이드" />
            <token name="hover" value="item overlay 6%" scope="웹" rule="메뉴 아이템 hover" />
            <token name="active" value="item overlay 10%" scope="공통" rule="선택/프레스 피드백" />
            <token name="focus" value="ring 3px" scope="키보드" rule="메뉴 탐색 가능" />
            <token name="disabled" value="opacity 45%" scope="공통" rule="비활성 메뉴/액션" />
            <token name="loading" value="skeleton" scope="공통" rule="메뉴/콘텐츠 로딩 표시" />
            <token name="error" value="danger banner" scope="공통" rule="드로어 내 오류는 배너로 상단 고정" />
          </spec>
          <divider />
        </section>
      </section>

      <!-- 5-7. Toast -->
      <section mdLevel="3" title="Toast (Snackbar)" number="5-7">
        <section mdLevel="4" title="규격" number="A">
          <spec>
            <token name="위치" value="top 12px" scope="공통" rule="상단 안전영역 아래" />
            <token name="폭(모바일)" value="100% - 32px" scope="앱" rule="좌/우 16px" />
            <token name="폭(웹)" value="360px" scope="관리자" rule="최대 360, 긴 문구 줄바꿈" />
            <token name="높이(최소)" value="48px" scope="공통" rule="터치 가능한 액션 포함" />
            <token name="라운드" value="12px" scope="토스트" rule="radius.md" />
            <token name="지속시간" value="3500ms" scope="기본" rule="기본 3.5초, 오류는 5000ms 허용" />
            <token name="최대 스택" value="3개" scope="공통" rule="초과는 큐잉" />
          </spec>
        </section>
        <section mdLevel="4" title="타입/상태(필수 7종 포함)" number="B">
          <spec>
            <token name="default(info)" value="bg #0F172A, text #FFFFFF" scope="알림" rule="정보는 다크 서피스(가독성)" />
            <token name="hover" value="pause timer" scope="웹" rule="hover 시 타이머 일시정지" />
            <token name="active" value="action pressed 120ms" scope="공통" rule="액션 버튼은 Button(S) 규칙" />
            <token name="focus" value="action ring 3px" scope="키보드" rule="토스트 액션 포커스 가능" />
            <token name="disabled" value="action disabled" scope="공통" rule="액션 없으면 disabled 적용 없음" />
            <token name="loading" value="not used" scope="-" rule="토스트는 로딩 표시 용도 금지(스피너는 화면 내 표시)" />
            <token name="error" value="bg #B91C1C, text #FFFFFF" scope="오류" rule="오류 토스트는 1문장 + 해결 액션(가능 시)" />
          </spec>
          <divider />
        </section>
      </section>

      <!-- 5-8. Table -->
      <section mdLevel="3" title="Table (관리자 Web)" number="5-8">
        <section mdLevel="4" title="규격" number="A">
          <spec>
            <token name="헤더 높이" value="44px" scope="테이블" rule="헤더는 sticky 허용" />
            <token name="행 높이" value="44px" scope="테이블" rule="compact 모드=40px 허용" />
            <token name="셀 패딩" value="12px(좌우), 10px(상하)" scope="테이블" rule="텍스트 정렬: 기본 좌측, 수치 우측" />
            <token name="보더" value="1px #E2E8F0" scope="테이블" rule="행 구분선 유지" />
            <token name="지브라" value="#F8FAFC" scope="테이블" rule="짝수행 배경(선택)" />
            <token name="정렬/필터" value="icon 16px" scope="컬럼 헤더" rule="클릭 영역 44px 확보" />
            <token name="페이징" value="page size 20" scope="목록" rule="20 기본, 서버 페이징 권장" />
            <token name="빈 상태" value="min 240px" scope="테이블" rule="데이터 없음 + 필터 초기화 CTA 제공" />
          </spec>
        </section>
        <section mdLevel="4" title="상태(필수 7종)" number="B">
          <spec>
            <token name="default" value="row bg #FFFFFF" scope="테이블" rule="-" />
            <token name="hover" value="row bg #F1F5F9" scope="웹" rule="포인터 hover" />
            <token name="active" value="row bg #E2E8F0" scope="웹" rule="클릭/선택 피드백" />
            <token name="focus" value="outline 2px #2DD4BF" scope="키보드" rule="행/셀 포커스 표시" />
            <token name="disabled" value="opacity 45%" scope="웹" rule="비활성 행/액션(예: 처리 불가)" />
            <token name="loading" value="skeleton rows 1200ms" scope="웹" rule="스켈레톤은 행 높이 유지" />
            <token name="error" value="cell border #DC2626" scope="웹" rule="잘못된 값/검증 오류는 셀 단위 강조 + 툴팁" />
          </spec>
          <divider />
        </section>
      </section>
    </section>

    <!-- ============================== 6) 핵심 화면 패턴 ============================== -->
    <section mdLevel="2" title="핵심 화면 패턴(권장)" number="6">

      <!-- 6-1. AI 감성 대화 -->
      <section mdLevel="3" title="AI 감성 대화(Chat)" number="6-1">
        <spec>
          <token name="말풍선 최대 폭" value="78%" scope="채팅" rule="긴 문장 가독성 확보(과도한 전폭 금지)" />
          <token name="사용자 말풍선" value="bg #0F766E, text #FFFFFF" scope="채팅" rule="대비 확보, 그림자 최소" />
          <token name="AI 말풍선" value="bg #FFFFFF, border #E2E8F0" scope="채팅" rule="Surface 기반(읽기 쉬움)" />
          <token name="말풍선 라운드" value="16px" scope="채팅" rule="바깥 16, 꼬리 없음(단순 형태)" />
          <token name="말풍선 패딩" value="12px" scope="채팅" rule="장문은 줄간 1.6 권장" />
          <token name="시간/메타" value="12px, #475569" scope="채팅" rule="각 메시지 아래 4px 간격" />
          <token name="타이핑 인디케이터" value="dot 6px, 180ms" scope="채팅" rule="과도한 애니메이션 금지" />
        </spec>
      </section>

      <!-- 6-2. 위험 키워드 감지 -->
      <section mdLevel="3" title="위험 키워드 감지/확인 팝업" number="6-2">
        <spec>
          <token name="경고 배너 색" value="#D97706" scope="위험 감지" rule="주의/확인은 warning(amber), 즉시 응급이 아니면 red 금지" />
          <token name="위험 모달 닫힘" value="outside click: false" scope="위험 모달" rule="바깥 클릭 닫힘 금지(실수 방지)" />
          <token name="CTA 구성" value="2개(확인/괜찮아요)" scope="위험 모달" rule="Primary=도움 받기/연락, Secondary=괜찮아요" />
          <token name="관리자 알림" value="toast + badge" scope="관리자" rule="실시간 배지 + 목록 강조(색만으로 구분 금지)" />
          <token name="문구 길이" value="&lt;= 2문장" scope="팝업" rule="정보 과다 금지, 상세는 자세히 보기로 분리" />
        </spec>
      </section>

      <!-- 6-3. 긴급 신고 -->
      <section mdLevel="3" title="긴급 신고(원터치)" number="6-3">
        <spec>
          <token name="긴급 버튼" value="height 64px, bg #B91C1C" scope="긴급" rule="화면 하단 고정 또는 홈 상단 고정(항상 접근 가능)" />
          <token name="긴급 버튼 라벨" value="18px/26px, 700" scope="긴급" rule="119 연결/경찰 연결 등 구체적 라벨" />
          <token name="오동작 방지" value="2-step, 3s" scope="긴급" rule="1차: 확인 모달, 2차: 3초 카운트다운(취소 가능)" />
          <token name="위치 공유" value="permission gate" scope="긴급" rule="최초 1회 권한 설명(왜 필요한지) + 설정 이동 제공" />
          <token name="실패 처리" value="error toast 5000ms" scope="긴급" rule="통화 불가/권한 거부 시 대체 안내(직접 전화번호 표시)" />
        </spec>
        <divider />
      </section>
    </section>

    <!-- ============================== 7) 접근성 ============================== -->
    <section mdLevel="2" title="접근성(A11y) 체크리스트(필수)" number="7">
      <spec>
        <token name="텍스트 대비" value="&gt;= 4.5:1" scope="공통" rule="본문/라벨은 4.5:1, 큰 텍스트(&gt;=18px bold or 24px) 3:1" />
        <token name="터치 타깃" value="&gt;= 44×44px" scope="공통" rule="아이콘 버튼도 포함" />
        <token name="포커스 표시" value="ring 3px #2DD4BF" scope="키보드" rule="포커스가 보이는 상태여야 함" />
        <token name="폼 라벨" value="label 항상 표시" scope="폼" rule="placeholder로 라벨 대체 금지" />
        <token name="오류 안내" value="색+텍스트" scope="폼" rule="오류를 색만으로 전달 금지, 해결 방법 포함" />
        <token name="스크린리더" value="aria-label" scope="아이콘 버튼" rule="아이콘만 있는 버튼은 접근성 라벨 필수" />
        <token name="동적 글자 크기" value="100~200%" scope="앱" rule="OS 글자 확대 시 레이아웃 깨짐 없이 리플로우" />
        <token name="모션 감소" value="reduce motion" scope="공통" rule="OS 설정 시 비필수 애니메이션 제거" />
        <token name="알림/경고" value="role=alert" scope="위험/오류" rule="중요 알림은 스크린리더에 즉시 전달" />
        <token name="시간 제한" value="연장 제공" scope="세션/보안" rule="자동 로그아웃/제한 있는 경우 연장/저장 제공" />
      </spec>
      <divider />
    </section>

    <!-- ============================== 8) UI QA 체크리스트 ============================== -->
    <section mdLevel="2" title="UI QA 체크리스트(필수)" number="8">
      <spec>
        <token name="대표 해상도 테스트" value="360/390/414/768/1024/1280" scope="공통" rule="최소 6개 폭에서 레이아웃 확인" />
        <token name="안전영역(safe-area)" value="top/bottom inset" scope="iOS" rule="노치/홈 인디케이터에 UI 겹침 금지" />
        <token name="키보드 회피" value="input always visible" scope="앱" rule="채팅/폼에서 입력창 가림 금지" />
        <token name="로딩 상태" value="skeleton/spinner" scope="공통" rule="모든 API 호출에 loading 정의(빈 화면 금지)" />
        <token name="오류 상태" value="error state" scope="공통" rule="네트워크/권한/서버 오류 각각 다른 안내" />
        <token name="오프라인" value="retry CTA" scope="공통" rule="오프라인 안내 + 재시도 버튼" />
        <token name="긴 문구" value="wrap + ellipsis" scope="공통" rule="한글 장문/줄바꿈/다국어에서 깨짐 없음" />
        <token name="접근성" value="VoiceOver/TalkBack" scope="앱" rule="주요 플로우를 스크린리더로 완료 가능" />
        <token name="클릭/탭 중복" value="debounce 400ms" scope="공통" rule="중복 제출/중복 네비게이션 방지" />
        <token name="위험/긴급 플로우" value="2-step 확인" scope="안전망" rule="실수 방지, 취소 가능, 로그 기록" />
      </spec>
      <divider />
    </section>

    <!-- ============================== 9) 가정 ============================== -->
    <section mdLevel="2" title="가정(Assumptions)" number="9">
      <spec>
        <token name="기본 모드" value="Light mode" scope="전체" rule="다크모드는 v2 범위(요청 시 별도 토큰 추가)" />
        <token name="기본 폰트 적용" value="Pretendard 사용 가능" scope="앱/관리자" rule="번들/서버 로드 가능하다고 가정(불가 시 시스템 폰트)" />
        <token name="디자인 단위" value="px 기준" scope="공통" rule="iOS/Android는 dp/pt로 변환 적용" />
        <token name="관리자 UI" value="Web(Desktop 우선)" scope="관리자" rule="1024px 이상을 기본 기준으로 설계" />
        <token name="테이블/차트" value="표 중심" scope="관리자" rule="차트는 v2에서 추가(현재 표/지표 카드 중심)" />
      </spec>
    </section>
  </content>
</uiuxSpec>
```
