import { Typography } from '@neo4j-ndl/react';
import Card from '../components/Card';
import StarterKitImgDark from '../../assets/img/StarterKitImg-dark.jpg';
import StarterKitImgLight from '../../assets/img/StarterKitImg-light.png';
import EcommerceImgDark from '../../assets/img/Ecommerce-dark.png';
import EcommerceImgLight from '../../assets/img/Ecommerce-light.png';
import MovieImgDark from '../../assets/img/WIPImg.png';
import MovieImgLight from '../../assets/img/Movie-light.png';
import WIPImg from '../../assets/img/WIPImg.png';

import { useContext } from 'react';
import { ThemeWrapperContext } from '../../context/ThemeWrapper';

export default function Templates() {
  const { colorMode } = useContext(ThemeWrapperContext);

  const templatesCards = [
    {
      title: 'OG Template',
      description:
        'The OG one, because we all starts somewhere. This was the first template we created, combining simple, modern and UX all together for generic application design.',
      image: colorMode === 'dark' ? StarterKitImgDark : StarterKitImgLight,
      sourceCode: `https://github.com/neo4j-labs/neo4j-needle-starterkit/blob/${
        import.meta.env.PACKAGE_VERSION
      }/src/templates/og`,
      previewLink: '/og-preview',
    },
    {
      title: 'Recommendation Engine',
      description: 'XX reco engine for ecommerce/eshop etc',
      image: colorMode === 'dark' ? EcommerceImgDark : EcommerceImgLight,
      sourceCode: `https://github.com/neo4j-labs/neo4j-needle-starterkit/blob/${
        import.meta.env.PACKAGE_VERSION
      }/src/templates/ecommerce`,
      previewLink: '/ecommerce-preview',
    },
    {
      title: 'Movie Recommendation',
      description: 'Lorem ipsum... reco engine for the movie db',
      image: colorMode === 'dark' ? MovieImgDark : MovieImgLight,
      sourceCode: `https://github.com/neo4j-labs/neo4j-needle-starterkit/blob/${
        import.meta.env.PACKAGE_VERSION
      }/src/templates/movie`,
      previewLink: '/movie-preview',
    },
    {
      title: 'Fraud Detection',
      description:
        'Financial templates focused on fraud detection for banking services, taxes evasion, anti-money laundering.',
      image: WIPImg,
      sourceCode: 'finance-source-code-link',
      previewLink: '/finance-preview',
    },
    // {
    //   title: 'Network Analysis',
    //   description:
    //     'Explore advanced templates for network analysis in XXX. This templates facilitate the visualization and analysis of complex data networks.',
    //   image: NetworkAnalysisImg,
    //   sourceCode: 'networkanalysis-source-code-link',
    //   previewLink: '/networkanalysis-preview',
    // },
    {
      title: 'Telecommunication Networks',
      description:
        'Robust templates for telecommunication platforms, including features for network management, customer service, and data traffic analysis.',
      image: WIPImg,
      sourceCode: 'telecommunication-source-code-link',
      previewLink: '/telecommunication-preview',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h2' style={{ display: 'flex', padding: '20px' }}>
        Templates
      </Typography>
      <Typography variant='body-large' style={{ display: 'flex', padding: '20px' }}>
        Dive into our collection of ready-to-use templates tailored for various use cases and domains. These templates
        are designed to serve a wide range of product purposes. Our product templates provide a seamless blend of
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
