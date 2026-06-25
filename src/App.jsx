import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════
   NIYAS × SANA FATHIMA — Arabesque Noir
   Design: Charcoal · Crimson · Pearl · Islamic Arch
   Layout: Centered card shell (desktop) · Full-screen (mobile)
   27 June 2026 · Vengad Vista Auditorium, Valanchery
═══════════════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Montserrat:wght@200;300;400;500&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html,body,#root{height:100%;overflow-x:hidden}

:root{
  --bg:#0e0e0e;
  --shell:#111318;
  --card:#16181f;
  --card2:#1c1f28;
  --crimson:#c0392b;
  --crimson2:#e74c3c;
  --crimson-glow:rgba(192,57,43,0.3);
  --pearl:#f0e6d3;
  --pearl2:#e8d5bb;
  --pearl-dim:rgba(240,230,211,0.55);
  --pearl-faint:rgba(240,230,211,0.12);
  --gold:#c9a84c;
  --gold2:#e8c96d;
  --gold-glow:rgba(201,168,76,0.25);
  --silver:rgba(200,205,220,0.5);
  --b-c:rgba(192,57,43,0.28);
  --b-g:rgba(201,168,76,0.25);
  --b-p:rgba(240,230,211,0.12);
  --ft:'Cormorant Garamond',serif;
  --fa:'Amiri',serif;
  --fb:'Montserrat',sans-serif;
  --r:560px;
}

body{
  background:var(--bg);
  font-family:var(--fb);
  color:var(--pearl);
  display:flex;
  align-items:center;
  justify-content:center;
  min-height:100vh;
}

/* ── Outer page wrapper ── */
.page-bg{
  position:fixed;inset:0;
  background:
    radial-gradient(ellipse at 20% 20%, rgba(192,57,43,0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(201,168,76,0.04) 0%, transparent 50%),
    #0e0e0e;
  z-index:0;
}

canvas#cvs{position:fixed;inset:0;pointer-events:none;z-index:1}

/* ── App shell — the centered "device" ── */
.shell{
  position:relative;z-index:2;
  width:100%;max-width:var(--r);
  min-height:100vh;
  background:var(--shell);
  box-shadow:0 0 0 1px rgba(192,57,43,0.1),0 40px 120px rgba(0,0,0,0.8);
  display:flex;flex-direction:column;
  overflow:hidden;
}

/* Desktop: show as a phone-like centered card */
@media(min-width:640px){
  body{padding:32px 0}
  .shell{
    min-height:auto;
    max-height:calc(100vh - 64px);
    border-radius:24px;
    overflow-y:auto;
    scrollbar-width:thin;
    scrollbar-color:rgba(192,57,43,0.3) transparent;
  }
  .shell::-webkit-scrollbar{width:4px}
  .shell::-webkit-scrollbar-thumb{background:rgba(192,57,43,0.3);border-radius:4px}
}

/* ── Screen ── */
.scr{
  min-height:100vh;
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:52px 28px 60px;
  text-align:center;
  position:relative;
}
@media(min-width:640px){
  .scr{min-height:unset;padding:60px 40px 72px}
}

/* ── Islamic arch SVG top decoration ── */
.arch-deco{
  position:absolute;top:0;left:0;right:0;height:120px;
  pointer-events:none;overflow:hidden;opacity:0.18;
}

/* ── Slide transition ── */
.slide{animation:slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both}
@keyframes slideUp{
  from{opacity:0;transform:translateY(52px) scale(0.97)}
  to{opacity:1;transform:translateY(0) scale(1)}
}
.slide-l{animation:slideLeft 0.5s cubic-bezier(0.16,1,0.3,1) both}
@keyframes slideLeft{
  from{opacity:0;transform:translateX(40px)}
  to{opacity:1;transform:translateX(0)}
}

/* ── STEP HEADER BAR ── */
.step-bar{
  position:sticky;top:0;z-index:10;
  display:flex;align-items:center;justify-content:space-between;
  padding:14px 24px;
  background:rgba(17,19,24,0.92);
  border-bottom:1px solid var(--b-p);
  backdrop-filter:blur(16px);
}
.step-logo{
  font-family:var(--ft);font-size:1rem;
  background:linear-gradient(90deg,var(--crimson2),var(--gold2));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  font-style:italic;letter-spacing:1px;
}
.step-nums{
  font-family:var(--fb);font-size:9px;letter-spacing:3px;
  color:rgba(240,230,211,0.3);text-transform:uppercase;
}

/* ── PROGRESS ── */
.prail{display:flex;gap:5px;justify-content:center;margin-top:28px}
.pdot{
  height:3px;border-radius:2px;
  background:rgba(192,57,43,0.18);
  transition:all 0.45s cubic-bezier(0.16,1,0.3,1);
}
.pdot.on{background:var(--crimson);width:24px;box-shadow:0 0 8px var(--crimson-glow)}
.pdot.done{background:rgba(192,57,43,0.45);width:12px}
.pdot.off{width:8px}

/* ── DIVIDERS ── */
.dv{display:flex;align-items:center;gap:10px;margin:16px 0}
.dv::before,.dv::after{content:'';flex:1;height:.5px;background:linear-gradient(90deg,transparent,var(--b-c))}
.dv::after{background:linear-gradient(90deg,var(--b-c),transparent)}
.dv-gem{
  width:6px;height:6px;flex-shrink:0;
  background:linear-gradient(135deg,var(--crimson),var(--gold));
  transform:rotate(45deg);
  box-shadow:0 0 8px var(--crimson-glow);
}
.dv-gold::before,.dv-gold::after{background:linear-gradient(90deg,transparent,var(--b-g));opacity:1}
.dv-gold::after{background:linear-gradient(90deg,var(--b-g),transparent)}

/* ── LABELS ── */
.eyebrow{
  font-family:var(--fb);font-weight:300;
  font-size:8px;letter-spacing:6px;text-transform:uppercase;
  color:rgba(192,57,43,0.7);margin-bottom:8px;
}
.eyebrow-g{color:rgba(201,168,76,0.7)}

/* ── HEADINGS ── */
.h-crim{
  font-family:var(--ft);font-size:3rem;font-weight:300;
  color:var(--crimson2);
  text-shadow:0 0 30px var(--crimson-glow),0 0 80px rgba(192,57,43,0.12);
  line-height:1.0;letter-spacing:1px;
}
.h-pearl{
  font-family:var(--ft);font-size:3rem;font-weight:300;
  color:var(--pearl);
  text-shadow:0 2px 20px rgba(240,230,211,0.15);
  line-height:1.0;
}
.h-gold{
  font-family:var(--ft);font-size:3rem;font-weight:300;
  color:var(--gold2);
  text-shadow:0 0 30px var(--gold-glow);
  line-height:1.0;
}

/* ── BISMILLAH GLOW ── */
.bism-arabic{
  font-family:var(--fa);font-size:32px;
  color:var(--gold2);display:block;margin-bottom:8px;
  text-shadow:0 0 20px rgba(201,168,76,0.5);
  animation:goldPulse 4s ease-in-out infinite;
}
@keyframes goldPulse{
  0%,100%{text-shadow:0 0 16px rgba(201,168,76,0.4),0 0 40px rgba(201,168,76,0.15)}
  50%{text-shadow:0 0 32px rgba(201,168,76,0.9),0 0 80px rgba(201,168,76,0.35)}
}

/* ── FRONT CARD ── */
.fp-outer{position:relative;width:100%;max-width:400px}
.fp-glow{
  position:absolute;inset:-50px;border-radius:50%;pointer-events:none;
  background:radial-gradient(ellipse,rgba(192,57,43,0.1) 0%,rgba(201,168,76,0.05) 40%,transparent 70%);
  animation:haloPulse 5s ease-in-out infinite;
}
@keyframes haloPulse{0%,100%{opacity:0.5;transform:scale(0.9)}50%{opacity:1;transform:scale(1.08)}}

.fp-card{
  background:linear-gradient(160deg,rgba(28,31,40,0.95),rgba(17,19,24,0.98));
  border:1px solid rgba(192,57,43,0.3);
  border-radius:20px;
  padding:52px 36px 48px;
  position:relative;overflow:hidden;
  backdrop-filter:blur(40px);
  box-shadow:
    0 0 0 1px rgba(201,168,76,0.06),
    0 50px 100px rgba(0,0,0,0.6),
    inset 0 1px 0 rgba(240,230,211,0.06);
  animation:cardIn 1.2s cubic-bezier(0.16,1,0.3,1) both;
}
@keyframes cardIn{
  from{opacity:0;transform:rotateX(-12deg) translateY(32px) scale(0.95)}
  to{opacity:1;transform:rotateX(0) translateY(0) scale(1)}
}
.fp-card::before{
  content:'';position:absolute;top:0;left:14%;right:14%;height:2px;
  background:linear-gradient(90deg,transparent,var(--crimson),var(--gold),transparent);
  opacity:0.6;
}
.fp-card::after{
  content:'';position:absolute;bottom:0;left:24%;right:24%;height:1px;
  background:linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent);
}

