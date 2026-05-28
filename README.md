# VibeZ ⚡

> **Feel · Send · Forget** — A mood-based ephemeral messaging app

VibeZ is a React app where your mood shapes everything — the UI, colors, animated world backgrounds, voice auras, and even how typing indicators feel.

---

## ✨ Features

- 🌊 **Mood Worlds** — Every chat has a live Canvas-animated background (ocean, sunny, rain, cherry blossoms, volcano, moon)
- 💬 **Ephemeral Messages** — Set a TTL (5s / 30s / 60s) and messages self-destruct
- 🎤 **Voice Notes** — With per-mood aura animations (waves, sparks, glow)
- 💕 **Secret Reactions** — Double-tap any message for mood-specific hidden reactions
- 🔥 **Streaks & Vibe Scores** — Track connection energy with friends
- 👻 **Ghost Mode** — Hide your online status
- 🆔 **Anonymous Vibe IDs** — No phone number required

---

## 🗂 Project Structure

```
vibez/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Root component & routing
    ├── styles.css            # Global CSS & animations
    ├── constants/
    │   ├── moods.js          # MOODS, VOICE_AURA, SECRET_REACTS
    │   └── data.js           # UNIVERSE users, INIT_MSGS
    ├── utils/
    │   └── helpers.js        # saveUser, rndId, ago, SCORE_LBL, ISX
    └── components/
        ├── index.js          # Barrel exports
        ├── UI.jsx            # MoodAura, VoiceAura, Avatar, StreakBadge, Btn
        ├── MoodWorldCanvas.jsx  # Full animated Canvas world
        ├── Splash.jsx        # Splash / loading screen
        ├── CreateAccount.jsx # 3-step onboarding
        ├── Home.jsx          # Messages list
        └── screens.jsx       # Find, Requests, Profile, BottomNav, Chat, Bubbles
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 🛠 Tech Stack

- **React 18** + **Vite**
- **HTML Canvas** for animated mood worlds and auras
- **CSS animations** (no external animation library needed)
- Google Fonts — [Outfit](https://fonts.google.com/specimen/Outfit)

---

## 📱 Design

Designed as a mobile-first app (max-width 480px). Best experienced on a phone or in a narrow browser window.

---

## 📄 License

MIT
