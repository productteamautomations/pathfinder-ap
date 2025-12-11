import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LogoGraphic from "@/assets/logo_graphic.svg";
// Using existing images as placeholders - replace with SEO-specific images when available
import VisibilityMainImage from "@/assets/visibility-main-image.svg";
import EngagementMainImage from "@/assets/engagement-main.svg";
import ConversionsMainImage from "@/assets/conversions-main.svg";
import SalesMainImage from "@/assets/sales-main.svg";
import YourSetupMainImage from "@/assets/your-setup-main.svg";
import OngoingServiceMainImage from "@/assets/ongoing-service-main.svg";
// Using existing icons as placeholders - replace with SEO-specific icons when available
import KeywordsIcon from "@/assets/keywords-icon.svg";
import LocationIcon from "@/assets/location-icon.svg";
import EngagementIcon from "@/assets/engagement-icon.svg";
import SeeExactlyIcon from "@/assets/see-exactly-icon.svg";
import TrackConversionsIcon from "@/assets/track-conversions-icon.svg";
import MeasureIcon from "@/assets/measure-icon.svg";
import OptimiseIcon from "@/assets/optimise-icon.svg";
import SalesRespondIcon from "@/assets/sales-respond-icon.svg";
import SalesWaitingIcon from "@/assets/sales-waiting-icon.svg";
import Sales78PercentIcon from "@/assets/sales-78percent-icon.svg";
import Sales30MinIcon from "@/assets/sales-30min-icon.svg";
import SalesMissedIcon from "@/assets/sales-missed-icon.svg";
import YourSetupIcon from "@/assets/your-setup-icon.svg";
import OngoingServiceIcon from "@/assets/ongoing-service-icon.svg";
import ProminenceIcon from "@/assets/prominence-icon.svg";
import ProximityIcon from "@/assets/proximity-icon.svg";
import RelevanceIcon from "@/assets/relevance-icon.svg";
import VisibilityBottomImage from "@/assets/visibility-bottom-image.svg";
import RelevanceMainImage from "@/assets/relevance-main.svg";
import ContentIcon from "@/assets/content-icon.svg";
import KeywordsRelevanceIcon from "@/assets/keywords-relevance-icon.svg";
import UXIcon from "@/assets/ux-icon.svg";
import LinksIcon from "@/assets/links-icon.svg";
import SchemaIcon from "@/assets/schema-icon.svg";
import BeingWellKnownIcon from "@/assets/being-well-known.svg";
import HigherMapPackIcon from "@/assets/higher-map-pack.svg";
import IncreaseReputationIcon from "@/assets/increase-reputation.svg";
import ProminenceMainImage from "@/assets/prominence-main.svg";
import MoreExternalLinksIcon from "@/assets/more-external-links.svg";
import MoreReviewsIcon from "@/assets/more-reviews.svg";
import FiveStarsWideIcon from "@/assets/five-stars-wide.svg";
import ProductJourneyMainImage from "@/assets/product-journey-main.svg";

