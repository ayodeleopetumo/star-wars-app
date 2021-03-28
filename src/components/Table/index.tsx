import React from 'react';

// Models
import { Props, GenderList } from '../../models';

// Components
import TableHeader from '../TableHeader';
import TableContent from '../TableContent';

import './style.scss';

// Utils
import { characterFilter, characterSorter, genderFilter } from '../../utils/table';

const Table: React.FC<Props> = ({ movieCharacterInfo, filterTableData, filterText, sortConfig, sortTableData }) => {

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
          <TableHeader sortConfig={sortConfig} sortTableData={sortTableData} />
        </thead>
        <tbody>
          <TableContent characters={characters} />
        </tbody>
      </table>
    </div>
  );
};

export default Table;
