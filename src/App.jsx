import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   NIYAS × SANA — Professional Islamic Nikah Invitation
   Vengad Vista Auditorium, Valanchery, Malappuram
   27 June 2026 · 11:00 AM
═══════════════════════════════════════════════════════════════════════ */

const G = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600&family=Lato:ital,wght@0,300;0,400;1,300&display=swap');

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html,body,#root{height:100%;overflow-x:hidden}

:root{
  --bg:#05080f;
  --bg2:#080d1a;
  --bg3:#0c1228;
  --emerald:#00c896;
  --emerald2:#00a87e;
  --gold:#e8b86d;
  --gold2:#d4a055;
  --em-glow:rgba(0,200,150,0.22);
  --gd-glow:rgba(232,184,109,0.22);
  --em-faint:rgba(0,200,150,0.07);
  --gd-faint:rgba(232,184,109,0.07);
  --cream:#f0ece2;
  --silver:rgba(210,215,235,0.58);
  --b-em:rgba(0,200,150,0.22);
  --b-gd:rgba(232,184,109,0.22);
  --ft:'Cinzel Decorative',serif;
  --fs:'Cinzel',serif;
  --fb:'Lato',sans-serif;
}

body{background:var(--bg);font-family:var(--fb);color:var(--cream);cursor:default}

canvas#neb{position:fixed;inset:0;pointer-events:none;z-index:0}

.grain{
  position:fixed;inset:0;z-index:1;pointer-events:none;opacity:0.035;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E");
}

.scr{
  min-height:100vh;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:56px 20px 64px;
  position:relative;z-index:2;text-align:center;
}

/* ═══ FRONT PAGE ═══ */
.fp-wrap{position:relative;width:100%;max-width:460px}
.fp-halo{
  position:absolute;inset:-70px;border-radius:50%;pointer-events:none;
  background:radial-gradient(ellipse,rgba(0,200,150,0.1) 0%,rgba(232,184,109,0.05) 45%,transparent 70%);
  animation:haloPulse 5s ease-in-out infinite;
}
@keyframes haloPulse{0%,100%{transform:scale(0.88);opacity:0.5}50%{transform:scale(1.1);opacity:1}}

.fp-card{
  background:rgba(8,13,26,0.75);
  border:1px solid rgba(0,200,150,0.28);
  border-radius:24px;
  padding:60px 44px 52px;
  position:relative;overflow:hidden;
  backdrop-filter:blur(36px);
  box-shadow:
    0 0 0 1px rgba(0,200,150,0.05),
    0 50px 100px rgba(0,0,0,0.7),
    inset 0 1px 0 rgba(0,200,150,0.12);
}
.fp-card::before{
  content:'';position:absolute;top:0;left:12%;right:12%;height:1.5px;
  background:linear-gradient(90deg,transparent,var(--emerald),transparent);
  animation:topGlow 3.5s ease-in-out infinite;
}
@keyframes topGlow{0%,100%{opacity:0.35}50%{opacity:1}}
.fp-card::after{
  content:'';position:absolute;bottom:0;left:22%;right:22%;height:1px;
  background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:0.45;
}

.orb{position:absolute;border-radius:50%;pointer-events:none;filter:blur(50px)}
.orb1{width:160px;height:160px;background:rgba(0,200,150,0.07);top:-50px;right:-50px}
.orb2{width:130px;height:130px;background:rgba(232,184,109,0.06);bottom:-40px;left:-40px}

.brk{position:absolute;width:38px;height:38px;border-color:rgba(0,200,150,0.38);border-style:solid;border-width:0}
.brk.tl{top:16px;left:16px;border-top-width:1.5px;border-left-width:1.5px}
.brk.tr{top:16px;right:16px;border-top-width:1.5px;border-right-width:1.5px}
.brk.bl{bottom:16px;left:16px;border-bottom-width:1.5px;border-left-width:1.5px}
.brk.br{bottom:16px;right:16px;border-bottom-width:1.5px;border-right-width:1.5px}

.spin-ring{
  width:96px;height:96px;margin:0 auto 22px;
  position:relative;z-index:1;
  animation:ringR 10s linear infinite;
}
@keyframes ringR{to{transform:rotate(360deg)}}

/* Arabic calligraphy style text */
.arabic-bismillah{
  font-size:28px;display:block;margin-bottom:6px;
  position:relative;z-index:1;
  animation:arabicGlow 4s ease-in-out infinite;
  letter-spacing:2px;
}
@keyframes arabicGlow{
  0%,100%{text-shadow:0 0 10px rgba(232,184,109,0.3)}
  50%{text-shadow:0 0 30px rgba(232,184,109,0.8),0 0 60px rgba(232,184,109,0.3)}
}

.fp-tag{
  font-family:var(--fb);font-weight:300;
  font-size:9px;letter-spacing:7px;
  color:rgba(0,200,150,0.72);text-transform:uppercase;
  margin-bottom:14px;position:relative;z-index:1;
}

.fp-names{
  font-family:var(--ft);font-size:2.5rem;font-weight:400;
  line-height:1.18;position:relative;z-index:1;
}
.glow-em{
  display:block;color:var(--emerald);
  text-shadow:0 0 24px rgba(0,200,150,0.65),0 0 70px rgba(0,200,150,0.28);
  animation:emFlick 3.2s ease-in-out infinite;
}
.glow-gd{
  display:block;color:var(--gold);
  text-shadow:0 0 24px rgba(232,184,109,0.7),0 0 70px rgba(232,184,109,0.28);
  animation:gdFlick 3.8s ease-in-out infinite;
}
@keyframes emFlick{
  0%,100%{text-shadow:0 0 24px rgba(0,200,150,0.65),0 0 70px rgba(0,200,150,0.28)}
  50%{text-shadow:0 0 48px rgba(0,200,150,1),0 0 120px rgba(0,200,150,0.5),0 0 180px rgba(0,200,150,0.18)}
}
@keyframes gdFlick{
  0%,100%{text-shadow:0 0 24px rgba(232,184,109,0.65),0 0 70px rgba(232,184,109,0.28)}
  50%{text-shadow:0 0 48px rgba(232,184,109,1),0 0 120px rgba(232,184,109,0.5),0 0 180px rgba(232,184,109,0.18)}
}
.fp-amp{
  font-family:'Cinzel',serif;font-size:1rem;
  color:rgba(210,215,235,0.35);display:block;margin:6px 0;
}

.fp-bism{
  font-family:var(--fb);font-style:italic;font-weight:300;
  font-size:12px;color:var(--silver);
  margin-top:14px;line-height:1.9;position:relative;z-index:1;
}

.divl{
  display:flex;align-items:center;gap:10px;margin:14px 0;position:relative;z-index:1;
}
.divl::before,.divl::after{content:'';flex:1;height:0.5px;background:linear-gradient(90deg,transparent,rgba(0,200,150,0.38))}
.divl::after{background:linear-gradient(90deg,rgba(0,200,150,0.38),transparent)}
.dmnd{width:7px;height:7px;background:linear-gradient(135deg,var(--emerald),var(--gold));transform:rotate(45deg);flex-shrink:0;box-shadow:0 0 10px rgba(0,200,150,0.5)}

