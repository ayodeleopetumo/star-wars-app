import React from 'react';

import logo from '../../assets/images/logo-white.png';

const DefaultView: React.FC = () => {
  return (
    <div className='movies-list__empty'>
      <img className='movies-list__empty-img' src={logo} alt='Star Wars' />
    </div>
  );
};

export default DefaultView;
