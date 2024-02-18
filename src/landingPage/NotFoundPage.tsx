import { Button, Flex, Typography } from '@neo4j-ndl/react';
import NotFoundImg from '../assets/img/NotFound.png';

export default function NotFoundPage() {
  return (
    <div
      className='n-bg-palette-neutral-bg-default'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '3rem',
      }}
    >
      <img src={NotFoundImg} style={{ padding: '3rem'}}/>
      <Flex gap='8' >
        <Typography variant='h1'>404 - Page Not Found</Typography>
        <Typography variant='body-medium'>
          <p>It looks like the page you are trying to access either does not exists or is currently unavailable</p>
          <p>Please try again later and if the problem persists contact us</p>
          </Typography>
        <Button>Go back</Button>
      </Flex>
    </div>
  );
}