/* ═══ BUTTONS ═══ */
.btn-em{
  display:inline-block;background:transparent;
  border:1px solid var(--emerald);color:var(--emerald);
  font-family:var(--fb);font-weight:300;
  font-size:10px;letter-spacing:4px;text-transform:uppercase;
  padding:15px 52px;border-radius:2px;cursor:pointer;
  position:relative;z-index:1;margin-top:26px;overflow:hidden;
  transition:color 0.35s,box-shadow 0.35s;
}
.btn-em::before{
  content:'';position:absolute;inset:0;
  background:rgba(0,200,150,0.12);
  transform:scaleX(0);transform-origin:left;
  transition:transform 0.4s cubic-bezier(0.23,1,0.32,1);
}
.btn-em:hover::before{transform:scaleX(1)}
.btn-em:hover{color:var(--cream);box-shadow:0 0 32px rgba(0,200,150,0.32),inset 0 0 16px rgba(0,200,150,0.08)}
.btn-em span{position:relative;z-index:1}

.btn-gst{
  background:transparent;border:1px solid rgba(210,215,235,0.18);
  color:rgba(210,215,235,0.45);
  font-family:var(--fb);font-size:9px;letter-spacing:4px;text-transform:uppercase;
  padding:13px 36px;border-radius:2px;cursor:pointer;margin-top:14px;transition:all 0.25s;
}
.btn-gst:hover{border-color:var(--emerald);color:var(--emerald)}

