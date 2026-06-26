import { refs } from './refs';

export function openModal() {
  refs.modal.classList.add('modal--is-open');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleModalEscKeyPress);
  refs.modalCloseBtn.addEventListener('click', handleModalCloseBtnClick);
  refs.modal.addEventListener('click', handleModalBackDropClick);
}

export function closeModal() {
  refs.modal.classList.remove('modal--is-open');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleModalEscKeyPress);
  refs.modalCloseBtn.addEventListener('click', handleModalCloseBtnClick);
  refs.modal.addEventListener('click', handleModalBackDropClick);
}

function handleModalEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function handleModalCloseBtnClick(event) {
  closeModal();
}

function handleModalBackDropClick(event) {
  if(event.target === refs.modal){
    closeModal();
  }
}