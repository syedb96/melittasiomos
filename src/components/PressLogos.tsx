/* <!-- WIX: Replace with Wix Logo Slider or Pro Gallery filtered to "press" tag.
   Placeholder logos — replace with actual press feature logos when secured. --> */
const PressLogos = () => {
  const outlets = ["The Guardian", "Time Out London", "Evening Standard", "BBC London"];
  return (
    <section className="py-10 bg-card border-y border-border">
      <div className="container-main max-w-4xl text-center">
        <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-5">As Mentioned In</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {outlets.map(name => (
            <div
              key={name}
              className="font-display text-base md:text-lg font-bold text-muted-foreground/40 hover:text-foreground transition-colors cursor-default select-none"
              title={`${name} — coverage placeholder`}
            >
              {name}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground/60 font-heading mt-4">Press coverage placeholders — to be replaced with confirmed media features.</p>
      </div>
    </section>
  );
};

export default PressLogos;
