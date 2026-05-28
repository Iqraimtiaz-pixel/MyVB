// â”€â”€â”€ FIND â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
import { useState, useEffect, useRef } from "react";
import { MOODS, VOICE_AURA, SECRET_REACTS } from "../constants/moods";
import { UNIVERSE } from "../constants/data";
import { ago, SCORE_LBL, ISX } from "../utils/helpers";
import { Avatar, StreakBadge, VoiceAura } from "./UI";
import MoodWorldCanvas from "./MoodWorldCanvas";

export function Find({ user, friends, pendingSent, onSendRequest, onBack }) {
  const [search, setSearch] = useState("");
  const [sent, setSent] = useState(pendingSent);
  const m = MOODS[user.mood];

  const filtered = UNIVERSE.filter(p =>
    !friends.find(f => f.id === p.id) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.vibeId.toLowerCase().includes(search.toLowerCase()))
  );

  const send = (p) => { setSent(s => [...s, p.id]); onSendRequest(p); };

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 90 }}>
      <div style={{ padding: "52px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 11, background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>â†</button>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "'Outfit',sans-serif", letterSpacing: -.7 }}>Find People</h2>
      </div>
      <div style={{ padding: "0 20px 18px" }}>
        <div style={{ position: "relative" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or @vibe_idâ€¦" autoFocus style={{ ...ISX(m.color), paddingLeft: 42, marginBottom: 0 }} />
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#ffffff40", fontSize: 15 }}>ðŸ”</span>
        </div>
        <p style={{ margin: "9px 0 0", fontSize: 11, color: "#ffffff35", textAlign: "center", fontFamily: "'Outfit',sans-serif" }}>Requests expire in 24 hours</p>
      </div>
      <div style={{ padding: "0 14px", display: "flex", flexDirection: "column", gap: 6 }}>
        {filtered.length === 0 && search && (
          <div style={{ textAlign: "center", padding: "44px 0", color: "#ffffff30", fontFamily: "'Outfit',sans-serif" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>ðŸ”</div>
            <p style={{ fontSize: 13 }}>No one found</p>
          </div>
        )}
        {filtered.map((p, i) => {
          const pm = MOODS[p.mood] || MOODS.chill;
          const isSent = sent.includes(p.id);
          return (
            <div key={p.id} style={{ display: "flex", gap: 13, alignItems: "center", padding: "13px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.055)", animation: `fadeUp .3s ease ${i * .07}s both` }}>
              <Avatar letter={p.avatar} mood={p.mood} size={48} aura={p.online} pulse={p.online} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ fontWeight: 700, color: "#fff", fontSize: 14, fontFamily: "'Outfit',sans-serif" }}>{p.name}</span>
                  <StreakBadge count={p.streak} />
                </div>
                <p style={{ margin: "3px 0 0", fontSize: 11.5, color: pm.color, fontFamily: "'Outfit',sans-serif", fontWeight: 500 }}>{p.vibeId}</p>
                {p.mutual > 0 && <p style={{ margin: "2px 0 0", fontSize: 10.5, color: "#ffffff40", fontFamily: "'Outfit',sans-serif" }}>{p.mutual} mutual</p>}
              </div>
              <button onClick={() => !isSent && send(p)} style={{ padding: "9px 18px", borderRadius: 22, flexShrink: 0, background: isSent ? "rgba(255,255,255,0.05)" : `${pm.color}22`, border: isSent ? "1.5px solid rgba(255,255,255,0.08)" : `1.5px solid ${pm.color}66`, color: isSent ? "#ffffff44" : pm.color, fontSize: 12.5, fontWeight: 700, cursor: isSent ? "default" : "pointer", fontFamily: "'Outfit',sans-serif", transition: "all .2s" }}>
                {isSent ? "Sent âœ“" : "Add +"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// â”€â”€â”€ REQUESTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function Requests({ user, requests, onAccept, onDecline, onBack }) {
  const incoming = requests.filter(r => r.to === user.vibeId);
  const outgoing = requests.filter(r => r.from === user.vibeId);

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 90 }}>
      <div style={{ padding: "52px 20px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 11, background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>â†</button>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "'Outfit',sans-serif", letterSpacing: -.7 }}>Requests</h2>
      </div>

      {incoming.length > 0 && (
        <div style={{ padding: "0 14px 24px" }}>
          <p style={{ fontSize: 10.5, color: "#ffffff40", fontFamily: "'Outfit',sans-serif", letterSpacing: 1.5, marginBottom: 12, paddingLeft: 4 }}>INCOMING</p>
          {incoming.map((req, i) => {
            const rm = MOODS[req.senderMood] || MOODS.chill;
            const exp = Math.max(0, 24 - ~~((Date.now() - req.ts) / 3600000));
            return (
              <div key={req.id} style={{ padding: "15px", borderRadius: 18, background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)", marginBottom: 10, animation: `fadeUp .3s ease ${i * .08}s both` }}>
                <div style={{ display: "flex", gap: 13, alignItems: "center", marginBottom: 12 }}>
                  <Avatar letter={req.senderName[0]} mood={req.senderMood} size={50} aura />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 700, color: "#fff", fontSize: 15, fontFamily: "'Outfit',sans-serif" }}>{req.senderName}</span>
                    <p style={{ margin: "3px 0 0", fontSize: 12, color: rm.color, fontFamily: "'Outfit',sans-serif", fontWeight: 500 }}>{req.senderVibeId}</p>
                    <p style={{ margin: "4px 0 0", fontSize: 11, color: "#ffffff44", fontFamily: "'Outfit',sans-serif" }}>{rm.emoji} {rm.label} Â· expires {exp}h</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => onAccept(req)} style={{ flex: 1, padding: "10px", borderRadius: 12, border: "none", background: `linear-gradient(135deg,${rm.color},${rm.color}99)`, color: "#000", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Accept</button>
                  <button onClick={() => onDecline(req)} style={{ flex: 1, padding: "10px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.08)", color: "#ffffff66", fontSize: 13, cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontWeight: 500 }}>Decline</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {outgoing.length > 0 && (
        <div style={{ padding: "0 14px" }}>
          <p style={{ fontSize: 10.5, color: "#ffffff40", fontFamily: "'Outfit',sans-serif", letterSpacing: 1.5, marginBottom: 12, paddingLeft: 4 }}>SENT</p>
          {outgoing.map((req, i) => {
            const rm = MOODS[req.receiverMood] || MOODS.chill;
            return (
              <div key={req.id} style={{ display: "flex", gap: 13, alignItems: "center", padding: "12px", borderRadius: 14, background: "rgba(255,255,255,0.025)", marginBottom: 8, border: "1.5px solid rgba(255,255,255,0.04)", animation: `fadeUp .3s ease ${i * .08}s both` }}>
                <Avatar letter={req.receiverName[0]} mood={req.receiverMood} size={42} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 600, color: "#ffffffaa", fontSize: 13, fontFamily: "'Outfit',sans-serif" }}>{req.receiverName}</span>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: rm.color, fontFamily: "'Outfit',sans-serif" }}>{req.receiverVibeId}</p>
                </div>
                <span style={{ fontSize: 11, color: "#ffffff30", fontFamily: "'Outfit',sans-serif" }}>Pendingâ€¦</span>
              </div>
            );
          })}
        </div>
      )}

      {incoming.length === 0 && outgoing.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 30px", fontFamily: "'Outfit',sans-serif" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>ðŸ“­</div>
          <p style={{ fontSize: 14, color: "#ffffff55" }}>No requests right now</p>
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€ PROFILE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function Profile({ user, onChangeMood, onLogout }) {
  const m = MOODS[user.mood];
  const [ghost, setGhost] = useState(false);
  const [readR, setReadR] = useState(true);
  const [showMoods, setShowMoods] = useState(false);

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 90 }}>
      <div style={{ padding: "52px 22px 20px" }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "'Outfit',sans-serif", letterSpacing: -.7 }}>Profile</h2>
      </div>

      <div style={{ margin: "0 16px 18px", padding: "24px 20px", borderRadius: 20, background: `linear-gradient(135deg,${m.dim},rgba(255,255,255,0.025))`, border: `1.5px solid ${m.color}33`, display: "flex", flexDirection: "column", alignItems: "center", gap: 13, animation: "fadeUp .4s ease" }}>
        <div style={{ position: "relative" }}>
          <Avatar letter={user.name[0]} mood={user.mood} size={72} aura />
          <button onClick={() => setShowMoods(p => !p)} style={{ position: "absolute", bottom: -3, right: -3, zIndex: 2, background: m.color, borderRadius: "50%", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, cursor: "pointer", border: "none", boxShadow: `0 2px 10px ${m.color}66` }}>{m.emoji}</button>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "'Outfit',sans-serif" }}>{user.name}</p>
          <p style={{ margin: "5px 0 0", fontSize: 13, color: m.color, fontFamily: "'Outfit',sans-serif", fontWeight: 500 }}>{user.vibeId}</p>
        </div>
        <div style={{ padding: "6px 14px", borderRadius: 20, background: `${m.color}18`, border: `1.5px solid ${m.color}44`, fontSize: 12, color: m.color, fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}>{m.emoji} {m.label} mood</div>
      </div>

      {showMoods && (
        <div style={{ margin: "0 16px 18px", padding: "16px", borderRadius: 18, background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.07)", animation: "fadeUp .25s ease" }}>
          <p style={{ margin: "0 0 11px", fontSize: 10.5, color: "#ffffff40", fontFamily: "'Outfit',sans-serif", letterSpacing: 1.5, fontWeight: 600 }}>CHANGE MOOD</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {Object.entries(MOODS).map(([k, v]) => (
              <button key={k} onClick={() => { onChangeMood(k); setShowMoods(false); }} style={{ padding: "8px 15px", borderRadius: 22, border: "none", background: user.mood === k ? `${v.color}cc` : `${v.color}15`, color: user.mood === k ? "#000" : v.color, fontSize: 13, cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontWeight: 600, transition: "all .2s" }}>{v.emoji} {v.label}</button>
            ))}
          </div>
        </div>
      )}

      <div style={{ margin: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { icon: "ðŸ‘»", label: "Ghost Mode", sub: "Hide your online status", val: ghost, set: setGhost },
          { icon: "ðŸ‘", label: "Read Receipts", sub: "Show when you've seen messages", val: readR, set: setReadR },
        ].map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 15px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: 19 }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: "#ffffffdd", fontFamily: "'Outfit',sans-serif" }}>{s.label}</p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "#ffffff44", fontFamily: "'Outfit',sans-serif" }}>{s.sub}</p>
            </div>
            <div onClick={() => s.set(v => !v)} style={{ width: 46, height: 25, borderRadius: 13, background: s.val ? m.color : "rgba(255,255,255,0.1)", position: "relative", cursor: "pointer", transition: "background .3s", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: 3, left: s.val ? 24 : 3, width: 19, height: 19, borderRadius: "50%", background: "#fff", transition: "left .25s", boxShadow: "0 1px 5px rgba(0,0,0,0.5)" }} />
            </div>
          </div>
        ))}
        <button onClick={onLogout} style={{ padding: "14px 15px", borderRadius: 16, background: "rgba(255,60,60,0.07)", border: "1.5px solid rgba(255,60,60,0.2)", color: "#ff6666", cursor: "pointer", fontSize: 13.5, fontWeight: 600, fontFamily: "'Outfit',sans-serif", display: "flex", alignItems: "center", gap: 10, transition: "background .2s" }}
          onMouseDown={e => e.currentTarget.style.background = "rgba(255,60,60,0.14)"}
          onMouseUp={e => e.currentTarget.style.background = "rgba(255,60,60,0.07)"}
        >
          <span style={{ fontSize: 18 }}>ðŸšª</span>
          <div style={{ flex: 1, textAlign: "left" }}>
            <p style={{ margin: 0 }}>Log Out</p>
            <p style={{ margin: "2px 0 0", fontSize: 11, color: "#ffffff44", fontWeight: 400 }}>You'll need to create ID again</p>
          </div>
        </button>
      </div>
    </div>
  );
}

// â”€â”€â”€ BOTTOM NAV â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function BottomNav({ tab, onTab, color, reqCount }) {
  const [pressed, setPressed] = useState(null);
  const TABS = [{ id: "home", icon: "ðŸ’¬", label: "Chats" }, { id: "find", icon: "ðŸ”", label: "Find" }, { id: "profile", icon: "ðŸ‘¤", label: "Profile" }];

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 480, margin: "0 auto", background: "rgba(6,6,16,0.97)", backdropFilter: "blur(28px)", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-around", padding: "11px 0 26px", zIndex: 100 }}>
      {TABS.map(t => {
        const isActive = tab === t.id;
        return (
          <button key={t.id} onClick={() => onTab(t.id)} onMouseDown={() => setPressed(t.id)} onMouseUp={() => setPressed(null)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", position: "relative", padding: "4px 20px", transform: pressed === t.id ? "scale(.88)" : isActive ? "scale(1.04)" : "scale(1)", transition: "transform .18s cubic-bezier(.34,1.56,.64,1)" }}>
            {isActive && <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 44, height: 44, borderRadius: "50%", background: `${color}15`, animation: "navGlow 2s ease-in-out infinite" }} />}
            <span style={{ fontSize: isActive ? 22 : 20, filter: isActive ? `drop-shadow(0 0 6px ${color})` : "none", transition: "all .25s", position: "relative", zIndex: 1 }}>{t.icon}</span>
            <span style={{ fontSize: 10.5, fontFamily: "'Outfit',sans-serif", fontWeight: isActive ? 700 : 400, color: isActive ? color : "#ffffff44", transition: "color .25s", position: "relative", zIndex: 1 }}>{t.label}</span>
            {isActive && <div style={{ position: "absolute", bottom: -11, left: "50%", transform: "translateX(-50%)", width: 20, height: 3, borderRadius: 2, background: color, animation: "navLine .25s ease" }} />}
            {t.id === "home" && reqCount > 0 && <div style={{ position: "absolute", top: 0, right: 8, width: 17, height: 17, borderRadius: "50%", background: color, color: "#000", fontSize: 9.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .3s ease" }}>{reqCount}</div>}
          </button>
        );
      })}
    </div>
  );
}

// â”€â”€â”€ VOICE BUBBLE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function VoiceBubble({ msg, mood, isSelf }) {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed]   = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed]   = useState(0);
  const ivRef = useRef();
  const m   = MOODS[mood] || MOODS.chill;
  const dur = msg.duration || 8;
  const BARS = [3,5,8,6,9,4,7,5,8,6,4,7,5,9,6,4,8,5,7,3,6,9,4,7,5];

  const toggle = () => {
    if (played && !isSelf) return;
    if (playing) { clearInterval(ivRef.current); setPlaying(false); }
    else {
      setPlaying(true); setElapsed(0); setProgress(0);
      ivRef.current = setInterval(() => {
        setElapsed(e => {
          const n = +(e + 0.1).toFixed(1);
          setProgress(n / dur);
          if (n >= dur) { clearInterval(ivRef.current); setPlaying(false); setPlayed(true); }
          return n;
        });
      }, 100);
    }
  };
  useEffect(() => () => clearInterval(ivRef.current), []);

  return (
    <div style={{ maxWidth: 240, padding: "12px 14px", borderRadius: isSelf ? "18px 18px 5px 18px" : "18px 18px 18px 5px", background: isSelf ? `linear-gradient(135deg,${m.color}ee,${m.color}99)` : "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", border: isSelf ? "none" : "1px solid rgba(255,255,255,0.15)", boxShadow: isSelf ? `0 2px 18px ${m.color}44` : "none", position: "relative", overflow: "visible" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 180, height: 180, pointerEvents: "none", zIndex: 0, opacity: playing ? 1 : 0.35, transition: "opacity .4s" }}>
        <VoiceAura mood={mood} active={playing} size={90} />
      </div>
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={toggle} style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: isSelf ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.15)", border: "none", cursor: played && !isSelf ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: isSelf ? "#000" : "#fff", opacity: played && !isSelf ? 0.45 : 1, transition: "transform .15s" }}
          onMouseDown={e => e.currentTarget.style.transform = "scale(.9)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
        >{playing ? "â¸" : "â–¶"}</button>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 2, height: 32 }}>
          {BARS.map((h, i) => <div key={i} style={{ width: 3, borderRadius: 3, flexShrink: 0, height: `${h * 3}px`, background: progress > i / BARS.length ? (isSelf ? "rgba(0,0,0,0.55)" : m.color) : (isSelf ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)"), transition: "background .1s" }} />)}
        </div>
        <span style={{ fontSize: 10.5, flexShrink: 0, fontFamily: "'Outfit',sans-serif", color: isSelf ? "rgba(0,0,0,0.55)" : "#ffffffaa", fontWeight: 600 }}>{playing ? elapsed.toFixed(1) + "s" : dur + "s"}</span>
      </div>
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 4, marginTop: 7 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: isSelf ? "rgba(0,0,0,0.4)" : m.color, animation: playing ? "avPulse 1s infinite" : "none" }} />
        <span style={{ fontSize: 10, fontFamily: "'Outfit',sans-serif", color: isSelf ? "rgba(0,0,0,0.45)" : "#ffffffaa", fontStyle: "italic" }}>{played && !isSelf ? "ðŸ”’ played once" : (VOICE_AURA[mood]?.label || "Voice") + " note"}</span>
      </div>
    </div>
  );
}