const slides = [
  {
    title: "Visibility",
    subtitle: "Get found by local customers",
    mainImage: VisibilityMainImage,
    content: [
      { label: "Relevance", description: "How well your business matches search intent", icon: RelevanceIcon },
      { label: "Proximity", description: "How close you are to the searcher", icon: ProximityIcon },
      { label: "Prominence", description: "How well-known and reputable your business is", icon: ProminenceIcon },
    ],
    bottomImage: VisibilityBottomImage,
  },
  {
    title: "Relevance",
    subtitle: "Match what customers are searching for",
    mainImage: RelevanceMainImage,
    content: [
      { label: "Content", description: "Quality, relevant content targeting local keywords", icon: ContentIcon },
      { label: "Keywords", description: "Strategic use of location-based search terms", icon: KeywordsRelevanceIcon },
      { label: "UX", description: "Fast, mobile-friendly user experience", icon: UXIcon },
      { label: "Internal/External Links", description: "Strong link profile from local sources", icon: LinksIcon },
      { label: "Schema Markup", description: "Structured data for better search visibility", icon: SchemaIcon },
    ],
  },
  {
    title: "Prominence",
    subtitle: "Build your reputation online",
    mainImage: ProminenceMainImage,
    content: [
      { label: "Being well-known improves rankings", description: "", icon: BeingWellKnownIcon },
      {
        label: "More external links",
        description: "Quality backlinks from authoritative sites",
        icon: MoreExternalLinksIcon,
      },
      { label: "More reviews", description: "", icon: MoreReviewsIcon },
      {
        label: "Better review scores",
        description: "Average rating impacts visibility",
        icon: MoreReviewsIcon,
        rightIcon: FiveStarsWideIcon,
      },
      { label: "Increase reputation", description: "", icon: IncreaseReputationIcon },
      { label: "Higher map pack ranking", description: "", icon: HigherMapPackIcon },
    ],
  },
  {
    title: "Conversions",
    subtitle: "Turn visitors into customers",
    mainImage: ConversionsMainImage,
    content: [
      { label: "Track what happens after someone clicks", description: "", icon: SeeExactlyIcon },
      { label: "Measure ROI", description: "Understand cost per acquisition", icon: MeasureIcon },
      { label: "Optimise using real user behaviour", description: "", icon: OptimiseIcon },
      { label: "Google Search Console", description: "Helps maintain search performance", icon: TrackConversionsIcon },
    ],
  },
  {
    title: "Lead Management",
    subtitle: "Respond fast, win more",
    mainImage: SalesMainImage,
    content: [
      { label: "Respond within 5 minutes", description: "21× more likely to qualify", icon: SalesRespondIcon },
      { label: "Waiting >5 minutes", description: "Reduces success by 80%+", icon: SalesWaitingIcon },
      { label: "78% of sales", description: "Go to first responder", icon: Sales78PercentIcon },
      { label: "Waiting 30 minutes", description: "100× less likely to connect", icon: Sales30MinIcon },
      { label: "Slow responses", description: "Cost UK businesses £20k–£22k monthly", icon: SalesMissedIcon },
    ],
  },
  {
    title: "Product Journey",
    subtitle: "Your path to success",
    mainImage: ProductJourneyMainImage,
    timeline: [
      {
        phase: "Welcome Call",
        points: [
          "First meeting with onboarding team",
          "Understand goals",
          "Implement tracking needs",
          "Website audit & content plan",
        ],
      },
      {
        phase: "Launch Call",
        points: ["Launch newly built campaigns", "Final changes", "Tracking test in real time", "Agree on next steps"],
      },
    ],
  },
  {
    title: "Your Setup",
    subtitle: "Getting started",
    mainImage: YourSetupMainImage,
    content: [
      { label: "Strategic onboarding call", description: "", icon: YourSetupIcon },
      { label: "Installation of all tracking tools", description: "", icon: YourSetupIcon },
      { label: "Local SEO tracking setup", description: "", icon: YourSetupIcon },
      { label: "Website audit + content plan", description: "", icon: YourSetupIcon },
      { label: "Google Business Profile optimisation", description: "", icon: YourSetupIcon },
      { label: "Campaign launch call", description: "", icon: YourSetupIcon },
    ],
    timeline: [
      {
        phase: "Welcome Call",
        points: [
          "First meeting with onboarding team",
          "Understand goals",
          "Implement tracking needs",
          "Website audit & content plan",
        ],
      },
      {
        phase: "Launch Call",
        points: ["Launch newly built campaigns", "Final changes", "Tracking test in real time", "Agree on next steps"],
      },
    ],
  },
  {
    title: "Ongoing Service",
    subtitle: "Continuous improvement",
    mainImage: OngoingServiceMainImage,
    content: [
      { label: "Dedicated account manager", description: "", icon: OngoingServiceIcon },
      { label: "Monthly on-page optimisation", description: "", icon: OngoingServiceIcon },
      { label: "2+ SEO content pages monthly", description: "", icon: OngoingServiceIcon },
      { label: "Local SEO dashboard access", description: "", icon: OngoingServiceIcon },
      { label: "Monthly review calls", description: "", icon: OngoingServiceIcon },
      { label: "Quarterly strategy call", description: "", icon: OngoingServiceIcon },
    ],
  },
];

