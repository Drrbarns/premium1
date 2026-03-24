import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container, Section, CTAButton } from "@/components/design-system";
import { PageHero } from "@/components/page/PageHero";
import { MOCK_INSIGHTS, getInsightSections } from "@/lib/pageContent";
import { INSIGHT_AUTHORS } from "@/lib/richContent";
import { siteConfig } from "@/lib/siteConfig";
import { ArrowLeft, Clock, User } from "lucide-react";

export async function generateStaticParams() {
  return MOCK_INSIGHTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = MOCK_INSIGHTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article" };
  const title = `${post.title} | Premium 1 Logistics`;
  const description = post.excerpt;
  const image = post.featuredImage ? `${siteConfig.url}${post.featuredImage}` : undefined;
  return {
    title,
    description,
    openGraph: image
      ? { title, description, images: [{ url: image, width: 1200, height: 630, alt: post.title }] }
      : undefined,
    twitter: image ? { card: "summary_large_image", title, description, images: [image] } : undefined,
  };
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = MOCK_INSIGHTS.find((p) => p.slug === slug);
  if (!post) notFound();
  const sections = getInsightSections(slug);
  const author = INSIGHT_AUTHORS[post.authorKey] ?? INSIGHT_AUTHORS.default;
  const related = MOCK_INSIGHTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        variant="light"
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: post.title },
        ]}
      />

      {post.featuredImage && (
        <Section background="white" className="!pt-0 !pb-4">
          <Container size="narrow">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-slate-200">
              <Image src={post.featuredImage} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 896px" priority />
            </div>
          </Container>
        </Section>
      )}

      <Section background="white" className="!pt-12">
        <Container size="narrow">
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 pb-10 border-b border-slate-200">
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-[var(--accent)]" />
              {post.readTime}
            </span>
            <span>{post.published_at}</span>
          </div>
          <div className="flex gap-4 items-start rounded-2xl bg-slate-50 border border-slate-100 p-6 mt-8">
            <div className="w-12 h-12 rounded-full bg-[var(--navy)] text-white flex items-center justify-center flex-shrink-0">
              <User size={22} />
            </div>
            <div>
              <p className="font-display font-bold text-[var(--ink)]">{author.name}</p>
              <p className="text-sm text-[var(--accent)] font-semibold">{author.title}</p>
              <p className="text-sm text-slate-600 mt-2">{author.bio}</p>
            </div>
          </div>
          <article className="pt-12 prose-page max-w-none">
            {sections.map((sec) => (
              <section key={sec.heading} className="mb-14">
                <h2 className="font-display font-bold text-2xl text-[var(--ink)] mb-6">{sec.heading}</h2>
                {sec.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </section>
            ))}
          </article>
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="font-display font-bold text-xl text-[var(--ink)] mb-6">Related articles</h2>
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/insights/${r.slug}`}
                  className="rounded-xl border border-slate-200 p-5 hover:border-[var(--accent)]/40 transition-colors card-hover"
                >
                  <p className="text-xs text-[var(--accent)] font-semibold">{r.category}</p>
                  <p className="font-display font-bold text-[var(--ink)] mt-2 leading-snug">{r.title}</p>
                </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:gap-3 transition-all"
              >
                <ArrowLeft size={18} />
                Back to insights
              </Link>
              <CTAButton href="/quote">Discuss your lane</CTAButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
