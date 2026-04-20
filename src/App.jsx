

import { useState, useEffect, useRef } from "react";
 
// ─── Styles ────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@200;300;400&display=swap');
 
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
 
  :root {
    --gold: #d4af37;
    --gold-light: #f0d060;
    --gold-dim: rgba(212,175,55,0.25);
    --green-deep: #0a2a1e;
    --green-mid: #0f3d2e;
    --green-bright: #1a4a35;
    --cream: #f5f0e6;
    --cream-dim: rgba(245,240,230,0.65);
    --cream-faint: rgba(245,240,230,0.25);
    --border: rgba(212,175,55,0.35);
    --font-display: 'Cormorant Garamond', Georgia, serif;
    --font-ui: 'Josefin Sans', sans-serif;
  }
 
  html, body, #root { height: 100%; }
 
  body {
    background: var(--green-deep);
    font-family: var(--font-ui);
    color: var(--cream);
    overflow-x: hidden;
  }
 
  .app-wrap {
    min-height: 100vh;
    background:
      radial-gradient(ellipse at 20% 10%, rgba(212,175,55,0.08) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 90%, rgba(212,175,55,0.06) 0%, transparent 50%),
      linear-gradient(160deg, #0a2a1e 0%, #0f3d2e 50%, #081f16 100%);
    position: relative;
  }
 
  /* ── Particles ── */
  .particle {
    position: fixed;
    border-radius: 50%;
    background: var(--gold);
    pointer-events: none;
    animation: floatUp linear infinite;
    z-index: 0;
  }
  @keyframes floatUp {
    0%   { transform: translateY(110vh) scale(0); opacity: 0; }
    10%  { opacity: 1; transform: translateY(90vh) scale(1); }
    90%  { opacity: 0.6; }
    100% { transform: translateY(-10vh) scale(0.5); opacity: 0; }
  }
 
  /* ── Screens ── */
  .screen {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 20px;
    position: relative;
    z-index: 1;
    text-align: center;
  }
 
  /* ── Entry ── */
  .entry-card {
    background: rgba(15,61,46,0.55);
    border: 1.5px solid var(--border);
    border-radius: 28px;
    padding: 56px 44px 48px;
    max-width: 420px;
    width: 100%;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(20px);
    box-shadow:
      0 0 0 1px rgba(212,175,55,0.08),
      0 40px 80px rgba(0,0,0,0.5),
      inset 0 1px 0 rgba(212,175,55,0.2);
  }
  .entry-card::before {
    content: '';
    position: absolute;
    inset: -50%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg 60deg,
      rgba(212,175,55,0.04) 60deg 120deg,
      transparent 120deg 180deg,
      rgba(212,175,55,0.04) 180deg 240deg,
      transparent 240deg 300deg,
      rgba(212,175,55,0.04) 300deg 360deg
    );
    animation: spinSlow 12s linear infinite;
    pointer-events: none;
  }
  @keyframes spinSlow { to { transform: rotate(360deg); } }
 
  .corner {
    position: absolute;
    width: 32px; height: 32px;
    border-color: rgba(212,175,55,0.5);
    border-style: solid;
    border-width: 0;
  }
  .corner.tl { top: 14px; left: 14px; border-top-width: 1.5px; border-left-width: 1.5px; }
  .corner.tr { top: 14px; right: 14px; border-top-width: 1.5px; border-right-width: 1.5px; }
  .corner.bl { bottom: 14px; left: 14px; border-bottom-width: 1.5px; border-left-width: 1.5px; }
  .corner.br { bottom: 14px; right: 14px; border-bottom-width: 1.5px; border-right-width: 1.5px; }
 
  .crescent-icon {
    font-size: 56px;
    display: block;
    animation: pulse 3s ease-in-out infinite;
    position: relative;
    z-index: 1;
  }
  @keyframes pulse {
    0%, 100% { text-shadow: 0 0 12px rgba(212,175,55,0.4); }
    50%       { text-shadow: 0 0 36px rgba(212,175,55,0.9), 0 0 60px rgba(212,175,55,0.4); }
  }
 
  .eyebrow {
    font-family: var(--font-ui);
    font-weight: 200;
    font-size: 10px;
    letter-spacing: 6px;
    color: rgba(212,175,55,0.8);
    text-transform: uppercase;
    margin-bottom: 6px;
    position: relative; z-index: 1;
  }
  .ornament {
    color: var(--gold);
    letter-spacing: 8px;
    font-size: 14px;
    margin: 12px 0;
    opacity: 0.7;
    position: relative; z-index: 1;
  }
 
  .couple-display {
    font-family: var(--font-display);
    font-size: 2.6rem;
    font-weight: 300;
    color: #fff;
    line-height: 1.15;
    position: relative; z-index: 1;
  }
  .couple-display em {
    font-style: italic;
    color: var(--gold);
    font-size: 1.1rem;
    display: block;
    font-weight: 300;
  }
 
  .bismillah {
    font-family: var(--font-display);
    font-size: 13px;
    font-style: italic;
    color: var(--cream-dim);
    margin-top: 10px;
    position: relative; z-index: 1;
  }
 
  /* ── Buttons ── */
  .btn-gold {
    background: linear-gradient(135deg, var(--gold) 0%, #b8922a 100%);
    color: var(--green-deep);
    border: none;
    border-radius: 100px;
    padding: 15px 52px;
    font-family: var(--font-ui);
    font-weight: 400;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    z-index: 1;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    margin-top: 28px;
  }
  .btn-gold::after {
    content: '';
    position: absolute;
    top: 0; left: -120%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
    animation: sheen 2.8s ease-in-out infinite;
  }
  @keyframes sheen { to { left: 200%; } }
  .btn-gold:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(212,175,55,0.45); }
  .btn-gold:active { transform: translateY(-1px); }
 
  .btn-outline {
    background: transparent;
    color: var(--gold);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 13px 40px;
    font-family: var(--font-ui);
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    cursor: pointer;
    margin-top: 14px;
    transition: all 0.2s;
  }
  .btn-outline:hover { background: var(--gold-dim); border-color: var(--gold); }
 
  /* ── Fade-slide animation ── */
  .fade-in {
    animation: fadeSlideUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0); }
  }
 
  /* ── Section headings ── */
  .section-eyebrow {
    font-family: var(--font-ui);
    font-weight: 200;
    font-size: 10px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: rgba(212,175,55,0.7);
    margin-bottom: 6px;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: 3rem;
    font-weight: 300;
    color: var(--gold);
    line-height: 1.1;
    margin-bottom: 4px;
  }
 
  /* ── Countdown ── */
  .countdown-row {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    justify-content: center;
    margin: 28px 0;
  }
  .count-card {
    background: rgba(212,175,55,0.06);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 22px 26px;
    min-width: 88px;
    transition: transform 0.25s;
  }
  .count-card:hover { transform: translateY(-6px) rotateX(6deg); }
  .count-num {
    font-family: var(--font-display);
    font-size: 3rem;
    font-weight: 300;
    color: var(--gold-light);
    display: block;
    line-height: 1;
  }
  .count-lbl {
    font-family: var(--font-ui);
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--cream-dim);
    margin-top: 6px;
  }
 
  /* ── Info card ── */
  .info-card {
    background: rgba(15,61,46,0.45);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 26px 28px;
    max-width: 360px;
    width: 100%;
    margin: 14px 0;
    backdrop-filter: blur(12px);
  }
  .info-card h3 {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 400;
    color: #fff;
    margin-bottom: 6px;
  }
  .info-card p {
    font-size: 13px;
    color: var(--cream-dim);
    line-height: 1.7;
  }
 
  /* ── Map / action links ── */
  .action-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(212,175,55,0.12);
    border: 1px solid rgba(212,175,55,0.4);
    color: var(--gold);
    border-radius: 100px;
    padding: 10px 24px;
    font-family: var(--font-ui);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
    margin-top: 14px;
  }
  .action-link:hover { background: rgba(212,175,55,0.22); transform: translateY(-2px); }
 
  /* ── Schedule row ── */
  .schedule-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    font-size: 13px;
    border-bottom: 0.5px solid rgba(255,255,255,0.07);
  }
  .schedule-row:last-child { border-bottom: none; }
  .schedule-row span:last-child { color: var(--gold); font-weight: 300; letter-spacing: 1px; }
 
  /* ── RSVP ── */
  .rsvp-row { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin: 24px 0; }
  .rsvp-yes {
    background: linear-gradient(135deg, var(--gold), #b8922a);
    color: var(--green-deep);
    border: none;
    border-radius: 100px;
    padding: 16px 36px;
    font-family: var(--font-ui);
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .rsvp-yes:hover { transform: scale(1.05); box-shadow: 0 10px 32px rgba(212,175,55,0.45); }
  .rsvp-no {
    background: transparent;
    color: var(--cream-dim);
    border: 1px solid rgba(245,240,230,0.25);
    border-radius: 100px;
    padding: 16px 36px;
    font-family: var(--font-ui);
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
  }
  .rsvp-no:hover { border-color: rgba(245,240,230,0.5); }
 
  .rsvp-resp {
    background: rgba(212,175,55,0.08);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 20px 28px;
    max-width: 320px;
    animation: fadeSlideUp 0.4s ease;
    margin: 4px 0;
  }
  .rsvp-resp h3 {
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: var(--gold);
    font-weight: 400;
  }
  .rsvp-resp p { font-size: 13px; color: var(--cream-dim); margin-top: 6px; line-height: 1.6; }
 
  /* ── Guest counter ── */
  .guest-row { display: flex; align-items: center; gap: 36px; margin: 28px 0; }
  .counter-btn {
    width: 54px; height: 54px;
    border-radius: 50%;
    background: rgba(212,175,55,0.1);
    border: 1px solid var(--border);
    color: var(--gold);
    font-size: 22px;
    cursor: pointer;
    transition: all 0.2s;
    font-family: var(--font-display);
  }
  .counter-btn:hover { background: rgba(212,175,55,0.25); transform: scale(1.12); }
  .guest-num {
    font-family: var(--font-display);
    font-size: 4.5rem;
    font-weight: 300;
    color: var(--gold-light);
    min-width: 70px;
    display: block;
  }
  .guest-note { font-size: 12px; color: var(--cream-dim); letter-spacing: 1px; }
 
  /* ── Final ── */
  .final-dua {
    background: rgba(212,175,55,0.06);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 26px 30px;
    max-width: 380px;
    font-family: var(--font-display);
    font-style: italic;
    font-size: 1.1rem;
    color: var(--cream-dim);
    line-height: 1.9;
    margin: 20px 0;
  }
  .final-dua strong { color: var(--gold); font-style: normal; font-weight: 400; }
 
  .wa-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #25d366;
    color: #fff;
    border: none;
    border-radius: 100px;
    padding: 15px 38px;
    font-family: var(--font-ui);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 12px;
  }
  .wa-btn:hover { background: #1da851; transform: translateY(-3px); box-shadow: 0 10px 28px rgba(37,211,102,0.4); }
 
  /* ── Progress dots ── */
  .dots { display: flex; gap: 8px; justify-content: center; margin-top: 32px; }
  .dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: rgba(212,175,55,0.2);
    transition: all 0.35s;
  }
  .dot.on { background: var(--gold); transform: scale(1.4); }
 
  /* ── Confetti ── */
  .confetti {
    position: fixed;
    top: -10px;
    width: 8px; height: 8px;
    border-radius: 2px;
    pointer-events: none;
    animation: fall linear forwards;
    z-index: 999;
  }
  @keyframes fall {
    to { transform: translateY(110vh) rotate(720deg); opacity: 0; }
  }
 
  /* ── Quote line ── */
  .quran-quote {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 13px;
    color: rgba(212,175,55,0.6);
    max-width: 300px;
    line-height: 1.7;
    margin-top: 14px;
  }
 
  @media (max-width: 480px) {
    .couple-display { font-size: 2rem; }
    .section-title { font-size: 2.2rem; }
    .count-num { font-size: 2.4rem; }
    .entry-card { padding: 40px 22px 36px; }
    .count-card { padding: 18px 18px; min-width: 76px; }
  }
`;
 
// ─── Particles ─────────────────────────────────────────────────────────────
function Particles() {
  const pts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 2 + Math.random() * 4,
    dur: 9 + Math.random() * 14,
    delay: Math.random() * 12,
    opacity: 0.15 + Math.random() * 0.35,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {pts.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
 
// ─── Confetti ───────────────────────────────────────────────────────────────
function Confetti({ active }) {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    if (!active) return;
    const colors = ["#d4af37", "#f0d060", "#ffffff", "#a8d5a2", "#ffd700"];
    const arr = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      dur: 1.4 + Math.random() * 1.2,
      delay: Math.random() * 0.8,
      size: 6 + Math.random() * 6,
      round: Math.random() > 0.5,
    }));
    setPieces(arr);
    const t = setTimeout(() => setPieces([]), 4000);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti"
          style={{
            left: `${p.left}%`,
            background: p.color,
            width: p.size,
            height: p.size,
            borderRadius: p.round ? "50%" : "2px",
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}
 
// ─── Dots ───────────────────────────────────────────────────────────────────
function Dots({ current, total }) {
  return (
    <div className="dots">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={`dot${i === current ? " on" : ""}`} />
      ))}
    </div>
  );
}
 
// ─── Countdown ─────────────────────────────────────────────────────────────
function useCountdown(targetDate) {
  const calc = () => {
    const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}
 
// ─── WhatsApp share ─────────────────────────────────────────────────────────
function shareWhatsApp() {
  const text = encodeURIComponent(
    "🌙 *You're Invited!*\n\n" +
    "Bismillahir Rahmanir Raheem\n\n" +
    "With the blessings of Allah ﷻ, we joyfully invite you to the Nikah of\n\n" +
    "*Aneef Rahman & Fathima Aysha*\n\n" +
    "📅 *Friday, 15 May 2026 — 10:30 AM*\n" +
    "📍 *Masjidul Huda Auditorium, Vaikom, Kerala*\n\n" +
    "Your presence and duas mean the world to us 💛\n\n" +
    "🗺 https://maps.google.com/?q=Masjidul+Huda+Vaikom+Kerala"
  );
  window.open("https://wa.me/?text=" + text, "_blank");
}
 
// ─── Main App ───────────────────────────────────────────────────────────────
export default function NikahInvitation() {
  const [step, setStep] = useState(0);
  const [rsvp, setRsvp] = useState(null);
  const [guests, setGuests] = useState(2);
  const [confetti, setConfetti] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const countdown = useCountdown("2026-05-15T10:30:00");
  const TOTAL = 7;
 
  const goTo = (n) => {
    setStep(n);
    setAnimKey((k) => k + 1);
    if (n === 6) setTimeout(() => setConfetti(true), 200);
    else setConfetti(false);
  };
 
  const handleRsvp = (val) => {
    setRsvp(val);
  };
 
  const changeGuests = (d) => setGuests((g) => Math.max(1, g + d));
 
  return (
    <>
      <style>{css}</style>
      <div className="app-wrap">
        <Particles />
        <Confetti active={confetti} />
 
        {/* ── STEP 0: Entry ── */}
        {step === 0 && (
          <div className="screen fade-in" key="s0">
            <div className="entry-card">
              <div className="corner tl" /><div className="corner tr" />
              <div className="corner bl" /><div className="corner br" />
              <span className="crescent-icon">☽</span>
              <p className="eyebrow" style={{ marginTop: 16 }}>Exclusive Invitation</p>
              <div className="ornament">✦ ✦ ✦</div>
              <h1 className="couple-display">
                Aneef Rahman
                <em>&amp;</em>
                Fathima Aysha
              </h1>
              <div className="ornament" style={{ fontSize: 12, letterSpacing: 6 }}>❀ ❀ ❀</div>
              <p className="bismillah">Bismillahir Rahmanir Raheem</p>
              <p className="bismillah" style={{ marginTop: 4 }}>With the blessings of Allah ﷻ</p>
              <button className="btn-gold" onClick={() => goTo(1)}>✉ Open Invitation</button>
            </div>
          </div>
        )}
 
        {/* ── STEP 1: Hero ── */}
        {step === 1 && (
          <div className="screen fade-in" key={`s1-${animKey}`}>
            <p className="section-eyebrow">Nikah Ceremony</p>
            <h2 className="section-title" style={{ fontSize: "2.8rem" }}>Aneef Rahman</h2>
            <p style={{ fontSize: 13, color: "rgba(212,175,55,0.7)", marginBottom: 6 }}>Son of Mr. &amp; Mrs. Abdul Rahman</p>
            <div className="ornament" style={{ fontSize: 26, margin: "10px 0" }}>♥</div>
            <h2 className="section-title" style={{ fontSize: "2.8rem" }}>Fathima Aysha</h2>
            <p style={{ fontSize: 13, color: "rgba(212,175,55,0.7)" }}>Daughter of Mr. &amp; Mrs. Mohammed</p>
            <div className="ornament" style={{ marginTop: 20 }}>✦ ✦ ✦</div>
            <p className="quran-quote">"And He created between you love and mercy."<br />— Quran 30:21</p>
            <button className="btn-gold" onClick={() => goTo(2)}>View Date &amp; Time →</button>
            <Dots current={1} total={TOTAL} />
          </div>
        )}
 
        {/* ── STEP 2: Date + Countdown ── */}
        {step === 2 && (
          <div className="screen fade-in" key={`s2-${animKey}`}>
            <p className="section-eyebrow">Mark Your Calendar</p>
            <h2 className="section-title">Nikah Date</h2>
            <div className="info-card" style={{ marginTop: 12 }}>
              <h3 style={{ fontSize: "2rem" }}>15 May 2026</h3>
              <p style={{ color: "rgba(212,175,55,0.8)", letterSpacing: 2, fontSize: 12, marginTop: 6 }}>FRIDAY · 10:30 AM</p>
            </div>
            <p className="section-eyebrow" style={{ marginTop: 24 }}>Insha Allah — Time Remaining</p>
            <div className="countdown-row">
              {[["days", "Days"], ["hours", "Hours"], ["minutes", "Mins"]].map(([k, lbl]) => (
                <div className="count-card" key={k}>
                  <span className="count-num">{countdown[k]}</span>
                  <div className="count-lbl">{lbl}</div>
                </div>
              ))}
            </div>
            <button className="btn-gold" onClick={() => goTo(3)}>View Venue →</button>
            <Dots current={2} total={TOTAL} />
          </div>
        )}
 
        {/* ── STEP 3: Venue ── */}
        {step === 3 && (
          <div className="screen fade-in" key={`s3-${animKey}`}>
            <p className="section-eyebrow">Join Us At</p>
            <h2 className="section-title">Venue</h2>
            <div className="info-card">
              <div style={{ fontSize: 36, marginBottom: 12 }}>🕌</div>
              <h3>Masjidul Huda Auditorium</h3>
              <p>Vaikom, Kottayam District<br />Kerala, India — 686141</p>
              <a
                className="action-link"
                href="https://maps.google.com/?q=Masjidul+Huda+Vaikom+Kerala"
                target="_blank"
                rel="noopener noreferrer"
              >
                📍 Open in Google Maps
              </a>
            </div>
            <div className="info-card" style={{ marginTop: 0 }}>
              <p className="section-eyebrow" style={{ marginBottom: 10 }}>Programme</p>
              <div className="schedule-row">
                <span>Nikah Ceremony</span>
                <span>10:30 AM</span>
              </div>
              <div className="schedule-row">
                <span>Walima Reception</span>
                <span>12:30 PM</span>
              </div>
            </div>
            <button className="btn-gold" onClick={() => goTo(4)}>RSVP →</button>
            <Dots current={3} total={TOTAL} />
          </div>
        )}
 
        {/* ── STEP 4: RSVP ── */}
        {step === 4 && (
          <div className="screen fade-in" key={`s4-${animKey}`}>
            <p className="section-eyebrow">Your Presence</p>
            <h2 className="section-title">Will You Join Us?</h2>
            <p style={{ fontSize: 13, color: "var(--cream-dim)", maxWidth: 280, marginBottom: 8 }}>
              Your presence will make this occasion truly blessed
            </p>
            <div className="rsvp-row">
              <button className="rsvp-yes" onClick={() => handleRsvp("yes")}>😊 Yes, I'll Attend</button>
              <button className="rsvp-no" onClick={() => handleRsvp("no")}>😢 Regretfully No</button>
            </div>
            {rsvp === "yes" && (
              <div className="rsvp-resp">
                <h3>Masha Allah! ❤️</h3>
                <p>We are overjoyed! May Allah bless your journey to us.</p>
              </div>
            )}
            {rsvp === "no" && (
              <div className="rsvp-resp">
                <h3>We Understand 🤲</h3>
                <p>You will be missed. Please remember us in your duas. Jazakallah Khair.</p>
              </div>
            )}
            <button className="btn-gold" onClick={() => goTo(5)}>Continue →</button>
            <Dots current={4} total={TOTAL} />
          </div>
        )}
 
        {/* ── STEP 5: Guest Count ── */}
        {step === 5 && (
          <div className="screen fade-in" key={`s5-${animKey}`}>
            <p className="section-eyebrow">Help Us Prepare</p>
            <h2 className="section-title">Number of Guests</h2>
            <p style={{ fontSize: 12, color: "var(--cream-dim)", letterSpacing: 1 }}>Including yourself</p>
            <div className="guest-row">
              <button className="counter-btn" onClick={() => changeGuests(-1)}>−</button>
              <span className="guest-num">{guests}</span>
              <button className="counter-btn" onClick={() => changeGuests(1)}>+</button>
            </div>
            <p className="guest-note">
              {guests} {guests === 1 ? "guest" : "guests"} attending Insha Allah
            </p>
            <button className="btn-gold" onClick={() => goTo(6)} style={{ marginTop: 32 }}>Confirm →</button>
            <Dots current={5} total={TOTAL} />
          </div>
        )}
 
        {/* ── STEP 6: Final ── */}
        {step === 6 && (
          <div className="screen fade-in" key={`s6-${animKey}`}>
            <span style={{ fontSize: 52, animation: "pulse 3s ease-in-out infinite", display: "block" }}>♥</span>
            <p className="section-eyebrow" style={{ marginTop: 12 }}>Jazakallah Khair</p>
            <h2 className="section-title">Thank You</h2>
            <div className="final-dua">
              Your love, presence, and duas will make our Nikah day truly special.<br /><br />
              May Allah bless this union and fill our homes with love, mercy, and barakah.<br /><br />
              <strong>— Aneef &amp; Fathima</strong>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <button className="wa-btn" onClick={shareWhatsApp}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.526 5.858L0 24l6.335-1.502A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.508-5.201-1.394l-.371-.22-3.761.892.952-3.645-.242-.383A9.951 9.951 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                </svg>
                Share on WhatsApp
              </button>
              <button className="btn-outline" onClick={() => goTo(0)}>↩ Back to Start</button>
            </div>
            <Dots current={6} total={TOTAL} />
          </div>
        )}
      </div>
    </>
  );
}