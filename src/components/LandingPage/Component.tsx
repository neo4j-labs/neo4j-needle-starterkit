import { Typography } from '@neo4j-ndl/react';
import Card from './Card';

import ChatbotImg from '../../assets/img/ChatbotImg.png';
import ConnectionModalImg from '../../assets/img/ConnectionModalImg.png';

const componentCards = [
  {
    title: 'Chatbot Widget',
    description:
      'An interactive chat widget template for support desks, enabling real-time customer assistance and query resolution.',
    image: ChatbotImg,
    sourceCode: 'chat-widget-source-code-link',
    previewLink: '/chat-widget-preview',
  },
  {
    title: 'Connection Modal Component',
    description:
      'A sleek and user-friendly connection modal template, ideal for facilitating network connections and integrations in your applications.',
    image: ConnectionModalImg,
    sourceCode: 'connection-modal-source-code-link',
    previewLink: '/connection-modal-preview',
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
        existing projects. These templates range from interactive web chats to real-time weather widgets, offering a
        versatile selection of standalone components. Each template is built to be easily adaptable and embeddable,
        ensuring seamless integration with your larger project. Whether you're enhancing user engagement with a chat
        interface or providing useful information through a custom widget, our component templates are designed for
        flexibility and ease of use.
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
        {componentCards.map((card, index) => (
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
