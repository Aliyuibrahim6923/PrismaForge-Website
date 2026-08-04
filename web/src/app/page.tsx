import { Hero } from "@/components/sections/Hero";
import { Spotlight } from "@/components/sections/Spotlight";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { WhyUs } from "@/components/sections/WhyUs";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Team } from "@/components/sections/Team";
import { Engagement } from "@/components/sections/Engagement";
import { Faq } from "@/components/sections/Faq";
import { News } from "@/components/sections/News";
import { Contact } from "@/components/sections/Contact";
import { faqJsonLd, jsonLdScript } from "@/lib/seo";

/**
 * Home — the full narrative, in the order a prospective client needs it:
 * who we are → what we do → who we do it for → proof → how → who → cost →
 * objections → currency → contact.
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd())}
      />

      <Hero />
      {/* Directly below the fold: the marketing slot gets the strongest
          position on the page. Edit lib/content/spotlight.ts to rotate it. */}
      <Spotlight />
      <About />
      <Services />
      <Industries />
      <WhyUs />
      <Portfolio />
      <Process />
      <Testimonials />
      <Team />
      <Engagement />
      <Faq />
      <News />
      <Contact />
    </>
  );
}
