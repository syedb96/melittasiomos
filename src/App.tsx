import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Public pages
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
import OnlineCoaching from "./pages/OnlineCoaching";
import OnlineAcademy from "./pages/OnlineAcademy";
import Refer from "./pages/Refer";
import Testimonials from "./pages/Testimonials";
import SalsaClassesLondon from "./pages/SalsaClassesLondon";
import BachataClassesLondon from "./pages/BachataClassesLondon";
import SalsaClassesChiswick from "./pages/SalsaClassesChiswick";
import BachataClassesChiswick from "./pages/BachataClassesChiswick";
import BachataClassesEaling from "./pages/BachataClassesEaling";
import SalsaClassesEaling from "./pages/SalsaClassesEaling";
import DanceClassesSouthWestLondon from "./pages/DanceClassesSouthWestLondon";
import DanceClassesWestLondon from "./pages/DanceClassesWestLondon";
import Community from "./pages/Community";
import Schedule from "./pages/Schedule";
import SalsaClassesSouthWestLondon from "./pages/SalsaClassesSouthWestLondon";
import BachataClassesSouthWestLondon from "./pages/BachataClassesSouthWestLondon";
import StartHere from "./pages/StartHere";
import Locations from "./pages/Locations";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";
import NotFound from "./pages/NotFound";
import SalsaClassesActon from "./pages/SalsaClassesActon";
import DanceClassesEaling from "./pages/DanceClassesEaling";
import BachataClassesWestLondon from "./pages/BachataClassesWestLondon";
import WeddingDanceWestLondon from "./pages/WeddingDanceWestLondon";
import PrivateDanceLessonsWestLondon from "./pages/PrivateDanceLessonsWestLondon";
import LatinDanceClassesLondon from "./pages/LatinDanceClassesLondon";
import DanceClassesChiswick from "./pages/DanceClassesChiswick";
import WeddingDanceLessonsLondon from "./pages/WeddingDanceLessonsLondon";
import PrivateSalsaLessonsLondon from "./pages/PrivateSalsaLessonsLondon";
import LadiesStylingLondon from "./pages/LadiesStylingLondon";
import BachataPerformanceTeamLondon from "./pages/BachataPerformanceTeamLondon";
import Beginners from "./pages/Beginners";
import FirstClassGuide from "./pages/FirstClassGuide";
import AllPagesMaster from "./pages/AllPagesMaster";
import ProofCentre from "./pages/ProofCentre";
import MeetTheTeam from "./pages/MeetTheTeam";
import TheGeorgeIVChiswick from "./pages/venue/TheGeorgeIVChiswick";
import TheDraytonCourtEaling from "./pages/venue/TheDraytonCourtEaling";
import SalsaClassesRichmond from "./pages/SalsaClassesRichmond";
import SalsaClassesHammersmith from "./pages/SalsaClassesHammersmith";
import DanceClassesHounslow from "./pages/DanceClassesHounslow";
import LatinDanceEaling from "./pages/LatinDanceEaling";
import LatinDanceChiswick from "./pages/LatinDanceChiswick";
import SalsaClassesFulham from "./pages/SalsaClassesFulham";
import SalsaClassesActonLocal from "./pages/SalsaClassesActonLocal";
import ThankYou from "./pages/ThankYou";
import EventInstance from "./pages/EventInstance";
import CorporateDanceClassesLondon from "./pages/CorporateDanceClassesLondon";
import PrivateGroupDancePartiesLondon from "./pages/PrivateGroupDancePartiesLondon";
import PartnerWithPuraNights from "./pages/PartnerWithPuraNights";
import LatinNightOutWestLondon from "./pages/LatinNightOutWestLondon";
import SalsaClassesBrentford from "./pages/SalsaClassesBrentford";
import SalsaClassesKew from "./pages/SalsaClassesKew";
import SalsaClassesBarnes from "./pages/SalsaClassesBarnes";
import SalsaClassesPutney from "./pages/SalsaClassesPutney";
import SalsaClassesShepherdsBush from "./pages/SalsaClassesShepherdsBush";
import SalsaClassesNottingHill from "./pages/SalsaClassesNottingHill";
import SalsaBachataCoventGarden from "./pages/SalsaBachataCoventGarden";
import PuraLadiesCoventGarden from "./pages/PuraLadiesCoventGarden";
import Press from "./pages/Press";
import Influencers from "./pages/Influencers";
import Resources from "./pages/Resources";
import Glossary from "./pages/Glossary";
import PartnersEmbed from "./pages/PartnersEmbed";
import EmbedClassFinder from "./pages/EmbedClassFinder";
import LatinFriday from "./pages/LatinFriday";
import YourFirstClass from "./pages/YourFirstClass";
import LeaveAReview from "./pages/LeaveAReview";

