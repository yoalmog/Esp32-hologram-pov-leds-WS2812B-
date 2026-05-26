import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  Wifi,
  Clock,
  Flame,
  Power,
  Sun,
  Fan,
  RefreshCw,
  Target,
  Thermometer,
  Zap,
  Settings,
  Info,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle2,
  Database,
  Eye,
  EyeOff,
  Monitor,
  Globe,
  AlertTriangle,
  Save,
  Download,
  X,
  Trash2,
  Upload,
  Aperture,
  Box,
  Smile,
  Type,
  Ghost,
  Video,
  Image,
  Search,
  Cpu,
  ShieldCheck,
  CloudLightning,
  Smartphone,
  Bluetooth,
  HardDrive,
  FileText,
  Folders,
} from "lucide-react";
import { GalaxyBackground } from "./components/GalaxyBackground";
import { HologramSimulator } from "./components/HologramSimulator";
import planetImg from "./assets/images/hologram_planet_1779776225377.png";
import galaxy1 from "./assets/images/hd_vivid_galaxy_1779780978111.png";
import galaxy2 from "./assets/images/rainbow_galaxy_1779781352503.png";
import galaxy3 from "./assets/images/warm_galaxy_1779781369262.png";
import video1 from "./assets/12656_Big_Bang_1080.webm";
import video2 from "./assets/129936-745943770.mp4";

export const VIDEO_PRESETS = [
  { id: "big_bang", name: "Galaxy Big Bang 🌌", url: video1 },
  { id: "neon_tunnel", name: "Neon Matrix Tunnel 👾", url: video2 },
];

const RainbowIcon = () => (
  <svg
    viewBox="0 0 100 60"
    fill="none"
    strokeWidth="6"
    strokeLinecap="round"
    className="w-8 h-8"
  >
    <path d="M 10 50 A 40 40 0 0 1 90 50" stroke="#ef4444" />
    <path d="M 22 50 A 28 28 0 0 1 78 50" stroke="#f97316" />
    <path d="M 34 50 A 16 16 0 0 1 66 50" stroke="#22c55e" />
    <path d="M 46 50 A 4 4 0 0 1 54 50" stroke="#3b82f6" />
  </svg>
);

const MatrixIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeDasharray="2 3"
    className="w-8 h-8"
  >
    <path d="M5 4v16M9 8v12M13 3v13M17 6v14M21 5v10" />
  </svg>
);

const HypnoIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    className="w-8 h-8"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const SpaceIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    className="w-8 h-8"
  >
    <circle cx="12" cy="12" r="5" />
    <ellipse cx="12" cy="12" rx="11" ry="3.5" transform="rotate(-20 12 12)" />
  </svg>
);

const MandalaIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    className="w-8 h-8"
  >
    <path d="M12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9Z" />
    <path d="M12 6a6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6Z" />
    <path d="M12 9a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3Z" />
  </svg>
);

const AcidIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    className="w-8 h-8"
  >
    <circle cx="12" cy="12" r="2" />
    <path d="M12 10a4 4 0 0 0-4-4 M12 14a4 4 0 0 0-3 3 M12 14a4 4 0 0 1 3 3" />
    <circle cx="12" cy="12" r="9" strokeDasharray="4 4" strokeWidth="1" />
  </svg>
);

const KaleidoscopeIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    className="w-8 h-8"
  >
    <path d="M12 2L2 12h20L12 2z" />
    <path d="M12 22L2 12h20L12 22z" />
    <circle cx="12" cy="12" r="3" />
    <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="2 2" />
    <line x1="2" y1="12" x2="22" y2="12" strokeDasharray="2 2" />
  </svg>
);

const VideoSynthIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    className="w-8 h-8"
  >
    <rect x="2" y="3" width="20" height="15" rx="2" />
    <line x1="17" y1="21" x2="7" y2="21" />
    <line x1="12" y1="18" x2="12" y2="21" />
    <line x1="6" y1="8" x2="18" y2="8" strokeDasharray="1 2" />
    <line x1="6" y1="11" x2="18" y2="11" strokeDasharray="1 1" />
  </svg>
);

const AnimationFlowIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    className="w-8 h-8"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const EFFECTS = [
  {
    id: "solid",
    label: "SOLID COLOR",
    icon: (c: string) => (
      <div
        className="w-6 h-6 rounded-full border-2 border-slate-500"
        style={{ backgroundColor: c }}
      ></div>
    ),
    color: "#00b4d8",
    desc: "Single solid color fill",
  },
  {
    id: "clock",
    label: "CLOCK",
    icon: (c: string) => <Clock className="w-8 h-8" color={c} />,
    color: "#38bdf8",
    desc: "Classic clock style effect",
  },
  {
    id: "rainbow",
    label: "RAINBOW",
    icon: (c: string) => <RainbowIcon />,
    color: "#fff",
    desc: "Colorful rainbow animation",
  },
  {
    id: "fire",
    label: "FIRE",
    icon: (c: string) => <Flame className="w-8 h-8" color={c} />,
    color: "#f97316",
    desc: "Realistic fire flicker effect",
  },
  {
    id: "matrix",
    label: "MATRIX",
    icon: (c: string) => <MatrixIcon color={c} />,
    color: "#4ade80",
    desc: "Digital rain matrix effect",
  },
  {
    id: "hypno",
    label: "HYPNO",
    icon: (c: string) => <HypnoIcon color={c} />,
    color: "#a855f7",
    desc: "Hypnotic spiral illusion",
  },
  {
    id: "space",
    label: "SPACE",
    icon: (c: string) => <SpaceIcon color={c} />,
    color: "#ec4899",
    desc: "Deep space visual effect",
  },
  {
    id: "mandala",
    label: "MANDALA",
    icon: (c: string) => <MandalaIcon color={c} />,
    color: "#2dd4bf",
    desc: "Mandala geometric patterns",
  },
  {
    id: "acid",
    label: "ACID",
    icon: (c: string) => <AcidIcon color={c} />,
    color: "#a3e635",
    desc: "Acid trippy effect",
  },
  {
    id: "plasma",
    label: "PLASMA",
    icon: (c: string) => <div className="w-6 h-6 rounded-full border-2 border-[#10b981] animate-pulse"></div>,
    color: "#10b981",
    desc: "Energy plasma field",
  },
  {
    id: "portal",
    label: "PORTAL",
    icon: (c: string) => <div className="w-6 h-6 rounded-full border-2 border-dashed border-[#0ea5e9] animate-[spin_2s_linear_infinite]"></div>,
    color: "#0ea5e9",
    desc: "Hyperspace portal effect",
  },
  {
    id: "dna",
    label: "DNA SPIN",
    icon: (c: string) => <div className="w-6 h-6 rounded-full border border-x-4 border-[#f43f5e] animate-pulse"></div>,
    color: "#f43f5e",
    desc: "Helix double strand",
  },
  {
    id: "mushrooms",
    label: "MUSHROOMS",
    icon: (c: string) => <Ghost className="w-8 h-8" color={c} />,
    color: "#fb7185",
    desc: "Dancing 3D mushrooms",
  },
  {
    id: "alien",
    label: "ALIEN",
    icon: (c: string) => <Smile className="w-8 h-8" color={c} />,
    color: "#86efac",
    desc: "Floating alien head",
  },
  {
    id: "cube3d",
    label: "3D CUBE",
    icon: (c: string) => <Box className="w-8 h-8" color={c} />,
    color: "#60a5fa",
    desc: "Rotating wireframe cube",
  },
  {
    id: "kaleidoscope",
    label: "KALEIDO",
    icon: (c: string) => <KaleidoscopeIcon color={c} />,
    color: "#f43f5e",
    desc: "Symmetric repeating reflections",
  },
  {
    id: "video_synth",
    label: "VIDEO SYN",
    icon: (c: string) => <VideoSynthIcon color={c} />,
    color: "#38bdf8",
    desc: "Retro CRT feedback synthesizer",
  },
  {
    id: "animation_flow",
    label: "ANIME FLOW",
    icon: (c: string) => <AnimationFlowIcon color={c} />,
    color: "#a855f7",
    desc: "Vibrant high-speed vector stream",
  },
  {
    id: "pov_text",
    label: "POV TEXT",
    icon: (c: string) => <Type className="w-8 h-8" color={c} />,
    color: "#fcd34d",
    desc: "Hologram POV text generator",
  },
  {
    id: "logo",
    label: "LOGO",
    icon: (c: string) => <Aperture className="w-8 h-8" color={c} />,
    color: "#00b4d8",
    desc: "System logo projection",
  },
];

function CustomSlider({
  value,
  onChange,
  thumbColor,
  trackColor,
  min = 0,
  max = 255,
  disabled = false,
}: any) {
  return (
    <div className={`relative flex-1 h-8 flex items-center ${disabled ? "opacity-35 pointer-events-none" : ""}`}>
      <div
        className="absolute left-0 right-0 h-1.5 rounded-full"
        style={{ backgroundColor: trackColor }}
      ></div>
      <div
        className="absolute left-0 h-1.5 rounded-full pointer-events-none transition-all"
        style={{
          backgroundColor: thumbColor,
          width: `${((value - min) / (max - min)) * 100}%`,
        }}
      ></div>
      <div
        className="absolute w-5 h-5 rounded-full pointer-events-none shadow-lg -ml-2.5 transition-all"
        style={{
          backgroundColor: thumbColor,
          left: `${((value - min) / (max - min)) * 100}%`,
          filter: disabled ? undefined : `drop-shadow(0 0 8px ${thumbColor})`,
        }}
      ></div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  );
}

function Toggle({ value, onChange, activeColor = "#00b4d8" }: any) {
  return (
    <div
      className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${value ? "" : "bg-slate-700/50"}`}
      style={{ backgroundColor: value ? activeColor : undefined }}
      onClick={() => onChange(!value)}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${value ? "translate-x-6" : "translate-x-0"}`}
      ></div>
    </div>
  );
}

function Stepper({ value, onChange, min = 0, max = 1000 }: any) {
  return (
    <div className="flex items-center gap-2 bg-[#0c0e15] border border-slate-700/50 rounded-lg p-1 px-2 h-[42px] w-[130px]">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="text-slate-400 hover:text-white pb-1 flex-1 text-center text-lg"
      >
        -
      </button>
      <span className="text-white font-medium text-sm w-12 text-center">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="text-slate-400 hover:text-white pb-1 flex-1 text-center text-lg"
      >
        +
      </button>
    </div>
  );
}

function RadioGroup({ options, value, onChange }: any) {
  return (
    <div className="flex bg-[#0c0e15] border border-slate-700/50 rounded-lg overflow-hidden p-1 gap-1 h-[42px] items-center px-1 flex-1">
      {options.map((o: any) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`flex-1 py-1.5 h-full flex items-center justify-center gap-1.5 text-[10px] uppercase font-bold tracking-widest rounded-md transition-all ${value === o.value ? "bg-[#00b4d8]/20 text-[#00b4d8] border border-[#00b4d8]/50" : "text-slate-500 hover:text-slate-300 border border-transparent"}`}
        >
          {o.icon && o.icon} {o.label}
        </button>
      ))}
    </div>
  );
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
  innerRight,
}: any) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] text-slate-400 tracking-wide">{label}</span>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#0c0e15] border border-slate-700/50 rounded-xl h-[46px] px-4 text-sm text-slate-200 focus:outline-none focus:border-[#00b4d8] transition-colors"
        />
        {innerRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {innerRight}
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsRow({ icon, title, subtitle, onClick, rightWidget }: any) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between py-4 border-b border-slate-800/60 hover:bg-slate-800/30 cursor-pointer transition-colors px-4 last:border-0"
    >
      <div className="flex items-center gap-4">
        <div className="text-slate-400">{icon}</div>
        <div className="flex flex-col">
          <span className="text-[13px] text-slate-200 tracking-wide">
            {title}
          </span>
          {subtitle && (
            <span className="text-[10px] text-slate-500 tracking-wider font-medium">
              {subtitle}
            </span>
          )}
        </div>
      </div>
      <div>
        {rightWidget || <ChevronRight className="w-4 h-4 text-slate-600" />}
      </div>
    </div>
  );
}