/* Arch pattern inside card */
.fp-arch{
  position:absolute;top:0;left:50%;transform:translateX(-50%);
  width:180px;height:80px;pointer-events:none;opacity:0.06;
}

/* Corner marks */
.cm{position:absolute;width:32px;height:32px;border-style:solid;border-color:rgba(192,57,43,0.4);border-width:0}
.cm.tl{top:14px;left:14px;border-top-width:1.5px;border-left-width:1.5px}
.cm.tr{top:14px;right:14px;border-top-width:1.5px;border-right-width:1.5px}
.cm.bl{bottom:14px;left:14px;border-bottom-width:1.5px;border-left-width:1.5px}
.cm.br{bottom:14px;right:14px;border-bottom-width:1.5px;border-right-width:1.5px}

/* Spinning geometry */
.geo-spin{
  width:86px;height:86px;margin:0 auto 20px;
  animation:geoR 12s linear infinite;position:relative;z-index:1;
}
@keyframes geoR{to{transform:rotate(360deg)}}

/* Names */
.fp-names{
  font-family:var(--ft);font-size:2.6rem;font-weight:300;
  line-height:1.15;position:relative;z-index:1;
}
.nm-c{
  display:block;color:var(--crimson2);
  text-shadow:0 0 24px rgba(192,57,43,0.6),0 0 60px rgba(192,57,43,0.2);
  animation:neonC 3.5s ease-in-out infinite;
}
.nm-g{
  display:block;color:var(--gold2);
  text-shadow:0 0 24px rgba(201,168,76,0.6),0 0 60px rgba(201,168,76,0.2);
  animation:neonG 4s ease-in-out infinite;
}
@keyframes neonC{
  0%,100%{text-shadow:0 0 20px rgba(192,57,43,0.5),0 0 60px rgba(192,57,43,0.15)}
  50%{text-shadow:0 0 50px rgba(192,57,43,1),0 0 120px rgba(192,57,43,0.4),0 0 180px rgba(192,57,43,0.1)}
}
@keyframes neonG{
  0%,100%{text-shadow:0 0 20px rgba(201,168,76,0.5),0 0 60px rgba(201,168,76,0.15)}
  50%{text-shadow:0 0 50px rgba(201,168,76,1),0 0 120px rgba(201,168,76,0.4),0 0 180px rgba(201,168,76,0.1)}
}
.nm-amp{font-family:var(--ft);font-style:italic;font-size:1.1rem;color:rgba(240,230,211,0.25);display:block;margin:4px 0}

.fp-sub{
  font-family:var(--ft);font-style:italic;font-weight:300;
  font-size:11.5px;color:var(--silver);margin-top:12px;line-height:1.9;
  position:relative;z-index:1;
}

/* ── BUTTONS ── */
.btn{
  display:inline-block;background:transparent;
  border:1px solid var(--crimson);color:var(--crimson2);
  font-family:var(--fb);font-weight:300;font-size:9px;
  letter-spacing:4px;text-transform:uppercase;
  padding:14px 48px;border-radius:1px;cursor:pointer;
  position:relative;overflow:hidden;margin-top:24px;
  transition:color 0.35s,box-shadow 0.35s;
}
.btn::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(192,57,43,0.15),rgba(192,57,43,0.05));
  transform:scaleX(0);transform-origin:left;
  transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);
}
.btn:hover::before{transform:scaleX(1)}
.btn:hover{color:var(--pearl);box-shadow:0 0 30px var(--crimson-glow),inset 0 0 16px rgba(192,57,43,0.08)}
.btn span{position:relative;z-index:1}

.btn-g{
  border-color:var(--gold);color:var(--gold2);
}
.btn-g::before{background:linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05))}
.btn-g:hover{color:var(--pearl);box-shadow:0 0 30px var(--gold-glow)}

.btn-ghost{
  background:transparent;border:1px solid var(--b-p);color:var(--silver);
  font-family:var(--fb);font-size:8px;letter-spacing:4px;text-transform:uppercase;
  padding:12px 32px;border-radius:1px;cursor:pointer;margin-top:12px;transition:all 0.25s;
}
.btn-ghost:hover{border-color:var(--crimson);color:var(--crimson2)}

/* ── GLASS PANEL ── */
.gp{
  background:rgba(28,31,40,0.6);
  border:1px solid var(--b-p);
  border-radius:12px;
  padding:24px 26px;
  width:100%;max-width:420px;
  margin:12px 0;
  backdrop-filter:blur(20px);
  position:relative;
  transition:transform 0.35s,box-shadow 0.35s;
  box-shadow:0 16px 50px rgba(0,0,0,0.4),0 0 0 1px rgba(192,57,43,0.04);
}
.gp:hover{transform:translateY(-4px);box-shadow:0 28px 70px rgba(0,0,0,0.5),0 0 0 1px rgba(192,57,43,0.1)}
.gp.gp-c{border-color:var(--b-c)}
.gp.gp-g{border-color:var(--b-g)}
.gp-title{font-family:var(--ft);font-size:1.4rem;color:var(--pearl);margin-bottom:6px;font-weight:300}
.gp-sub{font-size:11px;color:var(--silver);line-height:1.7;font-weight:300}

/* ── COUPLE CARDS ── */
.cc-wrap{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin:16px 0;width:100%;max-width:440px}
.cc{
  flex:1;min-width:180px;max-width:210px;
  border-radius:16px;padding:24px 16px 20px;
  position:relative;overflow:hidden;
  transition:transform 0.45s cubic-bezier(0.16,1,0.3,1),box-shadow 0.45s;
  transform-style:preserve-3d;cursor:default;
}
.cc:hover{transform:translateY(-12px) rotateX(4deg) rotateY(-4deg);box-shadow:0 40px 80px rgba(0,0,0,0.5)}
.cc-r{
  background:linear-gradient(160deg,rgba(45,12,8,0.7),rgba(20,5,3,0.9));
  border:1px solid rgba(192,57,43,0.4);
  box-shadow:0 20px 60px rgba(0,0,0,0.4),0 0 60px rgba(192,57,43,0.06);
}
.cc-r::before{content:'';position:absolute;top:-1.5px;left:16%;right:16%;height:2px;background:linear-gradient(90deg,transparent,var(--crimson),transparent)}
.cc-gold{
  background:linear-gradient(160deg,rgba(40,30,5,0.7),rgba(20,15,3,0.9));
  border:1px solid rgba(201,168,76,0.38);
  box-shadow:0 20px 60px rgba(0,0,0,0.4),0 0 60px rgba(201,168,76,0.06);
}
.cc-gold::before{content:'';position:absolute;top:-1.5px;left:16%;right:16%;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}

