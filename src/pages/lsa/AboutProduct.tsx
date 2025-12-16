import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Check, AlertTriangle, Lightbulb } from "lucide-react";
import { TopographicBackground } from "@/components/TopographicBackground";
import TheProblemImage from "@/assets/lsa-the-problem.svg";
import TheSolutionImage from "@/assets/lsa-the-solution.svg";
import TheBenefitImage from "@/assets/lsa-the-benefit.svg";

const benefits = [
  "More ready-to-book customers",
  "Zero wasted spend on irrelevant clicks",
  "Jobs only from your chosen service areas",
  "The Google Guaranteed badge builds instant trust",
  "Higher-quality leads and more booked work"
];

export default function AboutProductLSA() {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background relative">
      <TopographicBackground />
      <PageHeader 
        onBack={() => navigate("/product-recommendation/lsa", { state: location.state })} 
        currentStep={2} 
        totalSteps={4} 
        showProgress 
        productLabel="LSAs" 
      />

      <div 
        className="flex-1 flex flex-col relative z-10" 
        style={{ paddingTop: "73px" }}
      >
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="text-center flex-shrink-0 px-8 py-4"
        >
          <h1 className="font-display font-bold text-title tracking-tight text-5xl md:text-6xl lg:text-7xl">
            How Local Service Ads Work
          </h1>
        </motion.div>

        {/* Cards Section */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8 pb-2 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-5 w-full max-w-7xl max-h-full">
            {/* The Problem Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2, duration: 0.5 }} 
              className="flex-1 border border-border/30 shadow-lg flex flex-col rounded-2xl p-4 md:p-5 bg-white"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="bg-red-500/10 flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <h2 className="font-display font-bold text-title text-2xl md:text-3xl">
                  The Problem
                </h2>
              </div>
              
              <div className="flex-1 flex items-center justify-center my-1">
                <img 
                  src={TheProblemImage} 
                  alt="The Problem" 
                  className="max-h-[42vh] w-auto object-contain"
                />
              </div>
              
              <p className="text-foreground text-center text-base md:text-lg font-medium">
                Wasted budget on clicks, not jobs.<br />
                Wrong areas & lack of trust.
              </p>
            </motion.div>

            {/* The Solution Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 0.5 }} 
              className="flex-1 border border-border/30 shadow-lg flex flex-col rounded-2xl p-4 md:p-5 bg-white"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="bg-amber-500/10 flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                </div>
                <h2 className="font-display font-bold text-title text-2xl md:text-3xl">
                  The Solution
                </h2>
              </div>
              
              <div className="flex-1 flex items-center justify-center my-1">
                <img 
                  src={TheSolutionImage} 
                  alt="The Solution" 
                  className="max-h-[42vh] w-auto object-contain"
                />
              </div>
              
              <p className="text-foreground text-center text-base md:text-lg font-medium">
                Top placement on Google.<br />
                Pay only for qualified calls (30+ sec).
              </p>
            </motion.div>

            {/* The Benefit Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4, duration: 0.5 }} 
              className="flex-1 border border-border/30 shadow-lg flex flex-col rounded-2xl p-4 md:p-5 bg-white"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="bg-green-500/10 flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="font-display font-bold text-title text-2xl md:text-3xl">
                  The Benefit
                </h2>
              </div>
              
              <div className="flex items-center justify-center mb-2">
                <img 
                  src={TheBenefitImage} 
                  alt="Google Guaranteed" 
                  className="h-20 md:h-24 w-auto object-contain"
                />
              </div>
              
              <div className="flex-1 flex flex-col gap-2">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={benefit} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.5 + index * 0.1 }} 
                    className="flex items-start gap-2"
                  >
                    <div className="bg-green-500 flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-full mt-0.5">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-foreground text-base md:text-lg leading-tight">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Continue Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.8, duration: 0.4 }} 
          className="flex justify-center flex-shrink-0 py-4 md:py-6"
        >
          <Button 
            onClick={() => navigate("/about/lsa", { state: location.state })} 
            className="text-lg md:text-xl px-10 py-4"
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
