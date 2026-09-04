/**
 * format.ts — number formatting shared by every price surface.
 *
 * The design writes prices as "39,000원", so grouping and the 원 suffix are
 * applied in one place rather than in each component.
 */

/** Format a KRW amount the way the design writes it: `39,000원`. */
export function formatKrw(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}

/** Format a discount rate the way the design writes it: `10%`. */
export function formatRate(rate: number): string {
  return `${rate}%`;
}
