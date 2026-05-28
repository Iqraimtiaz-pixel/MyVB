import { useEffect, useRef } from "react";
import { MOODS, VOICE_AURA } from "../constants/moods";

// â”€â”€â”€ Mood Aura (avatar ring) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function MoodAura({ mood, size }) {
  const ref = useRef();
  const m   = MOODS[mood] || MOODS.chill;

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const W = size * 2, H = size * 2, cx = W / 2, cy = H / 2;
    c.width = W; c.height = H;
    let t = 0, raf;

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 3; i > 0; i--) {
        const r = size * .75 * (i / 3) + Math.sin(t * .035 + i) * 4;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, m.color + "3a");
        g.addColorStop(1, m.color + "00");
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      }
      t++; raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [mood, size]);

  return (
    <canvas ref={ref} style={{
      position: "absolute", top: "50%", left: "50%",
      transform: "translate(-50%,-50%)",
      width: size * 2, height: size * 2, pointerEvents: "none",
    }} />
  );
}

// â”€â”€â”€ Voice Aura â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function VoiceAura({ mood, active, size }) {
  const ref  = useRef();
  const tRef = useRef(0);
  const aura = VOICE_AURA[mood] || VOICE_AURA.chill;

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const W = size * 2, H = size * 2, cx = W / 2, cy = H / 2;
    c.width = W; c.height = H;
    let raf;

    const loop = () => {
      const t = tRef.current++;
      ctx.clearRect(0, 0, W, H);

      if (aura.type === "waves") {
        for (let i = 0; i < 5; i++) {
          const r = size * .35 + Math.sin(t * .04 + i * (Math.PI * 2 / 5)) * 14 * (active ? 1 : .3);
          const g = ctx.createRadialGradient(cx, cy, r * .2, cx, cy, r);
          g.addColorStop(0, aura.color + "55"); g.addColorStop(1, aura.color + "00");
          ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        }
      } else if (aura.type === "sparks") {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * .55);
        g.addColorStop(0, aura.color + "33"); g.addColorStop(1, aura.color + "00");
        ctx.beginPath(); ctx.arc(cx, cy, size * .55, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        if (active) {
          for (let i = 0; i < 12; i++) {
            const ang = t * .06 + i * (Math.PI * 2 / 12);
            const d   = size * .38 + Math.sin(t * .08 + i * 1.3) * size * .18;
            ctx.beginPath(); ctx.arc(cx + Math.cos(ang) * d, cy + Math.sin(ang) * d, 2 + Math.sin(t * .1 + i) * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = aura.color + "cc"; ctx.fill();
          }
        }
      } else {
        const pulse = active ? 0.5 + Math.sin(t * .05) * .5 : .15;
        for (let i = 3; i > 0; i--) {
          const r = size * (.2 + i * .12) * (active ? 1 + Math.sin(t * .04 + i) * .12 : .7);
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
          g.addColorStop(0, aura.color + Math.floor(pulse * 80).toString(16).padStart(2, "0"));
          g.addColorStop(1, aura.color + "00");
          ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [mood, active, size]);

  return (
    <canvas ref={ref} style={{
      position: "absolute", top: "50%", left: "50%",
      transform: "translate(-50%,-50%)", width: size, height: size, pointerEvents: "none",
    }} />
  );
}

// â”€â”€â”€ Avatar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function Avatar({ letter, mood, size = 44, aura = false, pulse = false }) {
  const m = MOODS[mood] || MOODS.chill;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      {aura && <MoodAura mood={mood} size={size} />}
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: `radial-gradient(circle at 35% 30%,${m.color}ee,${m.color}66)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: size * .38, fontWeight: 800, color: "#fff",
        fontFamily: "'Outfit',sans-serif",
        boxShadow: pulse ? `0 0 0 2px ${m.color},0 0 20px ${m.color}66` : `0 0 0 1.5px ${m.color}55`,
        position: "relative", zIndex: 1,
        animation: pulse ? "avPulse 2.4s ease-in-out infinite" : "none",
      }}>{letter}</div>
    </div>
  );
}

// â”€â”€â”€ Streak Badge â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function StreakBadge({ count }) {
  if (!count) return null;
  const hot = count >= 7;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 3,
      padding: "2px 7px", borderRadius: 10,
      background: hot ? "rgba(255,100,0,0.18)" : "rgba(255,255,255,0.07)",
      border: hot ? "1px solid rgba(255,100,0,0.4)" : "1px solid rgba(255,255,255,0.1)",
      fontSize: 11, fontFamily: "'Outfit',sans-serif", fontWeight: 700,
      color: hot ? "#FF7043" : "#ffffff77",
    }}>
      {hot ? "ðŸ”¥" : "âš¡"} {count}d
    </div>
  );
}

// â”€â”€â”€ Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function Btn({ children, color, onClick, disabled, outline }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: "100%", padding: "14px", borderRadius: 14,
      border: outline ? `1.5px solid ${color}55` : "none",
      background: disabled ? "rgba(255,255,255,0.05)" : outline ? "transparent" : `linear-gradient(135deg,${color},${color}aa)`,
      color: disabled ? "#ffffff22" : outline ? color : "#000",
      fontSize: 14, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "'Outfit',sans-serif", letterSpacing: .3,
      boxShadow: disabled || outline ? "none" : `0 4px 24px ${color}44`,
      transition: "all .2s",
    }}>{children}</button>
  );
}
