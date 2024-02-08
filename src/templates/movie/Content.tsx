import { Movie } from './Movie';
import { Button, Typography, Tag, LoadingSpinner, Box } from '@neo4j-ndl/react';
import React from 'react';

export default function Content({
  loadingStates,
  mainMovie,
  recoSimilarGenre,
  recoOtherUsers,
}: {
  loadingStates: { loadingMain: boolean; loadingSimilarGenre: boolean; loadingOtherUsers: boolean };
  mainMovie: Movie[];
  recoSimilarGenre: Movie[];
  recoOtherUsers: Movie[];
}) {
  const cardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    padding: '16px',
    margin: '8px',
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div
        className='n-bg-palette-neutral-bg-default'
        style={{ padding: 20, display: 'flex', flexDirection: 'column' }}
      >
        {/* Featured Product */}
        {loadingStates.loadingMain ? (
          <div style={{ width: '100vw', height: '33vh', display: 'flex', justifyContent: 'center' }}>
            <LoadingSpinner size='large' />
          </div>
        ) : (
          <div style={{ ...cardStyle, flexDirection: 'row', maxHeight: '40%' }}>
            <img
              src={mainMovie[0].poster}
              alt='Product 1'
              style={{ width: '20%', height: '100%', borderRadius: '8px' }}
            />
            <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <Typography variant='h1'>{mainMovie[0].title}</Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Typography variant='body-medium'>{mainMovie[0].plot}</Typography>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                {mainMovie[0].languages.map((lang: Array<string>, index: number) => (
                  <Tag style={{ padding: '5px 10px' }} key={index}>
                    {lang}
                  </Tag>
                ))}
              </div>
              <div className='md:flex hidden' style={{ gap: 20 }}>
                {mainMovie[0].genres.map((genre: Array<string>, index: number) => (
                  <Tag style={{ padding: '5px 10px' }} key={index}>
                    {genre}
                  </Tag>
                ))}
              </div>
              <div className='md:flex hidden' style={{ gap: 20 }}>
                <Typography variant='body-medium'>Year: {mainMovie[0].year.toString()}</Typography>
                <Typography variant='body-medium'>IMDB Rating: {mainMovie[0].imdbRating}</Typography>
              </div>
              <div className='flex flex-col gap-2.5 md:flex-row' style={{ gap: 10 }}>
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'row', gap: 15 }}>
                  <Button>Play</Button>
                  <Button>More Info</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Similar Products */}
        {loadingStates.loadingSimilarGenre ? (
          <div style={{ width: '100vw', height: '33vh', display: 'flex', justifyContent: 'center' }}>
            <LoadingSpinner size='large' />
          </div>
        ) : (
          <div>
            <Typography variant='h2'>Similar genre</Typography>
            <div className='flex flex-col md:flex-row' style={{ gap: 10, padding: '10px 0' }}>
              {recoSimilarGenre.map((movie, index) => (
                <Box key={index} style={{ margin: 'auto', maxWidth: '80%' }}>
                  <img
                    src={movie.poster}
                    alt={`Product ${index + 2}`}
                    style={{ minWidth: '40%', alignSelf: 'center' }}
                  />
                  <div
                    style={{
                      padding: '10px',
                      display: 'none' /* none for now - need to display on hover */,
                      flexDirection: 'column',
                      gap: 15,
                    }}
                  >
                    <Typography variant='h4'>{movie.title}</Typography>
                    <div>{movie.plot}</div>
                  </div>
                </Box>
              ))}
            </div>
          </div>
        )}

        {/* Frequently Bought Together */}
        {loadingStates.loadingOtherUsers ? (
          <div style={{ width: '100vw', height: '33vh', display: 'flex', justifyContent: 'center' }}>
            <LoadingSpinner size='large' />
          </div>
        ) : (
          <div>
            <Typography variant='h2'>Users who watched {mainMovie[0]?.title} also watched this</Typography>
            <div className='flex flex-col items-start md:flex-row' style={{ gap: 10, padding: '10px 0' }}>
              {recoOtherUsers.map((movie, index) => (
                <Box className='md:max-w-[30%]' key={index}>
                  <img src={movie.poster} alt='Product 1' style={{ minWidth: '40%' }} />
                  <div style={{ display: 'none' }}>
                    <Typography variant='h4' style={{ textAlignLast: 'center' }}>
                      {movie.title}
                    </Typography>
                    <Typography variant='body-medium'>{movie.plot}</Typography>
                  </div>
                </Box>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
