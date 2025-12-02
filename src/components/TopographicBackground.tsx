import { useEffect, useRef } from "react";

export function TopographicBackground() {
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

    // Noise function for organic shapes
    const noise = (x: number, y: number, t: number) => {
      const scale = 0.003;
      let value = 0;
      let amplitude = 1;
      let frequency = 1;

      for (let i = 0; i < 4; i++) {
        value +=
          amplitude *
          Math.sin(x * scale * frequency + t * 0.5) *
          Math.cos(y * scale * frequency + t * 0.3) *
          Math.sin((x + y) * scale * frequency * 0.5 + t * 0.2);
        amplitude *= 0.5;
        frequency *= 2;
      }
      return value;
    };

    function drawContours() {
      if (!ctx) return;

      // Clear with cream background - slightly more subtle
      ctx.fillStyle = "#faf9f7";
      ctx.fillRect(0, 0, width, height);

      const gridSize = 12;
      const levels = 6;
      const time = timeRef.current;

      // Create height map
      const heightMap: number[][] = [];
      for (let x = 0; x <= width / gridSize; x++) {
        heightMap[x] = [];
        for (let y = 0; y <= height / gridSize; y++) {
          heightMap[x][y] = noise(x * gridSize, y * gridSize, time);
        }
      }

      // Draw contour lines using marching squares - softer for premium feel
      ctx.strokeStyle = "rgba(227, 102, 79, 0.50)";
      ctx.lineWidth = 0.8;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let level = 0; level < levels; level++) {
        const threshold = -1 + (2 * level) / levels;
        ctx.beginPath();

        for (let x = 0; x < width / gridSize - 1; x++) {
          for (let y = 0; y < height / gridSize - 1; y++) {
            const tl = heightMap[x][y] > threshold ? 1 : 0;
            const tr = heightMap[x + 1][y] > threshold ? 1 : 0;
            const br = heightMap[x + 1][y + 1] > threshold ? 1 : 0;
            const bl = heightMap[x][y + 1] > threshold ? 1 : 0;
            const code = tl * 8 + tr * 4 + br * 2 + bl;

            const px = x * gridSize;
            const py = y * gridSize;
            const size = gridSize;

            // Interpolation helper
            const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
            const getT = (v1: number, v2: number) => {
              if (Math.abs(v2 - v1) < 0.0001) return 0.5;
              return (threshold - v1) / (v2 - v1);
            };

            const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
            };

            const top = lerp(px, px + size, getT(heightMap[x][y], heightMap[x + 1][y]));
            const right = lerp(py, py + size, getT(heightMap[x + 1][y], heightMap[x + 1][y + 1]));
            const bottom = lerp(px, px + size, getT(heightMap[x][y + 1], heightMap[x + 1][y + 1]));
            const left = lerp(py, py + size, getT(heightMap[x][y], heightMap[x][y + 1]));

            switch (code) {
              case 1:
              case 14:
                drawLine(px, left, bottom, py + size);
                break;
              case 2:
              case 13:
                drawLine(bottom, py + size, px + size, right);
                break;
              case 3:
              case 12:
                drawLine(px, left, px + size, right);
                break;
              case 4:
              case 11:
                drawLine(top, py, px + size, right);
                break;
              case 5:
                drawLine(px, left, top, py);
                drawLine(bottom, py + size, px + size, right);
                break;
              case 6:
              case 9:
                drawLine(top, py, bottom, py + size);
                break;
              case 7:
              case 8:
                drawLine(px, left, top, py);
                break;
              case 10:
                drawLine(px, left, bottom, py + size);
                drawLine(top, py, px + size, right);
                break;
            }
          }
        }
        ctx.stroke();
      }
    }

    function animate() {
      drawContours();
      timeRef.current += 0.004;
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}
