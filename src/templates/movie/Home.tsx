import { useEffect, useState } from 'react';
import Header from './Header';
import Content from './Content';
import { setDriver, runRecoQuery } from '../shared/utils/Driver';
import { MovieInterface } from './Interfaces';
import moviesData from './assets/movies.json';
import ConnectionModal from '../shared/components/ConnectionModal';
import { Banner } from '@neo4j-ndl/react';

const mainMovieId = '79132';
const queryMainMovie = `MATCH (m:Movie {movieId: '${mainMovieId}'})-[:IN_GENRE]->(g:Genre) RETURN ID(m) as id, collect(g.name) as genres, m.year as year, m.imdbRating as imdbRating, m.languages as languages, m.title as title, m.plot as plot, m.poster as poster;`;
const queryOtherUsersAlsoWatched = `MATCH (m:Movie {movieId: '${mainMovieId}'})<-[:RATED]-(u:User)-[:RATED]->(rec:Movie)-[:IN_GENRE]->(g:Genre) WITH g, rec, COUNT(*) AS usersWhoAlsoWatched ORDER BY usersWhoAlsoWatched DESC LIMIT 25 RETURN ID(rec) as id, collect(g.name) as genres, rec.year as year, rec.imdbRating as imdbRating, rec.languages as languages, rec.title as title, rec.plot as plot, rec.poster as poster LIMIT 6;`;
const similarByGenre = `MATCH (m:Movie {movieId: '${mainMovieId}'})-[:IN_GENRE]->(g:Genre)<-[:IN_GENRE]-(rec:Movie) WITH rec, collect(g.name) AS genres, count(*) AS commonGenres RETURN ID(rec) as id, genres, rec.year as year, rec.imdbRating as imdbRating, rec.languages as languages, rec.title as title, rec.plot as plot, rec.poster as poster ORDER BY commonGenres DESC LIMIT 6;`;

export default function Home() {
  const [useReco, setUseReco] = useState(false);
  const [recoError, setRecoError] = useState(false);
  const [loadingMain, setLoadingMain] = useState(true);
  const [loadingSimilarGenre, setLoadingSimilarGenre] = useState(true);
  const [loadingOtherUsers, setLoadingOtherUsers] = useState(true);
  const [mainMovie, setMainMovie] = useState<MovieInterface[]>([]);
  const [recoOtherUsers, setRecoOtherUsers] = useState<MovieInterface[]>([]);
  const [recoSimilarGenre, setRecoSimilarGenre] = useState<MovieInterface[]>([]);
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);

  const movies = moviesData.listMovies;

  function isValidMovieData(movie: MovieInterface): boolean {
    const requiredFields: (keyof MovieInterface)[] = [
      'id',
      'genres',
      'year',
      'imdbRating',
      'languages',
      'title',
      'plot',
      'poster',
    ];
    return requiredFields.every((field) => movie[field] !== undefined);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!useReco) {
        setLoadingMain(true);
        setLoadingSimilarGenre(true);
        setLoadingOtherUsers(true);
        setMainMovie([movies[0]]);
        setMainMovie([movies[0] as MovieInterface]);
        setRecoSimilarGenre([
          movies[1] as MovieInterface,
          movies[2] as MovieInterface,
          movies[3] as MovieInterface,
          movies[4] as MovieInterface,
          movies[5] as MovieInterface,
          movies[6] as MovieInterface,
        ]);
        setRecoOtherUsers([
          movies[7] as MovieInterface,
          movies[8] as MovieInterface,
          movies[9] as MovieInterface,
          movies[10] as MovieInterface,
          movies[11] as MovieInterface,
          movies[12] as MovieInterface,
        ]);
        setRecoError(false);
        setLoadingMain(false);
        setLoadingSimilarGenre(false);
        setLoadingOtherUsers(false);
      } else {
        const { uri, user, password } = JSON.parse(localStorage.getItem('neo4j.connection') ?? '') ?? {};
        setDriver(uri, user, password);
        await Promise.all([getMainMovie(), getSimilarGenre(), getOtherUsersAlsoWatched()]);
      }
    };

    fetchData();
  }, [useReco]);

  async function getMainMovie() {
    const result = await runRecoQuery(queryMainMovie);
    if (Array.isArray(result)) {
      const validMovies = result.filter(isValidMovieData);
      if (validMovies.length !== result.length || result.length < 1) {
        setRecoError(true);
      } else {
        setMainMovie(
          validMovies.map((record) => ({
            id: record.id,
            genres: record.genres,
            year: record.year,
            imdbRating: record.imdbRating,
            languages: record.languages,
            title: record.title,
            plot: record.plot,
            poster: record.poster,
          }))
        );
      }
    }
    setLoadingMain(false);
  }

  async function getSimilarGenre() {
    const result = await runRecoQuery(similarByGenre);
    if (Array.isArray(result)) {
      const validMovies = result.filter(isValidMovieData);
      if (validMovies.length !== result.length || result.length < 1) {
        setRecoError(true);
      } else {
        setRecoSimilarGenre(
          validMovies.map((record) => ({
            id: record.id,
            genres: record.genres,
            year: record.year,
            imdbRating: record.imdbRating,
            languages: record.languages,
            title: record.title,
            plot: record.plot,
            poster: record.poster,
          }))
        );
      }
    }
    setLoadingSimilarGenre(false);
  }

  async function getOtherUsersAlsoWatched() {
    const result = await runRecoQuery(queryOtherUsersAlsoWatched);
    if (Array.isArray(result)) {
      const validMovies = result.filter(isValidMovieData);
      if (validMovies.length !== result.length || result.length < 1) {
        setRecoError(true);
      } else {
        setRecoOtherUsers(
          validMovies.map((record) => ({
            id: record.id,
            genres: record.genres,
            year: record.year,
            imdbRating: record.imdbRating,
            languages: record.languages,
            title: record.title,
            plot: record.plot,
            poster: record.poster,
          }))
        );
      }
    }
    setLoadingOtherUsers(false);
  }

  return (
    <div>
      <Header
        title='NeoMovie'
        navItems={[]}
        setUseReco={setUseReco}
        useReco={useReco}
        openConnectionModal={() => setIsConnectionModalOpen(true)}
      />
      {recoError ? (
        <div
          className='n-bg-palette-neutral-bg-default'
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100svh' }}
        >
          <Banner type='danger'>
            <p>An error occurred while fetching recommendations.</p>
            <p>
              Please make sure you are connected to a Neo4j Database with the same data model as the{' '}
              <a href='https://github.com/neo4j-graph-examples/recommendations' target='_blank'>
                <b>
                  <u>Recommendation demo available here</u>
                </b>
              </a>
            </p>
            <p>
              Alternatively, you can also use the one from{' '}
              <a href='https://sandbox.neo4j.com' target='_blank'>
                <b>
                  <u>Neo4j Sandbox</u>
                </b>
              </a>
            </p>
          </Banner>
        </div>
      ) : (
        <Content
          loadingStates={{ loadingMain, loadingSimilarGenre, loadingOtherUsers }}
          mainMovie={mainMovie}
          recoSimilarGenre={recoSimilarGenre}
          recoOtherUsers={recoOtherUsers}
        />
      )}
      <ConnectionModal
        open={isConnectionModalOpen}
        setOpenConnection={setIsConnectionModalOpen}
        setConnectionStatus={setUseReco}
        message={{
          type: 'warning',
          content:
            'Ensure you connect to a Neo4j database containing the movie dataset ( using sandbox.neo4j.com for example )',
        }}
      />
      <div id='footer' className='n-bg-palette-neutral-bg-default' style={{ height: '100px' }} />
    </div>
  );
}
