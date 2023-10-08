import "../../scss/style.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";

import { Red_Hat_Display } from "next/font/google";

import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
// import { config } from "@fortawesome/fontawesome-svg-core";
import React from "react";

// import { dir } from "i18next";
config.autoAddCss = false;

const redHatDisplay = Red_Hat_Display({
  //weight: ["100", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-red-hat-display",
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en">
      <head />
      <body className={redHatDisplay.variable}>{children}</body>
    </html>
  );
}