// â”€â”€â”€ TEXT BUBBLE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function TextBubble({ msg, userMood, contactMood, onDelete }) {
  const isSelf = msg.from === "me";
  const mood   = isSelf ? userMood : contactMood;
  const m      = MOODS[mood] || MOODS.chill;
  const [ttlLeft, setTtlLeft] = useState(msg.ttl);
  const [gone, setGone]       = useState(false);
  const [react, setReact]     = useState(null);
  const [reactLabel, setReactLabel] = useState(null);
  const [showReacts, setShowReacts] = useState(false);
  const reacts = SECRET_REACTS[mood] || SECRET_REACTS.chill;

  useEffect(() => {
    if (!msg.ttl) return;
    const iv = setInterval(() => {
      setTtlLeft(c => {
        if (c <= 1) { clearInterval(iv); setGone(true); setTimeout(() => onDelete(msg.id), 450); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  if (gone) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: isSelf ? "flex-end" : "flex-start", opacity: gone ? 0 : 1, transform: gone ? "scale(.85)" : "scale(1)", transition: "opacity .4s,transform .4s" }}>
      <div onDoubleClick={() => setShowReacts(p => !p)} style={{ maxWidth: "73%", padding: "11px 15px", cursor: "pointer", borderRadius: isSelf ? "18px 18px 5px 18px" : "18px 18px 18px 5px", background: isSelf ? `linear-gradient(135deg,${m.color}ee,${m.color}99)` : "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", border: isSelf ? "none" : "1px solid rgba(255,255,255,0.15)", boxShadow: isSelf ? `0 2px 18px ${m.color}44` : "none", transition: "transform .1s" }}
        onMouseDown={e => e.currentTarget.style.transform = "scale(.97)"}
        onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
      >
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: isSelf ? "#000" : "#fff", fontFamily: "'Outfit',sans-serif", fontWeight: isSelf ? 500 : 400 }}>{msg.text}</p>
        {msg.ttl && (
          <div style={{ marginTop: 7, display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ flex: 1, height: 2, background: "rgba(0,0,0,0.18)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(ttlLeft / msg.ttl) * 100}%`, background: isSelf ? "rgba(0,0,0,0.35)" : m.color, transition: "width 1s linear", borderRadius: 2 }} />
            </div>
            <span style={{ fontSize: 10, color: isSelf ? "rgba(0,0,0,0.5)" : m.color, fontWeight: 600 }}>{ttlLeft}s</span>
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4, flexDirection: isSelf ? "row-reverse" : "row" }}>
        <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.4)", fontFamily: "'Outfit',sans-serif" }}>{ago(msg.ts)}</span>
        {isSelf && <span style={{ fontSize: 10, color: msg.seen ? m.color : "rgba(255,255,255,0.3)", fontWeight: 700 }}>{msg.seen ? "âœ“âœ“" : "âœ“"}</span>}
        {react && <div style={{ display: "flex", alignItems: "center", gap: 3, padding: "1px 7px", borderRadius: 10, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.15)", animation: "popIn .2s ease" }}><span style={{ fontSize: 13 }}>{react}</span>{reactLabel && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontFamily: "'Outfit',sans-serif" }}>{reactLabel}</span>}</div>}
      </div>
      {showReacts && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "10px 12px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(20px)", borderRadius: 16, border: "1.5px solid rgba(255,255,255,0.15)", marginTop: 7, animation: "popIn .18s ease", maxWidth: 240 }}>
          <p style={{ width: "100%", margin: "0 0 7px", fontSize: 10, color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit',sans-serif", letterSpacing: 1, fontWeight: 600 }}>SECRET REACTIONS</p>
          {reacts.map(r => (
            <button key={r.e} onClick={() => { setReact(r.e); setReactLabel(r.l); setShowReacts(false); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "8px 10px", borderRadius: 11, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer" }}
              onMouseDown={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
              onMouseUp={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
            >
              <span style={{ fontSize: 20 }}>{r.e}</span>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", fontFamily: "'Outfit',sans-serif", whiteSpace: "nowrap" }}>{r.l}</span>
            </button>
          ))}
          {isSelf && <button onClick={() => { onDelete(msg.id); setShowReacts(false); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "8px 10px", borderRadius: 11, background: "rgba(255,60,60,0.15)", border: "1px solid rgba(255,60,60,0.25)", cursor: "pointer" }}><span style={{ fontSize: 18 }}>ðŸ—‘</span><span style={{ fontSize: 9, color: "#ff8888", fontFamily: "'Outfit',sans-serif" }}>Delete</span></button>}
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€ TYPING BUBBLE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function TypingBubble({ mood }) {
  const m = MOODS[mood] || MOODS.chill;
  const LABELS = { chill: "chilling and typingâ€¦", happy: "typing happilyâ€¦", sad: "feeling somethingâ€¦", angry: "typing intenselyâ€¦", romantic: "typing softlyâ€¦", lonely: "finally typingâ€¦" };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 15px", borderRadius: "18px 18px 18px 5px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.15)", width: "fit-content" }}>
      <div style={{ display: "flex", gap: 3 }}>
        {[0, 1, 2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: m.color, animation: "bounce 1.2s infinite", animationDelay: `${i * .18}s` }} />)}
      </div>
      <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit',sans-serif", fontStyle: "italic" }}>{LABELS[mood] || "typingâ€¦"}</span>
    </div>
  );
}

// â”€â”€â”€ CHAT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function Chat({ user, contact, initMsgs, onBack }) {
  const [msgs, setMsgs]       = useState(initMsgs || []);
  const [text, setText]       = useState("");
  const [ttl, setTtl]         = useState(null);
  const [showTtl, setShowTtl] = useState(false);
  const [typing, setTyping]   = useState(false);
  const [recording, setRecording] = useState(false);
  const [recSecs, setRecSecs]     = useState(0);
  const recRef = useRef();
  const endRef = useRef();
  const cm = MOODS[contact.mood] || MOODS.chill;
  const um = MOODS[user.mood]    || MOODS.chill;

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const REPLIES = {
    chill:    ["lowkey ðŸŒŠ", "facts âœŒï¸", "vibe fr"],
    happy:    ["omg yesss âœ¨", "literally same ðŸ’›", "you're the best!!"],
    sad:      ["i feel that ðŸ’™", "same honestly...", "ðŸŒ§ï¸"],
    angry:    ["BRO ðŸ’¢", "exactly ðŸ”¥", "ugh."],
    romantic: ["ðŸ’•", "you're so cute", "stoppp ðŸ¥º"],
    lonely:   ["...", "yeah ðŸŒ™", "just us i guess"],
  };

  const simReply = () => {
    setTimeout(() => setTyping(true), 500);
    const arr = REPLIES[contact.mood] || REPLIES.chill;
    setTimeout(() => {
      setTyping(false);
      setMsgs(p => [...p, { id: "m" + Date.now(), text: arr[~~(Math.random() * arr.length)], from: "them", ts: Date.now(), seen: false, ttl: null, kind: "text" }]);
    }, 1800 + Math.random() * 700);
  };

  const sendText = () => {
    if (!text.trim()) return;
    setMsgs(p => [...p, { id: "m" + Date.now(), text: text.trim(), from: "me", ts: Date.now(), seen: false, ttl, kind: "text" }]);
    setText(""); simReply();
  };

  const startRec = () => { setRecording(true); setRecSecs(0); recRef.current = setInterval(() => setRecSecs(s => s + 1), 1000); };
  const sendVoice = () => {
    clearInterval(recRef.current);
    const dur = Math.max(1, recSecs);
    setRecording(false); setRecSecs(0);
    setMsgs(p => [...p, { id: "m" + Date.now(), text: "", from: "me", ts: Date.now(), seen: false, ttl: null, kind: "voice", duration: dur }]);
    setTimeout(() => setTyping(true), 800);
    setTimeout(() => {
      setTyping(false);
      setMsgs(p => [...p, { id: "m" + Date.now(), text: "", from: "them", ts: Date.now(), seen: false, ttl: null, kind: "voice", duration: ~~(Math.random() * 6) + 3 }]);
    }, 2400);
  };
  const cancelRec = () => { clearInterval(recRef.current); setRecording(false); setRecSecs(0); };
  const delMsg = (id) => setMsgs(p => p.filter(m => m.id !== id));

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, position: "relative" }}>
      {/* World background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <MoodWorldCanvas mood={contact.mood} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)", zIndex: 1 }} />
      </div>

      {/* Header */}
      <div style={{ position: "relative", zIndex: 10, padding: "50px 16px 13px", background: "rgba(0,0,0,0.35)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `1px solid ${cm.color}30`, display: "flex", gap: 13, alignItems: "center", flexShrink: 0 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 11, background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.18)", color: "#fff", fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" }}>â†</button>
        <Avatar letter={contact.avatar} mood={contact.mood} size={42} aura={contact.online} pulse={contact.online} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontWeight: 700, color: "#fff", fontSize: 15, fontFamily: "'Outfit',sans-serif", textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>{contact.name}</span>
            <StreakBadge count={contact.streak} />
          </div>
          <p style={{ margin: "2px 0 0", fontSize: 11.5, color: cm.color, fontFamily: "'Outfit',sans-serif", fontWeight: 500 }}>{contact.online ? "active now" : contact.lastSeen} Â· {cm.emoji} {cm.label}</p>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: cm.color, fontFamily: "'Outfit',sans-serif" }}>âš¡{contact.score}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit',sans-serif" }}>{SCORE_LBL(contact.score)}</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10, position: "relative", zIndex: 5 }}>
        {msgs.length === 0 && !typing && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, minHeight: 200 }}>
            <span style={{ fontSize: 44, filter: `drop-shadow(0 0 20px ${cm.color})` }}>{cm.emoji}</span>
            <p style={{ fontSize: 14, margin: 0, color: "rgba(255,255,255,0.7)", fontFamily: "'Outfit',sans-serif", textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>Say somethingâ€¦</p>
            <p style={{ fontSize: 12, margin: 0, color: "rgba(255,255,255,0.35)", fontFamily: "'Outfit',sans-serif" }}>It'll disappear anyway ðŸ‘»</p>
          </div>
        )}
        {msgs.map(msg =>
          msg.kind === "voice" ? (
            <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.from === "me" ? "flex-end" : "flex-start", gap: 4 }}>
              <VoiceBubble msg={msg} mood={msg.from === "me" ? user.mood : contact.mood} isSelf={msg.from === "me"} />
              <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.4)", fontFamily: "'Outfit',sans-serif" }}>{ago(msg.ts)}</span>
            </div>
          ) : (
            <TextBubble key={msg.id} msg={msg} userMood={user.mood} contactMood={contact.mood} onDelete={delMsg} />
          )
        )}
        {typing && <TypingBubble mood={contact.mood} />}
        <div ref={endRef} />
      </div>

      {/* TTL strip */}
      {showTtl && (
        <div style={{ display: "flex", gap: 7, padding: "10px 14px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.1)", overflowX: "auto", flexShrink: 0, position: "relative", zIndex: 10 }}>
          {[null, 5, 30, 60, "reply"].map(t => (
            <button key={String(t)} onClick={() => { setTtl(t); setShowTtl(false); }} style={{ padding: "7px 15px", borderRadius: 22, border: "none", flexShrink: 0, background: ttl === t ? `${cm.color}cc` : `${cm.color}22`, color: ttl === t ? "#000" : cm.color, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit',sans-serif", transition: "all .2s" }}>
              {t === null ? "â™¾ï¸ Keep" : t === "reply" ? "â†© On reply" : `â± ${t}s`}
            </button>
          ))}
        </div>
      )}

      {/* Recording bar */}
      {recording && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.1)", flexShrink: 0, position: "relative", zIndex: 10 }}>
          <div style={{ position: "relative", width: 44, height: 44, flexShrink: 0 }}>
            <VoiceAura mood={user.mood} active={true} size={22} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 14, height: 14, borderRadius: "50%", background: um.color, zIndex: 1, animation: "avPulse 1s infinite" }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 13, color: um.color, fontFamily: "'Outfit',sans-serif", fontWeight: 700 }}>Recordingâ€¦ {recSecs}s</p>
            <p style={{ margin: "2px 0 0", fontSize: 10.5, color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit',sans-serif", fontStyle: "italic" }}>{VOICE_AURA[user.mood]?.label} aura active</p>
          </div>
          <button onClick={cancelRec} style={{ background: "rgba(255,60,60,0.2)", border: "1px solid rgba(255,60,60,0.4)", color: "#ff8888", borderRadius: 10, padding: "7px 12px", cursor: "pointer", fontSize: 12, fontFamily: "'Outfit',sans-serif" }}>Cancel</button>
          <button onClick={sendVoice} style={{ background: `linear-gradient(135deg,${um.color},${um.color}99)`, border: "none", color: "#000", borderRadius: 10, padding: "7px 14px", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "'Outfit',sans-serif", boxShadow: `0 3px 14px ${um.color}44` }}>Send ðŸŽ¤</button>
        </div>
      )}

      {/* Input bar */}
      {!recording && (
        <div style={{ display: "flex", gap: 9, alignItems: "center", padding: "10px 14px 28px", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderTop: "1px solid rgba(255,255,255,0.1)", flexShrink: 0, position: "relative", zIndex: 10 }}>
          <button onClick={() => setShowTtl(p => !p)} style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: ttl != null ? `${cm.color}30` : "rgba(255,255,255,0.1)", border: ttl != null ? `1.5px solid ${cm.color}66` : "1.5px solid rgba(255,255,255,0.15)", color: ttl != null ? cm.color : "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 17, transition: "all .2s" }}>â±</button>
          <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && sendText()}
            placeholder={`${cm.emoji} Send a ${cm.label.toLowerCase()} vibeâ€¦`}
            style={{ flex: 1, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", border: `1.5px solid ${cm.color}33`, borderRadius: 22, padding: "11px 16px", color: "#fff", fontSize: 14, fontFamily: "'Outfit',sans-serif", outline: "none", transition: "border-color .2s" }}
            onFocus={e => e.target.style.borderColor = `${cm.color}88`}
            onBlur={e => e.target.style.borderColor = `${cm.color}33`}
          />
          {!text && <button onMouseDown={startRec} style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: `${um.color}30`, border: `1.5px solid ${um.color}66`, color: um.color, cursor: "pointer", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>ðŸŽ¤</button>}
          {text && <button onClick={sendText} style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: `linear-gradient(135deg,${um.color},${um.color}99)`, border: "none", color: "#000", cursor: "pointer", fontSize: 18, boxShadow: `0 4px 18px ${um.color}55`, transition: "all .22s" }}>â†‘</button>}
        </div>
      )}
    </div>
  );
}
