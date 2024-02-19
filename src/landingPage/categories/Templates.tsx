import { Typography } from '@neo4j-ndl/react';
import Card from '../components/Card';

// Dark mode featured images
import StarterKitImgDark from '../../assets/img/template/StarterKitImg-dark.jpg';
import EcommerceImgDark from '../../assets/img/template/Ecommerce-dark.png';
import MovieImgDark from '../../assets/img/template/MovieImg-dark.png';
import CyberSecurityImgDark from '../../assets/img/template/CyberSecurity-dark.png';

// Light mode featured images
import StarterKitImgLight from '../../assets/img/template/StarterKitImg-light.png';
import EcommerceImgLight from '../../assets/img/template/Ecommerce-light.png';
import MovieImgLight from '../../assets/img/template/MovieImg-light.png';
import CyberSecurityImgLight from '../../assets/img/template/CyberSecurity-light.png';

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
      title: 'Network Impact Analysis',
      description:
        'Explore advanced templates for network analysis in XXX. This templates facilitate the visualization and analysis of complex data networks.',
      image: colorMode === 'dark' ? CyberSecurityImgDark : CyberSecurityImgLight,
      sourceCode: 'networkanalysis-source-code-link',
      previewLink: '/cybersecurity-preview',
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
      title: 'Ecommerce',
      description: 'XX reco engine for ecommerce/eshop etc',
      image: colorMode === 'dark' ? EcommerceImgDark : EcommerceImgLight,
      sourceCode: `https://github.com/neo4j-labs/neo4j-needle-starterkit/blob/${
        import.meta.env.PACKAGE_VERSION
      }/src/templates/ecommerce`,
      previewLink: '/ecommerce-preview',
    },
  ];

  return (
    <div className='flex flex-col items-center'>
      <Typography variant='h2' className='flex p-5'>
        Templates
      </Typography>
      <Typography variant='body-large' className='flex p-5'>
        Dive into our collection of ready-to-use templates tailored for various use cases and industry. These templates
        are designed to serve a wide range of product purposes. Our templates provide a seamless blend of aesthetics and
        utility, ensuring your product not only meets its functional objectives but also delivers a memorable user
        experience.
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
