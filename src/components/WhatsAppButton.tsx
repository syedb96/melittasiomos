import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/447449482343"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110"
    style={{ backgroundColor: '#25D366' }}
    aria-label="Chat with Melitta on WhatsApp"
    title="Chat with Melitta on WhatsApp"
  >
    <MessageCircle size={28} className="text-primary-foreground" />
  </a>
);

export default WhatsAppButton;
