// Models
import { Film } from '../models';

// Utils
import { dump } from './dump';

export const fetchMovies = async (): Promise<Film[]> => {
  try {
    const response = await fetch('https://swapi.dev/api/films');
    const movies = await response.json();
    const sortedMovies: Film[] = movies.results.sort((filmItemA: Film, filmItemB: Film) => {
      const filmItemADate = filmItemA?.release_date!;
      const filmItemBDate = filmItemB?.release_date!;

      if (filmItemADate > filmItemBDate) return 1;
      if (filmItemADate < filmItemBDate) return -1;
      else return 0;
    });
    dump('Movies', sortedMovies);

    return sortedMovies;
  } catch (error) {
    dump('Error', error);
    throw new Error('Error while retrieving Star Wars Films');
  }
};
