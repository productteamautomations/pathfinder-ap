import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Check, MapPin, TrendingUp, Users, Star } from "lucide-react";
import { buildPageWebhookPayload, sendPageWebhook } from "@/lib/webhookPayload";

const benefits = [
  "Appear in the top 3 Google Map Pack results",
  "Attract customers actively searching in your area",
  "80% higher conversion rates than general searches",
  "Stay ahead of competitors in local rankings",
];

function LocalSEOIllustration() {
  return (
    <div className="relative w-full mx-auto" style={{ padding: "1.5cqw 2cqw 1cqw 0" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative"
      >
        <div
          className="bg-white border border-border/20"
          style={{
            borderRadius: "1.2cqw",
            padding: "1.5cqw",
            marginBottom: "1cqw",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <div className="flex items-center" style={{ gap: "1.2cqw" }}>
            <div
              className="bg-primary/10 flex items-center justify-center"
              style={{ width: "3cqw", height: "3cqw", borderRadius: "0.8cqw" }}
            >
              <MapPin style={{ width: "1.5cqw", height: "1.5cqw" }} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground" style={{ fontSize: "1.3cqw" }}>
                Google Business Profile
              </p>
              <p className="text-muted-foreground" style={{ fontSize: "1cqw" }}>
                Optimized & Verified
              </p>
            </div>
            <div className="flex items-center" style={{ gap: "0.2cqw" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-yellow-400 text-yellow-400" style={{ width: "0.9cqw", height: "0.9cqw" }} />
              ))}
            </div>
          </div>
        </div>

        <div
          className="bg-white border border-border/20"
          style={{
            borderRadius: "1.2cqw",
            padding: "1.5cqw",
            marginBottom: "1cqw",
            marginLeft: "2cqw",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <div className="flex items-center" style={{ gap: "1.2cqw" }}>
            <div
              className="bg-green-500/10 flex items-center justify-center"
              style={{ width: "3cqw", height: "3cqw", borderRadius: "0.8cqw" }}
            >
              <TrendingUp style={{ width: "1.5cqw", height: "1.5cqw" }} className="text-green-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground" style={{ fontSize: "1.3cqw" }}>
                Local Rankings
              </p>
              <p className="text-muted-foreground" style={{ fontSize: "1cqw" }}>
                +156% visibility increase
              </p>
            </div>
            <span
              className="font-bold text-green-500 bg-green-50"
              style={{ fontSize: "1cqw", padding: "0.3cqw 0.6cqw", borderRadius: "999px" }}
            >
              Top 3
            </span>
          </div>
        </div>

        <div
          className="bg-white border border-border/20"
          style={{
            borderRadius: "1.2cqw",
            padding: "1.5cqw",
            marginLeft: "1cqw",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <div className="flex items-center" style={{ gap: "1.2cqw" }}>
            <div
              className="bg-blue-500/10 flex items-center justify-center"
              style={{ width: "3cqw", height: "3cqw", borderRadius: "0.8cqw" }}
            >
              <Users style={{ width: "1.5cqw", height: "1.5cqw" }} className="text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground" style={{ fontSize: "1.3cqw" }}>
                Customer Reach
              </p>
              <p className="text-muted-foreground" style={{ fontSize: "1cqw" }}>
                2.4k monthly searches
              </p>
            </div>
            <span
              className="font-bold text-blue-500 bg-blue-50"
              style={{ fontSize: "1cqw", padding: "0.3cqw 0.6cqw", borderRadius: "999px" }}
            >
              Local
            </span>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="absolute bg-green-500 shadow-lg flex items-center justify-center"
          style={{ top: "-1cqw", right: "-1cqw", width: "4.5cqw", height: "4.5cqw", borderRadius: "50%" }}
        >
          <Check style={{ width: "2.5cqw", height: "2.5cqw" }} className="text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProductRecommendationLocalSEO() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <PageHeader
        onBack={() => navigate("/fact-finder", { state: location.state })}
        currentStep={2}
        totalSteps={7}
        showProgress
        productLabel="Local SEO"
      />

      <div className="flex-1 flex flex-col overflow-hidden" style={{ paddingTop: "73px" }}>
        {/* Title and Subtitle Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center flex-shrink-0"
          style={{ padding: "1.5vh 2vw" }}
        >
          <h1 className="font-display font-bold text-title tracking-tight" style={{ fontSize: "3.5vw" }}>
            Local SEO
          </h1>
          <p
            className="text-muted-foreground"
            style={{ fontSize: "1.3vw", marginTop: "0.5vh", maxWidth: "50vw", marginLeft: "auto", marginRight: "auto" }}
          >
            Why Local SEO is the <span className="text-green-600 font-semibold">Right Fit</span> for you.
          </p>
        </motion.div>

        {/* Card Section with max 2.18:1 aspect ratio, 5% bottom margin */}
        <div className="flex-1 flex items-start justify-center overflow-hidden" style={{ padding: "1vh 0 5vh 0" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white border border-border/30 shadow-lg overflow-hidden"
            style={{
              height: "100%",
              aspectRatio: "2.18 / 1",
              maxWidth: "100vw",
              containerType: "size",
              borderRadius: "2.5cqh",
              padding: "3cqh 3cqw",
            }}
          >
            <div className="grid md:grid-cols-2 items-center h-full overflow-hidden" style={{ gap: "4cqw" }}>
              <div className="flex flex-col justify-center h-full overflow-hidden">
                <h2
                  className="font-display font-bold text-title"
                  style={{ fontSize: "min(3.3cqw, 8.5cqh)", marginBottom: "1.6cqh" }}
                >
                  Stay Ahead Of Competitors In Local Search Rankings
                </h2>
                <p
                  className="text-muted-foreground leading-relaxed"
                  style={{ fontSize: "min(1.5cqw, 3.2cqh)", marginBottom: "2.2cqh" }}
                >
                  Get found by customers in your area when they search for services like yours. With Local SEO, you'll
                  appear in Google Maps and local search results right when potential customers need you most.
                </p>

                <div style={{ marginBottom: "2.8cqh" }}>
                  <h3
                    className="font-semibold text-muted-foreground uppercase tracking-wider"
                    style={{ fontSize: "min(1.1cqw, 2.2cqh)", marginBottom: "1.4cqh" }}
                  >
                    Key Benefits:
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.1cqh" }}>
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center"
                        style={{ gap: "1cqw" }}
                      >
                        <div
                          className="bg-green-500 flex items-center justify-center flex-shrink-0"
                          style={{ width: "min(2cqw, 3.8cqh)", height: "min(2cqw, 3.8cqh)", borderRadius: "50%" }}
                        >
                          <Check
                            style={{ width: "min(1.2cqw, 2.4cqh)", height: "min(1.2cqw, 2.4cqh)" }}
                            className="text-white"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-foreground" style={{ fontSize: "min(1.4cqw, 3cqh)" }}>
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => {
                    const state = location.state as any;
                    const sessionInfo = {
                      sessionId: state?.sessionId || null,
                      googleId: state?.googleId || null,
                      googleFullName: state?.googleFullName || null,
                      googleEmail: state?.googleEmail || null,
                      startTime: state?.startTime || null,
                    };
                    const payload = buildPageWebhookPayload(sessionInfo, state || {}, null, false, false);
                    sendPageWebhook(payload);
                    navigate("/funnel-diagnostic/localseo", { state: location.state });
                  }}
                  style={{ fontSize: "min(1.4cqw, 3cqh)", padding: "1.1cqh 2.4cqw", borderRadius: "0.8cqw" }}
                >
                  Start Your Assessment
                </Button>
              </div>

              <div className="hidden md:block">
                <LocalSEOIllustration />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
