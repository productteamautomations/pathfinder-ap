import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TrafficGraph } from "@/components/TrafficGraph";
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
import DedicatedAccountManagerIcon from "@/assets/dedicated-account-manager.svg";
import MonthlyPerformanceIcon from "@/assets/monthly-performance.svg";
import AdvancedAIIcon from "@/assets/advanced-ai.svg";
import InDepthOnboardingIcon from "@/assets/in-depth-onboarding.svg";
import FullSEOServiceIcon from "@/assets/full-seo-service.svg";
import YourSetupNewMainImage from "@/assets/your-setup-main-new.svg";
import LeadgenTrafficCorner from "@/assets/leadgen-traffic-corner.svg";
import LeadgenConversionsCorner from "@/assets/leadgen-conversions-corner.svg";
import LeadgenLeadManagementCorner from "@/assets/leadgen-leadmanagement-corner.svg";

const slides = [
  {
    title: "Visibility",
    subtitle: "Get found by local customers",
    mainImage: VisibilityMainImage,
    cornerImage: LeadgenTrafficCorner,
    content: [
      { label: "Relevance", description: "How well your business matches search intent", icon: RelevanceIcon },
      { label: "Proximity", description: "How close you are to the searcher", icon: ProximityIcon },
      { label: "Prominence", description: "How well-known and reputable your business is", icon: ProminenceIcon },
    ],
  },
  {
    title: "Relevance",
    subtitle: "Match what customers are searching for",
    mainImage: RelevanceMainImage,
    cornerImage: LeadgenTrafficCorner,
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
    cornerImage: LeadgenTrafficCorner,
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
    cornerImage: LeadgenConversionsCorner,
    content: [
      { label: "Track what happens after someone clicks", description: "", icon: SeeExactlyIcon },
      { label: "Measure ROI", description: "Understand cost per acquisition", icon: MeasureIcon, isInteractive: true },
      { label: "Optimise using real user behaviour", description: "", icon: OptimiseIcon },
      { label: "Google Search Console", description: "Helps maintain search performance", icon: TrackConversionsIcon },
    ],
  },
  {
    title: "Lead Management",
    subtitle: "Respond fast, win more",
    mainImage: SalesMainImage,
    cornerImage: LeadgenLeadManagementCorner,
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
    title: "Features",
    subtitle: "What's included",
    mainImage: YourSetupMainImage,
    content: [
      { label: "Dedicated Account Manager", description: "", icon: DedicatedAccountManagerIcon },
      { label: "Monthly performance reporting", description: "", icon: MonthlyPerformanceIcon },
      { label: "Advanced AI call tracking", description: "", icon: AdvancedAIIcon },
      { label: "In-depth onboarding", description: "", icon: InDepthOnboardingIcon },
      {
        label: "Full SEO service",
        description: "Optimisation, content creation, directory submissions",
        icon: FullSEOServiceIcon,
      },
    ],
  },
  {
    title: "Your Setup",
    subtitle: "Getting started",
    mainImage: YourSetupNewMainImage,
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
  const [showROIGraph, setShowROIGraph] = useState(false);
  const [graphKey, setGraphKey] = useState(0);

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
    setShowROIGraph(false);
  }, [currentSlide]);

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/funnel-health/localseo", { state: location.state })}
        currentStep={5}
        totalSteps={7}
        showProgress
        productLabel="Local SEO"
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
                    className="flex flex-col h-full relative"
                    style={{
                      borderTopLeftRadius: "2.5cqw",
                      borderBottomLeftRadius: "2.5cqw",
                      overflow: "hidden",
                    }}
                  >
                    {/* Background gradient - always present */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/50"
                      style={{ zIndex: 0 }}
                    />

                    {/* Background image for Product Journey and Your Setup - positioned absolutely to fill entire container */}
                    <AnimatePresence>
                      {(slide.title === "Product Journey" || slide.title === "Your Setup") && (
                        <motion.img
                          key={`bg-${slide.title}`}
                          src={slide.mainImage || VisibilityMainImage}
                          alt={`${slide.title} - ${slide.subtitle}`}
                          className="absolute inset-0 object-contain"
                          style={{
                            zIndex: 0,
                            width: "100%",
                            height: "100%",
                            objectPosition: "bottom right",
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          onLoad={() => setImageLoaded(true)}
                        />
                      )}
                    </AnimatePresence>

                    <div style={{ padding: "3cqw", position: "relative", zIndex: 1, height: "100%" }}>
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
                          <div className="flex items-center" style={{ gap: "1.5cqw", marginBottom: "1cqw" }}>
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
                                  slide.title === "Lead Management" ||
                                  slide.title === "Ongoing Service" ||
                                  slide.title === "Product Journey"
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
                          <p
                            className="text-primary leading-relaxed"
                            style={{ fontSize: "1.5cqw", marginTop: "0.6cqw" }}
                          >
                            {slide.subtitle}
                          </p>

                          {/* Orange accent dots */}
                          <div className="flex items-center" style={{ gap: "0.6cqw", marginTop: "1cqw" }}>
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
                                style={{ height: "0.15cqw", width: "4cqw", transformOrigin: "left" }}
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
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

                          {/* Main image - only for non Product Journey/Your Setup slides */}
                          {slide.title !== "Product Journey" && slide.title !== "Your Setup" && (
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
                                        : slide.title === "Relevance" || slide.title === "Prominence"
                                          ? "120%"
                                          : slide.title === "Ongoing Service"
                                            ? "110%"
                                            : "100%",
                                  maxHeight: "70vh",
                                  marginBottom:
                                    slide.title === "Lead Management"
                                      ? "-3cqw"
                                      : slide.title === "Relevance" || slide.title === "Prominence"
                                        ? "-3cqw"
                                        : slide.title === "Conversions"
                                          ? "-1.5cqw"
                                          : "0",
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: imageLoaded ? 1 : 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                onLoad={() => setImageLoaded(true)}
                              />
                            </div>
                          )}

                          {/* Spacer for Product Journey and Your Setup to push content up */}
                          {(slide.title === "Product Journey" || slide.title === "Your Setup") && (
                            <div className="flex-1" />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Right side - content list */}
                  <div
                    className="relative bg-gradient-to-br from-white to-muted/20 shadow-[-8px_0_20px_-5px_rgba(0,0,0,0.1)] h-full overflow-hidden"
                    style={{ padding: "3cqw", paddingBottom: "6cqw" }}
                  >
                    {/* Corner image */}
                    {slide.cornerImage && (
                      <motion.img
                        key={`corner-${currentSlide}`}
                        src={slide.cornerImage}
                        alt=""
                        className="absolute z-10"
                        style={{
                          top: "2.5cqw",
                          right: "3cqw",
                          width: "5cqw",
                          height: "auto",
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                      />
                    )}
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
                          <div style={{ marginBottom: "2cqw" }}>
                            <div className="flex items-center" style={{ gap: "1cqw" }}>
                              <span
                                className="font-semibold text-primary uppercase tracking-wider"
                                style={{ fontSize: "1.2cqw" }}
                              >
                                Slide
                              </span>
                              <span className="font-bold text-foreground" style={{ fontSize: "2.5cqw" }}>
                                {currentSlide + 1}
                              </span>
                              <span className="text-muted-foreground" style={{ fontSize: "1.8cqw" }}>
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
                                  className="absolute bg-primary z-10"
                                  style={{
                                    left: "1.7cqw",
                                    width: "0.15cqw",
                                    top: "calc(1.8cqw + 0.7cqw)",
                                    bottom: "calc(1.8cqw + 0.7cqw)",
                                    transform: "translateX(-50%)",
                                  }}
                                />
                              )}

                              {/* Product Journey timeline cards */}
                              {slide.title === "Product Journey" && slide.timeline ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: "1.2cqw" }}>
                                  {slide.timeline.map((phase, phaseIdx) => (
                                    <motion.div
                                      key={phaseIdx}
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.4 + phaseIdx * 0.15, duration: 0.3, ease: "easeOut" }}
                                      className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border/30"
                                      style={{ borderRadius: "1.5cqw", padding: "1.5cqw" }}
                                    >
                                      <h3
                                        className="text-primary font-semibold"
                                        style={{ fontSize: "1.5cqw", marginBottom: "0.9cqw" }}
                                      >
                                        {phase.phase}
                                      </h3>
                                      <ul
                                        className="relative"
                                        style={{ display: "flex", flexDirection: "column", gap: "0.6cqw" }}
                                      >
                                        {/* Vertical connecting line */}
                                        <div
                                          className="absolute bg-primary z-0"
                                          style={{
                                            left: "0.20cqw",
                                            width: "0.15cqw",
                                            top: "calc(0.6cqw + 0.3cqw)",
                                            bottom: "calc(0.6cqw + 0.3cqw)",
                                          }}
                                        />
                                        {phase.points.map((point, pointIdx) => (
                                          <li
                                            key={pointIdx}
                                            className="flex items-start relative z-10"
                                            style={{ gap: "0.9cqw" }}
                                          >
                                            <span
                                              className="rounded-full bg-primary flex-shrink-0"
                                              style={{ width: "0.5cqw", height: "0.5cqw", marginTop: "0.6cqw" }}
                                            />
                                            <span className="text-foreground" style={{ fontSize: "1.3cqw" }}>
                                              {point}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </motion.div>
                                  ))}
                                </div>
                              ) : (
                                <ul
                                  className="relative"
                                  style={{ display: "flex", flexDirection: "column", gap: "0.9cqw", zIndex: 1 }}
                                >
                                  {slide.content?.map((item, idx) => (
                                    <motion.li
                                      key={idx}
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.4 + idx * 0.1, duration: 0.3, ease: "easeOut" }}
                                      onClick={
                                        item.isInteractive
                                          ? () => {
                                              setGraphKey((k) => k + 1);
                                              setShowROIGraph(true);
                                            }
                                          : undefined
                                      }
                                      className={`flex bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border/30 ${
                                        item.isInteractive
                                          ? "cursor-pointer hover:scale-[1.02] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-200"
                                          : ""
                                      }`}
                                      style={{
                                        gap: "1.2cqw",
                                        borderRadius: "1.5cqw",
                                        padding: item.icon ? "0.9cqw" : "1.2cqw",
                                        alignItems: item.icon ? "center" : "flex-start",
                                      }}
                                    >
                                      {item.icon ? (
                                        <img
                                          src={item.icon}
                                          alt=""
                                          className="flex-shrink-0"
                                          style={{
                                            width:
                                              slide.title === "Your Setup"
                                                ? "1.4cqw"
                                                : slide.title === "Ongoing Service"
                                                  ? "1.8cqw"
                                                  : slide.title === "Prominence"
                                                    ? "2.4cqw"
                                                    : "3.5cqw",
                                            height:
                                              slide.title === "Your Setup"
                                                ? "1.4cqw"
                                                : slide.title === "Ongoing Service"
                                                  ? "1.8cqw"
                                                  : slide.title === "Prominence"
                                                    ? "2.4cqw"
                                                    : "3.5cqw",
                                          }}
                                        />
                                      ) : (
                                        <span className="text-primary font-bold" style={{ marginTop: "0.15cqw" }}>
                                          •
                                        </span>
                                      )}
                                      <div className="flex-1">
                                        <span className="font-semibold text-foreground" style={{ fontSize: "1.5cqw" }}>
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
                                          className="flex-shrink-0 text-primary"
                                          style={{ width: "1.8cqw", height: "1.8cqw" }}
                                        />
                                      )}
                                      {item.rightIcon && (
                                        <img
                                          src={item.rightIcon}
                                          alt=""
                                          className="flex-shrink-0"
                                          style={{ width: "9.5cqw", height: "3.5cqw" }}
                                        />
                                      )}
                                    </motion.li>
                                  ))}
                                </ul>
                              )}

                              {/* Bottom image for Visibility slide */}
                              {"bottomImage" in slide && slide.bottomImage && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.8, duration: 0.4 }}
                                  style={{ marginTop: "1.2cqw" }}
                                >
                                  <img src={slide.bottomImage as string} alt="" style={{ width: "45%" }} />
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Fixed navigation buttons - absolutely positioned */}
                    <div
                      className="absolute bottom-0 left-0 right-0 flex items-center justify-between"
                      style={{ padding: "3cqw" }}
                    >
                      {currentSlide > 0 ? (
                        <Button
                          onClick={prevSlide}
                          variant="outline"
                          className="flex items-center"
                          style={{
                            gap: "0.6cqw",
                            minWidth: "9cqw",
                            fontSize: "1.2cqw",
                            padding: "1cqw 2cqw",
                            borderRadius: "0.8cqw",
                          }}
                        >
                          <ChevronLeft style={{ width: "1.2cqw", height: "1.2cqw" }} />
                          Previous
                        </Button>
                      ) : (
                        <div style={{ minWidth: "9cqw" }} />
                      )}

                      {/* Dot Progress Indicator */}
                      <div className="flex" style={{ gap: "0.4cqw" }}>
                        {slides.map((_, idx) => (
                          <div
                            key={idx}
                            className="rounded-full transition-all"
                            style={{
                              height: "0.4cqw",
                              width: idx === currentSlide ? "1.8cqw" : "0.4cqw",
                              backgroundColor: idx === currentSlide ? "var(--primary)" : "var(--muted)",
                            }}
                          />
                        ))}
                      </div>

                      <Button
                        onClick={nextSlide}
                        className="flex items-center justify-center"
                        style={{
                          gap: "0.6cqw",
                          minWidth: "9cqw",
                          fontSize: "1.2cqw",
                          padding: "1cqw 2cqw",
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
