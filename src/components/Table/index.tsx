import React from 'react';

// Models
import { Prop, GenderList } from '../../models';

import './style.scss';

// Icon
import arrow from '../../assets/images/arrow.png';

// Utils
import {
  getGenderImage,
  characterFilter,
  characterSorter,
  genderFilter,
  getCharacterCount,
  getTotalHieght,
  sortTableDataBy
} from '../../utils/table';

const Table: React.FC<Prop> = ({ movieCharacterInfo, filterTableData, filterText, sortConfig, sortTableData }) => {
  const nameSortConfig = sortTableDataBy('name', sortConfig!);
  const genderSortConfig = sortTableDataBy('gender', sortConfig!);
  const heightSortConfig = sortTableDataBy('height', sortConfig!);
  const movieInfo = movieCharacterInfo?.movie!;
  const characters = movieCharacterInfo?.characters
    .filter(character => characterFilter(character, filterText!))
    .sort((a, b) => characterSorter(a, b, sortConfig!));

  const selectGenderConstants = [
    { value: GenderList.ALL, label: 'All' },
    { value: GenderList.MALE, label: 'Male' },
    { value: GenderList.FEMALE, label: 'Female' },
    { value: GenderList.HERMAPHRODITE, label: 'Hermaphrodite' },
    { value: GenderList.NONHUMAN, label: 'Non Human' }
  ];

  const createMarkup = () => {
    return {
      __html: `<marquee direction='up' scrollamount='2' class='movies-list__opening-crawl-text'>${movieInfo.opening_crawl}</marquee>`
    };
  };

  return (
    <div className='movie-list__movie-character-info'>
      <div dangerouslySetInnerHTML={createMarkup()} className='movies-list__opening-crawl'></div>

      <div className='movies-list__gender-filter'>
        <select
          className='movies-list__gender-filter-select'
          onChange={evt => filterTableData!(genderFilter(evt.currentTarget.value))}
        >
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
              <button
                className='movies-list__table-sorter'
                type='button'
                onClick={() => sortTableData!(nameSortConfig)}
              >
                Name
              </button>
              {sortConfig?.key === 'name' && (
                <span
                  className={`movies-list__table-sorter-icon ${
                    sortConfig.direction === 'dsc' && sortConfig.key === 'name' ? 'rotate' : ''
                  }`}
                >
                  <img src={arrow} alt='' />
                </span>
              )}
            </th>
            <th className='movies-list__table-heading'>
              <button
                className='movies-list__table-sorter'
                type='button'
                onClick={() => sortTableData!(genderSortConfig)}
              >
                Gender
              </button>
              {sortConfig?.key === 'gender' && (
                <span
                  className={`movies-list__table-sorter-icon ${
                    sortConfig?.direction === 'dsc' && sortConfig?.key === 'gender' ? 'rotate' : ''
                  }`}
                >
                  <img src={arrow} alt='' />
                </span>
              )}
            </th>
            <th className='movies-list__table-heading'>
              <button
                className='movies-list__table-sorter'
                type='button'
                onClick={() => sortTableData!(heightSortConfig)}
              >
                Height
              </button>
              {sortConfig?.key === 'height' && (
                <span
                  className={`movies-list__table-sorter-icon ${
                    sortConfig?.direction === 'dsc' && sortConfig?.key === 'height' ? 'rotate' : ''
                  }`}
                >
                  <img src={arrow} alt='' />
                </span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {characters?.map((character, index) => (
            <tr className='movies-list__table-row' key={index}>
              <td className='movies-list__table-content'>{character.name}</td>
              <td className='movies-list__table-content'>
                <img title={character.gender} src={getGenderImage(character.gender)} alt={character.gender} />
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
