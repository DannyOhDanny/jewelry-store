import getHashAuth from './getHashAuth';

export const BASE_URL: string = 'https://api.valantis.store:41000/';

export const BASE_PSW: string = 'Valantis';

// Заголовки запроса
export const HEADERS = {
  'Content-Type': 'application/json',
  'X-Auth': getHashAuth()
};

// Константа кол-ва элементов на странице

export const PRODUCTS_PER_PAGE: number = 50;
// Ошибки
export const SERVER_ERROR: string = 'Ошибка при отправке запроса';
export const MESSAGE_ERROR: string = 'По вашему запросу ничего не найдено';

type TCard = {
  id: number;
  brand: string;
  product: string;
  price: number;
};

export const MOCK_CARD: TCard = {
  id: 1,
  brand: '',
  product: 'По вашему запросу ничего не найдено',
  price: 0
};
