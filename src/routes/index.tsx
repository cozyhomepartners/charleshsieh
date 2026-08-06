import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Mail, Linkedin, Github, Menu, X, Plane } from "lucide-react";
import familyPhotoAsset from "@/assets/family-portrait.jpg.asset.json";
const familyPhoto = familyPhotoAsset.url;

const title = "Charles Hsieh, Revenue Leader, GTM Operator & Advisor";
const description =
  "Charles Hsieh is a San Francisco revenue leader and GTM operator who scaled products from $0 to double digit millions in ARR at Google, LinkedIn, and Blind, and advises founders.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://charleshsieh.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://charleshsieh.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Charles Hsieh",
          jobTitle: "Revenue Leader, GTM Operator & Advisor",
          email: "charles.hsieh6@gmail.com",
          url: "https://charleshsieh.com",
          sameAs: [
            "https://www.linkedin.com/in/chsieh",
            "https://github.com/cozyhomepartners",
          ],
          alumniOf: "University of Illinois at Urbana-Champaign",
        }),
      },
    ],
  }),
  component: Home,
});

const ventureLinks = [
  { label: "Scale GTM", href: "https://tryscalegtm.com" },
  { label: "Cozy Home", href: "https://www.cozyhomepartners.com/" },
  { label: "Roofolio", href: "https://roofolio.ai" },
];

const sectionLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Ventures", href: "#ventures" },
  { label: "Advisory", href: "/fractional-sales-leadership" },
  { label: "Contact", href: "https://calendly.com/charleschsieh/30-minutes" },
];

const capabilities = [
  {
    title: "Revenue leadership",
    body: "Founding sales hire turned VP. Scaled products from $0 to $6M, $8M, and double digit millions in ARR; President's Club and Global Rep of the Year at LinkedIn.",
  },
  {
    title: "Product",
    body: "Partnered with, and reported to, product leaders to shape pricing, packaging, and roadmap from concept through public launch.",
  },
  {
    title: "Team building",
    body: "Built GTM orgs from first hire to 50+ across AEs, SDRs, solutions engineering, and sales ops, in the US and internationally.",
  },
  {
    title: "Engineering background",
    body: "B.S. in Electrical and Computer Engineering. Started in C++ embedded systems; still building software today.",
  },
];

type Position = {
  title?: string;
  period: string;
  bullets: React.ReactNode[];
};

type Company = {
  company: string;
  logo?: string;
  icon?: boolean;
  roles: Position[];
};

