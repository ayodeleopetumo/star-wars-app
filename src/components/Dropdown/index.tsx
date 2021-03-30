import React from 'react';

// Models
import { Props } from '../../models';

import './style.scss';

const Dropdown: React.FC<Props> = ({ moviesList, fetchMovie, isLoading, movieCharacters }) => {
  const fetchSelectedMovie = (movieId: number) => {
    fetchMovie!(movieId);
    isLoading!(true);
    movieCharacters!({ movie: {}, characters: [] });
  };

  return (
    <div className='movies-list__menu'>
      <select
        className='movies-list__select'
        defaultValue='default'
        disabled={!moviesList!.length}
        onChange={evt => fetchSelectedMovie(+evt.currentTarget.value)}
      >
        <option value='default' disabled>
          {moviesList!.length ? 'Select a movie' : 'Loading movies, please wait'}
        </option>
        {moviesList!.map(movie => (
          <option key={movie.episode_id} value={movie.episode_id}>
            {movie.title}
          </option>
        ))}
      </select>
      {!moviesList!.length ? (
        <div className='movies-list__spinner spinner'></div>
      ) : (
        <div className='movies-list__icon'>
          <svg focusable='false' viewBox='0 0 104 128' width='25' height='35' className='icon'>
            <path d='m2e1 95a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm14 55h68v1e1h-68zm0-3e1h68v1e1h-68zm0-3e1h68v1e1h-68z'></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
