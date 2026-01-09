import { ArrowLeft, User, LogOut, Home, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "./ProgressBar";
import { useAuth } from "@/contexts/AuthContext";
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
  showSmartSite?: boolean;
}

export function PageHeader({
  onBack,
  currentStep,
  totalSteps,
  showProgress = false,
  productLabel,
  showSmartSite = false,
}: PageHeaderProps) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

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
        <div className="flex items-center justify-between h-full w-full">
          {/* Left: Back button - fixed percentage width */}
          <div style={{ width: "15%", flexShrink: 0 }}>
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

          {/* Center: Progress bar - fixed percentage width, always centered */}
          <div style={{ width: "40%", flexShrink: 0 }} className="flex justify-center">
            {showProgress && currentStep && totalSteps && (
              <div className="w-full">
                <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
              </div>
            )}
          </div>

          {/* Right: Product label + Profile - fixed percentage width */}
          <div className="flex items-center justify-end" style={{ width: "15%", flexShrink: 0, gap: "1vw" }}>
            {productLabel && (
              <div className="flex flex-col items-end" style={{ gap: "0.3vw" }}>
                <span
                  className="font-semibold text-green-600 whitespace-nowrap inline-block"
                  style={{
                    fontSize: "clamp(10px, 0.8vw, 14px)",
                    padding: "clamp(3px, 0.3vw, 6px) clamp(8px, 0.8vw, 14px)",
                  }}
                >
                  Product: {productLabel}
                </span>
                {showSmartSite && (
                  <span
                    className="font-medium text-primary whitespace-nowrap inline-flex items-center"
                    style={{
                      fontSize: "clamp(9px, 0.7vw, 12px)",
                      padding: "clamp(2px, 0.2vw, 4px) clamp(6px, 0.6vw, 10px)",
                      gap: "0.2vw",
                    }}
                  >
                    <Plus style={{ width: "0.8em", height: "0.8em" }} />
                    SmartSite
                  </span>
                )}
              </div>
            )}
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
