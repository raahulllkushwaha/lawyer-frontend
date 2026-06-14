import { Helmet } from 'react-helmet-async';

export default function Seo({ title, description, image, canonical }) {
  const full = title ? `${title} | Advocate` : 'Advocate – Legal Counsel';
  return (
    <Helmet>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={full} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
