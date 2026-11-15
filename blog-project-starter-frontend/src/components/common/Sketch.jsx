import React from "react";
import "./Sketch.css";

/**
 * Monochrome hand-drawn accents for the portfolio.
 * No Rough.js or additional dependencies are required.
 */

export function SketchUnderline({
  children,
  color = "#171717",
  strokeWidth = 2.5,
  seed = 7,
  className = "",
}) {
  // `seed` is retained for backwards compatibility with the previous API.
  const variation = Math.abs(Number(seed) || 0) % 3;

  const paths = [
    "M2 8 C18 4, 31 11, 49 7 S80 5, 98 7",
    "M2 7 C19 10, 33 4, 51 8 S79 10, 98 6",
    "M2 9 C20 5, 34 8, 53 6 S80 8, 98 7",
  ];

  return (
    <span className={`sketch-underline ${className}`.trim()}>
      <span className="sketch-underline__text">{children}</span>
      <svg
        className="sketch-underline__svg"
        viewBox="0 0 100 14"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={paths[variation]}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M4 11 C27 8, 43 12, 66 9 S88 10, 96 9"
          fill="none"
          stroke={color}
          strokeWidth={Math.max(1, strokeWidth * 0.48)}
          strokeLinecap="round"
          opacity="0.38"
        />
      </svg>
    </span>
  );
}

export function SketchArrow({
  width = 120,
  height = 70,
  color = "#171717",
  strokeWidth = 2,
  seed = 3,
  className = "",
}) {
  // `seed` is retained for backwards compatibility with the previous API.
  const flip = Number(seed) % 2 === 0;

  return (
    <svg
      className={`sketch-arrow ${className}`.trim()}
      width={width}
      height={height}
      viewBox="0 0 120 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {flip ? (
        <>
          <path
            d="M8 54 C30 18, 69 10, 103 25"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 58 C31 22, 70 14, 101 28"
            stroke={color}
            strokeWidth={Math.max(1, strokeWidth * 0.55)}
            strokeLinecap="round"
            opacity="0.45"
          />
          <path
            d="M88 12 L104 25 L85 30"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <path
            d="M8 18 C35 53, 72 59, 104 39"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 14 C37 49, 74 55, 102 36"
            stroke={color}
            strokeWidth={Math.max(1, strokeWidth * 0.55)}
            strokeLinecap="round"
            opacity="0.45"
          />
          <path
            d="M87 33 L105 38 L91 52"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}

export default SketchUnderline;
