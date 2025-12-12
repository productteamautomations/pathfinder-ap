import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Star } from "lucide-react";
import mainImage from "@/assets/Main-image-about-us.svg";
import altrinchamMap from "@/assets/altrinham-map.svg";
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
    review:
      "The team really understands local SEO. Our Google Business Profile is now fully optimised and generating leads daily.",
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
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [map1Loaded, setMap1Loaded] = useState(false);
  const [map2Loaded, setMap2Loaded] = useState(false);

  return (
    <div className="min-h-screen h-screen flex flex-col overflow-hidden">
      <PageHeader
        onBack={() => navigate("/business-cycle/leadgen", { state: location.state })}
        currentStep={5}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
      />

      <div className="flex-1 pt-[73px] px-4 md:px-8 lg:px-12 flex items-center justify-center overflow-hidden">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 max-w-[1400px] mx-auto w-full">
          {/* Left - Main Image */}
          <div className="relative">
            <img
              src={mainImage}
              alt="Add People"
              className="w-full h-auto object-contain rounded-2xl transition-opacity duration-500 ease-out"
              style={{ opacity: mainImageLoaded ? 1 : 0 }}
              onLoad={() => setMainImageLoaded(true)}
            />
          </div>

          {/* Right - Maps and Reviews */}
          <div className="flex flex-col gap-4 self-stretch">
            {/* Maps Row */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: map1Loaded ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                className="bg-white rounded-xl overflow-hidden border border-border/30 shadow-sm aspect-[4/3]"
              >
                <img
                  src={altrinchamMap}
                  alt="Altrincham Location"
                  className="w-full h-full object-cover"
                  onLoad={() => setMap1Loaded(true)}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: map2Loaded ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
                className="bg-white rounded-xl overflow-hidden border border-border/30 shadow-sm aspect-[4/3]"
              >
                <img
                  src={austinMap}
                  alt="Austin Location"
                  className="w-full h-full object-cover"
                  onLoad={() => setMap2Loaded(true)}
                />
              </motion.div>
            </div>

            {/* Reviews */}
            <div className="flex flex-col gap-4 flex-1">
              {leadgenReviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  className="bg-white rounded-xl p-4 border border-border/30 shadow-sm"
                >
                  <p className="text-sm text-[#1a1a1a] leading-relaxed mb-3">"{review.review}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-[#173340]">{review.name}</div>
                      <div className="text-xs text-gray-600">{review.company}</div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-between bg-white rounded-xl p-5 border border-border/30 shadow-sm"
            >
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-4xl font-display font-bold text-[#173340]">2,000+</span>
                  <p className="text-xs text-gray-600 mt-1 max-w-[280px]">
                    five-star reviews on Trustpilot, with an 'Excellent' average rating.
                  </p>
                </div>
                <div className="flex items-center gap-0.5 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <Button
                onClick={() => navigate("/pricing/leadgen", { state: location.state })}
                className="bg-[#173340] text-white hover:bg-[#173340]/90 flex items-center gap-2 font-semibold px-8 py-6 text-base whitespace-nowrap"
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
