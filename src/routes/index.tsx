import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowUpRight,
  Mail,
  Linkedin,
  Github,
  Youtube,
  Menu,
  X,
  Plane,
  Hammer,
  Home as HomeIcon,
} from "lucide-react";
import familyPhotoAsset from "@/assets/family-portrait.jpg.asset.json";
import travelCoast from "@/assets/travel-coast.jpg";
import travelJapan from "@/assets/travel-japan.jpg";
import travelSouthwest from "@/assets/travel-southwest.jpg";

const familyPhoto = familyPhotoAsset.url;

const title = "Charles Hsieh, travel writing, essays, and passion projects";
const description =
  "The personal home of Charles Hsieh: family, travel notes from the road, essays on building and living, and the side projects I care about.";

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
          description:
            "Dad, traveler, writer, and builder based in the San Francisco Bay Area.",
          email: "hello@charleshsieh.com",
          url: "https://charleshsieh.com",
          sameAs: [
            "https://www.linkedin.com/in/chsieh",
            "https://github.com/cozyhomepartners",
            "https://www.youtube.com/@hsiehnanigans",
            "https://nextrootventures.com",
          ],
        }),
      },
    ],
  }),
  component: Home,
});

const navLinks: {
  label: string;
  href: string;
  external?: boolean;
  internal?: boolean;
}[] = [
  { label: "About", href: "#about" },
  { label: "Travel", href: "/travel", internal: true },
  { label: "Blog", href: "/blog", internal: true },
  { label: "Building", href: "#building" },
  { label: "NextRoot Ventures", href: "https://nextrootventures.com", external: true },
];

const travelPosts = [
  {
    place: "Portugal",
    title: "Slow mornings on the Atlantic coast",
    blurb:
      "Three weeks of cliff roads, pastel de nata, and letting the kids set the pace. What changed about how we travel as a family.",
    image: travelCoast,
    tag: "Family trip",
    tagClass: "bg-primary/12 text-primary",
  },
  {
    place: "Japan",
    title: "Lantern light in the back streets",
    blurb:
      "Notes on eating standing up, riding trains with a toddler, and the quiet joy of getting lost on purpose.",
    image: travelJapan,
    tag: "Food & wandering",
    tagClass: "bg-marigold/25 text-foreground",
  },
  {
    place: "American Southwest",
    title: "Red rock, dirt roads, no signal",
    blurb:
      "A road trip through canyon country, and why a week without connectivity was the most useful thing I did all year.",
    image: travelSouthwest,
    tag: "Road trip",
    tagClass: "bg-teal/15 text-teal",
  },
];

const passionWork = [
  {
    name: "NextRoot Ventures",
    href: "https://nextrootventures.com",
    icon: Plane,
    accent: "text-primary",
    blurb:
      "My professional home. Advising founder-led teams on go-to-market, revenue, and the messy middle between product and sales.",
  },
  {
    name: "Cozy Home Partners",
    href: "https://www.cozyhomepartners.com/",
    icon: HomeIcon,
    accent: "text-teal",
    blurb:
      "Buying and thoughtfully renovating homes. Part design obsession, part spreadsheet, entirely a weekend habit that got out of hand.",
  },
  {
    name: "Roofolio",
    href: "https://roofolio.ai",
    icon: Hammer,
    accent: "text-marigold-foreground",
    blurb:
      "An operating system for rental investors, bringing property search, deal analysis, and portfolio operations into one workflow.",
  },
];

