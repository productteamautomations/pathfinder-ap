import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { BadgeCheck, Phone, MapPin, Clock, PoundSterling, Shield, Check } from "lucide-react";
import logoGraphic from "@/assets/logo_graphic.svg";

const howItWorks = [
  {
    icon: Phone,
    title: "Pay Per Lead",
    description: "Only charged for calls over 30 seconds. No clicks, no impressions—just real leads.",
  },
  {
    icon: MapPin,
    title: "Target Your Area",
    description: "Choose specific towns and postcodes. Your ad shows only to customers in your service area.",
  },
  {
    icon: Clock,
    title: "Control Your Hours",
    description: "Ads display during your chosen opening hours. You decide when you're available.",
  },
  {
    icon: PoundSterling,
    title: "Flexible Budget",
    description: "Start from £50/week. Higher budgets mean better ad placement and more leads.",
  },
];

const googleGuarantee = [
  "Valid public liability insurance (min £250,000 cover)",
  "VAT registered or Companies House registered",
  "Customers get £1,500 protection—at no cost to you",
];

export default function AboutProductLSA() {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoLoaded, setLogoLoaded] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <PageHeader
        onBack={() => navigate("/product-recommendation/lsa", { state: location.state })}
        currentStep={2}
        totalSteps={4}
        showProgress
        productLabel="LSAs"
      />

      <div className="flex-1 flex flex-col overflow-hidden" style={{ paddingTop: "73px" }}>
        {/* Card Section */}
        <div className="flex-1 flex items-center justify-center overflow-hidden p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-border/30 shadow-lg overflow-hidden"
            style={{
              width: "min(92vw, calc((100vh - 73px - 2rem) * 2))",
              height: "min(calc(100vh - 73px - 2rem), calc(92vw / 2))",
              containerType: "size",
              borderRadius: "2cqh",
            }}
          >
            <div className="grid h-full" style={{ gridTemplateColumns: "1.1fr 1fr" }}>
              {/* Left Panel - Gradient background */}
              <div
                className="h-full flex flex-col justify-between relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--muted)/0.4) 0%, hsl(var(--muted)/0.6) 100%)",
                  padding: "3cqh 3cqw",
                }}
              >
                {/* Logo */}
                <motion.img
                  src={logoGraphic}
                  alt="Add People"
                  className="absolute transition-opacity duration-500"
                  style={{
                    width: "8cqw",
                    top: "2cqh",
                    left: "2cqw",
                    opacity: logoLoaded ? 0.15 : 0,
                  }}
                  onLoad={() => setLogoLoaded(true)}
                />

                <div style={{ marginTop: "6cqh" }}>
                  <h1
                    className="font-display font-bold text-title leading-tight"
                    style={{ fontSize: "3.5cqw", marginBottom: "2cqh" }}
                  >
                    How Local Service Ads Work
                  </h1>
                  <p className="text-muted-foreground" style={{ fontSize: "1.4cqw", lineHeight: 1.5, maxWidth: "90%" }}>
                    LSAs appear at the very top of Google when customers search for your services in your area. You only
                    pay when someone calls and stays on the line for 30+ seconds.
                  </p>
                </div>

                {/* Google Guarantee Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-white/80 backdrop-blur-sm border border-border/20"
                  style={{ borderRadius: "1.2cqw", padding: "2cqh 2cqw" }}
                >
                  <div className="flex items-center" style={{ gap: "1cqw", marginBottom: "1.5cqh" }}>
                    <div
                      className="bg-green-500/10 flex items-center justify-center"
                      style={{ width: "3.5cqw", height: "3.5cqw", borderRadius: "0.8cqw" }}
                    >
                      <Shield style={{ width: "2cqw", height: "2cqw" }} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-title" style={{ fontSize: "1.5cqw" }}>
                        Google Guaranteed
                      </h3>
                      <p className="text-muted-foreground" style={{ fontSize: "1cqw" }}>
                        Earn customer trust instantly
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.8cqh" }}>
                    {googleGuarantee.map((item, idx) => (
                      <div key={idx} className="flex items-start" style={{ gap: "0.8cqw" }}>
                        <Check
                          className="text-green-600 flex-shrink-0"
                          style={{ width: "1.3cqw", height: "1.3cqw", marginTop: "0.2cqh" }}
                        />
                        <span className="text-foreground" style={{ fontSize: "1.1cqw" }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Panel - White background with content */}
              <div
                className="h-full flex flex-col relative"
                style={{
                  background: "linear-gradient(180deg, white 0%, hsl(var(--muted)/0.15) 100%)",
                  padding: "3cqh 3cqw",
                  boxShadow: "-8px 0 20px rgba(0,0,0,0.05)",
                }}
              >
                <h2
                  className="font-display font-bold text-title"
                  style={{ fontSize: "2cqw", marginBottom: "2cqh" }}
                >
                  The LSA Advantage
                </h2>

                <div className="flex-1 flex flex-col" style={{ gap: "1.8cqh" }}>
                  {howItWorks.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
                      className="flex items-start"
                      style={{ gap: "1.2cqw" }}
                    >
                      <div
                        className="bg-primary/10 flex items-center justify-center flex-shrink-0"
                        style={{ width: "3.5cqw", height: "3.5cqw", borderRadius: "0.8cqw" }}
                      >
                        <item.icon style={{ width: "1.8cqw", height: "1.8cqw" }} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-title" style={{ fontSize: "1.4cqw", marginBottom: "0.3cqh" }}>
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground" style={{ fontSize: "1.1cqw", lineHeight: 1.4 }}>
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Cost indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="bg-primary/5 border border-primary/20 flex items-center justify-between"
                  style={{ borderRadius: "1cqw", padding: "1.2cqh 1.5cqw", marginTop: "1.5cqh", marginBottom: "1.5cqh" }}
                >
                  <div className="flex items-center" style={{ gap: "1cqw" }}>
                    <BadgeCheck className="text-primary" style={{ width: "2cqw", height: "2cqw" }} />
                    <div>
                      <p className="font-semibold text-title" style={{ fontSize: "1.2cqw" }}>
                        Average cost per lead
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: "1cqw" }}>
                        Varies by industry & area
                      </p>
                    </div>
                  </div>
                  <span className="font-display font-bold text-primary" style={{ fontSize: "2cqw" }}>
                    £5–£25
                  </span>
                </motion.div>

                {/* CTA Button */}
                <Button
                  onClick={() => navigate("/about/lsa", { state: location.state })}
                  className="w-full"
                  style={{ fontSize: "1.3cqw", padding: "1.2cqh 2cqw", borderRadius: "0.8cqw" }}
                >
                  Continue
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
