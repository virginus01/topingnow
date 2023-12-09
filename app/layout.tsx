import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import "../styles/global.css";

//const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Toping Now",
  description: "This is topingnow",
  robots: "noindex",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" prefix="og: https://ogp.me/ns#">
        <body>{children}</body>
      </html>
    </>
  );
}
