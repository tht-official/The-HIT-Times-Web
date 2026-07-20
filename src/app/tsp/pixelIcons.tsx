import React from "react";

interface PixelIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

const colorMap = {
  // Wood / Stick
  w: "#866043", // wood body
  d: "#573d26", // wood dark shadow
  h: "#8c6239", // dark brown
  t: "#d4a373", // light brown

  // Diamond / Cyan
  c: "#55ffff", // cyan diamond
  b: "#00aaaa", // cyan border
  k: "#000000", // black/dark outline
  s: "#0055aa", // dark blue

  // Gold / Orange
  g: "#ffff55", // gold
  o: "#ffaa00", // gold shadow/orange

  // Grays / Stone
  "1": "#747474", // light stone
  "2": "#525252", // medium stone
  "3": "#2b2b2b", // dark stone/black
  l: "#d3d3d3", // light gray
  a: "#a0a0a0", // gray shadow
  e: "#1e1e1e", // dark gray body

  // Red
  r: "#ff5555", // red
  m: "#aa0000", // dark red

  // Bee
  y: "#ffcc00", // bee yellow
  f: "#ffaa00", // bee orange
  p: "#3f200f", // bee brown/black stripe
  n: "#1c0d06", // bee dark eye
  u: "#e1ffff", // bee wing light blue
  v: "#ffffff", // white wing border

  // Wolf
  x: "#d3d3d3", // wolf gray
  q: "#a9a9a9", // wolf dark gray
  z: "#ffffff", // wolf white
};

function RenderGrid({
  grid,
  size = 32,
  className = "",
  ...props
}: {
  grid: string[];
  size?: number;
  className?: string;
} & React.SVGProps<SVGSVGElement>) {
  const width = grid[0].length;
  const height = grid.length;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={size}
      height={size}
      className={`select-none ${className}`}
      style={{ imageRendering: "pixelated" }}
      {...props}
    >
      {grid.map((row, y) =>
        row.split("").map((char, x) => {
          if (char === "." || char === " ") return null;
          const fill = (colorMap as Record<string, string>)[char];
          if (!fill) return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1.02} // Slightly larger to prevent subpixel rendering gaps
              height={1.02}
              fill={fill}
            />
          );
        })
      )}
    </svg>
  );
}

// 1. Diamond Pickaxe (16x16)
const PickaxeGrid = [
  "........kkkkk...",
  "......kkccccckk.",
  ".....kccbbbbbcck",
  "....kcbk.kdk.kck",
  "...kck..kdk..kk.",
  "..kk...kdk......",
  "......kdk.......",
  ".....kdk........",
  "....kdk.........",
  "...kdk..........",
  "..kdk...........",
  ".kdk............",
  "kdk.............",
  "kk..............",
  "................",
  "................",
];

export function PickaxeIcon({ size = 32, className = "", ...props }: PixelIconProps) {
  return <RenderGrid grid={PickaxeGrid} size={size} className={className} {...props} />;
}

// 2. Camera (16x16)
const CameraGrid = [
  "................",
  ".....eeeee......",
  "....errrree.....",
  "...eeeeeeeeee...",
  "..eaalaallaalee.",
  ".ealllllllllllee",
  ".ealhkeeeekhlee.",
  "eallkecccekleell",
  "eallkecchceklell",
  "eallkecccekleell",
  ".ealhkeeeekhlee.",
  "..eallllllllee..",
  "...eeeeeeeeee...",
  ".....eeeeee.....",
  "................",
  "................",
];

export function CameraIcon({ size = 32, className = "", ...props }: PixelIconProps) {
  return <RenderGrid grid={CameraGrid} size={size} className={className} {...props} />;
}

// 3. Minecraft Bee (16x16)
const BeeGrid = [
  "................",
  "......uu...uu...",
  ".....uuuu.uuuu..",
  "....uuuuuuuuuu..",
  "....ppppffffpppp",
  "...ppnnppffppppf",
  "..ppnnpffffffffp",
  "..ppnnppffffffff",
  "..ppnnpffffffffp",
  "...ppnnppffppppf",
  "....ppppffffpppp",
  "......p....p....",
  "......pp...pp...",
  "................",
  "................",
  "................",
];