const experience: Company[] = [
  {
    company: "Blind, anonymous professional network (15M+ users)",
    logo: "/img/icons/icon_blind.png",
    roles: [
      {
        title: "Advisor to CEO",
        period: "Jun 2026 – Present",
        bullets: [
          "Advising the CEO on go-to-market strategy, product direction, and US market expansion.",
        ],
      },
      {
        title: "Vice President of Sales and Product, North America",
        period: "Feb 2023 – May 2026",
        bullets: [
          "Designed, built, and sold new SaaS and Ads products for the US market — scaled $0 to $6M ARR in two years, landing 50 large logos including Rivian, Amazon, Chewy, and Salesforce.",
          "Led a 15-person GTM team plus four dotted-line software engineers.",
        ],
      },
    ],
  },
  {
    company: "Switchboard Software",
    logo: "/img/icons/icon_switchboard.png",
    roles: [
      {
        title: "Vice President of Sales",
        period: "Sep 2022 – Jan 2023",
        bullets: [
          "Closed $4M total ARR in 2022 ($1M in Q4), leading a 10-person GTM team of AEs, SDR, solutions engineering, and sales ops.",
        ],
      },
    ],
  },
  {
    company: "Sabbatical",
    icon: true,
    roles: [
      {
        period: "Oct 2021 – Aug 2022",
        bullets: [
          <>
            Twelve months of family travel before the kids turned school age, documented at{" "}
            <a
              href="https://www.youtube.com/@hsiehnanigans"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-0.5 text-accent hover:underline"
            >
              Hsiehnanigans
              <ArrowUpRight className="size-3.5" />
            </a>
            .
          </>,
        ],
      },
    ],
  },
  {
    company: "Google",
    logo: "/img/icons/icon_google.png",
    roles: [
      {
        title: "Head of Sales, Google Workspace Essentials",
        period: "Sep 2019 – Sep 2021",
        bullets: [
          "Grew an incubation SaaS product from $0 to $8M ARR in two years and closed 50+ enterprise logos before it was absorbed by Google Cloud Sales (8,000+ reps and partners).",
          "Led an 8-person sales team (AEs, SDRs, ops), reporting to the VP of Product.",
        ],
      },
      {
        title: "Head of Sales, Hire by Google",
        period: "Sep 2016 – Aug 2019",
        bullets: [
          "Took a new product from $0 to $25M ARR and 3,000+ customers across idea, beta, and public launch in three years.",
          "Led a 50-person global team; promoted twice in three years from first sales rep to global head of sales.",
        ],
      },
    ],
  },
  {
    company: "HackerRank",
    logo: "/img/icons/icon_hackerrank.png",
    roles: [
      {
        title: "Director, Solutions Engineering",
        period: "Jan 2014 – Jul 2016",
        bullets: [
          "Generated and supported $5.8M (2014), $10M (2015), and $7M (2016 H1) in sales, leading 14 solutions engineers across the US and India.",
        ],
      },
    ],
  },
  {
    company: "LinkedIn",
    logo: "/img/icons/icon_linkedin.png",
    roles: [
      {
        title: "Senior Enterprise Account Manager",
        period: "Feb 2010 – Jun 2013",
        bullets: [
          "President's Club 2010, 2011, 2012 — 179%, 140%, and 159% of quota.",
          "Global Sales Rep of the Year 2010 and 2011. First global Account Manager hire; promoted three times in three years.",
        ],
      },
    ],
  },
  {
    company: "Agilent Technologies",
    logo: "/img/icons/icon_agilent.png",
    roles: [
      {
        title: "Strategic Account Executive",
        period: "Jul 2007 – Nov 2009",
        bullets: ["135% of quota in 2008 (President's Club) and 115% of quota in 2009."],
      },
    ],
  },
  {
    company: "United Technologies",
    logo: "/img/icons/icon_united_technologies.png",
    roles: [
      {
        title: "Software Engineer",
        period: "Jul 2006 – Jun 2007",
        bullets: [
          "Built a C++ simulation of all Boeing 787 system errors, cutting testing costs by $2M annually.",
        ],
      },
    ],
  },
];

const ventures = [
  {
    name: "Scale GTM",
    period: "2022 – Present",
    body: "Fractional go-to-market leadership: V1 playbooks, pricing, and first sales hires for founder-led teams.",
    href: "https://tryscalegtm.com",
    image: null as string | null,
  },
  {
    name: "Cozy Home",
    period: "2024 – Present",
    body: "Real estate investment partnership focused on acquiring and operating single-family rentals.",
    href: "https://www.cozyhomepartners.com/",
    image: null,
  },
  {
    name: "Roofolio",
    period: "2026 – Present",
    body: "All-in-one tool for real estate investors to identify properties, track P&L, and generate investment recommendations.",
    href: "https://roofolio.ai",
    image: null,
  },
  {
    name: "VacayBug",
    period: "2015 – 2016",
    body: "Pre-AI social travel site reaching 2K+ monthly visitors; featured on Product Hunt and travel blogs.",
    href: "http://www.vacaybug.com",
    image: null,
    press: [
      { label: "Product Hunt", href: "https://www.producthunt.com/products/vacaybug?launch=vacaybug" },
      { label: "Explore Inspired", href: "https://exploreinspired.com/exploration-made-easy/" },
      {
        label: "WWWhat's New",
        href: "https://wwwhatsnew.com/2015/06/18/vacaybug-una-nueva-plataforma-para-registrar-nuestros-viajes/",
      },
    ] as { label: string; href: string }[] | undefined,
  },
];

const advisory = [
  {
    name: "Pathrise",
    logo: "/img/icons/icon_pathrise.png",
    period: "2021 – Present",
    body: "YC18. Mentorship and training program helping tech professionals land their next role.",
  },
  {
    name: "Welcome",
    logo: "/img/icons/icon_welcome.png",
    period: "2019 – 2021",
    body: "Backed by Kleiner Perkins. Virtual experience platform for large-scale events.",
  },
  {
    name: "Byteboard",
    logo: "/img/icons/icon_byteboard.png",
    period: "2019 – 2021",
    body: "Backed by Google; acquired by Karat. More effective and equitable technical interviews.",
  },
  {
    name: "Agave",
    logo: "/img/icons/icon_agave.png",
    period: "2019 – 2020",
    body: "Backed by SV Angel and Box Group. Open hiring platform for sourcing and closing talent.",
  },
  {
    name: "Coding Dojo",
    logo: "/img/icons/icon_codingdojo.png",
    period: "2017 – 2020",
    body: "Acquired by Perdoceo. One of the highest-rated coding bootcamps, in person and online.",
  },
  {
    name: "GrowingIO",
    logo: "/img/icons/icon_growingio.png",
    period: "2015 – 2018",
    body: "Acquired by StartDT. End-to-end web and mobile analytics with predictive business intelligence.",
  },
];

