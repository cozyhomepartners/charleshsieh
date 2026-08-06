import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Check } from "lucide-react";

const title = "Fractional Sales Leadership for Startups | Charles Hsieh";
const description =
  "Fractional VP of Sales and GTM leadership for seed to Series B startups: first sales hires, repeatable pipeline, pricing, and playbooks that scale from $0 to $25M+ ARR.";
const url = "https://charleshsieh.com/fractional-sales-leadership";

export const Route = createFileRoute("/fractional-sales-leadership")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Fractional Sales Leadership",
          serviceType: "Fractional VP of Sales / GTM advisory",
          areaServed: "United States",
          url,
          provider: {
            "@type": "Person",
            name: "Charles Hsieh",
            url: "https://charleshsieh.com",
          },
        }),
      },
    ],
  }),
  component: FractionalSalesLeadership,
});

const engagements = [
  {
    title: "First revenue, from zero",
    body: "Pre-revenue to first repeatable deals: ICP definition, outbound motion, discovery and demo scripts, and the first 10–20 reference logos.",
  },
  {
    title: "Founder-led sales handoff",
    body: "Turn what the founder does intuitively into a documented playbook, then hire and ramp the AEs and SDRs who can run it without you.",
  },
  {
    title: "Pricing and packaging",
    body: "Rebuild pricing, tiers, and contract structure so deal size and win rate move together instead of trading off.",
  },
  {
    title: "Stalled growth reset",
    body: "Diagnose pipeline, conversion, and team performance; rebuild forecasting, comp, and territory design to restart compounding growth.",
  },
];

const proof = [
  "Scaled products from $0 to $6M, $8M, and $25M+ ARR",
  "Built GTM orgs from first hire to 50+ across AE, SDR, SE, and ops",
  "Landed enterprise logos including Rivian, Amazon, Chewy, and Salesforce",
  "President's Club and Global Rep of the Year at LinkedIn",
  "Engineering background — fluent with product and technical buyers",
];

const process = [
  { step: "01", title: "Diagnostic", body: "Two weeks inside your funnel, calls, and data. You get a written assessment and a prioritized plan." },
  { step: "02", title: "Build", body: "We install the motion: ICP, messaging, pipeline process, pricing, and the metrics that govern them." },
  { step: "03", title: "Hire and ramp", body: "Scorecards, interview loops, onboarding, and coaching for the reps and leaders who take it over." },
  { step: "04", title: "Hand off", body: "Documented playbook and a full-time leader in seat. The goal is to make the role unnecessary." },
];

function FractionalSalesLeadership() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
          <Link to="/" className="font-display text-sm font-semibold tracking-tight">
            Charles Hsieh
          </Link>
          <nav className="flex items-center gap-5">
            <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Home
            </Link>
            <a
              href="https://calendly.com/charleschsieh/30-minutes"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-accent"
            >
              Book a call <ArrowUpRight className="size-3.5" />
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5">
        <section className="py-14 md:py-20">
          <p className="font-display text-xs uppercase tracking-[0.28em] text-accent">
            Fractional sales leadership
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            A revenue leader who has done it four times — without the full-time hire
            <span className="mt-4 block text-lg font-medium leading-snug tracking-normal text-muted-foreground md:text-xl">
              Fractional VP of Sales and GTM leadership for seed to Series B founders.
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Most startups hire a VP of Sales too early, too expensively, and against a motion nobody
            has proven yet. I come in part-time to prove the motion, build the playbook, hire the
            team that runs it — and then hand it over.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://calendly.com/charleschsieh/30-minutes"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Mail className="size-4" /> Book a 30-minute call
            </a>
            <a
              href="https://tryscalegtm.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Scale GTM <ArrowUpRight className="size-4" />
            </a>
          </div>
        </section>

        <section className="border-t border-border py-14">
          <h2 className="font-display text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Where I help
          </h2>
          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            {engagements.map((e) => (
              <div key={e.title}>
                <dt className="font-display text-base font-semibold">{e.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-t border-border py-14">
          <h2 className="font-display text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
            How an engagement runs
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <li key={p.step}>
                <span className="font-display text-xs uppercase tracking-[0.22em] text-accent">
                  {p.step}
                </span>
                <h3 className="mt-2 font-display text-base font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-border py-14">
          <h2 className="font-display text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Track record
          </h2>
          <ul className="mt-10 space-y-3">
            {proof.map((p) => (
              <li key={p} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
                <Check className="mt-1 size-4 shrink-0 text-accent" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            Full background on the{" "}
            <Link to="/" className="text-foreground underline underline-offset-4 hover:text-accent">
              about page
            </Link>
            .
          </p>
        </section>
      </main>

      <footer className="border-t border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            Let's see if it's a fit.
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Thirty minutes, no pitch. Bring your funnel numbers and the thing that's stuck.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <a
              href="https://calendly.com/charleschsieh/30-minutes"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Mail className="size-4" /> Book a call
            </a>
            <a
              href="mailto:charles.hsieh6@gmail.com"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Mail className="size-4" /> charles.hsieh6@gmail.com
            </a>
          </div>
          <p className="mt-12 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Charles Hsieh
          </p>
        </div>
      </footer>
    </div>
  );
}
