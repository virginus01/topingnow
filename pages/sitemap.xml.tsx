import { getTopicById, getTopics } from "@/app/lib/repo/topics_repo";
import { writeFileSync } from "fs";
import { formatISO } from "date-fns";

function toSitemapDate(createdAt) {
  // Parse date
  const date = new Date(createdAt);

  // Format as ISO string
  return formatISO(date);
}

function generateSiteMap(data) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <?xml-stylesheet href="../css/main-sitemap.xsl" type="text/xsl"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      
       ${data
         .map(({ id, slug, created_at }) => {
           return `
         <url>
             <loc>${`${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`}</loc>
             <lastmod>${toSitemapDate(created_at)}</lastmod>
         </url>
       `;
         })
         .join("")}
     </urlset>
   `;
}

function generateSiteMapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <?xml-stylesheet href="css/main-sitemap.xsl" type="text/xsl"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
     <loc>${process.env.NEXT_PUBLIC_BASE_URL}</loc>
      </url>
         <url>
             <loc>${process.env.NEXT_PUBLIC_BASE_URL}/tops</loc>
         </url>
         <url>
         <loc>${process.env.NEXT_PUBLIC_BASE_URL}/sitemap/topics.xml</loc>
     </url>
     <url>
     <loc>${process.env.NEXT_PUBLIC_BASE_URL}/lists</loc>
 </url>
     </urlset>
   `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ params, res }) {
  try {
    const sitemap = generateSiteMapIndex();
    const data = await getTopics("3");

    const sitemapTopics = generateSiteMap(data);
    writeFileSync("public/sitemap/topics.xml", sitemapTopics);

    res.setHeader("Content-Type", "text/xml");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (err) {
    console.error(err);
    return {
      props: {},
    };
  }
}

export default SiteMap;
