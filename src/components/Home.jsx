import { MOODS } from "../constants/moods";
import { INIT_MSGS } from "../constants/data";
import { ago, SCORE_LBL } from "../utils/helpers";
import { Avatar, StreakBadge } from "./UI";

export default function Home({ user, friends, requests, onOpenChat, onGoFind, onGoRequests }) {
  const m = MOODS[user.mood];
  const reqCount = requests.filter(r => r.to === user.vibeId).length;

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 90 }}>
      {/* Header */}
      <div style={{ padding: "52px 22px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#fff", fontFamily: "'Outfit',sans-serif", letterSpacing: -.8 }}>Messages</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: m.color, animation: "avPulse 2s infinite" }} />
            <span style={{ fontSize: 12, color: m.color, fontFamily: "'Outfit',sans-serif", fontWeight: 500 }}>{user.vibeId}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
          {reqCount > 0 && (
            <button onClick={onGoRequests} style={{ position: "relative", width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.1)", cursor: "pointer", color: "#fff", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
              ðŸ””<span style={{ position: "absolute", top: -5, right: -5, background: m.color, color: "#000", fontSize: 10, fontWeight: 800, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{reqCount}</span>
            </button>
          )}
          <button onClick={onGoFind} style={{ height: 40, padding: "0 18px", borderRadius: 12, background: `linear-gradient(135deg,${m.color},${m.color}99)`, border: "none", cursor: "pointer", color: "#000", fontSize: 13, fontFamily: "'Outfit',sans-serif", fontWeight: 700, boxShadow: `0 4px 18px ${m.color}44`, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 15 }}>+</span> Add
          </button>
        </div>
      </div>

      {/* Streak banner */}
      <div style={{ margin: "0 18px 18px", padding: "13px 16px", borderRadius: 16, background: "rgba(255,112,0,0.10)", border: "1.5px solid rgba(255,112,0,0.22)", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 22 }}>ðŸ”¥</span>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#FF9060", fontFamily: "'Outfit',sans-serif" }}>Daily Vibe Streak</p>
          <p style={{ margin: "2px 0 0", fontSize: 11, color: "#ffffff44", fontFamily: "'Outfit',sans-serif" }}>Message someone to keep it alive</p>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#FF7043", fontFamily: "'Outfit',sans-serif" }}>1d</div>
      </div>

      {/* Friend list or empty state */}
      {friends.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px 30px", fontFamily: "'Outfit',sans-serif" }}>
          <div style={{ fontSize: 44, marginBottom: 14 }}>ðŸ‘»</div>
          <p style={{ fontSize: 15, color: "#ffffff99", margin: 0, fontWeight: 600 }}>No chats yet</p>
          <p style={{ fontSize: 12, color: "#ffffff33", marginTop: 6 }}>Find people by Vibe ID</p>
          <button onClick={onGoFind} style={{ marginTop: 22, padding: "11px 28px", borderRadius: 12, background: `${m.color}20`, border: `1.5px solid ${m.color}55`, color: m.color, cursor: "pointer", fontSize: 13, fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}>Find someone â†’</button>
        </div>
      ) : (
        <div style={{ padding: "0 14px", display: "flex", flexDirection: "column", gap: 4 }}>
          {friends.map((f, i) => {
            const fm = MOODS[f.mood] || MOODS.chill;
            const msgs = INIT_MSGS[f.id] || [];
            const last = msgs[msgs.length - 1];
            const unread = msgs.filter(x => !x.seen && x.from === "them").length;
            return (
              <div key={f.id} onClick={() => onOpenChat(f)}
                style={{ display: "flex", gap: 14, alignItems: "center", padding: "13px 12px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.055)", cursor: "pointer", animation: `fadeUp .35s ease ${i * .07}s both`, transition: "background .15s,transform .12s" }}
                onMouseDown={e => { e.currentTarget.style.background = "rgba(255,255,255,0.065)"; e.currentTarget.style.transform = "scale(.985)"; }}
                onMouseUp={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                <div style={{ position: "relative" }}>
                  <Avatar letter={f.avatar} mood={f.mood} size={50} aura={f.online} pulse={f.online} />
                  {f.online && <div style={{ position: "absolute", bottom: 1, right: 1, zIndex: 2, width: 11, height: 11, borderRadius: "50%", background: "#4CAF50", border: "2px solid #06111e" }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ fontWeight: 700, color: "#fff", fontSize: 14.5, fontFamily: "'Outfit',sans-serif" }}>{f.name}</span>
                      <StreakBadge count={f.streak} />
                    </div>
                    <span style={{ fontSize: 11, color: "#ffffff44", flexShrink: 0 }}>{last ? ago(last.ts) : ""}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: fm.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 11.5, color: fm.color, fontFamily: "'Outfit',sans-serif", fontWeight: 500 }}>{fm.label}</span>
                    <span style={{ color: "#ffffff18", fontSize: 11 }}>Â·</span>
                    <span style={{ fontSize: 10.5, color: "#ffffff44", fontFamily: "'Outfit',sans-serif" }}>âš¡{f.score} {SCORE_LBL(f.score)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
                    <p style={{ margin: 0, fontSize: 12.5, color: unread ? "#ffffffbb" : "#ffffff44", fontFamily: "'Outfit',sans-serif", fontWeight: unread ? 500 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 200 }}>
                      {last ? (last.kind === "voice" ? "ðŸŽ¤ Voice note" : (last.from === "me" ? "You: " : "") + last.text) : "Say something ðŸ‘‹"}
                    </p>
                    {unread > 0 && <div style={{ minWidth: 20, height: 20, borderRadius: 10, background: fm.color, color: "#000", fontSize: 10.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px", flexShrink: 0, fontFamily: "'Outfit',sans-serif" }}>{unread}</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
