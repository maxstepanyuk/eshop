import { STORAGE_KEYS } from './constants';

export function getFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log('Error reading from Local Storage', error.message);
    return null;
  }
}

export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log('Error saving to Local Storage', error.message);
  }
}

export function getCartItems() {
  return getFromStorage(STORAGE_KEYS.CART) ?? [];
}

export function removeFromCart(id) {
  const cartItems = getCartItems();
  const updatedItems = cartItems.filter(item => item !== id);
  saveToStorage(STORAGE_KEYS.CART, updatedItems);
}

export function addToCart(id) {
  const crtItems = getCartItems();
  if (!crtItems.includes(id)) {
    crtItems.push(id);
  }
  saveToStorage(STORAGE_KEYS.CART, crtItems);
}

export function isInCart(id) {
  const cartItems = getCartItems();
  return cartItems.includes(id);
}

export function getWishlistItems() {
  return getFromStorage(STORAGE_KEYS.WHISHLIST) ?? [];
}

export function isInWishlist(id) {
  const wishlistItems = getWishlistItems();
  return wishlistItems.includes(id);
}

export function removeFromWishlist(id) {
  const items = getWishlistItems();
  const updatedItems = items.filter(item => item !== id);
  saveToStorage(STORAGE_KEYS.WHISHLIST, updatedItems);
}

export function addToWishlist(id) {
  const items = getWishlistItems();
  if (!items.includes(id)) {
    items.push(id);
  }
  saveToStorage(STORAGE_KEYS.WHISHLIST, items);
}