import { onCategoryClick, onDOMContentLoaded, onEscKeyPress, onModalCloseBtnClick, onOverlayClick, onProductClick, onSearchFormBtnClearClick, onSearchFormSubmit } from './js/handlers';
import { refs } from './js/refs';

//Логіка сторінки Home
document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

refs.categoriesList.addEventListener('click', (onCategoryClick));
refs.productsList.addEventListener('click', (onProductClick));
refs.modalCloseBtn.addEventListener('click', onModalCloseBtnClick);
refs.modal.addEventListener('click', onOverlayClick);
refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.searchFormBtnClear.addEventListener('click', onSearchFormBtnClearClick);