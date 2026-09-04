# plan.md — Figma "코딩용 최종" 컴포넌트화 계획

> 전제: `research.md` 조사 결과 기반. **이 문서는 계획서이며 구현은 승인 후에 시작합니다.**

---

## 0. 결정사항 (2026-09-04 승인 완료)

| 결정 | 확정안 |
|---|---|
| **A. 기존 사이트** | **A-1** — `src/shop/`에 분리. 기존 코드 무수정 |
| **B. 범위** | **B-1** — 컴포넌트 32개 + 화면 10개 |
| **C. 라우팅** | **C-1** — `useState` 기반 전환, 의존성 추가 없음 |
| **D. 폰트** | **D-1** — `pretendard` + `@fontsource/prompt` 설치 |

<details>
<summary>검토했던 대안들</summary>


구현 전에 아래 4개는 답이 갈리면 결과물이 크게 달라집니다.

### 결정 A — 기존 사이트와의 관계 ⚠️ 필수

현재 저장소는 GSAP 기반 **에디토리얼 원페이지 사이트**이고, Figma는 **모바일 쇼핑몰 앱**입니다. 완전히 다른 제품입니다.

| 안 | 내용 | 장점 | 단점 |
|---|---|---|---|
| **A-1 (권장)** | 기존 코드를 건드리지 않고 `src/shop/` 하위에 새 컴포넌트 계층을 쌓음. `/shop` 진입점 별도 | 기존 사이트 무손상, 원칙 4(꼭 필요한 것만 수정) 준수, 되돌리기 쉬움 | 저장소에 두 스타일이 공존 |
| A-2 | 커머스가 기존 사이트를 대체. 기존 컴포넌트/CSS 삭제 | 저장소가 하나의 제품으로 정리됨 | 기존 작업물 폐기, 되돌리기 어려움 |
| A-3 | 컴포넌트만 만들고 앱에 연결 안 함 (라이브러리 전용) | 가장 안전 | 눈으로 확인 불가 |

### 결정 B — 작업 범위

| 안 | 내용 |
|---|---|
| **B-1 (권장)** | **컴포넌트 32개 + 화면 조립 10개** — 컴포넌트가 실제로 잘 조립되는지 화면으로 증명 |
| B-2 | 컴포넌트 32개만. 화면 조립은 다음 작업 |

> 사용자 요청이 "코딩하기 쉽게 컴포넌트화"이므로 B-2도 문자 그대로는 충족하지만, 화면 하나도 없으면 컴포넌트 API가 맞는지 검증할 방법이 없습니다. **B-1 권장.**

### 결정 C — 라우팅

`react-router` 미설치. 화면 10개를 전환할 방법이 필요합니다.

| 안 | 내용 |
|---|---|
| **C-1 (권장)** | 의존성 추가 없이 `useState` 기반 화면 전환 (`ScreenId` 유니온 타입) | 원칙 3(단순함 우선) 부합, 프로토타입 단계에 충분 |
| C-2 | `react-router-dom` 도입 | URL 공유 가능, 실제 서비스에 가까움. 의존성 +1 |

### 결정 D — 폰트

Pretendard / Prompt / Tempting 미설치.

| 안 | 내용 |
|---|---|
| **D-1 (권장)** | `pretendard` + `@fontsource/prompt` npm 설치. `Tempting`(로고 S 1글자)은 이미지 또는 대체 서체 | 디자인 재현도 높음 |
| D-2 | 시스템 폰트 스택으로 대체 | 의존성 0, 재현도 낮음 |

</details>

---

## 1. 접근 방식

### 1.1 원칙
1. **디자이너의 컴포넌트 시트(`Frame 64`)를 1차 기준선으로 삼는다.** 임의로 쪼개거나 합치지 않는다.
2. **absolute 좌표를 그대로 옮기지 않는다.** Figma는 Auto Layout 미사용이지만, 코드는 flex/grid로 재구성한다. (좌표 복사는 유지보수 불가)
3. **423px 고정이 아닌 모바일 우선 유동 레이아웃.** `max-width: 423px` 컨테이너 안에서 내부는 `%`/`fr`/`gap`으로. Figma 픽셀은 *비율*의 근거로만 사용.
4. **기존 저장소 컨벤션을 그대로 따른다.** 플레인 CSS + BEM + `cn()` + named export + `readonly` 타입 + 데이터 분리.
5. **README의 "단 하나의 규칙" 준수.** 이미지 경로는 `assets.ts`, 카피/가격은 `content.ts`.

