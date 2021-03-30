import React from 'react';

import './style.scss';
import logo from '../../assets/images/logo-yellow-small.png';

const Header: React.FC = () => {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Star Wars logo' height='44px' />
      <h1 className='header__title'>Movies</h1>
    </header>
  );
};

export default Header;
