import Head from "next/head";
import { Navbar } from "./navbar";
import Footer from "./footer";
import Image from "next/image";
import { Toaster } from "sonner";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
};

export default function AuthLayout({
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
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
          <Image
            src="/images/beams.jpg"
            alt=""
            className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 h-auto w-auto"
            width={1308}
            height={1000}
          />
          <div className="absolute inset-0 bg-[url(/images/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="pt-16 text-sm lg:text-lg md:text-md sm:text-sm text-gray-500 mb-20">
            {children}
          </div>
        </div>
        <Toaster position="bottom-right" visibleToasts={6} richColors />
      </main>

      <Footer />
    </>
  );
}
