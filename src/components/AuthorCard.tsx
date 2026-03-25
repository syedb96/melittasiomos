import { Link } from "react-router-dom";

const AuthorCard = () => (
  <div className="border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 mt-12 bg-card">
    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display text-2xl font-bold shrink-0">
      MS
    </div>
    <div className="text-center sm:text-left">
      <p className="font-display text-lg font-bold">Melitta Siomos</p>
      <p className="text-muted-foreground text-sm mb-2">Award-winning Salsa & Bachata instructor, London</p>
      <div className="flex items-center gap-3 justify-center sm:justify-start text-sm">
        <a href="https://www.instagram.com/melittasiomos/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-heading">@melittasiomos</a>
        <Link to="/blog" className="text-primary hover:underline font-heading">View all posts →</Link>
      </div>
    </div>
  </div>
);

export default AuthorCard;
