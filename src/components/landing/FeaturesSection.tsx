import { Database, Smartphone, MapPinned, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <Database className="w-10 h-10" />,
    title: "Centralized Training Data",
    description: "All programs under one secure platform with real-time synchronization across states and institutions.",
  },
  {
    icon: <Smartphone className="w-10 h-10" />,
    title: "Offline-first Mobile App",
    description: "Works seamlessly even in remote areas without connectivity, ensuring no training goes unrecorded.",
  },
  {
    icon: <MapPinned className="w-10 h-10" />,
    title: "Geo-verified Attendance",
    description: "Location-based authenticity checks ensure genuine participation and accurate reporting.",
  },
  {
    icon: <Award className="w-10 h-10" />,
    title: "Automated Certificates",
    description: "Smart, QR-verifiable certificates generated instantly upon training completion.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for scale, security, and seamless disaster preparedness management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-accent/50 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-4 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl sm:text-2xl text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base sm:text-lg text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
