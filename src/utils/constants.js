import getHashAuth from './getHashAuth';

export const BASE_URL = 'https://api.valantis.store:41000/';

export const BASE_PSW = 'Valantis';

// Заголовки запроса
export const HEADERS = {
  'Content-Type': 'application/json',
  'X-Auth': getHashAuth()
};

// Константа кол-ва элементов на странице

export const PRODUCTS_PER_PAGE = 50;

// Инфо блок при загрузке
export const MOCK_CARD = {
  id: 1,
  price: '',
  product: 'Карточки товара еще не загрузились',
  brand: '...'
};

// Категории
export const ALL = 'all';
export const PRICE = 'price';
export const BRAND = 'brand';
export const NAME = 'name';

// Errors
export const SERVER_ERR = 'Данные c сервера не получены';
export const QUERY_ERR = 'По вашему запросу ничего не найдено';
export const PRICE_ERR =
  'Ошибка: не указано поисковое слово для категории "цена"';
export const BRAND_ERR =
  'Ошибка: не указано поисковое слово для категории "бренд"';
export const NAME_ERR =
  'Ошибка: не указано поисковое слово для категории "название"';
export const CATEGORY_ERR = 'Ошибка при выборе категории';