export function BeeIcon({ size = 32, className = "", ...props }: PixelIconProps) {
  return <RenderGrid grid={BeeGrid} size={size} className={className} {...props} />;
}

// 4. Minecraft Wolf (16x16)
const WolfGrid = [
  "................",
  "...xx......xx...",
  "..xxxx....xxxx..",
  "..xxxxxxxxxxxx..",
  "..xxzzxxxxzzxx..",
  "..xxezxxxxezxx..",
  "...xxeeeeeeex...",
  "....xxeeexxx....",
  "....xrrrrrxx....",
  "...xxxxxxxxxx...",
  "..xxxxxxxxxxxx..",
  "..xxqxxqxxqxxq..",
  "..xlxxxxxxxxlx..",
  "..xx......xx....",
  "..xx......xx....",
  "................",
];

export function WolfIcon({ size = 32, className = "", ...props }: PixelIconProps) {
  return <RenderGrid grid={WolfGrid} size={size} className={className} {...props} />;
}

// 5. Torch (16x16) with pulsating animation style capability
const TorchGrid = [
  "......ryr.......",
  ".....ryoyr......",
  "....ryoooyr.....",
  ".....ryoyr......",
  "......ryr.......",
  "......tht.......",
  "......tht.......",
  "......tht.......",
  "......tht.......",
  "......tht.......",
  "......tht.......",
  "......tht.......",
  "......tht.......",
  "......ttt.......",
  "................",
  "................",
];

export function TorchIcon({ size = 32, className = "", ...props }: PixelIconProps) {
  return (
    <div className="relative inline-block select-none animate-pulse duration-700">
      <RenderGrid grid={TorchGrid} size={size} className={className} {...props} />
      <div className="absolute top-0 left-0 w-full h-full bg-yellow-500/10 rounded-full blur-md animate-ping pointer-events-none duration-1000" />
    </div>
  );
}

// 6. Furnace (16x16)
const FurnaceGrid = [
  "3333333333333333",
  "3111111111111113",
  "3122222222222213",
  "3123333333333213",
  "3123333333333213",
  "3123333333333213",
  "3122222222222213",
  "3111111111111113",
  "3122222222222213",
  "3123333333333213",
  "31233rrrrrr33213",
  "3123rrooooorr213",
  "3123rroyyyorr213",
  "3123rrooooorr213",
  "31233rrrrrr33213",
  "3333333333333333",
];

export function FurnaceIcon({ size = 32, className = "", ...props }: PixelIconProps) {
  return (
    <div className="relative inline-block select-none">
      <RenderGrid grid={FurnaceGrid} size={size} className={className} {...props} />
      <div className="absolute bottom-[10%] left-[20%] w-[60%] h-[30%] bg-orange-600/30 rounded-none blur-sm animate-pulse pointer-events-none duration-200" />
    </div>
  );
}

// 7. Gold Trophy Cup (16x16)
const TrophyGrid = [
  "................",
  "....gggggggg....",
  "...gggggggggg...",
  "..gogggggggogo..",
  "..gogggggggogo..",
  "..googggggoogo..",
  "...googgggooo...",
  "....oooggooo....",
  "......oooo......",
  "......gggg......",
  "......oooo......",
  ".....gggggg.....",
  "....33333333....",
  "....3lllllll3....",
  "....33333333....",
  "................",
];

export function TrophyIcon({ size = 32, className = "", ...props }: PixelIconProps) {
  return <RenderGrid grid={TrophyGrid} size={size} className={className} {...props} />;
}

