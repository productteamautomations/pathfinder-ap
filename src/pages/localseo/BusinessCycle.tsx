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
    subtitle: "Get found by local customers",
    content: [
      { label: "Relevance", description: "How well your business matches search intent" },
      { label: "Proximity", description: "How close you are to the searcher" },
      { label: "Prominence", description: "How well-known and reputable your business is" },
    ],
  },
  {
    title: "Relevance",
    subtitle: "Match what customers are searching for",
    content: [
      { label: "Content", description: "Quality, relevant content targeting local keywords" },
      { label: "Keywords", description: "Strategic use of location-based search terms" },
      { label: "UX", description: "Fast, mobile-friendly user experience" },
      { label: "Internal/External Links", description: "Strong link profile from local sources" },
      { label: "Schema Markup", description: "Structured data for better search visibility" },
    ],
  },
  {
    title: "Prominence",
    subtitle: "Build your reputation online",
    content: [
      { label: "Being well-known improves rankings", description: "" },
      { label: "More external links", description: "Quality backlinks from authoritative sites" },
      { label: "More reviews", description: "Quantity of customer reviews matters" },
      { label: "Better review scores", description: "Average rating impacts visibility" },
      { label: "Increase reputation", description: "" },
      { label: "Higher map pack ranking", description: "" },
    ],
  },
  {
    title: "Conversions",
    subtitle: "Turn visitors into customers",
    content: [
      { label: "Track what happens after someone clicks", description: "" },
      { label: "Measure ROI", description: "Understand cost per acquisition" },
      { label: "Optimise using real user behaviour", description: "" },
      { label: "Google Search Console", description: "Helps maintain search performance" },
    ],
  },
  {
    title: "Lead Management",
    subtitle: "Respond fast, win more",
    content: [
      { label: "Respond within 5 minutes", description: "21× more likely to qualify" },
      { label: "Waiting >5 minutes", description: "Reduces success by 80%+" },
      { label: "78% of sales", description: "Go to first responder" },
      { label: "Waiting 30 minutes", description: "100× less likely to connect" },
      { label: "Slow responses", description: "Cost UK businesses £20k–£22k monthly" },
    ],
  },
  {
    title: "Product Journey",
    subtitle: "Your path to success",
    timeline: [
      {
        phase: "Welcome Call",
        points: ["First meeting with onboarding team", "Understand goals", "Implement tracking needs", "Website audit & content plan"],
      },
      {
        phase: "Launch Call",
        points: ["Launch newly built campaigns", "Final changes", "Tracking test in real time", "Agree on next steps"],
      },
    ],
  },
  {
    title: "Features",
    subtitle: "Everything included",
    content: [
      { label: "Dedicated Account Manager", description: "" },
      { label: "Monthly performance reporting", description: "" },
      { label: "Advanced AI call tracking", description: "" },
      { label: "In-depth onboarding", description: "" },
      { label: "Full SEO service", description: "Optimisation, content creation, directory submissions" },
    ],
  },
  {
    title: "Your Setup",
    subtitle: "Getting started",
    content: [
      { label: "Strategic onboarding call", description: "" },
      { label: "Installation of all tracking tools", description: "" },
      { label: "Local SEO tracking setup", description: "" },
      { label: "Website audit + content plan", description: "" },
      { label: "Google Business Profile optimisation", description: "" },
      { label: "Campaign launch call", description: "" },
    ],
  },
  {
    title: "On-going Service",
    subtitle: "Continuous improvement",
    content: [
      { label: "Dedicated account manager", description: "" },
      { label: "Monthly on-page optimisation", description: "" },
      { label: "2+ SEO content pages monthly", description: "" },
      { label: "Local SEO dashboard access", description: "" },
      { label: "Monthly review calls", description: "" },
      { label: "Quarterly strategy call", description: "" },
    ],
  },
];

export default function BusinessCycleLocalSEO() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      navigate("/about/localseo", { state: location.state });
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
        onBack={() => navigate("/funnel-health/localseo", { state: location.state })}
        currentStep={4}
        totalSteps={7}
        showProgress
        productLabel="Local SEO"
      />

      <div className="flex-1 pt-[73px] px-4 md:px-8 flex items-center justify-center">
        <div className="w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="grid md:grid-cols-2 h-[82vh] overflow-hidden">
              <div className="p-10 md:p-12 lg:p-14 flex flex-col justify-center bg-gradient-to-br from-white to-muted/20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-base font-semibold text-primary uppercase tracking-wider mb-5 block">
                      Our Process
                    </span>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-title leading-tight tracking-tight">
                      {slide.title}
                    </h2>
                    <OrangeAccent />
                    <p className="text-xl text-muted-foreground mt-10 leading-relaxed">
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

              <div className="p-10 md:p-12 lg:p-14 flex flex-col bg-muted/30 border-l border-border/20 overflow-hidden">
                <div className="flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <div className="mb-10">
                        <div className="flex items-center gap-4">
                          <span className="text-base font-semibold text-primary uppercase tracking-wider">Slide</span>
                          <span className="text-3xl font-bold text-foreground">{currentSlide + 1}</span>
                          <span className="text-muted-foreground text-xl">—</span>
                          <span className="text-3xl font-bold text-muted-foreground">{totalSlides}</span>
                        </div>
                      </div>

                      <div className="flex-1 overflow-hidden">
                        {slide.timeline ? (
                          <div className="space-y-8">
                            {slide.timeline.map((item, idx) => (
                              <div key={idx} className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border/30">
                                <h3 className="text-xl font-bold text-primary mb-4">{item.phase}</h3>
                                <ul className="space-y-3">
                                  {item.points.map((point, pidx) => (
                                    <li key={pidx} className="flex items-start gap-4 text-foreground text-base">
                                      <span className="text-primary mt-0.5">•</span>
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <ul className="space-y-3">
                            {slide.content?.map((item, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border/30"
                              >
                                <span className="text-primary font-bold mt-0.5">•</span>
                                <div className="flex-1">
                                  <span className="font-medium text-foreground text-base">{item.label}</span>
                                  {item.description && (
                                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                  )}
                                </div>
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Fixed navigation buttons - outside AnimatePresence */}
                <div className="flex items-center justify-between pt-4 flex-shrink-0">
                  <Button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    variant="outline"
                    className="flex items-center gap-2 min-w-[120px]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button onClick={nextSlide} className="flex items-center gap-2 min-w-[120px] justify-center">
                    {isLastSlide ? "About Us" : "Next"}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
