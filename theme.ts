"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
  /* Put your mantine theme override here */
  colors: {
    default: [
      // "#fff",
      "#fbeaff",
      "#eed1ff",
      "#d8a1fb",
      "#c26ef6",
      "#af42f2",
      "#a327f0",
      "#9d17f0",
      "#8909d6",
      "#7a04c0",
      "#6a00a9"
    ]
  },
  defaultGradient: {
    from: "#A020F0", to: "#FF69B4"
  },
  defaultRadius: 'md',
  fontFamily: 'Segoe UI, Roboto, sans-serif',
  primaryColor: 'default',
});
