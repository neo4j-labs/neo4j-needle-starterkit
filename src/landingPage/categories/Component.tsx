import { Typography } from '@neo4j-ndl/react';
import Card from '../components/Card';

// Dark mode featured images
import ChatbotImgDark from '../../assets/img/component/ChatbotImg-dark.png';
import ConnectionModalImgDark from '../../assets/img/component/ConnectionModalImg-dark.png';
import HeaderImgDark from '../../assets/img/component/HeaderImg-dark.png';

// Light mode featured images
import ChatbotImgLight from '../../assets/img/component/ChatbotImg-light.png';
import ConnectionModalImgLight from '../../assets/img/component/ConnectionModalImg-light.png';
import HeaderImgLight from '../../assets/img/component/HeaderImg-light.png';

import { useContext } from 'react';
import { ThemeWrapperContext } from '../../context/ThemeWrapper';

export default function Component() {
  const { colorMode } = useContext(ThemeWrapperContext);

  const componentCards = [
    {
      title: 'Chatbot Widget',
      description:
        'An interactive chat widget template for support desks, enabling real-time customer assistance and query resolution.',
      image: colorMode === 'dark' ? ChatbotImgDark : ChatbotImgLight,
      sourceCode: `https://raw.githubusercontent.com/neo4j-labs/neo4j-needle-starterkit/${
        import.meta.env.PACKAGE_VERSION
      }/src/templates/shared/components/Chatbot.tsx`,
      previewLink: '/chat-widget-preview',
    },
    {
      title: 'Connection Modal',
      description:
        'A responsive and user-friendly connection modal template, ideal for facilitating network connections and integrations in your applications.',
      image: colorMode === 'dark' ? ConnectionModalImgDark : ConnectionModalImgLight,
      sourceCode: `https://raw.githubusercontent.com/neo4j-labs/neo4j-needle-starterkit/${
        import.meta.env.PACKAGE_VERSION
      }/src/templates/shared/components/ConnectionModal.tsx`,
      previewLink: '/connection-modal-preview',
    },
    {
      title: 'Header',
      description: 'Header navbar xxx',
      image: colorMode === 'dark' ? HeaderImgDark : HeaderImgLight,
      sourceCode: `https://raw.githubusercontent.com/neo4j-labs/neo4j-needle-starterkit/${
        import.meta.env.PACKAGE_VERSION
      }/src/templates/shared/components/Header.tsx`,
      previewLink: '/header-preview',
    },
  ];

  return (
    <div className='flex flex-col items-center'>
      <Typography variant='h2' className="flex p-5">
        Components
      </Typography>
      <Typography variant='body-large' className="flex p-5">
        Our component templates are perfect for those seeking to integrate individual widgets or elements into their
        existing projects. These templates range from interactive web chats to connections modal and many more coming on
        the way, offering a versatile selection of standalone components. Each template is built to be easily adaptable
        and embeddable, ensuring seamless integration with your larger project. Whether you're enhancing user engagement
        with a chat interface or providing useful information through a custom widget, our component templates are
        designed for flexibility and ease of use.
      </Typography>
      <div className='flex flex-wrap justify-center gap-x-14 gap-y-10 md:grid md:grid-cols-3 md:gap-x-14 md:gap-y-10'>
        {componentCards.map((card, index) => (
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
