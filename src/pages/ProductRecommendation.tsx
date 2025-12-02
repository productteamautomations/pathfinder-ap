import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Check, MapPin, TrendingUp, Users, Star } from "lucide-react";

const benefits = [
  "Appear in the top 3 Google Map Pack results",
  "Attract customers actively searching in your area",
  "80% higher conversion rates than general searches",
  "Stay ahead of competitors in local rankings",
];

// Illustration component with text content
function LocalSEOIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="space-y-4"
      >
        {/* Card 1 - Map Rankings */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-border/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">Google Map Pack</h4>
              <p className="text-sm text-muted-foreground">Top 3 local results visibility</p>
            </div>
          </div>
        </div>

        {/* Card 2 - Growth Stats */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-border/20 ml-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">+80% Conversions</h4>
              <p className="text-sm text-muted-foreground">Higher than general searches</p>
            </div>
          </div>
        </div>

        {/* Card 3 - Local Customers */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-border/20 ml-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">Local Customers</h4>
              <p className="text-sm text-muted-foreground">Target people searching nearby</p>
            </div>
          </div>
        </div>

        {/* Floating badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-primary shadow-lg flex items-center justify-center"
        >
          <Star className="w-8 h-8 text-white" fill="white" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProductRecommendation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <PageHeader
          onBack={() => navigate(-1)}
          currentStep={6}
          totalSteps={11}
          showProgress
        />

        <div className="flex-1 pt-[73px] flex flex-col px-6 md:px-12 lg:px-20 py-8">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Local SEO
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Why Local SEO is the Right Fit
            </p>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex-1 bg-card rounded-[2rem] p-8 md:p-12 shadow-xl border border-border/30 max-w-6xl mx-auto w-full"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center h-full">
              {/* Left - Content */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Dominate Local Search Results
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Get found by customers in your area when they search for services like yours. 
                  With Local SEO, you'll appear in Google Maps and local search results right when 
                  potential customers need you most.
                </p>

                {/* Benefits List */}
                <div className="space-y-4 mb-10">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => navigate("/business-cycle", { state: location.state })}
                  className="px-8"
                >
                  Learn About Our Process
                </Button>
              </div>

              {/* Right - Illustration */}
              <div className="hidden md:block">
                <LocalSEOIllustration />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}