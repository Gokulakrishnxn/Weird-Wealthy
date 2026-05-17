"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useResolvedTheme() {
  const { resolvedTheme } = useTheme();
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const isDark = hydrated ? resolvedTheme === "dark" : false;

  return { hydrated, isDark };
}