function SectionHeading({
  id,
  eyebrow,
  title: heading,
}: {
  id: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div id={id} className="scroll-mt-24 sm:scroll-mt-28">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {heading}
      </h2>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: writingPosts } = useQuery({
    queryKey: ["posts", "published", "writing", "home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, cover_image_url, tags")
        .eq("published", true)
        .eq("category", "writing")
        .order("published_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="#top" className="font-display text-lg font-semibold tracking-tight">
            Charles Hsieh
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) =>
              link.internal ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ) : (
              <div key={link.label} className="flex items-center gap-6">
                {link.external ? (
                  <span aria-hidden className="h-5 w-px bg-border" />
                ) : null}
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                  {link.external ? <ArrowUpRight className="h-3.5 w-3.5" /> : null}
                </a>
              </div>
              ),
            )}
          </nav>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {menuOpen ? (
          <nav className="border-t border-border/70 bg-background px-5 py-3 md:hidden">
            {navLinks.map((link) =>
              link.internal ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-sm font-medium text-muted-foreground"
                >
                  {link.label}
                </Link>
              ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                {...(link.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className={`block py-2 text-sm font-medium text-muted-foreground${link.external ? " mt-1 border-t border-border pt-3" : ""}`}
              >
                {link.label}
              </a>
              ),
            )}
          </nav>
        ) : null}
      </header>

      <main id="top" className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Hero */}
        <section className="grid items-center gap-10 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Hello, I'm Charles
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
              Dad, husband, traveler, and a builder who can't sit still.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              This is my personal corner of the internet. I write about the places
              we drag our kids to, the things I'm thinking through, and the
              projects I build on nights and weekends. If you're here for work, my
              professional home lives at NextRoot Ventures.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/travel"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Travel notes
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                Blog
              </Link>
              <a
                href="https://nextrootventures.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                NextRoot Ventures <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 -rotate-2 rounded-3xl bg-marigold/25" aria-hidden />
            <img
              src={familyPhoto}
              alt="Charles Hsieh with his family"
              className="relative w-full rounded-3xl object-cover shadow-lg"
            />
          </div>
        </section>

        {/* Travel */}
        <section className="border-t border-border pt-12 pb-14">
          <SectionHeading id="travel" eyebrow="Travel" title="Notes from the road" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {travelPosts.map((post) => (
              <article
                key={post.title}
                className="group overflow-hidden rounded-3xl border border-border bg-card transition-transform duration-200 hover:-translate-y-1"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="h-48 w-full object-cover"
                />
                <div className="space-y-3 p-6">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${post.tagClass}`}
                  >
                    {post.tag}
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {post.place}
                  </p>
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {post.blurb}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <Link
            to="/travel"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Read the travel journals
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Writing */}
        <section className="border-t border-border pt-12 pb-14">
          <SectionHeading id="writing" eyebrow="Blog" title="Essays and half-formed thoughts" />
          {writingPosts && writingPosts.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {writingPosts.map((post) => (
                <Link
                  key={post.id}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-transform duration-200 hover:-translate-y-1"
                >
                  {post.cover_image_url ? (
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      loading="lazy"
                      className="h-44 w-full object-cover"
                    />
                  ) : null}
                  <div className="space-y-3 p-6">
                    {post.tags && post.tags.length ? (
                      <span className="inline-block rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">
                        {post.tags[0]}
                      </span>
                    ) : null}
                    <h3 className="font-display text-xl font-semibold tracking-tight group-hover:text-primary">
                      {post.title}
                    </h3>
                    {post.excerpt ? (
                      <p className="text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-muted-foreground">Nothing published yet.</p>
          )}
          <Link
            to="/blog"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Read the blog
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Passion work */}
        <section className="border-t border-border pt-12 pb-14">
          <SectionHeading id="building" eyebrow="Passion work" title="Things I'm building" />
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Three projects I care about, each one started because I wanted it to
            exist.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {passionWork.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col gap-3 rounded-3xl border border-border bg-card p-7 transition-all duration-200 hover:-translate-y-1 hover:border-primary"
                >
                  <Icon className={`h-6 w-6 ${item.accent}`} />
                  <h3 className="flex items-center gap-1.5 font-display text-xl font-semibold tracking-tight">
                    {item.name}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.blurb}
                  </p>
                  <span className="mt-auto pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {item.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        {/* About */}
        <section className="border-t border-border pt-12 pb-14">
          <SectionHeading id="about" eyebrow="About" title="A little more about me" />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              I grew up an engineer, started my career writing C++ for embedded
              systems, and somehow ended up spending most of it in front of
              customers. I've built and led go-to-market teams at Google,
              LinkedIn, HackerRank, and Blind, and now I just vibecode for fun.
            </p>
            <p>
              These days I live in the San Francisco Bay Area with my wife and
              our two kids. We travel whenever school lets us, I renovate houses
              when I should be resting, and I write to figure out what I
              actually think. I took a sabbatical year that reset how I approach
              basically everything, and a lot of what's on this site came out of
              it.
            </p>
            <p>
              If you want the resume version of me, that lives at{" "}
              <a
                href="https://nextrootventures.com"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                NextRoot Ventures
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="scroll-mt-24 border-t border-border bg-secondary/50 sm:scroll-mt-28"
      >
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Say hello
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            I like hearing from people, whether it's about a trip you're
            planning, something I wrote, or a project you're stuck on.
          </p>
          <div className="mt-6 flex flex-wrap gap-5">
            <a
              className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary"
              href="mailto:hello@charleshsieh.com"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
            <a
              className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary"
              href="https://www.linkedin.com/in/chsieh"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary"
              href="https://www.youtube.com/@hsiehnanigans"
              target="_blank"
              rel="noreferrer"
            >
              <Youtube className="h-4 w-4" /> YouTube
            </a>
            <a
              className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary"
              href="https://github.com/cozyhomepartners"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
          <p className="mt-10 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Charles Hsieh
          </p>
        </div>
      </footer>
    </div>
  );
}
