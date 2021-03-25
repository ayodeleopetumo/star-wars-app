import { Film } from './film.interface';
import { MovieCharacter } from './moviecharacter.interface';

export interface Prop {
  moviesList?: Film[];
  fetchMovie?: Function;
  isLoading?: Function;
  mc?: Function;
  movieCharacterInfo?: MovieCharacter;
  filterTableData?: Function;
  filterText?: string;
}