.cc-av{
  width:64px;height:64px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:28px;margin:0 auto 12px;position:relative;z-index:1;
}
.av-r{background:rgba(192,57,43,0.1);border:1.5px solid rgba(192,57,43,0.4);box-shadow:0 0 20px rgba(192,57,43,0.25)}
.av-g{background:rgba(201,168,76,0.1);border:1.5px solid rgba(201,168,76,0.4);box-shadow:0 0 20px rgba(201,168,76,0.25)}

.cc-name{font-family:var(--ft);font-size:1.2rem;font-weight:400;position:relative;z-index:1;margin-bottom:3px}
.cc-name-r{color:var(--crimson2);text-shadow:0 0 16px rgba(192,57,43,0.5)}
.cc-name-g{color:var(--gold2);text-shadow:0 0 16px rgba(201,168,76,0.5)}
.cc-role{font-family:var(--fb);font-size:8px;letter-spacing:3px;text-transform:uppercase;color:var(--silver);position:relative;z-index:1;margin-bottom:10px}
.cc-det{font-size:10.5px;color:var(--silver);line-height:1.75;font-weight:300;position:relative;z-index:1}
.cc-tag{font-size:9px;letter-spacing:1px;margin-top:8px;padding:3px 10px;border-radius:100px;display:inline-block}
.ct-r{color:var(--crimson2);background:rgba(192,57,43,0.1);border:1px solid rgba(192,57,43,0.22)}
.ct-g{color:var(--gold2);background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.22)}

/* ── QURAN BLOCK ── */
.qb{
  background:linear-gradient(135deg,rgba(192,57,43,0.06),rgba(192,57,43,0.02));
  border-left:2px solid rgba(192,57,43,0.35);
  border-radius:0 10px 10px 0;
  padding:16px 20px;max-width:360px;margin-top:16px;text-align:left;
  width:100%;
}
.qb-t{font-family:var(--ft);font-style:italic;font-size:12.5px;color:var(--silver);line-height:1.85;font-weight:300}
.qb-r{font-family:var(--fb);font-size:8px;letter-spacing:3px;color:rgba(192,57,43,0.55);text-transform:uppercase;margin-top:6px}

/* ── DATE PILL ── */
.dpill{
  background:linear-gradient(135deg,rgba(192,57,43,0.1),rgba(192,57,43,0.04));
  border:1px solid var(--b-c);border-radius:100px;
  padding:14px 36px;display:inline-block;margin-bottom:8px;
}
.dpill-m{font-family:var(--ft);font-size:1.5rem;color:var(--pearl);font-weight:300}
.dpill-s{font-family:var(--fb);font-size:8px;letter-spacing:4px;color:rgba(192,57,43,0.75);text-transform:uppercase;margin-top:5px}

/* ── COUNTDOWN ── */
.cd-wrap{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center;margin:20px 0}
.cd-cube{width:82px;perspective:500px}
.cd-face{
  background:linear-gradient(145deg,rgba(22,24,31,0.95),rgba(14,14,14,0.98));
  border:1px solid var(--b-c);border-radius:10px;
  padding:16px 8px 14px;
  transition:transform 0.35s,box-shadow 0.35s;
  box-shadow:
    0 10px 30px rgba(0,0,0,0.5),
    inset 0 1px 0 rgba(192,57,43,0.12),
    0 0 0 1px rgba(192,57,43,0.04);
  position:relative;
}
.cd-face::after{
  content:'';position:absolute;
  bottom:-6px;left:10%;right:10%;height:6px;
  background:rgba(192,57,43,0.1);border-radius:50%;filter:blur(4px);
}
.cd-face:hover{transform:translateY(-8px) rotateX(10deg) rotateY(5deg);box-shadow:0 24px 60px rgba(0,0,0,0.6),0 0 40px rgba(192,57,43,0.14)}
.cd-n{font-family:var(--ft);font-size:2.3rem;font-weight:300;display:block;line-height:1;color:var(--crimson2);text-shadow:0 0 18px rgba(192,57,43,0.5)}
.cd-l{font-family:var(--fb);font-size:7px;letter-spacing:3px;text-transform:uppercase;color:rgba(192,57,43,0.5);margin-top:4px}
.cd-sn{font-family:var(--ft);font-size:2.3rem;font-weight:300;display:block;line-height:1;color:var(--gold2);text-shadow:0 0 18px rgba(201,168,76,0.5)}
.cd-sl{font-family:var(--fb);font-size:7px;letter-spacing:3px;text-transform:uppercase;color:rgba(201,168,76,0.5);margin-top:4px}
.cd-sep{
  font-family:var(--ft);font-size:1.6rem;color:rgba(192,57,43,0.2);
  padding-bottom:14px;display:flex;align-items:center;
  animation:blnk 1s ease-in-out infinite;
}
@keyframes blnk{0%,100%{opacity:0.15}50%{opacity:0.9}}

/* ── VENUE ── */
.venue-wrap{max-width:420px;width:100%;margin:12px 0}
.v-top{
  background:linear-gradient(155deg,rgba(22,24,31,0.9),rgba(14,14,14,0.98));
  border:1px solid var(--b-c);border-radius:14px 14px 0 0;
  padding:26px 22px 20px;position:relative;overflow:hidden;
}
.v-top::before{content:'';position:absolute;top:0;left:16%;right:16%;height:2px;background:linear-gradient(90deg,transparent,var(--crimson),var(--gold),transparent);opacity:0.5}
.v-ico{
  width:50px;height:50px;background:rgba(192,57,43,0.09);
  border:1px solid rgba(192,57,43,0.28);border-radius:10px;
  display:flex;align-items:center;justify-content:center;
  font-size:24px;margin:0 auto 12px;box-shadow:0 0 20px rgba(192,57,43,0.12);
}
.v-name{font-family:var(--ft);font-size:1.25rem;color:var(--pearl);margin-bottom:5px;font-weight:300}
.v-addr{font-size:11px;color:var(--silver);line-height:1.8;font-weight:300}

.map-wrap{
  width:100%;border:1px solid var(--b-c);border-top:none;
  overflow:hidden;position:relative;
}
.map-iframe{width:100%;height:190px;border:none;filter:invert(88%) hue-rotate(155deg) saturate(0.75) brightness(0.88)}
.map-openbtn{
  position:absolute;bottom:10px;right:10px;
  background:rgba(14,14,14,0.92);border:1px solid var(--crimson);
  color:var(--crimson2);border-radius:100px;
  padding:7px 16px;font-family:var(--fb);font-size:8px;letter-spacing:2px;text-transform:uppercase;
  cursor:pointer;text-decoration:none;transition:all 0.25s;backdrop-filter:blur(10px);
}
.map-openbtn:hover{background:rgba(192,57,43,0.2)}

