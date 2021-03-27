/*
## This file contains various helper functions for the Table component;
*/

// Models
import { People } from "../../models";

// Icons
import male from '../../assets/images/male.png';
import female from '../../assets/images/female.png';
import robot from '../../assets/images/robot.png';
import hermaphrodite from '../../assets/images/hermaphrodite.png';

// Custom Types
type sortConfig = { key: string; direction: string } | null;
type item = number | string;
type sortReturn = -1 | 1 | 0;

/**
 * Returns selected value from drop down filter
 * @param {string} gender
 * @returns {string}
 */
export const genderFilter = (gender: string) => gender;

/**
 * Returns total number of characters
 * @param {People} characters
 * @returns {number}
 */
export const getCharacterCount = (characters: People[]): number => characters.length;

/**
 * Returns a string of total height of listed characters e.g 170 cm (5ft/6.96in)
 * @param {People[]} characters
 * @returns {string}
 */
export const getTotalHieght = (characters: People[]): string => {
  const heightInCentimeters = characters
    .filter(character => !isNaN(+character.height))
    .reduce((acc, curr) => acc + +curr.height, 0);
  const heightInInches = heightInCentimeters / 2.54;
  const heightInFeet = Math.floor(heightInInches / 12);
  const finalInches = (heightInInches - 12 * heightInFeet).toFixed(2);

  return `${heightInCentimeters} cm (${heightInFeet}ft/${finalInches}in)`;
};

/**
 * Returns the appropriate image icon for a gender
 * @param {string} gender
 * @returns {string}
 */
export const getGenderImage = (gender: string): string => {
  if (gender === 'male') return male;
  if (gender === 'female') return female;
  if (gender === 'n/a') return robot;
  if (gender === 'hermaphrodite') return hermaphrodite;

  return '';
};

/**
 * Does a sort on a list of character inputs
 * @param {People} itemOne
 * @param {People} itemTwo
 * @param {People} sortConfig
 * @returns {number}
 */
export const characterSorter = (itemOne: People, itemTwo: People, sortConfig: sortConfig): sortReturn => {
  const key: keyof People = sortConfig!?.key as any;

  if (key === 'height') return sortOrder(+itemOne[key], +itemTwo[key], sortConfig!);
  else return sortOrder(itemOne[key], itemTwo[key], sortConfig!);
}

/**
 * Returns a predicate (true || false) or a list of people that match a certain filter
 * @param {People} character
 * @param {string} filterText
 * @returns {string}
 */
export const characterFilter = (character: People, filterText: string): boolean | People => {
  if (filterText === 'all') return character;
  if (filterText === 'none') return character.gender.includes('n');

  return character.gender === filterText;
}

/**
 * Compares and returns the sort order for a set of items
 * @param {People} itemOne
 * @param {People} itemTwo
 * @param {sortConfig} config
 * @returns {number}
 */
export const sortOrder = (itemOne: item, itemTwo: item, config: sortConfig) : sortReturn => {
  if (itemOne < itemTwo) return config?.direction === 'asc' ? -1 : 1;
  if (itemOne > itemTwo) return config?.direction === 'asc' ? 1 : -1;

  return 0;
};

/**
 * Compares and returns an object with the key to sort by and the direction (ascending | descending)
 * @param {string} key
 * @param {sortConfig} sortConfig
 * @returns {object}
 */
export const sortTableDataBy = (key: string, sortConfig: sortConfig): { key: string; direction: string } => {
  let direction = 'asc';

  if (sortConfig?.key === key && sortConfig.direction === 'asc') direction = 'dsc';
  return { key, direction };
};
