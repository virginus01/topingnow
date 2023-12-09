import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import { Navbar } from "@/app/components/navbar";
import Footer from "@/app/components/footer";

//const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen flex flex-col">
        <div className="pt-16 text-sm lg:text-lg md:text-md sm:text-sm text-gray-500 mb-20">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
