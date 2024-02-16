import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/global.css";
import { buildSchema } from "./seo/schema";
import Head from "next/head";
import Script from "next/script";
import { ConstructMetadata } from "./seo/metadata";
import { getViewUrl } from "./utils/custom_helpers";

const inter = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export async function generateMetadata() {
  const result = {
    title: "Topingnow",
    slug: process.env.NEXT_PUBLIC_BASE_URL,
    description: "desc",
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
      "@id": getViewUrl("", "topic"),
      name: "Home",
    },
  });

  breadcrumb.push({
    "@type": "ListItem",
    position: "2",
    item: {
      "@id": getViewUrl("", "topic"),
      name: result.title,
    },
  });

  schema.data = buildSchema(
    getViewUrl(result.slug, "topic"),
    "Topingnow",
    "/images/logo.png",
    breadcrumb,
    result
  );

  return ConstructMetadata(result) as {};
}

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
  data: buildSchema(
    process.env.NEXT_PUBLIC_BASE_URL,
    "TopingNow",
    "/logo.png",
    breadcrumb,
    {
      headline: "My Article",
      description: "Description here",
      author: "John Doe",
    }
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} prefix="og: https://ogp.me/ns#">
      <head>
        <script
          id="application"
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
