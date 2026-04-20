interface Props {
  className?: string;
  width?: string;
}

const GoldDivider = ({ className = "", width = "w-24" }: Props) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className={`h-px ${width}`} style={{ background: "linear-gradient(90deg, transparent, hsl(43 48% 54%), transparent)" }} />
    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
    <div className={`h-px ${width}`} style={{ background: "linear-gradient(90deg, transparent, hsl(43 48% 54%), transparent)" }} />
  </div>
);

export default GoldDivider;
