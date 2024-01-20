import { Typography } from '@neo4j-ndl/react';
import Card from '../components/Card';

import ChatbotImg from '../../assets/img/ChatbotImg.png';
import ConnectionModalImg from '../../assets/img/ConnectionModalImg.png';
import WIPImg from '../../assets/img/WIPImg.png';

const componentCards = [
  {
    title: 'Chatbot Widget',
    description:
      'An interactive chat widget template for support desks, enabling real-time customer assistance and query resolution.',
    image: ChatbotImg,
    sourceCode: `https://raw.githubusercontent.com/neo4j-labs/neo4j-needle-starterkit/${
      import.meta.env.PACKAGE_VERSION
    }/src/templates/shared/components/Chatbot.tsx`,
    previewLink: '/chat-widget-preview',
  },
  {
    title: 'Connection Modal',
    description:
      'A sleek and user-friendly connection modal template, ideal for facilitating network connections and integrations in your applications.',
    image: ConnectionModalImg,
    sourceCode: `https://raw.githubusercontent.com/neo4j-labs/neo4j-needle-starterkit/${
      import.meta.env.PACKAGE_VERSION
    }/src/templates/shared/components/ConnectionModal.tsx`,
    previewLink: '/connection-modal-preview',
  },
  {
    title: 'Widget3',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco. Ut enim ad minim veniam quis nostrud exercitation ullamco. ',
    image: WIPImg,
    sourceCode: '',
    previewLink: '/Widget3-preview',
  },
];

export default function Component() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h2' style={{ display: 'flex', padding: '20px' }}>
        Component focused templates
      </Typography>
      <Typography variant='body-large' style={{ display: 'flex', padding: '20px' }}>
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
