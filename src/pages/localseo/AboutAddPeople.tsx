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
    <div className="min-h-screen h-screen flex flex-col overflow-hidden">
      <PageHeader
        onBack={() => navigate("/business-cycle/localseo", { state: location.state })}
        currentStep={5}
        totalSteps={7}
        showProgress
        productLabel="Local SEO"
      />

      <div className="flex-1 pt-[73px] px-4 md:px-8 lg:px-12 flex flex-col overflow-hidden">
        <div className="flex-1 grid lg:grid-cols-12 gap-4 lg:gap-6 py-4 max-w-[1600px] mx-auto w-full h-full">
          
          {/* Left Column - About & Stats */}
          <div className="lg:col-span-4 flex flex-col gap-4 h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#173340] to-[#1e4455] rounded-2xl p-6 text-white flex-shrink-0"
            >
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">About</span>
              <h1 className="text-[57px] font-bold text-white font-display leading-tight mt-1">
                Add People
              </h1>
              <p className="text-white/80 mt-2 text-sm leading-relaxed">
                We're a team of digital marketing specialists based in Altrincham, 
                dedicated to helping local businesses thrive online.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-3 flex-1"
            >
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-border/30 shadow-sm flex flex-col justify-center"
                >
                  <stat.icon className="w-5 h-5 text-primary mb-2" />
                  <div className="text-2xl lg:text-3xl font-bold text-[#173340]">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-border/30 shadow-sm flex-shrink-0"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-[#173340]">Based in Altrincham</span>
              </div>
              <img
                src={altrinchamMap}
                alt="Add People location in Altrincham"
                className="w-full h-28 lg:h-32 object-cover rounded-lg"
              />
            </motion.div>
          </div>

          {/* Middle Column - Reviews */}
          <div className="lg:col-span-4 flex flex-col gap-3 h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex-shrink-0"
            >
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Local SEO Reviews
              </span>
            </motion.div>
            
            <div className="flex-1 flex flex-col gap-3">
              {seoReviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  className="bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-border/30 shadow-sm flex-1 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
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
          </div>

          {/* Right Column - Highlights & CTA */}
          <div className="lg:col-span-4 flex flex-col gap-3 h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex-shrink-0"
            >
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Why Choose Us
              </span>
            </motion.div>

            <div className="flex-1 flex flex-col gap-3">
              {highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-border/30 shadow-sm flex-1 flex items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <highlight.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#173340]">{highlight.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{highlight.description}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-5 text-white flex-shrink-0"
            >
              <div className="text-lg font-bold mb-1">Ready to grow?</div>
              <p className="text-sm text-white/90 mb-4">
                Join over 3,000 businesses who have grown with Add People.
              </p>
              <Button
                onClick={() => navigate("/pricing/localseo", { state: location.state })}
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