.sched{
  background:rgba(14,14,14,0.85);border:1px solid var(--b-p);
  border-top:none;border-radius:0 0 14px 14px;padding:16px 22px;
}
.sr{
  display:flex;justify-content:space-between;align-items:center;
  padding:8px 0;font-size:11.5px;font-weight:300;color:var(--silver);
  border-bottom:0.5px solid rgba(255,255,255,0.04);
}
.sr:last-child{border-bottom:none}
.st{font-family:var(--fb);color:var(--crimson2);font-size:9px;letter-spacing:2px}

/* ── MEDIA TABS ── */
.mtab-bar{
  display:flex;gap:4px;margin-bottom:16px;
  background:rgba(22,24,31,0.6);border:1px solid var(--b-p);
  border-radius:100px;padding:4px;max-width:240px;
}
.mtab{
  flex:1;padding:8px 0;border-radius:100px;
  font-family:var(--fb);font-size:8px;letter-spacing:3px;text-transform:uppercase;
  cursor:pointer;transition:all 0.25s;color:var(--silver);background:transparent;border:none;
}
.mtab.on{background:rgba(192,57,43,0.15);color:var(--crimson2);box-shadow:0 0 14px rgba(192,57,43,0.18)}

/* ── PHOTO GRID ── */
.pgrid{
  display:grid;grid-template-columns:repeat(3,1fr);
  gap:7px;width:100%;max-width:420px;margin:14px 0;
}
.pslot{
  aspect-ratio:1;border-radius:8px;overflow:hidden;
  background:rgba(22,24,31,0.85);border:1px solid var(--b-p);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  cursor:pointer;position:relative;
  transition:transform 0.3s,box-shadow 0.3s;
}
.pslot:hover{transform:scale(1.05);box-shadow:0 10px 36px rgba(192,57,43,0.2),0 0 0 1px var(--crimson)}
.pslot.big{grid-column:span 2;grid-row:span 2}
.pslot.big .p-ico{font-size:48px}
.p-ico{font-size:26px;transition:transform 0.3s}
.pslot:hover .p-ico{transform:scale(1.12)}
.p-lbl{font-family:var(--fb);font-size:7px;letter-spacing:2px;text-transform:uppercase;color:rgba(192,57,43,0.65);margin-top:5px}
.pslot.add{border:1px dashed rgba(192,57,43,0.22)}
.pslot.add:hover{border-color:var(--crimson)}

.pnote{
  background:rgba(192,57,43,0.06);border:1px solid var(--b-c);
  border-radius:10px;padding:12px 18px;max-width:360px;width:100%;
  font-size:11px;color:var(--silver);font-weight:300;line-height:1.7;font-style:italic;
}

/* ── VIDEO ── */
.vsec{max-width:420px;width:100%;margin:12px 0}
.vcard{
  background:rgba(22,24,31,0.75);border:1px solid var(--b-c);
  border-radius:14px;overflow:hidden;margin-bottom:12px;
  transition:transform 0.3s,box-shadow 0.3s;
}
.vcard:hover{transform:translateY(-4px);box-shadow:0 20px 55px rgba(0,0,0,0.5),0 0 50px rgba(192,57,43,0.07)}
.vthumb{
  width:100%;aspect-ratio:16/9;
  background:linear-gradient(135deg,rgba(35,8,5,0.9),rgba(14,14,14,0.95));
  display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;
}
.vthumb::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 30% 30%,rgba(192,57,43,0.09),transparent 60%)}
.v-emoji{font-size:40px;position:relative;z-index:1}
.vplay{
  position:absolute;width:58px;height:58px;border-radius:50%;
  background:rgba(192,57,43,0.14);border:2px solid rgba(192,57,43,0.5);
  display:flex;align-items:center;justify-content:center;font-size:20px;
  box-shadow:0 0 36px rgba(192,57,43,0.25);
  animation:vpp 2.5s ease-in-out infinite;z-index:2;cursor:pointer;transition:all 0.3s;
}
@keyframes vpp{0%,100%{box-shadow:0 0 28px rgba(192,57,43,0.22)}50%{box-shadow:0 0 56px rgba(192,57,43,0.55),0 0 90px rgba(192,57,43,0.18)}}
.vplay:hover{background:rgba(192,57,43,0.28);transform:scale(1.1)}
.vinfo{padding:12px 16px}
.vtitle{font-family:var(--ft);font-size:0.9rem;color:var(--pearl);margin-bottom:3px;font-weight:300}
.vsub{font-size:10px;color:var(--silver);font-weight:300}
.vtag{display:inline-block;background:rgba(192,57,43,0.09);border:1px solid rgba(192,57,43,0.22);border-radius:100px;padding:2px 10px;font-size:8px;letter-spacing:2px;text-transform:uppercase;color:var(--crimson2);margin-top:5px}

.upload-hint{
  border:1px dashed rgba(192,57,43,0.2);border-radius:12px;
  padding:20px;max-width:380px;width:100%;
  display:flex;flex-direction:column;align-items:center;gap:8px;
  cursor:pointer;transition:all 0.25s;
}
.upload-hint:hover{border-color:var(--crimson);background:rgba(192,57,43,0.04)}
.uhi{font-size:28px}
.uht{font-size:11px;color:var(--silver);font-weight:300}
.uhs{font-size:9px;color:rgba(192,57,43,0.5);letter-spacing:1px}

/* ── RSVP ── */
.rsvp-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin:20px 0}
.ropt{
  width:150px;padding:22px 12px;border-radius:12px;cursor:pointer;
  transition:all 0.4s cubic-bezier(0.16,1,0.3,1);
  display:flex;flex-direction:column;align-items:center;gap:8px;
  background:rgba(22,24,31,0.75);
}
.ry{border:1px solid var(--b-c)}
.rn{border:1px solid rgba(240,230,211,0.12)}
.ropt:hover{transform:translateY(-8px)}
.ry:hover{box-shadow:0 16px 40px rgba(192,57,43,0.2);border-color:var(--crimson)}
.rn:hover{box-shadow:0 16px 40px rgba(0,0,0,0.35);border-color:var(--b-p)}
.ry.sel{border-color:var(--crimson);background:rgba(192,57,43,0.1);box-shadow:0 0 40px rgba(192,57,43,0.15)}
.rn.sel{border-color:var(--b-p);background:var(--pearl-faint)}
.r-ico{font-size:34px}
.r-lbl{font-family:var(--fb);font-size:8px;letter-spacing:3px;text-transform:uppercase;color:var(--silver)}

.rbox{
  background:rgba(192,57,43,0.07);border:1px solid var(--b-c);
  border-radius:12px;padding:18px 22px;max-width:300px;
  animation:slideUp 0.4s ease;text-align:center;
}
.rbox.no{background:var(--pearl-faint);border-color:var(--b-p)}
.rbox h3{font-family:var(--ft);font-size:1.25rem;color:var(--crimson2);font-weight:400}
.rbox.no h3{color:var(--silver)}
.rbox p{font-size:11px;color:var(--silver);margin-top:7px;line-height:1.75;font-weight:300}

/* ── GUEST ── */
.grow{display:flex;align-items:center;gap:40px;margin:26px 0}
.gbtn{
  width:54px;height:54px;border-radius:50%;
  background:rgba(192,57,43,0.07);border:1px solid var(--b-c);
  color:var(--crimson2);font-size:22px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all 0.25s;font-family:var(--ft);
}
.gbtn:hover{background:rgba(192,57,43,0.2);transform:scale(1.14);box-shadow:0 0 22px var(--crimson-glow)}
.gnum{
  font-family:var(--ft);font-size:5.5rem;font-weight:300;color:var(--crimson2);
  min-width:80px;text-align:center;text-shadow:0 0 36px var(--crimson-glow);transition:transform 0.15s;
}
.gnum.bmp{animation:bmp 0.22s ease}
@keyframes bmp{0%,100%{transform:scale(1)}50%{transform:scale(1.22)}}
.gnote{font-family:var(--fb);font-size:9px;letter-spacing:2px;color:var(--silver);text-transform:uppercase}

