"use client";

import { WFPCoreProvider } from "@wfp/react";

export function WFPCoreProviderClient({ children }: any) {
  return <WFPCoreProvider>{children}</WFPCoreProvider>;
}
