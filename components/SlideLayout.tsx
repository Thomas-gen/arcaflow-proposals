import React, { useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { SlideNavContext, TabHandler } from "@/contexts/SlideNavContext";

interface SlideLayoutProps {
  slides: ReactNode[];
  clientName: string;
  totalSlides: number;
}

export default function SlideLayout({ slides, clientName, totalSlides }: SlideLayoutProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const touchStart = useRef<number | null>(null);
  const tabHandlerRef = useRef<TabHandler | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      if (index < 0 || index >= totalSlides) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 220);
    },
    [animating, current, totalSlides]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        if (tabHandlerRef.current?.next()) return;
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        if (tabHandlerRef.current?.prev()) return;
        prev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        if (!tabHandlerRef.current?.next()) next();
      } else {
        if (!tabHandlerRef.current?.prev()) prev();
      }
    }
    touchStart.current = null;
  };

  const progress = ((current + 1) / totalSlides) * 100;

  return (
    <SlideNavContext.Provider value={{ setTabHandler: (h) => { tabHandlerRef.current = h; } }}>
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-20 h-[3px]" style={{ background: "#e0dbd4" }}>
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%`, background: "#2d6a4f" }}
        />
      </div>

      {/* Client name top-left */}
      <div
        className="absolute top-5 left-6 z-20 text-xs tracking-widest uppercase"
        style={{ color: "#aaa" }}
      >
        {clientName}
      </div>

      {/* Slide counter top-right */}
      <div
        className="absolute top-4 right-6 z-20 text-xs"
        style={{ color: "#999", fontFamily: "'JetBrains Mono', monospace" }}
      >
        {String(current + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
      </div>

      {/* Slide content */}
      <div
        className="w-full h-full slide-content-wrap"
        style={{
          opacity: animating ? 0 : 1,
          transition: "opacity 0.22s ease",
        }}
      >
        {slides[current]}
      </div>

      {/* Nav dots */}
      <nav className="nav-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`nav-dot${i === current ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          >
            <span className="dot-label">{String(i + 1).padStart(2, "0")}</span>
            <span className="dot" />
          </button>
        ))}
      </nav>

      {/* Keyboard hint */}
      <div
        className="absolute bottom-5 left-6 z-20 text-xs"
        style={{ color: "#bbb", fontFamily: "'JetBrains Mono', monospace" }}
      >
        ← →
      </div>
    </div>
    </SlideNavContext.Provider>
  );
}
