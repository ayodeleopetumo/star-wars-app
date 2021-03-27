import React from 'react';

import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesList from './containers/MoviesList';

// Models
import { Prop } from './models';

const App: React.FC<Prop> = () => {
  return (
    <div className='container'>
      <Header />
      <MoviesList />
      <Footer />
    </div>
  );
};

export default App;
