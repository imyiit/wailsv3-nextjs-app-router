"use client";
import NextTopLoader from "nextjs-toploader";
import { useTheme } from "next-themes";

export function TopLoaderProvider() {
  const { theme } = useTheme();

  return (
    <NextTopLoader
      color={theme === "dark" ? "#60a5fa" : "#3b82f6"}
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow={
        theme === "dark"
          ? "0 0 10px #60a5fa,0 0 5px #60a5fa"
          : "0 0 10px #3b82f6,0 0 5px #3b82f6"
      }
    />
  );
}
