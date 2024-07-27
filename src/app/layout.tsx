"use client";
import "./globals.css";
import StoreProvider from "./store/store-provider";

export default function RootLayout ({ children, }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <StoreProvider>
      <body >{children}</body>
      </StoreProvider>
    </html>
  );
}
