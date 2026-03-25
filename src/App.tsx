import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import About from "./pages/About";
import PuraNights from "./pages/PuraNights";
import PuraLadies from "./pages/PuraLadies";
import Prices from "./pages/Prices";
import Bookings from "./pages/Bookings";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import WeddingDance from "./pages/WeddingDance";
import PrivateLessons from "./pages/PrivateLessons";
import GiftVouchers from "./pages/GiftVouchers";
import OnlineClasses from "./pages/OnlineClasses";
import SalsaClassesLondon from "./pages/SalsaClassesLondon";
import BachataClassesLondon from "./pages/BachataClassesLondon";
import SalsaClassesChiswick from "./pages/SalsaClassesChiswick";
import BachataClassesChiswick from "./pages/BachataClassesChiswick";
import BachataClassesEaling from "./pages/BachataClassesEaling";
import SalsaClassesEaling from "./pages/SalsaClassesEaling";
import DanceClassesSouthWestLondon from "./pages/DanceClassesSouthWestLondon";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/pura-nights" element={<PuraNights />} />
          <Route path="/pura-ladies" element={<PuraLadies />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/wedding-dance" element={<WeddingDance />} />
          <Route path="/private-lessons" element={<PrivateLessons />} />
          <Route path="/gift-vouchers" element={<GiftVouchers />} />
          <Route path="/online-classes" element={<OnlineClasses />} />
          <Route path="/salsa-classes-london" element={<SalsaClassesLondon />} />
          <Route path="/bachata-classes-london" element={<BachataClassesLondon />} />
          <Route path="/salsa-classes-chiswick" element={<SalsaClassesChiswick />} />
          <Route path="/bachata-classes-chiswick" element={<BachataClassesChiswick />} />
          <Route path="/bachata-classes-ealing" element={<BachataClassesEaling />} />
          <Route path="/salsa-classes-ealing" element={<SalsaClassesEaling />} />
          <Route path="/dance-classes-south-west-london" element={<DanceClassesSouthWestLondon />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