// Shop shell (Wix Stores-ready)
import Shop from "./pages/shop/Shop";
import SizeGuide from "./pages/shop/SizeGuide";
import ShippingReturns from "./pages/shop/ShippingReturns";
import Lookbook from "./pages/shop/Lookbook";
import LookbookCategory from "./pages/shop/LookbookCategory";
import ProductTemplate from "./pages/shop/ProductTemplate";

// Blog pages
import WhatIsSalsa from "./pages/blog/WhatIsSalsa";
import WhatIsBachata from "./pages/blog/WhatIsBachata";
import SalsaVsBachata from "./pages/blog/SalsaVsBachata";
import BeginnersGuideLondon from "./pages/blog/BeginnersGuideLondon";
import WeddingFirstDanceTips from "./pages/blog/WeddingFirstDanceTips";
import PuraLadiesStory from "./pages/blog/PuraLadiesStory";
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
import ShyBeginnersSalsaLondon from "./pages/blog/ShyBeginnersSalsaLondon";
import SalsaBachataEtiquetteGuide from "./pages/blog/SalsaBachataEtiquetteGuide";
import HowToMakeFriendsAtSalsaClass from "./pages/blog/HowToMakeFriendsAtSalsaClass";
import BestLatinSocialDancingLondon from "./pages/blog/BestLatinSocialDancingLondon";
import AfterWorkDanceClassesLondon from "./pages/blog/AfterWorkDanceClassesLondon";
import DateNightDanceClassLondon from "./pages/blog/DateNightDanceClassLondon";
import DanceClassesForCouplesLondon from "./pages/blog/DanceClassesForCouplesLondon";
import AnniversaryDanceLessonLondon from "./pages/blog/AnniversaryDanceLessonLondon";
import BirthdayDanceClassLondon from "./pages/blog/BirthdayDanceClassLondon";
import CorporateChristmasPartyDanceLondon from "./pages/blog/CorporateChristmasPartyDanceLondon";
import BuildConfidenceOnDanceFloor from "./pages/blog/BuildConfidenceOnDanceFloor";
import SalsaBachataBucketListLondon from "./pages/blog/SalsaBachataBucketListLondon";
import BestSalsaBachataClassesWestLondon from "./pages/BestSalsaBachataClassesWestLondon";

// Pillar pages
import SalsaBachataGuide from "./pages/learn/SalsaBachataGuide";
import SalsaVsBachataPillar from "./pages/learn/SalsaVsBachataPillar";
import UltimateLondonGuide from "./pages/learn/UltimateLondonGuide";
import BestSalsaBachataNightsLondon from "./pages/learn/BestSalsaBachataNightsLondon";

// Auth & Admin pages
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import GalleryAdmin from "./pages/admin/GalleryAdmin";
import TeamAdmin from "./pages/admin/TeamAdmin";
import EventsAdmin from "./pages/admin/EventsAdmin";
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin";
import EnquiriesAdmin from "./pages/admin/EnquiriesAdmin";
import SettingsAdmin from "./pages/admin/SettingsAdmin";
import Blueprint from "./pages/admin/Blueprint";
import AmbassadorsAdmin from "./pages/admin/AmbassadorsAdmin";
import SiteDocs from "./pages/admin/SiteDocs";
import SeoDashboard from "./pages/admin/SeoDashboard";
import ShopPhotoTracker from "./pages/admin/ShopPhotoTracker";
import AnalyticsAdmin from "./pages/admin/AnalyticsAdmin";

