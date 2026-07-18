import React from "react";

const leaf =
  "M0 0 C -1.4 -5, -9.5 -6.5, -9.5 -13 C -9.5 -17.4, -4 -19, -1.2 -16 C -0.5 -15.3, 0 -14.3, 0 -13.2 C 0 -14.3, 0.5 -15.3, 1.2 -16 C 4 -19, 9.5 -17.4, 9.5 -13 C 9.5 -6.5, 1.4 -5, 0 0 Z";

export default function CloverMark({ size = 22, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-22 -22 44 44"
      fill={color}
      aria-hidden="true"
      focusable="false"
    >
      <g>
        <path d={leaf} transform="rotate(45)" />
        <path d={leaf} transform="rotate(135)" />
        <path d={leaf} transform="rotate(225)" />
        <path d={leaf} transform="rotate(315)" />
      </g>
    </svg>
  );
}
