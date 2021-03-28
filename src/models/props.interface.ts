import { Film } from './film.interface';
import { MovieCharacter } from './moviecharacter.interface';

export interface Props {
  moviesList?: Film[];
  fetchMovie?: Function;
  isLoading?: Function;
  movieCharacters?: Function;
  movieCharacterInfo?: MovieCharacter;
  filterTableData?: Function;
  filterText?: string;
  sortConfig?: { key: string; direction: string } | null;
  sortTableData?: Function;
  setError?: Function;
}
