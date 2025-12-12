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
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/business-cycle/leadgen", { state: location.state })}
        currentStep={5}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
      />

      <div className="flex-1 pt-[73px] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "min(92vw, calc((100vh - 73px - 2rem) * 1.8))",
            height: "min(calc(100vh - 73px - 2rem), calc(92vw / 1.8))",
            containerType: "size",
            padding: "2cqh",
          }}
        >
          <div className="grid h-full" style={{ gridTemplateColumns: "1.3fr 1fr", gap: "2cqh" }}>
            {/* Left - Main Image */}
            <div className="flex items-stretch h-full">
              <img
                src={mainImage}
                alt="Add People"
                className="w-full h-full object-contain transition-opacity duration-500 ease-out"
                style={{ opacity: mainImageLoaded ? 1 : 0, borderRadius: "1.5cqh" }}
                onLoad={() => setMainImageLoaded(true)}
              />
            </div>

            {/* Right - Maps and Reviews */}
            <div className="flex flex-col h-full" style={{ gap: "1cqh" }}>
              {/* Maps Row */}
              <div className="grid grid-cols-2" style={{ gap: "1cqh" }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: map1Loaded ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                  className="bg-white overflow-hidden border border-border/30 shadow-sm aspect-[4/3]"
                  style={{ borderRadius: "1cqh" }}
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
                  className="bg-white overflow-hidden border border-border/30 shadow-sm aspect-[4/3]"
                  style={{ borderRadius: "1cqh" }}
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
              <div className="flex flex-col flex-1" style={{ gap: "0.8cqh" }}>
                {leadgenReviews.map((review, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    className="bg-white border border-border/30 shadow-sm flex-1 flex flex-col justify-center"
                    style={{ borderRadius: "1cqh", padding: "1cqh" }}
                  >
                    <p className="text-[#1a1a1a] leading-snug" style={{ fontSize: "1.1cqh", marginBottom: "0.6cqh" }}>
                      "{review.review}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-[#173340]" style={{ fontSize: "1.1cqh" }}>
                          {review.name}
                        </div>
                        <div className="text-gray-600" style={{ fontSize: "0.9cqh" }}>
                          {review.company}
                        </div>
                      </div>
                      <div className="flex items-center" style={{ gap: "0.2cqh" }}>
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="fill-amber-400 text-amber-400"
                            style={{ width: "1.3cqh", height: "1.3cqh" }}
                          />
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
                className="flex items-center justify-between bg-white border border-border/30 shadow-sm"
                style={{ borderRadius: "1cqh", padding: "1.2cqh" }}
              >
                <div className="flex items-center" style={{ gap: "1.5cqh" }}>
                  <div>
                    <span className="font-display font-bold text-[#173340]" style={{ fontSize: "2.5cqh" }}>
                      2,000+
                    </span>
                    <p className="text-gray-600" style={{ fontSize: "0.9cqh", marginTop: "0.2cqh", maxWidth: "18cqh" }}>
                      five-star reviews on Trustpilot, with an 'Excellent' average rating.
                    </p>
                  </div>
                  <div className="flex items-center" style={{ gap: "0.2cqh", marginRight: "1cqh" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="fill-amber-400 text-amber-400"
                        style={{ width: "1.5cqh", height: "1.5cqh" }}
                      />
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => navigate("/pricing/leadgen", { state: location.state })}
                  className="bg-[#173340] text-white hover:bg-[#173340]/90 flex items-center font-semibold whitespace-nowrap"
                  style={{ gap: "0.5cqh", fontSize: "1.1cqh", padding: "1cqh 2cqh", borderRadius: "0.7cqh" }}
                >
                  View Pricing
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