const education = [
  {
    school: "University of Illinois at Urbana-Champaign",
    logo: "/img/icons/icon_illinois.png",
    detail: "B.S. Electrical and Computer Engineering, Minor in Computer Science",
    period: "Class of 2006",
  },
  {
    school: "Tsinghua University",
    logo: "/img/icons/icon_tsinghua.png",
    detail: "Chinese language and culture program",
    period: "Summer 2006",
  },
];

function SectionHeading({ label, id }: { label: string; id: string }) {
  return (
    <div className="mb-10 flex items-baseline gap-4 border-b border-border pb-4" id={id}>
      <h2 className="font-display text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </h2>
      <span className="h-px flex-1" />
    </div>
  );
}

function Home() {
  const [open, setOpen] = useState(false);
  const sortedVentures = [...ventures].sort((a, b) => {
    const yearA = parseInt(a.period.split("–")[0]?.trim() ?? "0");
    const yearB = parseInt(b.period.split("–")[0]?.trim() ?? "0");
    return yearB - yearA;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
          <a href="#top" className="font-display text-sm font-semibold tracking-tight whitespace-nowrap">
            Charles Hsieh
          </a>
          <nav className="hidden items-center gap-5 whitespace-nowrap md:flex">
            {sectionLinks.map((l) => {
              const isExternal = l.href.startsWith("http");
              return (
                <a
                  key={l.label}
                  href={l.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              );
            })}
            <span className="h-4 w-px bg-border" />
            {ventureLinks.map((l) =>
              l.href ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-0.5 text-sm text-foreground transition-colors hover:text-accent"
                >
                  {l.label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              ) : (
                <span
                  key={l.label}
                  className="cursor-default text-sm text-muted-foreground/60"
                  title="Coming soon"
                >
                  {l.label}
                </span>
              ),
            )}
          </nav>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-border bg-background md:hidden">
            <nav className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-4">
              {sectionLinks.map((l) => {
                const isExternal = l.href.startsWith("http");
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted-foreground"
                  >
                    {l.label}
                  </a>
                );
              })}
              <span className="h-px bg-border" />
              {ventureLinks.map((l) =>
                l.href ? (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-0.5 text-sm"
                  >
                    {l.label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ) : (
                  <span key={l.label} className="text-sm text-muted-foreground/60">
                    {l.label} · soon
                  </span>
                ),
              )}
            </nav>
          </div>
        )}
      </header>

      <main id="top" className="mx-auto max-w-6xl px-5">
        <section className="grid items-center gap-10 py-10 md:grid-cols-[1.15fr_0.85fr] md:py-14">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.28em] text-accent">
              San Francisco, CA
            </p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Charles Hsieh
              <span className="mt-3 block text-xl font-medium leading-snug tracking-normal text-muted-foreground md:text-2xl">
                Revenue Leader, GTM Operator &amp; Advisor
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Founding IC and revenue leader who has developed and scaled products from{" "}
              <span className="text-foreground">$0 to $25M+ ARR</span> across Google, LinkedIn,
              Blind, and venture-backed startups — building teams from first hire to 50+ and
              establishing the V1 GTM playbooks along the way.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://calendly.com/charleschsieh/30-minutes"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Mail className="size-4" /> Get in touch
              </a>
              <a
                href="https://www.linkedin.com/in/chsieh"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
              >
                <Linkedin className="size-4" /> LinkedIn
              </a>
            </div>
          </div>
          <figure className="m-0">
            <img
              src={familyPhoto}
              alt="Charles Hsieh with his wife and two children"
              className="aspect-[4/5] w-full rounded-lg border border-border object-cover object-center"
            />
            <figcaption className="mt-3 font-display text-xs uppercase tracking-wider text-muted-foreground">
              Husband, father of two, San Francisco
            </figcaption>
          </figure>
        </section>

        <section className="pb-14 pt-2">
          <SectionHeading id="about" label="About" />
          <p className="text-base leading-relaxed text-muted-foreground">
            I moved from Taiwan when I was twelve, chasing the American dream. I studied
            engineering at Illinois, spent two decades building revenue teams at companies from
            seed-stage to Google-scale, and I'm a proud husband and father of two.
          </p>
          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            {capabilities.map((c) => (
              <div key={c.title}>
                <dt className="font-display text-base font-semibold">{c.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="py-14">
          <SectionHeading id="experience" label="Experience" />
          <div className="space-y-12">
            {experience.map((c, i) => (
              <article key={`${c.company}-${i}`} className="flex gap-5">
                <div className="hidden w-12 shrink-0 sm:block">
                  {c.logo ? (
                    <img
                      src={c.logo}
                      alt={c.company}
                      className="size-12 rounded-md object-contain"
                      loading="lazy"
                    />
                  ) : c.icon ? (
                    <div className="flex size-12 items-center justify-center rounded-md border border-border bg-secondary">
                      <Plane className="size-5 text-muted-foreground" />
                    </div>
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-semibold leading-snug text-accent">
                    {c.company}
                  </h3>
                  <div className="mt-3 space-y-6">
                    {c.roles.map((r, ri) => (
                      <div key={`${r.title ?? "role"}-${ri}`}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          {r.title && (
                            <h4 className="font-display text-base font-semibold">{r.title}</h4>
                          )}
                          <span className="font-display text-xs uppercase tracking-wider text-muted-foreground">
                            {r.period}
                          </span>
                        </div>
                        <ul className="mt-2 space-y-2">
                          {r.bullets.map((b, bi) => (
                            <li
                              key={bi}
                              className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-border"
                            >
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-14">
          <SectionHeading id="ventures" label="Ventures & Projects" />
          <div className="space-y-10">
            {sortedVentures.map((v) => (
              <article key={v.name} className="group">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-semibold">
                    {v.href ? (
                      <a
                        href={v.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 transition-colors hover:text-accent"
                      >
                        {v.name}
                        <ArrowUpRight className="size-4" />
                      </a>
                    ) : (
                      <span className="inline-flex items-baseline gap-2">
                        {v.name}
                      </span>
                    )}
                  </h3>
                  <span className="font-display text-xs uppercase tracking-wider text-muted-foreground">
                    {v.period}
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {v.body}
                </p>
                {v.image && (
                  <img
                    src={v.image}
                    alt={`${v.name} screenshot`}
                    loading="lazy"
                    className="mt-4 w-full max-w-md rounded-md border border-border object-cover"
                  />
                )}
                {"press" in v && v.press && (
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {v.press.map((p) => (
                      <a
                        key={p.href}
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
                      >
                        {p.label}
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="py-14">
          <SectionHeading id="advisory" label="Advisory & Investing" />
          <div className="grid gap-8 sm:grid-cols-2">
            {advisory.map((a) => (
              <div key={a.name} className="flex gap-4">
                <img
                  src={a.logo}
                  alt={a.name}
                  loading="lazy"
                  className="size-10 shrink-0 rounded-md object-contain"
                />
                <div>
                  <h3 className="font-display text-base font-semibold">{a.name}</h3>
                  <p className="font-display text-xs uppercase tracking-wider text-muted-foreground">
                    {a.period}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-14">
          <SectionHeading id="education" label="Education" />
          <div className="space-y-8">
            {education.map((e) => (
              <div key={e.school} className="flex gap-5">
                <img
                  src={e.logo}
                  alt={e.school}
                  loading="lazy"
                  className="size-12 shrink-0 rounded-md object-contain"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-display text-base font-semibold">{e.school}</h3>
                    <span className="font-display text-xs uppercase tracking-wider text-muted-foreground">
                      {e.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{e.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Let's talk.</h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Building a go-to-market motion from scratch, or scaling one that's stalled? I'm always
            up for a conversation.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <a
              href="mailto:charles.hsieh6@gmail.com"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Mail className="size-4" /> charles.hsieh6@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/chsieh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Linkedin className="size-4" /> linkedin.com/in/chsieh
            </a>
            <a
              href="https://github.com/cozyhomepartners"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Github className="size-4" /> github.com/cozyhomepartners
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
