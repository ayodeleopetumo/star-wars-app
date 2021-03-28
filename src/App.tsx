import React, { useState, useEffect } from 'react';

import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesList from './containers/MoviesList';
import Error from './components/Error';

// Models
import { Film, Props } from './models';

// API
import { fetchMovies } from './utils/swapi';

const App: React.FC<Props> = () => {
  const [movies, setMovies] = useState<Film[]>([]);
  const [appError, setAppError] = useState(false);

  useEffect(() => {
    fetchMovies().then(results => setMovies(results)).catch(err => err && setAppError(true));
  }, []);

  return (
    <div className='container'>
      <Header />
      {appError ? <Error /> : <MoviesList moviesList={movies} setError={setAppError} />}
      <Footer />
    </div>
  );
};

export default App;
