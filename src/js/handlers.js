import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { showToast, toggleActiveCless } from './helpers';
import { openModal } from './modal';
import {
  getCategories,
  getProductById,
  getProducts,
  getProductsByCategory,
  getProductsBySearchQueary,
} from './products-api';
import { refs } from './refs';
import {
  clearProductList,
  hideNotFound,
  renderCategories,
  renderProductModal,
  renderProducts,
  showNotFound,
} from './render-function';
import { isInCart } from './storage';

let currentProductId = null;

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

  clearProductList();

  const allCategoryButtons =
    refs.categoriesList.querySelectorAll('.categories__btn');

  toggleActiveCless(
    allCategoryButtons,
    categoryButtonTarget,
    'categories__btn--active'
  );

  const categorySlag = categoryButtonTarget.textContent.trim();
  let productsData = getProducts();

  if (categorySlag === 'All') {
    getProducts()
      .then(({ products }) => {
        renderProducts(products);
      })
      .catch(e => {
        console.log('Error on load Products in Home page', e);
      });
  } else {
    getProductsByCategory(categorySlag)
      .then(({ products }) => {
        if (products.length > 0) {
          renderProducts(products);
          hideNotFound();
        } else {
          showNotFound();
        }
      })
      .catch(e => {
        console.log('Error on load Products by Category in Home page', e);
        showNotFound();
      });
  }
}

export function handleProductListClick(event) {
  const productItem = event.target.closest('.products__item');

  if (!productItem) return;

  const productId = Number(productItem.dataset.id);
  currentProductId = productId;

  getProductById(productId)
    .then(product => {
      openModal();
      renderProductModal(product);
    })
    .catch(e => {
      console.log('Error on handleProductListClick', e);
    });
}

export function handleSerchFormSubmit(event) {
  event.preventDefault();
  const serachValue = event.target.elements.searchValue.value.trim();
  if (serachValue === '') {
    showToast('enter a serch queary', 'warning');
    return;
  }
  getProductsBySearchQueary(serachValue)
    .then(({ products }) => {
      clearProductList();
      if (products.length > 0) {
        renderProducts(products);
        hideNotFound();
      } else {
        showNotFound();
      }
    })
    .catch(e => {
      console.log('Error on handleSerchFormSubmit', e);
      showNotFound();
    });
}

export function handleSerchClear(event) {
  refs.searchForm.reset();

  clearProductList();

  getProducts()
    .then(({ products }) => {
      renderProducts(products);
      hideNotFound();
    })
    .catch(e => {
      console.log('Error on handleSerchClear', e);
    });
}

export function handleAddToCartClick(event) {
  if (!currentProductId) {
    return;
  }

  if(isInCart(currentProductId)){
    // todo: тут закінчили
  }
}
