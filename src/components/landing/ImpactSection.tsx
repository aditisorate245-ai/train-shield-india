import impactVisual from "@/assets/impact-visual.jpg";
import { CheckCircle } from "lucide-react";

export const ImpactSection = () => {
  const improvements = [
    "Real-time visibility across all 28 states",
    "98% reduction in manual reporting time",
    "Unified partner coordination",
    "Instant certificate generation",
    "Location-verified authenticity",
    "Automated compliance tracking",
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Transforming Disaster Preparedness
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            From fragmented systems to unified intelligence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Visual */}
          <div className="order-2 lg:order-1 animate-fade-in">
            <img
              src={impactVisual}
              alt="TrainShield Impact - Before and After"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Before TrainShield
              </h3>
              <p className="text-muted-foreground text-lg">
                Siloed data, manual reports, delayed insights, and fragmented coordination across partners and states.
              </p>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-primary">
                After TrainShield
              </h3>
              <ul className="space-y-3">
                {improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-success shrink-0 mt-0.5" />
                    <span className="text-foreground text-lg">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
