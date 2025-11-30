import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "TrainShield saved us hours of manual reporting. Now we can focus on what matters - training our teams.",
    author: "Dr. Rajesh Kumar",
    role: "Director, ATI Gujarat",
  },
  {
    quote: "Now we can see training coverage in real-time across all districts. The insights are invaluable for planning.",
    author: "Priya Menon",
    role: "SDMA Kerala Coordinator",
  },
  {
    quote: "The offline-first approach means our trainers in remote areas never miss documenting a session. Game-changing.",
    author: "Anil Singh",
    role: "Field Trainer, Uttarakhand",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by Partners
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from the institutions strengthening India's disaster preparedness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 sm:p-8 space-y-4">
                <Quote className="w-10 h-10 text-accent/40" />
                <p className="text-foreground text-base sm:text-lg italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