/* ── FINAL ── */
.fin-geo{width:100px;height:100px;margin:0 auto 20px;animation:geoR 14s linear infinite}
.dua-card{
  background:linear-gradient(160deg,rgba(22,24,31,0.75),rgba(14,14,14,0.88));
  border:1px solid var(--b-c);border-radius:18px;
  padding:30px 28px;max-width:400px;position:relative;overflow:hidden;
}
.dua-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--crimson),var(--gold),transparent)}
.dua-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),var(--crimson),transparent)}
.dua-ar{font-family:var(--fa);font-size:18px;display:block;margin:12px 0 8px;color:var(--gold2);text-shadow:0 0 18px rgba(201,168,76,0.4)}
.dua-body{font-family:var(--ft);font-style:italic;font-weight:300;font-size:13px;color:var(--silver);line-height:2}
.dua-sig{
  font-family:var(--ft);font-size:0.9rem;margin-top:14px;
  background:linear-gradient(90deg,var(--crimson2),var(--gold2));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}

.wa-btn{
  display:inline-flex;align-items:center;gap:10px;
  background:linear-gradient(135deg,#128c7e,#075e54);color:#fff;
  border:none;border-radius:100px;
  padding:14px 36px;font-family:var(--fb);font-size:9px;
  letter-spacing:3px;text-transform:uppercase;cursor:pointer;margin-top:14px;transition:all 0.25s;
}
.wa-btn:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(18,140,126,0.45)}

.wa-contact{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(192,57,43,0.09);border:1px solid var(--b-c);
  color:var(--crimson2);border-radius:100px;
  padding:11px 26px;font-family:var(--fb);font-size:9px;
  letter-spacing:3px;text-transform:uppercase;text-decoration:none;transition:all 0.25s;
}
.wa-contact:hover{background:rgba(192,57,43,0.2);transform:translateY(-2px)}

.dua-footer{
  background:rgba(201,168,76,0.06);border:1px solid var(--b-g);
  border-radius:12px;padding:16px 22px;max-width:340px;margin-top:16px;
}
.dua-footer-lbl{font-family:var(--fb);font-size:8px;letter-spacing:3px;color:rgba(201,168,76,0.6);text-transform:uppercase;margin-bottom:8px}
.dua-footer-t{font-family:var(--ft);font-style:italic;font-size:12.5px;color:var(--silver);line-height:1.85;font-weight:300}

/* ── CONFETTI ── */
.cpc{position:fixed;top:-10px;pointer-events:none;z-index:999;animation:cfall linear forwards}
@keyframes cfall{to{transform:translateY(110vh) rotate(600deg);opacity:0}}

/* ── RESPONSIVE ── */
@media(max-width:480px){
  .fp-names{font-size:2rem}
  .h-crim,.h-pearl,.h-gold{font-size:2.2rem}
  .cd-n,.cd-sn{font-size:1.9rem}
  .cd-cube{width:70px}
  .gnum{font-size:4rem}
  .cc{min-width:155px}
  .fp-card{padding:44px 24px 40px}
}
`;

/* ══ PARTICLE CANVAS ════════════════════════════════════════════ */
function Canvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let raf, t = 0;
    const resize = () => { c.width = innerWidth; c.height = innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 180 }, () => ({
      x: Math.random(), y: Math.random(),
      r: 0.2 + Math.random() * 1.5,
      sp: 0.0002 + Math.random() * 0.0004,
      ph: Math.random() * Math.PI * 2,
      col: Math.random() > 0.8 ? "r" : Math.random() > 0.65 ? "g" : "s",
    }));
    const lines = [[0,12],[12,28],[28,48],[48,70],[2,18],[18,40],[1,15],[15,35],[5,22],[22,50]];
    const draw = () => {
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);
      [[0.15,0.15,0.16,"rgba(192,57,43,0.018)"],[0.85,0.8,0.2,"rgba(201,168,76,0.012)"]].forEach(([fx,fy,fr,col])=>{
        const g=ctx.createRadialGradient(fx*W,fy*H,0,fx*W,fy*H,fr*Math.max(W,H));
        g.addColorStop(0,col);g.addColorStop(1,"transparent");
        ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
      });
      ctx.lineWidth=0.4;
      lines.forEach(([a,b])=>{
        if(a>=pts.length||b>=pts.length)return;
        ctx.strokeStyle="rgba(192,57,43,0.05)";
        ctx.beginPath();ctx.moveTo(pts[a].x*W,pts[a].y*H);ctx.lineTo(pts[b].x*W,pts[b].y*H);ctx.stroke();
      });
      pts.forEach(p=>{
        const pl=0.5+0.5*Math.sin(t*p.sp*1000+p.ph),a=0.18+0.55*pl;
        ctx.beginPath();ctx.arc(p.x*W,p.y*H,p.r*(0.7+0.45*pl),0,Math.PI*2);
        ctx.fillStyle=p.col==="r"?`rgba(192,57,43,${a})`:p.col==="g"?`rgba(201,168,76,${a*0.6})`:`rgba(200,205,220,${a*0.4})`;
        ctx.fill();
      });
      ctx.beginPath();ctx.ellipse(W*0.5,H*0.35,200,55,t*0.0003,0,Math.PI*2);
      ctx.strokeStyle="rgba(192,57,43,0.02)";ctx.lineWidth=1;ctx.stroke();
      t++;raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize)};
  },[]);
  return <canvas ref={ref} id="cvs"/>;
}

/* ══ ISLAMIC GEOMETRIC SVG ═══════════════════════════════════════ */
function GeoStar({ sz=86, c1="#c0392b", c2="#c9a84c" }) {
  const cx=sz/2, n=16;
  const pts = Array.from({length:n},(_,i)=>{
    const a=(i*Math.PI)/8;
    const r=i%2===0?sz*0.42:sz*0.24;
    return [cx+r*Math.cos(a-Math.PI/2), cx+r*Math.sin(a-Math.PI/2)];
  });
  const d=pts.map((p,i)=>`${i===0?"M":"L"}${p[0]},${p[1]}`).join(" ")+"Z";
  return (
    <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`}>
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1}/><stop offset="100%" stopColor={c2}/>
        </linearGradient>
        <linearGradient id="sg2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c2}/><stop offset="100%" stopColor={c1}/>
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cx} r={sz*0.47} fill="none" stroke={c1} strokeWidth="0.8" opacity="0.25"/>
      <circle cx={cx} cy={cx} r={sz*0.35} fill="none" stroke={c2} strokeWidth="0.5" opacity="0.2"/>
      <circle cx={cx} cy={cx} r={sz*0.22} fill="none" stroke={c1} strokeWidth="0.4" opacity="0.15"/>
      <path d={d} fill="none" stroke="url(#sg)" strokeWidth="1" opacity="0.85"/>
      <circle cx={cx} cy={cx} r={sz*0.065} fill="url(#sg2)"/>
    </svg>
  );
}

