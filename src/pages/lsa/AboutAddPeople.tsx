import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Star } from "lucide-react";
import mainImage from "@/assets/Main-image-about-us.svg";
import altrinchamMap from "@/assets/altrinham-map.svg";
import austinMap from "@/assets/austin-map.svg";

const lsaReviews = [
  {
    name: "Tom Williams",
    company: "Williams HVAC",
    review: "Local Service Ads have been a game-changer. We only pay for actual leads, and the quality is excellent.",
    rating: 5,
  },
  {
    name: "Karen Hughes",
    company: "Hughes Locksmith",
    review: "Getting the Google Guaranteed badge made all the difference. Customers trust us immediately.",
    rating: 5,
  },
  {
    name: "Steve Anderson",
    company: "Anderson Garage Doors",
    review: "The Add People team handled everything - from verification to optimisation. We're now #1 in our area.",
    rating: 5,
  },
];

export default function AboutAddPeopleLSA() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [map1Loaded, setMap1Loaded] = useState(false);
  const [map2Loaded, setMap2Loaded] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background relative" style={{ containerType: "size" }}>
      <PageHeader
        onBack={() => navigate("/about-product/lsa", { state: location.state })}
        currentStep={3}
        totalSteps={4}
        showProgress
        productLabel="LSAs"
      />

      <div className="flex-1 flex items-center justify-center" style={{ paddingTop: "10cqh", paddingLeft: "4cqw", paddingRight: "4cqw", paddingBottom: "2cqw" }}>
        <div
          style={{
            width: "100%",
            maxWidth: "92cqw",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              width: "100%",
              aspectRatio: "1.8",
              maxHeight: "100%",
              padding: "2cqw",
              containerType: "size",
            }}
          >
          <div className="grid h-full" style={{ gridTemplateColumns: "1.3fr 1fr", gap: "2cqw" }}>
            {/* Left - Main Image */}
            <div className="flex items-stretch h-full">
              <img
                src={mainImage}
                alt="Add People"
                className="w-full h-full object-contain transition-opacity duration-500 ease-out"
                style={{ opacity: mainImageLoaded ? 1 : 0, borderRadius: "1.5cqw" }}
                onLoad={() => setMainImageLoaded(true)}
              />
            </div>

            {/* Right - Maps and Reviews */}
            <div className="flex flex-col h-full" style={{ gap: "1cqw" }}>
              {/* Maps Row */}
              <div className="grid grid-cols-2" style={{ gap: "1cqw" }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: map1Loaded ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                  className="bg-white overflow-hidden border border-border/30 shadow-sm aspect-[4/3]"
                  style={{ borderRadius: "1cqw" }}
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
                  style={{ borderRadius: "1cqw" }}
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
              <div className="flex flex-col flex-1" style={{ gap: "0.8cqw" }}>
                {lsaReviews.map((review, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    className="bg-white border border-border/30 shadow-sm flex-1 flex flex-col justify-center"
                    style={{ borderRadius: "1cqw", padding: "1cqw" }}
                  >
                    <p className="text-[#1a1a1a] leading-snug" style={{ fontSize: "1.1cqw", marginBottom: "0.6cqw" }}>
                      "{review.review}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-[#173340]" style={{ fontSize: "1.1cqw" }}>
                          {review.name}
                        </div>
                        <div className="text-gray-600" style={{ fontSize: "0.9cqw" }}>
                          {review.company}
                        </div>
                      </div>
                      <div className="flex items-center" style={{ gap: "0.2cqw" }}>
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="fill-amber-400 text-amber-400"
                            style={{ width: "1.3cqw", height: "1.3cqw" }}
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
                style={{ borderRadius: "1cqw", padding: "1.2cqw" }}
              >
                <div className="flex items-center" style={{ gap: "1.5cqw" }}>
                  <div>
                    <span className="font-display font-bold text-[#173340]" style={{ fontSize: "2.5cqw" }}>
                      2,000+
                    </span>
                    <p className="text-gray-600" style={{ fontSize: "0.9cqw", marginTop: "0.2cqw", maxWidth: "18cqw" }}>
                      five-star reviews on Trustpilot, with an 'Excellent' average rating.
                    </p>
                  </div>
                  <div className="flex items-center" style={{ gap: "0.2cqw", marginRight: "1cqw" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="fill-amber-400 text-amber-400"
                        style={{ width: "1.5cqw", height: "1.5cqw" }}
                      />
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => navigate("/pricing/lsa", { state: location.state })}
                  className="bg-[#173340] text-white hover:bg-[#173340]/90 flex items-center font-semibold whitespace-nowrap"
                  style={{ gap: "0.5cqw", fontSize: "1.1cqw", padding: "1cqw 2cqw", borderRadius: "0.7cqw" }}
                >
                  View Pricing
                </Button>
              </motion.div>
            </div>
          </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}