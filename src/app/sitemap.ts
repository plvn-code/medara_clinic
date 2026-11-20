import type { MetadataRoute } from "next";
import { concerns } from "@/lib/concerns";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["", "/problemy", "/ceny", "/rezultaty", "/vrachi", "/kontakty"].map((p) => ({ url: `${site.url}${p}`, priority: p ? 0.8 : 1 })),
    ...concerns.map((c) => ({ url: `${site.url}/problemy/${c.slug}`, priority: 0.8 })),
  ];
}
