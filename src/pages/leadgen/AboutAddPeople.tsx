import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { ChevronRight } from "lucide-react";
import LogoGraphic from "@/assets/Logo_graphic.svg";
import AltrinchamMap from "@/assets/altrincham-map.svg";
import AustinMap from "@/assets/austin-map.svg";
import AboutMainImage from "@/assets/about-main-image.svg";
import FiveStars from "@/assets/five-stars-wide.svg";

const reviews = [
  {
    quote: "Within 3 months, we went from page 3 to the top 3 in Google Maps. Our calls have doubled!",
    name: "Sarah Mitchell",
    company: "Mitchell Plumbing",
  },
  {
    quote: "The team really understands local SEO. Our Google Business Profile is now fully optimised and generating leads daily.",
    name: "James Crawford",
    company: "Crawford Electrical",
  },
  {
    quote: "Professional service from start to finish. Our local visibility has improved dramatically.",
    name: "Emma Thompson",
    company: "Thompson Roofing",
  },
];

export default function AboutAddPeopleLeadGen() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen h-screen flex flex-col overflow-hidden bg-muted/30">
      <PageHeader
        onBack={() => navigate("/business-cycle/leadgen", { state: location.state })}
        currentStep={5}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
      />

      <div className="flex-1 pt-[73px] px-4 md:px-8 lg:px-12 flex flex-col overflow-hidden">
        <div className="flex-1 grid lg:grid-cols-2 gap-4 lg:gap-6 py-4 max-w-[1400px] mx-auto w-full h-full">
          
          {/* Left Column - Main Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#173340] rounded-[1.5rem] p-6 lg:p-8 text-white flex flex-col h-full overflow-hidden"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <img src={LogoGraphic} alt="Add People" className="w-10 h-10" />
              <span className="text-2xl font-display font-bold">Add People</span>
            </div>

            {/* Stats */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-primary">60+</div>
                <p className="text-white/70 text-sm">
                  countries in which we assist clients, in a range of industries, to make a lasting impact.
                </p>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-primary">20+</div>
                <p className="text-white/70 text-sm">
                  years operating and helping businesses like yours.
                </p>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-primary">250+</div>
                <p className="text-white/70 text-sm">
                  experts in the company, all passionate about marketing.
                </p>
              </div>
            </div>

            {/* Main Image - fills remaining space */}
            <div className="flex-1 relative min-h-0 mt-auto">
              <img
                src={AboutMainImage}
                alt="Add People team"
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
              />
            </div>
          </motion.div>

          {/* Right Column - Maps, Reviews, CTA */}
          <div className="flex flex-col gap-3 h-full">
            {/* Maps Row */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-3 flex-shrink-0"
            >
              <div className="bg-white rounded-xl overflow-hidden border border-border/30 shadow-sm">
                <img src={AltrinchamMap} alt="Altrincham, UK" className="w-full h-28 lg:h-32 object-cover" />
                <div className="p-2 text-center">
                  <span className="text-sm font-semibold text-[#173340]">Altrincham, UK</span>
                </div>
              </div>
              <div className="bg-white rounded-xl overflow-hidden border border-border/30 shadow-sm">
                <img src={AustinMap} alt="Austin, USA" className="w-full h-28 lg:h-32 object-cover" />
                <div className="p-2 text-center">
                  <span className="text-sm font-semibold text-[#173340]">Austin, USA</span>
                </div>
              </div>
            </motion.div>

            {/* Reviews */}
            <div className="flex-1 flex flex-col gap-3 min-h-0">
              {reviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  className="bg-white rounded-xl p-4 border border-border/30 shadow-sm flex-1 flex flex-col justify-center"
                >
                  <p className="text-sm text-foreground leading-relaxed mb-3">
                    "{review.quote}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-[#173340]">{review.name}</div>
                      <div className="text-xs text-muted-foreground">{review.company}</div>
                    </div>
                    <img src={FiveStars} alt="5 stars" className="h-5" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Row - Reviews Count & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-xl p-4 border border-border/30 shadow-sm flex items-center justify-between flex-shrink-0"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl lg:text-4xl font-bold text-[#173340]">2,000+</div>
                <div>
                  <img src={FiveStars} alt="5 stars" className="h-5 mb-1" />
                  <p className="text-xs text-muted-foreground">
                    five-star reviews on Trustpilot, with an 'Excellent' average rating.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => navigate("/pricing/leadgen", { state: location.state })}
                className="bg-[#173340] text-white hover:bg-[#173340]/90 flex items-center gap-2 font-semibold px-6"
              >
                View Pricing
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
