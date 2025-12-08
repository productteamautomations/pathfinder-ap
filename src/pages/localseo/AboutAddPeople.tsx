import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { ChevronRight, Users, Award, MapPin, Star, TrendingUp, Shield, Clock } from "lucide-react";
import altrinchamMap from "@/assets/altrincham-map.png";

const seoReviews = [
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
  { icon: Users, value: "3,000+", label: "Happy Clients" },
  { icon: Award, value: "250+", label: "Specialists" },
  { icon: TrendingUp, value: "15+", label: "Years Experience" },
  { icon: Shield, value: "98%", label: "Retention Rate" },
];

const highlights = [
  { icon: Clock, title: "Rapid Results", description: "Most clients see improvements within 30 days" },
  { icon: Star, title: "Award Winning", description: "Multiple industry awards for excellence" },
  { icon: Users, title: "Dedicated Teams", description: "Your own account manager and support team" },
];

export default function AboutAddPeopleLocalSEO() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/business-cycle/localseo", { state: location.state })}
        currentStep={6}
        totalSteps={7}
        showProgress
        productLabel="Local SEO"
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
                Local SEO Reviews
              </span>
            </motion.div>
            
            {seoReviews.map((review, idx) => (
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
                onClick={() => navigate("/pricing/localseo", { state: location.state })}
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