/* ═══ ANIMATIONS ═══ */
.fade-up{animation:fadeUp 0.58s cubic-bezier(0.22,1,0.36,1) both}
@keyframes fadeUp{from{opacity:0;transform:translateY(44px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}

/* ═══ LABELS ═══ */
.lbl{font-family:var(--fb);font-weight:300;font-size:9px;letter-spacing:6px;text-transform:uppercase;color:rgba(0,200,150,0.62);margin-bottom:8px}
.lbl-gd{color:rgba(232,184,109,0.62)}
.h-em{font-family:var(--ft);font-size:2.6rem;font-weight:400;color:var(--emerald);text-shadow:0 0 30px rgba(0,200,150,0.45),0 0 80px rgba(0,200,150,0.18);line-height:1.05}
.h-gd{font-family:var(--ft);font-size:2.6rem;font-weight:400;color:var(--gold);text-shadow:0 0 30px rgba(232,184,109,0.45),0 0 80px rgba(232,184,109,0.18);line-height:1.05}

/* Islamic ornament line */
.orn{color:var(--gold);letter-spacing:10px;font-size:13px;opacity:0.65;margin:10px 0;display:block}

/* ═══ COUPLE CARDS ═══ */
.cc-grid{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin:18px 0;max-width:450px}
.cc{
  flex:1;min-width:185px;max-width:215px;
  border-radius:18px;padding:26px 18px 22px;
  position:relative;overflow:hidden;
  transition:transform 0.4s,box-shadow 0.4s;cursor:default;
}
.cc:hover{transform:translateY(-10px) rotateX(3deg) rotateY(-3deg)}
.cc-g{
  background:linear-gradient(160deg,rgba(0,55,44,0.55),rgba(0,28,22,0.8));
  border:1px solid rgba(0,200,150,0.38);
  box-shadow:0 20px 60px rgba(0,0,0,0.5),0 0 50px rgba(0,200,150,0.06);
}
.cc-g::before{content:'';position:absolute;top:-2px;left:18%;right:18%;height:2px;background:linear-gradient(90deg,transparent,var(--emerald),transparent)}
.cc-b{
  background:linear-gradient(160deg,rgba(55,35,0,0.55),rgba(28,18,0,0.8));
  border:1px solid rgba(232,184,109,0.38);
  box-shadow:0 20px 60px rgba(0,0,0,0.5),0 0 50px rgba(232,184,109,0.06);
}
.cc-b::before{content:'';position:absolute;top:-2px;left:18%;right:18%;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}

.cc-av{
  width:68px;height:68px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:30px;margin:0 auto 12px;position:relative;z-index:1;
}
.av-em{background:rgba(0,200,150,0.1);border:1.5px solid rgba(0,200,150,0.45);box-shadow:0 0 24px rgba(0,200,150,0.28)}
.av-gd{background:rgba(232,184,109,0.1);border:1.5px solid rgba(232,184,109,0.45);box-shadow:0 0 24px rgba(232,184,109,0.28)}

.cc-name{font-family:var(--ft);font-size:1.2rem;position:relative;z-index:1;margin-bottom:3px}
.cn-em{color:var(--emerald);text-shadow:0 0 18px rgba(0,200,150,0.5)}
.cn-gd{color:var(--gold);text-shadow:0 0 18px rgba(232,184,109,0.5)}
.cc-role{font-family:var(--fb);font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--silver);position:relative;z-index:1;margin-bottom:10px}
.cc-det{font-size:11px;color:var(--silver);line-height:1.75;font-weight:300;position:relative;z-index:1}
.cc-job{font-size:10px;letter-spacing:1px;margin-top:6px;padding:3px 10px;border-radius:100px;display:inline-block}
.j-em{color:var(--emerald);background:rgba(0,200,150,0.1);border:1px solid rgba(0,200,150,0.2)}
.j-gd{color:var(--gold);background:rgba(232,184,109,0.1);border:1px solid rgba(232,184,109,0.2)}

.family-box{
  background:rgba(8,13,26,0.6);border:1px solid var(--b-em);border-radius:14px;
  padding:20px 24px;max-width:420px;width:100%;margin-top:14px;text-align:left;
}
.fam-title{font-family:var(--fs);font-size:10px;letter-spacing:4px;color:rgba(0,200,150,0.65);text-transform:uppercase;margin-bottom:12px}
.fam-row{
  display:flex;justify-content:space-between;align-items:flex-start;
  padding:8px 0;border-bottom:0.5px solid rgba(255,255,255,0.05);font-size:12px;
}
.fam-row:last-child{border-bottom:none}
.fam-key{color:var(--silver);font-weight:300}
.fam-val{color:var(--cream);text-align:right;font-weight:300}

.qblock{
  background:linear-gradient(135deg,rgba(0,200,150,0.06),rgba(0,200,150,0.02));
  border-left:2px solid rgba(0,200,150,0.38);
  border-radius:0 10px 10px 0;
  padding:16px 22px;max-width:340px;margin-top:16px;text-align:left;
}
.qt{font-family:var(--fb);font-style:italic;font-size:13px;color:var(--silver);line-height:1.85;font-weight:300}
.qr{font-family:var(--fs);font-size:9px;letter-spacing:3px;color:rgba(0,200,150,0.58);text-transform:uppercase;margin-top:6px}

/* ═══ DATE + COUNTDOWN ═══ */
.date-pill{
  background:linear-gradient(135deg,rgba(0,200,150,0.09),rgba(0,200,150,0.03));
  border:1px solid var(--b-em);border-radius:100px;
  padding:16px 38px;display:inline-block;margin-bottom:10px;
}
.dp-main{font-family:var(--ft);font-size:1.55rem;color:var(--cream);font-weight:400}
.dp-sub{font-family:var(--fb);font-size:9px;letter-spacing:4px;color:rgba(0,200,150,0.75);text-transform:uppercase;margin-top:5px}

.cd-row{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin:22px 0}
.cd-box{width:88px;perspective:400px}
.cd-inner{
  background:linear-gradient(145deg,rgba(12,18,40,0.92),rgba(5,8,16,0.97));
  border:1px solid var(--b-em);border-radius:12px;
  padding:18px 10px 16px;position:relative;
  transition:transform 0.3s,box-shadow 0.3s;
  box-shadow:0 12px 36px rgba(0,0,0,0.5),inset 0 1px 0 rgba(0,200,150,0.1);
}
.cd-inner:hover{transform:translateY(-10px) rotateX(12deg) rotateY(6deg);box-shadow:0 28px 70px rgba(0,0,0,0.6),0 0 50px rgba(0,200,150,0.15)}
.cd-num{font-family:var(--ft);font-size:2.5rem;font-weight:700;color:var(--emerald);display:block;line-height:1;text-shadow:0 0 22px rgba(0,200,150,0.55)}
.cd-lbl{font-family:var(--fb);font-size:8px;letter-spacing:3px;text-transform:uppercase;color:rgba(0,200,150,0.52);margin-top:4px}
.cd-sec-num{font-family:var(--ft);font-size:2.5rem;font-weight:700;color:var(--gold);display:block;line-height:1;text-shadow:0 0 22px rgba(232,184,109,0.55)}
.cd-sec-lbl{font-family:var(--fb);font-size:8px;letter-spacing:3px;text-transform:uppercase;color:rgba(232,184,109,0.52);margin-top:4px}
.cd-sep{font-family:var(--ft);font-size:1.8rem;color:rgba(0,200,150,0.22);padding-bottom:14px;display:flex;align-items:center;animation:blink2 1s ease-in-out infinite}
@keyframes blink2{0%,100%{opacity:0.15}50%{opacity:0.8}}

/* ═══ VENUE + MAP ═══ */
.venue-wrap{max-width:400px;width:100%;margin:14px 0}
.venue-top{
  background:linear-gradient(155deg,rgba(12,18,40,0.88),rgba(5,8,16,0.97));
  border:1px solid rgba(0,200,150,0.32);border-radius:16px 16px 0 0;
  padding:28px 24px 22px;position:relative;overflow:hidden;
}
.venue-top::before{content:'';position:absolute;top:0;left:18%;right:18%;height:2px;background:linear-gradient(90deg,transparent,var(--emerald),transparent)}
.v-icon{
  width:54px;height:54px;background:rgba(0,200,150,0.09);
  border:1px solid rgba(0,200,150,0.28);border-radius:12px;
  display:flex;align-items:center;justify-content:center;
  font-size:26px;margin:0 auto 14px;box-shadow:0 0 24px rgba(0,200,150,0.14);
}
.v-name{font-family:var(--ft);font-size:1.25rem;color:var(--cream);margin-bottom:6px}
.v-addr{font-size:12px;color:var(--silver);line-height:1.8;font-weight:300}

/* Embedded map iframe style */
.map-frame-wrap{
  width:100%;border-radius:0;overflow:hidden;
  border:1px solid rgba(0,200,150,0.15);border-top:none;
  position:relative;
}
.map-frame{width:100%;height:180px;border:none;filter:invert(90%) hue-rotate(160deg) saturate(0.8) brightness(0.9)}
.map-overlay-btn{
  position:absolute;bottom:10px;right:10px;
  background:rgba(8,13,26,0.92);border:1px solid var(--emerald);
  color:var(--emerald);border-radius:100px;
  padding:7px 18px;font-family:var(--fb);font-size:9px;letter-spacing:2px;text-transform:uppercase;
  cursor:pointer;text-decoration:none;transition:all 0.25s;
  backdrop-filter:blur(8px);
}
.map-overlay-btn:hover{background:rgba(0,200,150,0.2)}

.sched-box{
  background:rgba(8,13,26,0.82);border:1px solid rgba(0,200,150,0.14);
  border-top:none;border-radius:0 0 16px 16px;padding:18px 24px;
}
.s-row{display:flex;justify-content:space-between;align-items:center;padding:9px 0;font-size:12px;font-weight:300;color:var(--silver);border-bottom:0.5px solid rgba(255,255,255,0.05)}
.s-row:last-child{border-bottom:none}
.s-time{font-family:var(--fb);color:var(--emerald);font-size:10px;letter-spacing:2px}

/* ═══ MEDIA PAGE ═══ */
.sub-nav{
  display:flex;gap:6px;margin-bottom:18px;
  background:rgba(8,13,26,0.62);border:1px solid var(--b-em);
  border-radius:100px;padding:5px;
}
.s-tab{
  padding:8px 22px;border-radius:100px;
  font-family:var(--fb);font-size:9px;letter-spacing:3px;text-transform:uppercase;
  cursor:pointer;transition:all 0.25s;color:var(--silver);background:transparent;border:none;
}
.s-tab.on{background:rgba(0,200,150,0.14);color:var(--emerald);box-shadow:0 0 16px rgba(0,200,150,0.18)}

/* Photo upload grid */
.photo-grid{
  display:grid;grid-template-columns:repeat(3,1fr);
  gap:8px;max-width:420px;width:100%;margin:16px 0;
}
.photo-slot{
  aspect-ratio:1;border-radius:10px;overflow:hidden;
  background:rgba(12,18,40,0.8);border:1px solid rgba(0,200,150,0.14);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  position:relative;cursor:pointer;
  transition:transform 0.3s,box-shadow 0.3s;
}
.photo-slot:hover{transform:scale(1.04);box-shadow:0 12px 40px rgba(0,200,150,0.2),0 0 0 1px var(--emerald)}
.photo-slot.big{grid-column:span 2;grid-row:span 2}
.photo-slot.big .ps-ico{font-size:52px}
.ps-ico{font-size:28px;transition:transform 0.3s}
.photo-slot:hover .ps-ico{transform:scale(1.15)}
.ps-lbl{font-family:var(--fb);font-size:8px;letter-spacing:2px;text-transform:uppercase;color:rgba(0,200,150,0.7);margin-top:6px}
.photo-slot.add-slot{
  border:1px dashed rgba(0,200,150,0.25);
  color:rgba(0,200,150,0.4);
}
.photo-slot.add-slot:hover{border-color:var(--emerald);color:var(--emerald)}

.photo-note{
  background:rgba(0,200,150,0.07);border:1px solid rgba(0,200,150,0.15);
  border-radius:10px;padding:14px 20px;max-width:360px;width:100%;
  font-size:12px;color:var(--silver);font-weight:300;line-height:1.7;
  font-style:italic;
}

/* Video cards */
.vid-section{max-width:420px;width:100%;margin:14px 0}
.vid-card{
  background:rgba(8,13,26,0.72);border:1px solid var(--b-em);
  border-radius:16px;overflow:hidden;margin-bottom:14px;
  transition:transform 0.3s,box-shadow 0.3s;
}
.vid-card:hover{transform:translateY(-4px);box-shadow:0 24px 60px rgba(0,0,0,0.5),0 0 60px rgba(0,200,150,0.07)}
.vid-thumb{
  width:100%;aspect-ratio:16/9;
  background:linear-gradient(135deg,rgba(0,40,32,0.85),rgba(0,20,16,0.92));
  display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;
}
.vid-thumb::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 30% 30%,rgba(0,200,150,0.1),transparent 60%)}
.vid-thumb-emoji{font-size:42px;position:relative;z-index:1}
.play-ring{
  position:absolute;width:64px;height:64px;border-radius:50%;
  background:rgba(0,200,150,0.14);border:2px solid rgba(0,200,150,0.55);
  display:flex;align-items:center;justify-content:center;font-size:22px;
  box-shadow:0 0 40px rgba(0,200,150,0.28);
  animation:playP 2.5s ease-in-out infinite;z-index:2;cursor:pointer;
  transition:all 0.3s;
}
@keyframes playP{0%,100%{box-shadow:0 0 30px rgba(0,200,150,0.25)}50%{box-shadow:0 0 60px rgba(0,200,150,0.6),0 0 100px rgba(0,200,150,0.18)}}
.play-ring:hover{background:rgba(0,200,150,0.28);transform:scale(1.1)}
.vid-info{padding:14px 18px}
.vid-title{font-family:var(--ft);font-size:0.95rem;color:var(--cream);margin-bottom:4px}
.vid-sub{font-size:11px;color:var(--silver);font-weight:300;letter-spacing:1px}
.vid-tag{display:inline-block;background:rgba(0,200,150,0.09);border:1px solid rgba(0,200,150,0.22);border-radius:100px;padding:3px 12px;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--emerald);margin-top:6px}

