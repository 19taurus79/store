import { onCategoryClick, onDOMContentLoaded, onEscKeyPress, onModalCloseBtnClick, onOverlayClick, onProductClick } from './js/handlers';
import { refs } from './js/refs';

//Логіка сторінки Home
document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

refs.categoriesList.addEventListener('click', (onCategoryClick));
refs.productsList.addEventListener('click', (onProductClick));
refs.modalCloseBtn.addEventListener('click', onModalCloseBtnClick);
refs.modal.addEventListener('click', onOverlayClick);
// document.addEventListener('keydown', onEscKeyPress);