import axios from 'axios';

import { BASE_URL, HEADERS } from '/src/utils/constants';

axios.defaults.headers = HEADERS;

const catalogAPI = {
  getProductIDs: (offset, limit) => {
    return axios
      .post(BASE_URL, {
        action: 'get_ids',
        params: { offset, limit }
      })
      .then(({ data }) => data.result);
  },

  getAllProductIDs: () => {
    return axios
      .post(BASE_URL, {
        action: 'get_ids'
      })
      .then(({ data }) => data.result);
  },

  getFilteredProductIDs: (price, brand, product) => {
    const params = {};

    if (price) {
      params.price = Number(price);
    }

    if (brand) {
      params.brand = brand;
    }

    if (product) {
      params.product = product;
    }
    return axios
      .post(BASE_URL, {
        action: 'filter',
        params
      })
      .then(({ data }) => data.result);
  },

  getItems: ids => {
    return axios
      .post(BASE_URL, {
        action: 'get_items',
        params: { ids }
      })
      .then(({ data }) => data.result);
  }
};

export default catalogAPI;
