import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { 
  AlertTriangle, 
  TrendingUp, 
  BadgeCheck, 
  Phone, 
  MapPin, 
  Clock, 
  PoundSterling, 
  Shield, 
  Check,
  Timer,
  Target,
  Wallet
} from "lucide-react";

const problems = [
  { icon: AlertTriangle, text: "Struggling to appear at the top of Google" },
  { icon: TrendingUp, text: "Competing against bigger companies with larger budgets" },
  { icon: PoundSterling, text: "Paying for clicks that don't convert to real enquiries" },
];

const solutions = [
  { 
    icon: BadgeCheck, 
    title: "Google Guaranteed", 
    description: "Earn instant trust with a verified badge that tells customers you're background-checked and insured"
  },
  { 
    icon: Phone, 
    title: "Pay Per Lead", 
    description: "Only pay for calls over 30 seconds – if they hang up early, you pay nothing"
  },
  { 
    icon: MapPin, 
    title: "Target Your Area", 
    description: "Choose specific towns and postcodes to show your ads to local customers"
  },
];

const benefits = [
  { icon: Target, title: "Top of Google", description: "Appear above organic results and standard ads" },
  { icon: Timer, title: "30-Second Rule", description: "Calls under 30 seconds are free – you decide if it's a valid lead" },
  { icon: Wallet, title: "Flexible Budget", description: "Set your weekly budget from just £50/week" },
  { icon: Clock, title: "Business Hours Only", description: "Ads display during your chosen opening hours" },
  { icon: Shield, title: "£1,500 Protection", description: "Customers get reimbursement coverage at no cost to you" },
  { icon: PoundSterling, title: "£5-£25 Per Lead", description: "Transparent pricing based on your industry and area" },
];

