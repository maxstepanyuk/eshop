import iziToast from 'izitoast';

export function toggleActiveCless(elements, activeElement, activeClass) {
  elements.forEach(element => {
    element.classList.remove(activeClass);
  });
  activeElement.classList.add(activeClass);
}

export function showToast(message, type = 'success') {
  const options = {
    message,
    position: 'topRight',
    timeoot: 5000,
  };
  switch (type) {
    case 'success':
      iziToast.success(options);
      break;
    case 'error':
      iziToast.error(options);
      break;
    case 'warning':
      iziToast.warning(options);
      break;
    case 'info':
      iziToast.info(options);
      break;

    default:
      iziToast.error({ ...options, message: 'invalid type of tosat' });
      break;
  }
}
