export function ConstructMetadata(result, data = {}) {
  return {
    metadataBase: process.env.NEXT_PUBLIC_BASE_URL,
    title: result.title,
    description: `This is ${result.title}`,

    verification: {
      google: "google",
      yandex: "yandex",
      yahoo: "yahoo",
      other: {
        me: ["my-email", "my-link"],
      },
    },
    openGraph: {
      title: "Next.js",
      description: "The React Framework for the Web",
      url: "https://nextjs.org",
      siteName: "Next.js",
      images: [
        {
          url: "https://nextjs.org/og.png",
          width: 800,
          height: 600,
        },
        {
          url: "https://nextjs.org/og-alt.png",
          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    generator: "Next.js",
    applicationName: "Next.js",
    referrer: "origin-when-cross-origin",
    keywords: ["Next.js", "React", "JavaScript"],
    authors: [{ name: "Seb" }, { name: "Josh", url: "https://nextjs.org" }],
    creator: "Jiachi Liu",
    publisher: "Sebastian Markbåge",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}
