import React from "react";

const petal =
  "M0 -2 C 6 -8, 6 -19, 0 -23 C -6 -19, -6 -8, 0 -2 Z";

export default function CloverMark({ size = 22, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-26 -26 52 52"
      fill={color}
      aria-hidden="true"
      focusable="false"
    >
      <g>
        <path d={petal} transform="rotate(0)" />
        <path d={petal} transform="rotate(90)" />
        <path d={petal} transform="rotate(180)" />
        <path d={petal} transform="rotate(270)" />
      </g>
    </svg>
  );
}
