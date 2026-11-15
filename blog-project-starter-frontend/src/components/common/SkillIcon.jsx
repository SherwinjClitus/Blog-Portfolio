
import React, { useEffect, useRef } from "react";
import rough from "roughjs";
import "./SkillIcon.css";

const INK = "#3a3a3a";
const SVG_NS = "http://www.w3.org/2000/svg";

/*
  ICON LIBRARY

  Every icon uses a 100 x 100 coordinate system.

  Supported shapes:
  polygon, rect, circle, ellipse, path

  fill = colour
  solid = true for marker fill
  solid = false for coloured-pencil hatching
*/

const ICONS = {
  html: [
    {
      t: "polygon",
      p: [[6, 0], [50, 0], [50, 100], [12, 87]],
      fill: "#ff7a18",
    },
    {
      t: "polygon",
      p: [[50, 0], [94, 0], [88, 87], [50, 100]],
      fill: "#e44d26",
    },
    {
      t: "polygon",
      p: [
        [22, 15], [78, 15], [77, 27], [34, 27],
        [35, 40], [76, 40], [73, 76], [50, 84],
        [27, 76], [26, 64], [38, 64], [39, 68],
        [50, 72], [62, 68], [63, 52], [24, 52],
      ],
      fill: "#ffffff",
      solid: true,
      sw: 1.5,
    },
  ],

  css: [
    {
      t: "polygon",
      p: [[6, 0], [94, 0], [86, 90], [50, 100], [14, 90]],
      fill: "#2196f3",
    },
    {
      t: "path",
      d: "M28 24 H72 L70 37 H43 L45 48 H68 L65 72 L50 79 L34 72 L33 62 H45 L46 65 L51 67 L55 65 L56 59 H35 L28 24",
      stroke: "#ffffff",
      sw: 3,
    },
  ],

  javascript: [
    {
      t: "rect",
      x: 5,
      y: 5,
      w: 90,
      h: 90,
      fill: "#f7df1e",
    },
    {
      t: "path",
      d: "M53 28 V63 Q53 77 40 76 Q33 76 29 69",
      stroke: "#252525",
      sw: 7,
    },
    {
      t: "path",
      d: "M86 39 Q82 30 73 32 Q64 34 67 42 Q68 48 78 53 Q89 58 84 68 Q80 78 68 72 Q64 70 62 66",
      stroke: "#252525",
      sw: 7,
    },
  ],

  react: [
    {
      t: "ellipse",
      x: 50,
      y: 50,
      w: 92,
      h: 34,
      stroke: "#00b4e0",
      sw: 3,
    },
    {
      t: "ellipse",
      x: 50,
      y: 50,
      w: 92,
      h: 34,
      rot: 60,
      stroke: "#00b4e0",
      sw: 3,
    },
    {
      t: "ellipse",
      x: 50,
      y: 50,
      w: 92,
      h: 34,
      rot: 120,
      stroke: "#00b4e0",
      sw: 3,
    },
    {
      t: "circle",
      x: 50,
      y: 50,
      d: 13,
      fill: "#00c8ee",
      stroke: "#008db5",
    },
  ],

  nodejs: [
    {
      t: "polygon",
      p: [
        [50, 3], [93, 27], [93, 73],
        [50, 97], [7, 73], [7, 27],
      ],
      fill: "#52a044",
    },
    {
      t: "polygon",
      p: [[7, 27], [50, 97], [7, 73]],
      fill: "#3f873f",
    },
    {
      t: "path",
      d: "M27 43 L27 61 L40 69 L40 51 L50 57 L60 51 L60 69 L73 61 L73 43 L60 35 L50 41 L40 35 Z",
      stroke: "#ffffff",
      sw: 3,
    },
  ],

  database: [
    {
      t: "path",
      d: "M10 22 V78 A40 12 0 0 0 90 78 V22",
      stroke: "#006b8f",
      sw: 3,
    },
    {
      t: "ellipse",
      x: 50,
      y: 22,
      w: 80,
      h: 24,
      fill: "#00a6d6",
    },
    {
      t: "path",
      d: "M10 48 A40 12 0 0 0 90 48",
      stroke: "#007fa8",
      sw: 3,
    },
    {
      t: "path",
      d: "M10 75 A40 12 0 0 0 90 75",
      stroke: "#007fa8",
      sw: 3,
    },
  ],
};

