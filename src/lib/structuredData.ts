import { Artwork } from "@/content/types";
import { business } from "@/content/business";
import { getSiteUrl } from "@/lib/siteUrl";

const SITE_URL = getSiteUrl();
const SAME_AS = ["https://www.instagram.com/art_by_urska/"];
const absolute = (src: string) => (src.startsWith("http") ? src : `${SITE_URL}${src.startsWith("/") ? "" : "/"}${src}`);

const AVAILABILITY_SCHEMA: Record<Artwork["availability"], string> = {
  available: "https://schema.org/InStock",
  reserved: "https://schema.org/LimitedAvailability",
  sold: "https://schema.org/SoldOut",
  inquire: "https://schema.org/PreOrder",
};

export function productJsonLd(artwork: Artwork) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: artwork.title,
    description: artwork.shortIntro,
    sku: artwork.sku,
    url: `${SITE_URL}/artworks/${artwork.slug}`,
    image: artwork.heroImage ? absolute(artwork.heroImage) : undefined,
    brand: { "@type": "Brand", name: business.tradingName },
    creator: { "@id": `${SITE_URL}/#urska` },
    offers: {
      "@type": "Offer",
      priceCurrency: artwork.currency,
      price: artwork.price,
      availability: AVAILABILITY_SCHEMA[artwork.availability],
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: business.tradingName,
    legalName: business.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-ur.webp`,
    address: business.registeredAddress,
    founder: { "@id": `${SITE_URL}/#urska` },
    sameAs: SAME_AS,
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#urska`,
    name: "Urška Repušič",
    alternateName: "Urška",
    url: SITE_URL,
    image: `${SITE_URL}/images/artist-hanging-heart.jpg`,
    jobTitle: "Painter",
    description:
      "Slovenian painter and poet from Rače, a former European bouldering champion who traded the rock for the canvas. She paints original storytelling works, writes a poem a week and offers tarot readings.",
    knowsAbout: ["Painting", "Poetry", "Bouldering", "Tarot", "Spirituality", "Finance"],
    nationality: "Slovenian",
    worksFor: { "@id": `${SITE_URL}/#organization` },
    sameAs: SAME_AS,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: business.tradingName,
    url: SITE_URL,
    inLanguage: ["en", "sl"],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
