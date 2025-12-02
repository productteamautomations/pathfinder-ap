import { useEffect, useRef } from "react";

interface WaveBackgroundProps {
  className?: string;
}

export function WaveBackground({ className = "" }: WaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const numLines = 20;
    const lineSpacing = 10;
    const waveAmplitude = 25;
    const waveFrequency = 0.006;

    class WavyLine {
      index: number;
      baseY: number;
      points: { x: number; y: number; baseY: number }[];
      numPoints: number;

      constructor(index: number) {
        this.index = index;
        this.baseY = height * 0.72 + index * lineSpacing;
        this.points = [];
        this.numPoints = 150;
        this.init();
      }

      init() {
        this.points = [];
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
          const wave = Math.sin(point.x * waveFrequency + timeRef.current + this.index * 0.25) * waveAmplitude;
          point.y = point.baseY + wave;
        }
      }

      draw(ctx: CanvasRenderingContext2D, isLast: boolean) {
        // Draw fill underneath the bottom line
        if (isLast) {
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
          ctx.fillStyle = "rgba(227, 102, 79, 0.95)";
          ctx.fill();
        }

        // Draw line stroke
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
        ctx.strokeStyle = "rgba(227, 102, 79, 0.6)";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }
    }

    let lines: WavyLine[] = [];
    for (let i = 0; i < numLines; i++) lines.push(new WavyLine(i));

    function animate() {
      if (!ctx) return;
      ctx.fillStyle = "#f7f5f2";
      ctx.fillRect(0, 0, width, height);

      lines.forEach((l, idx) => {
        l.update();
        l.draw(ctx, idx === numLines - 1);
      });
      timeRef.current += 0.004;
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      lines = [];
      for (let i = 0; i < numLines; i++) lines.push(new WavyLine(i));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
