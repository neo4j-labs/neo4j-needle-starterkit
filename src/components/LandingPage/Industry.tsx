import { Typography } from '@neo4j-ndl/react';
import Card from './Card';

import WIPImg from '../../assets/img/a.png';

const industryCards = [
  {
    title: 'Healthcare',
    description:
      'Templates designed for healthcare applications, offering features like patient management, appointment scheduling, and electronic health records.',
    image: WIPImg,
    sourceCode: 'healthcare-source-code-link',
    previewLink: '/healthcare-preview',
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

export default function Industry() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h2' style={{ display: 'flex', padding: '20px' }}>
        Industry focused templates
      </Typography>
      <Typography variant='body-large' style={{ display: 'flex', padding: '20px' }}>
        Explore a diverse array of industry-specific templates tailored to meet the unique demands and challenges of
        various sectors. Whether you're delving into the intricate world of pharmaceuticals, navigating the dynamic
        realm of telecommunications, or making financial services more accessible, our industry templates offer a robust
        starting point. Each template is designed to embody the core requirements and best practices of its respective
        field, ensuring that you can kickstart your project with a foundation that resonates with industry standards and
        user expectations.
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
        {industryCards.map((card, index) => (
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
