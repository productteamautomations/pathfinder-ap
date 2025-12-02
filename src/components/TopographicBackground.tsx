export function TopographicBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      
      {/* Subtle topographic pattern using CSS */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.15]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern 
            id="topo-pattern" 
            x="0" 
            y="0" 
            width="200" 
            height="200" 
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 0 100 Q 50 80 100 100 T 200 100"
              fill="none"
              stroke="hsl(9, 73%, 60%)"
              strokeWidth="0.8"
            />
            <path
              d="M 0 60 Q 60 40 100 60 T 200 60"
              fill="none"
              stroke="hsl(9, 73%, 60%)"
              strokeWidth="0.6"
            />
            <path
              d="M 0 140 Q 40 120 100 140 T 200 140"
              fill="none"
              stroke="hsl(9, 73%, 60%)"
              strokeWidth="0.6"
            />
            <ellipse
              cx="100"
              cy="100"
              rx="60"
              ry="40"
              fill="none"
              stroke="hsl(9, 73%, 60%)"
              strokeWidth="0.5"
            />
            <ellipse
              cx="100"
              cy="100"
              rx="40"
              ry="25"
              fill="none"
              stroke="hsl(9, 73%, 60%)"
              strokeWidth="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo-pattern)" />
      </svg>
    </div>
  );
}