/* ══ ARCH DECORATION SVG ════════════════════════════════════════ */
function ArchDeco() {
  return (
    <svg className="arch-deco" viewBox="0 0 560 120" preserveAspectRatio="xMidYMax meet">
      {[0.15,0.35,0.5,0.65,0.85].map((x,i)=>(
        <g key={i}>
          <path
            d={`M${x*560-40},120 L${x*560-40},70 Q${x*560},20 ${x*560+40},70 L${x*560+40},120`}
            fill="none" stroke="#c0392b" strokeWidth="0.8" opacity={0.6}
          />
          <path
            d={`M${x*560-28},120 L${x*560-28},72 Q${x*560},30 ${x*560+28},72 L${x*560+28},120`}
            fill="none" stroke="#c9a84c" strokeWidth="0.4" opacity={0.3}
          />
        </g>
      ))}
      <line x1="0" y1="119.5" x2="560" y2="119.5" stroke="#c0392b" strokeWidth="0.5" opacity="0.3"/>
    </svg>
  );
}

/* ══ CONFETTI ════════════════════════════════════════════════════ */
function Confetti({on}){
  const [pcs,setPcs]=useState([]);
  useEffect(()=>{
    if(!on)return;
    const cols=["#c0392b","#c9a84c","#f0e6d3","#e74c3c","#e8c96d","#ffffff"];
    const arr=Array.from({length:80},(_,i)=>({
      id:i,left:Math.random()*100,col:cols[i%cols.length],
      dur:1.4+Math.random()*1.6,delay:Math.random()*1.3,
      sz:4+Math.random()*10,rd:Math.random()>0.4,
    }));
    setPcs(arr);
    const t=setTimeout(()=>setPcs([]),6000);
    return()=>clearTimeout(t);
  },[on]);
  return<>{pcs.map(p=>(
    <div key={p.id} className="cpc" style={{
      left:`${p.left}%`,background:p.col,width:p.sz,height:p.sz,
      borderRadius:p.rd?"50%":"2px",
      animationDuration:`${p.dur}s`,animationDelay:`${p.delay}s`,
    }}/>
  ))}</>;
}

/* ══ PROGRESS ════════════════════════════════════════════════════ */
function Rail({cur,tot}){
  return(
    <div className="prail">
      {Array.from({length:tot},(_,i)=>(
        <div key={i} className={`pdot${i===cur?" on":i<cur?" done":" off"}`}/>
      ))}
    </div>
  );
}

/* ══ COUNTDOWN ═══════════════════════════════════════════════════ */
function useCD(date){
  const calc=()=>{
    const d=Math.max(0,new Date(date).getTime()-Date.now());
    return{
      days:Math.floor(d/86400000),
      hours:Math.floor((d%86400000)/3600000),
      minutes:Math.floor((d%3600000)/60000),
      seconds:Math.floor((d%60000)/1000),
    };
  };
  const [v,setV]=useState(calc);
  useEffect(()=>{const id=setInterval(()=>setV(calc()),1000);return()=>clearInterval(id);},[]);
  return v;
}

/* ══ WHATSAPP ════════════════════════════════════════════════════ */
const MAP_URL="https://www.google.com/maps/place/Vista+Convention+Centre,+Vengad/@10.9230565,76.1275024,17z";
const SITE_URL="https://wedding-7xyf.vercel.app/";
const PHONE="919645315976";

const doWA=()=>{
  const m=encodeURIComponent(
    "﷽\n\n"+
    SITE_URL+"\n\n"+
    "✨ *You Are Cordially Invited* ✨\n\n"+
    "With the blessings of Allah ﷻ, we joyfully invite you to the Nikah of\n\n"+
    "💍 *Niyas* & *Sana Fathima* 💍\n\n"+
    "📅 *Saturday, 27 June 2026*\n"+
    "⏰ *11:00 AM onwards*\n"+
    "📍 *Vengad Vista Auditorium, Valanchery, Malappuram*\n\n"+
    "🗺️ Location: "+MAP_URL+"\n\n"+
    "Your presence, duas and blessings mean everything to us 🤲\n\n"+
    "جَزَاكُمُ اللَّهُ خَيْرًا — Jazakumullahu Khairan 💚"
  );
  window.open("https://wa.me/?text="+m,"_blank");
};

/* ══ DATA ════════════════════════════════════════════════════════ */
const PHOTOS=[
  {big:true,ico:"💍",lbl:"Nikah"},
  {ico:"🕌",lbl:"Masjid"},{ico:"🌹",lbl:"Flowers"},
  {ico:"🪔",lbl:"Decor"},{ico:"👗",lbl:"Bride"},
  {ico:"🤵",lbl:"Groom"},{ico:"🎊",lbl:"Family"},
  {ico:"🌙",lbl:"Night"},{ico:"📿",lbl:"Mahr"},
];
const VIDS=[
  {ico:"🎬",title:"Nikah Ceremony Highlights",sub:"Vengad Vista · 27 June 2026",tag:"Official"},
  {ico:"🎥",title:"Walima Reception",sub:"Reception footage · Coming soon",tag:"Preview"},
  {ico:"📸",title:"Pre-wedding Moments",sub:"Family & preparation memories",tag:"Family"},
];

/* ══ STEP NAMES ══════════════════════════════════════════════════ */
const STEP_LABELS=["Home","Couple","Date","Venue","Media","RSVP","Guests","Thank You"];

