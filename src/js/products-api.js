import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './constants';

axios.defaults.baseURL = API_BASE_URL;

export async function getCategories() {
  const { data } = await axios.get(API_ENDPOINTS.CATEGORIES);
  return data;
}

export async function getProducts() {
  const { data } = await axios.get(API_ENDPOINTS.PRODUCTS);
  return data;
}

export async function getProductsByCategory(category) {
  const { data } = await axios.get(
    API_ENDPOINTS.PRODUCTS_BY_CATEGORY + category
  );
  return data;
}

export async function getProductById(id) {
  const { data } = await axios.get(API_ENDPOINTS.PRODUCT_BY_ID + id);
  return data;
}

export async function getProductsBySearchQueary(searchValue) {
  const { data } = await axios.get(
    `${API_ENDPOINTS.PRODUCTS_BY_SEARCH}?q=${searchValue}`
  );
  return data;
}
