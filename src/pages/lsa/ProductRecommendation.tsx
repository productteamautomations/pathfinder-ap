import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Check, BadgeCheck, Shield, Star, Phone } from "lucide-react";

const benefits = [
  "Google Guaranteed badge builds instant trust",
  "Pay only for valid leads, not clicks",
  "Appear at the very top of search results",
  "Background-checked and verified business",
];

function LSAIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative"
      >
        <div className="bg-white rounded-2xl p-7 shadow-lg border border-border/20 mb-5">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center">
              <BadgeCheck className="w-7 h-7 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-foreground">Google Guaranteed</p>
              <p className="text-base text-muted-foreground">Verified & Trusted</p>
            </div>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-7 shadow-lg border border-border/20 mb-5 ml-6">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Shield className="w-7 h-7 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-foreground">Background Checked</p>
              <p className="text-base text-muted-foreground">Fully verified business</p>
            </div>
            <span className="text-base font-bold text-blue-500 bg-blue-50 px-4 py-2 rounded-full">Secure</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-7 shadow-lg border border-border/20 ml-3">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Phone className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-foreground">Pay Per Lead</p>
              <p className="text-base text-muted-foreground">Only valid enquiries</p>
            </div>
            <span className="text-base font-bold text-primary bg-primary/10 px-4 py-2 rounded-full">Smart</span>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-green-500 shadow-lg flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProductRecommendationLSA() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/funnel-health", { state: location.state })}
        currentStep={4}
        totalSteps={6}
        showProgress
      />

      <div className="flex-1 pt-[73px] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center px-6 py-10 md:py-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Local Services Ads</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Why LSAs are the <span className="text-primary font-semibold">Right Fit</span> for you.
          </p>
        </motion.div>

        <div className="flex-1 px-6 md:px-12 lg:px-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-[2rem] p-8 md:p-12 lg:p-14 max-w-6xl mx-auto shadow-lg border border-border/30"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border/30 mb-6"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-foreground">Google Guaranteed</span>
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Google's Most Trusted Ad Format
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Local Services Ads put your business at the very top of Google with the 
                  Google Guaranteed badge. You only pay for valid leads, and customers 
                  trust you because Google has verified your business.
                </p>

                <div className="space-y-4 mb-10">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Key Benefits:
                  </h3>
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-foreground text-base">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <Button
                  onClick={() => navigate("/pricing/lsa", { state: location.state })}
                  className="px-8"
                >
                  View Pricing
                </Button>
              </div>

              <div className="hidden md:block">
                <LSAIllustration />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
