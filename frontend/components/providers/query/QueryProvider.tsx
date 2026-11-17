"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      // Veri kendiliğinden bayatlamaz; tazeleme yalnızca mount ve
      // mutation sonrası invalidate ile olur.
      staleTime: Infinity,
      // Sayfa/bileşen her açıldığında bir kez tazelenir. Eldeki veri
      // anında gösterilir, yenisi arka planda gelir.
      refetchOnMount: "always",
      // Sekmeye geri dönmek veya bağlantının gelmesi istek tetiklemez
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

export function QueryProvider({ children }: React.PropsWithChildren) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
