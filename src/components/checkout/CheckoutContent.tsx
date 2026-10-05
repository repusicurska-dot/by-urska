"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import ProvisionalPriceNote from "@/components/story/ProvisionalPriceNote";
import { useCart } from "@/lib/cart/CartContext";
import { getArtworkBySlug } from "@/lib/content";
import { ZONE_ORDER } from "@/lib/shipping";
import { ShippingZone } from "@/content/types";
import { useLanguage } from "@/i18n/LanguageProvider";
import { formatPrice } from "@/lib/format";
import { discountedPrice, findDiscount } from "@/lib/discounts";
import { SHOP_TERMS, fill } from "@/lib/shopTerms";
import EarlyBirdNote from "@/components/shared/EarlyBirdNote";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string }
  | { status: "checkout-not-live"; message: string };

export default function CheckoutContent() {
  const { t, locale } = useLanguage();
  const c = t.checkout;
  const cart = useCart();
  const items = cart.slugs
    .map((slug) => getArtworkBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const anyUnconfirmed = items.some((item) => !item.priceConfirmed);
  const terms = SHOP_TERMS[locale];

  const [zone, setZone] = useState<ShippingZone>("SI");
  // Every painting is bought directly within the EU; anywhere else goes through a request.
  const buyable = items.every((item) => item.shipsTo.includes(zone));
  const [codeInput, setCodeInput] = useState("");
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [codeError, setCodeError] = useState(false);
  const discount = discountCode ? findDiscount(discountCode) : null;
  const total = items.reduce((sum, item) => sum + discountedPrice(item.price, discount), 0);

  function applyCode() {
    const found = findDiscount(codeInput);
    setDiscountCode(found?.code ?? null);
    setCodeError(!found && codeInput.trim() !== "");
  }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slugs: items.map((i) => i.slug),
          shippingZone: zone,
          contact: { name, email },
          agreedToTerms: agreed,
          discountCode: discount?.code,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState({ status: "error", message: data.error ?? c.genericError });
        return;
      }
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      setState({ status: "checkout-not-live", message: data.message });
    } catch {
      setState({ status: "error", message: c.networkError });
    }
  }

  if (items.length === 0) {
    return (
      <section className="py-24 md:py-32 text-center">
        <Container>
          <p className="text-bone/60">{t.cart.empty}</p>
          <Link
            href="/collection"
            className="inline-block mt-6 text-sm tracking-widest uppercase text-gold-400 hover:text-bone transition-colors border-b border-gold-400/40 pb-1"
          >
            {t.cart.browse}
          </Link>
        </Container>
      </section>
    );
  }

  if (state.status === "checkout-not-live") {
    return (
      <section className="py-24 md:py-32 text-center">
        <Container className="max-w-lg">
          <h1 className="font-heading text-3xl text-bone mb-4">{c.almostThere}</h1>
          <p className="text-bone/70 leading-relaxed">{state.message}</p>
          <Link
            href={`/contact?piece=${items[0].slug}`}
            className="btn-primary inline-block mt-8"
          >
            {c.inquiryForm}
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-2xl">
        <span className="block text-xs tracking-widest uppercase text-gold-400">{c.title}</span>
        <h1 className="font-heading text-4xl md:text-5xl text-bone mt-4 mb-12">
          {c.completeOrder}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          <fieldset className="space-y-6">
            <legend className="text-xs tracking-widest uppercase text-bone/60 mb-2">
              {c.contactDetails}
            </legend>
            <div>
              <label htmlFor="name" className="block text-xs tracking-widest uppercase text-bone/60 mb-2">
                {c.name}
              </label>
              <input
                id="name"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-bone/20 rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-bone"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs tracking-widest uppercase text-bone/60 mb-2">
                {c.email}
              </label>
              <input
                id="email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-bone/20 rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-bone"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs tracking-widest uppercase text-bone/60 mb-3">
              {c.destination}
            </legend>
            <div className="space-y-2">
              {ZONE_ORDER.map((z) => (
                <label
                  key={z}
                  className="flex items-start gap-3 border border-bone/15 rounded-sm px-4 py-3 cursor-pointer has-[:checked]:border-bone"
                >
                  <input
                    type="radio"
                    name="zone"
                    value={z}
                    checked={zone === z}
                    onChange={() => setZone(z)}
                    className="mt-1"
                  />
                  <span>
                    <span className="block text-sm text-bone">{t.zones[z].label}</span>
                    <span className="block text-xs text-bone/50 mt-0.5">{t.zones[z].description}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="border-t border-b border-bone/10 py-6 space-y-3">
            <span className="block text-xs tracking-widest uppercase text-bone/60">
              {c.orderSummary}
            </span>
            {items.map((item) => (
              <div key={item.slug} className="flex justify-between text-sm text-bone/80">
                <span>{item.title}</span>
                <span>{formatPrice(item.price, locale)}</span>
              </div>
            ))}
            {discount && (
              <div className="flex justify-between text-sm text-gold-600">
                <span>{fill(terms.discountLine, { code: discount.code })}</span>
                <span>−{formatPrice(subtotal - total, locale)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-bone/60 pt-2">
              <span>{c.vat}</span>
              <span>{c.vatValue}</span>
            </div>
            <div className="flex justify-between text-sm text-bone/60">
              <span>{c.shipping}</span>
              <span>{c.shippingValue}</span>
            </div>
            <div className="flex justify-between font-heading text-xl text-bone pt-3">
              <span>{c.estimatedTotal}</span>
              <span>{formatPrice(total, locale)}</span>
            </div>
            {anyUnconfirmed && <ProvisionalPriceNote />}
          </div>

          <div>
            <label htmlFor="discount" className="block text-xs tracking-widest uppercase text-bone/60 mb-2">
              {terms.discountLabel}
            </label>
            <div className="flex gap-3">
              <input
                id="discount"
                type="text"
                autoComplete="off"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    applyCode();
                  }
                }}
                className="min-w-0 flex-1 border border-bone/20 rounded-sm px-4 py-3 bg-transparent uppercase focus:outline-none focus:border-bone"
              />
              <button type="button" onClick={applyCode} className="btn-secondary border-bone/30 text-bone hover:border-bone">
                {terms.discountApply}
              </button>
            </div>
            {codeError && <p className="mt-2 text-sm text-terracotta">{terms.discountInvalid}</p>}
            {discount && (
              <p className="mt-2 text-sm text-gold-600">
                {fill(terms.discountApplied, { code: discount.code, percent: Math.round(discount.percent * 100) })}
              </p>
            )}
            {!discount && <EarlyBirdNote className="mt-3" />}
          </div>

          {!buyable ? (
            <div className="rounded-sm border border-bone/20 px-5 py-6 text-center">
              <p className="font-heading text-xl text-bone">{terms.outsideEuTitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-bone/70">{terms.outsideEuText}</p>
              <Link href={`/contact?piece=${items[0].slug}`} className="btn-primary inline-block mt-6">
                {terms.sendRequest}
              </Link>
            </div>
          ) : (
          <>
          <label className="flex items-start gap-3 text-sm text-bone/70">
            <input
              type="checkbox"
              required
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1"
            />
            <span>
              {c.agree}{" "}
              <Link href="/legal/terms" className="underline hover:text-gold-400">{c.terms}</Link>,{" "}
              <Link href="/legal/returns" className="underline hover:text-gold-400">{c.returns}</Link>,{" "}
              {c.agreeTail}
            </span>
          </label>

          {state.status === "error" && (
            <p role="alert" className="text-sm text-terracotta">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={state.status === "submitting"}
            className="btn-primary w-full py-4"
          >
            {state.status === "submitting" ? c.placing : c.place}
          </button>
          </>
          )}
        </form>
      </Container>
    </section>
  );
}
