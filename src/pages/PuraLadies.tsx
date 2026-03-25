import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";
import puraLadiesImg from "@/assets/pura-ladies.jpg";

const PuraLadies = () => (
  <Layout>
    <SeoHead title="Pura Ladies | Bachata Performance Team London | Melitta Siomos" description="Join Pura Ladies — the all-female Bachata performance team founded by Melitta Siomos in 2017. Teams in London, Plymouth, Munich & Lisbon. Perform at festivals worldwide." path="/pura-ladies" />
    <section className="relative h-72 md:h-96 overflow-hidden">
      <img src={puraLadiesImg} alt="Pura Ladies bachata performance team" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground text-center px-4">Pura Ladies — Performance Teams Across the Globe 🌍</h1>
      </div>
    </section>
    <section className="section-padding section-warm">
      <div className="container-main max-w-3xl">
        <h2 className="font-display text-3xl font-bold mb-3">Our Story</h2>
        <div className="h-1 w-20 bg-primary rounded-full mb-6" />
        <p className="text-muted-foreground leading-relaxed mb-8">Pura Ladies is a Ladies Styling team and troupe founded in London in 2017 by Melitta Siomos. Some of our original team members are still in the team today! Pura Ladies now has 7 teams across 4 cities: London, Plymouth, Munich & Lisbon. Performing is our DNA — built around confidence, sisterhood and stunning Bachata choreography.</p>
        <h2 className="font-display text-2xl font-bold mb-4">How to Join</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { step: "1", title: "Attend Classes", desc: "Build your foundation at regular Pura Nights classes" },
            { step: "2", title: "Express Interest", desc: "Speak to Melitta directly or join our WhatsApp group" },
            { step: "3", title: "Audition", desc: "Assessment for the next intake — all body types, ages welcome" },
          ].map((s, i) => (
            <div key={i} className="bg-card rounded-lg p-6 card-hover text-center">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold mx-auto mb-3">{s.step}</div>
              <h3 className="font-heading font-bold text-sm mb-1">{s.title}</h3>
              <p className="text-muted-foreground text-xs">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/447449482343" target="_blank" rel="noopener noreferrer" className="btn-cta-primary text-sm">💬 Join Free WhatsApp Group</a>
          <Link to="/contact" className="btn-cta-dark text-sm">📧 Enquire About Joining</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default PuraLadies;