// 8. 3D grass block built directly with custom geometric SVG elements for maximum detail and depth
export function GrassBlockIcon({ size = 48, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={`select-none ${className}`}
      {...props}
    >
      {/* Top Face (Green Grass) */}
      <polygon points="16,2 30,9 16,16 2,9" fill="#74b03c" />
      {/* Dark green grass details */}
      <polygon points="16,4 26,9 16,14 6,9" fill="#5b8731" />
      
      {/* Left Face (Dirt) */}
      <polygon points="2,9 16,16 16,30 2,23" fill="#573d26" />
      {/* Hanging grass overhang left */}
      <polygon points="2,9 16,16 16,22 13,20 10,23 7,19 2,14" fill="#74b03c" />
      <polygon points="2,9 16,16 16,21 13,19 10,22 7,18 2,13" fill="#5b8731" />

      {/* Right Face (Dirt shadow) */}
      <polygon points="16,16 30,9 30,23 16,30" fill="#47301c" />
      {/* Hanging grass overhang right */}
      <polygon points="16,16 30,9 30,14 26,21 22,18 19,22 16,20" fill="#74b03c" />
      <polygon points="16,16 30,9 30,13 26,20 22,17 19,21 16,19" fill="#5b8731" />
    </svg>
  );
}

// 9. Quill / Feather for Content Writing (16x16)
const QuillGrid = [
  "............zzk.",
  "...........zzzx.",
  "..........zzzx..",
  ".........zzzx...",
  "........zzzx....",
  ".......zzzx.....",
  "......zdzx......",
  ".....zdzx.......",
  "....zdzx........",
  "...zdzx.........",
  "..kdkx..........",
  ".kdk............",
  "kdk.............",
  "kk..............",
  "................",
  "................",
];

export function QuillIcon({ size = 32, className = "", ...props }: PixelIconProps) {
  return <RenderGrid grid={QuillGrid} size={size} className={className} {...props} />;
}

// 10. Paint Palette for Digital Art (16x16)
const PaletteGrid = [
  ".....33333......",
  "....3ttttt33....",
  "...3trrttttt3...",
  "..3trrrttyyt3...",
  ".3tttttyyytt3...",
  ".3tbbttttttt3...",
  "3tbbgtt..tt3....",
  "3tggdtt..t3.....",
  ".3tdddttt3......",
  "..3333333.......",
  "................",
  "................",
  "................",
  "................",
  "................",
  "................",
];

export function PaletteIcon({ size = 32, className = "", ...props }: PixelIconProps) {
  return <RenderGrid grid={PaletteGrid} size={size} className={className} {...props} />;
}

// 11. Video Camera for Video Editing (16x16)
const VideoCameraGrid = [
  "................",
  "....lll...lll...",
  "....lll...lll...",
  "...33333.33333..",
  "..3eeeee3eeeee3.",
  "..3eeeeeeeeeee3.",
  "..3eeeeeeeeeee33",
  "..3eeeeeeeeeee3c3",
  "..3eeeeeeeeeee3cc3",
  "..3eeeeeeeeeee3c3",
  "..3eeeeeeeeeee33",
  "..3eeeeeeeeeee3.",
  "...33333333333..",
  "......3...3.....",
  ".....33...33....",
  "................",
];

export function VideoCameraIcon({ size = 32, className = "", ...props }: PixelIconProps) {
  return <RenderGrid grid={VideoCameraGrid} size={size} className={className} {...props} />;
}

// 12. Creeper Face (8x8)
const CreeperGrid = [
  "........",
  ".kk..kk.",
  ".kk..kk.",
  "...kk...",
  "..kkkk..",
  "..kkkk..",
  "..k..k..",
  "........",
];

export function CreeperIcon({ size = 32, className = "", ...props }: PixelIconProps) {
  return <RenderGrid grid={CreeperGrid} size={size} className={className} {...props} />;
}

// 13. Pixel Heart (16x16)
const HeartGrid = [
  "................",
  "..kkkk....kkkk..",
  ".krrrrk..krrrrk.",
  "krrrrrrkkrrrrrrk",
  "krrrrrrrrrrrrrrk",
  "krrrrrrrrrrrrrrk",
  ".krrrrrrrrrrrrk.",
  "..krrrrrrrrrrk..",
  "...krrrrrrrrk...",
  "....krrrrrrk....",
  ".....krrrrk.....",
  "......krrk......",
  ".......kk.......",
  "................",
  "................",
  "................",
];

export function HeartIcon({ size = 32, className = "", ...props }: PixelIconProps) {
  return <RenderGrid grid={HeartGrid} size={size} className={className} {...props} />;
}

