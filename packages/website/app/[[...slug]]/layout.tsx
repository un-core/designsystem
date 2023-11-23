import React from "react";
import "../../scss/style.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Open_Sans } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { WFPCoreProviderClient } from "./WFPCoreProviderClient";

config.autoAddCss = false;

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-family-primary", // CSS variable name used by the Design System
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en">
      <head />
      <body className={openSans.className}>
        <WFPCoreProviderClient>{children}</WFPCoreProviderClient>
      </body>
    </html>
  );
}
