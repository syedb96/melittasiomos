interface Props {
  className?: string;
  width?: string;
  variant?: "default" | "hairline";
}

/* <!-- WIX: Editorial gold divider — use thin Wix Line + Vector Image (dot) --> */
const GoldDivider = ({ className = "", width = "w-24", variant = "default" }: Props) => {
  if (variant === "hairline") {
    return (
      <div className={`relative h-px w-full ${className}`}>
        <div
          className="absolute left-1/2 -translate-x-1/2 h-px w-[min(80%,880px)]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, hsl(43 48% 54% / 0.55) 30%, hsl(43 48% 54% / 0.9) 50%, hsl(43 48% 54% / 0.55) 70%, transparent 100%)",
          }}
        />
      </div>
    );
  }
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className={`h-px ${width}`} style={{ background: "linear-gradient(90deg, transparent, hsl(43 48% 54%), transparent)" }} />
      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
      <div className={`h-px ${width}`} style={{ background: "linear-gradient(90deg, transparent, hsl(43 48% 54%), transparent)" }} />
    </div>
  );
};

export default GoldDivider;
