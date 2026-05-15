import NeighbourhoodPage from "@/components/NeighbourhoodPage";

const SalsaClassesBarnes = () => (
  <NeighbourhoodPage
    config={{
      name: "Barnes",
      postcode: "SW13",
      slug: "salsa-classes-barnes",
      toChiswick: "Barnes Bridge → Chiswick (1 stop, 4 min) or 8-min walk over Barnes Bridge",
      toEaling: "Barnes → Ealing Broadway via Gunnersbury, ~22 min",
      areaIntro: "Barnes might feel like a village tucked into a Thames bend, but you're only a short walk over Barnes Bridge from Chiswick. Our Monday class at the George IV is one of the best 'walk home along the river afterwards' Latin classes in London.",
      localProfile: "Barnes locals at Pura Nights skew towards couples and friend-pairs — the village community vibe means people often hear about us word-of-mouth. We see SW13 retirees rediscovering hobbies, parents on date nights, and Barnes Common runners crossing over for a midweek change of pace.",
      geoQuestion: "Where can I take Salsa classes near Barnes?",
      geoAnswer: "The closest weekly Salsa class to Barnes (SW13) is Pura Nights at the George IV in Chiswick on Mondays — a 4-minute train or pleasant 15-minute walk over Barnes Bridge. We also run Tuesdays in Ealing. No partner needed.",
    }}
  />
);

export default SalsaClassesBarnes;
