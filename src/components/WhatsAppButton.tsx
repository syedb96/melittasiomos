import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/447449482343?text=Hi%20Melitta%2C%20I%27d%20like%20to%20enquire%20about%20dance%20classes"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110 group"
    style={{ backgroundColor: '#25D366' }}
    aria-label="Chat with Melitta on WhatsApp"
    title="Chat with Melitta on WhatsApp"
  >
    {/* Pulse ring */}
    <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ backgroundColor: '#25D366' }} />
    <MessageCircle size={28} className="text-white relative z-10" />
  </a>
);

export default WhatsAppButton;
