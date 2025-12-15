import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { ChevronLeft, ChevronRight, Phone, MapPin, Clock, PoundSterling, Shield, BadgeCheck, Timer, Users, Target, Zap } from "lucide-react";
import LogoGraphic from "@/assets/logo_graphic.svg";
import VisibilityMainImage from "@/assets/visibility-main-image.svg";
import LocationIcon from "@/assets/location-icon.svg";
import TimeIcon from "@/assets/time-icon.svg";

const slides = [
  {
    title: "What is an LSA?",
    subtitle: "Local Service Ads explained",
    mainImage: VisibilityMainImage,
    content: [
      { label: "Top of Google", description: "Your ad appears at the very top of search results", icon: Target },
      { label: "Local Customers", description: "Shown to people searching for your services in your area", icon: MapPin },
      { label: "Business Hours Display", description: "Ad displays during your chosen opening hours", icon: Clock },
      { label: "Google Guaranteed", description: "Earn trust with the Google Guaranteed badge", icon: Shield },
      { label: "Direct Calls", description: "Customers call you directly from the ad", icon: Phone },
    ],
  },
  {
    title: "Service Areas",
    subtitle: "Target the right local customers",
    mainImage: VisibilityMainImage,
    content: [
      { label: "Choose Your Areas", description: "Select specific towns and postcodes to target", icon: MapPin },
      { label: "Include Areas", description: "Add counties, cities, neighbourhoods or postcodes", icon: Target },
      { label: "Exclude Areas", description: "Remove locations you don't want to serve", icon: Zap },
      { label: "Precise Targeting", description: "Only people in your service areas see your ad", icon: Users },
    ],
  },
  {
    title: "How They Work",
    subtitle: "Pay only for real leads",
    mainImage: VisibilityMainImage,
    content: [
      { label: "Customer Calls Your Ad", description: "Someone wanting your service calls directly", icon: Phone },
      { label: "30 Second Rule", description: "You have 30 seconds to gauge the job potential", icon: Timer },
      { label: "Charged Leads Only", description: "Only pay for calls over 30 seconds", icon: PoundSterling },
      { label: "Cost Per Lead", description: "£5-£25 per lead depending on industry and area", icon: Target },
      { label: "No Charge if No Answer", description: "Missed calls under 30 seconds are free", icon: Clock },
    ],
  },
  {
    title: "Set Your Budget",
    subtitle: "Flexible spending you control",
    mainImage: VisibilityMainImage,
    content: [
      { label: "Minimum £50/week", description: "Start with a budget that works for you", icon: PoundSterling },
      { label: "6-16 Leads Per Week", description: "Expected leads at £80/week budget", icon: Users },
      { label: "Pay Only for Results", description: "No calls over 30 seconds = no charge", icon: BadgeCheck },
      { label: "Monthly Maximum", description: "Never exceed your set monthly limit", icon: Shield },
      { label: "Higher Budget = Better Performance", description: "More budget means better ad placement", icon: Zap },
    ],
  },
  {
    title: "Google Guaranteed",
    subtitle: "Earn customer trust instantly",
    mainImage: VisibilityMainImage,
    content: [
      { label: "The Green Tick", description: "Stand out with the trusted Google Guaranteed badge", icon: BadgeCheck },
      { label: "Public Liability Insurance", description: "Minimum £250,000 cover required", icon: Shield },
      { label: "Business Registration", description: "VAT registered or Companies House registered", icon: Target },
      { label: "Customer Protection", description: "£1,500 reimbursement if anything goes wrong", icon: Users },
      { label: "No Cost to You", description: "Google covers the guarantee, not you", icon: PoundSterling },
    ],
  },
];

export default function AboutProductLSA() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [iconLoaded, setIconLoaded] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      navigate("/about/lsa", { state: location.state });
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
  const isFirstSlide = currentSlide === 0;

  useEffect(() => {
    setImageLoaded(false);
    setIconLoaded(false);
  }, [currentSlide]);

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/product-recommendation/lsa", { state: location.state })}
        currentStep={2}
        totalSteps={4}
        showProgress
        productLabel="Local Service Ads"
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
                        fontSize: slide.title === "Google Guaranteed" ? "4cqw" : "5cqw",
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
                  <div className="flex-1 flex justify-center items-center w-full overflow-visible">
                    <motion.img
                      src={slide.mainImage}
                      alt={`${slide.title} - ${slide.subtitle}`}
                      className="h-auto object-contain"
                      style={{
                        width: "100%",
                        maxHeight: "70vh",
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
                      <ul
                        className="relative"
                        style={{ display: "flex", flexDirection: "column", gap: "1cqw", zIndex: 1 }}
                      >
                        {slide.content?.map((item, idx) => {
                          const IconComponent = item.icon;
                          return (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + idx * 0.1, duration: 0.3, ease: "easeOut" }}
                              className="flex bg-white items-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border/30"
                              style={{
                                borderRadius: "1.2cqw",
                                padding: "1cqw",
                                gap: "1.2cqw",
                              }}
                            >
                              <div
                                className="flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center"
                                style={{ width: "3.6cqw", height: "3.6cqw" }}
                              >
                                <IconComponent
                                  className="text-primary"
                                  style={{ width: "1.8cqw", height: "1.8cqw" }}
                                />
                              </div>
                              <div className="flex flex-col">
                                <span
                                  className="font-semibold text-foreground"
                                  style={{ fontSize: "1.3cqw", lineHeight: "1.3" }}
                                >
                                  {item.label}
                                </span>
                                <span
                                  className="text-muted-foreground"
                                  style={{ fontSize: "1.1cqw", lineHeight: "1.3" }}
                                >
                                  {item.description}
                                </span>
                              </div>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation buttons - fixed at bottom */}
              <div
                className="absolute left-0 right-0 flex justify-between items-center"
                style={{ bottom: "3cqw", padding: "0 3cqw" }}
              >
                {isFirstSlide ? (
                  <div />
                ) : (
                  <Button
                    variant="outline"
                    onClick={prevSlide}
                    className="flex items-center border-primary/20 hover:bg-primary/5"
                    style={{ gap: "0.6cqw", padding: "0.8cqw 1.6cqw", fontSize: "1.2cqw", borderRadius: "1cqw" }}
                  >
                    <ChevronLeft style={{ width: "1.4cqw", height: "1.4cqw" }} />
                    Previous
                  </Button>
                )}
                <Button
                  onClick={nextSlide}
                  className="flex items-center"
                  style={{ gap: "0.6cqw", padding: "0.8cqw 1.6cqw", fontSize: "1.2cqw", borderRadius: "1cqw" }}
                >
                  {isLastSlide ? "Continue" : "Next"}
                  <ChevronRight style={{ width: "1.4cqw", height: "1.4cqw" }} />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
