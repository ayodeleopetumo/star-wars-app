import React from 'react';

// Models
import { Prop } from '../../models';

// Utils
import { dump } from '../../utils/dump';

import './style.scss';

const MoviesSelection: React.FC<Prop> = ({ moviesList }) => {
  return (
    <div className='movies-list__menu'>
      <select
        className='movies-list__select'
        defaultValue='default'
        disabled={!moviesList!.length}
        onChange={e => dump('Selected value:', e.currentTarget.value)}
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
        <div className='movies-list__spinner'></div>
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

export default MoviesSelection;
