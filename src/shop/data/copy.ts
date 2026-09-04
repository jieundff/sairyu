/**
 * copy.ts — every string the shop renders that is not a product or a menu.
 *
 * Titles, button labels, policy text and the size chart live here so the
 * components stay free of hardcoded copy (repo rule).
 */

import type { SizeRow } from "@/shop/types";

/** Brand wordmark used when no logo image is configured. */
export const SHOP_WORDMARK = "SAIRYU";

/** Category breadcrumb shown above the product grid. */
export const SHOP_BREADCRUMB = { root: "SHOP", category: "TOP" } as const;

/** Sort dropdown trigger label. */
export const SORT_TRIGGER_LABEL = "SORT BY";

/** Product list / detail copy. */
export const PRODUCT_COPY = {
  addToCart: "Add to Cart",
  buyNow: "Buy Now",
  /** `총 금액 : 39,000원 (1개)` — count and amount are filled in at render. */
  totalPrefix: "총 금액",
} as const;

/** Cart copy. */
export const CART_COPY = {
  emptyMessage: "The cart is empty.",
  freeShippingNote: "100,000원 이상 결제시 배송비 무료입니다.",
  goToCart: "장바구니 이동",
  placeOrder: "주문하기",
  orderSelected: "선택상품 주문",
  orderAll: "전체상품 주문",
  productTotal: "총 상품금액",
  shippingTotal: "총 배송비",
  payableTotal: "결제예정금액",
} as const;

/** Flat shipping fee applied under the free-shipping threshold, in KRW. */
export const SHIPPING_FEE = 3_000;

/** Login screen copy. */
export const LOGIN_COPY = {
  title: "Log-in",
  idLabel: "ID",
  passwordLabel: "Password",
  submit: "로그인",
  links: [
    { id: "find-id", label: "아이디 찾기" },
    { id: "find-password", label: "비밀번호 찾기" },
    { id: "sign-up", label: "회원가입하기" },
  ],
  kakao: "카카오 로그인",
  naver: "네이버 로그인",
} as const;

/** Home / About copy. */
export const ABOUT_COPY = {
  heading: "about",
  body:
    "SAIRYU는 '세상의 흐름'이라는 브랜드 철학 아래, 각자의 속도와 방식으로 " +
    "흘러가는 삶의 모습을 담아내고자 합니다. 단순한 옷 한벌을 넘어, 바쁜 하루 " +
    "속 작은 여유와 편안함을 전할 수 있기를 .... 그리고 그 여정속에 SAIRYU가 " +
    "함께할 수 있기를 바랍니다.",
} as const;

/** Size guide table — columns are the header row, rows the measurements. */
export const SIZE_GUIDE = {
  caption: "SIZE GUIDE (단위 : cm)",
  columns: ["SIZE", "LENGTH", "SHOULDER", "CHEST", "SLEEVE"] as const,
  rows: [
    { size: "1", values: [66, 45.5, 47, 19] },
    { size: "2", values: [70, 48, 51, 19.5] },
    { size: "3", values: [74, 50, 54, 21] },
    { size: "4", values: [77, 53, 56, 23] },
  ] as readonly SizeRow[],
} as const;

/** Refund & exchange policy shown under the 배송안내 tab. */
export const REFUND_POLICY = {
  title: "REFUND & EXCHANGE",
  items: [
    "교환 및 환불은 상품 수령 후 24시간 이내 신청해 주세요. 신청 후 7일 이내 상품이 도착해야 합니다.",
    "불량 또는 오배송 상품은 수령 후 3일 이내 게시판에 접수해 주세요. 확인 후 빠르게 교환 또는 환불해 드립니다.",
    "상품은 반드시 기존 포장 상태 그대로 보내주셔야 교환 및 환불이 가능합니다.",
  ],
} as const;

/** Links overlaid on the home screen. */
export const HOME_LINKS = [
  { id: "about", label: "about" },
  { id: "instagram", label: "instagram" },
] as const;

/** Archive screen heading. */
export const ARCHIVE_COPY = {
  wordmark: "SAIRYU",
  tagline: "Seasonal Human since 2025 in korea",
} as const;
