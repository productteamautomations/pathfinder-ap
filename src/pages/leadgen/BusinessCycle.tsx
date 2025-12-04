import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const slides = [
  {
    title: "Visibility",
    subtitle: "How many people see your advert on Google",
    content: [
      { label: "Keywords They Search", description: "Target the exact terms your customers use" },
      { label: "Their Location", description: "Show ads only in your service area" },
      { label: "Device Type", description: "Optimise for mobile and desktop users" },
      { label: "Time of Day", description: "Appear when customers are most active" },
      { label: "Demographics & Interests", description: "Reach your ideal audience" },
    ],
  },
  {
    title: "Engagement",
    subtitle: "Make your ads impossible to ignore",
    content: [
      { label: "Be Relevant", description: "Match your ad to search intent" },
      { label: "Be Clear", description: "Communicate your value instantly" },
      { label: "Be Tempting", description: "Give them a reason to click" },
      { label: "Example", description: "\"Loft Conversions in Altrincham – Free Quote Today\" Is more enticing than \"Professional Loft Conversions\"" },
    ],
  },
  {
    title: "Conversions",
    subtitle: "Track what happens after someone clicks",
    content: [
      { label: "See Exactly What Happens", description: "Full visibility after each click" },
      { label: "Track Conversions", description: "Know which ads generate enquiries" },
      { label: "Measure ROI", description: "Understand your cost per lead" },
      { label: "Optimise Campaigns", description: "Use real data, not guesswork" },
      { label: "Say Hello", description: "Keep leads warm when a call is missed" },
    ],
  },
  {
    title: "Sales",
    subtitle: "Speed wins deals",
    content: [
      { label: "Respond within 5 minutes", description: "21× more likely to qualify the lead" },
      { label: "Waiting >5 minutes", description: "Reduces your chance by 80%+" },
      { label: "78% of sales", description: "Go to the first responder" },
      { label: "30 minute delay", description: "Makes you 100× less likely to connect" },
      { label: "Missed leads cost", description: "UK businesses £20k–£22k monthly" },
    ],
  },
  {
    title: "Your Setup",
    subtitle: "Getting started",
    content: [
      { label: "Strategic onboarding call", description: "Understand your goals and develop strategy" },
      { label: "Google Ads account setup", description: "New account or optimise existing" },
      { label: "Search campaign creation", description: "Built from scratch" },
      { label: "Responsive Search Ads", description: "Engaging ad copy that converts" },
      { label: "Conversion tracking setup", description: "Enhanced attribution solution" },
      { label: "Say Hello setup", description: "CRM for managing leads" },
      { label: "Campaign launch call", description: "Final review and go live" },
    ],
  },
  {
    title: "On-going Service",
    subtitle: "Continuous improvement",
    content: [
      { label: "Lead Generation Service team", description: "Dedicated support" },
      { label: "Technical team support", description: "Monthly Account optimisations and tracking checks" },
      { label: "Campaign monitoring", description: "Continuous oversight and refinement" },
      { label: "Call attribution dashboard", description: "Track performance data" },
      { label: "Monthly reporting", description: "Detailed campaign performance" },
    ],
  },
];

export default function BusinessCycleLeadGen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      navigate("/pricing/leadgen", { state: location.state });
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;
  const totalSlides = slides.length;

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/product-recommendation/leadgen", { state: location.state })}
        currentStep={5}
        totalSteps={7}
        showProgress
      />

      <div className="flex-1 pt-[73px] px-6 md:px-12 flex items-center justify-center">
        <div className="w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="grid md:grid-cols-2 min-h-[70vh]">
              <div className="p-14 md:p-18 lg:p-24 flex flex-col justify-center bg-gradient-to-br from-white to-muted/20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
                      Google Ads Process
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#173340] leading-tight tracking-tight">
                      {slide.title}
                    </h2>
                    <OrangeAccent />
                    <p className="text-lg text-muted-foreground mt-8 leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <div className="flex gap-1.5 mt-10">
                      {slides.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === currentSlide ? "bg-primary w-6" : "bg-muted w-1.5"
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="p-12 md:p-16 lg:p-20 flex flex-col justify-center bg-muted/30 border-l border-border/20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <div className="mb-8">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Slide</span>
                        <span className="text-2xl font-bold text-foreground">{currentSlide + 1}</span>
                        <span className="text-muted-foreground text-lg">—</span>
                        <span className="text-2xl font-bold text-muted-foreground">{totalSlides}</span>
                      </div>
                    </div>

                    <div className="mb-8">
                      <ul className="space-y-2">
                        {slide.content?.map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border/30"
                          >
                            <span className="text-primary font-bold mt-0.5">•</span>
                            <div className="flex-1">
                              <span className="font-medium text-foreground text-sm">{item.label}</span>
                              {item.description && (
                                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                              )}
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      <Button onClick={nextSlide} className="flex items-center gap-2">
                        {isLastSlide ? "View Pricing" : "Next"}
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
