import Head from "next/head";

import { Navbar } from "./navbar";
import Footer from "./footer";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
};

export default function Layout({
  children,
  title = "Top Best",
  description = "This is top best",
  keywords = "top, best",
}: LayoutProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

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
