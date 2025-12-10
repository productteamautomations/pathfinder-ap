import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LogoGraphic from "@/assets/logo_graphic.svg";
import VisibilityMainImage from "@/assets/visibility-main-image.svg";
import EngagementMainImage from "@/assets/engagement-main.svg";
import ConversionsMainImage from "@/assets/conversions-main.svg";
import SalesMainImage from "@/assets/sales-main.svg";
import YourSetupMainImage from "@/assets/your-setup-main.svg";
import KeywordsIcon from "@/assets/keywords-icon.svg";
import LocationIcon from "@/assets/location-icon.svg";
import DeviceIcon from "@/assets/device-icon.svg";
import TimeIcon from "@/assets/time-icon.svg";
import DemographicsIcon from "@/assets/demographics-icon.svg";
import EngagementIcon from "@/assets/engagement-icon.svg";
import SeeExactlyIcon from "@/assets/see-exactly-icon.svg";
import TrackConversionsIcon from "@/assets/track-conversions-icon.svg";
import MeasureIcon from "@/assets/measure-icon.svg";
import OptimiseIcon from "@/assets/optimise-icon.svg";
import SayHelloIcon from "@/assets/say-hello-icon.svg";
import SalesRespondIcon from "@/assets/sales-respond-icon.svg";
import SalesWaitingIcon from "@/assets/sales-waiting-icon.svg";
import Sales78PercentIcon from "@/assets/sales-78percent-icon.svg";
import Sales30MinIcon from "@/assets/sales-30min-icon.svg";
import SalesMissedIcon from "@/assets/sales-missed-icon.svg";
import YourSetupIcon from "@/assets/your-setup-icon.svg";

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
    mainImage: EngagementMainImage,
    content: [
      { label: "Be Relevant", description: "Match your ad to search intent", icon: EngagementIcon },
      { label: "Be Clear", description: "Communicate your value instantly", icon: EngagementIcon },
      { label: "Be Tempting", description: "Give them a reason to click", icon: EngagementIcon },
      {
        label: "Example",
        isExample: true,
      },
    ],
  },
  {
    title: "Conversions",
    subtitle: "Track what happens after someone clicks",
    mainImage: ConversionsMainImage,
    content: [
      { label: "See Exactly What Happens", description: "Full visibility after each click", icon: SeeExactlyIcon },
      { label: "Track Conversions", description: "Know which ads generate enquiries", icon: TrackConversionsIcon },
      { label: "Measure ROI", description: "Understand your cost per lead", icon: MeasureIcon },
      { label: "Optimise Campaigns", description: "Use real data, not guesswork", icon: OptimiseIcon },
      { label: "Say Hello", description: "Keep leads warm when a call is missed", icon: SayHelloIcon },
    ],
  },
  {
    title: "Lead Management",
    subtitle: "Speed wins deals",
    mainImage: SalesMainImage,
    content: [
      { label: "Respond within 5 minutes", description: "21× more likely to qualify the lead", icon: SalesRespondIcon },
      { label: "Waiting >5 minutes", description: "Reduces your chance by 80%+", icon: SalesWaitingIcon },
      { label: "78% of sales", description: "Go to the first responder", icon: Sales78PercentIcon },
      { label: "30 minute delay", description: "Makes you 100× less likely to connect", icon: Sales30MinIcon },
      { label: "Missed leads cost", description: "UK businesses £20k–£22k monthly", icon: SalesMissedIcon },
    ],
  },
  {
    title: "Your Setup",
    subtitle: "Getting started",
    mainImage: YourSetupMainImage,
    content: [
      {
        label: "Strategic onboarding call",
        description: "Understand your goals and develop strategy",
        icon: YourSetupIcon,
      },
      { label: "Google Ads account setup", description: "New account or optimise existing", icon: YourSetupIcon },
      { label: "Search campaign creation", description: "Built from scratch", icon: YourSetupIcon },
      { label: "Conversion tracking setup", description: "Enhanced attribution solution", icon: YourSetupIcon },
      { label: "Campaign launch call", description: "Final review and go live", icon: YourSetupIcon },
    ],
  },
  {
    title: "Ongoing Service",
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [iconLoaded, setIconLoaded] = useState(false);

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

  // Reset loaded states when slide changes
  useEffect(() => {
    setImageLoaded(false);
    setIconLoaded(false);
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

      <div className="flex-1 pt-[73px] px-4 md:px-8 flex items-center justify-center">
        <div className="w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="grid md:grid-cols-2 h-[82vh] overflow-hidden">
              {/* Left side - logo, title, image */}
              <div className="p-10 md:p-12 lg:p-14 flex flex-col bg-gradient-to-br from-muted/30 to-muted/50">
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
                    <div className="flex items-center gap-5 mb-4">
                      <motion.img
                        src={LogoGraphic}
                        alt="Add People"
                        className="w-16 h-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: iconLoaded ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        onLoad={() => setIconLoaded(true)}
                      />
                      <h2 className={`font-display font-bold text-title leading-tight tracking-tight ${
                        slide.title === "Lead Management" ? "text-5xl md:text-5xl" : "text-7xl md:text-7xl"
                      }`}>
                        {slide.title}
                      </h2>
                    </div>
                    <p className="text-lg text-primary mt-2 leading-relaxed">{slide.subtitle}</p>

                    {/* Orange accent dots */}
                    <div className="flex items-center gap-2 mt-4">
                      <div className="flex items-center gap-1.5">
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-primary"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 - i * 0.25 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                          />
                        ))}
                        <motion.div
                          className="relative h-0.5 w-16 overflow-hidden"
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.4 }}
                          style={{ transformOrigin: "left" }}
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
                    <div className="flex-1 flex items-end justify-center w-full overflow-visible">
                      <motion.img
                        src={slide.mainImage || VisibilityMainImage}
                        alt={`${slide.title} - ${slide.subtitle}`}
                        className={`w-[95%] h-auto max-h-[65vh] object-contain ${
                          slide.title === "Lead Management" ? "mb-[-40px]" : "mb-[-14px]"
                        }`}
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
              <div className="relative p-10 md:p-12 lg:p-14 flex flex-col overflow-hidden bg-gradient-to-br from-white to-muted/20 shadow-[-8px_0_20px_-5px_rgba(0,0,0,0.1)]">
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
                      <div className="mb-8">
                        <div className="flex items-center gap-4">
                          <span className="text-base font-semibold text-primary uppercase tracking-wider">Slide</span>
                          <span className="text-3xl font-bold text-foreground">{currentSlide + 1}</span>
                          <span className="text-muted-foreground text-xl">—</span>
                          <span className="text-3xl font-bold text-muted-foreground">{totalSlides}</span>
                        </div>
                      </div>

                      <div className="flex-1 overflow-hidden">
                        <ul className="space-y-3">
                          {slide.content?.map((item, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + idx * 0.1, duration: 0.3, ease: "easeOut" }}
                              className={`rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border/30 ${
                                item.isExample
                                  ? "bg-accent p-4 text-center"
                                  : `flex gap-4 bg-white ${item.icon ? "items-center p-3" : "items-start p-4"}`
                              }`}
                            >
                              {item.isExample ? (
                                <div className="space-y-2">
                                  <p className="text-foreground font-semibold text-base">
                                    INSTEAD OF: <span className="font-bold">"PROFESSIONAL LOFT CONVERSIONS"</span>
                                  </p>
                                  <p className="text-white font-semibold text-base">
                                    USE:{" "}
                                    <span className="font-bold">
                                      "LOFT CONVERSIONS IN ALTRINCHAM – FREE QUOTE TODAY"
                                    </span>
                                  </p>
                                </div>
                              ) : (
                                <>
                                  {item.icon ? (
                                    <img src={item.icon} alt="" className={`flex-shrink-0 ${slide.title === "Your Setup" ? "w-6 h-6" : "w-12 h-12"}`} />
                                  ) : (
                                    <span className="text-primary font-bold mt-0.5">•</span>
                                  )}
                                  <div className="flex-1">
                                    <span className="font-semibold text-foreground text-lg">{item.label}</span>
                                    {item.description && (
                                      <p className="text-base text-muted-foreground mt-1">{item.description}</p>
                                    )}
                                  </div>
                                </>
                              )}
                            </motion.li>
                          ))}
                        </ul>
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

                  {/* Dot Progress Indicator */}
                  <div className="flex items-center gap-2">
                    {slides.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide ? "w-6 bg-accent" : "w-2 bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>

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
