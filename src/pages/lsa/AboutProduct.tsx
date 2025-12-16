import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Check, AlertTriangle, Lightbulb } from "lucide-react";
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
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <PageHeader 
        onBack={() => navigate("/product-recommendation/lsa", { state: location.state })} 
        currentStep={2} 
        totalSteps={4} 
        showProgress 
        productLabel="LSAs" 
      />

      <div 
        className="flex-1 flex flex-col" 
        style={{ paddingTop: "73px" }}
      >
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="text-center flex-shrink-0 px-8 py-4"
        >
          <h1 className="font-display font-bold text-title tracking-tight text-3xl md:text-4xl lg:text-5xl">
            How Local Service Ads Work
          </h1>
        </motion.div>

        {/* Cards Section */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8 pb-4">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-6 w-full max-w-7xl h-full max-h-[65vh]">
            {/* The Problem Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2, duration: 0.5 }} 
              className="flex-1 border border-border/30 shadow-lg flex flex-col rounded-2xl p-4 md:p-6"
              style={{ backgroundColor: "white" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-500/10 flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <h2 className="font-display font-bold text-title text-xl md:text-2xl">
                  The Problem
                </h2>
              </div>
              
              <div className="flex-1 flex items-center justify-center my-2">
                <img 
                  src={TheProblemImage} 
                  alt="The Problem" 
                  className="max-h-[40vh] md:max-h-[35vh] w-auto object-contain"
                />
              </div>
              
              <p className="text-muted-foreground text-center text-sm md:text-base">
                Wasted budget on clicks, not jobs.<br />
                Wrong areas & lack of trust.
              </p>
            </motion.div>

            {/* The Solution Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 0.5 }} 
              className="flex-1 border border-border/30 shadow-lg flex flex-col rounded-2xl p-4 md:p-6"
              style={{ backgroundColor: "white" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-amber-500/10 flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                </div>
                <h2 className="font-display font-bold text-title text-xl md:text-2xl">
                  The Solution
                </h2>
              </div>
              
              <div className="flex-1 flex items-center justify-center my-2">
                <img 
                  src={TheSolutionImage} 
                  alt="The Solution" 
                  className="max-h-[40vh] md:max-h-[35vh] w-auto object-contain"
                />
              </div>
              
              <p className="text-muted-foreground text-center text-sm md:text-base">
                Top placement on Google.<br />
                Pay only for qualified calls (30+ sec).
              </p>
            </motion.div>

            {/* The Benefit Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4, duration: 0.5 }} 
              className="flex-1 border border-border/30 shadow-lg flex flex-col rounded-2xl p-4 md:p-6"
              style={{ backgroundColor: "white" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-500/10 flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="font-display font-bold text-title text-xl md:text-2xl">
                  The Benefit
                </h2>
              </div>
              
              <div className="flex items-center justify-center mb-3">
                <img 
                  src={TheBenefitImage} 
                  alt="Google Guaranteed" 
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </div>
              
              <div className="flex-1 flex flex-col gap-2 md:gap-3">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={benefit} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.5 + index * 0.1 }} 
                    className="flex items-start gap-2"
                  >
                    <div className="bg-green-500 flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-foreground text-sm md:text-base leading-tight">
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
            className="text-base md:text-lg px-8 py-3"
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
