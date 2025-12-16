import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TrafficGraph } from "@/components/TrafficGraph";
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
import OngoingServiceIcon from "@/assets/ongoing-service-icon.svg";
import OngoingServiceMainImage from "@/assets/ongoing-service-main.svg";

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
      { label: "Measure ROI", description: "Understand your cost per lead", icon: MeasureIcon, isInteractive: true },
      { label: "Optimise Campaigns", description: "Use real data, not guesswork", icon: OptimiseIcon },
      { label: "Say Hello", description: "Keep leads warm when a call is missed", icon: SayHelloIcon },
    ],
  },
  {
    title: "Lead Management",
    subtitle: "Speed wins deals",
    mainImage: SalesMainImage,
    content: [
      { label: "Respond Within 5 minutes", description: "21× more likely to qualify the lead", icon: SalesRespondIcon },
      { label: "Waiting >5 Minutes", description: "Reduces your chance by 80%+", icon: SalesWaitingIcon },
      { label: "78% of Sales", description: "Go to the first responder", icon: Sales78PercentIcon },
      { label: "30 Minute Delay", description: "Makes you 100× less likely to connect", icon: Sales30MinIcon },
      { label: "Missed Leads cost", description: "UK businesses £20k–£22k monthly", icon: SalesMissedIcon },
    ],
  },
  {
    title: "Your Setup",
    subtitle: "Getting started",
    mainImage: YourSetupMainImage,
    content: [
      {
        label: "Data Gathering",
        description: "Understand your audience and develop strategy",
        icon: YourSetupIcon,
      },
      { label: "Google Ads Account Setup", description: "New account or optimise existing", icon: YourSetupIcon },
      { label: "Search Campaign Creation", description: "Built from scratch", icon: YourSetupIcon },
      { label: "Conversion Tracking Set up", description: "Enhanced attribution solution", icon: YourSetupIcon },
      { label: "Campaign Launch Call", description: "Final review and go live", icon: YourSetupIcon },
    ],
  },
  {
    title: "Ongoing Service",
    subtitle: "Continuous improvement",
    mainImage: OngoingServiceMainImage,
    content: [
      { label: "Lead Generation Service Team", description: "Dedicated support", icon: OngoingServiceIcon },
      {
        label: "Technical Team Support",
        description: "Monthly Account optimisations and tracking checks",
        icon: OngoingServiceIcon,
      },
      { label: "Campaign Monitoring", description: "Continuous oversight and refinement", icon: OngoingServiceIcon },
      { label: "Call Attribution Dashboard", description: "Track performance data", icon: OngoingServiceIcon },
      { label: "Monthly Reporting", description: "Detailed campaign performance", icon: OngoingServiceIcon },
    ],
  },
];

