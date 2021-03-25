import { Film, People } from './index';

export interface MovieCharacter {
  movie: Film;
  characters: People[];
}
