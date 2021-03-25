import React from 'react';

// Models
import { Film, People, Prop } from '../../models';

import './style.scss';

const Table: React.FC<Prop> = ({ movieCharacterInfo }) => {
  const selectGenderConstants = [
    { value: 'all', label: 'All' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'hermaphrodite', label: 'Hermaphrodite' },
    { value: 'none', label: 'Non Human' }
  ];
  const characters = movieCharacterInfo?.characters!;
  const movieInfo = movieCharacterInfo?.movie!;

  const createMarkup = () => {
    return {
      __html: `<marquee direction='up' scrollamount='2' class='movies-list__opening-crawl-text'>${movieInfo.opening_crawl}</marquee>`
    };
  };

  const getCharacterCount = (characters: People[]) => characters.length;
  const getTotalHieght = (characters: People[]): string => {
    const heightInCentimeters = characters
      .filter(character => !isNaN(+character.height))
      .reduce((acc, curr) => acc + +curr.height, 0);
    const heightInInches = heightInCentimeters / 2.54;
    const heightInFeet = Math.floor(heightInInches / 12);
    const finalInches = (heightInInches - 12 * heightInFeet).toFixed(2);

    return `${heightInCentimeters} cm (${heightInFeet}ft/${finalInches}in)`;
  };

  return (
    <div className='movie-list__movie-character-info'>
      <div dangerouslySetInnerHTML={createMarkup()} className='movies-list__opening-crawl'></div>

      <div className='movies-list__gender-filter'>
        <select className='movies-list__gender-filter-select' onChange={evt => console.log(evt.currentTarget.value)}>
          {selectGenderConstants.map((gender, index) => (
            <option key={index} value={gender.value}>
              {gender.label}
            </option>
          ))}
        </select>
      </div>

      <table className='movies-list__table'>
        <thead className='movies-list__table-header'>
          <tr className='movies-list__table-header-row'>
            <th className='movies-list__table-heading'>Name</th>
            <th className='movies-list__table-heading'>Gender</th>
            <th className='movies-list__table-heading'>Height</th>
          </tr>
        </thead>
        <tbody>
          {movieCharacterInfo?.characters?.map((character, index) => (
            <tr className='movies-list__table-row' key={index}>
              <td className='movies-list__table-content'>{character.name}</td>
              <td className='movies-list__table-content'>{character.gender}</td>
              <td className='movies-list__table-content'>{character.height}</td>
            </tr>
          ))}
          <tr className='movies-list__table-row'>
            <td className='movies-list__table-content'>
              <strong>Total Characters: {getCharacterCount(characters)}</strong>
            </td>
            <td></td>
            <td className='movies-list__table-content'>
              <strong>{getTotalHieght(characters)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
