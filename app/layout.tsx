import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "../styles/global.css";
import ConfirmAction from "./components/widgets/confirm";

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
        <body className={inter.className}>{children}</body>
      </html>
    </>
  );
}
