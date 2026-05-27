import { CheckCircle2 } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

/* <!-- WIX SECTION: Who This Is For — replicate as a Repeater of audience
     persona cards (label|description). Heading + intro above as Wix Title +
     Paragraph. Keep copy specific to the service page it's used on. --> */

export interface AudiencePersona {
  label: string;
  description: string;
}

interface Props {
  eyebrow?: string;
  title?: string;
  intro?: string;
  personas: AudiencePersona[];
}

const WhoThisIsForBlock = ({
  eyebrow = "Who This Is For",
  title = "Who this is built for",
  intro,
  personas,
}: Props) => (
  <section
    className="section-padding section-ivory"
    aria-labelledby="who-this-is-for-title"
  >
    <div className="container-main max-w-5xl">
      <FadeInUp>
        <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-3">
          {eyebrow}
        </p>
        <h2
          id="who-this-is-for-title"
          className="font-display text-3xl md:text-4xl font-bold mb-3"
        >
          {title}
        </h2>
        {intro && (
          <p className="text-muted-foreground font-heading text-sm max-w-2xl mb-10">
            {intro}
          </p>
        )}
      </FadeInUp>

      <StaggerContainer
        className="grid sm:grid-cols-2 gap-4"
        staggerDelay={0.05}
      >
        {personas.map((p) => (
          <StaggerItem key={p.label}>
            <div className="h-full bg-background rounded-2xl p-5 border border-border">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  className="text-primary flex-shrink-0 mt-0.5"
                  aria-hidden
                />
                <div>
                  <h3 className="font-display text-base font-bold mb-1">
                    {p.label}
                  </h3>
                  <p className="text-xs text-muted-foreground font-heading leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default WhoThisIsForBlock;
