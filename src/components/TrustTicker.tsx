const items = [
  "⭐ 5-Star Google Rated",
  "🏆 Bachata UK Champion",
  "💃 15+ Years Teaching",
  "🌍 500+ Students Taught",
  "❤️ All Levels Welcome",
  "🎉 No Partner Needed",
];

const TrustTicker = () => (
  <div className="bg-secondary overflow-hidden py-3">
    <div className="animate-ticker flex whitespace-nowrap">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="mx-8 text-sm font-heading font-semibold text-secondary-foreground">
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default TrustTicker;
