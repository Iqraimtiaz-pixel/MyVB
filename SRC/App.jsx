import { useState } from "react";
import Splash from "./components/Splash";
import CreateAccount from "./components/CreateAccount";
import Home from "./components/Home";
import Find from "./components/Find";
import Requests from "./components/Requests";
import Profile from "./components/Profile";
import Chat from "./components/Chat";
import BottomNav from "./components/BottomNav";
import { MOODS } from "./constants/moods";
import { UNIVERSE, INIT_MSGS } from "./constants/data";
import { saveUser, loadUser, clearUser } from "./utils/storage";
import "./styles.css";

export default function VibeZ() {
  const [phase, setPhase] = useState("splash");
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("home");
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([
    {
      id: "req0",
      from: "@pulse_arc8812",
      to: null,
      senderName: "Blaze",
      senderVibeId: "@pulse_arc8812",
      senderMood: "angry",
      receiverName: "",
      receiverVibeId: "",
      receiverMood: "",
      ts: Date.now() - 3600000,
    },
  ]);
  const [pendingSent, setPendingSent] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const m = MOODS[user?.mood || "chill"];
  const incomingCount = requests.filter((r) => r.to === user?.vibeId).length;

  const onSplash = (saved) => {
    if (saved) {
      setUser(saved);
      setRequests((p) => p.map((r) => (r.to === null ? { ...r, to: saved.vibeId } : r)));
      setFriends([{ ...UNIVERSE[0], score: 89 }, { ...UNIVERSE[4], score: 74 }]);
      setPhase("app");
    } else {
      setPhase("create");
    }
  };

  const onCreate = (u) => {
    setUser(u);
    setRequests((p) => p.map((r) => (r.to === null ? { ...r, to: u.vibeId } : r)));
    setFriends([{ ...UNIVERSE[0], score: 89 }, { ...UNIVERSE[4], score: 74 }]);
    setPhase("app");
  };

  const onLogout = () => {
    clearUser();
    setUser(null);
    setFriends([]);
    setActiveChat(null);
    setTab("home");
    setPhase("create");
  };

  const onTab = (t) => {
    if (t === "home" && incomingCount > 0 && tab === "home") {
      setTab("requests");
      return;
    }
    setTab(t);
    setActiveChat(null);
  };

  const onSendReq = (p) => {
    setRequests((prev) => [
      ...prev,
      {
        id: "req" + Date.now(),
        from: user.vibeId,
        to: p.vibeId,
        senderName: user.name,
        senderVibeId: user.vibeId,
        senderMood: user.mood,
        receiverName: p.name,
        receiverVibeId: p.vibeId,
        receiverMood: p.mood,
        ts: Date.now(),
      },
    ]);
    setPendingSent((prev) => [...prev, p.id]);
  };

  const onAccept = (req) => {
    const f = UNIVERSE.find((u) => u.vibeId === req.senderVibeId);
    setFriends((p) => [
      ...p,
      f
        ? { ...f, score: 50 }
        : {
            id: req.id,
            name: req.senderName,
            vibeId: req.senderVibeId,
            mood: req.senderMood,
            avatar: req.senderName[0],
            streak: 0,
            score: 30,
            online: false,
            lastSeen: "now",
            mutual: 0,
          },
    ]);
    setRequests((p) => p.filter((r) => r.id !== req.id));
  };

  const onDecline = (req) => setRequests((p) => p.filter((r) => r.id !== req.id));

  if (phase === "splash") return <Splash onResult={onSplash} />;
  if (phase === "create") return <CreateAccount onDone={onCreate} />;

  if (activeChat) {
    const contact = friends.find((f) => f.id === activeChat);
    if (!contact) {
      setActiveChat(null);
      return null;
    }
    return (
      <div style={{ maxWidth: 480, margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative", background: "#000" }}>
        <Chat
          user={user}
          contact={contact}
          initMsgs={INIT_MSGS[activeChat] || []}
          onBack={() => setActiveChat(null)}
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", height: "100vh", background: m.bg, display: "flex", flexDirection: "column", overflow: "hidden", transition: "background 1.1s ease" }}>
      <div style={{ position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, height: 180, background: `radial-gradient(ellipse at 50% -10%,${m.color}12 0%,transparent 70%)`, pointerEvents: "none", zIndex: 0, transition: "background 1.1s" }} />
      <div style={{ flex: 1, overflowY: "auto", position: "relative", zIndex: 1 }}>
        {tab === "home" && (
          <Home
            user={user}
            friends={friends}
            requests={requests}
            onOpenChat={(c) => setActiveChat(c.id)}
            onGoFind={() => setTab("find")}
            onGoRequests={() => setTab("requests")}
          />
        )}
        {tab === "find" && (
          <Find
            user={user}
            friends={friends}
            pendingSent={pendingSent}
            onSendRequest={onSendReq}
            onBack={() => setTab("home")}
          />
        )}
        {tab === "requests" && (
          <Requests
            user={user}
            requests={requests}
            onAccept={onAccept}
            onDecline={onDecline}
            onBack={() => setTab("home")}
          />
        )}
        {tab === "profile" && (
          <Profile
            user={user}
            onChangeMood={(mood) => {
              const u = { ...user, mood };
              setUser(u);
              saveUser(u);
            }}
            onLogout={onLogout}
          />
        )}
      </div>
      <BottomNav
        tab={tab === "requests" ? "home" : tab}
        onTab={onTab}
        color={m.color}
        reqCount={incomingCount}
      />
    </div>
  );
}
