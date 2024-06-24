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

function generateJewelryArray() {
  const jewelryTypes = ['Часы', 'Браслет', 'Серьги', 'Колье', 'Подвеска'];
  const brands = ['Tiffany&Co', 'Bucheron', 'Piaget', 'Van Cliff'];

  const jewelryArray = [];

  for (let i = 0; i < 1000; i++) {
    const selectedJewelryType =
      jewelryTypes[Math.floor(Math.random() * jewelryTypes.length)];
    const selectedBrand = brands[Math.floor(Math.random() * brands.length)];

    const product = {
      product: `${selectedJewelryType} ${selectedBrand}`,
      price: (Math.floor(Math.random() * 100000) + 1).toString(),
      id: i + 1,
      brand: selectedBrand
    };

    jewelryArray.push(product);
  }

  return jewelryArray;
}

export const jewelryObjects = generateJewelryArray().map(obj => ({
  ...obj,
  product: `${obj.product}`
}));

console.log(jewelryObjects);
