import { Banner } from '@neo4j-ndl/react';

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
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
        }}
      />
    </div>
  );
}
