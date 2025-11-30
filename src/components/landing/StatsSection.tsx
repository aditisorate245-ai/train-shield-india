import { useEffect, useRef, useState } from "react";
import { Users, Building2, MapPin, CheckCircle2 } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}

const StatCard = ({ icon, value, label, delay = 0 }: StatCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const targetValue = parseInt(value.replace(/[^0-9]/g, ""));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const increment = targetValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, targetValue]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center p-6 sm:p-8 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-border animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 text-accent">
        {icon}
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-primary mb-2 animate-counter">
        {count.toLocaleString()}{value.includes("+") ? "+" : ""}{value.includes("%") ? "%" : ""}
      </div>
      <p className="text-muted-foreground text-center text-sm sm:text-base">{label}</p>
    </div>
  );
};

export const StatsSection = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "35000+",
      label: "Trained Responders",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      value: "120+",
      label: "Partner Institutions",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      value: "28",
      label: "States Connected",
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      value: "98%",
      label: "Verified Attendance",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Impact at Scale
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering India's disaster preparedness through unified training and capacity building
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
