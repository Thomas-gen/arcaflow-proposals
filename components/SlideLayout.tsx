import React, { useState, useEffect, useCallback, useRef, ReactNode } from "react";

interface SlideLayoutProps {
  slides: ReactNode[];
  clientName: string;
  totalSlides: number;
}

export default function SlideLayout({ slides, clientName, totalSlides }: SlideLayoutProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const touchStart = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number, dir: "left" | "right" = "right") => {
      if (animating || index === current) return;
      if (index < 0 || index >= totalSlides) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 280);
    },
    [animating, current, totalSlides]
  );

  const next = useCallback(() => goTo(current + 1, "right"), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, "left"), [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
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
      delta > 0 ? next() : prev();
    }
    touchStart.current = null;
  };

  const progress = ((current + 1) / totalSlides) * 100;

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ background: "#0a0a0a", color: "#f5f5f5", fontFamily: "Inter, sans-serif" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-20 h-[2px]" style={{ background: "#1e1e1e" }}>
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%`, background: "#c9a84c" }}
        />
      </div>

      {/* Slide counter top-left */}
      <div
        className="absolute top-5 left-6 z-20 text-xs tracking-widest uppercase"
        style={{ color: "#555" }}
      >
        {clientName}
      </div>

      {/* Slide counter top-right */}
      <div
        className="absolute top-5 right-6 z-20 text-xs tracking-widest"
        style={{ color: "#555" }}
      >
        {current + 1} / {totalSlides}
      </div>

      {/* Slide content */}
      <div
        className="w-full h-full"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating
            ? `translateX(${direction === "right" ? "-20px" : "20px"})`
            : "translateX(0)",
          transition: "opacity 0.28s ease, transform 0.28s ease",
        }}
      >
        {slides[current]}
      </div>

      {/* Dot navigation */}
      <div
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? "right" : "left")}
            className="rounded-full transition-all duration-200"
            style={{
              width: i === current ? "8px" : "6px",
              height: i === current ? "8px" : "6px",
              background: i === current ? "#c9a84c" : "#333",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      {current > 0 && (
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full transition-all"
          style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", color: "#888", cursor: "pointer" }}
          aria-label="Previous slide"
        >
          ←
        </button>
      )}
      {current < totalSlides - 1 && (
        <button
          onClick={next}
          className="absolute right-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full transition-all"
          style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", color: "#888", cursor: "pointer" }}
          aria-label="Next slide"
        >
          →
        </button>
      )}
    </div>
  );
}
