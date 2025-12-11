import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { ChevronRight, Star } from "lucide-react";
import mainImage from "@/assets/leadgen-about-main.svg";
import altrinchamMap from "@/assets/altrincham-map-new.svg";
import austinMap from "@/assets/austin-map.svg";

const leadgenReviews = [
  {
    name: "Sarah Mitchell",
    company: "Mitchell Plumbing",
    review: "Within 3 months, we went from page 3 to the top 3 in Google Maps. Our calls have doubled!",
    rating: 5,
  },
  {
    name: "James Crawford",
    company: "Crawford Electrical",
    review: "The team really understands local SEO. Our Google Business Profile is now fully optimised and generating leads daily.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    company: "Thompson Roofing",
    review: "Professional service from start to finish. Our local visibility has improved dramatically.",
    rating: 5,
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
          
          {/* Left Column - Main Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden h-full"
          >
            <img
              src={mainImage}
              alt="Add People - 60+ countries, 20+ years, 250+ experts"
              className="w-full h-full object-cover rounded-2xl"
            />
          </motion.div>

          {/* Right Column - Maps, Reviews & CTA */}
          <div className="flex flex-col gap-3 h-full">
            {/* Maps Row - Side by Side */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-3 flex-shrink-0"
            >
              {/* Altrincham Map */}
              <div className="bg-white rounded-xl overflow-hidden border border-border/30 shadow-sm">
                <img
                  src={altrinchamMap}
                  alt="Altrincham, UK office"
                  className="w-full h-24 lg:h-28 object-cover"
                />
                <div className="py-2 px-3 text-center">
                  <span className="text-sm font-semibold text-[#173340]">Altrincham, UK</span>
                </div>
              </div>

              {/* Austin Map */}
              <div className="bg-white rounded-xl overflow-hidden border border-border/30 shadow-sm">
                <img
                  src={austinMap}
                  alt="Austin, USA office"
                  className="w-full h-24 lg:h-28 object-cover"
                />
                <div className="py-2 px-3 text-center">
                  <span className="text-sm font-semibold text-[#173340]">Austin, USA</span>
                </div>
              </div>
            </motion.div>

            {/* Reviews */}
            <div className="flex-1 flex flex-col gap-2">
              {leadgenReviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
                  className="bg-white rounded-xl p-4 border border-border/30 shadow-sm flex-1 flex flex-col justify-center"
                >
                  <p className="text-sm text-foreground leading-relaxed mb-2">
                    "{review.review}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-[#173340]">{review.name}</div>
                      <div className="text-xs text-muted-foreground">{review.company}</div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trustpilot & CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl p-4 border border-border/30 shadow-sm flex items-center justify-between gap-4 flex-shrink-0"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-[#173340]">2,000+</div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <div className="text-xs text-muted-foreground flex-1">
                five-star reviews on Trustpilot, with an 'Excellent' average rating.
              </div>
              <Button
                onClick={() => navigate("/pricing/leadgen", { state: location.state })}
                className="bg-[#173340] text-white hover:bg-[#173340]/90 flex items-center justify-center gap-2 font-semibold px-6"
              >
                View Pricing
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
