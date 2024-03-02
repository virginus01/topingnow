import { Metadata } from "next";
import { Url } from "next/dist/shared/lib/router/router";
import { base_url, construct_sitemap, isNull } from "../utils/custom_helpers";

export async function ConstructMetadata(result, data = {}) {
  const siteName = "Topingnow 2024";
  const metaDescription = result.meta_description
    ? result.meta_description
    : `welcome to ${result.title} page`;

  if (isNull(result)) {
    return {
      title: siteName,
      description: metaDescription,
    };
  }

  return {
    metadataBase: base_url() as unknown as URL,
    title: result.title ?? siteName,
    description: metaDescription,
    alternates: {
      canonical: result.canonical,
      languages: {
        "en-US": "/en-US",
      },
      types: {
        "application/rss+xml": construct_sitemap("index"),
      },
    },

    category: result.category ? result.category : "top",
    robots: {
      index: result.robots && result.robots.index ? result.robots.index : false,
      follow:
        result.robots && result.robots.follow ? result.robots.follow : false,
      //nocache: false,
      googleBot: {
        index:
          result.robots && result.robots.index ? result.robots.index : false,
        follow:
          result.robots && result.robots.follow ? result.robots.follow : false,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    sitemap: construct_sitemap("index"),
    verification: {
      google: "",
    },
    openGraph: {
      title: result.title,
      description: metaDescription,
      url: base_url(),
      siteName: siteName,
      images: [
        {
          url: "http://localhost:3000/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75",
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    applicationName: siteName,
    keywords: result.tags ?? ["top"],
    authors: [
      { name: "Virginus Alajekwu", url: "https://virginusalajekwu.com/" },
    ],
    creator: "Virginus Alajekwu",
    publisher: "Virginus Alajekwu",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    other: {
      "dc.title": result.title,
      "dc.description": metaDescription,
    },
  };
}