### 1.2 디렉터리 구조 (결정 A-1 기준)

```
src/
├── shop/                          ← 신규. 기존 코드와 완전 분리
│   ├── ShopApp.tsx                ← 화면 전환 진입점
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MobileShell.tsx
│   │   │   ├── AppHeader.tsx
│   │   │   └── PageTitle.tsx
│   │   ├── nav/
│   │   │   ├── SideDrawer.tsx
│   │   │   ├── NavMenuList.tsx
│   │   │   └── SearchField.tsx
│   │   ├── commerce/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── CategoryBreadcrumb.tsx
│   │   │   ├── SortTrigger.tsx
│   │   │   ├── SortMenu.tsx
│   │   │   ├── QuantityStepper.tsx
│   │   │   ├── CartLineItem.tsx
│   │   │   ├── OrderSummary.tsx
│   │   │   └── PriceLine.tsx
│   │   ├── form/
│   │   │   ├── ShopButton.tsx
│   │   │   ├── ButtonPair.tsx
│   │   │   ├── TextField.tsx
│   │   │   └── SocialLoginButton.tsx
│   │   ├── content/
│   │   │   ├── TabNav.tsx
│   │   │   ├── SizeGuideTable.tsx
│   │   │   ├── PolicyList.tsx
│   │   │   ├── CollectionStrip.tsx
│   │   │   └── EmptyState.tsx
│   │   └── icons/
│   │       └── index.tsx          ← 아이콘 7개 한 파일
│   ├── screens/                   ← 결정 B-1일 때만
│   │   ├── HomeScreen.tsx
│   │   ├── AboutScreen.tsx
│   │   ├── ArchiveScreen.tsx
│   │   ├── ProductListScreen.tsx
│   │   ├── ProductDetailScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── CartScreen.tsx
│   │   └── CartEmptyScreen.tsx
│   ├── data/
│   │   ├── products.ts            ← 상품 목록
│   │   ├── navigation.ts          ← 메뉴/정렬 옵션
│   │   ├── collections.ts         ← 아카이브 컬렉션
│   │   └── copy.ts                ← 정책문/안내문/사이즈표
│   ├── types.ts
│   └── shop.css                   ← 신규 스타일시트 (index.css 미수정)
```

`src/data/assets.ts`에는 상품/룩/로고 경로만 **추가**합니다 (기존 항목 무수정).

---

## 2. 컴포넌트 명세 (32개)

### 2.1 아이콘 (7) — `shop/components/icons/index.tsx`

Figma 에셋 URL을 이 환경에서 내려받을 수 없으므로(연구 §7) 인라인 SVG로 작성. **치수는 Figma 값 준수.**

| 컴포넌트 | 치수 | 출처 |
|---|---|---|
| `MenuIcon` | 19×15 | `Group 306` |
| `BagIcon` | 20×22 | `Group 308` |
| `CaretIcon` | 4×4, `direction` prop (up/down/right) | `Polygon 1/2/3` |
| `CloseIcon` | 19.4×19.4 | `Vector 1`+`Vector 2` 45° 조합 |
| `SearchIcon` | 22.6×21.7 | `Group 309` (`174:697`) |
| `PlusIcon` | 10×10 | `Group 79` |
| `MinusIcon` | 10×1 | `Vector 66` |

```tsx
// 공통 시그니처
interface IconProps { className?: string; }
export function MenuIcon({ className }: IconProps) { /* ... */ }
export function CaretIcon({ direction = "down", className }: CaretIconProps) { /* ... */ }
```

### 2.2 레이아웃 (3)

**`MobileShell`** — 모든 화면의 껍데기. `max-width: 423px`, 흰 배경, 중앙 정렬.
```tsx
interface MobileShellProps {
  children: ReactNode;
  /** 상단바를 콘텐츠 위에 겹칠지 (메인 탭 전용). */
  overlayHeader?: boolean;
}
```

