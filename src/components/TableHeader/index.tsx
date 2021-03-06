import React from 'react';

// Models
import { Props } from '../../models';

// Icon
import arrow from '../../assets/images/arrow.png';

import { sortTableDataBy } from '../../utils/table';

const TableHeader: React.FC<Props> = ({ sortConfig, sortTableData }) => {
  const nameSortConfig = sortTableDataBy('name', sortConfig!);
  const genderSortConfig = sortTableDataBy('gender', sortConfig!);
  const heightSortConfig = sortTableDataBy('height', sortConfig!);

  const returnClass = (key: string) => (sortConfig?.direction === 'dsc' && sortConfig?.key === key ? 'rotate' : '');

  return (
    <tr className='movies-list__table-header-row'>
      <th className={`movies-list__table-heading ${sortConfig?.key === 'name' ? 'active-heading' : ''}`}>
        <button className='movies-list__table-sorter' type='button' onClick={() => sortTableData!(nameSortConfig)}>
          Name
        </button>
        {sortConfig?.key === 'name' && (
          <span className={`movies-list__table-sorter-icon ${returnClass('name')}`}>
            <img src={arrow} alt='' />
          </span>
        )}
      </th>
      <th className={`movies-list__table-heading ${sortConfig?.key === 'gender' ? 'active-heading' : ''}`}>
        <button className='movies-list__table-sorter' type='button' onClick={() => sortTableData!(genderSortConfig)}>
          Gender
        </button>
        {sortConfig?.key === 'gender' && (
          <span className={`movies-list__table-sorter-icon ${returnClass('gender')}`}>
            <img src={arrow} alt='' />
          </span>
        )}
      </th>
      <th className={`movies-list__table-heading ${sortConfig?.key === 'height' ? 'active-heading' : ''}`}>
        <button className='movies-list__table-sorter' type='button' onClick={() => sortTableData!(heightSortConfig)}>
          Height
        </button>
        {sortConfig?.key === 'height' && (
          <span className={`movies-list__table-sorter-icon ${returnClass('height')}`}>
            <img src={arrow} alt='' />
          </span>
        )}
      </th>
    </tr>
  );
};

export default TableHeader;
