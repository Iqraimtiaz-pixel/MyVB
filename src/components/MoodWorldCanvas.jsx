import { useEffect, useRef } from "react";
import { MOODS } from "../constants/moods";

export default function MoodWorldCanvas({ mood }) {
  const ref  = useRef();
  const rafR = useRef();
  const tR   = useRef(0);
  const w    = MOODS[mood] || MOODS.chill;
  const wld  = w.world;

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");

    const resize = () => {
      c.width  = c.offsetWidth  * window.devicePixelRatio;
      c.height = c.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => c.offsetWidth, H = () => c.offsetHeight;

    let pts = [];

    const buildPts = () => {
      pts = [];
      const cnt =
        wld.ptType === "rain"     ? 120 :
        wld.ptType === "stars"    ? 80  :
        wld.ptType === "embers"   ? 60  :
        wld.ptType === "petals"   ? 40  :
        wld.ptType === "sparkles" ? 55  : 45;
      for (let i = 0; i < cnt; i++) pts.push(newPt(i));
    };

    const newPt = (i) => {
      const t = wld.ptType;
      if (t === "rain")     return { x: Math.random()*W(), y: Math.random()*H(), spd: 4+Math.random()*6, len: 10+Math.random()*15, alpha: .15+Math.random()*.4 };
      if (t === "stars")    return { x: Math.random()*W(), y: Math.random()*H()*0.7, r: .5+Math.random()*1.8, twinkle: Math.random()*Math.PI*2, spd: .02+Math.random()*.04 };
      if (t === "embers")   return { x: Math.random()*W(), y: H()+Math.random()*50, spd: .5+Math.random()*1.5, dx: (Math.random()-.5)*1.2, r: 1+Math.random()*2.5, life: Math.random(), alpha: .6+Math.random()*.4 };
      if (t === "petals")   return { x: Math.random()*W(), y: -20-Math.random()*H(), spd: .4+Math.random()*.8, dx: Math.sin(i)*0.8, rot: Math.random()*Math.PI*2, rotSpd: (Math.random()-.5)*.05, size: 4+Math.random()*8 };
      if (t === "sparkles") return { x: Math.random()*W(), y: Math.random()*H(), r: .5+Math.random()*2, life: Math.random(), lifeSpd: .005+Math.random()*.015, rising: Math.random()>.5 };
      return { x: Math.random()*W(), y: H()+Math.random()*H(), spd: .2+Math.random()*.6, r: 2+Math.random()*8, alpha: .05+Math.random()*.2 };
    };

    buildPts();

    const drawSky = () => {
      const grd = ctx.createLinearGradient(0, 0, 0, H());
      grd.addColorStop(0, wld.skyTop); grd.addColorStop(1, wld.skyBot);
      ctx.fillStyle = grd; ctx.fillRect(0, 0, W(), H());
    };

    const drawOcean = (t) => {
      const hg = ctx.createRadialGradient(W()/2, H()*.55, 0, W()/2, H()*.55, W()*0.7);
      hg.addColorStop(0, wld.glowColor+"55"); hg.addColorStop(1, "transparent");
      ctx.fillStyle = hg; ctx.fillRect(0, 0, W(), H());
      for (let i = 0; i < 4; i++) {
        const y = H()*(0.55 + i*0.12), amp = 6-i;
        ctx.beginPath(); ctx.moveTo(0, y);
        for (let x2 = 0; x2 <= W(); x2 += 4)
          ctx.lineTo(x2, y + Math.sin((x2/W()*Math.PI*3) + t*0.02 + i*1.2)*amp);
        ctx.lineTo(W(), H()); ctx.lineTo(0, H()); ctx.closePath();
        const wg = ctx.createLinearGradient(0, y, 0, H());
        wg.addColorStop(0, wld.accent+(i===0?"44":"22")); wg.addColorStop(1, wld.accent+"11");
        ctx.fillStyle = wg; ctx.fill();
      }
      ctx.beginPath(); ctx.ellipse(W()/2, H()*.58, 20, 6, 0, 0, Math.PI*2);
      ctx.fillStyle = wld.accent+"33"; ctx.fill();
    };

    const drawSunny = (t) => {
      const sg = ctx.createRadialGradient(W()*0.72, H()*0.22, 0, W()*0.72, H()*0.22, W()*0.5);
      sg.addColorStop(0, "#ffcc0088"); sg.addColorStop(0.4, "#ff880033"); sg.addColorStop(1, "transparent");
      ctx.fillStyle = sg; ctx.fillRect(0, 0, W(), H());
      ctx.beginPath(); ctx.arc(W()*0.72, H()*0.22, 28+Math.sin(t*.03)*3, 0, Math.PI*2);
      ctx.fillStyle = "#FFD54F"; ctx.fill();
      ctx.beginPath(); ctx.arc(W()*0.72, H()*0.22, 36+Math.sin(t*.03)*4, 0, Math.PI*2);
      ctx.fillStyle = "#FFD54F33"; ctx.fill();
      for (let i = 0; i < 3; i++) {
        ctx.beginPath(); ctx.moveTo(-10, H());
        ctx.bezierCurveTo(W()*0.1+i*80, H()*(0.62-i*.06), W()*(0.4+i*.15), H()*(0.58-i*.06), W()+10, H());
        ctx.fillStyle = i===0 ? "#2d1a0088" : i===1 ? "#1a0d0066" : "#0f070044"; ctx.fill();
      }
    };

    const drawRain = (t) => {
      const rg = ctx.createRadialGradient(W()/2, H()*0.3, 0, W()/2, H()*0.3, W()*0.8);
      rg.addColorStop(0, wld.glowColor+"44"); rg.addColorStop(1, "transparent");
      ctx.fillStyle = rg; ctx.fillRect(0, 0, W(), H());
      const buildings = [
        {x:0,w:60,h:180},{x:50,w:40,h:140},{x:80,w:55,h:200},{x:125,w:45,h:160},
        {x:160,w:65,h:220},{x:215,w:50,h:175},{x:255,w:40,h:190},{x:290,w:70,h:150},
        {x:350,w:55,h:210},{x:395,w:45,h:165},{x:430,w:60,h:185},
      ];
      buildings.forEach(b => {
        ctx.fillStyle = "#0a0c1a"; ctx.fillRect(b.x, H()-b.h, b.w, b.h);
        for (let r2=0; r2<4; r2++) for (let c2=0; c2<3; c2++) {
          if (Math.sin(b.x*r2+c2*t*.01) > 0.3) {
            ctx.fillStyle = "#7986CB33";
            ctx.fillRect(b.x+6+c2*16, H()-b.h+20+r2*28, 8, 10);
          }
        }
      });
    };

    const drawCherry = (t) => {
      const cg = ctx.createRadialGradient(W()*0.4, H()*0.3, 0, W()*0.4, H()*0.3, W()*0.8);
      cg.addColorStop(0, "#8b003366"); cg.addColorStop(1, "transparent");
      ctx.fillStyle = cg; ctx.fillRect(0, 0, W(), H());
      ctx.beginPath(); ctx.arc(W()*0.75, H()*0.18, 20, 0, Math.PI*2);
      ctx.fillStyle = "#F48FB1cc"; ctx.fill();
      ctx.beginPath(); ctx.arc(W()*0.75, H()*0.18, 28, 0, Math.PI*2);
      ctx.fillStyle = "#F48FB133"; ctx.fill();
      ctx.fillStyle = "#2a0018"; ctx.fillRect(W()*0.35, H()*0.45, 18, H()*0.55);
      const branches = [[W()*0.35,H()*0.45,W()*0.15,H()*0.25],[W()*0.35,H()*0.45,W()*0.55,H()*0.28],[W()*0.35,H()*0.5,W()*0.2,H()*0.38],[W()*0.35,H()*0.5,W()*0.5,H()*0.4]];
      ctx.strokeStyle = "#3a0020"; ctx.lineWidth = 5;
      branches.forEach(([x1,y1,x2,y2]) => {
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.quadraticCurveTo((x1+x2)/2,y1-30,x2,y2); ctx.stroke();
      });
      const blossoms = [[W()*.15,H()*.25],[W()*.5,H()*.28],[W()*.2,H()*.38],[W()*.5,H()*.4],[W()*.08,H()*.42],[W()*.62,H()*.35]];
      blossoms.forEach(([bx,by]) => {
        for (let i=0; i<8; i++) {
          const ang = i/8*Math.PI*2 + t*.005;
          ctx.beginPath(); ctx.arc(bx+Math.cos(ang)*18, by+Math.sin(ang)*12, 8+Math.sin(t*.02+i)*1.5, 0, Math.PI*2);
          ctx.fillStyle = "#F48FB188"; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(bx,by,10,0,Math.PI*2); ctx.fillStyle="#F48FB1aa"; ctx.fill();
      });
    };

    const drawVolcano = (t) => {
      const vg = ctx.createRadialGradient(W()/2, H(), 0, W()/2, H(), W()*0.9);
      vg.addColorStop(0, "#ff440055"); vg.addColorStop(0.5, "#aa110033"); vg.addColorStop(1, "transparent");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W(), H());
      ctx.beginPath(); ctx.moveTo(-10, H());
      ctx.lineTo(W()*0.25, H()*0.4); ctx.lineTo(W()*0.35, H()*0.35);
      ctx.lineTo(W()*0.45, H()*0.4); ctx.lineTo(W()+10, H());
      ctx.fillStyle = "#1a0400"; ctx.fill();
      const cg2 = ctx.createRadialGradient(W()*0.35, H()*0.35, 0, W()*0.35, H()*0.35, 40);
      cg2.addColorStop(0, "#FF7043cc"); cg2.addColorStop(0.5, "#ff440055"); cg2.addColorStop(1, "transparent");
      ctx.fillStyle = cg2; ctx.beginPath(); ctx.arc(W()*0.35, H()*0.35, 40, 0, Math.PI*2); ctx.fill();
      for (let i=0; i<3; i++) {
        const lx = W()*0.35 + (i-1)*12;
        ctx.beginPath(); ctx.moveTo(lx, H()*0.35);
        ctx.quadraticCurveTo(lx+(i-1)*20, H()*0.55, lx+(i-1)*35, H()*0.7);
        ctx.strokeStyle = `rgba(255,${70+i*20},0,${0.3+Math.sin(t*.05+i)*.2})`; ctx.lineWidth = 4+i*2; ctx.stroke();
      }
    };

    const drawMoon = (t) => {
      const mg = ctx.createRadialGradient(W()*0.65, H()*0.2, 0, W()*0.65, H()*0.2, W()*0.6);
      mg.addColorStop(0, "#9575CD44"); mg.addColorStop(1, "transparent");
      ctx.fillStyle = mg; ctx.fillRect(0, 0, W(), H());
      ctx.beginPath(); ctx.arc(W()*0.65, H()*0.2, 30, 0, Math.PI*2);
      ctx.fillStyle = "#c8a8f0ee"; ctx.fill();
      [[8,8,4],[16,-5,3],[-6,10,2]].forEach(([cx,cy,cr]) => {
        ctx.beginPath(); ctx.arc(W()*0.65+cx, H()*0.2+cy, cr, 0, Math.PI*2);
        ctx.fillStyle="#a080cc66"; ctx.fill();
      });
      ctx.beginPath(); ctx.arc(W()*0.65, H()*0.2, 42, 0, Math.PI*2);
      ctx.strokeStyle="#9575CD33"; ctx.lineWidth=8; ctx.stroke();
      for (let i=2; i>=0; i--) {
        ctx.beginPath(); ctx.moveTo(-10, H());
        const pts2=[];
        for (let x2=0; x2<=W()+10; x2+=30) pts2.push({x:x2, y:H()*(0.65+i*.08)+Math.sin(x2*.015+i)*20});
        pts2.forEach((p,idx) => idx===0 ? ctx.moveTo(p.x,p.y) : ctx.lineTo(p.x,p.y));
        ctx.lineTo(W()+10,H()); ctx.lineTo(-10,H()); ctx.closePath();
        ctx.fillStyle = i===0?"#0d001899":i===1?"#08001266":"#05000d44"; ctx.fill();
      }
    };

    const drawParticles = (t) => {
      pts.forEach((p, i) => {
        const type = wld.ptType;
        if (type === "bubbles") {
          p.y -= p.spd;
          if (p.y < -p.r*2) { pts[i] = newPt(i); return; }
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
          ctx.strokeStyle = wld.accent+Math.floor(p.alpha*255).toString(16).padStart(2,"0");
          ctx.lineWidth=1; ctx.stroke();
        } else if (type === "rain") {
          p.y += p.spd; p.x -= 0.5;
          if (p.y > H()) { pts[i] = newPt(i); return; }
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x+2, p.y+p.len);
          ctx.strokeStyle = wld.accent+Math.floor(p.alpha*255).toString(16).padStart(2,"0");
          ctx.lineWidth=1; ctx.stroke();
        } else if (type === "stars") {
          p.twinkle += p.spd;
          const alpha = 0.4 + Math.sin(p.twinkle)*0.5;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
          ctx.fillStyle = "#ffffff"+Math.floor(alpha*255).toString(16).padStart(2,"0"); ctx.fill();
        } else if (type === "embers") {
          p.y -= p.spd; p.x += p.dx + Math.sin(t*.05+i)*.5; p.life -= 0.004;
          if (p.life <= 0 || p.y < -10) { pts[i] = newPt(i); return; }
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r*p.life, 0, Math.PI*2);
          ctx.fillStyle = `rgba(255,${~~(80+p.life*120)},0,${p.alpha*p.life})`; ctx.fill();
        } else if (type === "petals") {
          p.y += p.spd; p.x += p.dx + Math.sin(t*.02+i)*.5; p.rot += p.rotSpd;
          if (p.y > H()+20) { pts[i] = newPt(i); return; }
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.beginPath(); ctx.ellipse(0, 0, p.size, p.size*.5, 0, 0, Math.PI*2);
          ctx.fillStyle = "#F48FB166"; ctx.fill(); ctx.restore();
        } else if (type === "sparkles") {
          p.life += p.lifeSpd * (p.rising ? 1 : -1);
          if (p.life > 1 || p.life < 0) p.rising = !p.rising;
          const sz = p.r * p.life;
          ctx.save(); ctx.translate(p.x, p.y); ctx.beginPath();
          for (let j=0; j<8; j++) {
            const ang = j/8*Math.PI*2, r2 = j%2===0 ? sz*2 : sz*.8;
            j===0 ? ctx.moveTo(Math.cos(ang)*r2, Math.sin(ang)*r2) : ctx.lineTo(Math.cos(ang)*r2, Math.sin(ang)*r2);
          }
          ctx.closePath();
          ctx.fillStyle = wld.accent+Math.floor(p.life*.8*255).toString(16).padStart(2,"0"); ctx.fill();
          ctx.restore();
        }
      });
    };

    const SCENES = { ocean: drawOcean, sunny: drawSunny, rain: drawRain, cherry: drawCherry, volcano: drawVolcano, moon: drawMoon };

    const loop = () => {
      const t = tR.current++;
      ctx.clearRect(0, 0, W(), H());
      drawSky();
      const sceneFn = SCENES[wld.scene];
      if (sceneFn) sceneFn(t);
      drawParticles(t);
      rafR.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafR.current);
      window.removeEventListener("resize", resize);
    };
  }, [mood]);

  return (
    <canvas ref={ref} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      display: "block", zIndex: 0,
    }} />
  );
}
