import React, { useState } from 'react';

// Components
import Table from '../../components/Table';
import DefaultView from '../../components/Default';
import MovieSpinner from '../../components/MovieSpinner';
import MoviesSelection from '../../components/MoviesSelection';

// Model
import { Props, MovieCharacter } from '../../models';

// Utils
import { fetchMovieAndCharacters } from '../../utils/swapi';

import './style.scss';

const MoviesList: React.FC<Props> = ({ moviesList, setError }) => {
  const [loading, setLoading] = useState(false);
  const [movieAndCharacters, setMovieAndCharacters] = useState<MovieCharacter>({ movie: {}, characters: [] });
  const [filterText, setFilterText] = useState('all');
  const [sortConfig, setSortConfig] = useState(null);

  const handleFetchMovie = (id: number) =>
    fetchMovieAndCharacters(id)
      .then(result => {
        setMovieAndCharacters(result);
        setFilterText('all');
        setSortConfig(null);
        setLoading(false);
      })
      .catch(err => setError!(err));

  return (
    <section className='movies-list'>
      <MoviesSelection
        movieCharacters={setMovieAndCharacters}
        isLoading={setLoading}
        fetchMovie={handleFetchMovie}
        moviesList={moviesList}
      />
      {!loading && movieAndCharacters.movie.episode_id && (
        <Table
          sortConfig={sortConfig}
          sortTableData={setSortConfig}
          filterTableData={setFilterText}
          filterText={filterText}
          movieCharacterInfo={movieAndCharacters}
        />
      )}
      {!loading && !movieAndCharacters.movie.episode_id && <DefaultView />}
      {loading && !movieAndCharacters.movie.episode_id && <MovieSpinner />}
    </section>
  );
};

export default MoviesList;
