import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { ChevronLeft, ChevronRight, Search, MapPin, Phone, Clock, PoundSterling, Shield, BadgeCheck, Check, TrendingUp, Users, Star, Zap } from "lucide-react";
import LogoGraphic from "@/assets/logo_graphic.svg";

const slides = [
  {
    title: "The Challenge",
    subtitle: "Getting found when customers need you most",
    content: [
      { label: "Customers search, but don't see you", description: "Your competitors appear first while you're buried in results", icon: Search },
      { label: "Wasted ad spend", description: "Paying for clicks that never convert into real enquiries", icon: PoundSterling },
      { label: "Trust is hard to earn", description: "New customers don't know if they can rely on you", icon: Users },
      { label: "Limited local reach", description: "Struggling to target the right areas effectively", icon: MapPin },
    ],
  },
  {
    title: "How LSAs Work",
    subtitle: "Google's premium placement for local services",
    content: [
      { label: "Top of Google", description: "Your ad appears above all other search results", icon: TrendingUp },
      { label: "Target your service area", description: "Choose specific towns and postcodes to reach", icon: MapPin },
      { label: "Pay per lead, not per click", description: "Only charged for calls over 30 seconds", icon: Phone },
      { label: "Set your own budget", description: "Minimum £50/week, scale as you grow", icon: PoundSterling },
      { label: "Control your hours", description: "Ads display only during your opening times", icon: Clock },
    ],
  },
  {
    title: "Why It Works",
    subtitle: "Build trust and grow your business",
    content: [
      { label: "Google Guaranteed badge", description: "Customers get £1,500 protection at no cost to you", icon: BadgeCheck },
      { label: "Background verified", description: "Your business is checked and approved by Google", icon: Shield },
      { label: "Reviews front and centre", description: "Your ratings displayed prominently to build confidence", icon: Star },
      { label: "Flexible costs", description: "£5-£25 per lead depending on your industry", icon: Zap },
      { label: "No wasted spend", description: "Don't answer within 30 seconds? No charge", icon: Check },
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

  // Reset loaded states when slide changes
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
        productLabel="LSAs"
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
            {/* Left side - logo, title, visualization */}
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
                        fontSize: slide.title === "How LSAs Work" ? "4.5cqw" : "5.5cqw",
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

                  {/* Visualization area */}
                  <div className="flex-1 flex justify-center items-center w-full overflow-visible" style={{ marginTop: "2cqw" }}>
                    <LSAVisualization slideIndex={currentSlide} />
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
                                className="flex-shrink-0 rounded-full flex items-center justify-center"
                                style={{
                                  width: "3.6cqw",
                                  height: "3.6cqw",
                                  backgroundColor: currentSlide === 0 ? "hsl(var(--destructive) / 0.1)" : currentSlide === 1 ? "hsl(var(--primary) / 0.1)" : "hsl(142 76% 36% / 0.1)",
                                }}
                              >
                                <IconComponent
                                  style={{ width: "1.8cqw", height: "1.8cqw" }}
                                  className={currentSlide === 0 ? "text-destructive" : currentSlide === 1 ? "text-primary" : "text-green-600"}
                                />
                              </div>
                              <div className="flex-1" style={{ minWidth: 0 }}>
                                <p
                                  className="font-semibold text-foreground leading-tight"
                                  style={{ fontSize: "1.3cqw", marginBottom: "0.2cqw" }}
                                >
                                  {item.label}
                                </p>
                                <p className="text-muted-foreground leading-snug" style={{ fontSize: "1cqw" }}>
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

              {/* Navigation buttons - fixed position */}
              <div
                className="absolute bottom-0 left-0 right-0 flex justify-between items-center bg-gradient-to-t from-white via-white to-transparent"
                style={{ padding: "2cqw 3cqw" }}
              >
                {isFirstSlide ? (
                  <div style={{ width: "8cqw" }} />
                ) : (
                  <Button
                    variant="outline"
                    onClick={prevSlide}
                    className="flex items-center border-border/50 hover:bg-muted/50"
                    style={{
                      gap: "0.5cqw",
                      padding: "0.8cqw 1.5cqw",
                      borderRadius: "0.8cqw",
                      fontSize: "1.1cqw",
                    }}
                  >
                    <ChevronLeft style={{ width: "1.2cqw", height: "1.2cqw" }} />
                    Previous
                  </Button>
                )}

                {/* Dot indicators */}
                <div className="flex items-center" style={{ gap: "0.6cqw" }}>
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`rounded-full transition-all duration-300 ${
                        idx === currentSlide ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                      style={{
                        width: idx === currentSlide ? "2cqw" : "0.6cqw",
                        height: "0.6cqw",
                      }}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextSlide}
                  className="flex items-center"
                  style={{
                    gap: "0.5cqw",
                    padding: "0.8cqw 1.5cqw",
                    borderRadius: "0.8cqw",
                    fontSize: "1.1cqw",
                  }}
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

// Visualization component for each slide
function LSAVisualization({ slideIndex }: { slideIndex: number }) {
  if (slideIndex === 0) {
    // Problem - search results showing competitors
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full"
        style={{ maxWidth: "90%" }}
      >
        <div className="bg-white rounded-lg border border-border/30 shadow-lg overflow-hidden" style={{ padding: "1.5cqw" }}>
          <div className="flex items-center" style={{ gap: "0.8cqw", marginBottom: "1.2cqw" }}>
            <div className="bg-muted/50 rounded-full" style={{ width: "2cqw", height: "2cqw" }} />
            <div className="flex-1 bg-muted/30 rounded" style={{ height: "1.2cqw" }} />
            <Search style={{ width: "1.5cqw", height: "1.5cqw" }} className="text-muted-foreground" />
          </div>
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className={`border-l-4 bg-muted/20 ${i === 3 ? "border-destructive/50" : "border-green-500"}`}
              style={{ padding: "1cqw", marginBottom: i < 3 ? "0.8cqw" : 0, borderRadius: "0.4cqw" }}
            >
              <div className="flex items-center justify-between">
                <div className={`font-semibold ${i === 3 ? "text-destructive/70" : "text-foreground"}`} style={{ fontSize: "1.1cqw" }}>
                  {i === 3 ? "Your Business" : `Competitor ${i}`}
                </div>
                {i !== 3 && (
                  <div className="flex items-center" style={{ gap: "0.2cqw" }}>
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="fill-yellow-400 text-yellow-400" style={{ width: "0.8cqw", height: "0.8cqw" }} />
                    ))}
                  </div>
                )}
              </div>
              <div className="text-muted-foreground" style={{ fontSize: "0.9cqw" }}>
                {i === 3 ? "Page 2 of results..." : "Google Guaranteed"}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (slideIndex === 1) {
    // Solution - LSA ad example
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full"
        style={{ maxWidth: "90%" }}
      >
        <div className="bg-white rounded-lg border border-border/30 shadow-lg overflow-hidden" style={{ padding: "1.5cqw" }}>
          <div className="text-muted-foreground uppercase tracking-wider" style={{ fontSize: "0.9cqw", marginBottom: "0.8cqw" }}>
            Sponsored · Plumbers Altrincham
          </div>
          <div className="flex items-center" style={{ gap: "0.6cqw", marginBottom: "1cqw" }}>
            <BadgeCheck className="text-green-500" style={{ width: "1.5cqw", height: "1.5cqw" }} />
            <span className="font-semibold text-green-600" style={{ fontSize: "1cqw" }}>GOOGLE GUARANTEED</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-green-50 to-white border border-green-200 rounded-lg"
            style={{ padding: "1.2cqw" }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: "0.6cqw" }}>
              <span className="font-bold text-foreground" style={{ fontSize: "1.2cqw" }}>Your Business</span>
              <div className="flex items-center" style={{ gap: "0.2cqw" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-yellow-400 text-yellow-400" style={{ width: "0.9cqw", height: "0.9cqw" }} />
                ))}
                <span className="text-muted-foreground" style={{ fontSize: "0.9cqw", marginLeft: "0.3cqw" }}>(47)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground" style={{ fontSize: "0.9cqw" }}>12 years in business</span>
              <div className="flex items-center bg-green-500 text-white rounded-full" style={{ padding: "0.4cqw 1cqw", gap: "0.4cqw" }}>
                <Phone style={{ width: "1cqw", height: "1cqw" }} />
                <span style={{ fontSize: "0.9cqw" }}>Call</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Benefits - trust badges
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full flex flex-col items-center"
      style={{ gap: "1.5cqw", maxWidth: "90%" }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="bg-green-500 rounded-full flex items-center justify-center shadow-lg"
        style={{ width: "8cqw", height: "8cqw" }}
      >
        <BadgeCheck className="text-white" style={{ width: "4cqw", height: "4cqw" }} />
      </motion.div>
      <div className="text-center">
        <div className="font-bold text-foreground" style={{ fontSize: "1.8cqw", marginBottom: "0.5cqw" }}>
          Google Guaranteed
        </div>
        <div className="text-muted-foreground" style={{ fontSize: "1.1cqw" }}>
          £1,500 customer protection
        </div>
      </div>
      <div className="flex items-center" style={{ gap: "1cqw" }}>
        {[
          { icon: Shield, label: "Verified" },
          { icon: Check, label: "Trusted" },
          { icon: Star, label: "Reviewed" },
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            className="bg-white rounded-lg border border-border/30 shadow-sm flex flex-col items-center"
            style={{ padding: "1cqw 1.5cqw" }}
          >
            <item.icon className="text-green-600" style={{ width: "2cqw", height: "2cqw", marginBottom: "0.4cqw" }} />
            <span className="text-foreground font-medium" style={{ fontSize: "0.9cqw" }}>{item.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
