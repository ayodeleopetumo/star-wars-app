import React from 'react';

import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesList from './components/MoviesList';

const App: React.FC = () => {
  return (
    <div className='container'>
      <Header />
      <MoviesList />
      <Footer />
    </div>
  );
};

export default App;