**`AppHeader`** — TAB BAR. 시트의 white/black 두 변형.
```tsx
interface AppHeaderProps {
  variant?: "light" | "dark";   // light = 흰 배경 위 검정 아이콘 (기본)
  onMenuClick: () => void;
  onCartClick: () => void;
}
```
> 로고는 `assets.ts`의 `SHOP_LOGO`를 사용. 파일이 없으면 `SAIRYU` 워드마크로 폴백.

**`PageTitle`** — 18px Light 중앙 정렬 (`Log-in`, `Cart(1)`).
```tsx
interface PageTitleProps { children: ReactNode; }
```

### 2.3 내비게이션 (4)

**`SideDrawer`** — 좌측 탭 전체 화면 오버레이. 연구 §5.2대로 `search` 상태 하나로 두 프레임을 커버.
```tsx
interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (item: NavItemId) => void;
}
// 내부 상태: searchOpen (SEARCH 클릭 시 토글)
```

**`NavMenuList`** — 대메뉴 리스트 (22.617px, pitch 73.23px → CSS `gap`으로).
```tsx
interface NavMenuListProps {
  items: readonly NavItem[];
  onSelect: (id: NavItemId) => void;
}
```

**`SearchField`** — placeholder `search`(#D9D9D9) + 돋보기 + 하단 hairline.
```tsx
interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
}
```

**`CloseButton`** — X 아이콘 버튼 (아카이브/좌측탭 우상단). `icons/index.tsx`의 `CloseIcon` 래핑.

### 2.4 커머스 (9)

**`ProductCard`** ← `Component 6` (`158:94`). 할인 유무 지원이 필수 (연구 §5.3).
```tsx
interface ProductCardProps {
  product: Product;
  onClick?: (id: string) => void;
}
// Product.discountRate가 있으면: 정가 취소선(#9C9C9C) + 판매가 + 할인율
// 없으면: 가격 한 줄
```

**`ProductGrid`** — 2열 grid, `gap: 19px`.
```tsx
interface ProductGridProps {
  products: readonly Product[];
  onSelect?: (id: string) => void;
}
```

**`CategoryBreadcrumb`** ← 시트 `SORT`. `SHOP › TOP` / `SHOP › BAG`.
```tsx
interface CategoryBreadcrumbProps { category: string; }
```

**`SortTrigger`** ← 시트 `SORT 2` + `Component 2/3`. 열림/닫힘에 따라 캐럿 방향 반전.
```tsx
interface SortTriggerProps {
  open: boolean;
  onToggle: () => void;
  label?: string;   // 기본 "SORT BY"
}
```

**`SortMenu`** ← `Group 80` (`174:353`). 106×93 패널.
```tsx
interface SortMenuProps {
  options: readonly SortOption[];
  value: SortOptionId;
  onSelect: (id: SortOptionId) => void;
}
```

**`QuantityStepper`** ← `Vector 66` + `Group 79`.
```tsx
interface QuantityStepperProps {
  value: number;
  min?: number;          // 기본 1
  onChange: (next: number) => void;
}
```

**`CartLineItem`** ← `Component 4` (`158:82`). 화면별로 썸네일 크기·부가요소가 달라 prop으로 흡수.
```tsx
interface CartLineItemProps {
  item: CartItem;
  /** "confirm" = 담기확인(썸네일 137×183) | "list" = 장바구니(103×138 + 체크박스 + 삭제) */
  variant?: "confirm" | "list";
  selected?: boolean;
  onSelectChange?: (selected: boolean) => void;
  onQuantityChange?: (next: number) => void;
  onRemove?: () => void;
}
```

**`OrderSummary`** ← `Component 7` (`174:91`).
```tsx
interface OrderSummaryProps {
  productTotal: number;
  shippingFee: number;
  /** 미지정 시 productTotal + shippingFee */
  payableTotal?: number;
}
```

**`PriceLine`** — 가격 표기 원자 컴포넌트. `ProductCard`·`CartLineItem`·상세가 공유.
```tsx
interface PriceLineProps {
  price: number;
  originalPrice?: number;   // 있으면 취소선
  discountRate?: number;    // 있으면 "10%" 표기
  size?: "sm" | "md" | "lg";  // 13 / 15 / 19.341px
}
```

### 2.5 폼·액션 (4)

**`ShopButton`** — 디자인의 버튼은 솔리드/아웃라인 2종뿐.
```tsx
interface ShopButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";   // 기본 solid
  size?: "sm" | "md";              // 41px / 51~53px
  fullWidth?: boolean;
}
```
> 기존 `src/components/Button.tsx`(magnetic + 이중라벨)와는 별개 컴포넌트입니다. 기존 파일은 **수정하지 않습니다.**

**`ButtonPair`** ← `Component 5`(`주문버튼`). 아웃라인+솔리드 쌍. 3곳에서 재사용(상세 Add to Cart/Buy Now, 담기확인, 장바구니).
```tsx
interface ButtonPairProps {
  leftLabel: string;
  rightLabel: string;
  onLeftClick: () => void;
  onRightClick: () => void;
}
```

**`TextField`** — 393×51 아웃라인 r5. Figma는 라벨을 인풋 안 텍스트로 그렸으므로 `placeholder`로 매핑.
```tsx
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;   // 접근성용 (시각적으로는 placeholder)
}
```

**`SocialLoginButton`** — 카카오/네이버.
```tsx
interface SocialLoginButtonProps {
  provider: "kakao" | "naver";
  onClick: () => void;
}
// kakao: #FCE30B / naver: #00BF19, 아이콘 33×33 r5, 보더 #E2E3E3, 192×67
```

### 2.6 콘텐츠 (5)

**`TabNav`** — `상품 정보`/`사이즈 가이드`/`배송안내`. 활성 #000, 비활성 #999, 하단 hairline.
```tsx
interface TabNavProps<T extends string> {
  tabs: readonly { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
}
```

**`SizeGuideTable`** — 5열×5행. **9px → 11px 상향** (트레이드오프 §4 참조).
```tsx
interface SizeGuideTableProps {
  columns: readonly string[];   // SIZE / LENGTH / SHOULDER / CHEST / SLEEVE
  rows: readonly SizeRow[];
  caption?: string;             // "SIZE GUIDE (단위 : cm)"
}
```

**`PolicyList`** — `REFUND & EXCHANGE` 불릿 텍스트.
```tsx
interface PolicyListProps {
  title: string;
  items: readonly string[];
}
```

**`CollectionStrip`** — 아카이브 컬렉션 1개 (라벨 칩 + 룩 이미지 나열).
```tsx
interface CollectionStripProps {
  collection: Collection;   // { label, looks: readonly LookImage[] }
}
```

**`EmptyState`** — `The cart is empty.` 등.
```tsx
interface EmptyStateProps { message: string; }
```

---

## 3. 타입 정의 — `src/shop/types.ts`

```ts
export interface Product {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  /** 할인 적용 시 원래 가격. 없으면 할인 없음. */
  readonly originalPrice?: number;
  readonly discountRate?: number;
  readonly image: string;        // assets.ts 경유
  readonly category: CategoryId;
}

export interface CartItem {
  readonly product: Product;
  readonly quantity: number;
}

export type CategoryId = "all" | "new" | "top" | "bag";
export type NavItemId = CategoryId | "archive" | "search";
export type SortOptionId = "new-arrivals" | "oldest-first";
export type ProductDetailTab = "info" | "size" | "shipping";

export interface NavItem {
  readonly id: NavItemId;
  readonly label: string;
}

export interface SizeRow {
  readonly size: string;
  readonly values: readonly number[];
}

export interface LookImage {
  readonly src: string;
  readonly alt: string;
}

export interface Collection {
  readonly id: string;
  readonly label: string;
  readonly looks: readonly LookImage[];
}
```

> `any` 미사용. 모든 필드 `readonly`. 기존 `src/types/index.ts` 스타일 그대로.

---

## 4. 스타일 토큰 — `src/shop/shop.css`

`index.css`는 **수정하지 않고**, 새 스코프(`.shop`)에 토큰을 선언합니다. 기존 다크 팔레트와 충돌하지 않게 하기 위함입니다.

```css
.shop {
  /* Color */
  --shop-ink: #000000;
  --shop-bg: #ffffff;
  --shop-placeholder: #d9d9d9;
  --shop-price-strike: #9c9c9c;
  --shop-muted: #999999;
  --shop-note: #757575;
  --shop-checkbox: #4c4c4c;
  --shop-border-thumb: #ebecec;
  --shop-border-social: #e2e3e3;
  --shop-social-text: #1a1a1a;
  --shop-kakao: #fce30b;
  --shop-naver: #00bf19;

  /* Type */
  --shop-font: "Pretendard Variable", Pretendard, system-ui, sans-serif;
  --shop-font-label: "Prompt", var(--shop-font);

  /* Size */
  --shop-fs-label: 10.6px;
  --shop-fs-sm: 13px;
  --shop-fs-body: 13.5px;
  --shop-fs-md: 15.5px;
  --shop-fs-lg: 18px;
  --shop-fs-price: 19.3px;
  --shop-fs-title: 20px;
  --shop-fs-menu: 22.6px;

  /* Layout */
  --shop-width: 423px;
  --shop-gutter: 15px;
  --shop-gutter-wide: 27px;
  --shop-gutter-header: 20px;
  --shop-radius: 5px;
}
```

클래스 네이밍은 기존 BEM 유지: `.shop-card`, `.shop-card__price`, `.shop-btn--outline`.

---

## 5. 트레이드오프 (숨기지 않고 명시)

| # | 사안 | 디자인 그대로 | 제안 | 이유 |
|---|---|---|---|---|
| 1 | 상품 카드 이미지 | 175×233 (3:3.99) | **3/4 aspect-ratio** | Figma 자체 텍스트가 "3:4". 1px 차이는 반올림 오차 |
| 2 | 사이즈 가이드 폰트 | 9px | **11px** | 9px는 모바일 실기기에서 판독 불가. 접근성 최소치 위반 |
| 3 | 폰트 크기 소수점 | 10.643 / 17.232 / 20.085px | **10.6 / 17.2 / 20px 반올림** | 소수 3자리는 렌더 차이 없음. 가독성만 해침 |
| 4 | 화면 폭 | 423px 고정 | **max-width 423px + 유동** | 실제 기기 폭이 다름. 고정 시 대부분 기기에서 잘림/여백 |
| 5 | 하단 브라우저 바 | 423×95 이미지 | **코드화 안 함** | iOS Safari UI 스크린샷. 앱 UI가 아님 |
| 6 | `3:4` 라벨 텍스트 (40px) | 표시 | **미표시** | 이미지 비율 안내용 디자인 주석 |
| 7 | 좌측탭 메뉴 pitch | 73.23px 절대좌표 | **`gap`으로 환산** | 절대좌표는 폰트 로딩/줄바꿈에 취약 |
| 8 | 정렬 드롭다운 | 106×93 절대 배치 | **`position: absolute` + 트리거 기준 앵커** | 트리거 위치가 바뀌어도 따라감 |

---

## 6. 구현 체크리스트 — 완료

### Phase 0 — 준비
- [x] 결정 A/B/C/D 확정 (A-1 / B-1 / C-1 / D-1)
- [x] `pretendard`, `@fontsource/prompt` 설치
- [x] `src/shop/` 디렉터리 생성
- [x] `src/shop/shop.css` 토큰 선언 — 검증: 브라우저 렌더로 확인

### Phase 1 — 기반
- [x] `src/shop/types.ts` — 검증: `npm run typecheck` 통과
- [x] `src/shop/format.ts` (계획에 없던 추가) — `formatKrw` / `formatRate`. 가격 포맷이 4곳에서 중복될 상황이라 원자 단위로 분리
- [x] `src/shop/components/icons/index.tsx` (7개) — 검증: 각 아이콘이 Figma 박스 치수를 그대로 유지
- [x] `src/shop/data/` (products / navigation / collections / copy)
- [x] `src/data/assets.ts`에 `SHOP_LOGO`, `PRODUCT_IMAGES`, `SHOP_HOME_IMAGE`, `SHOP_ABOUT_IMAGE`, `LOOK_IMAGES` **추가** (기존 항목 무수정)

### Phase 2 — 원자 컴포넌트
- [x] `PriceLine` — 검증: 할인 있음/없음 두 케이스 모두 렌더 확인
- [x] `ShopButton` — 검증: solid/outline × sm/md
- [x] `QuantityStepper` — 검증: `min` 이하에서 감소 버튼 비활성
- [x] `TextField`
- [x] `PageTitle`
- [x] `EmptyState`
- [x] `CloseButton`

### Phase 3 — 조합 컴포넌트
- [x] `AppHeader` (black/white) — 검증: 시트 white/black 2변형 대조
- [x] `MobileShell`
- [x] `ProductCard` — 검증: 시트 `Component 6` 대조
- [x] `ProductGrid`
- [x] `CategoryBreadcrumb` / `SortTrigger` / `SortMenu`
- [x] `CartLineItem` (confirm/list) — 검증: 시트 `Component 4` + 장바구니 2케이스
- [x] `OrderSummary` — 검증: 시트 `Component 7` 대조
- [x] `ButtonPair` — 검증: 시트 `주문버튼` 대조
- [x] `SocialLoginButton` (kakao/naver)
- [x] `TabNav` / `SizeGuideTable` / `PolicyList`
- [x] `NavMenuList` / `SearchField` / `SideDrawer`
- [x] `CollectionStrip`

### Phase 4 — 화면 조립
- [x] `HomeScreen` / `AboutScreen` / `ArchiveScreen`
- [x] `ProductListScreen` (정렬 열림/닫힘)
- [x] `ProductDetailScreen` (탭 3상태)
- [x] `LoginScreen`
- [x] `CartScreen` — **계획 변경**: `CartEmptyScreen`을 별도 파일로 두지 않고 `CartScreen`이 빈 상태를 렌더. 화면 하나에 상태가 둘일 뿐이라 파일을 나눌 이유가 없었습니다 (원칙 3)
- [x] `CartConfirmScreen` — **계획 추가**: `장바구니 담았을 때`(`174:585`)가 장바구니 목록과 레이아웃이 달라 별도 화면으로 분리
- [x] `ShopApp` 화면 전환 + 장바구니 상태

### Phase 5 — 검증
- [x] `npm run typecheck` 무오류 (`any` 0개)
- [x] `npm run build` 성공 — `index.html`(기존 사이트) / `shop.html`(신규) 2개 엔트리
- [x] Playwright로 10개 화면 전체 플로우 주파 — 콘솔/페이지 에러 0건
- [x] 각 화면을 Figma 스크린샷과 육안 대조
- [x] 기존 에디토리얼 사이트 무회귀 확인 (`/` 정상 렌더, 에러 0건)
- [x] README에 `src/shop/` 구조 추가
- [x] 커밋 & `claude/seiryuu-branding-components-poovn8` 푸시

### 구현 중 발견해 고친 문제
1. **버튼 테두리·배경 실종** — `.shop button { background: none; border: none }` 리셋이 `.shop-btn--solid`(둘 다 클래스 1개 + 타입 1개 vs 클래스 1개)보다 우선순위가 높아 모든 버튼이 맨텍스트로 렌더됐습니다. 리셋을 `:where()`로 감싸 특이도를 0으로 낮춰 해결.
2. **본문 8px 여백** — `shop.html`이 별도 문서라 `index.css`의 전역 리셋이 적용되지 않아 423px 컬럼이 8px 밀리고 16px 좁아졌습니다. `shop.css`에 `body { margin: 0 }` 추가.
3. **좌측 탭 메뉴 간격** — `gap: 46px`은 Figma의 73.23px pitch보다 촘촘했습니다. 53px로 조정.
4. **장바구니 순서** — 안내문("100,000원 이상…")이 주문버튼 위에 있었으나 Figma는 버튼(y=664) 아래(y=734)에 둡니다. 순서를 맞추고 주문 바는 `margin-top: auto`로 하단 고정.

## 7. 남은 리스크

| 리스크 | 영향 | 대응 |
|---|---|---|
| **에셋 미확보** (로고 PNG, 상품 사진, 룩북, 카카오/네이버 로고) | 화면이 회색 플레이스홀더로 보임 | `assets.ts`에 경로만 선언 + `#D9D9D9` 플레이스홀더. 파일만 넣으면 즉시 반영 (README 규칙) |
| Figma 에셋 URL 7일 만료 | 나중에 재조회 불가 | 필요한 정보는 research.md에 수치로 기록 완료 |
| `Tempting` 폰트 (S 로고) | 로고 마크 미재현 | 이미지로 대체하거나 사용자 제공 대기 |
| eslint 미설치 (`npm run lint` 실패) | 린트 검증 불가 | 이번 범위 밖. `typecheck`로 대체 |
