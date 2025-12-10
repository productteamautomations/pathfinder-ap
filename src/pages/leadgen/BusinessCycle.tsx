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
import OngoingServiceIcon from "@/assets/ongoing-service-icon.svg";
import OngoingServiceMainImage from "@/assets/ongoing-service-main.svg";

const slides = [
  {
    title: "Visibility",
    subtitle: "Get found by the right customers",
    content: [
      {
        label: "Keywords They Search",
        description: "Target the exact terms your customers use",
        icon: KeywordsIcon,
      },
      {
        label: "Their Location",
        description: "Show ads only in your service area",
        icon: LocationIcon,
      },
      {
        label: "Device Type",
        description: "Optimise for mobile and desktop users",
        icon: DeviceIcon,
      },
      {
        label: "Time of Day",
        description: "Appear when customers are most active",
        icon: TimeIcon,
      },
      {
        label: "Demographics & Interests",
        description: "Reach your ideal audience",
        icon: DemographicsIcon,
      },
    ],
  },
  {
    title: "Engagement",
    subtitle: "Make your ads impossible to ignore",
    mainImage: EngagementMainImage,
    content: [
      {
        label: "Be Relevant",
        description: "Match your ad to search intent",
        icon: EngagementIcon,
      },
      {
        label: "Be Clear",
        description: "Communicate your value instantly",
        icon: EngagementIcon,
      },
      {
        label: "Be Tempting",
        description: "Give them a reason to click",
        icon: EngagementIcon,
      },
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
      {
        label: "See Exactly What Happens",
        description: "Full visibility after each click",
        icon: SeeExactlyIcon,
      },
      {
        label: "Track Conversions",
        description: "Know which ads generate enquiries",
        icon: TrackConversionsIcon,
      },
      {
        label: "Measure ROI",
        description: "Understand your cost per lead",
        icon: MeasureIcon,
      },
      {
        label: "Optimise Campaigns",
        description: "Use real data, not guesswork",
        icon: OptimiseIcon,
      },
      {
        label: "Say Hello",
        description: "Keep leads warm when a call is missed",
        icon: SayHelloIcon,
      },
    ],
  },
  {
    title: "Lead Management",
    subtitle: "Speed wins deals",
    mainImage: SalesMainImage,
    content: [
      {
        label: "Respond within 5 minutes",
        description: "21× more likely to qualify the lead",
        icon: SalesRespondIcon,
      },
      {
        label: "Waiting >5 minutes",
        description: "Reduces your chance by 80%+",
        icon: SalesWaitingIcon,
      },
      {
        label: "78% of sales",
        description: "Go to the first responder",
        icon: Sales78PercentIcon,
      },
      {
        label: "30 minute delay",
        description: "Makes you 100× less likely to connect",
        icon: Sales30MinIcon,
      },
      {
        label: "Missed leads cost",
        description: "UK businesses £20k–£22k monthly",
        icon: SalesMissedIcon,
      },
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
      {
        label: "Google Ads account setup",
        description: "New account or optimise existing",
        icon: YourSetupIcon,
      },
      {
        label: "Search campaign creation",
        description: "Built from scratch",
        icon: YourSetupIcon,
      },
      {
        label: "Conversion tracking setup",
        description: "Enhanced attribution solution",
        icon: YourSetupIcon,
      },
      {
        label: "Campaign launch call",
        description: "Final review and go live",
        icon: YourSetupIcon,
      },
    ],
  },
  {
    title: "Ongoing Service",
    subtitle: "Continuous improvement",
    mainImage: OngoingServiceMainImage,
    content: [
      {
        label: "Lead Generation Service team",
        description: "Dedicated support",
        icon: OngoingServiceIcon,
      },
      {
        label: "Technical team support",
        description: "Monthly Account optimisations and tracking checks",
        icon: OngoingServiceIcon,
      },
      {
        label: "Campaign monitoring",
        description: "Continuous oversight and refinement",
        icon: OngoingServiceIcon,
      },
      {
        label: "Call attribution dashboard",
        description: "Track performance data",
        icon: OngoingServiceIcon,
      },
      {
        label: "Monthly reporting",
        description: "Detailed campaign performance",
        icon: OngoingServiceIcon,
      },
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
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <PageHeader
        onBack={() => navigate("/funnel-health/leadgen", { state: location.state })}
        currentStep={4}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Left side - logo, title, image */}
        <div className="w-1/2 flex flex-col bg-white p-12 overflow-hidden">
          {/* Logo and Title */}
          <div className="flex items-start gap-6 mb-8 flex-shrink-0">
            <motion.img
              src={LogoGraphic}
              alt="Logo"
              className="w-16 h-16 flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: iconLoaded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              onLoad={() => setIconLoaded(true)}
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold text-[#1A1A1A] mb-2">{slide.title}</h1>
              <p className="text-lg text-[#666666]">{slide.subtitle}</p>
            </div>
          </div>

          {/* Orange accent dots */}
          <div className="flex gap-2 mb-6 flex-shrink-0">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#FF6B35]" />
            ))}
          </div>

          {/* Main image - improved sizing */}
          <motion.div
            className="flex-1 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-full flex items-center justify-center p-4">
              <img
                src={slide.mainImage || VisibilityMainImage}
                alt={slide.title}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                style={{
                  imageRendering: "crisp-edges",
                }}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </motion.div>
        </div>

        {/* Right side - content list */}
        <div className="w-1/2 flex flex-col bg-[#FAFAFA] p-12 overflow-y-auto">
          <div className="text-sm text-[#999999] mb-8 flex-shrink-0">
            Slide {currentSlide + 1} — {totalSlides}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 relative"
            >
              {/* Vertical connecting line for Your Setup */}
              {slide.title === "Your Setup" && (
                <div className="absolute left-[15px] top-8 bottom-8 w-[2px] bg-[#E5E5E5] z-0" />
              )}

              <ul className="space-y-6 relative z-10">
                {slide.content?.map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    {item.isExample ? (
                      <div className="bg-white p-6 rounded-lg border-2 border-[#FF6B35] w-full">
                        <div className="space-y-3">
                          <div className="text-sm text-[#999999]">
                            INSTEAD OF: <span className="line-through">"PROFESSIONAL LOFT CONVERSIONS"</span>
                          </div>
                          <div className="text-sm font-semibold text-[#1A1A1A]">
                            USE:{" "}
                            <span className="text-[#FF6B35]">"LOFT CONVERSIONS IN ALTRINCHAM – FREE QUOTE TODAY"</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {item.icon ? (
                          <img src={item.icon} alt="" className="w-8 h-8 flex-shrink-0" />
                        ) : (
                          <span className="text-[#FF6B35] text-2xl leading-none flex-shrink-0">•</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">{item.label}</h3>
                          {item.description && <p className="text-sm text-[#666666]">{item.description}</p>}
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Fixed navigation buttons - outside AnimatePresence */}
      <div className="flex-shrink-0 flex items-center justify-between px-12 py-6 bg-white border-t border-[#E5E5E5]">
        <Button
          variant="secondary"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {/* Dot Progress Indicator */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-[#FF6B35] w-8" : "bg-[#E5E5E5] hover:bg-[#CCCCCC]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button variant="primary" onClick={nextSlide} className="flex items-center gap-2">
          {isLastSlide ? "About Us" : "Next"}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
