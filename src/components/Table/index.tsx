import React from 'react';

// Models
import { People, Prop } from '../../models';

import './style.scss';

// Icons
import male from '../../assets/images/male.png';
import female from '../../assets/images/female.png';
import robot from '../../assets/images/robot.png';
import hermaphrodite from '../../assets/images/hermaphrodite.png';
import arrow from '../../assets/images/arrow.png';

const Table: React.FC<Prop> = ({ movieCharacterInfo, filterTableData, filterText, sortConfig, sortTableDate }) => {
  const selectGenderConstants = [
    { value: 'all', label: 'All' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'hermaphrodite', label: 'Hermaphrodite' },
    { value: 'none', label: 'Non Human' }
  ];

  const sortOrder = (itemOne: number | string, itemTwo: number | string) => {
    if (itemOne < itemTwo) return sortConfig?.direction === 'asc' ? -1 : 1;
    if (itemOne > itemTwo) return sortConfig?.direction === 'asc' ? 1 : -1;

    return 0;
  }

  const characters = movieCharacterInfo?.characters
    .filter(character => {
      if (filterText === 'all') return character;
      if (filterText === 'none') return character.gender.includes('n');

      return character.gender === filterText;
    })
    .sort((a, b) => {
      const key: keyof People = sortConfig!?.key as any;

      if (key === 'height') return sortOrder(+a[key], +b[key]);
      else return sortOrder(a[key], b[key]);
    });
  const movieInfo = movieCharacterInfo?.movie!;

  const createMarkup = () => {
    return {
      __html: `<marquee direction='up' scrollamount='2' class='movies-list__opening-crawl-text'>${movieInfo.opening_crawl}</marquee>`
    };
  };

  const genderFilter = (gender: string) => filterTableData!(gender);
  const getCharacterCount = (characters: People[]): number => characters.length;
  const getTotalHieght = (characters: People[]): string => {
    const heightInCentimeters = characters
      .filter(character => !isNaN(+character.height))
      .reduce((acc, curr) => acc + +curr.height, 0);
    const heightInInches = heightInCentimeters / 2.54;
    const heightInFeet = Math.floor(heightInInches / 12);
    const finalInches = (heightInInches - 12 * heightInFeet).toFixed(2);

    return `${heightInCentimeters} cm (${heightInFeet}ft/${finalInches}in)`;
  };

  const getCharacterImage = (gender: string) => {
    if (gender === 'male') return male
    if (gender === 'female') return female
    if (gender === 'n/a') return robot
    if (gender === 'hermaphrodite') return hermaphrodite
  }

  const sortTableDataBy = (key: string) => {
    let direction = 'asc';

    if (sortConfig?.key === key && sortConfig.direction === 'asc') direction = 'dsc';
    console.log({key, direction})
    sortTableDate!({key, direction});
  }

  return (
    <div className='movie-list__movie-character-info'>
      <div dangerouslySetInnerHTML={createMarkup()} className='movies-list__opening-crawl'></div>

      <div className='movies-list__gender-filter'>
        <select className='movies-list__gender-filter-select' onChange={evt => genderFilter(evt.currentTarget.value)}>
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
            <th className='movies-list__table-heading'>
              <button className='movies-list__table-sorter' type="button" onClick={() => sortTableDataBy('name')}>
                Name
              </button>
              { sortConfig?.key === 'name' && (<span className={`movies-list__table-sorter-icon ${sortConfig.direction === 'dsc' && sortConfig.key === 'name' ?'rotate' : ''}`}><img src={arrow} alt=''/></span>) }
            </th>
            <th className='movies-list__table-heading'>
              <button className='movies-list__table-sorter' type="button" onClick={() => sortTableDataBy('gender')}>
                Gender
              </button>
              { sortConfig?.key === 'gender' && (<span className={`movies-list__table-sorter-icon ${sortConfig?.direction === 'dsc' && sortConfig?.key === 'gender' ?'rotate' : ''}`}><img src={arrow} alt=''/></span>) }
            </th>
            <th className='movies-list__table-heading'>
              <button className='movies-list__table-sorter' type="button" onClick={() => sortTableDataBy('height')}>
                Height
              </button>
              { sortConfig?.key === 'height' && (<span className={`movies-list__table-sorter-icon ${sortConfig?.direction === 'dsc' && sortConfig?.key === 'height' ? 'rotate' : '' }`}><img src={arrow} alt=''/></span>) }
            </th>
          </tr>
        </thead>
        <tbody>
          {characters?.map((character, index) => (
            <tr className='movies-list__table-row' key={index}>
              <td className='movies-list__table-content'>{character.name}</td>
              <td className='movies-list__table-content'>
                <img title={character.gender} src={getCharacterImage(character.gender)} alt={character.gender} />
              </td>
              <td className='movies-list__table-content'>{character.height}</td>
            </tr>
          ))}
          <tr className='movies-list__table-row'>
            <td className='movies-list__table-content'>
              <strong>Total Characters: {getCharacterCount(characters!)}</strong>
            </td>
            <td></td>
            <td className='movies-list__table-content'>
              <strong>{getTotalHieght(characters!)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
