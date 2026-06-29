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
  hideLoader,
  hideNotFound,
  renderCategories,
  renderProductModal,
  renderProducts,
  showLoader,
  showNotFound,
  updateCounter,
} from './render-function';
import {
  addToCart,
  addToWishlist,
  getCartItems,
  getWishlistItems,
  isInCart,
  isInWishlist,
  removeFromCart,
  removeFromWishlist,
} from './storage';

let currentProductId = null;

export async function initHomePage(event) {
  try {
    showLoader();

    const data = await getCategories();
    renderCategories(data);

    const { products } = await getProducts();
    renderProducts(products);

    updateCounter(getCartItems(), getWishlistItems());
  } catch (error) {
    console.log('Error on init Home page', e);
  } finally {
    hideLoader();
  }
}

export async function handleCategoryClick(event) {
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

  try {
    showLoader();
    if (categorySlag === 'All') {
      const { products } = await getProducts();
      renderProducts(products);
    } else {
      const { products } = await getProductsByCategory(categorySlag);
      if (products.length > 0) {
        renderProducts(products);
        hideNotFound();
      } else {
        showNotFound();
      }
    }
  } catch (e) {
    console.log('Error on load Ctegory Products in Home page', e);
    showNotFound();
  } finally {
    hideLoader();
  }
}

export async function handleProductListClick(event) {
  const productItem = event.target.closest('.products__item');

  if (!productItem) return;

  const productId = Number(productItem.dataset.id);
  currentProductId = productId;

  try {
    showLoader();
    const product = await getProductById(productId);
    openModal();
    renderProductModal(product);
  } catch (e) {
    console.log('Error on handleProductListClick', e);
  } finally {
    hideLoader();
  }
}

export async function handleSerchFormSubmit(event) {
  event.preventDefault();
  const serachValue = event.target.elements.searchValue.value.trim();
  if (serachValue === '') {
    showToast('enter a serch queary', 'warning');
    return;
  }

  try {
    showLoader();
    const { products } = await getProductsBySearchQueary(serachValue);
    clearProductList();
    if (products.length > 0) {
      renderProducts(products);
      hideNotFound();
    } else {
      showNotFound();
    }
  } catch (e) {
    console.log('Error on handleSerchFormSubmit', e);
    showNotFound();
  } finally {
    hideLoader();
  }
}

export async function handleSerchClear(event) {
  refs.searchForm.reset();

  clearProductList();

  try {
    showLoader();
    const { products } = await getProducts();
    renderProducts(products);
    hideNotFound();
  } catch (e) {
    console.log('Error on handleSerchClear', e);
  } finally {
    hideLoader();
  }
}

export function handleAddToCartClick(event) {
  if (!currentProductId) {
    return;
  }

  try {
    if (isInCart(currentProductId)) {
      removeFromCart(currentProductId);
      showToast('Product removed from Cart', 'info');
      refs.addToCartBtn.textContent = 'Add to Cart';
    } else {
      addToCart(currentProductId);
      showToast('Product added from Cart', 'info');
      refs.addToCartBtn.textContent = 'Remove to Cart';
    }
    updateCounter(getCartItems(), getWishlistItems());
  } catch (error) {
    console.log('Eroor updating cart: ', error);
  }
}

export function handleAddToWishListClick(event) {
  if (!currentProductId) {
    return;
  }

  try {
    if (isInWishlist(currentProductId)) {
      removeFromWishlist(currentProductId)
      showToast('Product removed from Wishlist', 'info');
      refs.addToWhishListBtn.textContent = 'Add to Wishlist';
    } else {
      addToWishlist(currentProductId)
      showToast('Product added to Cart', 'info');
      refs.addToWhishListBtn.textContent = 'Remove from Wishlist';
    }
  } catch (error) {
    console.log('Error updating wishlist: ', error);
  }
}
