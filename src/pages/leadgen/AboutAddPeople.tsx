import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { ChevronRight, MapPin, Star } from "lucide-react";
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
    <div className="min-h-screen h-screen flex flex-col overflow-hidden">
      <PageHeader
        onBack={() => navigate("/business-cycle/leadgen", { state: location.state })}
        currentStep={5}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
      />

      <div className="flex-1 pt-[73px] px-4 md:px-8 lg:px-12 flex flex-col overflow-hidden">
        <div className="flex-1 grid lg:grid-cols-12 gap-4 lg:gap-6 py-4 max-w-[1600px] mx-auto w-full h-full">
          
          {/* Left Column - Main Image */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-border/30 shadow-sm flex-1 flex items-center justify-center"
            >
              <img
                src={mainImage}
                alt="Add People - 3000+ Happy Clients, 250+ Specialists, 15+ Years Experience, 98% Retention Rate"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>

          {/* Middle Column - Reviews */}
          <div className="lg:col-span-4 flex flex-col gap-3 h-full">
            <div className="flex-1 flex flex-col gap-3">
              {leadgenReviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                  className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-border/30 shadow-sm flex-1 flex flex-col justify-center"
                >
                  <p className="text-sm text-foreground leading-relaxed mb-3">
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

            {/* Trustpilot summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-border/30 shadow-sm flex items-center justify-between"
            >
              <div>
                <div className="text-2xl font-bold text-[#173340]">2,000+</div>
                <div className="text-xs text-muted-foreground">five-star reviews on Trustpilot, with an 'Excellent' average rating.</div>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Maps & CTA */}
          <div className="lg:col-span-3 flex flex-col gap-3 h-full">
            {/* Altrincham Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-border/30 shadow-sm flex-1 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-[#173340]">Altrincham, UK</span>
              </div>
              <img
                src={altrinchamMap}
                alt="Add People Altrincham office location"
                className="w-full flex-1 object-contain rounded-xl"
              />
            </motion.div>

            {/* Austin Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-border/30 shadow-sm flex-1 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-[#173340]">Austin, Texas</span>
              </div>
              <img
                src={austinMap}
                alt="Add People Austin office location"
                className="w-full flex-1 object-contain rounded-xl"
              />
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-4 text-white flex-shrink-0"
            >
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
