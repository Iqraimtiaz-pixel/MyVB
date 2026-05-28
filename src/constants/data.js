export const UNIVERSE = [
  { id: "u1", name: "Nova",  vibeId: "@cosmic_ray2847",  mood: "chill",    avatar: "N", mutual: 2, streak: 7,  online: true,  lastSeen: "now",    score: 89 },
  { id: "u2", name: "Ryzen", vibeId: "@neon_drift5521",  mood: "romantic", avatar: "R", mutual: 0, streak: 3,  online: false, lastSeen: "2m ago", score: 56 },
  { id: "u3", name: "Echo",  vibeId: "@void_flare3390",  mood: "lonely",   avatar: "E", mutual: 1, streak: 0,  online: true,  lastSeen: "now",    score: 38 },
  { id: "u4", name: "Blaze", vibeId: "@pulse_arc8812",   mood: "angry",    avatar: "B", mutual: 3, streak: 21, online: false, lastSeen: "5m ago", score: 95 },
  { id: "u5", name: "Lumii", vibeId: "@lunar_bloom1177", mood: "happy",    avatar: "L", mutual: 1, streak: 14, online: true,  lastSeen: "now",    score: 74 },
];

export const INIT_MSGS = {
  u1: [
    { id: "m1", text: "yo the chill is real ðŸŒŠ", from: "them", ts: Date.now() - 200000, seen: true,  ttl: null, kind: "text" },
    { id: "m2", text: "honestly same vibe rn",   from: "me",   ts: Date.now() - 180000, seen: true,  ttl: null, kind: "text" },
    { id: "m3", text: "this disappears in 60s ðŸ‘€", from: "them", ts: Date.now() - 20000,  seen: false, ttl: 60,   kind: "text" },
  ],
  u2: [{ id: "m4", text: "thinking about you ðŸ’•",     from: "them", ts: Date.now() - 500000, seen: true, ttl: null, kind: "text" }],
  u4: [{ id: "m5", text: "bro we are CHAOTIC ðŸ˜­ðŸ”¥",  from: "them", ts: Date.now() - 900000, seen: true, ttl: null, kind: "text" }],
  u5: [{ id: "m6", text: "HII âœ¨âœ¨",                  from: "them", ts: Date.now() - 45000,  seen: false, ttl: null, kind: "text" }],
};