function HueSlider({ hue, setHue }: any) {
  return (
    <div className="relative w-full h-8 flex items-center">
      <div
        className="absolute inset-x-0 h-1.5 rounded-full"
        style={{
          background:
            "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
        }}
      ></div>
      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={(e) => setHue(Number(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
      />
      <div
        className="absolute w-5 h-5 rounded-full pointer-events-none shadow-lg -ml-2.5 transition-all border-2 border-white"
        style={{
          left: `${(hue / 360) * 100}%`,
          backgroundColor: `hsl(${hue}, 100%, 50%)`,
          boxShadow: `0 0 10px hsl(${hue}, 100%, 50%)`,
        }}
      ></div>
    </div>
  );
}

const staticGraphData = [
  8, 12, 5, 15, 9, 18, 7, 11, 19, 4, 14, 6, 12, 17, 8, 13, 6, 16, 10, 20, 5, 14,
  8, 19, 11, 7, 15, 10, 18, 6, 13, 9, 17, 12, 5, 14, 8, 16, 9, 11, 6, 15, 8,
];
const SyncSvgGraph = () => (
  <div className="mt-6 flex justify-center h-20 items-end overflow-hidden px-2 opacity-80">
    <div
      className="w-full flex items-end justify-between gap-[2px] h-full"
      style={{ filter: "drop-shadow(0 0 6px rgba(34, 197, 94, 0.5))" }}
    >
      {staticGraphData.map((val, i) => (
        <div
          key={i}
          className="bg-[#22c55e] w-1 rounded-sm"
          style={{ height: `${val * 3.5}px` }}
        ></div>
      ))}
    </div>
  </div>
);

const OPTIMAL_SPEEDS: Record<string, { speed: number; label: string; explanation: string }> = {
  solid: { speed: 45, label: "45 RPM (Low)", explanation: "קצב רדיאלי נמוך המאפשר פריסת אור יציבה ונקייה ללא ריצודים של הקרנת גוון אחיד." },
  rainbow: { speed: 110, label: "110 RPM (High)", explanation: "מניפת צבעי הקשת המשתנה דורשת סריקה מהירה ביותר כדי לאחד את מעבר הצבעים המעגלי." },
  fire: { speed: 135, label: "135 RPM (Very High)", explanation: "מהירות רוטור גבוהה מעניקה צפיפות הקרנה המדמה את להבות האש הלוהטות בצורה נפחית." },
  matrix: { speed: 155, label: "155 RPM (Ultra-High)", explanation: "קוד המטריקס הנופל זקוק לסריקה תכופה כדי למנוע זליגת תווי קוד והפרדתם בזמן הנפילה." },
  hypno: { speed: 70, label: "70 RPM (Medium)", explanation: "איזון מדויק בין שינוי עומק הטבעות לבין מהירות סיבוב המונע כאוס ויזואלי של הספירלה." },
  space: { speed: 90, label: "90 RPM (Med-High)", explanation: "מאפשר לכוכבים המשוגרים למרכז ומערכת הטבעות להישמר יציבות ומותאמות לזווית העין." },
  mandala: { speed: 65, label: "65 RPM (Medium)", explanation: "קצב סיבוב מתון המונע מריחת קווים גאומטריים דקים ועדינים התוחמים את צורת המנדלה." },
  acid: { speed: 75, label: "75 RPM (Medium)", explanation: "מהירות זו משלבת קצב ציור פלואידי מעורבל יחד עם תנועה פנימית חלקה של הגוונים." },
  plasma: { speed: 85, label: "85 RPM (Med)", explanation: "תנועת ענני הפלסמה משתלבת נכון ביותר בסיבוב מנוע ממוצע המדמה ערבול גזים משכנע." },
  portal: { speed: 95, label: "95 RPM (Med-High)", explanation: "טבעות הפורטל המתרחבות נפרסות בצורה מעגלית מלאה ללא חורים שחורים בתמיכת רוטור מהיר." },
  dna: { speed: 115, label: "115 RPM (High)", explanation: "סיבוב הסליל הכפול נראה כסוליד תלת-ממדי אמיתי רק בהאצה ממוקדת של זווית ההקרנה." },
  clock: { speed: 55, label: "55 RPM (Low-Med)", explanation: "מספרים יציבים של שעון דיגיטלי ואנלוגי דורשים ייצוב של מיקום המניפה במהירות מתונה." },
  mushrooms: { speed: 60, label: "60 RPM (Low-Med)", explanation: "תנועת פטריות הניאון ורקיעת הנבגים נפרסת בצורה סימטרית אידיאלית בקצב ממוזער." },
  alien: { speed: 65, label: "65 RPM (Medium)", explanation: "שילוב קשר העין של החוצן ואור הניאון המרצד דורש מנוחה מעוגנת בסיבוב יציב." },
  cube3d: { speed: 80, label: "80 RPM (Medium)", explanation: "שומר על קודקודים ישרים וחלקה של פאות הקובייה הווירטואלית בסיבוב עצמי." },
  kaleidoscope: { speed: 125, label: "125 RPM (High)", explanation: "מבנה מראות סימטרי מתפצל דורש מהירות פליטה גדולה כדי לקשור את הפאות הרחבות." },
  video_synth: { speed: 115, label: "115 RPM (High)", explanation: "סימולציית אותות הוידאו ושפופרת ה-CRT דורשת מהירות טיווח וסוויפ תואמים למשוב וידאו." },
  animation_flow: { speed: 105, label: "105 RPM (High)", explanation: "זרימה וקטורית מהירה של קרני חלקיקים תראה מוצקה ביותר בקצב חיתוך ציר מוגבר." },
  pov_text: { speed: 95, label: "95 RPM (Med-High)", explanation: "אותיות טקסט מרחפות נראות כמילה מחוברת ואחידה רק בסריקה מהירה שמונעת הגדרה קטועה." },
  logo: { speed: 70, label: "70 RPM (Medium)", explanation: "מהירות זו משמרת את הפרטים של תמונת המותג ללא עיוות רוחבי וקריעה אנכית." }
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showSplashLogo, setShowSplashLogo] = useState(false);

  useEffect(() => {
    let logoTimer: any;
    let endTimer: any;
    
    if (showSplash) {
      logoTimer = setTimeout(() => {
        setShowSplashLogo(true);
      }, 4000);
      endTimer = setTimeout(() => {
        setShowSplash(false);
      }, 6000);
    }
    
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(endTimer);
    };
  }, [showSplash]);

  const safeSaveLocal = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn("localStorage save failed:", e);
    }
  };

  const safeGetLocal = (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  };

  const safeRemoveLocal = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("localStorage remove failed:", e);
    }
  };

  const [activeTab, setActiveTab] = useState("controller");
  const [subPage, setSubPage] = useState<string | null>(null);
  const [bgImageId, setBgImageId] = useState("galaxy1");

  const [activeEffect, setActiveEffect] = useState(() => safeGetLocal("holospin_activeEffect") || "rainbow");
  const [logoUrl, setLogoUrl] = useState<string | null>(() => safeGetLocal("holospin_logoUrl") || null);
  const [logoRotation, setLogoRotation] = useState<number>(() => {
    const val = Number(safeGetLocal("holospin_logoRotation") || "0");
    return isNaN(val) ? 0 : val;
  });
  const [logoTintColor, setLogoTintColor] = useState<string>(() => safeGetLocal("holospin_logoTintColor") || "#00b4d8");
  const [useLogoTint, setUseLogoTint] = useState<boolean>(() => safeGetLocal("holospin_useLogoTint") === "true");
  const [povText, setPovText] = useState(() => safeGetLocal("holospin_povText") || "POV SYSTEM HOLOSPIN 3D");
  const [povTextAnimation, setPovTextAnimation] = useState<string>(() => safeGetLocal("holospin_povTextAnimation") || "fade");
  const [brightness, setBrightness] = useState(() => {
    const val = Number(safeGetLocal("holospin_brightness") || "150");
    return isNaN(val) ? 150 : val;
  });
  const [motorSpeed, setMotorSpeed] = useState(() => {
    const val = Number(safeGetLocal("holospin_motorSpeed") || "80");
    return isNaN(val) ? 80 : val;
  });
  const [effectSpeedRate, setEffectSpeedRate] = useState<number>(() => {
    const val = Number(safeGetLocal("holospin_effectSpeedRate") || "1.0");
    return isNaN(val) || val === 0 ? 1.0 : val;
  });
  const [effectScale, setEffectScale] = useState<number>(() => {
    const val = Number(safeGetLocal("holospin_effectScale") || "1.0");
    return isNaN(val) || val === 0 ? 1.0 : val;
  });
  const [effectComplexity, setEffectComplexity] = useState<number>(() => {
    const val = Number(safeGetLocal("holospin_effectComplexity") || "8");
    return isNaN(val) ? 8 : val;
  });

  const [showPass, setShowPass] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Connection and Sensor State
  const [isConnected, setIsConnected] = useState(false);
  const [hallPulses, setHallPulses] = useState<number[]>([]);

  // Calibration Flow States
  const [showCalibrateModal, setShowCalibrateModal] = useState(false);
  const [calibrationStage, setCalibrationStage] = useState<"idle" | "requesting" | "calibrating" | "success" | "error">("idle");
  const [deviceStatus, setDeviceStatus] = useState<string>("ready");

  const [isLightMode, setIsLightMode] = useState<boolean>(() => safeGetLocal("isLightMode") === "true");
  const [isSyncSpeedRate, setIsSyncSpeedRate] = useState<boolean>(() => safeGetLocal("isSyncSpeedRate") === "true");
  const [synthVideoUrl, setSynthVideoUrl] = useState<string | null>(() => safeGetLocal("synthVideoUrl") || null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const [presets, setPresets] = useState<Record<string, any>>(() => {
    try {
      const saved = safeGetLocal("holospin_presets");
      return saved ? JSON.parse(saved) : { "1": null, "2": null, "3": null, "4": null };
    } catch {
      return { "1": null, "2": null, "3": null, "4": null };
    }
  });

  const [isApplyingPreset, setIsApplyingPreset] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [discoveredDevices, setDiscoveredDevices] = useState<any[]>([]);
  const [staSSID, setStaSSID] = useState("");
  const [staPass, setStaPass] = useState("");
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setDiscoveredDevices([]);
    
    // Simulate a real network discovery attempt
    // In a production environment, this would call a local discovery API / mDNS
    setTimeout(() => {
      // We no longer populate with hardcoded 'fake' devices.
      // If none are found on the local subnet, the list remains empty.
      setIsScanning(false);
      setToastMessage("סריקת רשת הושלמה. לא נמצאו מכשירים גלויים כרגע.");
    }, 3000);
  };

  const handleConnectToSTA = () => {
    if (!staSSID || !staPass) {
      setToastMessage("אנא הזן שם רשת וסיסמה / Please enter SSID & Pass");
      return;
    }
    setToastMessage(`מתחבר לרשת ${staSSID}... המכשיר יתנתק ממצב AP.`);
    // In real app, this would send an API request to the ESP32
    setTimeout(() => {
       setState(prev => ({
         ...prev,
         wifi: {
           ...prev.wifi,
           mode: "STA",
           ssid: staSSID,
           ip: "192.168.1.x (DHCP)"
         }
       }));
       setToastMessage("התחברת בהצלחה לרשת הביתית! / Successfully connected to LAN!");
    }, 3000);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isLightMode) {
      root.style.setProperty('--bg-app', '#ffffff');
      root.style.setProperty('--bg-panel', '#f8fafc');
      root.style.setProperty('--bg-panel-hover', '#cbd5e1');
      root.style.setProperty('--text-primary', '#0f172a');
      root.style.setProperty('--text-secondary', '#475569');
      root.style.setProperty('--border-color', '#cbd5e1');
      root.style.setProperty('--bg-card', '#ffffff');
      root.style.setProperty('--bg-card-inner', '#f1f5f9');
      root.style.setProperty('--divider-color', '#cbd5e1');
    } else {
      root.style.setProperty('--bg-app', '#000000');
      root.style.setProperty('--bg-panel', '#0c0e15');
      root.style.setProperty('--bg-panel-hover', '#1e293b');
      root.style.setProperty('--text-primary', '#f8fafc');
      root.style.setProperty('--text-secondary', '#94a3b8');
      root.style.setProperty('--border-color', 'rgba(30, 41, 59, 0.8)');
      root.style.setProperty('--bg-card', '#0c0e15');
      root.style.setProperty('--bg-card-inner', '#050608');
      root.style.setProperty('--divider-color', 'rgba(30, 41, 59, 0.5)');
    }
  }, [isLightMode]);

  useEffect(() => {
    if (isSyncSpeedRate) {
      const synVal = Number((motorSpeed / 80).toFixed(2));
      setEffectSpeedRate(synVal);
    }
  }, [motorSpeed, isSyncSpeedRate]);

  // Status polling
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/status");
        if (!res.ok) throw new Error("Status fetch non-ok");
        const data = await res.json();
        setIsConnected(true);
        if (data.pulses) setHallPulses(data.pulses);
        
        if (data.status) {
          setDeviceStatus(data.status);
          if (data.status === "calibrating") {
            setCalibrationStage("calibrating");
            setShowCalibrateModal(true);
          } else if (data.status === "ready" && calibrationStage === "calibrating") {
            setCalibrationStage("success");
          }
        }
      } catch (e) {
        // Expected error when not running on the ESP32.
        // We silence the console to prevent noise.
        setIsConnected(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [calibrationStage]);

  const handleSavePreset = (slotId: string) => {
    const freshPreset = {
      activeEffect,
      motorSpeed,
      brightness,
      effectSpeedRate,
      effectScale,
      effectComplexity,
      logoUrl,
      povText,
      logoRotation,
      logoTintColor,
      useLogoTint,
      povTextAnimation,
      savedAt: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = { ...presets, [slotId]: freshPreset };
    setPresets(updated);
    safeSaveLocal("holospin_presets", JSON.stringify(updated));
  };

  const handleLoadPreset = (slotId: string) => {
    const entry = presets[slotId];
    if (!entry) return;

    setIsApplyingPreset(true);
    setTimeout(() => setIsApplyingPreset(false), 800);

    if (entry.activeEffect) setActiveEffect(entry.activeEffect);
    if (typeof entry.motorSpeed === 'number') setMotorSpeed(entry.motorSpeed);
    if (typeof entry.brightness === 'number') setBrightness(entry.brightness);
    if (typeof entry.effectSpeedRate === 'number' && entry.effectSpeedRate > 0) setEffectSpeedRate(entry.effectSpeedRate);
    if (typeof entry.effectScale === 'number' && entry.effectScale > 0) setEffectScale(entry.effectScale);
    if (typeof entry.effectComplexity === 'number') setEffectComplexity(entry.effectComplexity);
    if (entry.logoUrl !== undefined) setLogoUrl(entry.logoUrl);
    if (entry.povText !== undefined) setPovText(entry.povText);
    if (typeof entry.logoRotation === 'number') setLogoRotation(entry.logoRotation);
    if (entry.logoTintColor) setLogoTintColor(entry.logoTintColor);
    if (entry.useLogoTint !== undefined) setUseLogoTint(entry.useLogoTint);
    if (entry.povTextAnimation) setPovTextAnimation(entry.povTextAnimation);
    setToastMessage(`Profile ${slotId} loaded successfully / פרופיל נטען בהצלחה`);
  };

  const handleDeletePreset = (slotId: string) => {
    if (confirm(`Are you sure you want to delete profile slot ${slotId}?`)) {
      const updated = { ...presets, [slotId]: null };
      setPresets(updated);
      safeSaveLocal("holospin_presets", JSON.stringify(updated));
      setToastMessage(`Profile ${slotId} deleted / פרופיל נמחק בהצלחה`);
    }
  };

  const handleExportPresets = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(presets, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "holospin_presets.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setToastMessage("Presets exported / פרופילים יוצאו בהצלחה");
    } catch {
      alert("שגיאה בייצוא הפרופילים / Error exporting presets");
    }
  };

  const handleImportPresets = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (typeof imported === "object" && imported !== null) {
          const normalized: Record<string, any> = { "1": null, "2": null, "3": null, "4": null };
          for (const key of ["1", "2", "3", "4"]) {
            if (imported[key] !== undefined) {
              normalized[key] = imported[key];
            } else if (presets[key] !== undefined) {
              normalized[key] = presets[key];
            }
          }
          setPresets(normalized);
          safeSaveLocal("holospin_presets", JSON.stringify(normalized));
          setToastMessage("Presets imported successfully! / פרופילים יובאו בהצלחה");
        } else {
          alert("קובץ לא תקין / Invalid presets file format.");
        }
      } catch (err) {
        alert("שגיאה בטעינת הקובץ / Error reading presets file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleStartCalibration = async () => {
    try {
      setCalibrationStage("requesting");
      setShowCalibrateModal(true);
      const res = await fetch("/calibrate", { method: "POST" });
      if (!res.ok) throw new Error("Calibration API failed");
      const data = await res.json();
      if (data.status === "calibrating") {
        setCalibrationStage("calibrating");
      } else {
        setCalibrationStage("error");
      }
    } catch (err) {
      console.error(err);
      setCalibrationStage("error");
    }
  };

  const [state, setState] = useState(() => {
    const defaultState = {
      wifi: {
        enabled: true,
        mode: "AP",
        ssid: "Holospin_POV2",
        pass: "12345678",
        ip: "192.168.4.1",
      },
      led: {
        strips: 2,
        ledsPerStrip: 44,
        pins: "4, 5",
        colorOrder: "GRB",
        chipset: "WS2812B",
        globalBrightness: 255,
        test: false,
        hue: 0,
      },
      motor: {
        pin: 12,
        pwmFreq: "5000 Hz",
        pwmRes: "8 Bit",
        maxSpeed: 255,
        softStart: true,
        direction: "CW",
      },
      pov: {
        totalColumns: 200,
        rotationDir: "CW",
        autoCalibrate: false,
        previewMode: false,
        frames: 200,
      },
      sync: {
        hallSensor: true,
        sensorPin: "GPIO 27",
        triggerMode: "FALLING",
        signalInvert: false,
        quality: "100% PERFECT",
      },
      power: {
        voltageLimit: 24.5,
        currentLimit: 5.0,
        autoOff: false,
        tempWarning: 45,
      },
      advanced: { devMode: false, serialMonitor: false },
      cloudSyncEnabled: false,
      bluetooth: {
        enabled: false,
        name: "Holospin_BLE",
        connected: false,
        discoverable: true,
      },
      storage: {
        mounted: true,
        totalSpace: "32.0 GB",
        usedSpace: "4.2 GB",
        files: [
          { name: "hologram_v1.bin", size: "1.2 MB", type: "system" },
          { name: "galaxy_animation.mov", size: "850 KB", type: "video" },
          { name: "matrix_data.json", size: "12 KB", type: "config" },
        ],
      },
    };
    try {
      const saved = safeGetLocal("holospin_state");
      if (saved) {
        const parsed = JSON.parse(saved) || {};
        const safeParse = (cat: keyof typeof defaultState) => {
          const defaultCat = defaultState[cat];
          const parsedCat = parsed[cat];
          if (typeof defaultCat === "object" && defaultCat !== null) {
            return { ...defaultCat, ...(parsedCat || {}) };
          }
          return parsedCat !== undefined ? parsedCat : defaultCat;
        };
        
        return {
          ...defaultState,
          ...parsed,
          wifi: safeParse("wifi"),
          led: safeParse("led"),
          motor: safeParse("motor"),
          pov: safeParse("pov"),
          sync: safeParse("sync"),
          power: safeParse("power"),
          advanced: safeParse("advanced"),
          bluetooth: safeParse("bluetooth"),
          storage: safeParse("storage"),
        };
      }
    } catch (e) {
      console.error("Failed to load local state", e);
    }
    return defaultState;
  });

  const updateState = (cat: string, key: string, val: any) => {
    setState((p) => ({ ...p, [cat]: { ...(p as any)[cat], [key]: val } }));
  };

  const renderHeader = () => {
    if (subPage) {
      return (
        <header className="flex items-center justify-between px-5 pt-8 pb-4 relative z-20">
          <button
            onClick={() => setSubPage(null)}
            className="text-slate-400 hover:text-white transition w-8 flex items-center"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <div className="text-[26px] font-black tracking-[0.1em] flex leading-none">
                <span className="text-[#00b4d8]">HOLO</span>
                <span className="text-[#a855f7]">SPIN</span>
              </div>
              <div
                className={`w-2 h-2 rounded-full ${isConnected ? "bg-[#22c55e] shadow-[0_0_8px_#22c55e]" : "bg-red-500 shadow-[0_0_8px_#ef4444]"} transition-colors my-auto mt-2`}
              ></div>
            </div>
            <div className="text-[8px] text-slate-400 font-bold tracking-[0.15em] mt-1 relative left-[-4px]">
              POV HOLOGRAPHIC SYSTEM
            </div>
          </div>
          <div className="flex flex-col items-center pt-1 w-8">
            <Wifi className="w-5 h-5 text-slate-400" />
            <div className="flex items-center gap-1 mt-1">
              <div className="w-[5px] h-[5px] bg-[#00ff2a] rounded-full shadow-[0_0_5px_#00ff2a]"></div>
              <span className="text-[6px] text-[#00ff2a] font-bold tracking-widest hidden sm:block">
                CONNECTED
              </span>
            </div>
          </div>
        </header>
      );
    }

    return (
      <header className="flex justify-between items-center px-5 pt-8 pb-4 relative z-20">
        <button
          className="text-slate-500 hover:text-white transition w-8"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-7 h-7" />
        </button>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="text-[26px] font-black tracking-[0.1em] flex leading-none">
              <span className="text-[#00b4d8]">HOLO</span>
              <span className="text-[#a855f7]">SPIN</span>
            </div>
            <div
              className={`w-2 h-2 rounded-full ${isConnected ? "bg-[#22c55e] shadow-[0_0_8px_#22c55e]" : "bg-red-500 shadow-[0_0_8px_#ef4444]"} transition-colors my-auto mt-2`}
            ></div>
          </div>
          <div className="text-[8px] text-slate-400 font-bold tracking-[0.15em] mt-1 relative left-[-4px]">
            POV HOLOGRAPHIC SYSTEM
          </div>
        </div>
        <div className="flex flex-col items-center pt-1 w-8">
          <Wifi className="w-5 h-5 text-slate-400" />
          <div className="flex items-center gap-1 mt-1">
            <div className="w-[5px] h-[5px] bg-[#00ff2a] rounded-full shadow-[0_0_5px_#00ff2a]"></div>
            <span className="text-[6px] text-[#00ff2a] font-bold tracking-widest hidden sm:block">
              CONNECTED
            </span>
          </div>
        </div>
      </header>
    );
  };

  const renderContent = () => {
    if (subPage === "wifi") {
      return (
        <div className="px-5 pt-2 pb-28 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-[-10px]">
            WIFI SETTINGS
          </h3>
          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 flex items-center justify-between">
            <span className="text-[13px] text-slate-200 tracking-wide">
              WiFi Enabled
            </span>
            <Toggle
              value={state.wifi.enabled}
              onChange={(v: any) => updateState("wifi", "enabled", v)}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 tracking-wide">
              Mode
            </span>
            <div className="w-48">
              <RadioGroup
                options={[
                  { label: "AP Mode", value: "AP" },
                  { label: "STA Mode", value: "STA" },
                ]}
                value={state.wifi.mode}
                onChange={(v: any) => updateState("wifi", "mode", v)}
              />
            </div>
          </div>

          <InputField
            label="SSID"
            value={state.wifi.ssid}
            onChange={(v: any) => updateState("wifi", "ssid", v)}
          />
          <InputField
            label="Password"
            type={showPass ? "text" : "password"}
            value={state.wifi.pass}
            onChange={(v: any) => updateState("wifi", "pass", v)}
            innerRight={
              <button
                onClick={() => setShowPass(!showPass)}
                className="text-slate-500 focus:outline-none"
              >
                {showPass ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            }
          />
          <InputField
            label="IP Address"
            value={state.wifi.ip}
            onChange={(v: any) => updateState("wifi", "ip", v)}
          />

          <button
            onClick={() => {
              safeSaveLocal("holospin_state", JSON.stringify(state));
              setToastMessage("WiFi Profile updated & confirmed! / הגדרות ה-WiFi נשמרו בהצלחה!");
            }}
            className="w-full bg-[#00b4d8] hover:bg-[#0096b4] text-white py-4 rounded-xl text-[11px] font-bold tracking-widest uppercase mt-2 shadow-[0_0_15px_rgba(0,180,216,0.25)] transition cursor-pointer active:scale-95"
          >
            CONFIRM & SAVE SETTINGS
          </button>

          <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mt-2">
            CONNECTED DEVICES
          </h3>
          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-slate-800/50 text-[13px] text-slate-300">
              192.168.4.2 <ChevronRight className="w-4 h-4 text-slate-600" />
            </div>
            <div className="flex justify-between items-center p-4 text-[13px] text-slate-300">
              192.168.4.3 <ChevronRight className="w-4 h-4 text-slate-600" />
            </div>
          </div>
        </div>
      );
    }

    if (subPage === "led") {
      return (
        <div className="px-5 pt-2 pb-28 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-[-10px]">
            LED SETTINGS
          </h3>
          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 flex items-center justify-between">
            <span className="text-[13px] text-slate-200 tracking-wide">
              Strips Count
            </span>
            <Stepper
              value={state.led.strips}
              onChange={(v: any) => updateState("led", "strips", v)}
              max={10}
            />
          </div>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 flex items-center justify-between">
            <span className="text-[13px] text-slate-200 tracking-wide">
              LEDs per Strip
            </span>
            <Stepper
              value={state.led.ledsPerStrip}
              onChange={(v: any) => updateState("led", "ledsPerStrip", v)}
              max={500}
            />
          </div>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 flex items-center justify-between">
            <span className="text-[13px] text-slate-200 tracking-wide">
              LED Pins (comma separated)
            </span>
            <input
              type="text"
              className="bg-transparent text-right text-slate-300 font-medium focus:outline-none w-[100px]"
              value={state.led.pins}
              onChange={(e) => updateState("led", "pins", e.target.value)}
              placeholder="e.g. 4, 5"
            />
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] text-slate-400 tracking-wide">
              Color Order
            </span>
            <RadioGroup
              options={[
                { label: "GRB", value: "GRB" },
                { label: "RGB", value: "RGB" },
                { label: "BRG", value: "BRG" },
              ]}
              value={state.led.colorOrder}
              onChange={(v: any) => updateState("led", "colorOrder", v)}
            />
          </div>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-2 flex items-center justify-between pr-4">
            <span className="text-[13px] text-slate-200 tracking-wide pl-3">
              Chipset
            </span>
            <select
              className="bg-transparent text-sm font-medium text-slate-300 focus:outline-none appearance-none h-10 px-4 text-right"
              value={state.led.chipset}
              onChange={(e) => updateState("led", "chipset", e.target.value)}
            >
              <option>WS2812B</option>
              <option>APA102</option>
              <option>SK6812</option>
            </select>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <span className="text-[11px] text-slate-400 tracking-wide">
              Global Brightness Limit
            </span>
            <div className="flex items-center gap-4 px-2">
              <CustomSlider
                value={state.led.globalBrightness}
                onChange={(v: any) => updateState("led", "globalBrightness", v)}
                thumbColor="#38bdf8"
                trackColor="#1e293b"
              />
              <span className="text-white font-mono text-sm w-8">
                {state.led.globalBrightness}
              </span>
            </div>
          </div>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 flex items-center justify-between mt-2">
            <span className="text-[13px] text-slate-200 tracking-wide">
              LED Test
            </span>
            <Toggle
              value={state.led.test}
              activeColor="#38bdf8"
              onChange={(v: any) => updateState("led", "test", v)}
            />
          </div>

          <button
            onClick={() => {
              safeSaveLocal("holospin_state", JSON.stringify(state));
              setToastMessage("LED Settings confirmed & applied! / הגדרות פינים ולדים נשמרו בהצלחה!");
            }}
            className="w-full bg-[#00b4d8] hover:bg-[#0096b4] text-white py-4 rounded-xl text-[11px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,180,216,0.25)] transition mt-2 cursor-pointer active:scale-95"
          >
            CONFIRM LED PARAMETERS
          </button>
        </div>
      );
    }

    if (subPage === "motor") {
      return (
        <div className="px-5 pt-2 pb-28 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-[-10px]">
            MOTOR SETTINGS
          </h3>

          <div className="flex justify-between items-center border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-4">
            <span className="text-[13px] text-slate-200 tracking-wide">
              Motor Control Pin
            </span>
            <input
              type="text"
              className="bg-transparent font-medium text-slate-300 text-right focus:outline-none w-[60px]"
              value={state.motor.pin}
              onChange={(e) => updateState("motor", "pin", e.target.value)}
              placeholder="e.g. 12"
            />
          </div>

          <div className="flex justify-between items-center border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-4">
            <span className="text-[13px] text-slate-200 tracking-wide">
              PWM Frequency
            </span>
            <select
              className="bg-transparent font-medium text-slate-300 text-right focus:outline-none"
              value={state.motor.pwmFreq}
              onChange={(e) => updateState("motor", "pwmFreq", e.target.value)}
            >
              <option>5000 Hz</option>
              <option>10000 Hz</option>
            </select>
          </div>

          <div className="flex justify-between items-center border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-4">
            <span className="text-[13px] text-slate-200 tracking-wide">
              PWM Resolution
            </span>
            <select
              className="bg-transparent font-medium text-slate-300 text-right focus:outline-none"
              value={state.motor.pwmRes}
              onChange={(e) => updateState("motor", "pwmRes", e.target.value)}
            >
              <option>8 Bit</option>
              <option>10 Bit</option>
            </select>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[11px] text-slate-400 tracking-wide">
              Max Speed Limit
            </span>
            <div className="flex items-center gap-4 px-2">
              <CustomSlider
                value={state.motor.maxSpeed}
                onChange={(v: any) => updateState("motor", "maxSpeed", v)}
                thumbColor="#2dd4bf"
                trackColor="#1e293b"
              />
              <span className="text-white font-mono text-sm w-8">
                {state.motor.maxSpeed}
              </span>
            </div>
          </div>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 flex items-center justify-between">
            <span className="text-[13px] text-slate-200 tracking-wide">
              Soft Start
            </span>
            <Toggle
              value={state.motor.softStart}
              activeColor="#38bdf8"
              onChange={(v: any) => updateState("motor", "softStart", v)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] text-slate-400 tracking-wide">
              Direction
            </span>
            <RadioGroup
              options={[
                { label: "CW", value: "CW" },
                { label: "CCW", value: "CCW" },
              ]}
              value={state.motor.direction}
              onChange={(v: any) => updateState("motor", "direction", v)}
            />
          </div>

          <button
            onClick={() => {
              safeSaveLocal("holospin_state", JSON.stringify(state));
              setToastMessage("Motor Settings confirmed & saved! / הגדרות המנוע נשמרו בהצלחה!");
            }}
            className="w-full bg-[#00b4d8] hover:bg-[#0096b4] text-white py-4 rounded-xl text-[11px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,180,216,0.25)] transition mt-4 cursor-pointer active:scale-95"
          >
            CONFIRM MOTOR PARAMETERS
          </button>
        </div>
      );
    }

    if (subPage === "pov") {
      return (
        <div className="px-5 pt-2 pb-28 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-[-10px]">
            POV SETTINGS
          </h3>
          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-4 flex items-center justify-between">
            <span className="text-[13px] text-slate-200 tracking-wide">
              Total Columns
            </span>
            <Stepper
              value={state.pov.totalColumns}
              onChange={(v: any) => updateState("pov", "totalColumns", v)}
              max={1000}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 tracking-wide">
              Rotation Direction
            </span>
            <div className="w-[180px]">
              <RadioGroup
                options={[
                  { label: "CW", value: "CW" },
                  { label: "CCW", value: "CCW" },
                ]}
                value={state.pov.rotationDir}
                onChange={(v: any) => updateState("pov", "rotationDir", v)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800/50 pb-6 pt-2">
            <span className="text-[13px] text-slate-200 tracking-wide pl-1">
              Auto Calibrate
            </span>
            <button
              onClick={handleStartCalibration}
              className="bg-[#6366f1] px-6 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:bg-[#4f46e5] transition w-[130px] h-[40px]"
            >
              CALIBRATE
            </button>
          </div>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 flex items-center justify-between">
            <span className="text-[13px] text-slate-200 tracking-wide">
              Preview Mode
            </span>
            <Toggle
              value={state.pov.previewMode}
              activeColor="#64748b"
              onChange={(v: any) => updateState("pov", "previewMode", v)}
            />
          </div>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-4 flex items-center justify-between">
            <span className="text-[13px] text-slate-200 tracking-wide">
              Frames Per Rotation
            </span>
            <Stepper
              value={state.pov.frames}
              onChange={(v: any) => updateState("pov", "frames", v)}
              max={1000}
            />
          </div>

          <button
            onClick={() => {
              safeSaveLocal("holospin_state", JSON.stringify(state));
              setToastMessage("POV Settings confirmed & applied! / הגדרות גיאומטריית POV נשמרו בהצלחה!");
            }}
            className="w-full bg-[#00b4d8] hover:bg-[#0096b4] text-white py-4 rounded-xl text-[11px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,180,216,0.25)] transition mt-2 cursor-pointer active:scale-95"
          >
            CONFIRM POV GEOMETRY
          </button>
        </div>
      );
    }

    if (subPage === "sync") {
      return (
        <div className="px-5 pt-2 pb-28 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-[-10px]">
            SYNC & SENSOR
          </h3>
          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 flex items-center justify-between">
            <span className="text-[13px] text-slate-200 tracking-wide">
              Hall Sensor
            </span>
            <Toggle
              value={state.sync.hallSensor}
              onChange={(v: any) => updateState("sync", "hallSensor", v)}
            />
          </div>

          <div className="flex justify-between items-center border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-4">
            <span className="text-[13px] text-slate-200 tracking-wide">
              Sensor Pin
            </span>
            <input
              type="text"
              className="bg-transparent font-medium text-slate-300 text-right focus:outline-none w-[60px]"
              value={state.sync.sensorPin}
              onChange={(e) => updateState("sync", "sensorPin", e.target.value)}
              placeholder="e.g. 14"
            />
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-[11px] text-slate-400 tracking-wide">
              Trigger Mode
            </span>
            <div className="w-[60%]">
              <RadioGroup
                options={[
                  { label: "FALLING", value: "FALLING" },
                  { label: "RISING", value: "RISING" },
                ]}
                value={state.sync.triggerMode}
                onChange={(v: any) => updateState("sync", "triggerMode", v)}
              />
            </div>
          </div>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 flex items-center justify-between">
            <span className="text-[13px] text-slate-200 tracking-wide">
              Signal Invert
            </span>
            <Toggle
              value={state.sync.signalInvert}
              activeColor="#64748b"
              onChange={(v: any) => updateState("sync", "signalInvert", v)}
            />
          </div>

          <div className="flex justify-between items-center px-1 mb-2 mt-2">
            <span className="text-[13px] text-slate-200 tracking-wide">
              Sync Quality
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[20px] font-medium text-[#22c55e] leading-none">
                100%
              </span>
              <span className="text-[10px] text-[#22c55e] font-bold tracking-widest uppercase leading-none mt-1">
                PERFECT
              </span>
            </div>
          </div>

          <SyncSvgGraph />

          <button
            onClick={() => {
              safeSaveLocal("holospin_state", JSON.stringify(state));
              setToastMessage("Sync & Sensor parameters confirmed! / הגדרות הסינכרון נשמרו בהצלחה!");
            }}
            className="w-full bg-[#00b4d8] hover:bg-[#0096b4] text-white py-4 rounded-xl text-[11px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,180,216,0.25)] transition mt-2 cursor-pointer active:scale-95"
          >
            CONFIRM SYNC SETTINGS
          </button>
        </div>
      );
    }

    if (subPage === "firmware") {
      const pinsArray = state.led.pins
        .split(",")
        .map((p: string) => p.trim())
        .filter(Boolean);
      const featureName =
        "Neo" +
        state.led.colorOrder.charAt(0).toUpperCase() +
        state.led.colorOrder.substr(1).toLowerCase() +
        "Feature";

      const headerCode = `// Config.h
#pragma once

#define PIXEL_COUNT ${state.led.ledsPerStrip}

// LED STRIP PINS
${pinsArray.map((pin: string, i: number) => `#define PIN_STRIP${i + 1} ${pin}`).join("\n")}

// PINS
#define HALL_PIN ${state.sync.sensorPin}
#define MOTOR_PIN ${state.motor.pin}

// WIFI
#define AP_SSID "${state.wifi.ssid}"
#define AP_PASS "${state.wifi.pass}"
#define ROUTER_SSID "YOUR_ROUTER_SSID" // Update with your router's SSID
#define ROUTER_PASS "YOUR_ROUTER_PASS" // Update with your router's Password
`;

      const inoCode = `#include <WiFi.h>
#include <AsyncTCP.h>
#include <WebServer.h>
#include <ElegantOTA.h>
#include <NeoPixelBus.h>
#include <ArduinoJson.h>
#include "Config.h"

// =====================================================
// LED STRIPS
// =====================================================

${pinsArray.map((pin: string, i: number) => `NeoPixelBus<${featureName}, NeoEsp32Rmt${i}Ws2812xMethod>\n    strip${i + 1}(PIXEL_COUNT, PIN_STRIP${i + 1});`).join("\n\n")}

// =====================================================
// SERVER
// =====================================================

WebServer server(80);

// =====================================================
// GLOBALS
// =====================================================

bool ledState = false;

// =====================================================
// WEB TASK
// =====================================================

void webloop(void *pvParameters)
{
    for (;;)
    {
        server.handleClient();
        vTaskDelay(1);
    }
}

// =====================================================
// SETUP
// =====================================================

void setup()
{
    Serial.begin(115200);
    delay(2000);

    Serial.println();
    Serial.println("BOOT OK");

    pinMode(HALL_PIN, INPUT);
    pinMode(MOTOR_PIN, OUTPUT); // Motor Pin Setup

    // =================================================
    // LEDS
    // =================================================

${pinsArray.map((pin: string, i: number) => `    strip${i + 1}.Begin();\n    strip${i + 1}.Show();`).join("\n\n")}

    Serial.println("LED INIT OK");

    // =================================================
    // WIFI
    // =================================================

    WiFi.mode(WIFI_AP_STA);
    Serial.println("Starting WiFi...");

    // HOTSPOT
    bool ap = WiFi.softAP(AP_SSID, AP_PASS);

    if (ap)
    {
        Serial.println("AP STARTED");
        Serial.print("AP IP: ");
        Serial.println(WiFi.softAPIP());
    }
    else
    {
        Serial.println("AP FAILED");
    }

    // ROUTER CONNECTION
    WiFi.begin(ROUTER_SSID, ROUTER_PASS);

    Serial.print("Connecting to router");
    unsigned long startAttempt = millis();

    while (WiFi.status() != WL_CONNECTED &&
           millis() - startAttempt < 10000)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println();

    if (WiFi.status() == WL_CONNECTED)
    {
        Serial.println("ROUTER CONNECTED");
        Serial.print("ROUTER IP: ");
        Serial.println(WiFi.localIP());
    }
    else
    {
        Serial.println("ROUTER FAILED");
    }

    // =================================================
    // WEB SERVER
    // =================================================

    server.on("/", []()
              {
        server.send(
            200,
            "text/html",
            "<html>\\
            <head>\\
            <title>Holospin ESP32</title>\\
            <style>\\
            body{background:#111;color:white;text-align:center;font-family:Arial;}\\
            button{width:200px;height:60px;font-size:22px;border-radius:15px;border:none;background:#00ccff;color:black;margin-top:40px;}\\
            </style>\\
            </head>\\
            <body>\\
            <h1>Holospin ESP32</h1>\\
            <button onclick=\"fetch('/toggle').catch(e => console.error(e))\">Toggle LEDs</button>\\
            </body>\\
            </html>");
    });

    server.on("/toggle", []()
              {
        ledState = !ledState;

        if (ledState)
        {
            for (int i = 0; i < PIXEL_COUNT; i++)
            {
${pinsArray.map((pin: string, i: number) => `                strip${i + 1}.SetPixelColor(i, RgbColor(255, 0, 0));`).join("\n")}
            }
        }
        else
        {
${pinsArray.map((pin: string, i: number) => `            strip${i + 1}.ClearTo(RgbColor(0));`).join("\n")}
        }

${pinsArray.map((pin: string, i: number) => `        strip${i + 1}.Show();`).join("\n")}
        server.send(200, "text/plain", "OK"); });

    ElegantOTA.begin(&server);
    server.begin();

    Serial.println("HTTP SERVER STARTED");

    // =================================================
    // TASK
    // =================================================

    xTaskCreatePinnedToCore(
        webloop,
        "webloop",
        4000,
        NULL,
        1,
        NULL,
        0);

    Serial.println("SETUP DONE");
}

// =====================================================
// LOOP
// =====================================================

void loop()
{
    static unsigned long lastBlink = 0;

    if (millis() - lastBlink > 1000)
    {
        lastBlink = millis();
        Serial.println("RUNNING");
    }

    delay(10);
}`;

      const downloadFile = (filename: string, content: string) => {
        const element = document.createElement("a");
        const file = new Blob([content], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element);
      };

      const copyToClipboard = async (content: string) => {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(content);
            setToastMessage("Copied to clipboard / הועתק ללוח");
          } else {
            throw new Error("Clipboard API not available");
          }
        } catch (err) {
          console.error("Clipboard copy failed", err);
          // Fallback for older browsers if needed
          const textArea = document.createElement("textarea");
          textArea.value = content;
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand('copy');
            setToastMessage("Copied to clipboard / הועתק ללוח");
          } catch (e) {
            alert("Could not copy to clipboard. Please copy manually.");
          }
          document.body.removeChild(textArea);
        }
      };

      return (
        <div className="px-5 pt-2 pb-28 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-[-10px]">
            FIRMWARE SETUP
          </h3>
          <p className="text-[13px] text-slate-400">
            Download or copy the generated .ino and .h files for your setup to
            flash to your board.
          </p>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] flex flex-col pt-4 overflow-hidden">
            <div className="px-4 flex justify-between items-center mb-2">
              <span className="text-[#a855f7] font-bold text-sm">Config.h</span>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(headerCode)}
                  className="text-slate-400 hover:text-white transition p-1"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={() => downloadFile("Config.h", headerCode)}
                  className="text-slate-400 hover:text-white transition p-1"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="bg-[#050608] p-4 overflow-x-auto text-xs font-mono text-slate-300 border-t border-slate-800/80">
              <pre>{headerCode}</pre>
            </div>
          </div>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] flex flex-col pt-4 overflow-hidden">
            <div className="px-4 flex justify-between items-center mb-2">
              <span className="text-[#38bdf8] font-bold text-sm">main.ino</span>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(inoCode)}
                  className="text-slate-400 hover:text-white transition p-1"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={() => downloadFile("main.ino", inoCode)}
                  className="text-slate-400 hover:text-white transition p-1"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="bg-[#050608] p-4 overflow-x-auto text-xs font-mono text-slate-300 border-t border-slate-800/80">
              <pre>{inoCode}</pre>
            </div>
          </div>

          {/* Guide Card */}
          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <SlidersHorizontal className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                מדריך הגדרת סביבת פיתוח / ESP32 POV SETUP GUIDE
              </h3>
            </div>
            <div className="text-xs text-slate-300 space-y-3 font-sans leading-relaxed">
              <div>
                <strong className="text-[#00b4d8]">1. הורדת תוכנות פיתוח / Arduino IDE:</strong>
                <p className="text-slate-400 text-[10.5px]">הורד והתקן את הגרסה העדכנית ביותר של תוכנת <span className="font-semibold text-white">Arduino IDE 2.x</span> מאתר הרשמי.</p>
              </div>
              
              <div>
                <strong className="text-[#00b4d8]">2. תמיכה בלוח הברזל / Install ESP32 Board Core:</strong>
                <p className="text-slate-400 text-[10.5px]">
                  כנס לתפריט Preferences ב-IDE, והדבק את כתובת הנהלים הבאה:
                  <code className="block bg-[#050608] p-1.5 rounded border border-slate-900 overflow-x-auto text-pink-400 text-[10px] my-1 font-mono">
                    https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
                  </code>
                  פתח את Boards Manager (Ctrl+Shift+B), חפש <span className="text-white">esp32</span> מאת Espressif ובצע התקנה (Install).
                </p>
              </div>

              <div>
                <strong className="text-[#a855f7]">3. התקנת ספריות נדרשות / Required Libraries:</strong>
                <p className="text-slate-400 text-[10.5px]">
                  עבור אל Library Manager (Ctrl+Shift+I), חפש והתקן את הספריות הבאות:
                </p>
                <ul className="list-disc pl-5 text-[10.5px] text-slate-400 space-y-0.5 mt-1">
                  <li><span className="text-white font-mono">ArduinoJson</span> (by Benoit Blanchon) — לניהול פקודות ה-JSON</li>
                  <li><span className="text-white font-mono">NeoPixelBus</span> (by Makuna) — לנהיגת הלדים המהירה DMA/RMT</li>
                  <li><span className="text-white font-mono">ElegantOTA</span> — לעדכונים אלחוטיים באמצעות רשת Wi-Fi</li>
                  <li><span className="text-white font-mono">ESPAsyncWebServer</span> & <span className="text-white font-mono">AsyncTCP</span> — לשרת אינטרנט מהיר ואי-סינכרוני</li>
                </ul>
              </div>

              <div className="border-t border-slate-800/50 pt-2 text-[10.5px] text-slate-400">
                <strong className="text-[#22c55e]">4. העלאת הקוד למכשיר / Compile & Flash:</strong>
                <p className="mt-1">
                  בחר את הלוח הנכון: <span className="text-white">ESP32 Dev Module</span>, בחר את ה-Port (חיבור ה-USB), ולחץ על כפתור ה-Upload (חץ)!
                  אם החיבור קורס עם שגיאת Connection Time, החזק לחוץ את כפתור ה-BOOT הפיזי על ה-ESP32 עד לתחילת אחוזי הטעינה.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (subPage === "power") {
      return (
        <div className="px-5 pt-2 pb-28 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-[-10px]">
            POWER SETTINGS
          </h3>

          <div className="flex flex-col gap-4">
            <span className="text-[11px] text-slate-400 tracking-wide">
              Voltage Limit
            </span>
            <div className="flex items-center gap-4 px-2 bg-[#0c0e15] border border-slate-800/80 rounded-2xl p-4">
              <Zap className="w-5 h-5 text-[#a855f7]" />
              <CustomSlider
                value={state.power.voltageLimit}
                onChange={(v: any) => updateState("power", "voltageLimit", v)}
                min={0}
                max={30}
                thumbColor="#a855f7"
                trackColor="#1e293b"
              />
              <span className="text-white font-mono text-sm w-10 text-right">
                {state.power.voltageLimit}V
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[11px] text-slate-400 tracking-wide">
              Current Limit
            </span>
            <div className="flex items-center gap-4 px-2 bg-[#0c0e15] border border-slate-800/80 rounded-2xl p-4">
              <Power className="w-5 h-5 text-[#38bdf8]" />
              <CustomSlider
                value={state.power.currentLimit}
                onChange={(v: any) => updateState("power", "currentLimit", v)}
                min={0}
                max={10}
                thumbColor="#38bdf8"
                trackColor="#1e293b"
              />
              <span className="text-white font-mono text-sm w-10 text-right">
                {state.power.currentLimit}A
              </span>
            </div>
          </div>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 flex items-center justify-between">
            <span className="text-[13px] text-slate-200 tracking-wide">
              Auto Power Off
            </span>
            <Toggle
              value={state.power.autoOff}
              activeColor="#ef4444"
              onChange={(v: any) => updateState("power", "autoOff", v)}
            />
          </div>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-4 flex items-center justify-between">
            <span className="text-[13px] text-slate-200 tracking-wide">
              Temp Warning (°C)
            </span>
            <Stepper
              value={state.power.tempWarning}
              onChange={(v: any) => updateState("power", "tempWarning", v)}
              min={30}
              max={80}
            />
          </div>

          <button
            onClick={() => {
              safeSaveLocal("holospin_state", JSON.stringify(state));
              setToastMessage("Power limits and thresholds confirmed! / הגדרות ההספק נשמרו בהצלחה!");
            }}
            className="w-full bg-[#00b4d8] hover:bg-[#0096b4] text-white py-4 rounded-xl text-[11px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,180,216,0.25)] transition mt-2 cursor-pointer active:scale-95"
          >
            CONFIRM POWER LIMITS
          </button>
        </div>
      );
    }

    if (subPage === "save_load") {
      const PRESET_CATEGORIES = [
        { id: 'cat1', name: 'NIGHTLIFE & VIBE', slots: ["1", "2"] },
        { id: 'cat2', name: 'SHOWROOM & PROMO', slots: ["3", "4"] }
      ];

      return (
        <div className="px-5 pt-2 pb-28 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 font-sans">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-1">
                  SAVE / LOAD PROFILE PRESETS
                </h3>
                <span className="text-[9px] text-slate-500 font-medium tracking-tight">MANAGE & SYNC CONFIGURATIONS</span>
              </div>
              
              <div 
                onClick={() => {
                  const newState = !state.cloudSyncEnabled;
                  setState(prev => ({ ...prev, cloudSyncEnabled: newState }));
                  setToastMessage(newState ? "סנכרון ענן הופעל! הפרופילים מגובים כעת. / Cloud Sync Active!" : "סנכרון ענן הופסק. / Cloud Sync Disabled.");
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer select-none ${state.cloudSyncEnabled ? 'bg-[#a855f7]/10 border-[#a855f7]/40 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'bg-slate-900 border-slate-800'}`}
              >
                <CloudLightning className={`w-3.5 h-3.5 ${state.cloudSyncEnabled ? 'text-[#a855f7] animate-pulse' : 'text-slate-600'}`} />
                <span className={`text-[9px] font-black tracking-tighter uppercase ${state.cloudSyncEnabled ? 'text-slate-100' : 'text-slate-500'}`}>
                  {state.cloudSyncEnabled ? 'Sync: ON' : 'Sync: OFF'}
                </span>
                <div className={`w-6 h-3 rounded-full relative transition-colors ${state.cloudSyncEnabled ? 'bg-[#a855f7]' : 'bg-slate-700'}`}>
                  <div className={`absolute top-0.5 w-2 h-2 rounded-full bg-white transition-all ${state.cloudSyncEnabled ? 'left-3.5' : 'left-0.5'}`}></div>
                </div>
              </div>
            </div>

            {state.cloudSyncEnabled && (
               <div className="flex items-center gap-3 p-3 bg-[#a855f7]/5 border border-[#a855f7]/10 rounded-xl animate-in fade-in zoom-in duration-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-ping"></div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    סנכרון פעיל מול HoloCloud / Multi-unit cloud sync active
                  </span>
               </div>
            )}
          </div>

          <div className="flex flex-col gap-8">
            {PRESET_CATEGORIES.map((category) => (
              <div key={category.id} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-1">
                  <div className="h-[1px] flex-1 bg-slate-800/80"></div>
                  <span className="text-[10px] font-black text-slate-600 tracking-widest uppercase whitespace-nowrap">{category.name}</span>
                  <div className="h-[1px] flex-1 bg-slate-800/80"></div>
                </div>

                <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] overflow-hidden flex flex-col divide-y divide-slate-800/50">
                  {category.slots.map((slotId) => {
                    const saved = presets[slotId];
                    return (
                      <div
                        key={slotId}
                        className="flex items-center justify-between py-4 px-4 hover:bg-slate-800/30 transition-all group"
                      >
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-slate-200">פרופיל {slotId} / Slot {slotId}</span>
                          <span className="text-[10px] text-slate-500">
                            {saved ? `Effect: ${saved.activeEffect} (${saved.savedAt})` : 'Slot Empty / ריק'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {saved && (
                            <button
                              onClick={() => handleLoadPreset(slotId)}
                              title="Quick Apply / החל מיידית"
                              className="p-3 border border-emerald-500/30 rounded-xl text-emerald-400/70 hover:text-emerald-400 hover:border-emerald-500 transition-all flex items-center justify-center bg-emerald-500/5 hover:bg-emerald-500/10 hover:scale-110 active:scale-90 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-in fade-in zoom-in duration-300"
                            >
                              <Zap className="w-5 h-5 fill-current" />
                            </button>
                          )}
                          <div className="h-8 w-[1px] bg-slate-800/50 mx-1"></div>
                          <button
                            onClick={() => handleSavePreset(slotId)}
                            title="Save Current State / שמור נוכחי"
                            className="p-3 border border-slate-700 rounded-xl hover:text-sky-400 hover:border-sky-400 text-slate-400 transition-all flex items-center justify-center bg-slate-900/40 hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                          {saved && (
                            <button
                              onClick={() => handleDeletePreset(slotId)}
                              title="Clear / מחק"
                              className="p-3 border border-slate-700 hover:border-rose-500 hover:text-rose-500 text-slate-500 rounded-xl transition-all flex items-center justify-center bg-slate-900/40 hover:scale-105 active:scale-95 cursor-pointer"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Export / Import Section */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] text-slate-400 font-bold tracking-widest uppercase pl-1">
              Backup & Migrate Presets / גיבוי ושחזור פרופילים
            </h4>
            <div className="border border-slate-800/80 rounded-2xl p-4 bg-[#0c0e15] flex flex-col gap-3">
              <span className="text-[10px] text-slate-500 leading-normal">
                ייצא את רשימת פרופילי ההגדרות שלך לקובץ JSON במחשב, או טען קובץ פרופילים קיים כדי לשחזר את כל השמירות שלך במערכת.
              </span>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <button
                  onClick={handleExportPresets}
                  className="py-3 px-4 border border-slate-800 hover:border-sky-500 hover:text-sky-400 rounded-xl text-[10px] font-bold tracking-wider uppercase transition bg-slate-900/40 text-slate-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Download className="w-4 h-4 text-sky-400" /> Export Presets
                </button>
                <label className="py-3 px-4 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 rounded-xl text-[10px] font-bold tracking-wider uppercase transition bg-slate-900/40 text-slate-350 flex items-center justify-center gap-2 cursor-pointer text-center relative active:scale-95">
                  <Upload className="w-4 h-4 text-[#10b981]" /> Import Presets
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportPresets}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </label>
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              if (confirm('Are you sure you want to restore default effects and settings values?')) {
                setPresets({ "1": null, "2": null, "3": null, "4": null });
                safeRemoveLocal("holospin_presets");
                setIsLightMode(false);
                setIsSyncSpeedRate(false);
                safeRemoveLocal("isLightMode");
                safeRemoveLocal("isSyncSpeedRate");
              }
            }}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-xl text-[11px] font-bold tracking-widest uppercase transition border border-slate-700 active:scale-95 cursor-pointer"
          >
            RESET PRESETS & CUSTOM OPTIONS
          </button>
        </div>
      );
    }

    if (subPage === "advanced") {
      return (
        <div className="px-5 pt-2 pb-28 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-[-10px]">
            ADVANCED SETTINGS
          </h3>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 flex items-center justify-between">
            <span className="text-[13px] text-slate-200 tracking-wide">
              Developer Mode
            </span>
            <Toggle
              value={state.advanced.devMode}
              activeColor="#f97316"
              onChange={(v: any) => updateState("advanced", "devMode", v)}
            />
          </div>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 flex flex-col gap-4 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-slate-200 tracking-wide">
                Serial Monitor
              </span>
              <Toggle
                value={state.advanced.serialMonitor}
                activeColor="#3b82f6"
                onChange={(v: any) => updateState("advanced", "serialMonitor", v)}
              />
            </div>
            {state.advanced.serialMonitor && (
              <div className="bg-[#050608] rounded-xl p-3 h-48 overflow-y-auto font-mono text-[10px] text-[#4ade80] border border-slate-800 flex flex-col gap-1 shadow-inner animate-in fade-in slide-in-from-top-2">
                <div className="opacity-50 text-slate-500">Connecting to COM3...</div>
                <div>[10:43:02.102] POV_SYSTEM_BOOT_SEQUENCE_INIT</div>
                <div>[10:43:02.105] MOTOR_CALIBRATION... <span className="text-blue-400">OK</span></div>
                <div>[10:43:02.112] LED_STRIP_INIT (144 LEDs)... <span className="text-blue-400">OK</span></div>
                <div>[10:43:02.155] WIFI_AP_MODE_STARTED (Holospin_POV2)</div>
                <div>[10:43:02.160] WS_SERVER_LISTENING_PORT_81</div>
                <div className="text-blue-400">[10:43:05.332] CLIENT_CONNECTED [192.168.4.2]</div>
                <div>[10:43:10.021] SET_EFFECT: {activeEffect}</div>
                <div>[10:43:12.441] SET_MOTOR_SPEED: {Math.round((motorSpeed / 255) * 100)}%</div>
                <div>[10:43:14.225] SET_BRIGHTNESS: {Math.round((brightness / 255) * 100)}%</div>
                <div className="animate-pulse opacity-70">_</div>
              </div>
            )}
          </div>

          <div className="border border-[#7f1d1d]/30 bg-[#450a0a]/20 p-4 rounded-2xl flex items-start gap-4 mt-2">
            <AlertTriangle className="w-6 h-6 text-[#ef4444] shrink-0" />
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-bold text-[#ef4444]">
                Danger Zone
              </span>
              <span className="text-[10px] text-slate-400 leading-relaxed">
                Modifying advanced settings might cause device instability.
                Proceed with caution.
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              safeSaveLocal("holospin_state", JSON.stringify(state));
              setToastMessage("Advanced settings applied & saved! / הגדרות מתקדמות נשמרו בהצלחה!");
            }}
            className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white py-4 rounded-xl text-[11px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(239,68,68,0.25)] transition mt-2 cursor-pointer active:scale-95"
          >
            CONFIRM ADVANCED SETTINGS
          </button>
        </div>
      );
    }

    if (subPage === "bluetooth") {
      return (
        <div className="px-5 pt-2 pb-28 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase">
              BLUETOOTH CONNECTIVITY / קישוריות בלוטוס
            </h3>
            <span className="text-[10px] text-slate-500">
              נהל חיבור BLE למכשירים ניידים ותקשורת אלחוטית
            </span>
          </div>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[13px] text-slate-200 tracking-wide">
                Bluetooth Enabled
              </span>
              <span className="text-[10px] text-slate-500">פעיל / כבוי</span>
            </div>
            <Toggle
              value={state.bluetooth?.enabled || false}
              activeColor="#60a5fa"
              onChange={(v: boolean) => updateState("bluetooth", "enabled", v)}
            />
          </div>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 flex flex-col gap-4">
            <InputField
              label="Broadcast Name (SSID)"
              value={state.bluetooth?.name || ""}
              onChange={(v: string) => updateState("bluetooth", "name", v)}
            />
            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col">
                <span className="text-[13px] text-slate-200 tracking-wide">
                  Discoverable
                </span>
                <span className="text-[10px] text-slate-500">ניתן לגילוי על ידי מכשירים אחרים</span>
              </div>
              <Toggle
                value={state.bluetooth?.discoverable || false}
                activeColor="#60a5fa"
                onChange={(v: boolean) => updateState("bluetooth", "discoverable", v)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] text-[#60a5fa] font-bold tracking-widest uppercase pl-1">
              PAIRED DEVICES / מכשירים מוצמדים
            </h4>
            <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] overflow-hidden divide-y divide-slate-800/50">
              <div className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-slate-500" />
                  <div className="flex flex-col">
                    <span className="text-[13px] text-slate-200">iPhone 15 Pro</span>
                    <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">Connected</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors cursor-pointer text-slate-500">
                <div className="flex items-center gap-3 opacity-60">
                  <Smartphone className="w-5 h-5" />
                  <div className="flex flex-col">
                    <span className="text-[13px]">Samsung Galaxy S23</span>
                    <span className="text-[10px] uppercase tracking-tighter">Last seen 2 days ago</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              safeSaveLocal("holospin_state", JSON.stringify(state));
              setToastMessage("Bluetooth settings applied! / הגדרות הבלוטוס נשמרו בהצלחה!");
            }}
            className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-4 rounded-xl text-[11px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.25)] transition mt-2 cursor-pointer active:scale-95"
          >
            CONFIRM BLUETOOTH SETTINGS
          </button>
        </div>
      );
    }

    if (subPage === "storage") {
      return (
        <div className="px-5 pt-2 pb-28 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase">
              SD CARD STORAGE / כרטיס זיכרון ואחסון
            </h3>
            <span className="text-[10px] text-slate-500">
              ניהול קבצים מקומיים על גבי כרטיס ה-SD המחובר ל-ESP32
            </span>
          </div>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${state.storage?.mounted ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'}`}>
                  <HardDrive className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-slate-200 font-bold">
                    {state.storage?.mounted ? 'SD Card Mounted' : 'SD Card Not Found'}
                  </span>
                  <span className="text-[10px] text-slate-500 lowercase">
                    {state.storage?.usedSpace || "0.0 GB"} / {state.storage?.totalSpace || "0.0 GB"} used
                  </span>
                </div>
              </div>
              <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '13%' }}></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pr-2">
              <h4 className="text-[10px] text-[#fbbf24] font-bold tracking-widest uppercase pl-1">
                FILES ON DISK / קבצים על הכרטיס
              </h4>
              <button className="text-[10px] text-slate-500 hover:text-white uppercase font-bold flex items-center gap-1">
                 <RefreshCw className="w-3 h-3" /> Refresh
              </button>
            </div>
            
            <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] overflow-hidden divide-y divide-slate-800/50">
              {(state.storage?.files || []).map((file: any, i: number) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors group">
                  <div className="flex items-center gap-3">
                    {file.type === 'video' ? <Video className="w-5 h-5 text-sky-400" /> : <FileText className="w-5 h-5 text-slate-500" />}
                    <div className="flex flex-col">
                      <span className="text-[13px] text-slate-200">{file.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono italic">{file.size}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-white">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-rose-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="p-4 flex items-center justify-center bg-slate-900/30">
                <label className="flex items-center gap-2 text-[11px] font-bold text-sky-400 hover:text-sky-300 cursor-pointer transition-all">
                  <Upload className="w-4 h-4" />
                  UPLOAD FILE TO SD / העלה קובץ לכרטיס
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const newFile = {
                          name: file.name,
                          size: (file.size / 1024).toFixed(0) + " KB",
                          type: file.type.includes("video") ? "video" : "config"
                        };
                        const newFiles = [...(state.storage?.files || []), newFile];
                        updateState("storage", "files", newFiles);
                        setToastMessage(`File ${file.name} uploaded to SD card!`);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="border border-amber-500/10 bg-amber-500/5 p-4 rounded-xl flex gap-3 text-amber-500/70 italic text-[10px]">
            <Info className="w-4 h-4 shrink-0" />
            <p>קבצים המאוחסנים על כרטיס ה-SD ניתנים להרצה במצב Offline ללא חיבור WiFi פעיל.</p>
          </div>
        </div>
      );
    }

    if (subPage === "background") {
      return (
        <div className="px-5 pt-2 pb-28 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-[-10px]">
            BACKGROUND STYLE
          </h3>

          <div className="grid grid-cols-1 gap-4">
            <div
              className={`relative h-28 rounded-2xl border-2 overflow-hidden cursor-pointer flex flex-col justify-end p-4 transition-all ${
                bgImageId === "galaxy1" ? "border-[#2dd4bf] shadow-[0_0_20px_rgba(45,212,191,0.2)]" : "border-slate-800"
              }`}
              onClick={() => setBgImageId("galaxy1")}
            >
              <img src={galaxy1} alt="Galaxy 1" className="absolute inset-0 w-full h-full object-cover z-0 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <span className="relative z-20 font-bold text-white tracking-widest text-[13px]">VIVID NEBULA</span>
            </div>

            <div
              className={`relative h-28 rounded-2xl border-2 overflow-hidden cursor-pointer flex flex-col justify-end p-4 transition-all ${
                bgImageId === "galaxy2" ? "border-[#a855f7] shadow-[0_0_20px_rgba(168,85,247,0.2)]" : "border-slate-800"
              }`}
              onClick={() => setBgImageId("galaxy2")}
            >
              <img src={galaxy2} alt="Galaxy 2" className="absolute inset-0 w-full h-full object-cover z-0 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <span className="relative z-20 font-bold text-white tracking-widest text-[13px]">NEON RAINBOW</span>
            </div>

            <div
              className={`relative h-28 rounded-2xl border-2 overflow-hidden cursor-pointer flex flex-col justify-end p-4 transition-all ${
                bgImageId === "galaxy3" ? "border-[#f97316] shadow-[0_0_20px_rgba(249,115,22,0.2)]" : "border-slate-800"
              }`}
              onClick={() => setBgImageId("galaxy3")}
            >
              <img src={galaxy3} alt="Galaxy 3" className="absolute inset-0 w-full h-full object-cover z-0 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <span className="relative z-20 font-bold text-white tracking-widest text-[13px]">FIERY CORE</span>
            </div>

            <div
              className={`relative h-28 rounded-2xl border-2 overflow-hidden cursor-pointer flex flex-col justify-end p-4 transition-all ${
                bgImageId === "video1" ? "border-[#3b82f6] shadow-[0_0_20px_rgba(59,130,246,0.2)]" : "border-slate-800"
              }`}
              onClick={() => setBgImageId("video1")}
            >
              <video src={video1} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
              <span className="relative z-20 font-bold text-white tracking-widest text-[13px] pointer-events-none">BIG BANG (VIDEO)</span>
            </div>

            <div
              className={`relative h-28 rounded-2xl border-2 overflow-hidden cursor-pointer flex flex-col justify-end p-4 transition-all ${
                bgImageId === "video2" ? "border-[#ec4899] shadow-[0_0_20px_rgba(236,72,153,0.2)]" : "border-slate-800"
              }`}
              onClick={() => setBgImageId("video2")}
            >
              <video src={video2} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
              <span className="relative z-20 font-bold text-white tracking-widest text-[13px] pointer-events-none">GALAXY SPIRAL (VIDEO)</span>
            </div>
          </div>
        </div>
      );
    }

    if (subPage === "media") {
      return (
        <div className="px-5 pt-2 pb-28 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase">
              MEDIA & FILES UPLOADS / העלאת קבצים ומדיה
            </h3>
            <span className="text-[10px] text-slate-500">
              נהל והעלה קבצי תמונות ווידאו עבור המקרן ההולוגרפי
            </span>
          </div>

          {/* Image Upload section */}
          <section className="flex flex-col gap-3">
            <h4 className="text-[10px] text-[#00b4d8] font-bold tracking-widest uppercase pl-1">
              IMAGE UPLOADS (LOGOS / VECTOR STICKERS) / העלאת תמונות ולוגו מחשב
            </h4>
            
            <div className="border border-slate-800/80 rounded-2xl p-5 bg-[#0c0e15] flex flex-col gap-4">
              <div className="text-xs text-slate-300 leading-relaxed">
                באפשרותך להעלות תמונות מותאמות אישית (כמו לוגו, תגיות או סטיקרים). הקוד של המכשיר יעבד את התמונה לפס תצוגה מבוסס POV.
              </div>

              {/* Quick Image Presets */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">בחירה מהירה / Quick Presets:</span>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => setLogoUrl(planetImg)}
                    className={`py-2 px-1 rounded-xl border text-[10px] font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                      logoUrl === planetImg ? "border-[#00b4d8] bg-[#00b4d8]/15" : "border-slate-800 bg-slate-900/40 hover:bg-slate-800"
                    }`}
                  >
                    🪐 <span className="text-[8px] text-slate-300">Planet</span>
                  </button>
                  <button
                    onClick={() => setLogoUrl("preset:smile")}
                    className={`py-2 px-1 rounded-xl border text-[10px] font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                      logoUrl === "preset:smile" ? "border-[#00b4d8] bg-[#00b4d8]/15" : "border-slate-800 bg-slate-900/40 hover:bg-slate-800"
                    }`}
                  >
                    😊 <span className="text-[8px] text-slate-300">Smiley</span>
                  </button>
                  <button
                    onClick={() => setLogoUrl("preset:ghost")}
                    className={`py-2 px-1 rounded-xl border text-[10px] font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                      logoUrl === "preset:ghost" ? "border-[#00b4d8] bg-[#00b4d8]/15" : "border-slate-800 bg-slate-900/40 hover:bg-slate-800"
                    }`}
                  >
                    👻 <span className="text-[8px] text-slate-300">Ghost</span>
                  </button>
                  <button
                    onClick={() => setLogoUrl("preset:aperture")}
                    className={`py-2 px-1 rounded-xl border text-[10px] font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                      logoUrl === "preset:aperture" ? "border-[#00b4d8] bg-[#00b4d8]/15" : "border-slate-800 bg-slate-900/40 hover:bg-slate-800"
                    }`}
                  >
                    💡 <span className="text-[8px] text-slate-300">Aperture</span>
                  </button>
                </div>
              </div>

              {/* Upload Box */}
              <div>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-[#00b4d8] rounded-2xl py-6 px-4 cursor-pointer transition bg-slate-900/30">
                  <Image className="w-8 h-8 text-slate-500 mb-2" />
                  <span className="text-xs font-bold text-slate-300">העלה קובץ תמונה / Select Logo Image</span>
                  <span className="text-[9px] text-slate-500 mt-1">PNG, JPG, SVG are supported. Fits standard resolution.</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setLogoUrl(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Current Active Preview */}
              {logoUrl && (
                <div className="flex items-center justify-between border border-slate-800/80 bg-slate-950/50 rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    {logoUrl.startsWith("data:") || logoUrl.startsWith("blob:") ? (
                      <img src={logoUrl} className="w-10 h-10 object-contain rounded border border-slate-800 bg-black/55" />
                    ) : logoUrl.startsWith("preset:") ? (
                      <div className="w-10 h-10 rounded border border-slate-800 bg-black/55 flex items-center justify-center text-lg">
                        {logoUrl === "preset:smile" ? "😊" : logoUrl === "preset:ghost" ? "👻" : "💡"}
                      </div>
                    ) : (
                      <img src={logoUrl} className="w-10 h-10 object-contain rounded border border-slate-800 bg-black/55" />
                    )}
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-slate-200">לוגו פעיל / Active Image</span>
                      <span className="text-[9px] text-slate-500 truncate max-w-[130px]">
                        {logoUrl.startsWith("data:") ? "Custom Image Upload 🖼️" : logoUrl.split("/").pop()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setLogoUrl(null)}
                    className="text-[9px] font-bold tracking-widest text-rose-500 hover:text-rose-400 uppercase"
                  >
                    CLEAR
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Video Upload section */}
          <section className="flex flex-col gap-3">
            <h4 className="text-[10px] text-[#a855f7] font-bold tracking-widest uppercase pl-1">
              VIDEO UPLOADS (SYNTH ANIMATION LOOPS) / העלאת סרטונים והנפשות
            </h4>
            
            <div className="border border-slate-800/80 rounded-2xl p-5 bg-[#0c0e15] flex flex-col gap-4">
              <div className="text-xs text-slate-300 leading-relaxed">
                העלה לולאת וידאו קצרה. הסירטון יוקרן ויומר בזמן אמת לאפקט סרקולציה הולוגרפי בהתאם למהירות סיבובי מנוע ה-POV.
              </div>

              {/* Video loops presets */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">לולאות מובנות / Factory Loops:</span>
                <div className="grid grid-cols-2 gap-2">
                  {VIDEO_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSynthVideoUrl(preset.url);
                        safeSaveLocal("synthVideoUrl", preset.url);
                      }}
                      className={`py-2.5 px-3 rounded-xl border text-[10px] font-bold tracking-wider transition-all flex flex-col items-center justify-center text-center gap-1 cursor-pointer ${
                        synthVideoUrl === preset.url
                          ? "border-[#00b4d8] bg-[#00b4d8]/15 text-white shadow-[0_0_8px_rgba(0,180,216,0.25)]"
                          : "border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      <span className="text-[10px] font-bold truncate w-full">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Video upload button */}
              <div>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-[#a855f7] rounded-2xl py-6 px-4 cursor-pointer transition bg-slate-900/30">
                  <Video className="w-8 h-8 text-slate-500 mb-2" />
                  <span className="text-xs font-bold text-slate-300">העלה קובץ וידאו / Select Short Video</span>
                  <span className="text-[9px] text-slate-500 mt-1">Supports MP4, WebM, MOV. Playback loops locally.</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const fileUrl = URL.createObjectURL(file);
                        setSynthVideoUrl(fileUrl);
                        safeSaveLocal("synthVideoUrl", fileUrl);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Current Active Preview */}
              {synthVideoUrl && (
                <div className="flex items-center justify-between border border-slate-800/80 bg-slate-950/50 rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded border border-slate-800 bg-black/55 overflow-hidden flex items-center justify-center">
                      <video src={synthVideoUrl} muted autoPlay loop playsInline className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-slate-200">סרטון פעיל / Active Video</span>
                      <span className="text-[9px] text-slate-500 truncate max-w-[130px]">
                        {synthVideoUrl.startsWith("blob:") ? "Custom Video Upload 🎥" : synthVideoUrl.split("/").pop()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSynthVideoUrl(null);
                      safeRemoveLocal("synthVideoUrl");
                    }}
                    className="text-[9px] font-bold tracking-widest text-rose-500 hover:text-rose-400 uppercase"
                  >
                    CLEAR
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Quick Notice Card */}
          <div className="border border-[#0e2a35] rounded-2xl bg-[#091e26] p-4 flex gap-3 text-slate-300">
            <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong className="text-white block mb-0.5">טיפ להקרנה מיטבית:</strong>
              לקבלת תוצאות תלת-ממדיות עמוקות ומרחפות, מומלץ להשתמש בקבצים בעלי רקע שחור (#000000) מוחלט או קבצי PNG בעלי שקיפות (Alpha Channel). רקע כהה לא יאיר את פסי הלדים ויצור אפקט של ריחוף מרשים באוויר.
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "devices") {
      return (
        <div className="flex-1 overflow-y-auto px-5 pb-28 pt-2 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 font-sans">
          <div className="flex flex-col gap-3 mt-4">
            <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-0">
              NETWORK CONFIGURATION / הגדרות רשת
            </h3>
            <div className="border border-slate-800/80 rounded-2xl p-4 bg-[#0c0e15] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-slate-200">WiFi Connection Mode</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Active: {state.wifi.mode} ({state.wifi.mode === "AP" ? "Access Point" : "Station/LAN"})</span>
                </div>
                <div className="flex bg-slate-900 p-1 rounded-lg">
                   <button 
                     onClick={() => setState(prev => ({...prev, wifi: {...prev.wifi, mode: "AP"}}))}
                     className={`px-3 py-1 rounded text-[10px] font-bold transition ${state.wifi.mode === 'AP' ? 'bg-[#38bdf8] text-black shadow-lg' : 'text-slate-500'}`}
                   >AP</button>
                   <button 
                     onClick={() => setState(prev => ({...prev, wifi: {...prev.wifi, mode: "STA"}}))}
                     className={`px-3 py-1 rounded text-[10px] font-bold transition ${state.wifi.mode === 'STA' ? 'bg-[#38bdf8] text-black shadow-lg' : 'text-slate-500'}`}
                   >STA</button>
                </div>
              </div>

              {state.wifi.mode === "STA" && (
                <div className="flex flex-col gap-3 pt-2 border-t border-slate-800/50 animate-in fade-in duration-500">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">WiFi Network Name (SSID)</label>
                    <input 
                      type="text" 
                      value={staSSID}
                      onChange={(e) => setStaSSID(e.target.value)}
                      placeholder="My Home WiFi..."
                      className="bg-[#050608] border border-slate-800 rounded-xl px-4 py-2.5 text-[12px] text-slate-200 focus:outline-none focus:border-[#38bdf8]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Password</label>
                    <input 
                      type="password" 
                      value={staPass}
                      onChange={(e) => setStaPass(e.target.value)}
                      placeholder="••••••••"
                      className="bg-[#050608] border border-slate-800 rounded-xl px-4 py-2.5 text-[12px] text-slate-200 focus:outline-none focus:border-[#38bdf8]"
                    />
                  </div>
                  <button 
                    onClick={handleConnectToSTA}
                    className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-black py-3 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all shadow-lg active:scale-95"
                  >
                    CONNECT & SYNC / התחבר וסנכרן
                  </button>
                </div>
              )}

              {state.wifi.mode === "AP" && (
                <div className="flex items-center gap-3 p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                   <Wifi className="w-5 h-5 text-blue-400" />
                   <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-slate-300">Default AP Active: {state.wifi.ssid}</span>
                      <span className="text-[9px] text-slate-500">Pass: {state.wifi.pass} | IP: {state.wifi.ip}</span>
                   </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-0">
                LAN DISCOVERY / מכשירים ברשת המקומית
              </h3>
              <button 
                onClick={handleScan}
                disabled={isScanning}
                className="text-[10px] font-bold text-[#38bdf8] hover:text-[#0ea5e9] uppercase tracking-widest flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
                {isScanning ? 'SCANNING...' : 'SCAN NOW'}
              </button>
            </div>

            {isScanning && (
              <div className="flex flex-col items-center justify-center py-12 gap-3 border border-dashed border-slate-800 rounded-3xl bg-[#0c0e15]/50 animate-pulse">
                <div className="p-4 bg-[#38bdf8]/10 rounded-full">
                  <Search className="w-8 h-8 text-[#38bdf8]" />
                </div>
                <span className="text-[12px] font-bold text-slate-400 tracking-widest uppercase">מחפש יחידות HoloSpin ברשת...</span>
              </div>
            )}

            {!isScanning && discoveredDevices.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 gap-3 border border-dashed border-slate-800 rounded-3xl bg-[#0c0e15]/30">
                <Monitor className="w-8 h-8 text-slate-800" />
                <span className="text-[12px] font-bold text-slate-600 tracking-widest uppercase text-center px-6">
                  לא נמצאו מכשירים פעילים ברשת.<br/>
                  <span className="text-[10px] font-normal lowercase tracking-normal text-slate-700 mt-2 block">אנא ודא שהסמארטפון והמכשירים נמצאים על אותה רשת WiFi.</span>
                </span>
                <button 
                  onClick={handleScan}
                  className="mt-2 px-6 py-2 border border-slate-700 rounded-full text-[10px] font-bold text-slate-400 hover:text-white hover:border-[#38bdf8] transition-all"
                >TRY AGAIN / נסה שוב</button>
              </div>
            )}

            {!isScanning && discoveredDevices.length > 0 && (
              <div className="flex flex-col gap-3 animate-in slide-in-from-top-4 duration-700">
                {discoveredDevices.map((device) => (
                  <div 
                    key={device.id} 
                    className="border border-[#00b4d8]/20 rounded-2xl p-4 bg-[#0c0e15] flex flex-col gap-3 transition-all hover:border-[#00b4d8]/50 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#00b4d8]/10 text-[#00b4d8] flex items-center justify-center">
                          <Cpu className="w-5 h-5 shadow-[0_0_10px_rgba(0,180,216,0.5)]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-slate-100">{device.name}</span>
                          <span className="text-[11px] font-mono text-slate-500">{device.ip}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]"></div>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500 leading-none">CONNECTED</span>
                        </div>
                        <span className="text-[9px] text-[#38bdf8] font-mono uppercase font-bold tracking-tight bg-[#38bdf8]/10 px-1.5 py-0.5 rounded italic">Signal {device.strength}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active & Ready</span>
                       <button className="px-5 py-2 bg-[#00b4d8] hover:bg-[#0096b4] text-black rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(0,180,216,0.2)]">MANAGE DEVICE</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-[#0c0e15] border border-slate-800/80 rounded-2xl p-5 mb-10 flex gap-4">
             <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
             </div>
             <div className="text-[11px] leading-relaxed text-slate-400">
                <strong className="text-slate-200 block mb-1">אבטחת תקשורת:</strong>
                החיבור מתבצע תחת הצפנת AES-128 מקומית. ודא שהראוטר שלך מאפשר תקשורת פנימית (Client Isolation = Disabled) כדי שנוכל לזהות את המכשירים המחוברים.
             </div>
          </div>
        </div>
      );
    }

    if (activeTab === "library") {
      return (
        <div className="flex-1 overflow-y-auto px-5 pb-28 pt-2 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 font-sans">
          <div className="flex items-center justify-between mt-4">
            <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-0">
              CONTENT LIBRARY / ספריית תוכן
            </h3>
            <button 
              onClick={() => setShowHowItWorks(!showHowItWorks)}
              className="text-[10px] font-bold text-[#a855f7] hover:text-[#c084fc] flex items-center gap-1 uppercase tracking-tight transition-colors"
            >
              <Info className="w-3 h-3" />
              {showHowItWorks ? 'Close Info' : 'How it works?'}
            </button>
          </div>

          <AnimatePresence>
            {showHowItWorks && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-[#120d1d] border border-[#a855f7]/30 rounded-2xl p-5 mb-2 flex flex-col gap-4 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#a855f7]/10 rounded-lg">
                      <Database className="w-5 h-5 text-[#a855f7]" />
                    </div>
                    <span className="text-[13px] font-black text-slate-100 tracking-wide">זרימת סנכרון ענן / Cloud Architecture</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 relative">
                    {/* Connection Lines */}
                    <div className="absolute top-[30px] left-[25%] right-[25%] h-[1px] bg-gradient-to-r from-transparent via-[#a855f7]/40 to-transparent"></div>
                    
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                        <Smartphone className="w-5 h-5 text-slate-400" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">App Client</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="w-12 h-12 rounded-full bg-[#a855f7]/20 flex items-center justify-center border border-[#a855f7]/40 shadow-[0_0_15px_rgba(168,85,247,0.3)] animate-pulse">
                        <CloudLightning className="w-6 h-6 text-[#a855f7]" />
                      </div>
                      <span className="text-[9px] font-bold text-[#a855f7] uppercase">HoloCloud API</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                        <Cpu className="w-5 h-5 text-slate-400" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">HoloSpin Unit</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/50">
                    {[
                      "העלאה מהנייד לשרת מאובטח (HTTPS/AES).",
                      "קידוד אוטומטי של התוכן למבנה בינארי המותאם ל-LED.",
                      "שליחת פקודת דחיפה (Push) לכל המכשירים בחשבון.",
                      "המכשירים מורידים את התוכן רק כשהם במצב Idle."
                    ].map((step, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <span className="text-[#a855f7] font-mono text-[10px] mt-0.5">{i+1}.</span>
                        <p className="text-[10px] text-slate-400 leading-normal">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Storage:</span>
               <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[60%] h-full bg-[#a855f7]"></div>
               </div>
               <span className="text-[9px] font-mono text-slate-400">60%</span>
            </div>
          </div>

          <div className="flex gap-2 pb-1 overflow-x-auto no-scrollbar">
            {['All', 'Video Loops', '3D Objects', 'Text Sets', 'Icons'].map((cat, idx) => (
              <button 
                key={cat} 
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all ${idx === 0 ? 'bg-[#a855f7] text-white' : 'bg-[#0c0e15] border border-slate-800 text-slate-500'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
             {[
               { id: 'v1', name: 'Cyber Ring', type: 'Loop', icon: '🌀', size: '1.2MB' },
               { id: 'v2', name: 'Digital Rain', type: 'Loop', icon: '👾', size: '0.8MB' },
               { id: 'v3', name: 'Helix DNA', type: '3D', icon: '🧬', size: '2.4MB' },
               { id: 'v4', name: 'Golden Coin', type: '3D', icon: '💰', size: '1.7MB' },
               { id: 'v5', name: 'Loading Glow', type: 'Loop', icon: '⚡', size: '0.5MB' },
               { id: 'v6', name: 'Skull Flame', type: 'Loop', icon: '💀', size: '3.1MB' },
             ].map(item => (
               <div key={item.id} className="bg-[#0c0e15] border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-3 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button className="bg-[#a855f7] p-1.5 rounded-lg shadow-lg">
                        <Upload className="w-3 h-3 text-white" />
                     </button>
                  </div>
                  <div className="w-full aspect-square bg-[#050608] rounded-xl flex items-center justify-center text-4xl shadow-inner border border-slate-800/40">
                     {item.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-bold text-slate-200 tracking-wide">{item.name}</span>
                    <div className="flex justify-between items-center">
                       <span className="text-[9px] text-[#a855f7] font-bold uppercase tracking-tight">{item.type}</span>
                       <span className="text-[9px] text-slate-600 font-mono uppercase tracking-tight">{item.size}</span>
                    </div>
                  </div>
               </div>
             ))}
          </div>

          <div className="border border-slate-800/50 rounded-2xl p-4 bg-slate-900/20 flex flex-col gap-3">
             <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-slate-500" />
                <span className="text-[12px] font-bold text-slate-300">CLOUD SYNC ACTIVE</span>
             </div>
             <p className="text-[10px] text-slate-500 leading-relaxed pl-8">
               סנכרון הענן פעיל. כל קובץ שתעלו מהנייד יופיע אוטומטית בכל מכשירי ה-HoloSpin שברשותכם תחת החשבון המחובר שלכם.
             </p>
          </div>
        </div>
      )
    }

    if (activeTab === "controller") {
      return (
        <div className="flex-1 overflow-y-auto px-5 pb-28 pt-2 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-full max-w-[280px] aspect-square mx-auto flex items-center justify-center relative my-8">
            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(-2deg); }
                50% { transform: translateY(-15px) rotate(2deg); }
              }
              @keyframes shadow-pulse {
                0%, 100% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(0.8); opacity: 0.4; }
              }
            `}</style>

            {/* Base/Pedestal Shadow */}
            <div
              className="absolute -bottom-8 w-[200px] h-[40px] bg-cyan-500/30 rounded-full blur-2xl transition-all duration-700"
              style={{ animation: "shadow-pulse 6s ease-in-out infinite" }}
            ></div>

            <motion.div
              className="w-full h-full rounded-full border-[2px] border-slate-800 bg-[#050608] flex items-center justify-center overflow-hidden relative shadow-[0_0_50px_rgba(0,180,216,0.2)]"
              style={{ animation: "float 6s ease-in-out infinite" }}
              animate={isApplyingPreset ? { scale: [1, 1.08, 1], rotate: [0, 5, -5, 0], filter: ['brightness(1)', 'brightness(1.8)', 'brightness(1)'] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <HologramSimulator
                effect={activeEffect}
                speed={motorSpeed}
                brightness={brightness}
                customColor={`hsl(${state.led.hue}, 100%, 50%)`}
                logoUrl={logoUrl}
                povText={povText}
                logoRotation={logoRotation}
                logoTintColor={useLogoTint ? logoTintColor : null}
                povTextAnimation={povTextAnimation}
                effectSpeedRate={effectSpeedRate}
                effectScale={effectScale}
                effectComplexity={effectComplexity}
                videoUrl={synthVideoUrl}
                ledCount={state.led.ledsPerStrip}
              />
              {/* Glass Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-full pointer-events-none"></div>
              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] pointer-events-none rounded-full"></div>
            </motion.div>
          </div>

          <section>
            <div className="flex justify-between items-end mb-3 px-1">
              <h3 className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-0">
                EFFECTS
              </h3>
            </div>
            <div className="border border-slate-800/80 rounded-2xl p-4 bg-[#0c0e15]">
              <div className="grid grid-cols-4 gap-3">
                {EFFECTS.map((effect) => (
                  <button
                    key={effect.id}
                    onClick={() => {
                      setActiveEffect(effect.id);
                    }}
                    className={`flex flex-col items-center justify-center h-[90px] rounded-xl border transition-all ${
                      activeEffect === effect.id
                        ? "border-[#00b4d8] bg-[#00b4d8]/10 shadow-[0_0_15px_rgba(0,180,216,0.3)]"
                        : "border-slate-800/80 bg-[#12141a] hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center justify-center mb-3 h-8 w-8">
                      {effect.icon(
                        activeEffect === effect.id && effect.id === "rainbow"
                          ? "#fff"
                          : effect.id === "solid"
                            ? `hsl(${state.led.hue}, 100%, 50%)`
                            : effect.color,
                      )}
                    </div>
                    <span
                      className={`text-[9px] font-bold tracking-widest uppercase`}
                      style={{
                        color:
                          activeEffect === effect.id && effect.id === "rainbow"
                            ? "#fff"
                            : effect.id === "solid"
                              ? `hsl(${state.led.hue}, 100%, 50%)`
                              : effect.color,
                      }}
                    >
                      {effect.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {activeEffect === "video_synth" && (
            <section className="animate-in fade-in slide-in-from-top-2">
              <h3 className="text-[11px] text-slate-400 font-bold tracking-widest mb-3 uppercase pl-1">
                סנכרון וידאו והקרנה / VIDEO SYNTH SELECT & UPLOAD
              </h3>
              <div className="border border-slate-800/80 rounded-2xl p-4 bg-[#0c0e15] flex flex-col gap-4">
                <div className="text-xs text-slate-300 leading-relaxed font-sans">
                  <strong>הקרנת וידאו הולוגרפית:</strong> באפשרותך להעלות סרטון קצר משלך או לבחור אחד מסרטוני הבסיס המותאמים להקרנה.
                </div>

                {/* Video Preset loops */}
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {VIDEO_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSynthVideoUrl(preset.url);
                        safeSaveLocal("synthVideoUrl", preset.url);
                      }}
                      className={`py-2.5 px-3 rounded-xl border text-[10px] font-bold tracking-wider transition-all flex flex-col items-center justify-center text-center gap-1 cursor-pointer ${
                        synthVideoUrl === preset.url
                          ? "border-[#00b4d8] bg-[#00b4d8]/15 text-white shadow-[0_0_8px_rgba(0,180,216,0.25)]"
                          : "border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      <span className="text-[10px] font-bold truncate w-full">{preset.name}</span>
                    </button>
                  ))}
                </div>

                {/* File Uploader */}
                <div className="mt-1">
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-[#00b4d8] rounded-2xl py-6 px-4 cursor-pointer transition bg-slate-900/30">
                    <Video className="w-8 h-8 text-slate-500 mb-2" />
                    <span className="text-xs font-bold text-slate-300">העלה סרטון קצר / Choose Short Video</span>
                    <span className="text-[9px] text-slate-500 mt-1">Supports MP4, WebM, MOV. Loaded in-browser.</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const fileUrl = URL.createObjectURL(file);
                          setSynthVideoUrl(fileUrl);
                          safeSaveLocal("synthVideoUrl", fileUrl);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>

                {synthVideoUrl && (
                  <div className="flex items-center justify-between border border-slate-800/80 bg-slate-950/50 rounded-xl p-3">
                    <span className="text-[10px] text-slate-400 truncate max-w-[200px]">
                      Active: {synthVideoUrl.startsWith("blob:") ? "Custom Uploaded Video 🎥" : synthVideoUrl.split("/").pop()}
                    </span>
                    <button
                      onClick={() => {
                        setSynthVideoUrl(null);
                        safeRemoveLocal("synthVideoUrl");
                      }}
                      className="text-[9px] font-bold tracking-widest text-rose-500 hover:text-rose-400 uppercase"
                    >
                      CLEAR VIDEO
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {(activeEffect === "logo" || activeEffect === "pov_text") && (
            <section className="animate-in fade-in slide-in-from-top-2">
              <h3 className="text-[11px] text-slate-400 font-bold tracking-widest mb-3 uppercase pl-1">
                {activeEffect === "logo" ? "LOGO SETTINGS" : "TEXT SETTINGS"}
              </h3>
              <div className="border border-slate-800/80 rounded-2xl p-4 bg-[#0c0e15] flex flex-col gap-4">
                {activeEffect === "logo" && (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] uppercase tracking-wider text-slate-400">Upload Image File</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#00b4d8] file:text-black hover:file:bg-[#00b4d8]/80 cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setLogoUrl(reader.result as string);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {logoUrl && (
                         <img src={logoUrl} className="mt-2 w-16 h-16 object-contain rounded-md border border-slate-700 bg-black/50" />
                      )}
                    </div>

                    {/* Logo Manual Rotation Slider */}
                    <div className="flex flex-col gap-2 border border-slate-800/60 rounded-xl bg-[#050608] p-3">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] uppercase tracking-wider text-slate-400">Alignment / Rotation</label>
                        <span className="text-xs font-mono text-sky-400 font-bold">{logoRotation}°</span>
                      </div>
                      <div className="flex items-center gap-4 px-1">
                        <CustomSlider
                          value={logoRotation}
                          onChange={setLogoRotation}
                          thumbColor="#00b4d8"
                          trackColor="#1e293b"
                          min={-180}
                          max={180}
                        />
                      </div>
                    </div>

                    {/* Tint controls */}
                    <div className="flex items-center justify-between border border-slate-800/60 rounded-xl bg-[#050608] p-3">
                      <label className="text-[11px] uppercase tracking-wider text-slate-400">Hologram Color Tint</label>
                      <Toggle value={useLogoTint} onChange={setUseLogoTint} activeColor="#00b4d8" />
                    </div>

                    {useLogoTint && (
                      <div className="flex items-center justify-between border border-slate-800/60 rounded-xl bg-[#050608] p-3 animate-in fade-in slide-in-from-top-1">
                        <label className="text-[11px] uppercase tracking-wider text-slate-400">Tint Color</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="color" 
                            value={logoTintColor} 
                            onChange={(e) => setLogoTintColor(e.target.value)}
                            className="w-8 h-8 rounded-lg bg-transparent border border-slate-700 cursor-pointer"
                          />
                          <span className="text-xs font-mono text-slate-400 font-bold uppercase">{logoTintColor}</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {activeEffect === "pov_text" && (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] uppercase tracking-wider text-slate-400">Custom Text</label>
                      <input 
                        type="text" 
                        value={povText}
                        onChange={(e) => setPovText(e.target.value)}
                        className="bg-[#050608] border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#fcd34d] transition-colors"
                        placeholder="Enter holographic text..."
                        maxLength={40}
                      />
                    </div>

                    {/* POV Text animation selector dropdown */}
                    <div className="flex flex-col gap-2 border border-slate-800/60 rounded-xl bg-[#050608] p-3">
                      <label className="text-[11px] uppercase tracking-wider text-slate-400">Entry / Loop Animation</label>
                      <select
                        value={povTextAnimation}
                        onChange={(e) => setPovTextAnimation(e.target.value)}
                        className="bg-[#0c0e15] border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#fcd34d] transition-colors cursor-pointer"
                      >
                        <option value="fade" className="bg-[#0c0e15] text-white">Fade Glow (Smooth Breathing)</option>
                        <option value="slide" className="bg-[#0c0e15] text-white">Holo Slide (Scanline Shift)</option>
                        <option value="pulse" className="bg-[#0c0e15] text-white">Tech Pulse (Scale Resonator)</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </section>
          )}

          <section>
            <h3 className="text-[11px] text-slate-400 font-bold tracking-widest mb-3 uppercase pl-1">
              POWER
            </h3>
            <div className="border border-slate-800/80 rounded-2xl p-4 bg-[#0c0e15] grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-4 rounded-xl border border-[#166534] bg-[#062c16] text-[#22c55e] transition-all hover:bg-[#062c16]/80 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                <Power className="w-5 h-5 stroke-[2.5]" />
                <span className="text-xs font-bold tracking-widest">
                  POWER ON
                </span>
              </button>
              <button className="flex items-center justify-center gap-2 py-4 rounded-xl border border-[#991b1b] bg-[#380c10] text-[#ef4444] transition-all hover:bg-[#380c10]/80 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                <Power className="w-5 h-5 stroke-[2.5]" />
                <span className="text-xs font-bold tracking-widest">
                  POWER OFF
                </span>
              </button>
            </div>
          </section>

          <section>
            <h3 className="text-[11px] text-slate-400 font-bold tracking-widest mb-3 uppercase pl-1">
              BRIGHTNESS
            </h3>
            <div className="border border-slate-800/80 rounded-2xl p-5 bg-[#0c0e15] flex items-center gap-4">
              <Sun className="w-6 h-6 text-[#38bdf8]" />
              <CustomSlider
                value={brightness}
                onChange={setBrightness}
                thumbColor="#38bdf8"
                trackColor="#1e293b"
              />
              <span className="text-[#38bdf8] font-bold w-10 text-right text-sm">
                {brightness}
              </span>
            </div>
          </section>

          <section>
            <h3 className="text-[11px] text-slate-400 font-bold tracking-widest mb-3 uppercase pl-1">
              MOTOR SPEED
            </h3>
            <div className="border border-slate-800/80 rounded-2xl p-5 bg-[#0c0e15] flex items-center gap-4">
              <Target className="w-6 h-6 text-[#a855f7]" />
              <CustomSlider
                value={motorSpeed}
                onChange={setMotorSpeed}
                thumbColor="#a855f7"
                trackColor="#1e293b"
              />
              <span className="text-[#a855f7] font-bold w-10 text-right text-sm">
                {motorSpeed}
              </span>
            </div>
          </section>

          <button
            id="btn-update-effects"
            onClick={() => {
              safeSaveLocal("holospin_activeEffect", activeEffect);
              safeSaveLocal("holospin_brightness", String(brightness));
              safeSaveLocal("holospin_motorSpeed", String(motorSpeed));
              safeSaveLocal("holospin_effectScale", String(effectScale));
              safeSaveLocal("holospin_effectComplexity", String(effectComplexity));
              safeSaveLocal("holospin_effectSpeedRate", String(effectSpeedRate));
              if (logoUrl) safeSaveLocal("holospin_logoUrl", logoUrl);
              safeSaveLocal("holospin_povText", povText);
              safeSaveLocal("holospin_logoRotation", String(logoRotation));
              safeSaveLocal("holospin_useLogoTint", String(useLogoTint));
              safeSaveLocal("holospin_logoTintColor", logoTintColor);
              safeSaveLocal("holospin_povTextAnimation", povTextAnimation);
              if (synthVideoUrl) {
                safeSaveLocal("synthVideoUrl", synthVideoUrl);
              }
              setToastMessage("Hologram state updated & confirmed! / הגדרות האפקט עודכנו בהצלחה!");
            }}
            className="w-full bg-[#00b4d8] hover:bg-[#0096b4] text-white py-4 rounded-xl text-[11.5px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,180,216,0.3)] transition cursor-pointer active:scale-95 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            עדכן והחל שינויים / CONFIRM & UPDATE EFFECT
          </button>

          <section>
            <div className="border border-slate-800/80 rounded-2xl p-4 bg-[#0c0e15] flex justify-between divide-x divide-slate-800/80">
              <div className="flex flex-col items-center flex-1 px-1">
                <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                  <RefreshCw className="w-3 h-3 text-[#38bdf8]" />
                  <span className="text-[9px] font-bold tracking-widest">
                    SPEED
                  </span>
                </div>
                <div className="text-[18px] font-medium text-[#38bdf8] leading-tight mt-1">
                  1200
                </div>
                <div className="text-[9px] text-[#38bdf8] tracking-widest mt-0.5">
                  RPM
                </div>
              </div>
              <div className="flex flex-col items-center flex-1 px-1">
                <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                  <Target className="w-3 h-3 text-[#22c55e]" />
                  <span className="text-[9px] font-bold tracking-widest">
                    SYNC
                  </span>
                </div>
                <div className="text-[18px] font-medium text-[#22c55e] leading-tight mt-1">
                  100%
                </div>
                <div className="text-[9px] text-[#22c55e] tracking-widest mt-0.5">
                  PERFECT
                </div>
              </div>
              <div className="flex flex-col items-center flex-1 px-1">
                <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                  <Thermometer className="w-3 h-3 text-[#00b4d8]" />
                  <span className="text-[9px] font-bold tracking-widest">
                    TEMP
                  </span>
                </div>
                <div className="text-[18px] font-medium text-[#00b4d8] leading-tight mt-1">
                  34°C
                </div>
                <div className="text-[9px] text-[#00b4d8] tracking-widest mt-0.5">
                  NORMAL
                </div>
              </div>
              <div className="flex flex-col items-center flex-1 px-1">
                <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                  <Zap className="w-3 h-3 text-[#a855f7]" />
                  <span className="text-[9px] font-bold tracking-widest">
                    VOLTAGE
                  </span>
                </div>
                <div className="text-[18px] font-medium text-[#a855f7] leading-tight mt-1">
                  24.1V
                </div>
                <div className="text-[9px] text-[#a855f7] tracking-widest mt-0.5">
                  STABLE
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }

    if (activeTab === "settings") {
      return (
        <div className="px-5 pt-2 pb-28 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-[11px] text-slate-400 font-bold tracking-widest mb-1 uppercase pl-1">
            SETTINGS
          </h3>
          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] overflow-hidden flex flex-col">
            <SettingsRow
              onClick={() => setSubPage("wifi")}
              icon={<Wifi className="w-5 h-5" />}
              title="WiFi Settings"
              subtitle="Holospin_POV2"
            />
            <SettingsRow
              onClick={() => setSubPage("led")}
              icon={<Sun className="w-5 h-5" />}
              title="LED Settings"
              subtitle="Strips, Pins, Brightness, Order"
            />
            <SettingsRow
              onClick={() => setSubPage("motor")}
              icon={<Settings className="w-5 h-5" />}
              title="Motor Settings"
              subtitle="Motor Pin, Frequency, Max Speed"
            />
            <SettingsRow
              onClick={() => setSubPage("pov")}
              icon={<Target className="w-5 h-5" />}
              title="POV Settings"
              subtitle="Columns, Direction, Calibration"
            />
            <SettingsRow
              onClick={() => setSubPage("sync")}
              icon={<Zap className="w-5 h-5" />}
              title="Sync & Sensor"
              subtitle="Sensor Pin, Hall Sensor"
              rightWidget={
                <div className="flex items-center gap-2 mr-1">
                  <span className="text-[11px] font-bold tracking-widest text-[#22c55e]">
                    OK
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
              }
            />
            <SettingsRow
              onClick={() => setSubPage("firmware")}
              icon={<Download className="w-5 h-5" />}
              title="Firmware Setup"
              subtitle="Generate .ino & .h code"
            />
            <SettingsRow
              onClick={() => setSubPage("power")}
              icon={<Power className="w-5 h-5" />}
              title="Power Settings"
              subtitle="Voltage Limit, Current Limit"
            />
            <SettingsRow
              onClick={() => setSubPage("save_load")}
              icon={<Database className="w-5 h-5" />}
              title="Save / Load Profile"
              subtitle="Manage your profiles"
            />
            <SettingsRow
              onClick={() => setSubPage("advanced")}
              icon={<Settings className="w-5 h-5" />}
              title="Advanced Settings"
              subtitle="Developer and advanced options"
            />
            <SettingsRow
              onClick={() => setSubPage("background")}
              icon={<Globe className="w-5 h-5" />}
              title="Background Style"
              subtitle="Choose the app background"
            />
            <SettingsRow
              onClick={() => setSubPage("media")}
              icon={<Image className="w-5 h-5 text-[#00b4d8]" />}
              title="Media & Files Upload / העלאת מדיה וקבצים"
              subtitle="Upload custom hologram logos, images, or video loops"
            />
          </div>

          <div className="border border-slate-800/80 rounded-2xl bg-[#0c0e15] p-5 mt-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[13px] text-slate-200 tracking-wide font-bold">
                High Contrast Light Mode
              </span>
              <span className="text-[10px] text-slate-400">
                מצב ניגודיות גבוהה לסביבה מוארת
              </span>
            </div>
            <Toggle
              value={isLightMode}
              activeColor="#00b4d8"
              onChange={(v: boolean) => {
                setIsLightMode(v);
                safeSaveLocal("isLightMode", String(v));
              }}
            />
          </div>
        </div>
      );
    }

    if (activeTab === "about") {
      const opt = OPTIMAL_SPEEDS[activeEffect] || { speed: 80, label: "80 RPM", explanation: "Default sync speed for Persistence of Vision drawing stability." };
      const isCalibrated = motorSpeed === opt.speed;

      return (
        <div className="px-5 pt-2 pb-28 flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4">
          
          {/* Top Holographic Display Unit */}
          <div className="flex flex-col items-center mt-2">
            <motion.div 
              className="w-[160px] h-[160px] rounded-full flex items-center justify-center relative mb-2 bg-[#020306]/90 border border-slate-800 shadow-[0_0_40px_rgba(0,180,216,0.15)]"
              animate={isApplyingPreset ? { scale: [1, 1.1, 1], filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] } : {}}
              transition={{ duration: 0.8 }}
            >
              <HologramSimulator
                effect={activeEffect}
                speed={motorSpeed}
                brightness={brightness}
                customColor={`hsl(${state.led.hue}, 100%, 50%)`}
                logoUrl={logoUrl}
                povText={povText}
                logoRotation={logoRotation}
                logoTintColor={useLogoTint ? logoTintColor : null}
                povTextAnimation={povTextAnimation}
                effectSpeedRate={effectSpeedRate}
                effectScale={effectScale}
                effectComplexity={effectComplexity}
                videoUrl={synthVideoUrl}
                ledCount={state.led.ledsPerStrip}
              />
              {/* Glass Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-full pointer-events-none"></div>
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.85)] pointer-events-none rounded-full"></div>
            </motion.div>
            
            <div className="text-center">
              <span className="text-[10px] text-sky-400 font-bold tracking-widest uppercase">
                Active Hologram Calibration
              </span>
            </div>
          </div>

          {/* Quick Effect Selection Panel */}
          <section>
            <h3 className="text-[11px] text-slate-400 font-bold tracking-widest mb-2 uppercase pl-1">
              שריון ובחירת אפקטים / CHOOSE EFFECT
            </h3>
            <div className="grid grid-cols-4 gap-1.5 p-2 border border-slate-800/80 rounded-2xl bg-[#0c0e15]/90">
              {EFFECTS.map((eff) => {
                const isActive = activeEffect === eff.id;
                return (
                  <button
                    key={eff.id}
                    onClick={() => {
                      setActiveEffect(eff.id);
                    }}
                    className={`flex flex-col items-center gap-1 py-1.5 px-1 rounded-xl border transition-all ${
                      isActive
                        ? "bg-[#0a2540]/60 border-[#00b4d8] text-white shadow-[0_0_10px_rgba(0,180,216,0.15)]"
                        : "bg-black/40 border-slate-800/50 text-slate-400 hover:text-slate-200 hover:border-slate-700/50"
                    }`}
                  >
                    <div className="scale-[0.7] opacity-90 transition-transform">
                      {eff.icon(isActive ? eff.color : "#475569")}
                    </div>
                    <span className="text-[8px] font-bold tracking-wider select-none truncate max-w-full uppercase">
                      {eff.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Optimal POV Speed Synchronization */}
          <section>
            <h3 className="text-[11px] text-slate-400 font-bold tracking-widest mb-2 uppercase pl-1">
              מהירות רוטור אופטימלית / OPTIMAL ROTATION
            </h3>
            <div className="border border-slate-800/80 rounded-2xl p-4 bg-[#0c0e15]/90 flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold tracking-wide uppercase text-white">
                    {EFFECTS.find(e => e.id === activeEffect)?.label || "Active Color"}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono font-bold mt-0.5">
                    Recommended: {opt.label}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Status:</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isCalibrated ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30" : "bg-amber-950/60 text-amber-400 border border-amber-500/30"}`}>
                    {isCalibrated ? "CALIBRATED" : "DRIP MISMATCH"}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#050608] border border-slate-800/50 text-[11px] text-slate-400 leading-relaxed font-sans">
                💡 <span className="font-semibold text-slate-300">הסבר טכנולוגי:</span> {opt.explanation}
              </div>

              {isCalibrated ? (
                <div className="w-full py-3 px-4 rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 font-bold tracking-widest text-[10px] flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                  סנכרון מושלם: {opt.speed} RPM (100% PERSISTENCE)
                </div>
              ) : (
                <button
                  onClick={() => setMotorSpeed(opt.speed)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-teal-500/30 bg-teal-950/45 hover:bg-teal-900/60 text-teal-300 font-bold tracking-widest text-[10px] transition-all duration-300 hover:shadow-[0_0_15px_rgba(20,184,166,0.2)] active:scale-[0.98]"
                >
                  <Zap className="w-4 h-4 text-teal-400 stroke-[2.5] animate-pulse" />
                  סנכרן למהירות מנוע אופטימלית ({opt.speed} RPM)
                </button>
              )}
            </div>
          </section>

          {/* Micro Geometric Adjustments */}
          <section>
            <h3 className="text-[11px] text-slate-400 font-bold tracking-widest mb-2 uppercase pl-1">
              הגדרות מתקדמות לאפקט / EFFECT ADVANCED MODIFIERS
            </h3>
            <div className="border border-slate-800/80 rounded-2xl p-4 bg-[#0c0e15]/90 flex flex-col gap-4">
              
              {/* Parameter 1: Speed Rate */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">קצב התקדמות פנימי / Playback Time</span>
                  <span className="text-xs font-mono font-bold text-[#00b4d8]">
                    {isSyncSpeedRate ? `Synced (x${(effectSpeedRate || 1.0).toFixed(1)})` : `x${(effectSpeedRate || 1.0).toFixed(1)}`}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <CustomSlider
                    value={Math.round((effectSpeedRate - 0.2) / 2.8 * 255)}
                    disabled={isSyncSpeedRate}
                    onChange={(v: number) => {
                      if (isSyncSpeedRate) return;
                      const computedVal = 0.2 + (v / 255) * 2.8;
                      setEffectSpeedRate(computedVal);
                    }}
                    thumbColor={isSyncSpeedRate ? "#475569" : "#00b4d8"}
                    trackColor="#1e293b"
                  />
                </div>
                
                <div className="flex items-center justify-between bg-slate-950/40 p-2 border border-slate-800/40 rounded-xl my-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-200 font-semibold leading-tight">סנכרן עם סיבובי מנוע / Sync Animation with Motor RPM</span>
                    <span className="text-[8px] text-slate-500">שומר על זרימה ויזואלית עקבית בהתאם למהירות הסיבוב</span>
                  </div>
                  <Toggle
                    value={isSyncSpeedRate}
                    activeColor="#22c55e"
                    onChange={(v: boolean) => {
                      setIsSyncSpeedRate(v);
                      safeSaveLocal("isSyncSpeedRate", String(v));
                    }}
                  />
                </div>
                <span className="text-[9px] text-slate-500">שולט במהירות של תנועת הגרפיקה בלי קשר למהירות המאוורר הפיזי.</span>
              </div>

              {/* Parameter 2: Scale */}
              <div className="flex flex-col gap-1 border-t border-slate-900 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">קנה מידה וגודל / Radial Scale</span>
                  <span className="text-xs font-mono font-bold text-pink-400">{Math.round(effectScale * 100)}%</span>
                </div>
                <div className="flex items-center gap-4">
                  <CustomSlider
                    value={Math.round((effectScale - 0.5) / 1.0 * 255)}
                    onChange={(v: number) => {
                      const computedVal = 0.5 + (v / 255) * 1.0;
                      setEffectScale(computedVal);
                    }}
                    thumbColor="#f43f5e"
                    trackColor="#1e293b"
                  />
                </div>
                <span className="text-[9px] text-slate-500">מגדיל או מקטין את ההקרנה בטווח העליון של המניפה.</span>
              </div>

              {/* Parameter 3: Complexity */}
              <div className="flex flex-col gap-1 border-t border-slate-900 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">מורכבות ורמת פירוט / Complexity Layers</span>
                  <span className="text-xs font-mono font-bold text-amber-400">{Math.round(effectComplexity)} Facets</span>
                </div>
                <div className="flex items-center gap-4">
                  <CustomSlider
                    value={Math.round((effectComplexity - 3) / 13 * 255)}
                    onChange={(v: number) => {
                      const computedVal = 3 + (v / 255) * 13;
                      setEffectComplexity(computedVal);
                    }}
                    thumbColor="#fbbf24"
                    trackColor="#1e293b"
                  />
                </div>
                <span className="text-[9px] text-slate-500">שינוי מספר העמודות, הקלידוסקופים, פריסות הגרפיקה, או כמות הכוכבים בפריסה.</span>
              </div>

            </div>
          </section>

          {/* Quick System Restart Row (re-used for tech consistency) */}
          <button className="w-full bg-[#161d2a] hover:bg-slate-800 text-slate-400 py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 border border-slate-800">
            <RefreshCw className="w-4 h-4 animate-spin-slow text-slate-400" />
            אתחול פרוטוקול הקרנת העדשה / REBOOT PROJECTION SYSTEM
          </button>
        </div>
      );
    }
  };

  if (showSplash) {
    return (
      <div className="bg-black min-h-screen text-white font-sans w-full max-w-md mx-auto relative overflow-hidden flex items-center justify-center antialiased">
        <video 
          src={video1} 
          autoPlay 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/80"></div>
        
        {showSplashLogo && (
          <div className="absolute z-10 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-1000 flex flex-col items-center">
            <Aperture className="w-16 h-16 text-[#00b4d8] mb-4 drop-shadow-[0_0_20px_rgba(0,180,216,0.8)]" />
            <h1 className="text-3xl font-bold tracking-[0.3em] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">HOLOSPIN</h1>
            <p className="text-[#a855f7] tracking-[0.4em] text-xs font-semibold mt-2 uppercase shadow-purple-500/50">POV System</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-bg-app min-h-screen text-text-primary font-sans w-full max-w-md mx-auto shadow-2xl relative overflow-x-hidden flex flex-col antialiased">
      {isLightMode && (
        <style>{`
          .bg-\\[\\#0c0e15\\], .bg-\\[\\#0c0e15\\]\\/90, .bg-\\[\\#090a10\\], .bg-black\\/40, .bg-\\[\\#161d2a\\], .bg-\\[\\#090a10\\]\\/95, .bg-\\[\\#0c0e15\\]\\/95 {
            background-color: var(--bg-panel) !important;
            color: var(--text-primary) !important;
          }
          .border-slate-800, .border-slate-800\\/50, .border-slate-800\\/80, .border-slate-800\\/60, .border-slate-900, .divider-slate-800\\/50 {
            border-color: var(--border-color) !important;
          }
          .text-slate-100, .text-slate-200, .text-slate-300, .text-slate-400, .text-white, .hover\\:text-slate-200:hover, .text-slate-200 {
            color: var(--text-primary) !important;
          }
          .text-slate-500 {
            color: var(--text-secondary) !important;
          }
          .bg-\\[\\#050608\\], .bg-black, .bg-\\[\\#020306\\]\\/90 {
            background-color: var(--bg-app) !important;
          }
          .hover\\:bg-slate-800\\/30:hover {
            background-color: var(--bg-panel-hover) !important;
          }
          .divide-slate-800\\/50 > * + * {
            border-color: var(--divider-color) !important;
          }
        `}</style>
      )}
      <GalaxyBackground bgImageId={bgImageId} />

      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[1000] bg-[#0c0e15]/95 border border-[#22c55e]/50 text-[#22c55e] px-4 py-3 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.35)] text-xs font-bold tracking-wider uppercase animate-in fade-in slide-in-from-bottom-5 duration-300 flex items-center gap-2 whitespace-nowrap">
          <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto w-full no-scrollbar relative z-10">
        {renderHeader()}
        {renderContent()}
      </div>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md border-t border-slate-800/80 bg-[#090a10]/95 backdrop-blur-lg flex justify-between items-center px-10 py-3 pb-6 z-50">
        <button
          onClick={() => {
            setActiveTab("controller");
            setSubPage(null);
          }}
          className="flex flex-col items-center gap-1.5 focus:outline-none transition-transform active:scale-95"
        >
          <SlidersHorizontal
            className={`w-6 h-6 transition-colors ${activeTab === "controller" ? "text-[#00b4d8]" : "text-slate-500 hover:text-slate-400"}`}
          />
          <span
            className={`text-[9px] font-bold tracking-widest ${activeTab === "controller" ? "text-[#00b4d8]" : "text-slate-500"}`}
          >
            CONTROLLER
          </span>
        </button>
        <button
          onClick={() => {
            setActiveTab("settings");
            setSubPage(null);
          }}
          className="flex flex-col items-center gap-1.5 focus:outline-none transition-transform active:scale-95"
        >
          <Settings
            className={`w-6 h-6 transition-colors ${activeTab === "settings" ? "text-[#00b4d8]" : "text-slate-500 hover:text-slate-400"}`}
          />
          <span
            className={`text-[9px] font-bold tracking-widest ${activeTab === "settings" ? "text-[#00b4d8]" : "text-slate-500"}`}
          >
            SETTINGS
          </span>
        </button>
        <button
          onClick={() => {
            setActiveTab("about");
            setSubPage(null);
          }}
          className="flex flex-col items-center gap-1.5 focus:outline-none transition-transform active:scale-95"
        >
          <Aperture
            className={`w-6 h-6 transition-colors ${activeTab === "about" ? "text-[#00b4d8] animate-spin-slow" : "text-slate-500 hover:text-slate-400"}`}
          />
          <span
            className={`text-[9px] font-bold tracking-widest ${activeTab === "about" ? "text-[#00b4d8]" : "text-slate-500"}`}
          >
            EFFECTS
          </span>
        </button>
      </nav>

      {/* Sidebar Menu */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 w-64 h-full bg-[#090a10] border-r border-slate-800/80 z-[70] flex flex-col animate-in slide-in-from-left shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <div className="flex flex-col">
                <div className="text-[18px] font-black tracking-[0.1em] flex leading-none">
                  <span className="text-[#00b4d8]">HOLO</span>
                  <span className="text-[#a855f7]">SPIN</span>
                </div>
                <div className="text-[7px] text-slate-400 font-bold tracking-[0.15em] mt-1">
                  MENU
                </div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col p-4 gap-2">
              <button
                className="flex items-center gap-3 p-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition text-left"
                onClick={() => {
                  setActiveTab("devices");
                  setSubPage(null);
                  setIsSidebarOpen(false);
                }}
              >
                <Monitor className="w-5 h-5 text-[#38bdf8]" />
                <span className="text-[13px] font-medium tracking-wide">
                  Devices
                </span>
              </button>
              <button
                className="flex items-center gap-3 p-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition text-left"
                onClick={() => {
                  setSubPage("bluetooth");
                  setIsSidebarOpen(false);
                }}
              >
                <Bluetooth className="w-5 h-5 text-[#60a5fa]" />
                <span className="text-[13px] font-medium tracking-wide">
                  Bluetooth
                </span>
              </button>
              <button
                className="flex items-center gap-3 p-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition text-left"
                onClick={() => {
                  setSubPage("storage");
                  setIsSidebarOpen(false);
                }}
              >
                <HardDrive className="w-5 h-5 text-[#fbbf24]" />
                <span className="text-[13px] font-medium tracking-wide">
                  SD Card Storage
                </span>
              </button>
              <button
                className="flex items-center gap-3 p-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition text-left"
                onClick={() => {
                  setActiveTab("library");
                  setSubPage(null);
                  setIsSidebarOpen(false);
                }}
              >
                <Database className="w-5 h-5 text-[#a855f7]" />
                <span className="text-[13px] font-medium tracking-wide">
                  Library
                </span>
              </button>
              <button
                className="flex items-center gap-3 p-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition text-left"
                onClick={() => {
                  setActiveTab("settings");
                  setSubPage("firmware");
                  setIsSidebarOpen(false);
                }}
              >
                <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
                <span className="text-[13px] font-medium tracking-wide">
                  Firmware Setup
                </span>
              </button>
            </div>
            <div className="mt-auto p-5 border-t border-white/5">
              <button
                className="flex items-center gap-3 w-full text-slate-400 hover:text-[#ef4444] transition text-left"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Power className="w-5 h-5" />
                <span className="text-[13px] font-bold tracking-wide uppercase">
                  Disconnect
                </span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Calibration Confirmation & Progress Modal */}
      {showCalibrateModal && (
        <>
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            onClick={() => {
              if (calibrationStage !== "calibrating" && calibrationStage !== "requesting") {
                setShowCalibrateModal(false);
              }
            }}
          ></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-[#090a10] border border-slate-800/80 rounded-2xl p-6 z-[110] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
            {calibrationStage === "idle" && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                  <Target className="w-8 h-8 text-[#00b4d8] animate-pulse" />
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      אישור כיול חיישן / SENSOR CALIBRATION
                    </h3>
                    <p className="text-[10px] text-slate-500 font-mono font-medium">POV FAN SYNCING PROTOCOL</p>
                  </div>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed space-y-2 font-sans py-2">
                  <p>
                    <strong className="text-[#00b4d8]">בעברית:</strong> תהליך הכיול יקבע את היחס האפקטיבי בין פולס חיישן המגנט (Hall Sensor) לזווית רוטציית הלדים. המאוורר יסתובב במהירות גבוהה למשך כמה שניות כדי למצוא את נקודת הסריקה היציבה.
                  </p>
                  <p>
                    <strong className="text-[#a855f7]">English:</strong> This calibration establishes the relationship between magnetic Hall Sensor pulses and LED rotation angles. The rotor fan will ramp up high to scan, map, and synchronize the projection.
                  </p>
                </div>

                <div className="flex gap-3 justify-end mt-4">
                  <button
                    onClick={() => setShowCalibrateModal(false)}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-800 text-slate-400 font-bold tracking-widest text-[10px] hover:bg-slate-900 transition-all active:scale-95 uppercase"
                  >
                    ביטול / Cancel
                  </button>
                  <button
                    onClick={handleStartCalibration}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#00b4d8] hover:bg-[#0077b6] text-white font-bold tracking-widest text-[10px] shadow-[0_0_15px_rgba(0,180,216,0.4)] transition-all active:scale-95 uppercase"
                  >
                    התחל כיול / Start
                  </button>
                </div>
              </div>
            )}

            {(calibrationStage === "requesting" || calibrationStage === "calibrating") && (
              <div className="flex flex-col items-center justify-center py-6 gap-5">
                <div className="relative flex items-center justify-center">
                  {/* Outer spinning ring */}
                  <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-[#00b4d8] animate-spin"></div>
                  {/* Inner reverse spinning ring */}
                  <div className="absolute w-10 h-10 rounded-full border-4 border-slate-800 border-t-[#a855f7] animate-spin [animation-direction:reverse] [animation-duration:1s]"></div>
                  {/* Glowing center point */}
                  <div className="absolute w-3 h-3 rounded-full bg-cyan-400 animate-ping"></div>
                </div>

                <div className="text-center space-y-1">
                  <span className="text-[11px] font-bold tracking-wider text-cyan-400 uppercase">
                    כיול בפועל... / CALIBRATING DEVICE
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Status: {deviceStatus === "calibrating" ? "SCANNING PULSES..." : "INITIATING..."}
                  </div>
                </div>

                <div className="w-full bg-[#050608] border border-slate-800/60 rounded-xl p-3 text-[10px] text-slate-500 font-mono text-center flex flex-col gap-1">
                  <div>Ramping motor speed to high RPM...</div>
                  <div className="text-sky-400 font-bold animate-pulse">DO NOT SWITCH OFF POWER</div>
                </div>
              </div>
            )}

            {calibrationStage === "success" && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col items-center justify-center py-4 gap-3 text-center">
                  <div className="w-12 h-12 bg-emerald-950/60 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 animate-bounce">
                    <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      הכיול הושלם בהצלחה!
                    </h3>
                    <p className="text-[10px] text-emerald-400 font-mono font-medium uppercase tracking-wider">
                      CALIBRATION SUCCESSFUL
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#050608] border border-slate-900 rounded-xl space-y-1 font-mono text-[10px] text-slate-400">
                  <div className="flex justify-between">
                    <span>Calibration Sync:</span>
                    <span className="text-emerald-400 font-bold">100% PERSISTENCE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rotor Lock RPM:</span>
                    <span className="text-white">125 RPM (Stable)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Index Offset:</span>
                    <span className="text-white">12.44 degrees</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowCalibrateModal(false);
                    setCalibrationStage("idle");
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold tracking-widest text-[10px] shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all active:scale-95 uppercase mt-2"
                >
                  סגור / Close Window
                </button>
              </div>
            )}

            {calibrationStage === "error" && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col items-center justify-center py-4 gap-3 text-center">
                  <div className="w-12 h-12 bg-rose-950/60 border border-rose-500 rounded-full flex items-center justify-center text-rose-400">
                    <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      הכיול נכשל / CALIBRATION FAILED
                    </h3>
                    <p className="text-[10px] text-rose-400 font-mono font-medium uppercase tracking-wider">
                      CONNECTION ERROR / TIMEOUT
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-sans text-center leading-relaxed px-1">
                  הייתה שגיאה בתקשורת עם מכשיר ה-ESP32. אנא ודא שהסוללות/הכבל מחוברים, והמכשיר דולק.
                  <br />
                  <span className="text-rose-400 font-semibold text-[10px]">Verify dev environment runs standard firmware.</span>
                </p>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => {
                      setShowCalibrateModal(false);
                      setCalibrationStage("idle");
                    }}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-800 text-slate-400 font-bold tracking-widest text-[10px] hover:bg-slate-900 transition-all uppercase"
                  >
                    סגור / Cancel
                  </button>
                  <button
                    onClick={handleStartCalibration}
                    className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold tracking-widest text-[10px] shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all uppercase"
                  >
                    נסה שוב / Retry
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
