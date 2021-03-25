import React, { useEffect, useState } from 'react';

// Components
import Table from '../../components/Table';
import Default from '../../components/Default';
import MovieSpinner from '../../components/MovieSpinner';
import MoviesSelection from '../../components/MoviesSelect';

// Model
import { Film, Prop, MovieCharacter } from '../../models';

// Utils
import { fetchMovies, fetchMovieAndCharacters } from '../../utils/swapi';

import './style.scss';

const MoviesList: React.FC<Prop> = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Film[]>([]);
  const [movieAndCharacters, setMovieAndCharacters] = useState<MovieCharacter>({movie: {}, characters: []});

  useEffect(() => {
    fetchMovies().then(results => setMovies(results)).catch(e => alert(e));
  }, []);

  const handleFetchMovie = (id: number) => fetchMovieAndCharacters(id).then(result => {
    setMovieAndCharacters(result)
    setLoading(false);
  });

  return (
    <section className='movies-list'>
      <MoviesSelection mc={ setMovieAndCharacters } isLoading={ setLoading } fetchMovie={ handleFetchMovie } moviesList={ movies } />
      { !loading && movieAndCharacters.movie.episode_id && <Table movieCharacterInfo={ movieAndCharacters } /> }
      { !loading && !movieAndCharacters.movie.episode_id && <Default /> }
      { loading && !movieAndCharacters.movie.episode_id && <MovieSpinner />}
    </section>
  );
};

export default MoviesList;
