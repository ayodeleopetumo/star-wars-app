import React, { useEffect, useState } from 'react';

// Components
import MoviesSelection from '../../components/MoviesSelect';

// Model
import { Film, Prop } from '../../models';

// Utils
import { fetchMovies } from '../../utils/swapi';

import './style.scss';
import logo from '../../assets/images/logo-white.png';

const MoviesList: React.FC<Prop> = ({ moviesList }) => {
  const [movies, setMovies] = useState<Film[]>([]);

  useEffect(() => {
    fetchMovies().then(results => setMovies(results));
  }, []);

  return (
    <section className='movies-list'>
      <MoviesSelection moviesList={movies} />

      <div className='movies-list__empty'>
        <img className='movies-list__empty-img' src={logo} alt='Star Wars' />
      </div>
    </section>
  );
};

export default MoviesList;