// 14. Diamond (16x16)
const DiamondGrid = [
  "................",
  "......kkkk......",
  "....kkcccckk....",
  "...kccvvcccck...",
  "..kccvccccccck..",
  "..kcccccccccck..",
  "..kbccccbbcccb..",
  "...kbccbbcccb...",
  "....kbbbbbbk....",
  ".....kbbbbk.....",
  "......kbbk......",
  ".......kk.......",
  "................",
  "................",
  "................",
  "................",
];

export function DiamondIcon({ size = 32, className = "", ...props }: PixelIconProps) {
  return <RenderGrid grid={DiamondGrid} size={size} className={className} {...props} />;
}



export function CreeperBlock3D({ className, size = 120 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`select-none pointer-events-none filter drop-shadow-[0_6px_12px_rgba(20,50,20,0.15)] dark:drop-shadow-[0_8px_16px_rgba(16,185,129,0.3)] transition-all duration-300 ${className || ""}`}
      style={{ imageRendering: "pixelated" }}
    >
      {/* TOP FACE (Highlight face - light/dark responsive) */}
      <polygon points="50,10 90,30 50,50 10,30" className="fill-[#5b8731] dark:fill-[#a3e635]" />
      <polygon points="50,15 70,25 50,35 30,25" className="fill-[#74b03c] dark:fill-[#b4f53c]" />
      <polygon points="60,25 70,30 60,35 50,30" className="fill-[#8dc63f] dark:fill-[#d2ff4a]" />

      {/* LEFT FRONT FACE (Creeper Face face - light/dark responsive) */}
      <polygon points="10,30 50,50 50,90 10,70" className="fill-[#4d7c0f] dark:fill-[#22c55e]" />
      {/* Front Face Textures */}
      <polygon points="10,30 15,32.5 15,37.5 10,35" className="fill-[#3f6212] dark:fill-[#4ade80]" />
      <polygon points="15,47.5 20,50 20,55 15,52.5" className="fill-[#5b8731] dark:fill-[#15803d]" />
      <polygon points="45,47.5 50,50 50,55 45,52.5" className="fill-[#3f6212] dark:fill-[#4ade80]" />
      <polygon points="10,65 15,67.5 15,72.5 10,70" className="fill-[#5b8731] dark:fill-[#166534]" />
      <polygon points="45,82.5 50,85 50,90 45,87.5" className="fill-[#62c766] dark:fill-[#86efac]" />

      {/* Skewed Creeper Facial Elements (Charcoal Gray) */}
      {/* Left Eye */}
      <polygon points="15,37.5 25,42.5 25,52.5 15,47.5" className="fill-[#142214] dark:fill-[#050f05]" />
      {/* Right Eye */}
      <polygon points="35,47.5 45,52.5 45,62.5 35,57.5" className="fill-[#142214] dark:fill-[#050f05]" />
      {/* Nose */}
      <polygon points="25,52.5 35,57.5 35,62.5 25,57.5" className="fill-[#142214] dark:fill-[#050f05]" />
      {/* Mouth Top */}
      <polygon points="20,55 40,65 40,75 20,70" className="fill-[#142214] dark:fill-[#050f05]" />
      {/* Mouth Bottom Left Wing */}
      <polygon points="20,65 25,67.5 25,72.5 20,70" className="fill-[#142214] dark:fill-[#050f05]" />
      {/* Mouth Bottom Right Wing */}
      <polygon points="35,72.5 40,75 40,80 35,77.5" className="fill-[#142214] dark:fill-[#050f05]" />

      {/* RIGHT SIDE FACE (Shadow face - light/dark responsive) */}
      <polygon points="50,50 90,30 90,70 50,90" className="fill-[#3f6212] dark:fill-[#14532d]" />
      {/* Shadow face textures */}
      <polygon points="50,50 55,47.5 55,87.5 50,90" className="fill-[#2d470d] dark:fill-[#166534]" />
      <polygon points="70,40 75,37.5 75,77.5 70,80" className="fill-[#1e3009] dark:fill-[#064e3b]" />
      <polygon points="80,35 85,32.5 85,72.5 80,75" className="fill-[#2d470d] dark:fill-[#166534]" />

      {/* Pixelated borders outline mapping */}
      <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald-800/10 dark:text-emerald-300/30" />
    </svg>
  );
}



