import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Check } from "lucide-react";

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
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader
        onBack={() => navigate(-1)}
        currentStep={6}
        totalSteps={11}
        showProgress
      />

      {/* Fixed Title Section */}
      <div className="fixed top-[73px] left-0 right-0 bg-background z-40 border-b border-border/50 px-6 py-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-foreground">
              Why Local SEO is the Right Fit
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Based on your business profile and goals
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 pt-[145px] pb-[88px] px-6 overflow-y-auto flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fixed Button Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-background z-40 border-t border-border/50 px-6 py-5">
        <div className="max-w-4xl mx-auto flex justify-center">
          <Button
            onClick={() => navigate("/business-cycle", { state: location.state })}
            className="px-12"
          >
            Learn About Our Process
          </Button>
        </div>
      </div>
    </div>
  );
}
