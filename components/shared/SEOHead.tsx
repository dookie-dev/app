import Head from "next/head";
import Script from "next/script";

interface SEOHeadProps {
  schemaType?: "Organization" | "Product" | "BreadcrumbList" | "Review";
  data?: any;
}

export default function SEOHead({ schemaType, data }: SEOHeadProps) {
  // Base Schema for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: "Dookiee.s",
    url: "https://softcookie.brand",
    logo: "https://softcookie.brand/images/dookie-logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+66-12-345-678",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://facebook.com/softcookiebrand",
      "https://instagram.com/softcookiebrand",
    ],
  };

  let jsonLd: any = organizationSchema;

  if (schemaType === "Product" && data) {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: data.name,
      image: data.image,
      description: data.description,
      sku: data.id,
      brand: {
        "@type": "Brand",
        name: "Dookiee.s",
      },
      offers: {
        "@type": "Offer",
        url: `https://softcookie.brand/product/${data.slug}`,
        priceCurrency: "THB",
        price: data.price,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
      aggregateRating: data.rating
        ? {
            "@type": "AggregateRating",
            ratingValue: data.rating,
            reviewCount: "128",
          }
        : undefined,
    };
  }

  // Breadcrumb Schema
  if (schemaType === "BreadcrumbList" && data) {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: data.map((item: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `https://softcookie.brand${item.url}`,
      })),
    };
  }

  return (
    <>
      <Script
        id={`schema-${schemaType || "org"}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
