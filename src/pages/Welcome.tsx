import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { useRecommendation } from "@/contexts/RecommendationContext";

export default function Welcome() {
  const navigate = useNavigate();
  const { fetchRecommendation } = useRecommendation();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const validateUrl = (value: string): boolean => {
    if (!value.trim()) return false;
    try {
      const urlObj = new URL(value);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    if (value.trim() && !validateUrl(value)) {
      setUrlError("Please enter a valid URL (e.g., https://yourwebsite.com)");
    } else {
      setUrlError("");
    }
  };

  const isValid = name.trim() !== "" && validateUrl(url);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const linesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, radiusX: 200, radiusY: 100 });
  const timeRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const transitionProgressRef = useRef(0);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const numLines = 18;
    const lineSpacing = 11.25;
    const waveAmplitude = 35;
    const waveFrequency = 0.008;
    const interactionStrength = 50;

    class WavyLine {
      index: number;
      baseY: number;
      points: any[];
      numPoints: number;
      baseThickness: number;
      thicknessOffset: number;

      constructor(index: number) {
        this.index = index;
        this.baseY = height * 0.68 + index * lineSpacing;
        this.points = [];
        this.numPoints = 200;
        this.baseThickness = 1.5 + Math.random() * 0.25;
        this.thicknessOffset = Math.random() * Math.PI * 2;
        this.init();
      }

      init() {
        for (let i = 0; i < this.numPoints; i++) {
          this.points.push({
            x: (width / (this.numPoints - 1)) * i,
            y: this.baseY,
            baseY: this.baseY,
          });
        }
      }

      update() {
        for (let i = 0; i < this.points.length; i++) {
          const point = this.points[i];
          const wave = Math.sin(point.x * waveFrequency + timeRef.current + this.index * 0.3) * waveAmplitude;
          const dx = mouseRef.current.x - point.x;
          const dy = mouseRef.current.y - point.baseY;
          const normalizedDistance = Math.sqrt(
            Math.pow(dx / mouseRef.current.radiusX, 2) + Math.pow(dy / mouseRef.current.radiusY, 2),
          );
          let mouseInfluence = 0;
          if (normalizedDistance < 1) {
            const force = 1 - normalizedDistance;
            mouseInfluence = Math.sin(force * Math.PI * 0.5) * interactionStrength;
          }
          point.y = point.baseY + wave + mouseInfluence;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const thicknessVariation = Math.sin(timeRef.current * 0.5 + this.thicknessOffset) * 0.4;
        const thickness = this.baseThickness + thicknessVariation;
        let opacity = 1;
        let offsetX = 0;
        let offsetY = 0;
        let scaleY = 1;

        if (isTransitioningRef.current) {
          const lineDelay = this.index * 0.03;
          const adjustedProgress = Math.max(0, transitionProgressRef.current - lineDelay);
          const spiral = adjustedProgress * 8;
          offsetX = Math.sin(spiral) * adjustedProgress * 300;
          offsetY = Math.cos(spiral) * adjustedProgress * 200 - adjustedProgress * 800;
          opacity = 0.85 * (1 - adjustedProgress);
          scaleY = 1 + adjustedProgress * 3;
          this.points.forEach((point) => {
            point.y += Math.sin(point.x * 0.02 + adjustedProgress * 10) * adjustedProgress * 50;
          });
        }

        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.scale(1, scaleY);

        if (this.index === numLines - 1) {
          ctx.beginPath();
          ctx.moveTo(this.points[0].x - 50, this.points[0].y);
          for (let i = 0; i < this.points.length - 1; i += 2) {
            const p0 = this.points[i];
            const p1 = this.points[Math.min(i + 1, this.points.length - 1)];
            const p2 = this.points[Math.min(i + 2, this.points.length - 1)];
            const cp1x = p0.x + (p1.x - p0.x) * 0.66;
            const cp1y = p0.y + (p1.y - p0.y) * 0.66;
            const cp2x = p1.x + (p2.x - p1.x) * 0.33;
            const cp2y = p1.y + (p2.y - p1.y) * 0.33;
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
          }
          const last = this.points[this.points.length - 1];
          ctx.lineTo(last.x + 50, last.y);
          ctx.lineTo(width + 50, height + 50);
          ctx.lineTo(-50, height + 50);
          ctx.closePath();
          const gradient = ctx.createLinearGradient(0, this.baseY, 0, height);
          gradient.addColorStop(0, "rgba(227, 102, 79, 1)");
          gradient.addColorStop(1, "rgba(227, 102, 79, 1)");
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.moveTo(this.points[0].x - 50, this.points[0].y);
        for (let i = 0; i < this.points.length - 1; i += 2) {
          const p0 = this.points[i];
          const p1 = this.points[Math.min(i + 1, this.points.length - 1)];
          const p2 = this.points[Math.min(i + 2, this.points.length - 1)];
          const cp1x = p0.x + (p1.x - p0.x) * 0.66;
          const cp1y = p0.y + (p1.y - p0.y) * 0.66;
          const cp2x = p1.x + (p2.x - p1.x) * 0.33;
          const cp2y = p1.y + (p2.y - p1.y) * 0.33;
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }
        const last = this.points[this.points.length - 1];
        ctx.lineTo(last.x + 50, last.y);
        ctx.strokeStyle = `rgba(227, 102, 79, ${opacity})`;
        ctx.lineWidth = thickness;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
        ctx.restore();
      }
    }

    const lines = [];
    for (let i = 0; i < numLines; i++) lines.push(new WavyLine(i));
    linesRef.current = lines;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      mouseRef.current.x = t.clientX;
      mouseRef.current.y = t.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    function animate() {
      if (!ctx) return;
      ctx.fillStyle = "#f7f5f2";
      ctx.fillRect(0, 0, width, height);
      if (isTransitioningRef.current) {
        transitionProgressRef.current += 0.008;
      }
      lines.forEach((l) => {
        l.update();
        l.draw(ctx);
      });
      timeRef.current += 0.005;
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      lines.length = 0;
      for (let i = 0; i < numLines; i++) lines.push(new WavyLine(i));
      linesRef.current = lines;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleContinue = () => {
    fetchRecommendation(name, url);

    isTransitioningRef.current = true;
    transitionProgressRef.current = 0;
    setTimeout(() => {
      navigate("/fact-finder", { state: { name, url } });
    }, 2000);
  };

  const inputStyles =
    "w-full border-2 border-border/30 bg-white/80 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/5 transition-all duration-200";

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f7f5f2]">
      <style>{`
        @keyframes fadeInSmooth {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .backdrop-overlay {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.06);
          pointer-events: none;
          z-index: 5;
        }
        .glass {
          backdrop-filter: blur(3px) saturate(100%);
          -webkit-backdrop-filter: blur(3px) saturate(100%);
          background: rgba(255, 255, 255, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
          position: relative;
          overflow: hidden;
        }
      `}</style>

      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" style={{ zIndex: 1 }} />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#f7f5f2]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
              />
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-deep-blue/70 font-medium text-lg"
              >
                Loading Pathfinder...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-20 min-h-screen flex items-center justify-center p-6"
      >
        <div className="backdrop-overlay"></div>

        <div style={{ width: "min(27.5vw, calc(90vh * 1.1))", aspectRatio: "1.1", containerType: "size" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? -20 : 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
            style={{ marginBottom: "3cqw" }}
          >
            <h1 className="font-display font-bold text-title" style={{ fontSize: "12cqw", marginBottom: "1.5cqw" }}>
              Pathfinder
            </h1>
            <p className="text-deep-blue/70" style={{ fontSize: "4cqw" }}>
              Find the right path for you
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="glass"
            style={{ padding: "5cqw", borderRadius: "3cqw" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "4cqw" }}>
              <div style={{ marginBottom: "2cqw" }}>
                <h2 className="font-display font-bold text-title" style={{ fontSize: "4.5cqw" }}>
                  Get Started
                </h2>
                <p className="text-deep-blue/50" style={{ fontSize: "2.5cqw" }}>
                  Enter your details to begin your personalised path
                </p>
              </div>

              <div>
                <label
                  className="block font-semibold text-[#173340]"
                  style={{ fontSize: "2.8cqw", marginBottom: "1cqw" }}
                >
                  Name<span className="text-primary">*</span>
                </label>
                <input
                  value={name}
                  placeholder="Enter your business name"
                  onChange={(e) => setName(e.target.value)}
                  className={inputStyles}
                  style={{ padding: "2cqw", borderRadius: "1.5cqw", fontSize: "2.8cqw" }}
                />
              </div>

              <div>
                <label
                  className="block font-semibold text-[#173340]"
                  style={{ fontSize: "2.8cqw", marginBottom: "1cqw" }}
                >
                  Website URL<span className="text-primary">*</span>
                </label>
                <input
                  value={url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  type="url"
                  className={inputStyles}
                  style={{ padding: "2cqw", borderRadius: "1.5cqw", fontSize: "2.8cqw" }}
                />
                {urlError && (
                  <p className="text-destructive" style={{ fontSize: "2.2cqw", marginTop: "1cqw" }}>
                    {urlError}
                  </p>
                )}
              </div>

              <Button
                onClick={handleContinue}
                disabled={!isValid}
                className="w-full"
                style={{ fontSize: "2.8cqw", padding: "2.5cqw", borderRadius: "1.5cqw" }}
              >
                Continue
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
