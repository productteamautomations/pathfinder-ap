import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LogoGraphic from "@/assets/logo_graphic.svg";
import VisibilityMainImage from "@/assets/visibility-main-image.svg";
import KeywordsIcon from "@/assets/keywords-icon.svg";
import LocationIcon from "@/assets/location-icon.svg";
import DeviceIcon from "@/assets/device-icon.svg";
import TimeIcon from "@/assets/time-icon.svg";
import DemographicsIcon from "@/assets/demographics-icon.svg";

const slides = [
  {
    title: "Visibility",
    subtitle: "Get found by the right customers",
    content: [
      { label: "Keywords They Search", description: "Target the exact terms your customers use", icon: KeywordsIcon },
      { label: "Their Location", description: "Show ads only in your service area", icon: LocationIcon },
      { label: "Device Type", description: "Optimise for mobile and desktop users", icon: DeviceIcon },
      { label: "Time of Day", description: "Appear when customers are most active", icon: TimeIcon },
      { label: "Demographics & Interests", description: "Reach your ideal audience", icon: DemographicsIcon },
    ],
  },
  {
    title: "Engagement",
    subtitle: "Make your ads impossible to ignore",
    content: [
      { label: "Be Relevant", description: "Match your ad to search intent", icon: KeywordsIcon },
      { label: "Be Clear", description: "Communicate your value instantly", icon: LocationIcon },
      { label: "Be Tempting", description: "Give them a reason to click", icon: DeviceIcon },
      {
        label: "Example",
        description:
          '"Loft Conversions in Altrincham – Free Quote Today" Is more enticing than "Professional Loft Conversions"',
        icon: TimeIcon,
      },
    ],
  },
  {
    title: "Conversions",
    subtitle: "Track what happens after someone clicks",
    content: [
      { label: "See Exactly What Happens", description: "Full visibility after each click", icon: KeywordsIcon },
      { label: "Track Conversions", description: "Know which ads generate enquiries", icon: LocationIcon },
      { label: "Measure ROI", description: "Understand your cost per lead", icon: DeviceIcon },
      { label: "Optimise Campaigns", description: "Use real data, not guesswork", icon: TimeIcon },
      { label: "Say Hello", description: "Keep leads warm when a call is missed", icon: DemographicsIcon },
    ],
  },
  {
    title: "Sales",
    subtitle: "Speed wins deals",
    content: [
      { label: "Respond within 5 minutes", description: "21× more likely to qualify the lead", icon: KeywordsIcon },
      { label: "Waiting >5 minutes", description: "Reduces your chance by 80%+", icon: LocationIcon },
      { label: "78% of sales", description: "Go to the first responder", icon: DeviceIcon },
      { label: "30 minute delay", description: "Makes you 100× less likely to connect", icon: TimeIcon },
      { label: "Missed leads cost", description: "UK businesses £20k–£22k monthly", icon: DemographicsIcon },
    ],
  },
  {
    title: "Your Setup",
    subtitle: "Getting started",
    content: [
      {
        label: "Strategic onboarding call",
        description: "Understand your goals and develop strategy",
        icon: KeywordsIcon,
      },
      { label: "Google Ads account setup", description: "New account or optimise existing", icon: LocationIcon },
      { label: "Search campaign creation", description: "Built from scratch", icon: DeviceIcon },
      { label: "Conversion tracking setup", description: "Enhanced attribution solution", icon: TimeIcon },
      { label: "Campaign launch call", description: "Final review and go live", icon: DemographicsIcon },
    ],
  },
  {
    title: "On-going Service",
    subtitle: "Continuous improvement",
    content: [
      { label: "Lead Generation Service team", description: "Dedicated support", icon: KeywordsIcon },
      {
        label: "Technical team support",
        description: "Monthly Account optimisations and tracking checks",
        icon: LocationIcon,
      },
      { label: "Campaign monitoring", description: "Continuous oversight and refinement", icon: DeviceIcon },
      { label: "Call attribution dashboard", description: "Track performance data", icon: TimeIcon },
      { label: "Monthly reporting", description: "Detailed campaign performance", icon: DemographicsIcon },
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
      navigate("/about/leadgen", { state: location.state });
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
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset image loaded state when slide changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentSlide]);

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/funnel-health/leadgen", { state: location.state })}
        currentStep={4}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
      />

      <div
        className="flex-1 pt-[73px] flex items-center justify-center"
        style={{ padding: "clamp(0.75rem, 2vw, 2rem) clamp(1rem, 2vw, 2rem) clamp(0.75rem, 2vw, 2rem)" }}
      >
        <div className="w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2.5rem] shadow-[0_1.25rem_3.75rem_rgba(0,0,0,0.1),0_0.5rem_1.563rem_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="grid md:grid-cols-2 min-h-[82vh] max-h-[90vh]">
              {/* Left side - logo, title, image */}
              <div className="p-[clamp(2rem,4vw,3.5rem)] flex flex-col bg-gradient-to-br from-muted/30 to-muted/50 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-start h-full"
                  >
                    {/* Logo and Title */}
                    <div className="flex items-center gap-[clamp(1rem,2vw,1.25rem)] mb-[clamp(0.75rem,1.5vw,1rem)]">
                      <img
                        src={LogoGraphic}
                        alt="Add People"
                        className="w-[4rem] h-[4rem]"
                        style={{ width: "clamp(3rem, 10vw, 4rem)", height: "clamp(3rem, 10vw, 4rem)" }}
                      />
                      <h2
                        className="font-display font-bold text-title leading-tight tracking-tight"
                        style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
                      >
                        {slide.title}
                      </h2>
                    </div>
                    <p
                      className="text-primary leading-relaxed"
                      style={{
                        fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                        marginTop: "clamp(0.375rem, 0.8vw, 0.5rem)",
                      }}
                    >
                      {slide.subtitle}
                    </p>

                    {/* Orange accent dots */}
                    <div
                      className="flex items-center"
                      style={{ gap: "clamp(0.375rem, 0.8vw, 0.5rem)", marginTop: "clamp(0.75rem, 1.5vw, 1rem)" }}
                    >
                      <div className="flex items-center" style={{ gap: "clamp(0.25rem, 0.5vw, 0.375rem)" }}>
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="rounded-full bg-primary"
                            style={{
                              width: "clamp(0.375rem, 0.8vw, 0.5rem)",
                              height: "clamp(0.375rem, 0.8vw, 0.5rem)",
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 - i * 0.25 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                          />
                        ))}
                        <motion.div
                          className="relative overflow-hidden"
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.4 }}
                          style={{
                            height: "clamp(0.0625rem, 0.15vw, 0.125rem)",
                            width: "clamp(3rem, 6vw, 4rem)",
                            transformOrigin: "left",
                          }}
                        >
                          <div
                            className="absolute inset-0 bg-gradient-to-r from-primary/100 via-primary/50 to-primary/0"
                            style={{
                              clipPath: "polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%)",
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* Main image */}
                    <div
                      className="flex-1 flex items-center justify-center w-full"
                      style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}
                    >
                      <motion.img
                        src={VisibilityMainImage}
                        alt={`${slide.title} - ${slide.subtitle}`}
                        className="w-full h-auto object-contain"
                        style={{ maxHeight: "min(50vh, 30rem)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: imageLoaded ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        onLoad={() => setImageLoaded(true)}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right side - content list */}
              <div className="relative p-[clamp(2rem,4vw,3.5rem)] flex flex-col bg-gradient-to-br from-white to-muted/20 shadow-[-0.5rem_0_1.25rem_-0.313rem_rgba(0,0,0,0.1)] overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <div style={{ marginBottom: "clamp(1.5rem, 3vw, 2rem)" }}>
                      <div className="flex items-center" style={{ gap: "clamp(0.75rem, 1.5vw, 1rem)" }}>
                        <span
                          className="font-semibold text-primary uppercase tracking-wider"
                          style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)" }}
                        >
                          Slide
                        </span>
                        <span
                          className="font-bold text-foreground"
                          style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)" }}
                        >
                          {currentSlide + 1}
                        </span>
                        <span className="text-muted-foreground" style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)" }}>
                          —
                        </span>
                        <span
                          className="font-bold text-muted-foreground"
                          style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)" }}
                        >
                          {totalSlides}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <ul style={{ display: "flex", flexDirection: "column", gap: "clamp(0.5rem, 1vw, 0.75rem)" }}>
                        {slide.content?.map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1, duration: 0.3, ease: "easeOut" }}
                            className="flex bg-white shadow-[0_0.125rem_0.625rem_rgba(0,0,0,0.04)] border border-border/30"
                            style={{
                              gap: "clamp(0.75rem, 1.5vw, 1rem)",
                              padding: item.icon ? "clamp(0.5rem, 1vw, 0.75rem)" : "clamp(0.75rem, 1.5vw, 1rem)",
                              borderRadius: "clamp(0.75rem, 1.5vw, 1rem)",
                              alignItems: item.icon ? "center" : "start",
                            }}
                          >
                            {item.icon ? (
                              <img
                                src={item.icon}
                                alt=""
                                className="flex-shrink-0"
                                style={{
                                  width: "clamp(2.5rem, 5vw, 3rem)",
                                  height: "clamp(2.5rem, 5vw, 3rem)",
                                }}
                              />
                            ) : (
                              <span className="text-primary font-bold mt-[0.125rem]">•</span>
                            )}
                            <div className="flex-1">
                              <span
                                className="font-semibold text-foreground"
                                style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}
                              >
                                {item.label}
                              </span>
                              {item.description && (
                                <p
                                  className="text-muted-foreground"
                                  style={{
                                    fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                                    marginTop: "clamp(0.1875rem, 0.4vw, 0.25rem)",
                                  }}
                                >
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div
                  className="flex items-center justify-between mt-auto"
                  style={{ paddingTop: "clamp(0.75rem, 1.5vw, 1rem)" }}
                >
                  <Button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    variant="outline"
                    className="flex items-center"
                    style={{ gap: "clamp(0.375rem, 0.8vw, 0.5rem)" }}
                  >
                    <ChevronLeft
                      style={{ width: "clamp(0.875rem, 1.5vw, 1rem)", height: "clamp(0.875rem, 1.5vw, 1rem)" }}
                    />
                    Previous
                  </Button>

                  {/* Dot Progress Indicator */}
                  <div className="flex items-center" style={{ gap: "clamp(0.375rem, 0.8vw, 0.5rem)" }}>
                    {slides.map((_, index) => (
                      <div
                        key={index}
                        className="rounded-full transition-all duration-300"
                        style={{
                          height: "clamp(0.375rem, 0.8vw, 0.5rem)",
                          width:
                            index === currentSlide
                              ? "clamp(1.125rem, 2.4vw, 1.5rem)"
                              : "clamp(0.375rem, 0.8vw, 0.5rem)",
                          backgroundColor:
                            index === currentSlide
                              ? "var(--accent)"
                              : "rgba(var(--muted-foreground-rgb, 0, 0, 0), 0.3)",
                        }}
                      />
                    ))}
                  </div>

                  <Button
                    onClick={nextSlide}
                    className="flex items-center"
                    style={{ gap: "clamp(0.375rem, 0.8vw, 0.5rem)" }}
                  >
                    {isLastSlide ? "About Us" : "Next"}
                    <ChevronRight
                      style={{ width: "clamp(0.875rem, 1.5vw, 1rem)", height: "clamp(0.875rem, 1.5vw, 1rem)" }}
                    />
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
