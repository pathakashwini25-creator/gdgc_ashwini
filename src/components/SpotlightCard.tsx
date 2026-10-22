"use client";

import { useCallback, useRef } from "react";

type SpotlightCardProps = {
  children: React.ReactNode;
  /** Extra classes for the card surface (background, border, shadow). */
  className?: string;
};

/**
 * Spotlight Card
 * ----------------
 * A pointer-following radial light that reveals the card surface on hover.
 * The glow is painted above the surface but below the content, so text and
 * controls stay perfectly crisp while the light appears to sit on the card.
 *
 * Pointer position is written straight to CSS custom properties on the glow
 * element, so the card never re-renders while the cursor moves.
 */
export default function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const glow = glowRef.current;
      if (!card || !glow) return;

      const rect = card.getBoundingClientRect();
      glow.style.setProperty(
        "--spotlight-x",
        `${event.clientX - rect.left}px`,
      );
      glow.style.setProperty(
        "--spotlight-y",
        `${event.clientY - rect.top}px`,
      );
    },
    [],
  );

  const handlePointerEnter = useCallback(() => {
    glowRef.current?.classList.remove("opacity-0");
  }, []);

  const handlePointerLeave = useCallback(() => {
    glowRef.current?.classList.add("opacity-0");
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`group relative h-full overflow-hidden rounded-2xl ${className}`}
    >
      {/* The light source */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="spotlight-glow pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
      />

      {/* Content sits above the light */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
