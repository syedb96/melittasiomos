import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

/* <!-- WIX SECTION: Next-Step Service Grid — replicate as a Repeater bound
     to a static "RelatedServices" CMS collection (label|description|to|tone).
     Heading sits above as a Wix Title; the cards become a 3-column Repeater. --> */

export interface NextStepItem {
  to: string;
  label: string;
  description: string;
  /** Optional tag/eyebrow (e.g. "Next step") */
  eyebrow?: string;
}

interface Props {
  /** Eyebrow caption above title */
  eyebrow?: string;
  /** Headline */
  title?: string;
  /** Intro paragraph */
  intro?: string;
  items: NextStepItem[];
}

const NextStepServiceGrid = ({
  eyebrow = "Where to Next",
  title = "Your Next Step with Pura Nights",
  intro = "Most students naturally branch into a second service once they're enjoying weekly classes. Here's where dancers like you tend to go next.",
  items,
}: Props) => (
  <section
    className="section-padding bg-card"
    aria-labelledby="next-step-service-title"
  >
    <div className="container-main max-w-6xl">
      <FadeInUp>
        <p className="font-accent text-[11px] tracking-[0.3em] uppercase text-primary mb-3">
          {eyebrow}
        </p>
        <h2
          id="next-step-service-title"
          className="font-display text-3xl md:text-4xl font-bold mb-3"
        >
          {title}
        </h2>
        <p className="text-muted-foreground font-heading text-sm max-w-2xl mb-10">
          {intro}
        </p>
      </FadeInUp>

      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <StaggerItem key={item.to}>
            <Link
              to={item.to}
              className="group block h-full bg-background rounded-2xl p-5 border border-border hover:border-primary/40 transition-colors card-hover"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="font-accent text-[10px] tracking-[0.2em] uppercase text-primary">
                  {item.eyebrow || "Next step"}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </div>
              <h3 className="font-display text-lg font-bold mb-1">{item.label}</h3>
              <p className="text-xs text-muted-foreground font-heading leading-relaxed">
                {item.description}
              </p>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default NextStepServiceGrid;
