import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { TopographicBackground } from "@/components/TopographicBackground";
import { Check, MapPin, TrendingUp, Users, Target } from "lucide-react";

const benefits = [
  "Appear in the top 3 Google Map Pack results",
  "Attract customers actively searching in your area",
  "80% higher conversion rates than general searches",
  "Stay ahead of competitors in local rankings",
];

// Illustration component mimicking the reference style
function LocalSEOIllustration() {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Main card stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative"
      >
        {/* Card 1 - Map pin */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-border/20 mb-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="h-2.5 bg-muted rounded-full w-3/4 mb-2" />
              <div className="h-2 bg-muted/60 rounded-full w-1/2" />
            </div>
          </div>
        </div>

        {/* Card 2 - Trending */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-border/20 mb-3 ml-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <div className="h-2.5 bg-muted rounded-full w-2/3 mb-2" />
              <div className="h-2 bg-muted/60 rounded-full w-2/5" />
            </div>
          </div>
        </div>

        {/* Card 3 - Users */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-border/20 ml-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="h-2.5 bg-muted rounded-full w-4/5 mb-2" />
              <div className="h-2 bg-muted/60 rounded-full w-3/5" />
            </div>
          </div>
        </div>

        {/* Floating badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-green-500 shadow-lg flex items-center justify-center"
        >
          <Check className="w-7 h-7 text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProductRecommendation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <TopographicBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <PageHeader
          onBack={() => navigate(-1)}
          currentStep={6}
          totalSteps={11}
          showProgress
        />

        {/* Full Page Content */}
        <div className="flex-1 pt-[73px] flex flex-col">
          {/* Hero Section - Centered Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center px-6 py-12 md:py-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight max-w-4xl mx-auto">
              Why Local SEO is the Right Fit
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
              Based on your business profile and goals, Local SEO will help you dominate your local market and attract more customers.
            </p>
          </motion.div>

          {/* Feature Section */}
          <div className="flex-1 px-6 md:px-12 lg:px-20 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-muted/40 rounded-[2.5rem] p-8 md:p-12 lg:p-16 max-w-6xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left - Content */}
                <div>
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border/30 shadow-sm mb-6"
                  >
                    <Target className="w-4 h-4 text-primary" />
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
                  <div className="space-y-4 mb-10">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                      Key Benefits:
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
    </div>
  );
}
