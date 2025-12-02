import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Eye, EyeOff } from "lucide-react";

export default function RequiredInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Form 1: Client Details
  const [clientName, setClientName] = useState("");
  const [contractSelected, setContractSelected] = useState("");
  const [recurringRevenue, setRecurringRevenue] = useState("");

  // Form 2: Website Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUrl, setLoginUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isForm1Valid = clientName && contractSelected && recurringRevenue;
  const isForm2Valid = username && password && loginUrl;
  const allValid = isForm1Valid && isForm2Valid;

  const handleSubmit = () => {
    // In a real app, this would submit to a backend
    alert("Campaign setup complete! Thank you for your information.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        onBack={() => navigate(-1)}
        currentStep={11}
        totalSteps={11}
        showProgress
      />

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Required Information
            </h1>
            <p className="text-muted-foreground mb-8">
              Final step! Please provide the following details to complete your setup
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Form 1: Client Details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="p-6 h-full">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Client Details
                  </h2>
                  <div className="space-y-5">
                    <Input
                      label="Client Name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Enter client name"
                      required
                    />
                    <Input
                      label="Contract Selected"
                      value={contractSelected}
                      onChange={(e) => setContractSelected(e.target.value)}
                      placeholder="E.g., 12 Month Local SEO"
                      required
                    />
                    <Input
                      label="Recurring Revenue"
                      type="number"
                      value={recurringRevenue}
                      onChange={(e) => setRecurringRevenue(e.target.value)}
                      placeholder="£ per month"
                      required
                    />
                  </div>
                </Card>
              </motion.div>

              {/* Form 2: Website Login */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="p-6 h-full">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Website Login Details
                  </h2>
                  <div className="space-y-5">
                    <Input
                      label="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      required
                    />
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Password <span className="text-secondary">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          required
                          className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <Input
                      label="Login URL"
                      type="url"
                      value={loginUrl}
                      onChange={(e) => setLoginUrl(e.target.value)}
                      placeholder="https://yourwebsite.com/wp-admin"
                      required
                    />
                  </div>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <Button
                onClick={handleSubmit}
                disabled={!allValid}
                className="px-16"
              >
                Complete Setup
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                All information is securely stored and encrypted
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
