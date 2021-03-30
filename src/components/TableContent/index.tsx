import React from 'react';

import { People, Props } from '../../models';

import { getCharacterCount, getGenderImage, getTotalHieght } from '../../utils/table';

const TableContent: React.FC<Props> = ({ characters }) => {
  return (
    <>
      {characters?.map((character: People, index: number) => (
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
    </>
  );
};

TableContent.propTypes = {};

export default TableContent;
