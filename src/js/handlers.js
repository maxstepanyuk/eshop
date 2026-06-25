import { toggleActiveCless } from './helpers';
import { getCategories, getProducts } from './products-api';
import { refs } from './refs';
import { renderCategories, renderProducts } from './render-function';

export function initHomePage(event) {
  getCategories()
    .then(data => {
      renderCategories(data);
    })
    .catch(e => {
      console.log('Error on load Categories in Home page', e);
    });

  getProducts()
    .then(({ products }) => {
      renderProducts(products);
    })
    .catch(e => {
      console.log('Error on load Products in Home page', e);
    });
}

export function handleCategoryClick(event) {
  const categoryButtonTarget = event.target.closest('.categories__btn');
  if (!categoryButtonTarget) {
    return;
  }

  const allCategoryButtons =
    refs.categoriesList.querySelectorAll('.categories__btn');

  toggleActiveCless(
    allCategoryButtons,
    categoryButtonTarget,
    'categories__btn--active'
  );
}
