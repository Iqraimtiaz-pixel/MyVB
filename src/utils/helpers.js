// ─── Storage ─────────────────────────────────────────────────
let _user = null;
export const saveUser  = (u) => { _user = u; };
export const loadUser  = ()  => _user;
export const clearUser = ()  => { _user = null; };

// ─── Random Vibe ID Generator ─────────────────────────────────
const ADJ  = ["cosmic","neon","silky","vague","lunar","nova","astral","velvet","hazy","ether","prism","void","echo","ghost","pulse"];
const NOUN = ["soul","ray","bloom","drop","wave","spark","mist","drift","flare","haze","shade","flux","arc","node","rift"];
export const rndId = () =>
  "@" + ADJ[~~(Math.random() * ADJ.length)] + "_" + NOUN[~~(Math.random() * NOUN.length)] + (~~(Math.random() * 9000) + 1000);

// ─── Time Ago ─────────────────────────────────────────────────
export const ago = (ts) => {
  const d = Date.now() - ts;
  return d < 60000 ? "just now" : d < 3600000 ? ~~(d / 60000) + "m" : ~~(d / 3600000) + "h";
};

// ─── Score Label ─────────────────────────────────────────────
export const SCORE_LBL = (s) =>
  s >= 90 ? "Chaotic Duo 🔥" :
  s >= 75 ? "Cosmic Bond ✨" :
  s >= 55 ? "Warm Energy 💛" :
  s >= 35 ? "Warming Up 🌤️"  : "Dry Zone 🏜️";

// ─── Input Style Helper ───────────────────────────────────────
export const ISX = (c) => ({
  width: "100%",
  boxSizing: "border-box",
  background: "rgba(255,255,255,0.06)",
  border: `1.5px solid ${c}44`,
  borderRadius: 14,
  padding: "13px 16px",
  color: "#fff",
  fontSize: 15,
  fontFamily: "'Outfit',sans-serif",
  outline: "none",
  display: "block",
  marginBottom: 12,
});
