interface LastUpdatedProps {
  date: string; // ISO date string e.g. "2026-04-13"
}

const LastUpdated = ({ date }: LastUpdatedProps) => {
  const d = new Date(date);
  const formatted = d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <p className="text-muted-foreground text-xs font-heading mt-2">
      <time dateTime={date}>Last updated: {formatted}</time>
    </p>
  );
};

export default LastUpdated;
