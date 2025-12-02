import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative backdrop-blur-xl bg-white/70 rounded-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
        "before:absolute before:inset-0 before:rounded-2xl before:opacity-30",
        "before:bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")]",
        "before:mix-blend-overlay before:pointer-events-none",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
