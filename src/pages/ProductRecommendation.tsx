import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { TopographicBackground } from "@/components/TopographicBackground";
import { Check, ChevronRight } from "lucide-react";

// Orange accent motif component
function OrangeAccent() {
  return (
    <div className="flex items-center gap-2 mt-6">
      <div className="flex gap-1.5">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 - i * 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        ))}
      </div>
      <motion.div
        className="h-[2px] w-16 bg-gradient-to-r from-primary to-transparent rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      />
    </div>
  );
}

const benefits = [
  {
    title: "Increased Visibility",
    description: "Appear in the top 3 Google Map Pack results when customers search for services like yours",
  },
  {
    title: "More Quality Leads",
    description: "Attract customers who are actively searching for your services in your local area",
  },
  {
    title: "Higher Conversion Rates",
    description: "Local searches have 80% higher conversion rates than general searches",
  },
  {
    title: "Competitive Advantage",
    description: "Stay ahead of competitors who aren't optimizing their local presence",
  },
];

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

        {/* Content Area - Split Layout */}
        <div className="flex-1 pt-[73px] px-6 md:px-12 flex items-center justify-center">
          <div className="w-full max-w-6xl">
            {/* Main Card with soft shadow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.06)] overflow-hidden"
            >
              <div className="grid md:grid-cols-2 min-h-[70vh]">
                {/* Left Side - Title Area */}
                <div className="p-12 md:p-16 lg:p-20 flex flex-col justify-center bg-gradient-to-br from-white to-muted/20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
                      Recommendation
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#173340] leading-tight tracking-tight">
                      Why Local SEO is the Right Fit
                    </h2>
                    
                    {/* Orange Accent Motif */}
                    <OrangeAccent />

                    <p className="text-lg text-muted-foreground mt-8 leading-relaxed">
                      Based on your business profile and goals, Local SEO will help you dominate your local market.
                    </p>
                  </motion.div>
                </div>

                {/* Right Side - Benefits */}
                <div className="p-12 md:p-16 lg:p-20 flex flex-col justify-center bg-muted/30 border-l border-border/20">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    {/* Benefits List */}
                    <div className="space-y-4 mb-8">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={benefit.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border/30"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Check className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-foreground mb-1">
                                {benefit.title}
                              </h3>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {benefit.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Continue Button */}
                    <Button
                      onClick={() => navigate("/business-cycle", { state: location.state })}
                      fullWidth
                    >
                      Learn About Our Process
                    </Button>

                    {/* Back Button */}
                    <button
                      onClick={() => navigate(-1)}
                      className="mt-8 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-white border border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all">
                        <ChevronRight className="w-4 h-4 text-foreground rotate-180" />
                      </div>
                      <span className="uppercase tracking-wider">Back</span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
