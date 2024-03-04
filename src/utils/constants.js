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
