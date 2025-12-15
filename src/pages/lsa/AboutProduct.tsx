import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { ChevronLeft, ChevronRight, Phone, MapPin, Clock, PoundSterling, Shield, BadgeCheck, Zap, Timer, Settings } from "lucide-react";
import LogoGraphic from "@/assets/logo_graphic.svg";

const slides = [
  {
    title: "What is an LSA?",
    subtitle: "Google Local Services Ads",
    content: [
      { 
        label: "Top of Google", 
        description: "Ads displayed at the very top of search results",
        Icon: Zap 
      },
      { 
        label: "Local Targeting", 
        description: "Shown to customers searching in your service area",
        Icon: MapPin 
      },
      { 
        label: "Opening Hours", 
        description: "Ads display during your chosen business hours",
        Icon: Clock 
      },
      { 
        label: "Direct Calls", 
        description: "Customers call you directly from the ad",
        Icon: Phone 
      },
    ],
  },
  {
    title: "How They Work",
    subtitle: "Pay only for real leads",
    content: [
      { 
        label: "Customer Searches", 
        description: "Someone in your area searches for your service",
        Icon: MapPin 
      },
      { 
        label: "Call Notification", 
        description: "You receive a whisper: 'This is a call from Google'",
        Icon: Phone 
      },
      { 
        label: "30 Second Rule", 
        description: "Calls under 30 seconds are not charged",
        Icon: Timer 
      },
      { 
        label: "Charged Lead", 
        description: "After 30 seconds, you pay for a qualified lead (£5-£25)",
        Icon: PoundSterling 
      },
    ],
  },
  {
    title: "Service Areas",
    subtitle: "Target exactly where you work",
    content: [
      { 
        label: "Choose Locations", 
        description: "Select specific towns, cities, and postcodes",
        Icon: MapPin 
      },
      { 
        label: "Include Areas", 
        description: "Add all the areas where you offer your services",
        Icon: BadgeCheck 
      },
      { 
        label: "Exclude Areas", 
        description: "Remove locations you don't want to serve",
        Icon: Shield 
      },
      { 
        label: "Local Customers", 
        description: "Only people in your areas see your ad",
        Icon: Zap 
      },
    ],
  },
  {
    title: "Set Your Budget",
    subtitle: "Flexible spending options",
    content: [
      { 
        label: "Minimum £50/week", 
        description: "Start with a budget that works for you",
        Icon: PoundSterling 
      },
      { 
        label: "6-16 Leads/Week", 
        description: "Potential leads depending on performance",
        Icon: Phone 
      },
      { 
        label: "Pay Per Lead", 
        description: "Only charged for calls over 30 seconds",
        Icon: Timer 
      },
      { 
        label: "Higher Budget = Better Results", 
        description: "More budget means better ad placement",
        Icon: Zap 
      },
    ],
  },
  {
    title: "Google Guaranteed",
    subtitle: "Earn customer trust instantly",
    content: [
      { 
        label: "Verified Badge", 
        description: "Display the Google Guaranteed checkmark",
        Icon: BadgeCheck 
      },
      { 
        label: "Public Liability Insurance", 
        description: "Proof of £250,000 minimum cover required",
        Icon: Shield 
      },
      { 
        label: "Business Registration", 
        description: "VAT registered or Companies House registered",
        Icon: Settings 
      },
      { 
        label: "£1,500 Protection", 
        description: "Customer protection if something goes wrong",
        Icon: PoundSterling 
      },
    ],
  },
];

