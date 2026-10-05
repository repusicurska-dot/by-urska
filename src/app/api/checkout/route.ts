import { NextRequest, NextResponse } from "next/server";
import { getArtworkBySlug } from "@/lib/content";
import { createCheckoutSession } from "@/lib/payments";
import { ShippingZone } from "@/content/types";
import { discountedPrice, findDiscount } from "@/lib/discounts";

const VALID_ZONES: ShippingZone[] = ["SI", "EU", "EUROPE_NON_EU", "INTERNATIONAL"];

interface CheckoutPayload {
  slugs?: unknown;
  shippingZone?: unknown;
  contact?: { name?: unknown; email?: unknown };
  agreedToTerms?: unknown;
  discountCode?: unknown;
}

export async function POST(request: NextRequest) {
  let body: CheckoutPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const slugs = Array.isArray(body.slugs) ? body.slugs.filter((s): s is string => typeof s === "string") : [];
  if (slugs.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  if (typeof body.shippingZone !== "string" || !VALID_ZONES.includes(body.shippingZone as ShippingZone)) {
    return NextResponse.json({ error: "Please select a valid shipping destination." }, { status: 400 });
  }

  const contactName = typeof body.contact?.name === "string" ? body.contact.name.trim() : "";
  const contactEmail = typeof body.contact?.email === "string" ? body.contact.email.trim() : "";
  if (!contactName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    return NextResponse.json({ error: "Please provide a valid name and email." }, { status: 400 });
  }

  if (body.agreedToTerms !== true) {
    return NextResponse.json(
      { error: "You must accept the Terms and confirm you understand your right of withdrawal." },
      { status: 400 }
    );
  }

  const discount = typeof body.discountCode === "string" ? findDiscount(body.discountCode) : null;
  if (typeof body.discountCode === "string" && body.discountCode.trim() !== "" && !discount) {
    return NextResponse.json({ error: "This discount code isn't valid." }, { status: 400 });
  }

  // Server-side source of truth — the client-submitted price is never trusted.
  const items = [];
  for (const slug of slugs) {
    const artwork = getArtworkBySlug(slug);
    if (!artwork) {
      return NextResponse.json({ error: `Artwork "${slug}" was not found.` }, { status: 404 });
    }
    if (artwork.availability !== "available" && artwork.availability !== "reserved") {
      return NextResponse.json(
        { error: `"${artwork.title}" is no longer available for purchase.` },
        { status: 409 }
      );
    }
    if (!artwork.shipsTo.includes(body.shippingZone as ShippingZone)) {
      // Outside the EU a painting is bought by request (Urška, 2026-10-05) — the checkout page
      // sends those buyers to the contact form before they ever get here.
      return NextResponse.json(
        { error: `"${artwork.title}" is bought by request outside the EU — please send Urška a request.` },
        { status: 409 }
      );
    }
    items.push(artwork);
  }

  try {
    const session = await createCheckoutSession(items, { name: contactName, email: contactEmail }, discount);
    return NextResponse.json({ url: session?.url });
  } catch {
    // Payments are intentionally not wired up yet (see src/lib/payments.ts).
    return NextResponse.json(
      {
        checkoutLive: false,
        message:
          "Online checkout isn't live yet. We've recorded your order details — please use the inquiry form and we'll follow up personally to arrange payment.",
        subtotal: items.reduce((sum, i) => sum + discountedPrice(i.price, discount), 0),
        currency: "EUR",
      },
      { status: 200 }
    );
  }
}
