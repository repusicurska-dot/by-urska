import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import ProtectedEmail from "@/components/shared/ProtectedEmail";

export const metadata: Metadata = {
  title: "Cookie Policy — by Urška",
  alternates: { canonical: "/legal/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPageShell title="Cookie Policy" updated="2026-08-25">
      <section>
        <h2>1. What cookies we use</h2>
        <p>
          When you first visit, a banner lets you Accept All, Reject Non-Essential, or Manage
          Preferences by category. You can revisit your choice at any time via &ldquo;Cookie
          Preferences&rdquo; in the footer.
        </p>
        <ul>
          <li>
            <strong>Necessary</strong> — required for the site to function (e.g. remembering your
            cart and your cookie choice itself). Always on.
          </li>
          <li>
            <strong>Analytics</strong> — measures how long a painting&rsquo;s page is open and visible, so
            Urška can see which works people spend time with. Only the painting and the number of
            seconds are sent to our own server; nothing that identifies you is stored, and no third
            party is involved. Runs only if you accept this category.
          </li>
          <li>
            <strong>Marketing</strong> — would be used to personalize offers. Not currently in use.
          </li>
          <li>
            <strong>Preferences</strong> — would remember display choices. Not currently in use.
          </li>
        </ul>
      </section>
      <section>
        <h2>2. Current status</h2>
        <p>
          Besides the necessary cookies described above, the only optional measurement on this
          site is the analytics described in section 1: time spent on each painting&rsquo;s page,
          counted on our own server and only for visitors who have accepted analytics. No
          marketing scripts run. Any further technology will only activate for visitors who have
          consented to that category, and this page will be updated to name it.
        </p>
      </section>
      <section>
        <h2>3. Managing your choice</h2>
        <p>
          Your consent choice is stored in your browser&rsquo;s local storage. You can change it
          at any time via &ldquo;Cookie Preferences&rdquo; in the site footer, or by clearing your
          browser&rsquo;s site data.
        </p>
      </section>
      <section>
        <h2>4. Contact</h2>
        <p><ProtectedEmail /></p>
      </section>
    </LegalPageShell>
  );
}
