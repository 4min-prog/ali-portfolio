import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "min(46vw, 560px)",
          height: "min(46vw, 560px)",
          top: "-14%",
          left: "-10%",
          background:
            "radial-gradient(circle, rgba(192,172,48,0.22), rgba(192,172,48,0.06) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 48, 0], y: [0, 28, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "min(42vw, 520px)",
          height: "min(42vw, 520px)",
          bottom: "-20%",
          right: "-12%",
          background:
            "radial-gradient(circle, rgba(105,12,55,0.3), rgba(105,12,55,0.08) 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{ x: [0, -40, 0], y: [0, -24, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <FallingParticles />
    </div>
  );
}

const COLORS = ["200,176,60", "255,244,214", "170,120,170"];

type P = {
  x: number;
  y: number;
  len: number;
  vy: number;
  phase: number;
  sway: number;
  alpha: number;
  color: string;
};

function FallingParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    let particles: P[] = [];

    const spawn = (fromTop: boolean): P => ({
      x: Math.random() * w,
      y: fromTop ? -10 : Math.random() * h,
      len: 10 + Math.random() * 16,
      vy: 0.35 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      sway: 0.2 + Math.random() * 0.5,
      alpha: 0.4 + Math.random() * 0.45,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(14, Math.min(60, Math.floor((w * h) / 32000)));
      particles = particles.slice(0, count);
      while (particles.length < count) particles.push(spawn(false));
    };

    const loop = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy;
        p.x += Math.sin(t * 0.0006 + p.phase) * p.sway * 0.15;
        if (p.y > h + 6) {
          particles[i] = spawn(true);
          continue;
        }
        let a = p.alpha * Math.min(1, p.y / (h * 0.15));
        a *= Math.min(1, Math.max(0, (h - p.y) / (h * 0.12)));
        const midY = p.y - p.len * 0.5;
        const grad = ctx.createLinearGradient(0, midY - p.len * 0.5, 0, midY + p.len * 0.5);
        grad.addColorStop(0, `rgba(${p.color},0)`);
        grad.addColorStop(1, `rgba(${p.color},${(a * 0.8).toFixed(3)})`);
        ctx.beginPath();
        ctx.moveTo(p.x, midY - p.len * 0.5);
        ctx.lineTo(p.x, midY + p.len * 0.5);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(p.x, midY + p.len * 0.5, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${a.toFixed(3)})`;
        ctx.shadowColor = `rgba(${p.color},${a.toFixed(3)})`;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) start();
      else stop();
    });
    io.observe(canvas);

    resize();
    window.addEventListener("resize", resize);
    if (!reduceMotion) raf = requestAnimationFrame(loop);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
