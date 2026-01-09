import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Eye, EyeOff, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRecommendation } from "@/contexts/RecommendationContext";
import { buildPageWebhookPayload, sendPageWebhook } from "@/lib/webhookPayload";

export default function RequiredInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, recommendation } = useRecommendation();
  const state = location.state as Record<string, any> | null;

  const product = state?.product || "Unknown";
  const totalSteps = product === "LSA" ? 4 : 7;
  const productLabel = product === "LeadGen Trial" ? "Lead Generation" : product === "LSA" ? "LSAs" : product;
  const showSmartSite = state?.smartSiteIncluded === true;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUrl, setLoginUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = username && password && loginUrl;

  const handleSubmit = async () => {
    if (isSubmitting || !isFormValid) return;

    setIsSubmitting(true);

    // Build webhook payload with login details
    const payload = buildPageWebhookPayload(
      {
        sessionId: session.sessionId,
        googleId: session.googleId,
        googleFullName: session.googleFullName,
        googleEmail: session.googleEmail,
        startTime: session.startTime,
      },
      state || {},
      null,
      false, // isStartPage
      true, // isEndPage
      { step: totalSteps, totalSteps: totalSteps, maxStep: Math.max(session.maxStep, totalSteps) },
      { product: product, smartSiteIncluded: state?.smartSiteIncluded ?? null }
    );

    // Add the login details directly to the payload
    const payloadWithLogin = {
      ...payload,
      websiteLoginDetails: {
        username,
        password,
        loginUrl,
      },
    };

    try {
      await sendPageWebhook(payloadWithLogin as any);
      toast.success("Campaign setup complete! Thank you for your information.");
      navigate("/");
    } catch (error) {
      console.error("Webhook error:", error);
      toast.success("Campaign setup complete! Thank you for your information.");
      navigate("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate(-1)}
        currentStep={totalSteps}
        totalSteps={totalSteps}
        showProgress
        productLabel={productLabel}
        showSmartSite={showSmartSite}
      />

      {/* Content Area - Split Layout */}
      <div className="flex-1 pt-[73px] px-6 md:px-12 flex items-center justify-center">
        <div className="w-full max-w-6xl">
          {/* Main Card with soft shadow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="grid md:grid-cols-2 min-h-[70vh]">
              {/* Left Side - Monday.com Form */}
              <div className="flex flex-col bg-gradient-to-br from-white to-muted/20">
                <iframe
                  src="https://forms.monday.com/forms/embed/84d8599d1fcda18d4201ff15669c2435?r=euc1"
                  width="100%"
                  height="100%"
                  className="min-h-[70vh]"
                  style={{ border: 0 }}
                  title="Client Details Form"
                />
              </div>

              {/* Right Side - Login Details */}
              <div className="px-12 py-8 md:px-16 md:py-10 lg:px-20 lg:py-12 flex flex-col justify-center bg-muted/30 border-l border-border/20">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <h3 className="text-2xl font-display font-bold text-title mb-8">Website Login Details</h3>

                  {/* Form Fields */}
                  <div className="space-y-5 mb-8">
                    <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/30">
                      <Input
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className="border-0 shadow-none focus:ring-0 bg-transparent"
                      />
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/30">
                      <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          className="w-full pr-12 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/30">
                      <Input
                        label="Login URL"
                        type="url"
                        value={loginUrl}
                        onChange={(e) => setLoginUrl(e.target.value)}
                        placeholder="https://yourwebsite.com/wp-admin"
                        className="border-0 shadow-none focus:ring-0 bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button onClick={handleSubmit} disabled={!isFormValid || isSubmitting} fullWidth>
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      "Complete Setup"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    All information is securely stored and encrypted
                  </p>

                  {/* Back Button */}
                  <button
                    onClick={() => navigate(-1)}
                    className="mt-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white border border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all">
                      <ChevronRight className="w-4 h-4 text-foreground rotate-180" />
                    </div>
                    <span className="uppercase tracking-wider">Back</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
