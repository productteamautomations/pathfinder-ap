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
    content: [
      {
        label: "Lead Generation Service team",
        description: "Dedicated support",
        icon: KeywordsIcon,
      },
      {
        label: "Technical team support",
        description: "Monthly Account optimisations and tracking checks",
        icon: LocationIcon,
      },
      {
        label: "Campaign monitoring",
        description: "Continuous oversight and refinement",
        icon: DeviceIcon,
      },
      {
        label: "Call attribution dashboard",
        description: "Track performance data",
        icon: TimeIcon,
      },
      {
        label: "Monthly reporting",
        description: "Detailed campaign performance",
        icon: DemographicsIcon,
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <PageHeader
        onBack={() => navigate("/funnel-health/leadgen", { state: location.state })}
        currentStep={4}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
      />

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-7xl grid grid-cols-2 gap-16">
          {/* Left side - logo, title, image */}
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Logo and Title */}
            <div className="flex flex-col items-center space-y-4">
              <img src={LogoGraphic} alt="Logo" className="w-16 h-16" onLoad={() => setIconLoaded(true)} />
              <div className="text-center">
                <h1 className="text-4xl font-bold text-slate-900">{slide.title}</h1>
                <p className="text-xl text-slate-600 mt-2">{slide.subtitle}</p>
              </div>
            </div>

            {/* Orange accent dots */}
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-orange-500" />
              ))}
            </div>

            {/* Main image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={slide.mainImage || VisibilityMainImage}
                alt={slide.title}
                className="w-full max-w-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onLoad={() => setImageLoaded(true)}
              />
            </AnimatePresence>
          </div>

          {/* Right side - content list */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <p className="text-sm text-slate-500">
                Slide {currentSlide + 1} — {totalSlides}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={currentSlide}
                className="space-y-6 relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Vertical connecting line for Your Setup */}
                {slide.title === "Your Setup" && (
                  <div
                    className="absolute left-[15px] w-[3px] bg-orange-500/40"
                    style={{
                      zIndex: 0,
                      top: "60px",
                      height: "calc(100% - 120px)",
                    }}
                  />
                )}

                {slide.content?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 relative" style={{ zIndex: 1 }}>
                    {item.isExample ? (
                      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg w-full">
                        <p className="text-sm text-slate-600 mb-2">
                          INSTEAD OF: <span className="line-through">"PROFESSIONAL LOFT CONVERSIONS"</span>
                        </p>
                        <p className="text-sm text-slate-900 font-medium">
                          USE:{" "}
                          <span className="text-orange-600">"LOFT CONVERSIONS IN ALTRINCHAM – FREE QUOTE TODAY"</span>
                        </p>
                      </div>
                    ) : (
                      <>
                        {item.icon ? (
                          <img src={item.icon} alt="" className="w-8 h-8 flex-shrink-0" />
                        ) : (
                          <span className="text-orange-500 text-xl flex-shrink-0">•</span>
                        )}
                        <div>
                          <h3 className="font-semibold text-slate-900">{item.label}</h3>
                          {item.description && <p className="text-sm text-slate-600 mt-1">{item.description}</p>}
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Fixed navigation buttons - outside AnimatePresence */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
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
                index === currentSlide ? "bg-orange-500 w-8" : "bg-slate-300 hover:bg-slate-400"
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