export default function AboutProductLSA() {
  const navigate = useNavigate();
  const location = useLocation();

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
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center flex-shrink-0"
          style={{ padding: "1.5vh 2vw 1vh" }}
        >
          <h1 className="font-display font-bold text-title tracking-tight" style={{ fontSize: "3vw" }}>
            How Local Services Ads Work
          </h1>
          <p
            className="text-muted-foreground"
            style={{ fontSize: "1.2vw", marginTop: "0.5vh", maxWidth: "55vw", marginLeft: "auto", marginRight: "auto" }}
          >
            Ads displayed at the top of Google for people searching for your services in your area
          </p>
        </motion.div>

        {/* Main Card */}
        <div className="flex-1 flex items-start justify-center overflow-hidden" style={{ padding: "1vh 2vw 3vh" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white border border-border/30 shadow-lg overflow-hidden"
            style={{
              height: "100%",
              aspectRatio: "2.1 / 1",
              maxWidth: "100vw",
              containerType: "size",
              borderRadius: "2cqh",
              padding: "2.5cqh 2.5cqw",
            }}
          >
            <div className="grid grid-cols-3 h-full" style={{ gap: "2cqw" }}>
              {/* Problem Column */}
              <div className="flex flex-col" style={{ gap: "1.5cqh" }}>
                <div className="flex items-center" style={{ gap: "1cqw", marginBottom: "0.5cqh" }}>
                  <div 
                    className="bg-red-500/10 flex items-center justify-center"
                    style={{ width: "3cqh", height: "3cqh", borderRadius: "0.8cqh" }}
                  >
                    <AlertTriangle style={{ width: "1.8cqh", height: "1.8cqh" }} className="text-red-500" />
                  </div>
                  <h2 className="font-display font-bold text-title" style={{ fontSize: "2.2cqh" }}>
                    The Problem
                  </h2>
                </div>
                
                <div className="flex flex-col" style={{ gap: "1.2cqh" }}>
                  {problems.map((problem, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="bg-red-50 border border-red-100 flex items-start"
                      style={{ borderRadius: "1cqh", padding: "1.2cqh" }}
                    >
                      <problem.icon 
                        className="text-red-500 flex-shrink-0" 
                        style={{ width: "1.8cqh", height: "1.8cqh", marginRight: "1cqw", marginTop: "0.2cqh" }} 
                      />
                      <p className="text-foreground font-medium" style={{ fontSize: "1.4cqh", lineHeight: "1.4" }}>
                        {problem.text}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-auto bg-muted/50 border border-border/30"
                  style={{ borderRadius: "1cqh", padding: "1.2cqh" }}
                >
                  <p className="text-muted-foreground italic" style={{ fontSize: "1.2cqh", lineHeight: "1.4" }}>
                    "Traditional ads charge you for every click – even if they never become a customer."
                  </p>
                </motion.div>
              </div>

              {/* Solution Column */}
              <div className="flex flex-col" style={{ gap: "1.5cqh" }}>
                <div className="flex items-center" style={{ gap: "1cqw", marginBottom: "0.5cqh" }}>
                  <div 
                    className="bg-green-500/10 flex items-center justify-center"
                    style={{ width: "3cqh", height: "3cqh", borderRadius: "0.8cqh" }}
                  >
                    <BadgeCheck style={{ width: "1.8cqh", height: "1.8cqh" }} className="text-green-500" />
                  </div>
                  <h2 className="font-display font-bold text-title" style={{ fontSize: "2.2cqh" }}>
                    The Solution
                  </h2>
                </div>
                
                <div className="flex flex-col" style={{ gap: "1.2cqh" }}>
                  {solutions.map((solution, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="bg-green-50 border border-green-100"
                      style={{ borderRadius: "1cqh", padding: "1.2cqh" }}
                    >
                      <div className="flex items-center" style={{ gap: "0.8cqw", marginBottom: "0.5cqh" }}>
                        <solution.icon 
                          className="text-green-600 flex-shrink-0" 
                          style={{ width: "1.6cqh", height: "1.6cqh" }} 
                        />
                        <h3 className="font-semibold text-foreground" style={{ fontSize: "1.4cqh" }}>
                          {solution.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground" style={{ fontSize: "1.2cqh", lineHeight: "1.4" }}>
                        {solution.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-auto bg-green-500/10 border border-green-200"
                  style={{ borderRadius: "1cqh", padding: "1.2cqh" }}
                >
                  <p className="text-green-700 font-medium text-center" style={{ fontSize: "1.3cqh" }}>
                    When you receive a call, you hear a whisper: <br/>
                    <span className="font-bold">"This is a call from Google"</span>
                  </p>
                </motion.div>
              </div>

              {/* Benefits Column */}
              <div className="flex flex-col" style={{ gap: "1.2cqh" }}>
                <div className="flex items-center" style={{ gap: "1cqw", marginBottom: "0.5cqh" }}>
                  <div 
                    className="bg-primary/10 flex items-center justify-center"
                    style={{ width: "3cqh", height: "3cqh", borderRadius: "0.8cqh" }}
                  >
                    <Check style={{ width: "1.8cqh", height: "1.8cqh" }} className="text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-title" style={{ fontSize: "2.2cqh" }}>
                    Key Benefits
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 flex-1" style={{ gap: "0.8cqh" }}>
                  {benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + idx * 0.08 }}
                      className="bg-white border border-border/40 shadow-sm flex flex-col"
                      style={{ borderRadius: "1cqh", padding: "1cqh" }}
                    >
                      <benefit.icon 
                        className="text-primary" 
                        style={{ width: "1.8cqh", height: "1.8cqh", marginBottom: "0.5cqh" }} 
                      />
                      <h3 className="font-semibold text-foreground" style={{ fontSize: "1.2cqh", marginBottom: "0.3cqh" }}>
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground" style={{ fontSize: "1cqh", lineHeight: "1.3" }}>
                        {benefit.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <Button
                  onClick={() => navigate("/about/lsa", { state: location.state })}
                  className="w-full"
                  style={{ fontSize: "1.5cqh", padding: "1.2cqh 2cqw", borderRadius: "0.8cqh", marginTop: "auto" }}
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
