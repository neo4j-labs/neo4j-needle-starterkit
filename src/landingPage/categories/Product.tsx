import { Typography } from '@neo4j-ndl/react';
import Card from '../components/Card';
import StarterKitImg from '../../assets/img/StarterKitImg.jpg';
import NetworkAnalysisImg from '../../assets/img/NeoNetworkImg.png';

const productCards = [
  {
    title: 'OG Template',
    description: 'The OG one, because we all starts somewhere.',
    image: StarterKitImg,
    sourceCode: `https://github.com/neo4j-labs/neo4j-needle-starterkit/blob/${
      import.meta.env.PACKAGE_VERSION
    }/src/templates/og`,
    previewLink: '/og-preview',
  },
  {
    title: 'Network Analysis',
    description:
      'Explore advanced templates for network analysis in XXX. This templates facilitate the visualization and analysis of complex data networks.',
    image: NetworkAnalysisImg,
    sourceCode: 'networkanalysis-source-code-link',
    previewLink: '/networkanalysis-preview',
  },
];

export default function Product() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h2' style={{ display: 'flex', padding: '20px' }}>
        Product focused templates
      </Typography>
      <Typography variant='body-large' style={{ display: 'flex', padding: '20px' }}>
        Dive into our collection of product-centric templates, each meticulously crafted to enhance the functionality
        and appeal of your digital tools and applications. These templates are designed to serve a wide range of product
        purposes, from analytical dashboards to interactive learning platforms. Whether you're creating a sophisticated
        project management tool or an engaging educational app, our product templates provide a seamless blend of
        aesthetics and utility, ensuring your product not only meets its functional objectives but also delivers a
        memorable user experience.
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          columnGap: '140px',
          rowGap: '40px',
        }}
      >
        {productCards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
            sourceCode={card.sourceCode}
            previewLink={card.previewLink}
          />
        ))}
      </div>
    </div>
  );
}
