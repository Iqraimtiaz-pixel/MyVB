export const MOODS = {
  chill: {
    emoji: "🌊", label: "Chill", color: "#4FC3F7",
    bg: "#06111e", dim: "rgba(79,195,247,0.08)",
    world: { skyTop: "#020c16", skyBot: "#0a2540", glowColor: "#1565a0", scene: "ocean", ptType: "bubbles", accent: "#4FC3F7" }
  },
  happy: {
    emoji: "✨", label: "Happy", color: "#FFD54F",
    bg: "#120e00", dim: "rgba(255,213,79,0.08)",
    world: { skyTop: "#1a0d00", skyBot: "#4a3000", glowColor: "#d4830a", scene: "sunny", ptType: "sparkles", accent: "#FFD54F" }
  },
  sad: {
    emoji: "🌧️", label: "Sad", color: "#7986CB",
    bg: "#0a0c1a", dim: "rgba(121,134,203,0.08)",
    world: { skyTop: "#060812", skyBot: "#131828", glowColor: "#2e3a7a", scene: "rain", ptType: "rain", accent: "#7986CB" }
  },
  romantic: {
    emoji: "💕", label: "Romantic", color: "#F48FB1",
    bg: "#130010", dim: "rgba(244,143,177,0.08)",
    world: { skyTop: "#0d000a", skyBot: "#2a0022", glowColor: "#7a0040", scene: "cherry", ptType: "petals", accent: "#F48FB1" }
  },
  angry: {
    emoji: "🔥", label: "Angry", color: "#FF7043",
    bg: "#130600", dim: "rgba(255,112,67,0.08)",
    world: { skyTop: "#110000", skyBot: "#3a0a00", glowColor: "#aa1a00", scene: "volcano", ptType: "embers", accent: "#FF7043" }
  },
  lonely: {
    emoji: "🌙", label: "Lonely", color: "#9575CD",
    bg: "#080011", dim: "rgba(149,117,205,0.08)",
    world: { skyTop: "#03000a", skyBot: "#0d0018", glowColor: "#2d1060", scene: "moon", ptType: "stars", accent: "#9575CD" }
  },
};

export const VOICE_AURA = {
  chill:    { type: "waves",  label: "Blue Waves",      color: "#4FC3F7" },
  happy:    { type: "sparks", label: "Electric Sparks", color: "#FFD54F" },
  sad:      { type: "glow",   label: "Pastel Glow",     color: "#7986CB" },
  romantic: { type: "glow",   label: "Pastel Glow",     color: "#F48FB1" },
  angry:    { type: "sparks", label: "Electric Sparks", color: "#FF7043" },
  lonely:   { type: "waves",  label: "Blue Waves",      color: "#9575CD" },
};

export const SECRET_REACTS = {
  chill:    [{ e: "🌊", l: "Big chill" }, { e: "✌️", l: "Peace" }, { e: "😌", l: "Calm" }, { e: "💎", l: "Rare" }, { e: "🎵", l: "Vibe" }],
  happy:    [{ e: "✨", l: "Shine" }, { e: "💛", l: "Warmth" }, { e: "🤩", l: "Obsessed" }, { e: "🥳", l: "Party" }, { e: "🌟", l: "Star" }],
  sad:      [{ e: "💙", l: "I feel u" }, { e: "🌧️", l: "Same" }, { e: "🤍", l: "Gentle" }, { e: "😢", l: "💔" }, { e: "🫂", l: "Hug" }],
  angry:    [{ e: "🔥", l: "Burning" }, { e: "💢", l: "Ugh" }, { e: "😤", l: "Same" }, { e: "❗", l: "Facts" }, { e: "👊", l: "Felt" }],
  romantic: [{ e: "💕", l: "Soft" }, { e: "🥺", l: "Aww" }, { e: "💋", l: "Kiss" }, { e: "🌹", l: "Rose" }, { e: "😍", l: "Omg" }],
  lonely:   [{ e: "🌙", l: "Midnight" }, { e: "😶", l: "Silence" }, { e: "👻", l: "Ghost" }, { e: "🫂", l: "Miss u" }, { e: "🤍", l: "Softly" }],
};
