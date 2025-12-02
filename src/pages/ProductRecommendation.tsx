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
    <div className="min-h-screen bg-background">
      <PageHeader
        onBack={() => navigate(-1)}
        currentStep={6}
        totalSteps={11}
        showProgress
      />

      <div className="pt-24 pb-12 px-6 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4"
              >
                <Check className="w-10 h-10 text-primary" />
              </motion.div>
              <h1 className="text-4xl font-bold text-foreground mb-3">
                Why Local SEO is the Right Fit
              </h1>
              <p className="text-xl text-muted-foreground">
                Based on your business profile and goals
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <Button
                onClick={() => navigate("/business-cycle", { state: location.state })}
                className="px-12"
              >
                Learn About Our Process
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
