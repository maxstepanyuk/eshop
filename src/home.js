import {
  handleAddToCartClick,
  handleCategoryClick,
  handleProductListClick,
  handleSerchClear,
  handleSerchFormSubmit,
  initHomePage,
} from './js/handlers';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initHomePage);

refs.categoriesList.addEventListener('click', handleCategoryClick);
refs.productsList.addEventListener('click', handleProductListClick);
refs.searchForm.addEventListener('submit', handleSerchFormSubmit);
refs.searchFormClearButton.addEventListener('click', handleSerchClear)
refs.addToCartBtn.addEventListener('click', handleAddToCartClick)