import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import { toast } from "sonner";

// Orange accent motif component
function OrangeAccent() {
  return (
    <div className="flex items-center gap-2 mt-6">
      <div className="flex gap-1.5">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 - i * 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        ))}
      </div>
      <motion.div
        className="h-[2px] w-16 bg-gradient-to-r from-primary to-transparent rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      />
    </div>
  );
}

export default function RequiredInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as Record<string, any> | null;
  
  const product = state?.product || "Unknown";
  const totalSteps = product === "LSA" ? 4 : 7;
  const productLabel = product === "LeadGen Trial" ? "Lead Generation" : product === "LSA" ? "LSAs" : product;

  const [clientName, setClientName] = useState("");
  const [contractSelected, setContractSelected] = useState("");
  const [recurringRevenue, setRecurringRevenue] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUrl, setLoginUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isForm1Valid = clientName && contractSelected && recurringRevenue;
  const isForm2Valid = username && password && loginUrl;
  const allValid = isForm1Valid && isForm2Valid;

  const handleSubmit = () => {
    toast.success("Campaign setup complete! Thank you for your information.");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
        <PageHeader
          onBack={() => navigate(-1)}
          currentStep={totalSteps}
          totalSteps={totalSteps}
          showProgress
          productLabel={productLabel}
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
                {/* Left Side - Client Details */}
                <div className="p-12 md:p-16 lg:p-20 flex flex-col justify-center bg-gradient-to-br from-white to-muted/20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
                      Final Step
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-title leading-tight tracking-tight">
                      Client Details
                    </h2>
                    
                    {/* Orange Accent Motif */}
                    <OrangeAccent />

                    {/* Form Fields */}
                    <div className="mt-10 space-y-5">
                      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/30">
                        <Input
                          label="Client Name"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Enter client name"
                          className="border-0 shadow-none focus:ring-0 bg-transparent"
                        />
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/30">
                        <Input
                          label="Contract Selected"
                          value={contractSelected}
                          onChange={(e) => setContractSelected(e.target.value)}
                          placeholder="E.g., 12 Month Local SEO"
                          className="border-0 shadow-none focus:ring-0 bg-transparent"
                        />
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border/30">
                        <Input
                          label="Recurring Revenue"
                          type="number"
                          value={recurringRevenue}
                          onChange={(e) => setRecurringRevenue(e.target.value)}
                          placeholder="£ per month"
                          className="border-0 shadow-none focus:ring-0 bg-transparent"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Side - Login Details */}
                <div className="p-12 md:p-16 lg:p-20 flex flex-col justify-center bg-muted/30 border-l border-border/20">
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
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Password
                        </label>
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
                    <Button onClick={handleSubmit} disabled={!allValid} fullWidth>
                      Complete Setup
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      All information is securely stored and encrypted
                    </p>

                    {/* Back Button */}
                    <button
                      onClick={() => navigate(-1)}
                      className="mt-8 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-3 group"
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