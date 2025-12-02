import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Check, MapPin, TrendingUp, Users } from "lucide-react";

const benefits = [
  "Appear in the top 3 Google Map Pack results",
  "Attract customers actively searching in your area",
  "80% higher conversion rates than general searches",
  "Stay ahead of competitors in local rankings",
];

function LocalSEOIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative"
      >
        {/* Card 1 - Map pin */}
        <div className="bg-card rounded-2xl p-5 shadow-lg border border-border/20 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="h-3 bg-primary/60 rounded-full w-4/5 mb-2" />
              <div className="h-2 bg-muted rounded-full w-2/3" />
            </div>
          </div>
        </div>

        {/* Card 2 - Trending */}
        <div className="bg-card rounded-2xl p-5 shadow-lg border border-border/20 mb-4 ml-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="h-3 bg-green-500/60 rounded-full w-3/4 mb-2" />
              <div className="h-2 bg-muted rounded-full w-1/2" />
            </div>
          </div>
        </div>

        {/* Card 3 - Users */}
        <div className="bg-card rounded-2xl p-5 shadow-lg border border-border/20 ml-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="h-3 bg-muted rounded-full w-full mb-2" />
              <div className="h-2 bg-muted rounded-full w-3/5" />
            </div>
          </div>
        </div>

        {/* Floating badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-green-500 shadow-xl flex items-center justify-center"
        >
          <Check className="w-8 h-8 text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProductRecommendation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageHeader
        onBack={() => navigate(-1)}
        currentStep={6}
        totalSteps={11}
        showProgress
      />

      <div className="flex-1 flex flex-col pt-[73px]">
        {/* Hero Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center px-6 py-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Local SEO
          </h1>
          <p className="text-lg text-muted-foreground mt-3">
            Why Local SEO is the Right Fit
          </p>
        </motion.div>

        {/* Main Content Section */}
        <div className="flex-1 px-6 md:px-12 lg:px-20 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-primary/5 rounded-[2rem] p-8 md:p-12 lg:p-16 h-full"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center h-full">
              {/* Left - Content */}
              <div className="flex flex-col justify-center">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/30 shadow-sm mb-6 w-fit"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Local SEO</span>
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Dominate Local Search Results
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Get found by customers in your area when they search for services like yours. 
                  With Local SEO, you'll appear in Google Maps and local search results right when 
                  potential customers need you most.
                </p>

                {/* Benefits List */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-sm font-semibold text-foreground">
                    Benefits of Local SEO:
                  </h3>
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-foreground text-sm">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => navigate("/business-cycle", { state: location.state })}
                  className="w-fit"
                >
                  Learn About Our Process
                </Button>
              </div>

              {/* Right - Illustration */}
              <div className="hidden md:flex items-center justify-center">
                <LocalSEOIllustration />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