import FreeTaster from "./pages/FreeTaster";
import WhyPuraNights from "./pages/WhyPuraNights";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
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
            <Route path="/blog/shy-beginners-salsa-london" element={<ShyBeginnersSalsaLondon />} />
            <Route path="/blog/salsa-bachata-etiquette-guide" element={<SalsaBachataEtiquetteGuide />} />
            <Route path="/blog/how-to-make-friends-at-salsa-class" element={<HowToMakeFriendsAtSalsaClass />} />
            <Route path="/blog/best-latin-social-dancing-london" element={<BestLatinSocialDancingLondon />} />
            <Route path="/blog/after-work-dance-classes-london" element={<AfterWorkDanceClassesLondon />} />
            <Route path="/blog/date-night-dance-class-london" element={<DateNightDanceClassLondon />} />
            <Route path="/blog/dance-classes-for-couples-london" element={<DanceClassesForCouplesLondon />} />
            <Route path="/blog/anniversary-dance-lesson-london" element={<AnniversaryDanceLessonLondon />} />
            <Route path="/blog/birthday-dance-class-london" element={<BirthdayDanceClassLondon />} />
            <Route path="/blog/corporate-christmas-party-dance-london" element={<CorporateChristmasPartyDanceLondon />} />
            <Route path="/blog/build-confidence-on-dance-floor" element={<BuildConfidenceOnDanceFloor />} />
            <Route path="/blog/salsa-bachata-bucket-list-london" element={<SalsaBachataBucketListLondon />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<EventInstance />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/wedding-dance" element={<WeddingDance />} />
            <Route path="/private-lessons" element={<PrivateLessons />} />
            <Route path="/gift-vouchers" element={<GiftVouchers />} />
            <Route path="/online-classes" element={<OnlineClasses />} />
            <Route path="/online-salsa-bachata-coaching" element={<OnlineCoaching />} />
            <Route path="/online-academy" element={<OnlineAcademy />} />
            <Route path="/refer" element={<Refer />} />
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
            <Route path="/community" element={<Community />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/salsa-classes-south-west-london" element={<SalsaClassesSouthWestLondon />} />
            <Route path="/bachata-classes-south-west-london" element={<BachataClassesSouthWestLondon />} />
            <Route path="/start-here" element={<StartHere />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/latin-dance-classes-london" element={<LatinDanceClassesLondon />} />
            <Route path="/dance-classes-chiswick" element={<DanceClassesChiswick />} />
            <Route path="/wedding-dance-lessons-london" element={<WeddingDanceLessonsLondon />} />
            <Route path="/private-salsa-lessons-london" element={<PrivateSalsaLessonsLondon />} />
            <Route path="/ladies-styling-london" element={<LadiesStylingLondon />} />
            <Route path="/bachata-performance-team-london" element={<BachataPerformanceTeamLondon />} />
            <Route path="/beginners" element={<Beginners />} />
            <Route path="/first-class-guide" element={<FirstClassGuide />} />
            <Route path="/all-pages-master" element={<AllPagesMaster />} />
            <Route path="/proof-centre" element={<ProofCentre />} />
            <Route path="/meet-the-team" element={<MeetTheTeam />} />
            <Route path="/venue/the-george-iv-chiswick" element={<TheGeorgeIVChiswick />} />
            <Route path="/venue/the-drayton-court-ealing" element={<TheDraytonCourtEaling />} />
            <Route path="/salsa-classes-richmond" element={<SalsaClassesRichmond />} />
            <Route path="/salsa-classes-hammersmith" element={<SalsaClassesHammersmith />} />
            <Route path="/dance-classes-hounslow" element={<DanceClassesHounslow />} />
            <Route path="/latin-dance-ealing" element={<LatinDanceEaling />} />
            <Route path="/latin-dance-chiswick" element={<LatinDanceChiswick />} />
            <Route path="/salsa-classes-fulham" element={<SalsaClassesFulham />} />
            <Route path="/salsa-classes-acton-local" element={<SalsaClassesActonLocal />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/corporate-dance-classes-london" element={<CorporateDanceClassesLondon />} />
            <Route path="/private-group-dance-parties-london" element={<PrivateGroupDancePartiesLondon />} />
            <Route path="/partner-with-pura-nights" element={<PartnerWithPuraNights />} />
            <Route path="/latin-night-out-west-london" element={<LatinNightOutWestLondon />} />
            <Route path="/salsa-classes-brentford" element={<SalsaClassesBrentford />} />
            <Route path="/salsa-classes-kew" element={<SalsaClassesKew />} />
            <Route path="/salsa-classes-barnes" element={<SalsaClassesBarnes />} />
            <Route path="/salsa-classes-putney" element={<SalsaClassesPutney />} />
            <Route path="/salsa-classes-shepherds-bush" element={<SalsaClassesShepherdsBush />} />
            <Route path="/salsa-classes-notting-hill" element={<SalsaClassesNottingHill />} />
            <Route path="/salsa-bachata-classes-covent-garden" element={<SalsaBachataCoventGarden />} />
            <Route path="/pura-ladies-covent-garden" element={<PuraLadiesCoventGarden />} />
            <Route path="/best-salsa-bachata-classes-west-london" element={<BestSalsaBachataClassesWestLondon />} />
            <Route path="/press" element={<Press />} />
            <Route path="/influencers" element={<Influencers />} />

            {/* Shop shell — Wix Stores-ready */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/shipping-returns" element={<ShippingReturns />} />
            <Route path="/lookbook" element={<Lookbook />} />
            <Route path="/lookbook/:category" element={<LookbookCategory />} />
            <Route path="/shop/:slug" element={<ProductTemplate />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />

            {/* Admin Routes — Protected */}
            <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/gallery" element={<ProtectedRoute><GalleryAdmin /></ProtectedRoute>} />
            <Route path="/admin/team" element={<ProtectedRoute><TeamAdmin /></ProtectedRoute>} />
            <Route path="/admin/events" element={<ProtectedRoute><EventsAdmin /></ProtectedRoute>} />
            <Route path="/admin/testimonials" element={<ProtectedRoute><TestimonialsAdmin /></ProtectedRoute>} />
            <Route path="/admin/enquiries" element={<ProtectedRoute requireAdmin><EnquiriesAdmin /></ProtectedRoute>} />
            <Route path="/admin/ambassadors" element={<ProtectedRoute><AmbassadorsAdmin /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><SettingsAdmin /></ProtectedRoute>} />
            <Route path="/admin/blueprint" element={<ProtectedRoute><Blueprint /></ProtectedRoute>} />
            <Route path="/admin/site-docs" element={<ProtectedRoute><SiteDocs /></ProtectedRoute>} />
            <Route path="/admin/seo" element={<ProtectedRoute><SeoDashboard /></ProtectedRoute>} />
            <Route path="/admin/shop-photo-tracker" element={<ProtectedRoute><ShopPhotoTracker /></ProtectedRoute>} />

            {/* Pillar */}
            <Route path="/learn/salsa-bachata-guide" element={<SalsaBachataGuide />} />
            <Route path="/learn/salsa-vs-bachata" element={<SalsaVsBachataPillar />} />
            <Route path="/learn/ultimate-london-salsa-bachata-guide" element={<UltimateLondonGuide />} />
            <Route path="/learn/best-salsa-bachata-nights-london" element={<BestSalsaBachataNightsLondon />} />

            {/* Resources, Glossary, Partner Embed */}
            <Route path="/resources" element={<Resources />} />
            <Route path="/glossary/salsa-bachata" element={<Glossary />} />
            <Route path="/partners/embed-widget" element={<PartnersEmbed />} />
            <Route path="/embed/class-finder" element={<EmbedClassFinder />} />

            {/* Authority & Conversion */}
            <Route path="/latin-friday" element={<LatinFriday />} />
            <Route path="/your-first-class" element={<YourFirstClass />} />
            <Route path="/leave-a-review" element={<LeaveAReview />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
