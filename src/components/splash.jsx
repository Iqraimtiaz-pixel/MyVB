import { useEffect } from "react";
import { loadUser } from "../utils/helpers";

export default function Splash({ onResult }) {
  useEffect(() => {
    const saved = loadUser();
    const t = setTimeout(() => onResult(saved), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#060610", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit',sans-serif" }}>
      <div style={{ width: 70, height: 70, borderRadius: 22, background: "linear-gradient(135deg,#4FC3F7,#9575CD,#F48FB1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, marginBottom: 18, boxShadow: "0 8px 40px rgba(79,195,247,0.35)", animation: "logoFloat 2s ease-in-out infinite" }}>⚡</div>
      <h1 style={{ margin: 0, fontSize: 36, fontWeight: 800, letterSpacing: -1.5, background: "linear-gradient(135deg,#fff 30%,#9575CD)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>VibeZ</h1>
      <p style={{ margin: "8px 0 0", fontSize: 11, color: "#ffffff28", letterSpacing: 3 }}>FEEL · SEND · FORGET</p>
      <div style={{ display: "flex", gap: 6, marginTop: 36 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#ffffff33", animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );
}
