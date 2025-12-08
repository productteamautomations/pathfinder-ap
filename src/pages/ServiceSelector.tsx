import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { 
  Home, 
  Search, 
  MapPin, 
  MousePointerClick, 
  BadgeCheck,
  BarChart3,
  HeartPulse,
  RefreshCw,
  CreditCard,
  FileText,
  Folder,
  FolderOpen
} from "lucide-react";
import { useState } from "react";

type RouteItem = {
  path: string;
  label: string;
  icon: React.ElementType;
};

type FolderSection = {
  id: string;
  title: string;
  icon: React.ElementType;
  routes: RouteItem[];
};

const siteStructure: FolderSection[] = [
  {
    id: "main",
    title: "Main Flow",
    icon: Home,
    routes: [
      { path: "/", label: "Welcome", icon: Home },
      { path: "/fact-finder", label: "Fact Finder", icon: Search },
      { path: "/required-info", label: "Required Info", icon: FileText },
    ],
  },
  {
    id: "localseo",
    title: "Local SEO",
    icon: MapPin,
    routes: [
      { path: "/product-recommendation/localseo", label: "Product Recommendation", icon: MapPin },
      { path: "/funnel-diagnostic/localseo", label: "Funnel Diagnostic", icon: BarChart3 },
      { path: "/funnel-health/localseo", label: "Funnel Health", icon: HeartPulse },
      { path: "/business-cycle/localseo", label: "Business Cycle", icon: RefreshCw },
      { path: "/about/localseo", label: "About Add People", icon: FileText },
      { path: "/pricing/localseo", label: "Pricing", icon: CreditCard },
    ],
  },
  {
    id: "leadgen",
    title: "Lead Generation",
    icon: MousePointerClick,
    routes: [
      { path: "/product-recommendation/leadgen", label: "Product Recommendation", icon: MousePointerClick },
      { path: "/funnel-diagnostic/leadgen", label: "Funnel Diagnostic", icon: BarChart3 },
      { path: "/funnel-health/leadgen", label: "Funnel Health", icon: HeartPulse },
      { path: "/business-cycle/leadgen", label: "Business Cycle", icon: RefreshCw },
      { path: "/about/leadgen", label: "About Add People", icon: FileText },
      { path: "/pricing/leadgen", label: "Pricing", icon: CreditCard },
    ],
  },
  {
    id: "lsa",
    title: "Local Services Ads",
    icon: BadgeCheck,
    routes: [
      { path: "/product-recommendation/lsa", label: "Product Recommendation", icon: BadgeCheck },
      { path: "/about/lsa", label: "About Add People", icon: FileText },
      { path: "/pricing/lsa", label: "Pricing", icon: CreditCard },
    ],
  },
];

export default function ServiceSelector() {
  const navigate = useNavigate();
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["main", "localseo", "leadgen", "lsa"]);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        onBack={() => navigate("/")}
        currentStep={0}
        totalSteps={0}
        showProgress={false}
      />

      <div className="flex-1 pt-[73px] flex flex-col">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center px-6 py-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-foreground">Site</span>{" "}
            <span className="text-primary">Navigator</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Developer access — Browse all pages
          </p>
        </motion.div>

        {/* Folder Structure */}
        <div className="flex-1 px-6 md:px-12 lg:px-20 pb-12">
          <div className="max-w-2xl mx-auto space-y-3">
            {siteStructure.map((folder, folderIndex) => {
              const isExpanded = expandedFolders.includes(folder.id);
              const FolderIcon = isExpanded ? FolderOpen : Folder;
              
              return (
                <motion.div
                  key={folder.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + folderIndex * 0.05, duration: 0.4 }}
                  className="bg-white rounded-2xl border border-border/30 overflow-hidden shadow-sm"
                >
                  {/* Folder Header */}
                  <button
                    onClick={() => toggleFolder(folder.id)}
                    className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-colors text-left"
                  >
                    <FolderIcon className="w-5 h-5 text-primary" />
                    <folder.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">{folder.title}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {folder.routes.length} pages
                    </span>
                  </button>

                  {/* Folder Contents */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-border/20"
                    >
                      {folder.routes.map((route, routeIndex) => (
                        <button
                          key={route.path}
                          onClick={() => navigate(route.path)}
                          className="w-full flex items-center gap-3 px-5 py-3 pl-14 hover:bg-primary/5 transition-colors text-left group"
                        >
                          <route.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                            {route.label}
                          </span>
                          <span className="text-xs text-muted-foreground ml-auto font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                            {route.path}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
