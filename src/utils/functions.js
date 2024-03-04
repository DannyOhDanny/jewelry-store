import { PRODUCTS_PER_PAGE } from './constants';

export const capitalizedQuery = query => {
  const firstLetter = query.charAt(0).toUpperCase();
  const remainingLetters = query.slice(1);
  const capitalizedWord = firstLetter + remainingLetters;
  return capitalizedWord;
};

export const getTotalPageCount = allFetchedItems =>
  Math.ceil(allFetchedItems / PRODUCTS_PER_PAGE);

export const filterDuplicates = array => {
  return array.filter(
    (value, index, self) => self.findIndex(v => v.id === value.id) === index
  );
};

function newPrice(price) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    currencyDisplay: 'symbol'
  }).format(price);
}
export default newPrice;
