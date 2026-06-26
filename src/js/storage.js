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
  const crtItems = getCartItems();
  const updatedItems = cartItems.filter(item => item !== id);
  saveToStorage(STORAGE_KEYS.CART, updatedItems)
}

export function isInCart(id) {
  const cartItems = getCartItems();
  return cartItems.includes(id);
}
