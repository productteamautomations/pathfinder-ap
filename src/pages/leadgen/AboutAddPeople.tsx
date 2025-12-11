import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { ChevronRight, Star } from "lucide-react";
import mainImage from "@/assets/Main-image-about-us.svg";
import altrinchamMap from "@/assets/altrinham map.svg";
import austinMap from "@/assets/austin map.svg";
import logoGraphic from "@/assets/logo_graphic.svg";
import brightlocalIcon from "@/assets/brightlocal-icon.svg";

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

const stats = [
  { value: "60+", label: "countries in which we assist clients, in a range of industries, to make a lasting impact." },
  { value: "20+", label: "years operating and helping businesses like yours." },
  { value: "250+", label: "experts in the company, all passionate about marketing." },
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
        <div className="flex-1 grid lg:grid-cols-2 gap-5 py-4 max-w-[1400px] mx-auto w-full h-full">
          
          {/* Left Panel - Dark with image, stats, and partners */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden bg-[#173340]"
          >
            {/* Background Image */}
            <img 
              src={mainImage} 
              alt="Add People Team" 
              className="absolute inset-0 w-full h-full object-cover opacity-40" 
            />
            
            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col p-6">
              {/* Logo & Title */}
              <div className="flex items-center gap-2 mb-6">
                <img src={logoGraphic} alt="Add People" className="w-8 h-8" />
                <span className="text-2xl font-display font-bold text-white">Add People</span>
              </div>
              
              {/* Stats */}
              <div className="flex-1 flex flex-col justify-center gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-4xl font-display font-bold text-primary">{stat.value}</div>
                    <p className="text-white/70 text-sm max-w-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
              
              {/* Partner Logos Grid */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {["Meta", "Amazon Ads", "Google", "eBay", "Microsoft", "Top 50", "Awards", "BrightLocal"].map((partner, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white rounded-lg p-2 flex items-center justify-center h-12"
                  >
                    <span className="text-[10px] font-semibold text-[#173340] text-center leading-tight">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Maps and Reviews */}
          <div className="flex flex-col gap-4 h-full">
            {/* Maps Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-4 flex-shrink-0"
            >
              <div className="bg-white rounded-xl p-3 border border-border/30 shadow-sm flex flex-col items-center">
                <img src={altrinchamMap} alt="Altrincham Location" className="w-full h-28 object-contain" />
                <span className="text-sm font-semibold text-[#173340] mt-2">Altrincham, UK</span>
              </div>
              <div className="bg-white rounded-xl p-3 border border-border/30 shadow-sm flex flex-col items-center">
                <img src={austinMap} alt="Austin Location" className="w-full h-28 object-contain" />
                <span className="text-sm font-semibold text-[#173340] mt-2">Austin, USA</span>
              </div>
            </motion.div>

            {/* Reviews */}
            <div className="flex-1 flex flex-col gap-3">
              {leadgenReviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  className="bg-white rounded-xl p-4 border border-border/30 shadow-sm flex-1 flex flex-col justify-center"
                >
                  <p className="text-sm text-foreground leading-snug mb-2">"{review.review}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-[#173340]">{review.name}</div>
                      <div className="text-xs text-muted-foreground">{review.company}</div>
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
              className="flex items-center justify-between bg-white rounded-xl p-4 border border-border/30 shadow-sm flex-shrink-0"
            >
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-3xl font-display font-bold text-[#173340]">2,000+</span>
                  <p className="text-xs text-muted-foreground">five-star reviews on Trustpilot, with an 'Excellent' average rating.</p>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <Button
                onClick={() => navigate("/pricing/leadgen", { state: location.state })}
                className="bg-[#173340] text-white hover:bg-[#173340]/90 flex items-center gap-2 font-semibold px-6"
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
