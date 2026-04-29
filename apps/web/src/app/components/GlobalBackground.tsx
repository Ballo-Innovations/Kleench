import React from "react";

/**
 * Reusable premium background component with dashed grid.
 * Matches the core Kleench aesthetic: clean, premium, off-white + grid dotted lines.
 */
export function GlobalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[var(--app-bg)]">
      <div
        className="absolute inset-0 z-0 opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #d6d3d1 1px, transparent 1px),
            linear-gradient(to bottom, #d6d3d1 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
    </div>
  );
}
