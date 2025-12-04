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

function LocalSEOIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative"
      >
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-border/20 mb-4">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-foreground">Google Business Profile</p>
              <p className="text-sm text-muted-foreground">Optimized & Verified</p>
            </div>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-border/20 mb-4 ml-6">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-foreground">Local Rankings</p>
              <p className="text-sm text-muted-foreground">+156% visibility increase</p>
            </div>
            <span className="text-sm font-bold text-green-500 bg-green-50 px-3 py-1.5 rounded-full">Top 3</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-border/20 ml-3">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-foreground">Customer Reach</p>
              <p className="text-sm text-muted-foreground">2.4k monthly searches</p>
            </div>
            <span className="text-sm font-bold text-blue-500 bg-blue-50 px-3 py-1.5 rounded-full">Local</span>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-green-500 shadow-lg flex items-center justify-center"
        >
          <Check className="w-8 h-8 text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProductRecommendationLocalSEO() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader onBack={() => navigate("/funnel-health", { state: location.state })} currentStep={4} totalSteps={7} showProgress />

      <div className="flex-1 pt-[73px] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center px-6 py-10 md:py-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Local SEO</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Why Local SEO is the <span className="text-primary font-semibold">Right Fit</span> for you.
          </p>
        </motion.div>

        <div className="flex-1 px-6 md:px-12 lg:px-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-[2rem] p-8 md:p-12 lg:p-14 max-w-6xl mx-auto shadow-lg border border-border/30"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Stay Ahead Of Competitors In Local Search Rankings
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Get found by customers in your area when they search for services like yours. With Local SEO, you'll
                  appear in Google Maps and local search results right when potential customers need you most.
                </p>

                <div className="space-y-4 mb-10">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
                      <span className="text-foreground text-sm">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <Button
                  onClick={() => navigate("/business-cycle/localseo", { state: location.state })}
                  className="px-8"
                >
                  Learn About Our Process
                </Button>
              </div>

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
