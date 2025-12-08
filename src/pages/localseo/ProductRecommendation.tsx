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
    <div className="relative w-full max-w-sm mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative"
      >
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-border/20 mb-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Google Business Profile</p>
              <p className="text-xs text-muted-foreground">Optimized & Verified</p>
            </div>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-lg border border-border/20 mb-3 ml-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Local Rankings</p>
              <p className="text-xs text-muted-foreground">+156% visibility increase</p>
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">Top 3</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-lg border border-border/20 ml-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Customer Reach</p>
              <p className="text-xs text-muted-foreground">2.4k monthly searches</p>
            </div>
            <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full">Local</span>
          </div>
        </div>

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

export default function ProductRecommendationLocalSEO() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/fact-finder", { state: location.state })}
        currentStep={3}
        totalSteps={7}
        showProgress
        productLabel="Local SEO"
      />

      <div className="flex-1 pt-[73px] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center px-6 py-6 md:py-8"
        >
          <h1 className="text-[57px] font-bold text-title font-display leading-tight">Local SEO</h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Why Local SEO is the <span className="text-green-600 font-semibold">Right Fit</span> for you.
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
                <h2 className="text-[35px] font-bold text-title font-display leading-tight mb-4">
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
                  onClick={() => navigate("/funnel-diagnostic/localseo", { state: location.state })}
                  className="px-8"
                >
                  Start Your Assessment
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