/* upload hint */
.upload-hint{
  border:1px dashed rgba(0,200,150,0.22);border-radius:14px;
  padding:22px;max-width:380px;width:100%;
  display:flex;flex-direction:column;align-items:center;gap:10px;
  cursor:pointer;transition:all 0.25s;
}
.upload-hint:hover{border-color:var(--emerald);background:rgba(0,200,150,0.04)}
.uh-ico{font-size:32px}
.uh-text{font-size:12px;color:var(--silver);font-weight:300}
.uh-sub{font-size:10px;color:rgba(0,200,150,0.55);letter-spacing:1px}

/* ═══ RSVP ═══ */
.rsvp-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin:22px 0}
.rsvp-opt{
  width:155px;padding:24px 14px;border-radius:14px;cursor:pointer;
  transition:all 0.35s;display:flex;flex-direction:column;align-items:center;gap:10px;
  background:rgba(8,13,26,0.72);
}
.opt-y{border:1px solid var(--b-em)}
.opt-n{border:1px solid rgba(210,215,235,0.14)}
.rsvp-opt:hover{transform:translateY(-8px)}
.opt-y:hover{box-shadow:0 18px 45px rgba(0,200,150,0.2);border-color:var(--emerald)}
.opt-n:hover{box-shadow:0 18px 45px rgba(0,0,0,0.4);border-color:rgba(210,215,235,0.32)}
.sel-y{border-color:var(--emerald);background:rgba(0,200,150,0.1);box-shadow:0 0 40px rgba(0,200,150,0.14)}
.sel-n{border-color:rgba(210,215,235,0.32);background:rgba(210,215,235,0.04)}
.r-ico{font-size:36px}
.r-lbl{font-family:var(--fb);font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--silver)}

.rsvp-msg{
  background:rgba(0,200,150,0.06);border:1px solid var(--b-em);
  border-radius:12px;padding:20px 24px;max-width:320px;animation:fadeUp 0.4s ease;
}
.rsvp-msg.no-msg{background:rgba(210,215,235,0.04);border-color:rgba(210,215,235,0.18)}
.rsvp-msg h3{font-family:var(--ft);font-size:1.3rem;color:var(--emerald)}
.rsvp-msg.no-msg h3{color:var(--silver)}
.rsvp-msg p{font-size:12px;color:var(--silver);margin-top:8px;line-height:1.75;font-weight:300}

/* ═══ GUEST ═══ */
.g-row{display:flex;align-items:center;gap:44px;margin:28px 0}
.gbtn{
  width:58px;height:58px;border-radius:50%;
  background:rgba(0,200,150,0.07);border:1px solid var(--b-em);
  color:var(--emerald);font-size:24px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all 0.25s;font-family:var(--ft);
}
.gbtn:hover{background:rgba(0,200,150,0.2);transform:scale(1.14);box-shadow:0 0 24px rgba(0,200,150,0.28)}
.gnum{
  font-family:var(--ft);font-size:5.5rem;font-weight:700;color:var(--emerald);
  min-width:84px;text-align:center;text-shadow:0 0 40px rgba(0,200,150,0.48);transition:transform 0.15s;
}
.gnum.bmp{animation:bump 0.22s ease}
@keyframes bump{0%,100%{transform:scale(1)}50%{transform:scale(1.22)}}
.gnote{font-family:var(--fb);font-size:10px;letter-spacing:2px;color:var(--silver);text-transform:uppercase}

/* ═══ FINAL ═══ */
.fin-ring{width:110px;height:110px;margin:0 auto 22px;animation:finR 14s linear infinite}
@keyframes finR{to{transform:rotate(360deg)}}
.dua-scroll{
  background:linear-gradient(160deg,rgba(12,18,40,0.72),rgba(5,8,16,0.85));
  border:1px solid var(--b-em);border-radius:18px;
  padding:32px 30px;max-width:400px;position:relative;overflow:hidden;
}
.dua-scroll::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--emerald),var(--gold),transparent)}
.dua-scroll::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),var(--emerald),transparent)}
.dua-body{font-family:var(--fb);font-style:italic;font-weight:300;font-size:14px;color:var(--silver);line-height:2.1}
.dua-arabic{font-size:20px;display:block;margin:14px 0 8px;color:var(--gold);text-shadow:0 0 20px rgba(232,184,109,0.4)}
.dua-sig{
  font-family:var(--ft);font-size:0.95rem;margin-top:16px;
  background:linear-gradient(90deg,var(--emerald),var(--gold));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}