/* ══ MAIN APP ════════════════════════════════════════════════════ */
export default function App(){
  const [step,setStep]=useState(0);
  const [rsvp,setRsvp]=useState(null);
  const [guests,setGuests]=useState(2);
  const [bmp,setBmp]=useState(false);
  const [confetti,setConfetti]=useState(false);
  const [akey,setAkey]=useState(0);
  const [mediaTab,setMediaTab]=useState("Photos");
  const cd=useCD("2026-06-27T11:00:00");
  const TOTAL=8;

  const go=(n)=>{
    setStep(n);setAkey(k=>k+1);
    if(n===7)setTimeout(()=>setConfetti(true),350);
    else setConfetti(false);
  };
  const chG=(d)=>{setGuests(g=>Math.max(1,g+d));setBmp(true);setTimeout(()=>setBmp(false),250)};

  return(
    <>
      <style>{CSS}</style>
      <div className="page-bg"/>
      <Canvas/>
      <Confetti on={confetti}/>

      <div className="shell">
        {/* Step bar — hidden on entry */}
        {step>0&&(
          <div className="step-bar">
            <div className="step-logo">Niyas × Sana</div>
            <div className="step-nums">{STEP_LABELS[step]} · {step}/{TOTAL-1}</div>
          </div>
        )}

        {/* ══ STEP 0: FRONT PAGE ══════════════════════════════════ */}
        {step===0&&(
          <div className="scr">
            <ArchDeco/>
            <div className="fp-outer">
              <div className="fp-glow"/>
              <div className="fp-card">
                <svg className="fp-arch" viewBox="0 0 180 80" style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)"}}>
                  <path d="M10,80 L10,45 Q90,-10 170,45 L170,80" fill="none" stroke="#c0392b" strokeWidth="1" opacity="0.12"/>
                  <path d="M25,80 L25,50 Q90,5 155,50 L155,80" fill="none" stroke="#c9a84c" strokeWidth="0.6" opacity="0.08"/>
                </svg>
                <div className="cm tl"/><div className="cm tr"/>
                <div className="cm bl"/><div className="cm br"/>

                <div className="geo-spin"><GeoStar sz={86}/></div>

                <span className="bism-arabic">﷽</span>
                <p className="eyebrow" style={{position:"relative",zIndex:1}}>A Sacred Nikah Invitation</p>
                <div className="dv" style={{maxWidth:280,margin:"12px auto"}}><div className="dv-gem"/></div>

                <h1 className="fp-names">
                  <span className="nm-c">Niyas</span>
                  <span className="nm-amp">✦ &amp; ✦</span>
                  <span className="nm-g">Sana Fathima</span>
                </h1>

                <div className="dv" style={{maxWidth:280,margin:"12px auto"}}><div className="dv-gem"/></div>
                <p className="fp-sub">
                  Bismillahir Rahmanir Raheem<br/>
                  وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا<br/>
                  <span style={{fontSize:10,opacity:0.6}}>With the blessings of Allah ﷻ, we announce our Nikah</span>
                </p>

                <div style={{display:"flex",justifyContent:"center",position:"relative",zIndex:1}}>
                  <button className="btn" onClick={()=>go(1)}><span>✉ Open Invitation</span></button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ STEP 1: COUPLE ══════════════════════════════════════ */}
        {step===1&&(
          <div className="scr slide" key={`s1${akey}`}>
            <ArchDeco/>
            <p className="eyebrow">Meet The Couple</p>
            <span style={{color:"var(--gold2)",letterSpacing:10,fontSize:13,opacity:0.55,margin:"8px 0 16px",display:"block"}}>❧ ✦ ❧</span>

            <div className="cc-wrap">
              <div className="cc cc-r">
                <div className="cc-av av-r">🤵</div>
                <div className="cc-name cc-name-r">Niyas</div>
                <div className="cc-role">The Groom</div>
                <div className="cc-det">
                  Son of<br/>
                  <strong style={{color:"var(--pearl)"}}>Mr. Hyder Ali</strong><br/>
                  <strong style={{color:"var(--pearl)"}}>Mrs. Fathima</strong><br/>
                  <span style={{opacity:0.65}}>Vengad, Valanchery<br/>Malappuram, Kerala</span>
                </div>
                <span className="cc-tag ct-r">Interior Designer</span>
              </div>
              <div className="cc cc-gold">
                <div className="cc-av av-g">👰</div>
                <div className="cc-name cc-name-g">Sana Fathima</div>
                <div className="cc-role">The Bride</div>
                <div className="cc-det">
                  Daughter of<br/>
                  <strong style={{color:"var(--pearl)"}}>Mr. Veeran</strong><br/>
                  <strong style={{color:"var(--pearl)"}}>Mrs. Rafeeqa</strong><br/>
                  <span style={{opacity:0.65}}>Kavumpuram, Valanchery<br/>Malappuram, Kerala</span>
                </div>
                <span className="cc-tag ct-g">Teacher</span>
              </div>
            </div>

            <div className="qb">
              <p className="qb-t">"And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."</p>
              <p className="qb-r">— Surah Ar-Rum 30:21</p>
            </div>

            <button className="btn" onClick={()=>go(2)} style={{marginTop:22}}><span>View Date &amp; Time →</span></button>
            <Rail cur={1} tot={TOTAL}/>
          </div>
        )}

        {/* ══ STEP 2: DATE ════════════════════════════════════════ */}
        {step===2&&(
          <div className="scr slide" key={`s2${akey}`}>
            <ArchDeco/>
            <p className="eyebrow">Mark Your Calendar</p>
            <h2 className="h-crim" style={{marginBottom:18}}>The Date</h2>

            <div className="dpill">
              <div className="dpill-m">27 June 2026 · Saturday</div>
              <div className="dpill-s">11:00 AM · Valanchery, Malappuram</div>
            </div>

            <p style={{fontFamily:"var(--fb)",fontSize:9,color:"rgba(192,57,43,0.55)",letterSpacing:3,textTransform:"uppercase",marginTop:22}}>
              Insha Allah — Counting Down
            </p>

            <div className="cd-wrap">
              {[["days","Days","n"],["hours","Hours","n"],["minutes","Mins","n"],["seconds","Secs","s"]].map(([k,l,t],i)=>(
                <div key={k} style={{display:"flex",alignItems:"center"}}>
                  <div className="cd-cube">
                    <div className="cd-face">
                      <span className={t==="s"?"cd-sn":"cd-n"}>{cd[k]}</span>
                      <span className={t==="s"?"cd-sl":"cd-l"}>{l}</span>
                    </div>
                  </div>
                  {i<3&&<div className="cd-sep">:</div>}
                </div>
              ))}
            </div>

            <div className="qb" style={{marginBottom:6}}>
              <p className="qb-t">"Indeed, with hardship will be ease. Indeed, with hardship will be ease."</p>
              <p className="qb-r">— Surah Ash-Sharh 94:5-6</p>
            </div>

            <button className="btn" onClick={()=>go(3)}><span>View Venue →</span></button>
            <Rail cur={2} tot={TOTAL}/>
          </div>
        )}

        {/* ══ STEP 3: VENUE ═══════════════════════════════════════ */}
        {step===3&&(
          <div className="scr slide" key={`s3${akey}`}>
            <ArchDeco/>
            <p className="eyebrow">You Are Welcome At</p>
            <h2 className="h-crim" style={{marginBottom:16}}>Venue</h2>

            <div className="venue-wrap">
              <div className="v-top">
                <div className="v-ico">🕌</div>
                <div className="v-name">Vengad Vista Auditorium</div>
                <div className="v-addr">
                  Vengad, Valanchery<br/>
                  Malappuram, Kerala — 676 552<br/>
                  <span style={{color:"rgba(192,57,43,0.6)",fontSize:10,letterSpacing:1}}>
                    📍 Near Moorkkannur · Via Perintalmanna &amp; Kolathoor
                  </span>
                </div>
              </div>

              <div className="map-wrap">
                <iframe
                  className="map-iframe"
                  src={`https://maps.google.com/maps?q=Vista+Convention+Centre+Vengad+Valanchery+Kerala&output=embed&z=15`}
                  allowFullScreen="" loading="lazy" title="Vengad Vista Auditorium"
                />
                <a className="map-openbtn" href={MAP_URL} target="_blank" rel="noopener noreferrer">
                  📍 Open Maps
                </a>
              </div>

              <div className="sched">
                <p className="eyebrow" style={{textAlign:"left",marginBottom:10}}>Programme</p>
                {[
                  ["Guests Arrive","10:30 AM"],
                  ["Nikah Ceremony","11:00 AM"],
                  ["Du'a & Blessings","12:00 PM"],
                  ["Food & Reception","12:30 PM"],
                  ["Photography & Music","2:00 PM"],
                  ["Walima Celebration","3:00 PM"],
                ].map(([ev,tm])=>(
                  <div className="sr" key={ev}><span>{ev}</span><span className="st">{tm}</span></div>
                ))}
              </div>
            </div>

            <button className="btn" onClick={()=>go(4)}><span>Photos &amp; Videos →</span></button>
            <Rail cur={3} tot={TOTAL}/>
          </div>
        )}

        {/* ══ STEP 4: MEDIA ═══════════════════════════════════════ */}
        {step===4&&(
          <div className="scr slide" key={`s4${akey}`}>
            <ArchDeco/>
            <p className="eyebrow">Memories &amp; Moments</p>
            <h2 className="h-crim" style={{marginBottom:14}}>Media</h2>

            <div className="mtab-bar">
              {["Photos","Videos"].map(t=>(
                <button key={t} className={`mtab${mediaTab===t?" on":""}`} onClick={()=>setMediaTab(t)}>{t}</button>
              ))}
            </div>

            {mediaTab==="Photos"&&(
              <>
                <div className="pgrid">
                  {PHOTOS.map((p,i)=>(
                    <div key={i} className={`pslot${p.big?" big":""}`}>
                      <span className="p-ico">{p.ico}</span>
                      <span className="p-lbl">{p.lbl}</span>
                    </div>
                  ))}
                  <div className="pslot add">
                    <span style={{fontSize:24}}>📷</span>
                    <span className="p-lbl">Add Photo</span>
                  </div>
                </div>
                <div className="pnote">
                  📸 Photos will be updated here after the ceremony.<br/>
                  Share your pictures with us to feature them here.
                </div>
              </>
            )}

            {mediaTab==="Videos"&&(
              <div className="vsec">
                {VIDS.map((v,i)=>(
                  <div className="vcard" key={i}>
                    <div className="vthumb">
                      <span className="v-emoji">{v.ico}</span>
                      <div className="vplay">▶</div>
                    </div>
                    <div className="vinfo">
                      <div className="vtitle">{v.title}</div>
                      <div className="vsub">{v.sub}</div>
                      <span className="vtag">{v.tag}</span>
                    </div>
                  </div>
                ))}
                <div className="upload-hint">
                  <span className="uhi">🎬</span>
                  <span className="uht">Videos will be uploaded after the ceremony</span>
                  <span className="uhs">Share your clips with us to feature here</span>
                </div>
              </div>
            )}

            <button className="btn" onClick={()=>go(5)} style={{marginTop:14}}><span>RSVP →</span></button>
            <Rail cur={4} tot={TOTAL}/>
          </div>
        )}

        {/* ══ STEP 5: RSVP ════════════════════════════════════════ */}
        {step===5&&(
          <div className="scr slide" key={`s5${akey}`}>
            <ArchDeco/>
            <p className="eyebrow">Your Presence</p>
            <h2 className="h-crim">Will You Join Us?</h2>
            <p style={{fontSize:12,color:"var(--silver)",maxWidth:290,marginTop:10,fontWeight:300,lineHeight:1.8}}>
              Your presence will illuminate this blessed day.<br/>
              <span style={{fontSize:11,color:"rgba(192,57,43,0.6)",fontFamily:"var(--fa)"}}>رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا</span>
            </p>

            <div className="rsvp-row">
              <div className={`ropt ry${rsvp==="yes"?" sel":""}`} onClick={()=>setRsvp("yes")}>
                <span className="r-ico">🤲</span>
                <span className="r-lbl">Yes, Insha Allah</span>
              </div>
              <div className={`ropt rn${rsvp==="no"?" sel":""}`} onClick={()=>setRsvp("no")}>
                <span className="r-ico">😔</span>
                <span className="r-lbl">Regretfully No</span>
              </div>
            </div>

            {rsvp==="yes"&&(
              <div className="rbox">
                <h3>Masha Allah! ✨</h3>
                <p>
                  Alhamdulillah! Baarakallahu feekum — may Allah bless you and your family abundantly.
                  We are overjoyed to celebrate with you!<br/><br/>
                  <span style={{color:"rgba(192,57,43,0.7)",fontSize:10,fontFamily:"var(--fa)"}}>جَزَاكَ اللَّهُ خَيْرًا</span>
                  <span style={{color:"rgba(192,57,43,0.7)",fontSize:10}}> · Jazakallahu Khairan 💚</span>
                </p>
              </div>
            )}
            {rsvp==="no"&&(
              <div className="rbox no">
                <h3>We Understand 🤍</h3>
                <p>
                  Jazakallahu Khairan for letting us know. We will truly miss your presence.
                  Please keep Niyas &amp; Sana in your duas — your blessings mean everything.<br/><br/>
                  <span style={{color:"rgba(201,168,76,0.7)",fontSize:10,fontFamily:"var(--fa)"}}>بَارَكَ اللَّهُ فِيكَ</span>
                  <span style={{color:"rgba(201,168,76,0.7)",fontSize:10}}> · May Allah bless you 🌙</span>
                </p>
              </div>
            )}

            <button className="btn" onClick={()=>go(6)} style={{marginTop:20}}><span>Continue →</span></button>
            <Rail cur={5} tot={TOTAL}/>
          </div>
        )}

        {/* ══ STEP 6: GUEST COUNT ════════════════════════════════ */}
        {step===6&&(
          <div className="scr slide" key={`s6${akey}`}>
            <ArchDeco/>
            <p className="eyebrow">Help Us Prepare</p>
            <h2 className="h-crim">Guest Count</h2>
            <p style={{fontSize:11,color:"var(--silver)",letterSpacing:1,marginTop:8,fontWeight:300}}>
              Including yourself — so we can arrange accordingly
            </p>

            <div className="grow">
              <button className="gbtn" onClick={()=>chG(-1)}>−</button>
              <span className={`gnum${bmp?" bmp":""}`}>{guests}</span>
              <button className="gbtn" onClick={()=>chG(1)}>+</button>
            </div>

            <p className="gnote">{guests} {guests===1?"person":"guests"} attending, Insha Allah</p>

            <div className="qb" style={{marginTop:20}}>
              <p className="qb-t">"Whoever honours the signs of Allah — indeed, it is from the piety of hearts."</p>
              <p className="qb-r">— Surah Al-Hajj 22:32</p>
            </div>

            <button className="btn" onClick={()=>go(7)} style={{marginTop:26}}><span>Confirm →</span></button>
            <Rail cur={6} tot={TOTAL}/>
          </div>
        )}

        {/* ══ STEP 7: FINAL ═══════════════════════════════════════ */}
        {step===7&&(
          <div className="scr slide" key={`s7${akey}`}>
            <ArchDeco/>
            <div className="fin-geo"><GeoStar sz={100}/></div>

            <p className="eyebrow">Jazakallah Khair</p>
            <h2 className="h-crim" style={{marginBottom:16}}>Thank You</h2>

            <div className="dua-card">
              <p className="dua-body">
                Your love, your presence, and your duas<br/>
                will make this Nikah truly radiant.
              </p>
              <span className="dua-ar">اللَّهُمَّ بَارِكْ لَنَا فِي نِكَاحِنَا</span>
              <p className="dua-body">
                O Allah, bless us in our union and<br/>
                shower Your mercy upon all who<br/>
                celebrate with us.<br/><br/>
                <em style={{color:"rgba(192,57,43,0.5)",fontSize:12}}>Ameen, Ya Rabb Al-'Alameen.</em>
              </p>
              <p className="dua-sig">— Niyas &amp; Sana Fathima</p>
            </div>

            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10,marginTop:14}}>
              <button className="wa-btn" onClick={doWA}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.526 5.858L0 24l6.335-1.502A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.508-5.201-1.394l-.371-.22-3.761.892.952-3.645-.242-.383A9.951 9.951 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                </svg>
                Share on WhatsApp
              </button>
              <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer" className="wa-contact">
                💬 Contact on WhatsApp
              </a>
              <button className="btn-ghost" onClick={()=>go(0)}>↩ Back to Start</button>
            </div>

            <div className="dua-footer" style={{marginTop:20}}>
              <p className="dua-footer-lbl">Islamic Du'a for the Couple</p>
              <p className="dua-footer-t">
                "Baarakallahu lakuma wa baarak 'alaykuma wa jama'a baynakuma fii khayr."<br/>
                <span style={{fontSize:10,color:"rgba(201,168,76,0.55)"}}>May Allah bless you both and unite you in goodness. — Abu Dawud</span>
              </p>
            </div>

            <Rail cur={7} tot={TOTAL}/>
          </div>
        )}
      </div>
    </>
  );
}