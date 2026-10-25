import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

const SITE_URL = getSiteUrl();

const PRIVATE = ["/cart", "/checkout", "/order-confirmation", "/api/", "/rezervacija/", "/odjava", "/zvezdni-koledar/moj", "/zvezdni-koledar/prijava"];

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      // AI search and assistant crawlers are welcome: being read by them is how
      // ChatGPT, Claude, Perplexity and Google's AI answers can name and cite Urška.
      { userAgent: AI_CRAWLERS, allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
