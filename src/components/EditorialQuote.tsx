/* <!-- WIX SECTION: Editorial pull-quote — large serif quote with attribution + gold rule --> */
interface Props {
  quote: string;
  attribution?: string;
  className?: string;
}

const EditorialQuote = ({ quote, attribution, className = "" }: Props) => (
  <figure className={`relative my-12 md:my-16 max-w-3xl mx-auto px-6 md:px-10 text-center ${className}`}>
    <span
      aria-hidden="true"
      className="absolute -top-2 left-1/2 -translate-x-1/2 font-display text-7xl md:text-8xl leading-none text-primary/30 select-none"
    >
      &ldquo;
    </span>
    <blockquote className="font-display italic text-2xl md:text-3xl lg:text-[2.1rem] leading-snug text-foreground tracking-[-0.01em] pt-8">
      {quote}
    </blockquote>
    {attribution && (
      <figcaption className="mt-6 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-primary/60" />
        <span className="font-accent text-[10px] tracking-[0.3em] uppercase text-primary">{attribution}</span>
        <span className="h-px w-10 bg-primary/60" />
      </figcaption>
    )}
  </figure>
);

export default EditorialQuote;