export default function AboutProductLSA() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
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
  const isFirstSlide = currentSlide === 0;
  const totalSlides = slides.length;

  useEffect(() => {
    setIconLoaded(false);
  }, [currentSlide]);

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/product-recommendation/lsa", { state: location.state })}
        currentStep={2}
        totalSteps={4}
        showProgress
        productLabel="LSA's"
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
            {/* Left side - logo, title, illustration */}
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
                        lineHeight: "1.1",
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

                  {/* Illustration area */}
                  <div className="flex-1 flex items-center justify-center w-full">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="relative w-full"
                      style={{ padding: "2cqw" }}
                    >
                      {/* LSA Card Illustration */}
                      <div
                        className="bg-white border border-border/30 shadow-lg"
                        style={{ borderRadius: "1.5cqw", padding: "2cqw" }}
                      >
                        <div className="flex items-center" style={{ gap: "1cqw", marginBottom: "1.5cqw" }}>
                          <div
                            className="bg-green-500 flex items-center justify-center"
                            style={{ width: "3cqw", height: "3cqw", borderRadius: "0.8cqw" }}
                          >
                            <BadgeCheck style={{ width: "1.8cqw", height: "1.8cqw" }} className="text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground" style={{ fontSize: "1.3cqw" }}>
                              Google Guaranteed
                            </p>
                            <p className="text-muted-foreground" style={{ fontSize: "1cqw" }}>
                              Verified Business
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between" style={{ marginBottom: "1cqw" }}>
                          <div>
                            <p className="font-semibold text-foreground" style={{ fontSize: "1.2cqw" }}>
                              Your Business Name
                            </p>
                            <div className="flex items-center" style={{ gap: "0.5cqw", marginTop: "0.3cqw" }}>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="text-yellow-400"
                                    style={{ width: "1cqw", height: "1cqw" }}
                                  >
                                    ★
                                  </div>
                                ))}
                              </div>
                              <span className="text-muted-foreground" style={{ fontSize: "0.9cqw" }}>
                                5.0 (24)
                              </span>
                            </div>
                          </div>
                          <div
                            className="bg-primary text-white font-semibold flex items-center"
                            style={{ padding: "0.6cqw 1.2cqw", borderRadius: "0.6cqw", fontSize: "1cqw", gap: "0.4cqw" }}
                          >
                            <Phone style={{ width: "1cqw", height: "1cqw" }} />
                            Call
                          </div>
                        </div>
                        
                        <div className="flex items-center" style={{ gap: "1cqw" }}>
                          <span className="text-muted-foreground" style={{ fontSize: "0.9cqw" }}>
                            12 years in business
                          </span>
                          <span className="text-muted-foreground" style={{ fontSize: "0.9cqw" }}>
                            •
                          </span>
                          <span className="text-muted-foreground" style={{ fontSize: "0.9cqw" }}>
                            Open 24/7
                          </span>
                        </div>
                      </div>
                    </motion.div>
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
                        style={{ display: "flex", flexDirection: "column", gap: "1.2cqw", zIndex: 1 }}
                      >
                        {slide.content?.map((item, idx) => {
                          const IconComponent = item.Icon;
                          return (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + idx * 0.1, duration: 0.3, ease: "easeOut" }}
                              className="flex bg-white items-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border/30"
                              style={{
                                borderRadius: "1.2cqw",
                                padding: "1.2cqw",
                                gap: "1.2cqw",
                              }}
                            >
                              <div
                                className="flex-shrink-0 bg-primary/10 flex items-center justify-center"
                                style={{ width: "3.5cqw", height: "3.5cqw", borderRadius: "0.8cqw" }}
                              >
                                <IconComponent
                                  className="text-primary"
                                  style={{ width: "1.8cqw", height: "1.8cqw" }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className="font-semibold text-foreground leading-tight"
                                  style={{ fontSize: "1.3cqw", marginBottom: "0.2cqw" }}
                                >
                                  {item.label}
                                </p>
                                <p
                                  className="text-muted-foreground leading-snug"
                                  style={{ fontSize: "1cqw" }}
                                >
                                  {item.description}
                                </p>
                              </div>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation buttons */}
              <div
                className="absolute left-0 right-0 flex items-center justify-between"
                style={{ bottom: "2.5cqw", padding: "0 3cqw" }}
              >
                {isFirstSlide ? (
                  <div style={{ width: "10cqw" }} />
                ) : (
                  <Button
                    variant="outline"
                    onClick={prevSlide}
                    className="flex items-center border-border/50 hover:bg-muted/50"
                    style={{ gap: "0.5cqw", fontSize: "1.1cqw", padding: "0.8cqw 1.5cqw", borderRadius: "0.8cqw" }}
                  >
                    <ChevronLeft style={{ width: "1.2cqw", height: "1.2cqw" }} />
                    Previous
                  </Button>
                )}

                {/* Dot indicators */}
                <div className="flex items-center" style={{ gap: "0.5cqw" }}>
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`rounded-full transition-all duration-300 ${
                        idx === currentSlide ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                      style={{
                        width: idx === currentSlide ? "1.8cqw" : "0.6cqw",
                        height: "0.6cqw",
                      }}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextSlide}
                  className="flex items-center"
                  style={{ gap: "0.5cqw", fontSize: "1.1cqw", padding: "0.8cqw 1.5cqw", borderRadius: "0.8cqw" }}
                >
                  {isLastSlide ? "Continue" : "Next"}
                  <ChevronRight style={{ width: "1.2cqw", height: "1.2cqw" }} />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
