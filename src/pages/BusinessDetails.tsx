import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { GlassCard } from "@/components/GlassCard";
import { WaveBackground } from "@/components/WaveBackground";

export default function BusinessDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cms, setCms] = useState("");
  const [industry, setIndustry] = useState("");
  const [postcode, setPostcode] = useState("");

  const isValid = cms && industry && postcode;

  const handleContinue = () => {
    navigate("/funnel-diagnostic", {
      state: {
        ...location.state,
        cms,
        industry,
        postcode,
      },
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <WaveBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <PageHeader
          onBack={() => navigate(-1)}
          currentStep={3}
          totalSteps={11}
          showProgress
        />

        {/* Fixed Title Section */}
        <div className="fixed top-[73px] left-0 right-0 z-40 px-6 py-4">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl font-bold text-primary">Business Details</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Tell us more about your business setup
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 pt-[140px] pb-[100px] px-6 flex items-center justify-center">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="p-8">
                <div className="space-y-6">
                  <Input
                    label="CMS"
                    placeholder="WordPress, Shopify, Custom, etc."
                    value={cms}
                    onChange={(e) => setCms(e.target.value)}
                    required
                  />

                  <Input
                    label="Industry"
                    placeholder="E.g., Retail, Healthcare, Technology"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    required
                  />

                  <Input
                    label="Postcode"
                    placeholder="E.g., SW1A 1AA"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    required
                  />
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* Fixed Button Section */}
        <div className="fixed bottom-0 left-0 right-0 z-40 px-6 py-5">
          <div className="max-w-md mx-auto">
            <Button onClick={handleContinue} disabled={!isValid} fullWidth>
              Continue to Diagnostic
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
