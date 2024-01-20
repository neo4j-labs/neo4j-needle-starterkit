import { Button, Typography, Widget } from '@neo4j-ndl/react';
import { CodeBracketIconOutline, EyeIconOutline } from '@neo4j-ndl/react/icons';
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({
  title,
  description,
  image,
  sourceCode,
  previewLink,
}: {
  title: string;
  description: string;
  image: string;
  sourceCode: string;
  previewLink: string;
}) {
  return (
    <div style={{ minHeight: '100%' }}>
      <Widget header='' isElevated={true} style={{ minHeight: '100%' }}>
        <div className='card' style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ height: '200px', width: '100%', overflow: 'hidden', position: 'relative' }}>
            <a className='image-link' href={previewLink} target='_blank'>
              <img className='image n-rounded-lg' src={image} alt='Image description' style={{ width: '100%' }} />
              <div className='overlay-text' style={{ display: 'flex', flexDirection: 'column' }}>
                <EyeIconOutline className='n-w-6 n-h-6' />
                <Typography variant='body-medium'>View live preview</Typography>
              </div>
            </a>
          </div>
          <hr style={{ marginLeft: '15%', width: '70%', marginTop: '16px', borderColor: 'grey' }} />
          <div
            className='card-content'
            style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}
          >
            <Typography variant='h4'>{title}</Typography>
            <div style={{ minHeight: '80px', maxHeight: '80px', overflow: 'hidden' }}>
              <Typography variant='body-medium'>{description}</Typography>
            </div>
          </div>
          <div
            className='Footer'
            style={{ width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center' }}
          >
            <Link to={sourceCode} target='_blank'>
              <Button>
                <CodeBracketIconOutline className='n-w-6 n-h-6' /> &emsp; Source code
              </Button>
            </Link>
          </div>
        </div>
      </Widget>
    </div>
  );
}
