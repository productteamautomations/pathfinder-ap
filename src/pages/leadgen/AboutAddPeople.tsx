import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { ChevronRight, Star } from "lucide-react";
import mainImage from "@/assets/Main-image-about-us.svg";
import altrinchamMap from "@/assets/altrinham map.svg";
import austinMap from "@/assets/austin map.svg";

const leadgenReviews = [
  {
    name: "David Parker",
    company: "Parker Construction",
    review:
      "Our Google Ads campaigns went from losing money to generating 30+ qualified leads per month. Incredible turnaround!",
    rating: 5,
  },
  {
    name: "Lisa Chen",
    company: "Chen Dental Practice",
    review: "The team understood exactly what we needed. Our cost per lead dropped by 60% while quality improved.",
    rating: 5,
  },
  {
    name: "Michael Roberts",
    company: "Roberts Law Firm",
    review: "Professional, data-driven approach. We now have a steady stream of high-quality enquiries every week.",
    rating: 5,
  },
];

export default function AboutAddPeopleLeadGen() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen h-screen flex flex-col overflow-hidden">
      <PageHeader
        onBack={() => navigate("/business-cycle/leadgen", { state: location.state })}
        currentStep={5}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
      />

      <div className="flex-1 pt-[73px] px-4 md:px-8 lg:px-12 flex flex-col overflow-hidden">
        <div className="flex-1 grid lg:grid-cols-12 gap-4 lg:gap-5 py-4 max-w-[1600px] mx-auto w-full h-full">
          {/* Left Section - Main Image with About Overlay + Reviews */}
          <div className="lg:col-span-8 flex flex-col gap-4 h-full">
            {/* Top Row - Main Image with About Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-gradient-to-br from-[#173340] to-[#1e4455] rounded-2xl flex-1 overflow-hidden flex items-center justify-center"
            >
              {/* Main Image */}
              <img 
                src={mainImage} 
                alt="Add People Team" 
                className="w-full h-full object-contain p-4 pb-28" 
              />
              
              {/* About Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#173340] via-[#173340]/95 to-transparent p-6 pt-16">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">About</span>
                <h1 className="text-3xl lg:text-4xl font-display font-bold mt-1 leading-tight text-white">Add People</h1>
                <p className="text-white/80 mt-2 text-sm leading-relaxed max-w-lg">
                  We're a team of digital marketing specialists based in Altrincham, dedicated to helping local businesses thrive online.
                </p>
              </div>
            </motion.div>

            {/* Bottom Row - Reviews */}
            <div className="flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-2"
              >
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  What Our Clients Say
                </span>
              </motion.div>
              
              <div className="grid grid-cols-3 gap-3">
                {leadgenReviews.map((review, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + idx * 0.1 }}
                    className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-border/30 shadow-sm"
                  >
                    <div className="flex items-center gap-0.5 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-xs text-foreground leading-snug mb-2 line-clamp-3">"{review.review}"</p>
                    <div>
                      <div className="text-xs font-semibold text-[#173340]">{review.name}</div>
                      <div className="text-[10px] text-muted-foreground">{review.company}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Maps & CTA */}
          <div className="lg:col-span-4 flex flex-col gap-3 h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex-shrink-0"
            >
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Choose Us</span>
            </motion.div>

            <div className="flex-1 flex flex-col gap-3">
              {/* Altrincham Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-border/30 shadow-sm flex-1 flex items-center justify-center"
              >
                <img
                  src={altrinchamMap}
                  alt="Altrincham Location"
                  className="w-full h-full object-contain rounded-lg"
                />
              </motion.div>

              {/* Austin Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-border/30 shadow-sm flex-1 flex items-center justify-center"
              >
                <img src={austinMap} alt="Austin Location" className="w-full h-full object-contain rounded-lg" />
              </motion.div>
            </div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-5 text-white flex-shrink-0"
            >
              <div className="text-lg font-bold mb-1">Ready to grow?</div>
              <p className="text-sm text-white/90 mb-4">Join over 3,000 businesses who have grown with Add People.</p>
              <Button
                onClick={() => navigate("/pricing/leadgen", { state: location.state })}
                className="w-full bg-white text-primary hover:bg-white/90 flex items-center justify-center gap-2 font-semibold"
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
