import type { Metadata } from "next";
import LumoraPage from "@/components/legal/LumoraPage";
import ProtectedEmail from "@/components/shared/ProtectedEmail";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Lumora Manifest — Privacy Policy",
  description: "How the Lumora Manifest app handles your data.",
  alternates: { canonical: "/lumora/privacy" },
};

/**
 * The privacy policy of the Lumora Manifest iPhone app, as built on 2026-10-04: everything the
 * person writes stays on the phone, purchases go through Apple, nothing is tracked. If the app
 * ever adds an ad or any server, this page has to change with it.
 */
export default function LumoraPrivacyPage() {
  return (
    <LumoraPage title="Privacy Policy" updated="2026-10-04">
      <section>
        <h2>1. Who is responsible</h2>
        <p>
          The Lumora Manifest app is published by {business.legalName}, {business.registeredAddress},
          Slovenia (EU), registration number {business.registrationNumber}. Contact: <ProtectedEmail />.
        </p>
      </section>

      <section>
        <h2>2. The short version</h2>
        <p>
          Lumora has no accounts, no server of its own, no analytics and no advertising trackers. What you
          write in the app stays on your iPhone. We cannot see it.
        </p>
      </section>

      <section>
        <h2>3. What the app stores, and where</h2>
        <ul>
          <li>
            <strong>On your phone only:</strong> the name you enter, your chosen focus, your reminder times,
            your journal (signs and gratitude), your wishes, the affirmations you keep and how long you have
            listened. This data never leaves your device and is deleted when you delete the app.
          </li>
          <li>
            <strong>Photos:</strong> if you add a photo to your manifestation wall, only that photo is
            copied into the app&apos;s own storage on your phone. The app does not read the rest of your
            library.
          </li>
          <li>
            <strong>Reminders:</strong> created by your phone itself (local notifications). No push service
            is used.
          </li>
          <li>
            <strong>Reading aloud:</strong> done by your iPhone&apos;s built-in voices, on the device.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Lumora Premium and payments</h2>
        <p>
          Lumora Premium is an auto-renewing subscription: 7 days free, then €1.99 per month. It is sold and
          billed by Apple through your Apple ID. Apple handles your payment details under Apple&apos;s own
          privacy policy; we receive no card details and no personal information from Apple, only
          confirmation that the subscription is active. You can cancel at any time in your Apple ID settings
          (Settings → your name → Subscriptions), at least 24 hours before the next renewal.
        </p>
      </section>

      <section>
        <h2>5. Children</h2>
        <p>Lumora is not directed at children under 13 and does not knowingly collect their data.</p>
      </section>

      <section>
        <h2>6. Your rights</h2>
        <p>
          Because your data stays on your phone, you control it fully: you can change or delete it in the app,
          or delete the app to remove all of it. For any question about privacy, or to exercise your rights
          under the GDPR, write to <ProtectedEmail />. You may also complain to the Slovenian Information
          Commissioner (Informacijski pooblaščenec, www.ip-rs.si).
        </p>
      </section>

      <section>
        <h2>7. Changes</h2>
        <p>If the app ever starts handling data differently, this page will be updated before that happens.</p>
      </section>

      <hr />

      <section>
        <h2>Politika zasebnosti (slovensko)</h2>
        <p>
          Aplikacijo Lumora Manifest izdaja {business.legalName}, {business.registeredAddress}. Kontakt:{" "}
          <ProtectedEmail />.
        </p>
        <ul>
          <li>
            Lumora nima uporabniških računov, lastnega strežnika, analitike ali sledilnikov za oglase.
          </li>
          <li>
            Ime, področje, ure opomnikov, dnevnik, želje, shranjene afirmacije in čas poslušanja so shranjeni
            <strong> samo na tvojem telefonu</strong> in se izbrišejo, ko izbrišeš aplikacijo.
          </li>
          <li>
            Če na steno dodaš fotografijo, se v aplikacijo kopira samo ta fotografija. Ostale galerije
            aplikacija ne bere.
          </li>
          <li>Opomnike ustvari tvoj telefon sam; branje na glas opravljajo vgrajeni glasovi iPhona.</li>
          <li>
            Lumora Premium: 7 dni zastonj, nato 1,99 € na mesec. Naročnino prodaja in zaračunava Apple prek
            tvojega Apple ID-ja; mi ne prejmemo podatkov o kartici ali osebnih podatkov. Prekličeš jo
            kadarkoli v nastavitvah Apple ID-ja (Nastavitve → tvoje ime → Naročnine), vsaj 24 ur pred
            naslednjo obnovitvijo.
          </li>
          <li>
            Za vprašanja ali uveljavljanje pravic po GDPR piši na zgornji naslov. Pritožbo lahko vložiš tudi
            pri Informacijskem pooblaščencu (www.ip-rs.si).
          </li>
        </ul>
      </section>
    </LumoraPage>
  );
}
