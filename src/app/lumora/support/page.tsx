import type { Metadata } from "next";
import LumoraPage from "@/components/legal/LumoraPage";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Manifest by Urška — Support",
  description: "Help and contact for the Manifest by Urška app.",
  alternates: { canonical: "/lumora/support" },
};

export default function LumoraSupportPage() {
  return (
    <LumoraPage title="Support" updated="2026-10-04">
      <section>
        <h2>Contact</h2>
        <p>
          Questions, problems or ideas about Manifest by Urška? Write to <a href="mailto:support@remako.si" className="underline">support@remako.si</a> and Urška will
          answer within a few working days.
        </p>
        <p>
          {business.legalName}, {business.registeredAddress}, Slovenia.
        </p>
      </section>

      <section>
        <h2>Manifest Premium</h2>
        <ul>
          <li>Manifest Premium is an auto-renewing subscription: 7 days free, then €1.99 per month.</li>
          <li>
            Payment is taken by Apple through your Apple ID. To cancel, open Settings on your iPhone, tap your
            name, then Subscriptions → Manifest by Urška → Cancel Subscription. Cancel at least 24 hours before
            the end of the free week or the current month to avoid the next charge.
          </li>
          <li>Changed phones? Open the app and tap “Restore purchase” on the Manifest Premium screen.</li>
          <li>Refunds are handled by Apple: reportaproblem.apple.com.</li>
        </ul>
      </section>

      <section>
        <h2>Common questions</h2>
        <h3>Where is my journal saved?</h3>
        <p>
          Only on your phone. Manifest by Urška has no accounts and no server, so nobody else can read it — but it also
          means that deleting the app deletes your journal.
        </p>
        <h3>I don&apos;t get the reminders.</h3>
        <p>
          In the app, open Settings (the gold gear on the Today screen) and turn reminders on, then allow
          notifications for Manifest by Urška in your iPhone Settings → Notifications.
        </p>
        <h3>The affirmations aren&apos;t read aloud.</h3>
        <p>
          Your iPhone may not have a voice for your language. Add one in Settings → Accessibility → Spoken
          Content → Voices.
        </p>
      </section>

      <hr />

      <section>
        <h2>Podpora (slovensko)</h2>
        <p>
          Vprašanja, težave ali ideje glede aplikacije Manifest by Urška? Piši na <a href="mailto:support@remako.si" className="underline">support@remako.si</a> — Urška
          odgovori v nekaj delovnih dneh.
        </p>
        <ul>
          <li>Manifest Premium je samodejno obnovljiva naročnina: 7 dni zastonj, nato 1,99 € na mesec.</li>
          <li>
            Plačilo poteka prek Appla in tvojega Apple ID-ja. Preklic: Nastavitve na iPhonu → tvoje ime →
            Naročnine → Manifest by Urška → Prekliči naročnino. Prekliči vsaj 24 ur pred koncem brezplačnega
            tedna ali tekočega meseca.
          </li>
          <li>Nov telefon? V aplikaciji na zaslonu Manifest Premium pritisni »Obnovi nakup«.</li>
          <li>Vračila denarja ureja Apple: reportaproblem.apple.com.</li>
          <li>
            Tvoj dnevnik je shranjen samo na tvojem telefonu. Če aplikacijo izbrišeš, se izbriše tudi
            dnevnik.
          </li>
        </ul>
      </section>
    </LumoraPage>
  );
}
