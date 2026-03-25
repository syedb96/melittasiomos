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
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import WeddingDance from "./pages/WeddingDance";
import PrivateLessons from "./pages/PrivateLessons";
import GiftVouchers from "./pages/GiftVouchers";
import OnlineClasses from "./pages/OnlineClasses";
import Testimonials from "./pages/Testimonials";
import SalsaClassesLondon from "./pages/SalsaClassesLondon";
import BachataClassesLondon from "./pages/BachataClassesLondon";
import SalsaClassesChiswick from "./pages/SalsaClassesChiswick";
import BachataClassesChiswick from "./pages/BachataClassesChiswick";
import BachataClassesEaling from "./pages/BachataClassesEaling";
import SalsaClassesEaling from "./pages/SalsaClassesEaling";
import DanceClassesSouthWestLondon from "./pages/DanceClassesSouthWestLondon";
import DanceClassesWestLondon from "./pages/DanceClassesWestLondon";
import StartHere from "./pages/StartHere";
import Locations from "./pages/Locations";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import WhatIsSalsa from "./pages/blog/WhatIsSalsa";
import WhatIsBachata from "./pages/blog/WhatIsBachata";
import SalsaVsBachata from "./pages/blog/SalsaVsBachata";
import BeginnersGuideLondon from "./pages/blog/BeginnersGuideLondon";
import WeddingFirstDanceTips from "./pages/blog/WeddingFirstDanceTips";
import PuraLadiesStory from "./pages/blog/PuraLadiesStory";
import SalsaClassesActon from "./pages/SalsaClassesActon";
import DanceClassesEaling from "./pages/DanceClassesEaling";
import BachataClassesWestLondon from "./pages/BachataClassesWestLondon";
import WeddingDanceWestLondon from "./pages/WeddingDanceWestLondon";
import PrivateDanceLessonsWestLondon from "./pages/PrivateDanceLessonsWestLondon";
import FirstSalsaClassLondon from "./pages/blog/FirstSalsaClassLondon";
import SalsaNoPartner from "./pages/blog/SalsaNoPartner";
import HowLongToLearnSalsa from "./pages/blog/HowLongToLearnSalsa";
import BachataForBeginnersLondon from "./pages/blog/BachataForBeginnersLondon";
import WhatToWearSalsaBachata from "./pages/blog/WhatToWearSalsaBachata";
import SalsaOn1VsOn2 from "./pages/blog/SalsaOn1VsOn2";
import BestAreasWestLondon from "./pages/blog/BestAreasWestLondon";
import SalsaClassesNearChiswick from "./pages/blog/SalsaClassesNearChiswick";
import BachataClassesNearEaling from "./pages/blog/BachataClassesNearEaling";
import DanceClassesActonAdults from "./pages/blog/DanceClassesActonAdults";
import WestLondonLatinDanceGuide from "./pages/blog/WestLondonLatinDanceGuide";
import SalsaSouthWestLondon from "./pages/blog/SalsaSouthWestLondon";
import ChooseWeddingSong from "./pages/blog/ChooseWeddingSong";
import SalsaVsWaltzWedding from "./pages/blog/SalsaVsWaltzWedding";
import HowManyWeddingLessons from "./pages/blog/HowManyWeddingLessons";
import LastMinuteWeddingDance from "./pages/blog/LastMinuteWeddingDance";
import HistoryOfSalsa from "./pages/blog/HistoryOfSalsa";
import HistoryOfBachata from "./pages/blog/HistoryOfBachata";
import LatinDanceClassesLondon from "./pages/LatinDanceClassesLondon";
import DanceClassesChiswick from "./pages/DanceClassesChiswick";
import WeddingDanceLessonsLondon from "./pages/WeddingDanceLessonsLondon";
import PrivateSalsaLessonsLondon from "./pages/PrivateSalsaLessonsLondon";
import LadiesStylingLondon from "./pages/LadiesStylingLondon";
import BachataPerformanceTeamLondon from "./pages/BachataPerformanceTeamLondon";
import DanceClassesChiswick from "./pages/DanceClassesChiswick";
import BestSalsaNightsWestLondon from "./pages/blog/BestSalsaNightsWestLondon";
import SalsaClassesNearTurnhamGreen from "./pages/blog/SalsaClassesNearTurnhamGreen";
import LatinDanceEventsEaling2026 from "./pages/blog/LatinDanceEventsEaling2026";
import BachataSensualGuide from "./pages/blog/BachataSensualGuide";
import LadiesStylingBachata from "./pages/blog/LadiesStylingBachata";
import LeadFollowSalsaBachata from "./pages/blog/LeadFollowSalsaBachata";
import ImproveSocialDancing from "./pages/blog/ImproveSocialDancing";
import SalsaMusicality from "./pages/blog/SalsaMusicality";
import HenPartyDanceIdeas from "./pages/blog/HenPartyDanceIdeas";
import CorporateTeamBuildingDance from "./pages/blog/CorporateTeamBuildingDance";
import GiftVoucherDanceClass from "./pages/blog/GiftVoucherDanceClass";
import NewYearStartSalsa from "./pages/blog/NewYearStartSalsa";
import LatinDanceFitnessBenefits from "./pages/blog/LatinDanceFitnessBenefits";
import JoiningDanceClassAlone from "./pages/blog/JoiningDanceClassAlone";
import SalsaShoesGuide from "./pages/blog/SalsaShoesGuide";
import HowToPracticeSalsaAtHome from "./pages/blog/HowToPracticeSalsaAtHome";
import PuraNightsLatinFridayGuide from "./pages/blog/PuraNightsLatinFridayGuide";
import DanceClassesWestLondonGuide from "./pages/blog/DanceClassesWestLondonGuide";

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
          <Route path="/blog/what-is-salsa" element={<WhatIsSalsa />} />
          <Route path="/blog/what-is-bachata" element={<WhatIsBachata />} />
          <Route path="/blog/salsa-vs-bachata" element={<SalsaVsBachata />} />
          <Route path="/blog/beginners-guide-salsa-london" element={<BeginnersGuideLondon />} />
          <Route path="/blog/wedding-first-dance-tips" element={<WeddingFirstDanceTips />} />
          <Route path="/blog/pura-ladies-story" element={<PuraLadiesStory />} />
          <Route path="/blog/first-salsa-class-london" element={<FirstSalsaClassLondon />} />
          <Route path="/blog/salsa-no-partner" element={<SalsaNoPartner />} />
          <Route path="/blog/how-long-to-learn-salsa" element={<HowLongToLearnSalsa />} />
          <Route path="/blog/bachata-for-beginners-london" element={<BachataForBeginnersLondon />} />
          <Route path="/blog/what-to-wear-salsa-bachata" element={<WhatToWearSalsaBachata />} />
          <Route path="/blog/salsa-on1-vs-on2" element={<SalsaOn1VsOn2 />} />
          <Route path="/blog/best-areas-west-london" element={<BestAreasWestLondon />} />
          <Route path="/blog/salsa-classes-near-chiswick" element={<SalsaClassesNearChiswick />} />
          <Route path="/blog/bachata-classes-near-ealing" element={<BachataClassesNearEaling />} />
          <Route path="/blog/dance-classes-acton-adults" element={<DanceClassesActonAdults />} />
          <Route path="/blog/west-london-latin-dance-guide" element={<WestLondonLatinDanceGuide />} />
          <Route path="/blog/salsa-south-west-london" element={<SalsaSouthWestLondon />} />
          <Route path="/blog/choose-wedding-first-dance-song" element={<ChooseWeddingSong />} />
          <Route path="/blog/salsa-vs-waltz-wedding" element={<SalsaVsWaltzWedding />} />
          <Route path="/blog/how-many-wedding-dance-lessons" element={<HowManyWeddingLessons />} />
          <Route path="/blog/last-minute-wedding-dance" element={<LastMinuteWeddingDance />} />
          <Route path="/blog/history-of-salsa" element={<HistoryOfSalsa />} />
          <Route path="/blog/history-of-bachata" element={<HistoryOfBachata />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/wedding-dance" element={<WeddingDance />} />
          <Route path="/private-lessons" element={<PrivateLessons />} />
          <Route path="/gift-vouchers" element={<GiftVouchers />} />
          <Route path="/online-classes" element={<OnlineClasses />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/salsa-classes-london" element={<SalsaClassesLondon />} />
          <Route path="/bachata-classes-london" element={<BachataClassesLondon />} />
          <Route path="/salsa-classes-chiswick" element={<SalsaClassesChiswick />} />
          <Route path="/bachata-classes-chiswick" element={<BachataClassesChiswick />} />
          <Route path="/bachata-classes-ealing" element={<BachataClassesEaling />} />
          <Route path="/salsa-classes-ealing" element={<SalsaClassesEaling />} />
          <Route path="/salsa-classes-acton" element={<SalsaClassesActon />} />
          <Route path="/dance-classes-ealing" element={<DanceClassesEaling />} />
          <Route path="/bachata-classes-west-london" element={<BachataClassesWestLondon />} />
          <Route path="/wedding-dance-west-london" element={<WeddingDanceWestLondon />} />
          <Route path="/private-dance-lessons-west-london" element={<PrivateDanceLessonsWestLondon />} />
          <Route path="/dance-classes-south-west-london" element={<DanceClassesSouthWestLondon />} />
          <Route path="/dance-classes-west-london" element={<DanceClassesWestLondon />} />
          <Route path="/start-here" element={<StartHere />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/latin-dance-classes-london" element={<LatinDanceClassesLondon />} />
          <Route path="/dance-classes-chiswick" element={<DanceClassesChiswick />} />
          <Route path="/wedding-dance-lessons-london" element={<WeddingDanceLessonsLondon />} />
          <Route path="/private-salsa-lessons-london" element={<PrivateSalsaLessonsLondon />} />
          <Route path="/ladies-styling-london" element={<LadiesStylingLondon />} />
          <Route path="/bachata-performance-team-london" element={<BachataPerformanceTeamLondon />} />
          <Route path="/dance-classes-chiswick" element={<DanceClassesChiswick />} />
          <Route path="/blog/best-salsa-nights-west-london" element={<BestSalsaNightsWestLondon />} />
          <Route path="/blog/salsa-classes-near-turnham-green" element={<SalsaClassesNearTurnhamGreen />} />
          <Route path="/blog/latin-dance-events-ealing-2026" element={<LatinDanceEventsEaling2026 />} />
          <Route path="/blog/bachata-sensual-guide" element={<BachataSensualGuide />} />
          <Route path="/blog/ladies-styling-bachata" element={<LadiesStylingBachata />} />
          <Route path="/blog/lead-follow-salsa-bachata" element={<LeadFollowSalsaBachata />} />
          <Route path="/blog/improve-social-dancing" element={<ImproveSocialDancing />} />
          <Route path="/blog/salsa-musicality-guide" element={<SalsaMusicality />} />
          <Route path="/blog/hen-party-dance-ideas-london" element={<HenPartyDanceIdeas />} />
          <Route path="/blog/corporate-team-building-dance-london" element={<CorporateTeamBuildingDance />} />
          <Route path="/blog/gift-voucher-dance-class-london" element={<GiftVoucherDanceClass />} />
          <Route path="/blog/new-year-start-salsa-london" element={<NewYearStartSalsa />} />
          <Route path="/blog/latin-dance-fitness-benefits" element={<LatinDanceFitnessBenefits />} />
          <Route path="/blog/joining-dance-class-alone" element={<JoiningDanceClassAlone />} />
          <Route path="/blog/salsa-shoes-guide" element={<SalsaShoesGuide />} />
          <Route path="/blog/how-to-practice-salsa-at-home" element={<HowToPracticeSalsaAtHome />} />
          <Route path="/blog/pura-nights-latin-friday-guide" element={<PuraNightsLatinFridayGuide />} />
          <Route path="/blog/dance-classes-west-london-guide" element={<DanceClassesWestLondonGuide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;