/* Aliases for common skill names */
const ALIASES = {
  html5: "html",
  css3: "css",
  js: "javascript",
  reactjs: "react",
  node: "nodejs",
  db: "database",
  sql: "database",
  mongodb: "database",
};

/* Colours for future skills without a custom drawing */
const BADGE_COLORS = [
  "#f4a340",
  "#5aa9e6",
  "#6cc08b",
  "#f28ab2",
  "#a98ce0",
  "#f7d44a",
];

const hash = (value) =>
  [...value].reduce(
    (total, char) => (total * 31 + char.charCodeAt(0)) >>> 0,
    7
  );

function shapeOptions(shape, seed) {
  const options = {
    stroke: shape.stroke ?? INK,
    strokeWidth: shape.sw ?? 2,
    roughness: 1.5,
    bowing: 1.2,
    seed,
  };

  if (shape.fill) {
    options.fill = shape.fill;
    options.fillStyle = shape.solid ? "solid" : "hachure";
    options.fillWeight = 2;
    options.hachureGap = 5;
    options.hachureAngle = -40;
  }

  return options;
}

function drawShape(rc, group, shape, seed) {
  const options = shapeOptions(shape, seed);

  switch (shape.t) {
    case "polygon":
      group.appendChild(rc.polygon(shape.p, options));
      break;

    case "rect":
      group.appendChild(
        rc.rectangle(shape.x, shape.y, shape.w, shape.h, options)
      );
      break;

    case "circle":
      group.appendChild(
        rc.circle(shape.x, shape.y, shape.d, options)
      );
      break;

    case "path":
      group.appendChild(rc.path(shape.d, options));
      break;

    case "ellipse": {
      const node = rc.ellipse(
        shape.x,
        shape.y,
        shape.w,
        shape.h,
        options
      );

      if (shape.rot) {
        const wrapper = document.createElementNS(SVG_NS, "g");

        wrapper.setAttribute(
          "transform",
          `rotate(${shape.rot} ${shape.x} ${shape.y})`
        );

        wrapper.appendChild(node);
        group.appendChild(wrapper);
      } else {
        group.appendChild(node);
      }

      break;
    }

    default:
      break;
  }
}

export function SkillIcon({
  name = "",
  icon,
  size = 56,
  className = "",
}) {
  const svgRef = useRef(null);
  const groupRef = useRef(null);

  const key = (icon || name)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const shapes = ICONS[ALIASES[key] || key];

  const seed = (hash(name || key) % 900) + 1;

  const badgeColor =
    BADGE_COLORS[hash(name || key) % BADGE_COLORS.length];

  const initials = name
    ? name.slice(0, 2)
    : "?";

  useEffect(() => {
    const svg = svgRef.current;
    const group = groupRef.current;

    if (!svg || !group) return;

    group.replaceChildren();

    const rc = rough.svg(svg);

    if (shapes) {
      shapes.forEach((shape, index) => {
        drawShape(rc, group, shape, seed + index);
      });
    } else {
      drawShape(
        rc,
        group,
        {
          t: "rect",
          x: 8,
          y: 8,
          w: 84,
          h: 84,
          fill: badgeColor,
        },
        seed
      );
    }
  }, [shapes, seed, badgeColor]);

  return (
    <svg
      ref={svgRef}
      className={`skill-icon ${className}`}
      width={size}
      height={size}
      viewBox="-4 -4 108 108"
      role="img"
      aria-label={`${name} icon`}
    >
      <g ref={groupRef} />

      {!shapes && (
        <text
          x="50"
          y="63"
          textAnchor="middle"
          fontSize="38"
          fill="#292929"
          className="skill-icon__text"
        >
          {initials}
        </text>
      )}
    </svg>
  );
}

export default SkillIcon;
