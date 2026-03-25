import { MessageCircle, Facebook, Copy, Twitter } from "lucide-react";
import { useState } from "react";

const SocialShareButtons = ({ title, path }: { title: string; path: string }) => {
  const [copied, setCopied] = useState(false);
  const url = `https://www.puranights.com${path}`;
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-heading text-muted-foreground">Share:</span>
      <a href={`https://wa.me/?text=${encodedTitle}%20${encoded}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center bg-[#25D366] text-white hover:scale-110 transition-transform" aria-label="Share on WhatsApp">
        <MessageCircle size={16} />
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1877F2] text-white hover:scale-110 transition-transform" aria-label="Share on Facebook">
        <Facebook size={16} />
      </a>
      <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center bg-foreground text-background hover:scale-110 transition-transform" aria-label="Share on X">
        <Twitter size={16} />
      </a>
      <button onClick={copyLink} className="w-9 h-9 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground hover:scale-110 transition-transform" aria-label="Copy link">
        <Copy size={16} />
      </button>
      {copied && <span className="text-xs text-primary font-heading">Copied!</span>}
    </div>
  );
};

export default SocialShareButtons;
