import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const WhatsAppButton = () => {
  const { pathname } = useLocation();
  const [hovered, setHovered] = useState(false);

  let message = "Hi Melitta! I found your website and I'd love to find out more about your classes 😊";
  if (pathname.includes("wedding")) {
    message = "Hi Melitta! I'm planning my wedding first dance and I'd love to book a consultation 💑";
  } else if (pathname.includes("pura-ladies")) {
    message = "Hi Melitta! I'm interested in joining Pura Ladies. Can you tell me more? 💃";
  }

  return (
    <a
      href={`https://wa.me/447449482343?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg transition-transform hover:scale-110 group"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Chat with Melitta on WhatsApp"
      title="Chat with Melitta on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ backgroundColor: "#25D366" }} />
      <MessageCircle size={28} className="text-white relative z-10" />
      {hovered && (
        <span className="hidden md:block absolute right-full mr-3 bg-foreground text-background text-xs font-heading px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
          💬 Chat with Melitta
        </span>
      )}
    </a>
  );
};

export default WhatsAppButton;
