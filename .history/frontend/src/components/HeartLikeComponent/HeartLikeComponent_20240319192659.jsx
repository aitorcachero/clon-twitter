import React from 'react';

export default function HeartLikeComponent({ color = '#FFFFFF' }) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 1024 1024"
      class="icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M725.333333 192c-89.6 0-168.533333 44.8-213.333333 115.2C467.2 236.8 388.266667 192 298.666667 192 157.866667 192 42.666667 307.2 42.666667 448c0 253.866667 469.333333 512 469.333333 512s469.333333-256 469.333333-512c0-140.8-115.2-256-256-256z"
        fill={`#FFFFFF`}
      />
    </svg>
  );
}
