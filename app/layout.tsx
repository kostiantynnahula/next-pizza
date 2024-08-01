import { Nunito } from "next/font/google";
import toast, { Toaster } from "react-hot-toast";

import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--fort-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>
      <body className={nunito.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
