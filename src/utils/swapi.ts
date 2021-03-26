// Models
import { Film, MovieCharacter, People } from '../models';

// Utils
import { dump } from './dump';

export const fetchMovies = async (): Promise<Film[]> => {
  try {
    const response = await fetch('https://anyorigin.com/go?url=https://swapi.dev/api/films');
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
    throw dumpError(error, 'Error while retrieving Star Wars films');
  }
};

export const fetchMovieAndCharacters = async (id: number): Promise<MovieCharacter> => {
  try {
    const response = await fetch(`https://anyorigin.com/go?url=https://swapi.dev/api/films/${id}`);
    const movie: Film = await response.json();
    const characters: People[] = await fetchCharacters(movie.characters as string[]);
    dump('Movie', { movie, characters });

    return { movie, characters };
  } catch (error) {
    throw dumpError(error, 'Error while retrieving selected film');
  }
};

export const fetchCharacters = async (characters: string[]): Promise<People[]> => {
  try {
    const response = characters.map(character => fetch(character));
    const people: People[] = await Promise.all(response.map(res => res.then(r => r.json()))).then(response =>
      response.map(e => ({ name: e.name, gender: e.gender, height: e.height }))
    );
    dump('Characters', people);

    return people;
  } catch (error) {
    throw dumpError(error, 'Error while retrieving character list');
  }
};

const dumpError = (error: Error, msg: string) => {
  dump('Error', error);
  return new Error(msg);
};