export default function BusinessCycleLeadGen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [iconLoaded, setIconLoaded] = useState(false);
  const [showROIGraph, setShowROIGraph] = useState(false);
  const [graphKey, setGraphKey] = useState(0);

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
    setShowROIGraph(false);
  }, [currentSlide]);

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/funnel-health/leadgen", { state: location.state })}
        currentStep={5}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
      />

      <div className="flex-1 pt-[73px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.06)] overflow-hidden"
          style={{
            width: "min(90vw, calc((100vh - 73px) * 0.9 * 1.69))",
            aspectRatio: "1.69",
            containerType: "size",
            borderRadius: "2.5cqw",
          }}
        >
          <AnimatePresence mode="wait">
            {showROIGraph ? (
              <motion.div
                key="roi-graph"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full flex flex-col"
                style={{ padding: "3cqw" }}
              >
                {/* Back button */}
                <Button
                  onClick={() => setShowROIGraph(false)}
                  variant="outline"
                  className="flex items-center self-start"
                  style={{
                    gap: "0.6cqw",
                    fontSize: "1.2cqw",
                    padding: "0.8cqw 1.2cqw",
                    borderRadius: "0.8cqw",
                    marginBottom: "2cqw",
                  }}
                >
                  <ChevronLeft style={{ width: "1.2cqw", height: "1.2cqw" }} />
                  Back to Conversions
                </Button>

                {/* Graph takes remaining space */}
                <div className="flex-1 min-h-0">
                  <TrafficGraph key={graphKey} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="slides"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full"
              >
                <div className="grid md:grid-cols-2 h-full" style={{ gridTemplateColumns: "1fr 1fr" }}>
                  {/* Left side - logo, title, image */}
                  <div
                    className="flex flex-col bg-gradient-to-br from-muted/30 to-muted/50 overflow-hidden h-full"
                    style={{ padding: "3cqw" }}
                  >
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
                        <div className="flex items-center" style={{ gap: "1.5cqw", marginBottom: "1.2cqw" }}>
                          <motion.img
                            src={LogoGraphic}
                            alt="Add People"
                            style={{ width: "3cqw", height: "3cqw", flexShrink: 0 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: iconLoaded ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            onLoad={() => setIconLoaded(true)}
                          />
                          <h2
                            className="font-display font-bold text-title tracking-tight"
                            style={{
                              fontSize:
                                slide.title === "Lead Management" || slide.title === "Ongoing Service"
                                  ? "4cqw"
                                  : "5.5cqw",
                              lineHeight: "3cqw",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {slide.title}
                          </h2>
                        </div>
                        <p className="text-primary leading-relaxed" style={{ fontSize: "1.4cqw", marginTop: "0.6cqw" }}>
                          {slide.subtitle}
                        </p>

                        {/* Orange accent dots */}
                        <div className="flex items-center" style={{ gap: "0.6cqw", marginTop: "1.2cqw" }}>
                          <div className="flex items-center" style={{ gap: "0.4cqw" }}>
                            {[...Array(4)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="rounded-full bg-primary"
                                style={{ width: "0.5cqw", height: "0.5cqw" }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 - i * 0.25 }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                              />
                            ))}
                            <motion.div
                              className="relative overflow-hidden"
                              style={{ height: "0.15cqw", width: "4.5cqw" }}
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={{ scaleX: 1, opacity: 1 }}
                              transition={{ delay: 0.4, duration: 0.4 }}
                            >
                              <div
                                className="absolute inset-0 bg-gradient-to-r from-primary/100 via-primary/50 to-primary/0"
                                style={{
                                  clipPath: "polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%)",
                                  transformOrigin: "left",
                                }}
                              />
                            </motion.div>
                          </div>
                        </div>

                        {/* Main image */}
                        <div
                          className={`flex-1 flex justify-center w-full overflow-visible ${
                            slide.title === "Visibility" || slide.title === "Ongoing Service"
                              ? "items-center"
                              : "items-end"
                          }`}
                        >
                          <motion.img
                            src={slide.mainImage || VisibilityMainImage}
                            alt={`${slide.title} - ${slide.subtitle}`}
                            className="h-auto object-contain"
                            style={{
                              width:
                                slide.title === "Lead Management"
                                  ? "100%"
                                  : slide.title === "Visibility"
                                    ? "108%"
                                    : slide.title === "Engagement"
                                      ? "120%"
                                      : slide.title === "Your Setup"
                                        ? "115%"
                                        : slide.title === "Ongoing Service"
                                          ? "110%"
                                          : "100%",
                              maxHeight: "70vh",
                              marginBottom:
                                slide.title === "Lead Management"
                                  ? "-3cqw"
                                  : slide.title === "Engagement"
                                    ? "-3cqw"
                                    : slide.title === "Your Setup" || slide.title === "Conversions"
                                      ? "-1.5cqw"
                                      : "0",
                            }}
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
                  <div
                    className="relative bg-gradient-to-br from-white to-muted/20 shadow-[-8px_0_20px_-5px_rgba(0,0,0,0.1)] h-full overflow-hidden"
                    style={{ padding: "3cqw", paddingBottom: "7cqw" }}
                  >
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
                          <div style={{ marginBottom: "2.5cqw" }}>
                            <div className="flex items-center" style={{ gap: "1.2cqw" }}>
                              <span
                                className="font-semibold text-primary uppercase tracking-wider"
                                style={{ fontSize: "1.2cqw" }}
                              >
                                Slide
                              </span>
                              <span className="font-bold text-foreground" style={{ fontSize: "2.5cqw" }}>
                                {currentSlide + 1}
                              </span>
                              <span className="text-muted-foreground" style={{ fontSize: "1.6cqw" }}>
                                —
                              </span>
                              <span className="font-bold text-muted-foreground" style={{ fontSize: "2.5cqw" }}>
                                {totalSlides}
                              </span>
                            </div>
                          </div>

                          <div className="flex-1 overflow-hidden">
                            <div className="relative">
                              {/* Vertical connecting line for Your Setup */}
                              {slide.title === "Your Setup" && (
                                <div
                                  className="absolute bg-primary z-10 -translate-x-1/2"
                                  style={{
                                    left: "1.8cqw",
                                    width: "0.15cqw",
                                    top: "calc(2cqw + 0.7cqw)",
                                    bottom: "calc(2cqw + 0.7cqw)",
                                  }}
                                />
                              )}
                              <ul
                                className="relative"
                                style={{ display: "flex", flexDirection: "column", gap: "1cqw", zIndex: 1 }}
                              >
                                {slide.content?.map((item, idx) => (
                                  <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.3, ease: "easeOut" }}
                                    onClick={item.isInteractive ? () => { setGraphKey(k => k + 1); setShowROIGraph(true); } : undefined}
                                    className={`shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border/30 ${
                                      item.isExample
                                        ? "bg-accent text-center"
                                        : item.isInteractive
                                          ? "flex bg-white items-center cursor-pointer hover:scale-[1.02] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-200"
                                          : `flex bg-white ${item.icon ? "items-center" : "items-start"}`
                                    }`}
                                    style={{
                                      borderRadius: "1.2cqw",
                                      padding: item.isExample ? "1.2cqw" : item.icon ? "1cqw" : "1.2cqw",
                                      gap: item.icon ? "1.2cqw" : undefined,
                                    }}
                                  >
                                    {item.isExample ? (
                                      <div style={{ display: "flex", flexDirection: "column", gap: "0.6cqw" }}>
                                        <p className="text-foreground font-semibold" style={{ fontSize: "1.2cqw" }}>
                                          INSTEAD OF: <span className="font-bold">"PROFESSIONAL LOFT CONVERSIONS"</span>
                                        </p>
                                        <p className="text-white font-semibold" style={{ fontSize: "1.2cqw" }}>
                                          USE:{" "}
                                          <span className="font-bold">
                                            "LOFT CONVERSIONS IN ALTRINCHAM – FREE QUOTE TODAY"
                                          </span>
                                        </p>
                                      </div>
                                    ) : (
                                      <>
                                        {item.icon ? (
                                          <img
                                            src={item.icon}
                                            alt=""
                                            className="flex-shrink-0"
                                            style={{
                                              width:
                                                slide.title === "Your Setup"
                                                  ? "1.3cqw"
                                                  : slide.title === "Ongoing Service" || slide.title === "Engagement"
                                                    ? "1.8cqw"
                                                    : "3.5cqw",
                                              height:
                                                slide.title === "Your Setup"
                                                  ? "1.3cqw"
                                                  : slide.title === "Ongoing Service" || slide.title === "Engagement"
                                                    ? "1.8cqw"
                                                    : "3.5cqw",
                                            }}
                                          />
                                        ) : (
                                          <span
                                            className="text-primary font-bold"
                                            style={{ fontSize: "1.5cqw", marginTop: "0.15cqw" }}
                                          >
                                            •
                                          </span>
                                        )}
                                        <div className="flex-1">
                                          <span
                                            className="font-semibold text-foreground"
                                            style={{ fontSize: "1.4cqw" }}
                                          >
                                            {item.label}
                                          </span>
                                          {item.description && (
                                            <p
                                              className="text-muted-foreground"
                                              style={{ fontSize: "1.2cqw", marginTop: "0.3cqw" }}
                                            >
                                              {item.description}
                                            </p>
                                          )}
                                        </div>
                                        {item.isInteractive && (
                                          <ChevronRight
                                            className="text-accent flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                                            style={{ width: "2cqw", height: "2cqw" }}
                                          />
                                        )}
                                      </>
                                    )}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Fixed navigation buttons - absolutely positioned */}
                    <div
                      className="absolute flex items-center justify-between"
                      style={{ bottom: "3cqw", left: "3cqw", right: "3cqw" }}
                    >
                      <Button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        variant="outline"
                        className="flex items-center"
                        style={{
                          gap: "0.6cqw",
                          minWidth: "8cqw",
                          fontSize: "1.2cqw",
                          padding: "1cqw 1.5cqw",
                          borderRadius: "0.8cqw",
                        }}
                      >
                        <ChevronLeft style={{ width: "1.2cqw", height: "1.2cqw" }} />
                        Previous
                      </Button>

                      {/* Dot Progress Indicator */}
                      <div className="flex items-center" style={{ gap: "0.6cqw" }}>
                        {slides.map((_, index) => (
                          <div
                            key={index}
                            className={`rounded-full transition-all duration-300 ${
                              index === currentSlide ? "bg-accent" : "bg-muted-foreground/30"
                            }`}
                            style={{
                              height: "0.5cqw",
                              width: index === currentSlide ? "1.8cqw" : "0.5cqw",
                            }}
                          />
                        ))}
                      </div>

                      <Button
                        onClick={nextSlide}
                        className="flex items-center justify-center"
                        style={{
                          gap: "0.6cqw",
                          minWidth: "8cqw",
                          fontSize: "1.2cqw",
                          padding: "1cqw 1.5cqw",
                          borderRadius: "0.8cqw",
                        }}
                      >
                        {isLastSlide ? "About Us" : "Next"}
                        <ChevronRight style={{ width: "1.2cqw", height: "1.2cqw" }} />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
