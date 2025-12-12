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

      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "90vw",
            aspectRatio: "1.86",
            padding: "3cqw",
          }}
        >
          <div className="grid h-full" style={{ gridTemplateColumns: "1.5fr 1fr", gap: "2cqw" }}>
            {/* Left - Main Image */}
            <div className="flex items-stretch h-full">
              <img
                src={mainImage}
                alt="Add People"
                className="w-full h-full object-cover transition-opacity duration-500 ease-out"
                style={{ opacity: mainImageLoaded ? 1 : 0, borderRadius: "1.5cqw" }}
                onLoad={() => setMainImageLoaded(true)}
              />
            </div>

            {/* Right - Maps and Reviews */}
            <div className="flex flex-col h-full" style={{ gap: "1.5cqw" }}>
              {/* Maps Row */}
              <div className="grid grid-cols-2" style={{ gap: "1cqw" }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: map1Loaded ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                  className="bg-white overflow-hidden border border-border/30 shadow-sm aspect-[4/3]"
                  style={{ borderRadius: "1.2cqw" }}
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
                  style={{ borderRadius: "1.2cqw" }}
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
              <div className="flex flex-col flex-1" style={{ gap: "1.2cqw" }}>
                {leadgenReviews.map((review, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    className="bg-white border border-border/30 shadow-sm"
                    style={{ borderRadius: "1.2cqw", padding: "1.2cqw" }}
                  >
                    <p className="text-[#1a1a1a] leading-relaxed" style={{ fontSize: "1.2cqw", marginBottom: "1cqw" }}>
                      "{review.review}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-[#173340]" style={{ fontSize: "1.2cqw" }}>
                          {review.name}
                        </div>
                        <div className="text-gray-600" style={{ fontSize: "1cqw" }}>
                          {review.company}
                        </div>
                      </div>
                      <div className="flex items-center" style={{ gap: "0.2cqw" }}>
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="fill-amber-400 text-amber-400"
                            style={{ width: "1.5cqw", height: "1.5cqw" }}
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
                style={{ borderRadius: "1.2cqw", padding: "1.5cqw" }}
              >
                <div className="flex items-center" style={{ gap: "2cqw" }}>
                  <div>
                    <span className="font-display font-bold text-[#173340]" style={{ fontSize: "3cqw" }}>
                      2,000+
                    </span>
                    <p className="text-gray-600" style={{ fontSize: "1cqw", marginTop: "0.3cqw", maxWidth: "20cqw" }}>
                      five-star reviews on Trustpilot, with an 'Excellent' average rating.
                    </p>
                  </div>
                  <div className="flex items-center" style={{ gap: "0.2cqw", marginRight: "1.5cqw" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="fill-amber-400 text-amber-400"
                        style={{ width: "1.8cqw", height: "1.8cqw" }}
                      />
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => navigate("/pricing/leadgen", { state: location.state })}
                  className="bg-[#173340] text-white hover:bg-[#173340]/90 flex items-center font-semibold whitespace-nowrap"
                  style={{ gap: "0.6cqw", fontSize: "1.2cqw", padding: "1.2cqw 2.5cqw", borderRadius: "0.8cqw" }}
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
