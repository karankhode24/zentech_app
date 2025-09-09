import { useEffect, useRef } from "react";

export default function Particles({ className = "", particleColorLight = "rgba(255,255,255,0.7)", particleColorDark = "rgba(255,255,255,0.45)", maxParticles = 384 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const isDark = document.documentElement.classList.contains("dark-mode");
    const color = isDark ? particleColorDark : particleColorLight;

    const setSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = Math.floor((rect?.width || window.innerWidth) * DPR);
      height = Math.floor((rect?.height || window.innerHeight) * DPR);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${Math.floor(width / DPR)}px`;
      canvas.style.height = `${Math.floor(height / DPR)}px`;
    };

    const createParticles = () => {
      // ~50% more dense than before (was area/18000 + 30)
      const density = Math.min(
        maxParticles,
        Math.round(((width / DPR) * (height / DPR)) / 4300) + 140
      );
      particlesRef.current = new Array(density).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: (Math.random() * 1.0 + 1.2) * DPR,
        vx: (Math.random() - 0.5) * 0.3 * DPR,
        vy: (Math.random() - 0.5) * 0.3 * DPR,
        a: Math.random() * 0.5 + 0.2,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      const { x: mx, y: my, active } = mouseRef.current;
      for (const p of particlesRef.current) {
        // mouse interaction (gentle repulsion)
        if (active) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const distSq = dx * dx + dy * dy;
          const influence = (140 * DPR);
          if (distSq < influence * influence) {
            const dist = Math.sqrt(Math.max(distSq, 0.0001));
            const force = (1 - dist / influence) * 0.35 * DPR; // strength
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // integrate with slight damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(step);
    };

    const handleResize = () => {
      setSize();
      createParticles();
    };

    setSize();
    createParticles();
    step();
    window.addEventListener("resize", handleResize);
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) * DPR;
      mouseRef.current.y = (e.clientY - rect.top) * DPR;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [particleColorDark, particleColorLight, maxParticles]);

  return (
    <canvas ref={canvasRef} className={className} aria-hidden="true" />
  );
}


