import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { ChevronRight, Users, Award, MapPin, Star, TrendingUp, Shield, Clock, Zap } from "lucide-react";
import altrinchamMap from "@/assets/altrincham-map.png";

const leadgenReviews = [
  {
    name: "David Parker",
    company: "Parker Construction",
    review: "Our Google Ads campaigns went from losing money to generating 30+ qualified leads per month. Incredible turnaround!",
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

const stats = [
  { icon: Users, value: "3,000+", label: "Happy Clients" },
  { icon: Award, value: "250+", label: "Specialists" },
  { icon: TrendingUp, value: "15+", label: "Years Experience" },
  { icon: Shield, value: "98%", label: "Retention Rate" },
];

const highlights = [
  { icon: Zap, title: "Fast Setup", description: "Campaigns live within 2 weeks" },
  { icon: Clock, title: "Real-Time Tracking", description: "See every lead as it comes in" },
  { icon: Users, title: "Dedicated Teams", description: "Your own account manager and support team" },
];

export default function AboutAddPeopleLeadGen() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/business-cycle/leadgen", { state: location.state })}
        currentStep={6}
        totalSteps={7}
        showProgress
        productLabel="Lead Generation"
      />

      <div className="flex-1 pt-[73px] px-6 md:px-12 flex flex-col">
        {/* Main Content Grid */}
        <div className="flex-1 grid lg:grid-cols-3 gap-6 py-6 max-w-7xl mx-auto w-full">
          
          {/* Left Column - Stats & About */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">About</span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#173340] mt-2 leading-tight">
                Add People
              </h1>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                We're a team of digital marketing specialists based in Altrincham, 
                dedicated to helping local businesses thrive online.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-3"
            >
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-border/30 shadow-sm"
                >
                  <stat.icon className="w-5 h-5 text-primary mb-2" />
                  <div className="text-2xl font-bold text-[#173340]">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-border/30 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-[#173340]">Based in Altrincham</span>
              </div>
              <img
                src={altrinchamMap}
                alt="Add People location in Altrincham"
                className="w-full h-24 object-cover rounded-lg"
              />
            </motion.div>
          </div>

          {/* Middle Column - Reviews */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Lead Generation Reviews
              </span>
            </motion.div>
            
            {leadgenReviews.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-border/30 shadow-sm"
              >
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  "{review.review}"
                </p>
                <div>
                  <div className="text-sm font-semibold text-[#173340]">{review.name}</div>
                  <div className="text-xs text-muted-foreground">{review.company}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Highlights & CTA */}
          <div className="space-y-4 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Why Choose Us
              </span>
            </motion.div>

            {highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-border/30 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <highlight.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#173340] text-sm">{highlight.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{highlight.description}</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-br from-[#173340] to-[#1e4455] rounded-xl p-4 text-white mt-auto"
            >
              <div className="text-lg font-bold mb-1">Trusted by thousands</div>
              <p className="text-sm text-white/80 mb-3">
                Join over 3,000 businesses who have grown with Add People.
              </p>
              <Button
                onClick={() => navigate("/pricing/leadgen", { state: location.state })}
                className="w-full bg-white text-[#173340] hover:bg-white/90 flex items-center justify-center gap-2"
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
