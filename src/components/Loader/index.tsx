import React from 'react';

import './style.scss';

const Loader: React.FC = () => {
  return (
    <div className='movies-list__loader'>
      <span className='movies-list__loader-icon spinner'></span>
      <p className='movies-list__loader-text'>Fetching movie information, please wait...</p>
    </div>
  );
};

export default Loader;
