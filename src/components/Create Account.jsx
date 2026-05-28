import { useState } from "react";
import { MOODS } from "../constants/moods";
import { rndId, ISX } from "../utils/helpers";
import { saveUser } from "../utils/helpers";
import { Avatar, Btn } from "./UI";

export default function CreateAccount({ onDone }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [vid,  setVid]  = useState("");
  const [mood, setMood] = useState("chill");
  const [done, setDone] = useState(false);
  const m = MOODS[mood];

  const next = () => {
    if (step === 0) {
      if (!name.trim()) return;
      setVid(rndId()); setStep(1);
    } else if (step === 1) {
      if (!vid.startsWith("@") || vid.length < 4) return;
      setStep(2);
    } else {
      setDone(true);
      const u = { name: name.trim(), vibeId: vid, mood };
      saveUser(u);
      setTimeout(() => onDone(u), 1100);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#060610", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 28px", fontFamily: "'Outfit',sans-serif", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: "18%", left: "50%", transform: "translateX(-50%)", width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle,${m.color}10 0%,transparent 65%)`, pointerEvents: "none", transition: "background 1s" }} />

      <div style={{ marginBottom: 40, textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ width: 58, height: 58, borderRadius: 18, background: `linear-gradient(135deg,${m.color},${m.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 14px", boxShadow: `0 8px 32px ${m.color}44`, animation: "logoFloat 3s ease-in-out infinite", transition: "background 1s,box-shadow 1s" }}>⚡</div>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, letterSpacing: -1.5, background: `linear-gradient(135deg,#fff 30%,${m.color})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", transition: "background 1s" }}>VibeZ</h1>
        <p style={{ margin: "5px 0 0", fontSize: 11, color: "#ffffff28", letterSpacing: 3 }}>FEEL · SEND · FORGET</p>
      </div>

      {done ? (
        <div style={{ textAlign: "center", animation: "fadeUp .5s ease", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 50, marginBottom: 12, animation: "popIn .4s ease" }}>🎉</div>
          <p style={{ color: "#fff", fontSize: 19, fontWeight: 700, margin: 0 }}>Welcome, {name}!</p>
          <p style={{ color: m.color, fontSize: 13, marginTop: 6 }}>{vid}</p>
          <p style={{ color: "#ffffff44", fontSize: 11, marginTop: 4 }}>You're all set ✓</p>
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: 340, animation: "fadeUp .4s ease", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 30, justifyContent: "center" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ height: 3, borderRadius: 3, transition: "all .4s", width: i === step ? 32 : 10, background: i < step ? `${m.color}88` : i === step ? m.color : "#ffffff12" }} />
            ))}
          </div>

          {step === 0 && (
            <>
              <p style={{ color: "#ffffffaa", fontSize: 14, marginBottom: 5, textAlign: "center", fontWeight: 500 }}>What do people call you?</p>
              <p style={{ color: "#ffffff44", fontSize: 12, marginBottom: 18, textAlign: "center" }}>This shows in chats</p>
              <input value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && next()} placeholder="Your name…" autoFocus style={ISX(m.color)} />
              <Btn color={m.color} onClick={next} disabled={!name.trim()}>Continue →</Btn>
            </>
          )}

          {step === 1 && (
            <>
              <p style={{ color: "#ffffffaa", fontSize: 14, marginBottom: 4, textAlign: "center", fontWeight: 500 }}>Your Vibe ID</p>
              <p style={{ color: "#ffffff44", fontSize: 12, marginBottom: 16, textAlign: "center" }}>No phone number needed</p>
              <div style={{ position: "relative" }}>
                <input value={vid} onChange={e => setVid(e.target.value)} style={{ ...ISX(m.color), paddingRight: 48 }} />
                <button onClick={() => setVid(rndId())} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-56%)", background: "none", border: "none", color: m.color, cursor: "pointer", fontSize: 18, padding: 4 }}>↺</button>
              </div>
              <p style={{ color: "#ffffff28", fontSize: 11, marginBottom: 18, textAlign: "center" }}>Tap ↺ to regenerate · Must start with @</p>
              <Btn color={m.color} onClick={next} disabled={!vid.startsWith("@") || vid.length < 4}>Looks good →</Btn>
              <div style={{ marginTop: 9 }}><Btn color={m.color} onClick={() => setStep(0)} outline>← Back</Btn></div>
            </>
          )}

          {step === 2 && (
            <>
              <p style={{ color: "#ffffffaa", fontSize: 14, marginBottom: 18, textAlign: "center", fontWeight: 500 }}>Set your current mood</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                {Object.entries(MOODS).map(([k, v]) => (
                  <button key={k} onClick={() => setMood(k)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderRadius: 14, cursor: "pointer", background: mood === k ? `${v.color}14` : "rgba(255,255,255,0.03)", border: mood === k ? `1.5px solid ${v.color}77` : "1.5px solid rgba(255,255,255,0.06)", transition: "all .2s" }}>
                    <span style={{ fontSize: 22 }}>{v.emoji}</span>
                    <span style={{ color: mood === k ? v.color : "#ffffffaa", fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: mood === k ? 700 : 500 }}>{v.label}</span>
                    {mood === k && <div style={{ marginLeft: "auto", width: 7, height: 7, borderRadius: "50%", background: v.color }} />}
                  </button>
                ))}
              </div>
              <Btn color={m.color} onClick={next}>Enter VibeZ ⚡</Btn>
            </>
          )}
        </div>
      )}
    </div>
  );
}
