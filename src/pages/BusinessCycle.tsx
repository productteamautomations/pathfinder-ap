import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
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
      { label: "75% of businesses", description: "Never call leads back" },
      { label: "Missed leads", description: "Rarely return" },
    ],
  },
  {
    title: "Product Journey",
    timeline: [
      {
        phase: "Welcome Call",
        points: [
          "First meeting with onboarding team",
          "Understand goals",
          "Implement tracking needs",
          "Website audit & content plan",
          "Q&A opportunity",
        ],
      },
      {
        phase: "Launch Call",
        points: [
          "Launch newly built campaigns",
          "Final changes",
          "Track test in real time",
          "Agree next steps",
        ],
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
      { label: "Full SEO service", description: "Optimisation, content creation, directory submissions, GBP updates" },
    ],
  },
  {
    title: "Your Setup",
    content: [
      { label: "Strategic onboarding call", description: "" },
      { label: "Installation of all tracking tools", description: "" },
      { label: "Local SEO tracking setup", description: "" },
      { label: "Say Hello setup", description: "" },
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
      { label: "Keyword + competitor research", description: "" },
      { label: "2+ SEO content pages monthly", description: "" },
      { label: "Local SEO dashboard access", description: "" },
      { label: "Monthly directory submissions", description: "" },
      { label: "Monthly GBP updates", description: "" },
      { label: "Monthly review calls", description: "" },
      { label: "Quarterly strategy call", description: "" },
      { label: "Call & form reporting", description: "" },
      { label: "Keyword traffic reporting", description: "With Google Ads" },
      { label: "Enhanced call attribution dashboard", description: "" },
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
    <div className="min-h-screen bg-background">
      <PageHeader
        onBack={() => navigate(-1)}
        currentStep={7}
        totalSteps={11}
        showProgress
      />

      <div className="pt-24 pb-12 px-6 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-4xl font-bold text-foreground">{slide.title}</h1>
                    <span className="text-sm text-muted-foreground">
                      {currentSlide + 1} / {slides.length}
                    </span>
                  </div>
                </div>

                <div className="min-h-[400px] mb-8">
                  {slide.timeline ? (
                    <div className="space-y-8">
                      {slide.timeline.map((item, idx) => (
                        <div key={idx}>
                          <h3 className="text-xl font-bold text-primary mb-4">
                            {item.phase}
                          </h3>
                          <ul className="space-y-2">
                            {item.points.map((point, pidx) => (
                              <li
                                key={pidx}
                                className="flex items-start gap-3 text-foreground"
                              >
                                <span className="text-primary mt-1">•</span>
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
                        <li
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <span className="text-primary font-bold mt-1">•</span>
                          <div className="flex-1">
                            <span className="font-semibold text-foreground">
                              {item.label}
                            </span>
                            {item.description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.description}
                              </p>
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

                  <div className="flex gap-2">
                    {slides.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentSlide
                            ? "bg-primary w-8"
                            : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>

                  <Button onClick={nextSlide} className="flex items-center gap-2">
                    {isLastSlide ? "View Pricing" : "Next"}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
