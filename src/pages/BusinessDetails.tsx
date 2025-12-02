import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

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
    <div className="min-h-screen bg-background">
      <PageHeader
        onBack={() => navigate(-1)}
        currentStep={3}
        totalSteps={11}
        showProgress
      />

      <div className="pt-24 pb-12 px-6 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-3">Business Details</h1>
            <p className="text-muted-foreground mb-8">
              Tell us more about your business setup
            </p>

            <Card className="p-8">
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

                <Button onClick={handleContinue} disabled={!isValid} fullWidth>
                  Continue to Diagnostic
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
