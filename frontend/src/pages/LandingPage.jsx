import React from "react";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="bg-secondary min-h-screen font-sans text-text-dark">

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">

              <h1 className="text-primary text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
                Organize work, <br />
                <span className="text-buttonColor">simplify life.</span>
              </h1>

              <p className="text-text-muted text-lg lg:text-xl mb-10 max-w-xl mx-auto lg:mx-0">
                The minimalist task management system designed for high-performance teams.
                Track progress, manage deadlines, and hit your goals with ease.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-buttonColor hover:bg-buttonHover text-primary px-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition-transform hover:-translate-y-1 active:scale-95">
                  Get Started for Free
                </button>
                <button className="bg-white border-2 border-border hover:border-buttonColor text-primary px-8 py-4 rounded-2xl font-bold text-lg shadow-sm transition-transform hover:-translate-y-1">
                  View Demo
                </button>
              </div>
            </div>

            {/* Right: Dashboard Mockup Placeholder */}
            <div className="flex-1 w-full max-w-2xl">
              <div className="bg-primary rounded-3xl shadow-2xl p-6 aspect-video relative overflow-hidden">
                <div className="w-full h-full bg-primary-hover rounded-xl flex items-center justify-center border border-white/10">
                  <div className="text-white/20 text-sm italic">[ App Interface Screenshot Placeholder ]</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-secondary py-24">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-primary text-4xl font-extrabold mb-4">Everything you need to ship faster</h2>
            <div className="w-24 h-1.5 bg-buttonColor mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature Card */}
            {[
              {
                title: "Smart Scheduling",
                desc: "Automated task prioritization based on your deadlines and workload capacity.",
              },
              {
                title: "Team Collaboration",
                desc: "Real-time comments, file sharing, and activity feeds to keep everyone in sync.",
              },
              {
                title: "Instant Reporting",
                desc: "Beautifully visualized data to track your team's velocity and project health.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border border-border hover:border-buttonColor transition-all bg-card-bg shadow-sm hover:shadow-lg group"
              >
                <div className="w-12 h-12 bg-secondary rounded-lg mb-6 flex items-center justify-center group-hover:bg-buttonColor/20 transition-colors">
                  <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
                </div>
                <h3 className="text-primary text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-text-muted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <div className="bg-primary rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
            {/* Background decorative element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-buttonColor/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <h2 className="text-white text-3xl lg:text-5xl font-extrabold mb-8 relative z-10">
              Ready to master your workflow?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Join over 10,000+ teams who use Taskly to deliver projects on time. No credit card required.
            </p>
            <button className="bg-buttonColor hover:bg-buttonHover text-primary px-10 py-4 rounded-2xl font-bold text-lg shadow-xl transition-transform hover:-translate-y-1 active:scale-95 relative z-10">
              Start Your 14-Day Free Trial
            </button>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
};

export default LandingPage;
