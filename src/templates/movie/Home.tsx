import React, { useEffect, useState } from 'react';
import Header from '../shared/components/Header';
import Content from './Content';
import { setDriver, runRecoQuery } from '../shared/utils/Driver';
import { Movie } from './Movie';

/*
  Todo: have a switch on the screen that users can turn on/off
  if turned on, it will use the following queries against the provided Neo4j databases connection
  if turned off, it will use the provided static data (availabile in assets/products.json)
*/


const mainMovieId = '79132';
const queryMainMovie = `MATCH (m:Movie {movieId: '${mainMovieId}'})-[:IN_GENRE]->(g:Genre) RETURN collect(g.name) as genres, m.year as year, m.imdbRating as imdbRating, m.languages as languages, m.title as title, m.plot as plot, m.poster as poster;`;
const queryOtherUsersAlsoWatched = `MATCH (m:Movie {movieId: '${mainMovieId}'})<-[:RATED]-(u:User)-[:RATED]->(rec:Movie)-[:IN_GENRE]->(g:Genre) WITH g, rec, COUNT(*) AS usersWhoAlsoWatched ORDER BY usersWhoAlsoWatched DESC LIMIT 25 RETURN collect(g.name) as genres, rec.year as year, rec.imdbRating as imdbRating, rec.languages as languages, rec.title as title, rec.plot as plot, rec.poster as poster LIMIT 4;`;
const similarByGenre = `MATCH (m:Movie {movieId: '${mainMovieId}'})-[:IN_GENRE]->(g:Genre)<-[:IN_GENRE]-(rec:Movie) WITH rec, collect(g.name) AS genres, count(*) AS commonGenres RETURN genres, rec.year as year, rec.imdbRating as imdbRating, rec.languages as languages, rec.title as title, rec.plot as plot, rec.poster as poster ORDER BY commonGenres DESC LIMIT 5;`;

export default function Home() {
  const [loadingMain, setLoadingMain] = useState(true);
  const [loadingSimilarGenre, setLoadingSimilarGenre] = useState(true);
  const [loadingOtherUsers, setLoadingOtherUsers] = useState(true);
  const [mainMovie, setMainMovie] = useState<Movie[]>([]);
  const [recoOtherUsers, setRecoOtherUsers] = useState<Movie[]>([]);
  const [recoSimilarGenre, setRecoSimilarGenre] = useState<Movie[]>([]);

  useEffect(() => {
    setDriver('bolt://3.239.64.102:7687', 'neo4j', 'bills-piece-proof');
    getMainMovie();
    getSimilarGenre();
    getOtherUsersAlsoWatched();
  }, []);

  function getMainMovie() {
    runRecoQuery(queryMainMovie).then(result => {
      if (Array.isArray(result)) {
        setMainMovie(result.map(record => ({
          genres: record.genres,
          year: record.year,
          imdbRating: record.imdbRating,
          languages: record.languages,
          title: record.title,
          plot: record.plot,
          poster: record.poster,
        })));
      }
      setLoadingMain(false);
    });
  }

  function getSimilarGenre() {
    runRecoQuery(similarByGenre).then(result => {
      if (Array.isArray(result)) {
        setRecoSimilarGenre(result.map(record => ({
          genres: record.genres,
          year: record.year,
          imdbRating: record.imdbRating,
          languages: record.languages,
          title: record.title,
          plot: record.plot,
          poster: record.poster,
        })));
      }
      setLoadingSimilarGenre(false);
    });
  }

  function getOtherUsersAlsoWatched() {
    runRecoQuery(queryOtherUsersAlsoWatched).then(result => {
      if (Array.isArray(result)) {
        setRecoOtherUsers(result.map(record => ({
          genres: record.genres,
          year: record.year,
          imdbRating: record.imdbRating,
          languages: record.languages,
          title: record.title,
          plot: record.plot,
          poster: record.poster,
        })));
      }
      setLoadingOtherUsers(false);
    });
  }

  return (
    <div>
      <Header title='Neoshop' navItems={[]} />
      <Content loadingStates={{ loadingMain, loadingSimilarGenre, loadingOtherUsers }} mainMovie={mainMovie} recoSimilarGenre={recoSimilarGenre} recoOtherUsers={recoOtherUsers} />
    </div>
  );
}
