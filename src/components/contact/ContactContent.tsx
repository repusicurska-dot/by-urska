"use client";

import { Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import ContactForm from "@/components/contact/ContactForm";
import ProtectedEmail from "@/components/shared/ProtectedEmail";
import { fadeInUp } from "@/lib/motion";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function ContactContent() {
  const { t } = useLanguage();
  return (
    <section className="py-24 md:py-32">
      <Container className="reading-panel max-w-xl rounded-3xl px-6 py-10 md:px-10 md:py-12 lg:max-w-5xl lg:px-14">
        {/* On a wide screen: her words and a photo on the left, the form on the right. */}
        <div className="lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <motion.span
              className="text-xs tracking-widest uppercase text-gold-400 block"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              {t.contact.eyebrow}
            </motion.span>
            <motion.h1
              className="font-heading text-4xl md:text-5xl text-bone mt-4 mb-10"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              {t.contact.title}
            </motion.h1>
            <p className="-mt-4 mb-10 text-bone/80">
              {t.contact.intro} <ProtectedEmail />.
            </p>
            <div className="relative hidden aspect-[4/5] overflow-hidden rounded-2xl lg:block">
              <Image
                src="/images/about-castle-5.jpg"
                alt=""
                fill
                sizes="380px"
                className="object-cover object-[80%_50%]"
              />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
