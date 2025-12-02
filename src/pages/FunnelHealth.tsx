import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { TopographicBackground } from "@/components/TopographicBackground";
import { FunnelVisualization } from "@/components/FunnelVisualization";
import { ChevronRight } from "lucide-react";

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
    <div className="min-h-screen relative overflow-hidden bg-background">
      <TopographicBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <PageHeader
          onBack={() => navigate(-1)}
          currentStep={5}
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
                {/* Left Side - Results Overview */}
                <div className="p-12 md:p-16 lg:p-20 flex flex-col justify-center bg-gradient-to-br from-white to-muted/20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
                      Results
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#173340] leading-tight tracking-tight">
                      Your Funnel Health Overview
                    </h2>
                    
                    {/* Orange Accent Motif */}
                    <OrangeAccent />

                    {/* Score Cards */}
                    <div className="grid grid-cols-3 gap-4 mt-10">
                      <div className="text-center p-4 bg-muted/30 rounded-2xl">
                        <div className={`text-3xl font-bold ${getHealthColor(trafficScore)}`}>
                          {trafficScore}%
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Traffic</p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-2xl">
                        <div className={`text-3xl font-bold ${getHealthColor(conversionScore)}`}>
                          {conversionScore}%
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Conversion</p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-2xl">
                        <div className={`text-3xl font-bold ${getHealthColor(leadScore)}`}>
                          {leadScore}%
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Leads</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Side - Visualization */}
                <div className="p-12 md:p-16 lg:p-20 flex flex-col justify-center bg-muted/30 border-l border-border/20">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    {/* Overall Score */}
                    <div className="mb-8 text-center">
                      <div className={`text-6xl font-bold ${getHealthColor(overallScore)}`}>
                        {overallScore}%
                      </div>
                      <p className={`text-lg font-medium mt-2 ${getHealthColor(overallScore)}`}>
                        {getHealthLabel(overallScore)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">Overall Health Score</p>
                    </div>

                    {/* Funnel Visualization */}
                    <div className="h-48 mb-8">
                      <FunnelVisualization
                        trafficScore={trafficScore}
                        conversionScore={conversionScore}
                        leadScore={leadScore}
                      />
                    </div>

                    {/* Continue Button */}
                    <Button
                      onClick={() => navigate("/product-recommendation", { state: location.state })}
                      fullWidth
                    >
                      See Recommendations
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
