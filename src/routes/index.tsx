import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Ali Elömer — İlahiyat Mezunu | Portföy" },
      {
        name: "description",
        content:
          "Ali Elömer'in kişisel portföy sitesi. Eğitim, idari işler ve tercümanlık alanlarında deneyimli İlahiyat mezunu.",
      },
      { property: "og:title", content: "Ali Elömer — İlahiyat Mezunu" },
      {
        property: "og:description",
        content:
          "Eğitim, idari işler ve tercümanlık alanlarında deneyimli, öğrenmeye açık ve disiplinli bir profesyonel.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/og-image.svg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ali Elömer — İlahiyat Mezunu" },
      {
        name: "twitter:description",
        content: "Eğitim, idari işler ve tercümanlık alanlarında deneyimli İlahiyat mezunu.",
      },
      { name: "twitter:image", content: "/og-image.svg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});
