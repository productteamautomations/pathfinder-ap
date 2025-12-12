import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { useRecommendation } from "@/contexts/RecommendationContext";

export default function Welcome() {
  const navigate = useNavigate();
  const { fetchRecommendation } = useRecommendation();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");

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
    // Start the webhook request in background (don't await)
    fetchRecommendation(name, url);

    isTransitioningRef.current = true;
    transitionProgressRef.current = 0;
    setTimeout(() => {
      navigate("/fact-finder", { state: { name, url } });
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style>{`
        @keyframes fadeInSmooth {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .smooth-entrance {
          animation: fadeInSmooth 0.9s ease-out forwards;
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
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
          position: relative;
          overflow: hidden;
          will-change: transform, opacity, backdrop-filter;
          transform: translateZ(0);
        }
        .glass::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.4;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          pointer-events: none;
          mix-blend-mode: overlay;
        }
      `}</style>

      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" style={{ zIndex: 1 }} />

      <div className="relative z-20 min-h-screen flex items-center justify-center p-6">
        <div className="backdrop-overlay"></div>
        <div className="w-full relative" style={{ maxWidth: "min(28vw, calc(90vh * 0.6))", aspectRatio: "0.6" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-6xl font-display font-bold text-title mb-3">Pathfinder</h1>
            <p className="text-xl text-deep-blue/70">Find the right path for you</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8"
          >
            <div className="space-y-6">
              <div className="space-y-1 mb-8">
                <h2 className="text-2xl font-display font-bold text-title">Get Started</h2>
                <p className="text-deep-blue/50 text-sm">Enter your details to begin your personalised path</p>
              </div>
              <Input
                label="Name"
                value={name}
                placeholder="Enter your business name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className="space-y-1">
                <Input
                  label="Website URL"
                  value={url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  type="url"
                  required
                />
                {urlError && <p className="text-sm text-destructive">{urlError}</p>}
              </div>
              <Button onClick={handleContinue} disabled={!isValid} fullWidth>
                Continue
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
