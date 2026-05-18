"use client";

import { useEffect, useMemo, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  link: boolean;
};

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; last: number; boostUntil: number }>({
    x: 0,
    y: 0,
    active: false,
    last: 0,
    boostUntil: 0
  });

  const settings = useMemo(
    () => ({
      density: 0.00013,
      maxParticles: 220,
      speed: 0.78,
      linkDistance: 190,
      opacityLight: 0.74,
      opacityDark: 0.62,
      mouseRadius: 260,
      mouseForce: 0.014,
      linkedRatio: 0.88
    }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mediaReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mediaReduce?.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: Particle[] = [];
    const mouse = mouseRef.current;

    const isDark = () => document.documentElement.classList.contains("dark");

    const getColors = () => {
      if (!isDark()) {
        return {
          dot: "rgba(0,0,0,0.92)",
          stroke: "rgba(0,0,0,0.28)"
        };
      }

      const styles = getComputedStyle(document.documentElement);
      const dot = styles.getPropertyValue("--text").trim() || "rgba(255,255,255,0.92)";
      const stroke = styles.getPropertyValue("--line").trim() || "rgba(255,255,255,0.12)";
      return {
        dot: dot.includes("rgba") ? "rgba(255,255,255,0.55)" : dot,
        stroke: stroke.includes("rgba") ? "rgba(255,255,255,0.10)" : stroke
      };
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(
        settings.maxParticles,
        Math.max(20, Math.floor(width * height * settings.density))
      );

      while (particles.length < target) {
        particles.push(spawn(width, height));
      }
      while (particles.length > target) {
        particles.pop();
      }
    };

    const spawn = (w: number, h: number): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = settings.speed * (0.55 + Math.random() * 0.9);
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 0.9 + Math.random() * 1.6,
        a: 0.25 + Math.random() * 0.55,
        link: Math.random() < settings.linkedRatio
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
      mouse.last = performance.now();
    };

    const onPointerLeave = () => {
      mouse.active = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
      mouse.last = performance.now();
      mouse.boostUntil = mouse.last + 520;

      // instantaneous impulse (explosion)
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const r = settings.mouseRadius;
        const d2 = dx * dx + dy * dy;
        if (d2 > r * r || d2 < 0.0001) continue;

        const d = Math.sqrt(d2);
        const t = 1 - d / r;
        const impulse = 2.2 * t;
        p.vx += (dx / d) * impulse;
        p.vy += (dy / d) * impulse;
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("blur", onPointerLeave);
    document.addEventListener("mouseleave", onPointerLeave);

    const step = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const colors = getColors();
      const dark = isDark();
      const opacity = (dark ? settings.opacityDark : settings.opacityLight);
      const intensity = dark ? 1 : 1.35;

      if (mouse.active && performance.now() - mouse.last > 1200) {
        mouse.active = false;
      }

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (mouse.active) {
          const boost = performance.now() < mouse.boostUntil ? 26 : 1;
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const r = settings.mouseRadius;
          const d2 = dx * dx + dy * dy;
          if (d2 < r * r && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            const t = 1 - d / r;
            const f = t * settings.mouseForce * boost;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // mild damping so motion stays soft
        p.vx *= 0.994;
        p.vy *= 0.994;

        const v2 = p.vx * p.vx + p.vy * p.vy;
        if (v2 < 0.0008) {
          const ang = Math.random() * Math.PI * 2;
          p.vx += Math.cos(ang) * 0.06;
          p.vy += Math.sin(ang) * 0.06;
        }

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      // links
      ctx.lineWidth = 2.4;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          if (!a.link || !b.link) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const maxD = settings.linkDistance;
          if (d2 > maxD * maxD) continue;

          const d = Math.sqrt(d2);
          const t = 1 - d / maxD;
          let alpha = t * 0.62 * opacity * intensity;
          if (mouse.active) {
            const mdx = (a.x + b.x) * 0.5 - mouse.x;
            const mdy = (a.y + b.y) * 0.5 - mouse.y;
            const md2 = mdx * mdx + mdy * mdy;
            const mr = settings.mouseRadius;
            if (md2 < mr * mr) {
              const mt = 1 - Math.sqrt(md2) / mr;
              alpha += mt * 0.65 * opacity * intensity;
            }
          }

          ctx.globalAlpha = alpha;
          ctx.strokeStyle = colors.stroke;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;

      // dots
      for (const p of particles) {
        ctx.globalAlpha = p.a * opacity * intensity;
        ctx.fillStyle = colors.dot;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafRef.current = window.requestAnimationFrame(step);
    };

    const onResize = () => resize();
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);
    resize();
    rafRef.current = window.requestAnimationFrame(step);

    // Recompute on theme changes
    const mo = new MutationObserver(() => {
      // no-op, colors are read every frame via getColors()
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("blur", onPointerLeave);
      document.removeEventListener("mouseleave", onPointerLeave);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [settings]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