.wa-btn{
  display:inline-flex;align-items:center;gap:10px;
  background:linear-gradient(135deg,#128c7e,#075e54);
  color:#fff;border:none;border-radius:100px;
  padding:15px 38px;font-family:var(--fb);
  font-size:10px;letter-spacing:3px;text-transform:uppercase;
  cursor:pointer;margin-top:16px;transition:all 0.25s;
}
.wa-btn:hover{transform:translateY(-3px);box-shadow:0 12px 36px rgba(18,140,126,0.5)}

/* ═══ PROGRESS ═══ */
.prail{display:flex;gap:7px;justify-content:center;margin-top:30px}
.pdot{width:6px;height:6px;border-radius:50%;background:rgba(0,200,150,0.14);transition:all 0.4s cubic-bezier(0.23,1,0.32,1)}
.pdot.on{background:var(--emerald);transform:scale(1.6);box-shadow:0 0 12px rgba(0,200,150,0.65)}
.pdot.done{background:rgba(0,200,150,0.42);transform:scale(1.1)}

/* ═══ CONFETTI ═══ */
.cpc{position:fixed;top:-10px;pointer-events:none;z-index:999;animation:cfall linear forwards}
@keyframes cfall{to{transform:translateY(110vh) rotate(600deg);opacity:0}}

@media(max-width:480px){
  .fp-names{font-size:1.85rem}
  .h-em,.h-gd{font-size:2rem}
  .cd-num,.cd-sec-num{font-size:2rem}.cd-box{width:76px}
  .fp-card{padding:46px 24px 42px}
  .gnum{font-size:4rem}
  .cc{min-width:155px}
  .photo-grid{gap:6px}
}
`;

/* ══ NEBULA ═══════════════════════════════════════════════════════ */
function Nebula() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let raf, t = 0;
    const resize = () => { c.width = innerWidth; c.height = innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 220 }, () => ({
      x: Math.random(), y: Math.random(),
      r: 0.3 + Math.random() * 1.7,
      sp: 0.0002 + Math.random() * 0.0005,
      ph: Math.random() * Math.PI * 2,
      col: Math.random() > 0.78 ? "em" : Math.random() > 0.6 ? "gd" : "sl",
    }));
    const lines = [[0,14],[14,32],[32,55],[55,78],[78,100],[2,22],[22,48],[1,18],[18,40],[5,25]];
    const draw = () => {
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);
      [[0.2,0.2,0.18,"rgba(0,200,150,0.022)"],[0.8,0.75,0.22,"rgba(232,184,109,0.016)"],[0.5,0.5,0.12,"rgba(0,100,80,0.018)"]].forEach(([fx,fy,fr,col])=>{
        const g=ctx.createRadialGradient(fx*W,fy*H,0,fx*W,fy*H,fr*Math.max(W,H));
        g.addColorStop(0,col);g.addColorStop(1,"transparent");
        ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
      });
      ctx.lineWidth=0.5;
      lines.forEach(([a,b])=>{
        if(a>=pts.length||b>=pts.length)return;
        ctx.strokeStyle="rgba(0,200,150,0.06)";
        ctx.beginPath();ctx.moveTo(pts[a].x*W,pts[a].y*H);ctx.lineTo(pts[b].x*W,pts[b].y*H);ctx.stroke();
      });
      pts.forEach(p=>{
        const pulse=0.5+0.5*Math.sin(t*p.sp*1000+p.ph),a=0.22+0.62*pulse;
        ctx.beginPath();ctx.arc(p.x*W,p.y*H,p.r*(0.7+0.5*pulse),0,Math.PI*2);
        ctx.fillStyle=p.col==="em"?`rgba(0,200,150,${a})`:p.col==="gd"?`rgba(232,184,109,${a*0.65})`:`rgba(184,200,220,${a*0.45})`;
        ctx.fill();
      });
      ctx.beginPath();ctx.ellipse(W*0.5,H*0.38,190,52,t*0.00035,0,Math.PI*2);
      ctx.strokeStyle="rgba(0,200,150,0.025)";ctx.lineWidth=1;ctx.stroke();
      t++;raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  }, []);
  return <canvas ref={ref} id="neb"/>;
}

/* ══ SPIN RING ════════════════════════════════════════════════════ */
function SpinRing({ sz = 92, c1 = "#00c896", c2 = "#e8b86d" }) {
  const c = sz / 2;
  const pts = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6, r = sz * 0.4, ri = sz * 0.26;
    return i % 2 === 0 ? [c + r * Math.cos(a), c + r * Math.sin(a)] : [c + ri * Math.cos(a), c + ri * Math.sin(a)];
  });
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + " Z";
  return (
    <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`}>
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1}/><stop offset="100%" stopColor={c2}/>
        </linearGradient>
      </defs>
      <circle cx={c} cy={c} r={sz*0.46} fill="none" stroke={c1} strokeWidth="0.8" opacity="0.28"/>
      <circle cx={c} cy={c} r={sz*0.33} fill="none" stroke={c2} strokeWidth="0.5" opacity="0.22"/>
      <path d={d} fill="none" stroke="url(#rg)" strokeWidth="1.1" opacity="0.88"/>
      <circle cx={c} cy={c} r={sz*0.07} fill="url(#rg)"/>
    </svg>
  );
}

