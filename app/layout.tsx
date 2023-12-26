import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.css";
import { buildSchema } from "./seo/schema";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
  title: {
    default: "Topingnow",
    template: "%s - Topingnow",
  },
  description: "we rank nothing but the Top best in everything",
  robots: {
    index: false,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: process.env.BASE_URL,
    siteName: "topingnow",
  },
  alternates: {
    canonical: process.env.BASE_URL,
  },
  twitter: {
    creator: "@topingnow",
    site: "topingnow.com",
    card: "summary_large_image",
  },
};

const breadcrumb: {
  "@type": string;
  position: string;
  item: {
    "@id": string;
    name: string;
  };
}[] = [];

breadcrumb.push({
  "@type": "ListItem",
  position: "1",
  item: {
    "@id": String(process.env.NEXT_PUBLIC_BASE_URL),
    name: "Home",
  },
});

export const schema = {
  data: buildSchema("http://example.com", "My Site", "/logo.png", breadcrumb, {
    headline: "My Article",
    description: "Description here",
    author: "John Doe",
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" prefix="og: https://ogp.me/ns#">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema.data),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
