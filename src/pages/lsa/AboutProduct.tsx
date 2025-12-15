import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Search, MapPin, Phone, Clock, PoundSterling, Shield, BadgeCheck, Check, TrendingUp, Users, Star, Zap, ChevronRight } from "lucide-react";
import LogoGraphic from "@/assets/logo_graphic.svg";

export default function AboutProductLSA() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/product-recommendation/lsa", { state: location.state })}
        currentStep={2}
        totalSteps={4}
        showProgress
        productLabel="LSAs"
      />

      <div className="flex-1 pt-[73px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.06)] overflow-hidden"
          style={{
            width: "min(94vw, calc((100vh - 73px) * 0.92 * 1.75))",
            aspectRatio: "1.75",
            containerType: "size",
            borderRadius: "2cqw",
          }}
        >
          <div className="h-full grid" style={{ gridTemplateColumns: "1fr 1.4fr 1fr", gap: "0" }}>
            {/* Left Column - The Challenge */}
            <div
              className="bg-gradient-to-br from-red-50 to-orange-50/50 flex flex-col h-full border-r border-border/20"
              style={{ padding: "2cqw" }}
            >
              <div className="flex items-center" style={{ gap: "0.8cqw", marginBottom: "1.5cqw" }}>
                <div className="bg-destructive/10 rounded-full flex items-center justify-center" style={{ width: "2.5cqw", height: "2.5cqw" }}>
                  <Search className="text-destructive" style={{ width: "1.3cqw", height: "1.3cqw" }} />
                </div>
                <h2 className="font-display font-bold text-title" style={{ fontSize: "1.8cqw" }}>
                  The Challenge
                </h2>
              </div>

              <div className="flex-1 flex flex-col" style={{ gap: "1cqw" }}>
                {[
                  { icon: Search, label: "Hard to get found", desc: "Competitors appear first in search results" },
                  { icon: PoundSterling, label: "Wasted ad spend", desc: "Paying for clicks that don't convert" },
                  { icon: Users, label: "Trust is hard to earn", desc: "New customers don't know you yet" },
                  { icon: MapPin, label: "Limited reach", desc: "Struggling to target right areas" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.08 }}
                    className="bg-white/80 border border-red-100 flex items-start"
                    style={{ borderRadius: "1cqw", padding: "1cqw", gap: "0.8cqw" }}
                  >
                    <div className="bg-destructive/10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ width: "2.2cqw", height: "2.2cqw" }}>
                      <item.icon className="text-destructive" style={{ width: "1.1cqw", height: "1.1cqw" }} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground" style={{ fontSize: "1.1cqw", marginBottom: "0.15cqw" }}>{item.label}</p>
                      <p className="text-muted-foreground leading-tight" style={{ fontSize: "0.85cqw" }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Center Column - How LSAs Work */}
            <div
              className="bg-gradient-to-br from-primary/5 to-blue-50/30 flex flex-col h-full"
              style={{ padding: "2cqw" }}
            >
              <div className="flex items-center justify-center" style={{ gap: "1cqw", marginBottom: "1.2cqw" }}>
                <img src={LogoGraphic} alt="Add People" style={{ width: "2.5cqw", height: "2.5cqw" }} />
                <h2 className="font-display font-bold text-title" style={{ fontSize: "2.2cqw" }}>
                  How LSAs Work
                </h2>
              </div>

              {/* LSA Preview Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl border border-border/30 shadow-lg mx-auto"
                style={{ padding: "1.2cqw", marginBottom: "1.2cqw", width: "85%" }}
              >
                <div className="text-muted-foreground uppercase tracking-wider" style={{ fontSize: "0.7cqw", marginBottom: "0.5cqw" }}>
                  Sponsored · Your Service Area
                </div>
                <div className="flex items-center" style={{ gap: "0.5cqw", marginBottom: "0.8cqw" }}>
                  <BadgeCheck className="text-green-500" style={{ width: "1.2cqw", height: "1.2cqw" }} />
                  <span className="font-semibold text-green-600" style={{ fontSize: "0.8cqw" }}>GOOGLE GUARANTEED</span>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-white border border-green-200 rounded-lg" style={{ padding: "0.8cqw" }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: "0.4cqw" }}>
                    <span className="font-bold text-foreground" style={{ fontSize: "1cqw" }}>Your Business</span>
                    <div className="flex items-center" style={{ gap: "0.15cqw" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="fill-yellow-400 text-yellow-400" style={{ width: "0.7cqw", height: "0.7cqw" }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground" style={{ fontSize: "0.7cqw" }}>Verified business</span>
                    <div className="flex items-center bg-green-500 text-white rounded-full" style={{ padding: "0.25cqw 0.7cqw", gap: "0.3cqw" }}>
                      <Phone style={{ width: "0.7cqw", height: "0.7cqw" }} />
                      <span style={{ fontSize: "0.7cqw" }}>Call</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Key Points */}
              <div className="flex-1 grid grid-cols-2" style={{ gap: "0.8cqw" }}>
                {[
                  { icon: TrendingUp, label: "Top of Google", desc: "Above all other results" },
                  { icon: MapPin, label: "Target areas", desc: "Choose towns & postcodes" },
                  { icon: Phone, label: "Pay per lead", desc: "Only calls over 30 sec" },
                  { icon: PoundSterling, label: "Flexible budget", desc: "From £50/week" },
                  { icon: Clock, label: "Your hours", desc: "Ads show when you're open" },
                  { icon: Zap, label: "£5-£25 per lead", desc: "Industry dependent" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    className="bg-white/90 border border-primary/10 flex items-center"
                    style={{ borderRadius: "0.8cqw", padding: "0.7cqw", gap: "0.6cqw" }}
                  >
                    <div className="bg-primary/10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ width: "2cqw", height: "2cqw" }}>
                      <item.icon className="text-primary" style={{ width: "1cqw", height: "1cqw" }} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground leading-tight" style={{ fontSize: "0.9cqw" }}>{item.label}</p>
                      <p className="text-muted-foreground leading-tight" style={{ fontSize: "0.7cqw" }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - Why It Works */}
            <div
              className="bg-gradient-to-br from-green-50 to-emerald-50/50 flex flex-col h-full border-l border-border/20"
              style={{ padding: "2cqw" }}
            >
              <div className="flex items-center" style={{ gap: "0.8cqw", marginBottom: "1.5cqw" }}>
                <div className="bg-green-500/10 rounded-full flex items-center justify-center" style={{ width: "2.5cqw", height: "2.5cqw" }}>
                  <BadgeCheck className="text-green-600" style={{ width: "1.3cqw", height: "1.3cqw" }} />
                </div>
                <h2 className="font-display font-bold text-title" style={{ fontSize: "1.8cqw" }}>
                  Why It Works
                </h2>
              </div>

              <div className="flex-1 flex flex-col" style={{ gap: "1cqw" }}>
                {[
                  { icon: BadgeCheck, label: "Google Guaranteed", desc: "Customers get £1,500 protection" },
                  { icon: Shield, label: "Background verified", desc: "Google checks your business" },
                  { icon: Star, label: "Reviews displayed", desc: "Ratings build confidence" },
                  { icon: Check, label: "No wasted spend", desc: "No charge if under 30 sec" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.08 }}
                    className="bg-white/80 border border-green-100 flex items-start"
                    style={{ borderRadius: "1cqw", padding: "1cqw", gap: "0.8cqw" }}
                  >
                    <div className="bg-green-500/10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ width: "2.2cqw", height: "2.2cqw" }}>
                      <item.icon className="text-green-600" style={{ width: "1.1cqw", height: "1.1cqw" }} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground" style={{ fontSize: "1.1cqw", marginBottom: "0.15cqw" }}>{item.label}</p>
                      <p className="text-muted-foreground leading-tight" style={{ fontSize: "0.85cqw" }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                style={{ marginTop: "1cqw" }}
              >
                <Button
                  onClick={() => navigate("/about/lsa", { state: location.state })}
                  className="w-full flex items-center justify-center"
                  style={{ fontSize: "1.1cqw", padding: "1cqw 1.5cqw", borderRadius: "0.8cqw", gap: "0.5cqw" }}
                >
                  Continue
                  <ChevronRight style={{ width: "1.2cqw", height: "1.2cqw" }} />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
