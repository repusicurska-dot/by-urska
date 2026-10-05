/**
 * Discount codes for the shop (Urška, 2026-10-05: "možnost 10 % popust" and "early bird 30 % off
 * z kodo"). One code per order, taken off every painting in it. The server is the source of truth:
 * /api/checkout checks the code again and lowers the Stripe price itself, so a code typed in the
 * browser can never change what is charged.
 *
 * - EARLYBIRD30 — 30 % for the first collectors, shown on the site, until the end of 2026.
 * - URSKA10 — 10 %, not advertised; Urška gives it personally (returning collectors, friends).
 *
 * Adding a code is adding a line here. A code with `until` stops working after that day
 * (Slovenian time).
 */
export interface DiscountCode {
  code: string;
  /** Fraction taken off, e.g. 0.3 for 30 %. */
  percent: number;
  /** Last day the code works, YYYY-MM-DD in Slovenian time. */
  until?: string;
}

export const DISCOUNT_CODES: DiscountCode[] = [
  { code: "EARLYBIRD30", percent: 0.3, until: "2026-12-31" },
  { code: "URSKA10", percent: 0.1 },
];

export const EARLY_BIRD = DISCOUNT_CODES[0];

function todayInSlovenia(now: Date): string {
  return now.toLocaleDateString("sv-SE", { timeZone: "Europe/Ljubljana" });
}

export function isActive(discount: DiscountCode, now = new Date()): boolean {
  return !discount.until || todayInSlovenia(now) <= discount.until;
}

/** The code as typed (any case, spaces ignored), if it exists and still works. */
export function findDiscount(input: string, now = new Date()): DiscountCode | null {
  const wanted = input.replace(/\s+/g, "").toUpperCase();
  if (!wanted) return null;
  const found = DISCOUNT_CODES.find((d) => d.code === wanted);
  return found && isActive(found, now) ? found : null;
}

/** A price after the discount, rounded to whole cents. */
export function discountedPrice(price: number, discount: DiscountCode | null): number {
  if (!discount) return price;
  return Math.round(price * (1 - discount.percent) * 100) / 100;
}
