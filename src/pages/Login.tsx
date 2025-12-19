import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import logoGraphic from "@/assets/Logo_graphic.svg";

class WavyLine {
  points: { x: number; y: number; baseY: number; speed: number; amplitude: number; phase: number }[];
  color: string;
  lineWidth: number;
  private segmentCount: number;
  private width: number;

  constructor(y: number, color: string, width: number, lineWidth: number) {
    this.color = color;
    this.lineWidth = lineWidth;
    this.width = width;
    this.segmentCount = 80;
    this.points = [];

    for (let i = 0; i <= this.segmentCount; i++) {
      this.points.push({
        x: (i / this.segmentCount) * width,
        y: y,
        baseY: y,
        speed: 0.5 + Math.random() * 1.0,
        amplitude: 10 + Math.random() * 30,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  update(time: number, mouseX: number, mouseY: number) {
    this.points.forEach((point, i) => {
      const waveOffset = Math.sin(time * point.speed + point.phase + (i * 0.1)) * point.amplitude;
      const dx = point.x - mouseX;
      const dy = point.baseY - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 200;
      const mouseInfluence = Math.max(0, 1 - distance / maxDistance);
      const mouseOffset = mouseInfluence * 60 * (dy > 0 ? 1 : -1);
      point.y = point.baseY + waveOffset + mouseOffset;
    });
  }

  draw(ctx: CanvasRenderingContext2D, transitionProgress: number) {
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.points.length - 2; i++) {
      const xc = (this.points[i].x + this.points[i + 1].x) / 2;
      const yc = (this.points[i].y + this.points[i + 1].y) / 2;
      ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
    }

    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = "round";
    ctx.globalAlpha = 1 - transitionProgress;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

export default function Login() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const linesRef = useRef<WavyLine[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const navigate = useNavigate();
  const { user, isLoading, signInWithGoogle } = useAuth();
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (!isLoading && user) {
      navigate("/", { replace: true });
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initLines();
    };

    const initLines = () => {
      const lineCount = 7;
      const colors = [
        "rgba(231, 122, 91, 0.6)",
        "rgba(231, 122, 91, 0.4)",
        "rgba(255, 205, 99, 0.5)",
        "rgba(231, 122, 91, 0.3)",
        "rgba(255, 205, 99, 0.4)",
        "rgba(231, 122, 91, 0.5)",
        "rgba(255, 205, 99, 0.3)",
      ];

      linesRef.current = [];
      for (let i = 0; i < lineCount; i++) {
        const y = (canvas.height / (lineCount + 1)) * (i + 1);
        const lineWidth = 2 + Math.random() * 2;
        linesRef.current.push(new WavyLine(y, colors[i % colors.length], canvas.width, lineWidth));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.016;

      linesRef.current.forEach((line) => {
        line.update(timeRef.current, mouseRef.current.x, mouseRef.current.y);
        line.draw(ctx, 0);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Could not sign in with Google",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-muted-foreground">Loading...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-cream">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }} />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-8"
        >
          {/* Logo */}
          <motion.img
            src={logoGraphic}
            alt="Add People"
            className="h-16 w-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />

          {/* Glass card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/50 shadow-lg"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-title mb-2">Welcome</h1>
                <p className="text-muted-foreground">Sign in to continue to Pathfinder</p>
              </div>

              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white border border-border hover:bg-muted/50 transition-all duration-200 shadow-sm hover:shadow-md group"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="font-medium text-foreground group-hover:text-title transition-colors">
                  Continue with Google
                </span>
              </button>

              <p className="text-xs text-muted-foreground text-center">
                By signing in, you agree to our terms of service
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
