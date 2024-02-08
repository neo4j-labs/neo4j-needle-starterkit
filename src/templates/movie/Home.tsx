import { useEffect, useState } from 'react';
import Header from './Header';
import Content from './Content';
import { setDriver, runRecoQuery } from '../shared/utils/Driver';
import { Movie } from './Movie';
import moviesData from './assets/movies.json';
import ConnectionModal from '../shared/components/ConnectionModal';

const mainMovieId = '79132';
const queryMainMovie = `MATCH (m:Movie {movieId: '${mainMovieId}'})-[:IN_GENRE]->(g:Genre) RETURN collect(g.name) as genres, m.year as year, m.imdbRating as imdbRating, m.languages as languages, m.title as title, m.plot as plot, m.poster as poster;`;
const queryOtherUsersAlsoWatched = `MATCH (m:Movie {movieId: '${mainMovieId}'})<-[:RATED]-(u:User)-[:RATED]->(rec:Movie)-[:IN_GENRE]->(g:Genre) WITH g, rec, COUNT(*) AS usersWhoAlsoWatched ORDER BY usersWhoAlsoWatched DESC LIMIT 25 RETURN collect(g.name) as genres, rec.year as year, rec.imdbRating as imdbRating, rec.languages as languages, rec.title as title, rec.plot as plot, rec.poster as poster LIMIT 6;`;
const similarByGenre = `MATCH (m:Movie {movieId: '${mainMovieId}'})-[:IN_GENRE]->(g:Genre)<-[:IN_GENRE]-(rec:Movie) WITH rec, collect(g.name) AS genres, count(*) AS commonGenres RETURN genres, rec.year as year, rec.imdbRating as imdbRating, rec.languages as languages, rec.title as title, rec.plot as plot, rec.poster as poster ORDER BY commonGenres DESC LIMIT 6;`;

export default function Home() {
  const [useReco, setUseReco] = useState(false);
  const [loadingMain, setLoadingMain] = useState(true);
  const [loadingSimilarGenre, setLoadingSimilarGenre] = useState(true);
  const [loadingOtherUsers, setLoadingOtherUsers] = useState(true);
  const [mainMovie, setMainMovie] = useState<Movie[]>([]);
  const [recoOtherUsers, setRecoOtherUsers] = useState<Movie[]>([]);
  const [recoSimilarGenre, setRecoSimilarGenre] = useState<Movie[]>([]);
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);

  const movies = moviesData.listMovies;

  useEffect(() => {
    const fetchData = async () => {
      if (!useReco) {
        setLoadingMain(true);
        setLoadingSimilarGenre(true);
        setLoadingOtherUsers(true);
        setMainMovie([movies[0] as Movie]);
        setRecoSimilarGenre([
          movies[1] as Movie,
          movies[2] as Movie,
          movies[3] as Movie,
          movies[4] as Movie,
          movies[5] as Movie,
          movies[6] as Movie,
        ]);
        setRecoOtherUsers([
          movies[7] as Movie,
          movies[8] as Movie,
          movies[9] as Movie,
          movies[10] as Movie,
          movies[11] as Movie,
          movies[12] as Movie,
        ]);
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
      setMainMovie(
        result.map((record) => ({
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
    setLoadingMain(false);
  }

  async function getSimilarGenre() {
    const result = await runRecoQuery(similarByGenre);
    if (Array.isArray(result)) {
      setRecoSimilarGenre(
        result.map((record) => ({
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
    setLoadingSimilarGenre(false);
  }

  async function getOtherUsersAlsoWatched() {
    const result = await runRecoQuery(queryOtherUsersAlsoWatched);
    if (Array.isArray(result)) {
      setRecoOtherUsers(
        result.map((record) => ({
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
      <Content
        loadingStates={{ loadingMain, loadingSimilarGenre, loadingOtherUsers }}
        mainMovie={mainMovie}
        recoSimilarGenre={recoSimilarGenre}
        recoOtherUsers={recoOtherUsers}
      />
      <ConnectionModal
        open={isConnectionModalOpen}
        setOpenConnection={setIsConnectionModalOpen}
        setConnectionStatus={setUseReco}
      />
    </div>
  );
}
