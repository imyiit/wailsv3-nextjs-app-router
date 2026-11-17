"use client";
import { Inter } from "next/font/google";
//@ts-ignore
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { store } from "@/store";
import { Provider } from "react-redux";
import {
  LoadingProvider,
  QueryProvider,
  ToastsProvider,
  TopLoaderProvider,
} from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store()}>
      <html
        lang="tr"
        className="min-h-screen absolute w-full overflow-x-hidden"
      >
        <link rel="shortcut icon" href="#" />
        <body className={inter.className}>
          <QueryProvider>
            <LoadingProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <ToastsProvider position="top-right" richColors closeButton />
                <TopLoaderProvider />
                <ModeToggle />
                {children}
              </ThemeProvider>
            </LoadingProvider>
          </QueryProvider>
        </body>
      </html>
    </Provider>
  );
}
