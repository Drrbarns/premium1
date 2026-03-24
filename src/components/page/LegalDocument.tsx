import { PageHero } from "@/components/page/PageHero";
import { Container, Section } from "@/components/design-system";

export function LegalDocument({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { title: string; paragraphs: string[] }[];
}) {
  return (
    <>
      <PageHero
        eyebrow="Legal Information"
        title={title}
        description={`Last updated: ${updated}`}
        backgroundImage="/hero-slide-2.png"
      />
      <Section background="surface" className="relative pb-24 md:pb-32 -mt-10 sm:-mt-16 z-10 bg-transparent">
        <Container size="narrow">
          <div className="rounded-3xl bg-white border border-slate-200/80 shadow-2xl shadow-slate-900/5 p-8 md:p-14 lg:p-20 relative">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] rounded-t-3xl" />
            <article className="prose-page space-y-12">
              {sections.map((sec) => (
                <section key={sec.title}>
                  <h2 className="font-display font-bold text-2xl text-[var(--ink)] mb-6 tracking-tight">{sec.title}</h2>
                  <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                    {sec.paragraphs.map((p) => (
                      <p key={p.slice(0, 50)}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
