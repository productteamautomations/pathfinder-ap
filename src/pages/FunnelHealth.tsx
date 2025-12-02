import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { FunnelVisualization } from "@/components/FunnelVisualization";

export default function FunnelHealth() {
  const navigate = useNavigate();
  const location = useLocation();

  // Mock scores - in real app would calculate from diagnostic answers
  const trafficScore = 75;
  const conversionScore = 60;
  const leadScore = 45;
  const overallScore = Math.round((trafficScore + conversionScore + leadScore) / 3);

  const getHealthColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-accent-yellow";
    return "text-secondary";
  };

  const getHealthLabel = (score: number) => {
    if (score >= 70) return "Excellent";
    if (score >= 40) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        onBack={() => navigate(-1)}
        currentStep={5}
        totalSteps={11}
        showProgress
      />

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Your Funnel Health Overview
            </h1>
            <p className="text-muted-foreground mb-8">
              Based on your responses, here's how your marketing funnel is performing
            </p>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 text-center">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Overall Health
                </h3>
                <div
                  className={`text-6xl font-bold mb-2 ${getHealthColor(overallScore)}`}
                >
                  {overallScore}%
                </div>
                <p className={`text-lg font-medium ${getHealthColor(overallScore)}`}>
                  {getHealthLabel(overallScore)}
                </p>
              </Card>

              <Card className="p-6 text-center border-2 border-primary">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                  Traffic Rating
                </h3>
                <div className="text-5xl font-bold text-primary mb-2">
                  {trafficScore}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Your traffic generation is performing well
                </p>
              </Card>

              <Card className="p-6 text-center">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Conversion Rating
                </h3>
                <div className="text-5xl font-bold text-secondary mb-2">
                  {conversionScore}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Room for improvement in conversions
                </p>
              </Card>
            </div>

            <Card className="p-8 mb-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Funnel Visualization
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-primary" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Traffic</span>
                          <span className="text-primary font-bold">{trafficScore}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-secondary" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Conversion</span>
                          <span className="text-secondary font-bold">
                            {conversionScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-accent-yellow" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Lead Management</span>
                          <span className="text-accent-yellow font-bold">{leadScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-80">
                  <FunnelVisualization
                    trafficScore={trafficScore}
                    conversionScore={conversionScore}
                    leadScore={leadScore}
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-center">
              <Button
                onClick={() =>
                  navigate("/product-recommendation", { state: location.state })
                }
                className="px-12"
              >
                See Recommendations
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
