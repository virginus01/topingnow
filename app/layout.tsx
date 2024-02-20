import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/global.css";
import { buildSchema } from "./seo/schema";
import Head from "next/head";
import Script from "next/script";
import { ConstructMetadata } from "./seo/metadata";
import { generateBreadcrumb, getViewUrl } from "./utils/custom_helpers";

const inter = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export let result: any = {
  title: "Topingnow",
  slug: process.env.NEXT_PUBLIC_BASE_URL,
  description: "desc",
  breadcrumb: [],
};

export async function generateMetadata({
  params,
  data,
  breadcrumbData,
}: {
  params: { slug: string };
  data: any;
  breadcrumbData: any;
}): Promise<Metadata> {
  if (data) {
    result = data;
  }

  if (breadcrumbData) {
    result.breadcrumb = generateBreadcrumb(breadcrumbData);
  }

  return ConstructMetadata(result) as Metadata;
}

export const schema = {
  data: buildSchema(
    process.env.NEXT_PUBLIC_BASE_URL,
    "TopingNow",
    "/logo.png",
    result.breadcrumb,
    result
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