export default function BusinessCycleLocalSEO() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [iconLoaded, setIconLoaded] = useState(false);

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

  // Reset loaded states when slide changes
  useEffect(() => {
    setImageLoaded(false);
    setIconLoaded(false);
  }, [currentSlide]);

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
            <div className="grid md:grid-cols-2 h-[82vh]" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {/* Left side - logo, title, image */}
              <div className="flex flex-col bg-gradient-to-br from-muted/30 to-muted/50 h-[82vh] relative p-10 md:p-12 lg:p-14 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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
                      <h2
                        className={`font-display font-bold text-title leading-tight tracking-tight ${
                          slide.title === "Lead Management" ||
                          slide.title === "Ongoing Service" ||
                          slide.title === "Product Journey"
                            ? "text-4xl md:text-5xl"
                            : "text-7xl md:text-7xl"
                        }`}
                      >
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
                    <div
                      className={`${
                        slide.title === "Product Journey"
                          ? "absolute bottom-0 left-0 right-0 top-0 flex items-end justify-center pointer-events-none"
                          : `w-full flex-1 flex justify-center overflow-visible ${slide.title === "Visibility" || slide.title === "Ongoing Service" ? "items-center" : "items-end"}`
                      }`}
                    >
                      <motion.img
                        src={slide.mainImage || VisibilityMainImage}
                        alt={`${slide.title} - ${slide.subtitle}`}
                        className={`h-auto ${
                          slide.title === "Lead Management"
                            ? "object-contain w-full max-h-[85vh] mb-[-60px]"
                            : slide.title === "Visibility"
                              ? "object-contain w-[108%] max-h-[70vh]"
                              : slide.title === "Relevance" || slide.title === "Prominence"
                                ? "object-contain w-[120%] max-h-[80vh] mb-[-30px] mt-[-20px]"
                                : slide.title === "Your Setup"
                                  ? "object-contain w-[115%] max-h-[80vh] mb-[-14px]"
                                  : slide.title === "Ongoing Service"
                                    ? "object-contain w-[110%] max-h-[70vh]"
                                    : slide.title === "Product Journey"
                                      ? "w-full object-contain object-bottom"
                                      : "object-contain w-full max-h-[75vh] mb-[-14px]"
                        } ${!imageLoaded ? "invisible" : ""}`}
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
              <div className="relative p-10 md:p-12 lg:p-14 pb-24 bg-gradient-to-br from-white to-muted/20 shadow-[-8px_0_20px_-5px_rgba(0,0,0,0.1)] h-[82vh] overflow-hidden">
                <div className="overflow-hidden">
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
                        <div className="relative">
                          {/* Vertical connecting line for Your Setup */}
                          {slide.title === "Your Setup" && (
                            <div
                              className="absolute left-[22px] w-[2px] bg-primary z-10 -translate-x-1/2"
                              style={{ top: "calc(24px + 9px)", bottom: "calc(24px + 9px)" }}
                            />
                          )}

                          {/* Product Journey timeline cards */}
                          {slide.title === "Product Journey" && slide.timeline ? (
                            <div className="space-y-4">
                              {slide.timeline.map((phase, phaseIdx) => (
                                <motion.div
                                  key={phaseIdx}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.4 + phaseIdx * 0.15, duration: 0.3, ease: "easeOut" }}
                                  className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border/30 p-5"
                                >
                                  <h3 className="text-primary font-semibold text-lg mb-3">{phase.phase}</h3>
                                  <ul className="space-y-2 relative">
                                    {/* Vertical connecting line */}
                                    <div
                                      className="absolute left-[3px] w-[2px] bg-primary z-0"
                                      style={{ top: "calc(8px + 4px)", bottom: "calc(8px + 4px)" }}
                                    />
                                    {phase.points.map((point, pointIdx) => (
                                      <li key={pointIdx} className="flex items-start gap-3 relative z-10">
                                        <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <span className="text-foreground">{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <ul className="space-y-3 relative" style={{ zIndex: 1 }}>
                              {slide.content?.map((item, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.3, ease: "easeOut" }}
                                  className={`flex gap-4 bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border/30 ${
                                    item.icon ? "items-center p-3" : "items-start p-4"
                                  }`}
                                >
                                  {item.icon ? (
                                    <img
                                      src={item.icon}
                                      alt=""
                                      className={`flex-shrink-0 ${
                                        slide.title === "Your Setup"
                                          ? "w-[18px] h-[18px]"
                                          : slide.title === "Ongoing Service"
                                            ? "w-6 h-6"
                                            : slide.title === "Prominence"
                                              ? "w-8 h-8"
                                              : "w-12 h-12"
                                      }`}
                                    />
                                  ) : (
                                    <span className="text-primary font-bold mt-0.5">•</span>
                                  )}
                                  <div className="flex-1">
                                    <span className="font-semibold text-foreground text-lg">{item.label}</span>
                                    {item.description && (
                                      <p className="text-base text-muted-foreground mt-1">{item.description}</p>
                                    )}
                                  </div>
                                  {item.rightIcon && (
                                    <img src={item.rightIcon} alt="" className="flex-shrink-0 w-32 h-12" />
                                  )}
                                </motion.li>
                              ))}
                            </ul>
                          )}

                          {/* Bottom image for Visibility slide */}
                          {slide.bottomImage && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.8, duration: 0.4 }}
                              className="mt-4"
                            >
                              <img src={slide.bottomImage} alt="" className="w-[45%]" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Fixed navigation buttons - absolutely positioned */}
                <div className="absolute bottom-10 left-10 right-10 md:left-12 md:right-12 lg:left-14 lg:right-14 flex items-center justify-between">
                  {currentSlide > 0 ? (
                    <Button onClick={prevSlide} variant="outline" className="flex items-center gap-2 min-w-[120px]">
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                  ) : (
                    <div className="min-w-[120px]" />
                  )}

                  {/* Dot Progress Indicator */}
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
