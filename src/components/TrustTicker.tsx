const items = [
  "⭐ 5.0 Google Rating",
  "💃 500+ Students Taught",
  "🏆 Bachata UK Champion",
  "🌍 7 Pura Ladies Teams, 4 Countries",
  "📍 Classes in Chiswick & Ealing",
  "🎓 15+ Years Teaching & Performing",
  "💑 Wedding Dance Specialists",
  "🔥 Monthly Latin Fridays",
  "✅ No Partner Needed",
  "📱 5★ on Google",
];

const TrustTicker = () => (
  <div className="bg-charcoal-light overflow-hidden py-2.5">
    <div className="animate-ticker flex whitespace-nowrap" style={{ willChange: 'transform' }}>
      {[...items, ...items].map((item, i) => (
        <span key={i} className="mx-8 text-xs font-accent font-semibold tracking-wide text-primary">
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default TrustTicker;