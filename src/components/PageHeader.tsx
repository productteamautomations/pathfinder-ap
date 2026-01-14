import { ArrowLeft, User, LogOut, Home, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "./ProgressBar";
import { useAuth } from "@/contexts/AuthContext";
import { useRecommendation } from "@/contexts/RecommendationContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PageHeaderProps {
  onBack?: () => void;
  currentStep?: number;
  totalSteps?: number;
  showProgress?: boolean;
  productLabel?: string;
  showSmartSiteToggle?: boolean;
}

export function PageHeader({
  onBack,
  currentStep,
  totalSteps,
  showProgress = false,
  productLabel,
  showSmartSiteToggle = false,
}: PageHeaderProps) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { recommendation, smartSiteEnabled, setSmartSiteEnabled } = useRecommendation();

  // SmartSite is required when isBig3 is false - hide toggle
  const smartSiteRequired = recommendation.isBig3 === false;

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50"
      style={{ height: "7.3vh" }}
    >
      <div className="h-full w-full" style={{ padding: "0 3%" }}>
        <div 
          className="h-full w-full"
          style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr auto 1fr", 
            alignItems: "center",
          }}
        >
          {/* Left: Back button */}
          <div className="justify-self-start">
            {onBack ? (
              <button
                onClick={onBack}
                className="text-foreground/70 hover:text-foreground transition-colors flex items-center font-medium"
                style={{ gap: "0.5em", fontSize: "clamp(12px, 1vw, 16px)" }}
              >
                <ArrowLeft style={{ width: "1.25em", height: "1.25em", minWidth: "16px", minHeight: "16px" }} />
                Back
              </button>
            ) : (
              <div />
            )}
          </div>

          {/* Center: Progress bar - dead center */}
          <div className="justify-self-center">
            {showProgress && currentStep && totalSteps ? (
              <div style={{ width: "clamp(180px, 30vw, 400px)" }}>
                <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
              </div>
            ) : (
              <div />
            )}
          </div>

          {/* Right: Product label + SmartSite toggle + Profile */}
          <div className="justify-self-end flex items-center" style={{ gap: "1.5vw" }}>
            {/* Product label */}
            {productLabel && (
              <span
                className="font-semibold text-green-600 whitespace-nowrap"
                style={{
                  fontSize: "clamp(10px, 0.9vw, 14px)",
                }}
              >
                Product: {productLabel}
              </span>
            )}

            {/* SmartSite toggle - only show if showSmartSiteToggle is true AND not required */}
            {showSmartSiteToggle && !smartSiteRequired && (
              <div className="flex items-center" style={{ gap: "0.4vw" }}>
                <button
                  onClick={() => setSmartSiteEnabled(!smartSiteEnabled)}
                  className={`relative transition-all flex-shrink-0 ${
                    smartSiteEnabled ? "bg-primary" : "bg-muted"
                  }`}
                  style={{
                    width: "clamp(28px, 2.2vw, 36px)",
                    height: "clamp(16px, 1.25vw, 20px)",
                    borderRadius: "clamp(8px, 0.625vw, 10px)",
                  }}
                >
                  <span
                    className={`absolute bg-white rounded-full shadow-sm transition-all`}
                    style={{
                      width: "clamp(12px, 0.95vw, 16px)",
                      height: "clamp(12px, 0.95vw, 16px)",
                      top: "clamp(2px, 0.15vw, 2px)",
                      left: smartSiteEnabled ? "calc(100% - clamp(14px, 1.1vw, 18px))" : "clamp(2px, 0.15vw, 2px)",
                    }}
                  />
                </button>
                <span className={`inline-flex items-center font-medium whitespace-nowrap ${smartSiteEnabled ? "text-primary" : "text-muted-foreground"}`} style={{ gap: "0.15em", fontSize: "clamp(10px, 0.8vw, 14px)" }}>
                  <Plus style={{ width: "0.8em", height: "0.8em" }} />
                  SmartSite
                </span>
              </div>
            )}
            
            {/* Show SmartSite label without toggle when required */}
            {showSmartSiteToggle && smartSiteRequired && (
              <span className="inline-flex items-center text-primary font-medium whitespace-nowrap" style={{ gap: "0.15em", fontSize: "clamp(10px, 0.8vw, 14px)" }}>
                <Plus style={{ width: "0.8em", height: "0.8em" }} />
                SmartSite
              </span>
            )}

            {/* Profile */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/30 flex items-center justify-center hover:bg-background hover:shadow-md transition-all duration-200">
                    <User className="w-4 h-4 text-foreground/70" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 z-50 bg-background">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.fullName || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleGoHome} className="cursor-pointer">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
