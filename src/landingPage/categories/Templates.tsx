import { Typography } from '@neo4j-ndl/react';
import Card from '../components/Card';
import StarterKitImg from '../../assets/img/StarterKitImg.jpg';
import NetworkAnalysisImg from '../../assets/img/NeoNetworkImg.png';
import WIPImg from '../../assets/img/WIPImg.png';

const templatesCards = [
  {
    title: 'OG Template',
    description:
      'The OG one, because we all starts somewhere. This was the first template we created, combining simple, modern and UX all together for generic application design.',
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
  {
    title: 'Finance and Banking',
    description:
      'Financial templates focused on banking services, investment portfolios, and financial data analysis, ensuring secure and efficient user experiences.',
    image: WIPImg,
    sourceCode: 'finance-source-code-link',
    previewLink: '/finance-preview',
  },
  {
    title: 'Telecommunication Networks',
    description:
      'Robust templates for telecommunication platforms, including features for network management, customer service, and data traffic analysis.',
    image: WIPImg,
    sourceCode: 'telecommunication-source-code-link',
    previewLink: '/telecommunication-preview',
  },
];

export default function Templates() {
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
      <div className='flex flex-wrap justify-center gap-x-14 gap-y-10 md:grid md:grid-cols-3 md:gap-x-14 md:gap-y-10'>
        {templatesCards.map((card, index) => (
          <div key={index} className='w-full md:w-auto'>
            <Card
              title={card.title}
              description={card.description}
              image={card.image}
              sourceCode={card.sourceCode}
              previewLink={card.previewLink}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
