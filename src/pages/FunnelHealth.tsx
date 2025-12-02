import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { GlassCard } from "@/components/GlassCard";
import { TopographicBackground } from "@/components/TopographicBackground";
import { FunnelVisualization } from "@/components/FunnelVisualization";

export default function FunnelHealth() {
  const navigate = useNavigate();
  const location = useLocation();

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
    <div className="min-h-screen relative overflow-hidden">
      <TopographicBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <PageHeader
          onBack={() => navigate(-1)}
          currentStep={5}
          totalSteps={11}
          showProgress
        />

        {/* Fixed Title Section */}
        <div className="fixed top-[73px] left-0 right-0 z-40 px-6 py-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl font-bold text-primary">
                Your Funnel Health Overview
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Based on your responses, here's how your marketing funnel is performing
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 pt-[140px] pb-[100px] px-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <GlassCard className="p-5 text-center">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Overall Health
                  </h3>
                  <div className={`text-4xl font-bold mb-1 ${getHealthColor(overallScore)}`}>
                    {overallScore}%
                  </div>
                  <p className={`text-sm font-medium ${getHealthColor(overallScore)}`}>
                    {getHealthLabel(overallScore)}
                  </p>
                </GlassCard>

                <GlassCard className="p-5 text-center border-2 border-primary">
                  <h3 className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
                    Traffic Rating
                  </h3>
                  <div className="text-4xl font-bold text-primary mb-1">
                    {trafficScore}%
                  </div>
                  <p className="text-xs text-muted-foreground">Performing well</p>
                </GlassCard>

                <GlassCard className="p-5 text-center">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Conversion Rating
                  </h3>
                  <div className="text-4xl font-bold text-secondary mb-1">
                    {conversionScore}%
                  </div>
                  <p className="text-xs text-muted-foreground">Room for improvement</p>
                </GlassCard>
              </div>

              <GlassCard className="p-6">
                <div className="grid lg:grid-cols-2 gap-6 items-center">
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      Funnel Visualization
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <div className="flex-1 flex justify-between items-center">
                          <span className="text-sm font-medium">Traffic</span>
                          <span className="text-primary font-bold">{trafficScore}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-secondary" />
                        <div className="flex-1 flex justify-between items-center">
                          <span className="text-sm font-medium">Conversion</span>
                          <span className="text-secondary font-bold">{conversionScore}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-accent-yellow" />
                        <div className="flex-1 flex justify-between items-center">
                          <span className="text-sm font-medium">Lead Management</span>
                          <span className="text-accent-yellow font-bold">{leadScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-64">
                    <FunnelVisualization
                      trafficScore={trafficScore}
                      conversionScore={conversionScore}
                      leadScore={leadScore}
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* Fixed Button Section */}
        <div className="fixed bottom-0 left-0 right-0 z-40 px-6 py-5">
          <div className="max-w-5xl mx-auto flex justify-center">
            <Button
              onClick={() => navigate("/product-recommendation", { state: location.state })}
              className="px-12"
            >
              See Recommendations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
