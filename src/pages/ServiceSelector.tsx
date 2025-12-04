import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { MapPin, MousePointerClick, BadgeCheck } from "lucide-react";

const services = [
  {
    id: "localseo",
    title: "Local SEO",
    description: "Dominate Google Maps and local search results",
    icon: MapPin,
    path: "/product-recommendation/localseo",
  },
  {
    id: "leadgen",
    title: "Lead Generation",
    description: "Sponsored links in Google Search",
    icon: MousePointerClick,
    path: "/product-recommendation/leadgen",
  },
  {
    id: "lsa",
    title: "Local Services Ads",
    description: "Google Guaranteed badge for trusted businesses",
    icon: BadgeCheck,
    path: "/product-recommendation/lsa",
  },
];

export default function ServiceSelector() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/funnel-health", { state: location.state })}
        currentStep={4}
        totalSteps={7}
        showProgress
      />

      <div className="flex-1 pt-[73px] flex flex-col">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center px-6 py-10 md:py-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Choose Your</span>{" "}
            <span className="text-primary">Service</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Select the solution that best fits your business needs
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="flex-1 px-6 md:px-12 lg:px-20 pb-12">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                onClick={() => navigate(service.path, { state: location.state })}
                className="bg-white rounded-[2rem] p-12 shadow-lg border border-border/30 hover:border-primary/50 hover:shadow-xl transition-all text-left group"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-10 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {service.description}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