/* ══ CONFETTI ═════════════════════════════════════════════════════ */
function Confetti({ on }) {
  const [pcs, setPcs] = useState([]);
  useEffect(() => {
    if (!on) return;
    const cols = ["#00c896","#e8b86d","#f0ece2","#80ffcc","#ffd580","#00a87e"];
    const arr = Array.from({ length: 75 }, (_, i) => ({
      id: i, left: Math.random() * 100, col: cols[i % cols.length],
      dur: 1.4 + Math.random() * 1.6, delay: Math.random() * 1.4,
      sz: 5 + Math.random() * 10, rd: Math.random() > 0.4,
    }));
    setPcs(arr);
    const t = setTimeout(() => setPcs([]), 5500);
    return () => clearTimeout(t);
  }, [on]);
  return <>{pcs.map(p => (
    <div key={p.id} className="cpc" style={{
      left: `${p.left}%`, background: p.col, width: p.sz, height: p.sz,
      borderRadius: p.rd ? "50%" : "2px",
      animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`,
    }}/>
  ))}</>;
}

/* ══ PROGRESS ════════════════════════════════════════════════════ */
function Rail({ cur, tot }) {
  return (
    <div className="prail">
      {Array.from({ length: tot }, (_, i) => (
        <div key={i} className={`pdot${i === cur ? " on" : i < cur ? " done" : ""}`}/>
      ))}
    </div>
  );
}

/* ══ COUNTDOWN HOOK ══════════════════════════════════════════════ */
function useCD(date) {
  const calc = () => {
    const d = Math.max(0, new Date(date).getTime() - Date.now());
    return {
      days: Math.floor(d / 86400000),
      hours: Math.floor((d % 86400000) / 3600000),
      minutes: Math.floor((d % 3600000) / 60000),
      seconds: Math.floor((d % 60000) / 1000),
    };
  };
  const [v, setV] = useState(calc);
  useEffect(() => { const id = setInterval(() => setV(calc()), 1000); return () => clearInterval(id); }, []);
  return v;
}

/* ══ WHATSAPP ════════════════════════════════════════════════════ */
const doWA = () => {
  const m = encodeURIComponent(
    "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\n\n" +
    "https://wedding-7xyf.vercel.app/"+
    "✨ *You Are Cordially Invited* ✨\n\n" +
    "With the blessings of Allah ﷻ, we joyfully invite you to the Nikah of\n\n" +
    "💎 *Niyas* & *Sana* 💎\n\n" +
    "📅 *Saturday, 27 June 2026*\n" +
    "⏰ *11:00 AM onwards*\n" +
    "📍 *Vengad Vista Auditorium, Valanchery, Malappuram*\n\n" +
    "🗺️ Location: https://www.google.com/maps/place/Vista+Convention+Centre,+Vengad/@10.9170797,76.1007117,4665m/data=!3m1!1e3!4m15!1m8!3m7!1s0x3ba7b62fb0deed2f:0x9ce32ca32190d8f!2sValanchery+-+Nilambur+Rd,+Kerala,+India!3b1!8m2!3d11.0822073!4d76.2163445!16s%2Fg%2F12xqlb_zy!3m5!1s0x3ba7c910775ee73b:0xeefdaac87c9ad640!8m2!3d10.9230565!4d76.1275024!16s%2Fg%2F11qywc0mr8?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D\n\n" +
    "Your presence, duas and blessings mean everything to us 🤲\n\n" +
    "جَزَاكُمُ اللَّهُ خَيْرًا\n" +
    "Jazakumullahu Khairan 💚"
  );
  window.open("https://wa.me/?text=" + m, "_blank");
};

const PHONE = "9645315976"; // Replace with actual number

/* ══ MEDIA DATA ══════════════════════════════════════════════════ */
const PHOTOS = [
  { big: true, ico: "💍", lbl: "Nikah" },
  { ico: "🕌", lbl: "Masjid" }, { ico: "🌹", lbl: "Flowers" },
  { ico: "🪔", lbl: "Decor" }, { ico: "👗", lbl: "Bride" },
  { ico: "🤵", lbl: "Groom" }, { ico: "🎊", lbl: "Family" },
  { ico: "🌙", lbl: "Night" }, { ico: "📿", lbl: "Mahr" },
];
const VIDS = [
  { ico: "🎬", title: "Nikah Ceremony Highlights", sub: "Vengad Vista Auditorium · 27 June 2026", tag: "Official" },
  { ico: "🎥", title: "Walima Reception", sub: "Reception footage · Coming soon", tag: "Preview" },
  { ico: "📸", title: "Pre-wedding Moments", sub: "Family & preparation memories", tag: "Family" },
];

/* ══ MAIN ════════════════════════════════════════════════════════ */
export default function App() {
  const [step, setStep] = useState(0);
  const [rsvp, setRsvp] = useState(null);
  const [guests, setGuests] = useState(2);
  const [bmp, setBmp] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [akey, setAkey] = useState(0);
  const [mediaTab, setMediaTab] = useState("Photos");
  const cd = useCD("2026-06-27T11:00:00");
  const TOTAL = 8;

  const go = (n) => {
    setStep(n); setAkey(k => k + 1);
    if (n === 7) setTimeout(() => setConfetti(true), 300);
    else setConfetti(false);
  };
  const chG = (d) => { setGuests(g => Math.max(1, g + d)); setBmp(true); setTimeout(() => setBmp(false), 250); };

  return (
    <>
      <style>{G}</style>
      <Nebula/>
      <div className="grain"/>
      <Confetti on={confetti}/>

      {/* ═══ STEP 0: FRONT PAGE ═══════════════════════════════════ */}
      {step === 0 && (
        <div className="scr">
          <div className="fp-wrap">
            <div className="fp-halo"/>
            <div className="fp-card">
              <div className="orb orb1"/><div className="orb orb2"/>
              <div className="brk tl"/><div className="brk tr"/>
              <div className="brk bl"/><div className="brk br"/>

              <div className="spin-ring"><SpinRing sz={92}/></div>

              <span className="arabic-bismillah">﷽</span>
              <p className="fp-tag">A Sacred Nikah Invitation</p>
              <div className="divl"><div className="dmnd"/></div>

              <h1 className="fp-names">
                <span className="glow-em">Niyas</span>
                <span className="fp-amp">✦ &amp; ✦</span>
                <span className="glow-gd">Sana Fathima</span>
              </h1>

              <div className="divl" style={{marginTop:14}}><div className="dmnd"/></div>
              <p className="fp-bism">
                Bismillahir Rahmanir Raheem<br/>
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا<br/>
                <span style={{fontSize:11,opacity:0.7}}>With the blessings of Allah ﷻ, we announce our Nikah</span>
              </p>
              <button className="btn-em" onClick={() => go(1)}><span>✉ Open Invitation</span></button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ STEP 1: COUPLE PROFILES ══════════════════════════════ */}
      {step === 1 && (
        <div className="scr fade-up" key={`s1${akey}`}>
          <p className="lbl">Meet The Couple</p>
          <span className="orn">❧ ✦ ❧</span>

          <div className="cc-grid">
            {/* Groom Card */}
            <div className="cc cc-g">
              <div className="cc-av av-em">🤵</div>
              <div className="cc-name cn-em">Niyas</div>
              <div className="cc-role">The Groom</div>
              <div className="cc-det">
                Son of<br/>
                <strong style={{color:"var(--cream)"}}>Mr. hyder ali  </strong><br/>
                <strong style={{color:"var(--cream)"}}>Mrs. Fathima </strong><br/>
                <span style={{opacity:0.7}}>Vengad, Valanchery<br/>Malappuram, Kerala</span>
                <br/><br/>
                <strong style={{color:"var(--cream)"}}>Sisters:</strong> Rameesa · Raneesha
              </div>
              <span className="cc-job j-em">Interior Designer</span>
            </div>

            {/* Bride Card */}
            <div className="cc cc-b">
              <div className="cc-av av-gd">👰</div>
              <div className="cc-name cn-gd">Sana</div>
              <div className="cc-role">The Bride</div>
              <div className="cc-det">
                Daughter of<br/>
                <strong style={{color:"var(--cream)"}}>Mr. Veeran</strong><br/>
                <strong style={{color:"var(--cream)"}}>Mrs. Rafeeqa</strong><br/>
                <span style={{opacity:0.7}}>Kavumpuram,<br/>Valanchery, Kerala</span>
                <br/><br/>
              </div>
              <span className="cc-job j-gd">Teacher</span>
            </div>
          </div>

          <div className="qblock">
            <p className="qt">"And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."</p>
            <p className="qr">— Surah Ar-Rum 30:21</p>
          </div>

          <button className="btn-em" onClick={() => go(2)} style={{marginTop:22}}><span>View Date →</span></button>
          <Rail cur={1} tot={TOTAL}/>
        </div>
      )}

      {/* ═══ STEP 2: DATE + COUNTDOWN (with seconds) ══════════════ */}
      {step === 2 && (
        <div className="scr fade-up" key={`s2${akey}`}>
          <p className="lbl">Mark Your Calendar</p>
          <h2 className="h-em" style={{marginBottom:18}}>The Date</h2>

          <div className="date-pill">
            <div className="dp-main">27 June 2026 · Saturday</div>
            <div className="dp-sub">11:00 AM · Valanchery, Malappuram</div>
          </div>

          <p style={{fontSize:11,color:"rgba(0,200,150,0.55)",letterSpacing:3,textTransform:"uppercase",marginTop:20,fontFamily:"var(--fs)"}}>
            Insha Allah — Time Remaining
          </p>

          <div className="cd-row">
            {[["days","Days","em"],["hours","Hours","em"],["minutes","Mins","em"],["seconds","Secs","gd"]].map(([k,l,cl],i)=>(
              <div key={k} style={{display:"flex",alignItems:"center"}}>
                <div className="cd-box">
                  <div className="cd-inner">
                    <span className={cl==="gd"?"cd-sec-num":"cd-num"}>{cd[k]}</span>
                    <span className={cl==="gd"?"cd-sec-lbl":"cd-lbl"}>{l}</span>
                  </div>
                </div>
                {i < 3 && <div className="cd-sep">:</div>}
              </div>
            ))}
          </div>

          <div className="qblock" style={{marginBottom:8}}>
            <p className="qt">"Indeed, with hardship will be ease. Indeed, with hardship will be ease."</p>
            <p className="qr">— Surah Ash-Sharh 94:5-6</p>
          </div>

          <button className="btn-em" onClick={() => go(3)}><span>View Venue →</span></button>
          <Rail cur={2} tot={TOTAL}/>
        </div>
      )}

      {/* ═══ STEP 3: VENUE + LIVE MAP ═════════════════════════════ */}
      {step === 3 && (
        <div className="scr fade-up" key={`s3${akey}`}>
          <p className="lbl">You Are Welcome At</p>
          <h2 className="h-em" style={{marginBottom:18}}>Venue</h2>

          <div className="venue-wrap">
            <div className="venue-top">
              <div className="v-icon">🕌</div>
              <div className="v-name">Vengad Vista Auditorium</div>
              <div className="v-addr">
                Vengad, Valanchery<br/>
                Malappuram, Kerala — 676 552<br/>
                <span style={{color:"rgba(0,200,150,0.6)",fontSize:11,letterSpacing:1}}>
                  📍 Near Moorkkannur · Via Perintalmanna &amp; Kolathoor
                </span>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="map-frame-wrap">
              <iframe
                className="map-frame"
                src="https://www.google.com/maps/place/Vista+Convention+Centre,+Vengad/@10.9170797,76.1007117,4665m/data=!3m1!1e3!4m15!1m8!3m7!1s0x3ba7b62fb0deed2f:0x9ce32ca32190d8f!2sValanchery+-+Nilambur+Rd,+Kerala,+India!3b1!8m2!3d11.0822073!4d76.2163445!16s%2Fg%2F12xqlb_zy!3m5!1s0x3ba7c910775ee73b:0xeefdaac87c9ad640!8m2!3d10.9230565!4d76.1275024!16s%2Fg%2F11qywc0mr8?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
                allowFullScreen=""
                loading="lazy"
                title="Vengad Vista Auditorium Map"
              />
              <a
                className="map-overlay-btn"
                href="https://www.google.com/maps/place/Vista+Convention+Centre,+Vengad/@10.9170797,76.1007117,4665m/data=!3m1!1e3!4m15!1m8!3m7!1s0x3ba7b62fb0deed2f:0x9ce32ca32190d8f!2sValanchery+-+Nilambur+Rd,+Kerala,+India!3b1!8m2!3d11.0822073!4d76.2163445!16s%2Fg%2F12xqlb_zy!3m5!1s0x3ba7c910775ee73b:0xeefdaac87c9ad640!8m2!3d10.9230565!4d76.1275024!16s%2Fg%2F11qywc0mr8?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                📍 Open Maps
              </a>
            </div>

            <div className="sched-box">
              <p className="lbl" style={{textAlign:"left",marginBottom:10}}>Programme</p>
              {[
                ["Guests Arrive","10:30 AM"],
                ["Nikah Ceremony","11:00 AM"],
                ["Du'a & Blessings","12:00 PM"],
                ["Food & Reception","12:30 PM"],
                ["Photo & Songs","2:00 PM"],
                ["Walima Celebration","3:00 PM"],
              ].map(([ev,tm])=>(
                <div className="s-row" key={ev}><span>{ev}</span><span className="s-time">{tm}</span></div>
              ))}
            </div>
          </div>

          <button className="btn-em" onClick={() => go(4)}><span>Photos &amp; Videos →</span></button>
          <Rail cur={3} tot={TOTAL}/>
        </div>
      )}

      {/* ═══ STEP 4: MEDIA (Photos + Videos) ════════════════════ */}
      {step === 4 && (
        <div className="scr fade-up" key={`s4${akey}`}>
          <p className="lbl">Memories &amp; Moments</p>
          <h2 className="h-em" style={{marginBottom:14}}>Media</h2>

          <div className="sub-nav">
            {["Photos","Videos"].map(t => (
              <button key={t} className={`s-tab${mediaTab===t?" on":""}`} onClick={()=>setMediaTab(t)}>{t}</button>
            ))}
          </div>

          {mediaTab === "Photos" && (
            <>
              <div className="photo-grid">
                {PHOTOS.map((p, i) => (
                  <div key={i} className={`photo-slot${p.big?" big":""}`}>
                    <span className="ps-ico">{p.ico}</span>
                    <span className="ps-lbl">{p.lbl}</span>
                  </div>
                ))}
                <div className="photo-slot add-slot">
                  <span style={{fontSize:26}}>📷</span>
                  <span className="ps-lbl">Add Photo</span>
                </div>
              </div>
              <div className="photo-note">
                📸 Photos will be updated here after the ceremony.<br/>
                Family members can share their photos with us to add them here.
              </div>
            </>
          )}

          {mediaTab === "Videos" && (
            <div className="vid-section">
              {VIDS.map((v, i) => (
                <div className="vid-card" key={i}>
                  <div className="vid-thumb">
                    <span className="vid-thumb-emoji">{v.ico}</span>
                    <div className="play-ring">▶</div>
                  </div>
                  <div className="vid-info">
                    <div className="vid-title">{v.title}</div>
                    <div className="vid-sub">{v.sub}</div>
                    <span className="vid-tag">{v.tag}</span>
                  </div>
                </div>
              ))}
              <div className="upload-hint">
                <span className="uh-ico">🎬</span>
                <span className="uh-text">Videos will be uploaded after the ceremony</span>
                <span className="uh-sub">Share your clips with us to feature here</span>
              </div>
            </div>
          )}

          <button className="btn-em" onClick={() => go(5)} style={{marginTop:16}}><span>RSVP →</span></button>
          <Rail cur={4} tot={TOTAL}/>
        </div>
      )}

      {/* ═══ STEP 5: RSVP ════════════════════════════════════════ */}
      {step === 5 && (
        <div className="scr fade-up" key={`s5${akey}`}>
          <p className="lbl">Your Presence</p>
          <h2 className="h-em">Will You Join Us?</h2>
          <p style={{fontSize:13,color:"var(--silver)",maxWidth:300,marginTop:10,fontWeight:300,lineHeight:1.8}}>
            Your presence will illuminate our blessed day.<br/>
            <span style={{fontSize:12,color:"rgba(0,200,150,0.6)"}}>رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا</span>
          </p>

          <div className="rsvp-row">
            <div className={`rsvp-opt opt-y${rsvp==="yes"?" sel-y":""}`} onClick={()=>setRsvp("yes")}>
              <span className="r-ico">🤲</span>
              <span className="r-lbl">Yes, Insha Allah</span>
            </div>
            <div className={`rsvp-opt opt-n${rsvp==="no"?" sel-n":""}`} onClick={()=>setRsvp("no")}>
              <span className="r-ico">😔</span>
              <span className="r-lbl">Regretfully No</span>
            </div>
          </div>

          {rsvp === "yes" && (
            <div className="rsvp-msg">
              <h3>Masha Allah! ✨</h3>
              <p>
                Alhamdulillah! Baarakallahu feekum — may Allah bless you and your family abundantly.
                We are overjoyed to have you celebrate with us on this blessed day!
                <br/><br/>
                <span style={{color:"rgba(0,200,150,0.7)",fontSize:11}}>جَزَاكَ اللَّهُ خَيْرًا · Jazakallahu Khairan 💚</span>
              </p>
            </div>
          )}
          {rsvp === "no" && (
            <div className="rsvp-msg no-msg">
              <h3 style={{color:"var(--silver)"}}>We Understand 🤍</h3>
              <p>
                Jazakallahu Khairan for letting us know. We will truly miss your presence.
                Please keep Niyas &amp; Sana in your duas — your blessings mean everything.
                <br/><br/>
                <span style={{color:"rgba(232,184,109,0.7)",fontSize:11}}>بَارَكَ اللَّهُ فِيكَ · May Allah bless you always 🌙</span>
              </p>
            </div>
          )}

          <button className="btn-em" onClick={() => go(6)} style={{marginTop:22}}><span>Continue →</span></button>
          <Rail cur={5} tot={TOTAL}/>
        </div>
      )}

      {/* ═══ STEP 6: GUEST COUNT ══════════════════════════════════ */}
      {step === 6 && (
        <div className="scr fade-up" key={`s6${akey}`}>
          <p className="lbl">Help Us Prepare</p>
          <h2 className="h-em">Guest Count</h2>
          <p style={{fontSize:12,color:"var(--silver)",letterSpacing:1,marginTop:8,fontWeight:300}}>
            Including yourself — so we can arrange accordingly
          </p>

          <div className="g-row">
            <button className="gbtn" onClick={() => chG(-1)}>−</button>
            <span className={`gnum${bmp?" bmp":""}`}>{guests}</span>
            <button className="gbtn" onClick={() => chG(1)}>+</button>
          </div>

          <p className="gnote">{guests} {guests === 1 ? "person" : "guests"} attending, Insha Allah</p>

          <div className="qblock" style={{marginTop:20}}>
            <p className="qt">"Whoever honours the signs of Allah — indeed, it is from the piety of hearts."</p>
            <p className="qr">— Surah Al-Hajj 22:32</p>
          </div>

          <button className="btn-em" onClick={() => go(7)} style={{marginTop:28}}><span>Confirm →</span></button>
          <Rail cur={6} tot={TOTAL}/>
        </div>
      )}

      {/* ═══ STEP 7: FINAL THANK YOU ══════════════════════════════ */}
      {step === 7 && (
        <div className="scr fade-up" key={`s7${akey}`}>
          <div className="fin-ring"><SpinRing sz={110}/></div>

          <p className="lbl">Jazakallah Khair</p>
          <h2 className="h-em" style={{marginBottom:18}}>Thank You</h2>

          <div className="dua-scroll">
            <p className="dua-body">
              Your love, presence, and blessed duas<br/>
              will make our Nikah day truly radiant.
            </p>
            <span className="dua-arabic">اللَّهُمَّ بَارِكْ لَنَا فِي نِكَاحِنَا</span>
            <p className="dua-body">
              O Allah, bless us in our union and<br/>
              shower Your mercy upon all who<br/>
              celebrate with us.<br/><br/>
              <em style={{color:"rgba(0,200,150,0.55)",fontSize:13}}>Ameen, Ya Rabb Al-'Alameen.</em>
            </p>
            <p className="dua-sig">— Niyas &amp; Sana</p>
          </div>

          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12,marginTop:14}}>

            {/* WhatsApp Share */}
            <button className="wa-btn" onClick={doWA}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.526 5.858L0 24l6.335-1.502A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.508-5.201-1.394l-.371-.22-3.761.892.952-3.645-.242-.383A9.951 9.951 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
              </svg>
              Share on WhatsApp
            </button>

            {/* WhatsApp Direct Call */}
            <a
              href={`https://wa.me/${PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:"inline-flex",alignItems:"center",gap:8,
                background:"rgba(0,200,150,0.1)",border:"1px solid rgba(0,200,150,0.3)",
                color:"var(--emerald)",borderRadius:"100px",
                padding:"12px 28px",fontFamily:"var(--fb)",
                fontSize:"10px",letterSpacing:"3px",textTransform:"uppercase",
                textDecoration:"none",transition:"all 0.25s",
              }}
            >
              💬 Contact on WhatsApp
            </a>

            <button className="btn-gst" onClick={() => go(0)}>↩ Back to Start</button>
          </div>

          <div style={{marginTop:24,padding:"16px 24px",background:"rgba(232,184,109,0.06)",border:"1px solid rgba(232,184,109,0.2)",borderRadius:12,maxWidth:340}}>
            <p style={{fontFamily:"var(--fs)",fontSize:9,letterSpacing:3,color:"rgba(232,184,109,0.65)",textTransform:"uppercase",marginBottom:8}}>Islamic Du'a for the Couple</p>
            <p style={{fontFamily:"var(--fb)",fontStyle:"italic",fontSize:13,color:"var(--silver)",lineHeight:1.9,fontWeight:300}}>
              "Baarakallahu lakuma wa baarak 'alaykuma wa jama'a baynakuma fii khayr."<br/>
              <span style={{fontSize:11,color:"rgba(232,184,109,0.6)"}}>May Allah bless you both and bring you together in goodness. — Abu Dawud</span>
            </p>
          </div>

          <Rail cur={7} tot={TOTAL}/>
        </div>
      )}
    </>
  );
}