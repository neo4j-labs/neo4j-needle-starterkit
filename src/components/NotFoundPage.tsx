import { useEffect, useState } from 'react';
import { Banner } from '@neo4j-ndl/react';

export default function NotFoundPage() {
  return (
    <div
      className='n-bg-palette-neutral-bg-default'
      style={{
        display: 'flex',
        alignItems: 'center', // Align items vertically
        justifyContent: 'center', // Center items horizontally
        minHeight: '100vh', // Full height of the viewport
        padding: '3rem', // Padding around the banner
      }}
    >
      <Banner
        description={
          <>
            Oops! It looks like you've ventured into uncharted territory. The page you're looking for can't be found,
            but don't worry, we'll help you get back on track. <br />
            <a href='/'>
              <b>
                <u>Click here to return to the homepage</u>
              </b>
            </a>
            , or use the navigation menu to find what you need.
          </>
        }
        title='404 - Page not found'
        type='warning'
        icon={true}
        floating={true}
        style={{
          maxWidth: '600px', // Maximum width of the banner
          width: '100%', // Makes banner responsive
          textAlign: 'center', // Centers the text inside the banner
        }}
      />
    </div>
  );
}
