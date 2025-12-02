import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { GlassCard } from "@/components/GlassCard";
import { TopographicBackground } from "@/components/TopographicBackground";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Visibility",
    content: [
      { label: "Relevance", description: "How well your business matches search intent" },
      { label: "Proximity", description: "How close you are to the searcher" },
      { label: "Prominence", description: "How well-known and reputable your business is" },
    ],
  },
  {
    title: "Relevance",
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
    content: [
      { label: "Being well-known improves rankings", description: "" },
      { label: "More external links", description: "Quality backlinks from authoritative sites" },
      { label: "More reviews", description: "Quantity of customer reviews matters" },
      { label: "Better review scores", description: "Average rating impacts visibility" },
      { label: "Higher reputation → higher map pack ranking", description: "" },
    ],
  },
  {
    title: "Conversions",
    content: [
      { label: "Track what happens after someone clicks", description: "" },
      { label: "Measure ROI", description: "Understand cost per acquisition" },
      { label: "Optimise using real user behaviour", description: "" },
      { label: "Google Search Console", description: "Helps maintain search performance" },
    ],
  },
  {
    title: "Lead Management",
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
    timeline: [
      {
        phase: "Welcome Call",
        points: ["First meeting with onboarding team", "Understand goals", "Implement tracking needs", "Website audit & content plan"],
      },
      {
        phase: "Launch Call",
        points: ["Launch newly built campaigns", "Final changes", "Track test in real time", "Agree next steps"],
      },
    ],
  },
  {
    title: "Features",
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

export default function BusinessCycle() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      navigate("/pricing", { state: location.state });
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <TopographicBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <PageHeader
          onBack={() => navigate(-1)}
          currentStep={7}
          totalSteps={11}
          showProgress
        />

        {/* Content Area */}
        <div className="flex-1 pt-[73px] px-6 flex items-center justify-center">
          <div className="w-full max-w-3xl py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-3xl font-bold text-primary">{slide.title}</h1>
                      <span className="text-sm text-muted-foreground">
                        {currentSlide + 1} / {slides.length}
                      </span>
                    </div>
                  </div>

                  <div className="min-h-[280px] mb-6">
                    {slide.timeline ? (
                      <div className="space-y-6">
                        {slide.timeline.map((item, idx) => (
                          <div key={idx}>
                            <h3 className="text-lg font-bold text-primary mb-3">{item.phase}</h3>
                            <ul className="space-y-2">
                              {item.points.map((point, pidx) => (
                                <li key={pidx} className="flex items-start gap-3 text-foreground text-sm">
                                  <span className="text-primary mt-0.5">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {slide.content?.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/30 transition-colors">
                            <span className="text-primary font-bold mt-0.5">•</span>
                            <div className="flex-1">
                              <span className="font-medium text-foreground text-sm">{item.label}</span>
                              {item.description && (
                                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
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

                    <div className="flex gap-1.5">
                      {slides.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === currentSlide ? "bg-primary w-6" : "bg-muted w-1.5"
                          }`}
                        />
                      ))}
                    </div>

                    <Button onClick={nextSlide} className="flex items-center gap-2">
                      {isLastSlide ? "View Pricing" : "Next"}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
