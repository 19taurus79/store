//Обʼєкт з посиланнями на ДОМ елементи

export const refs = {
  categoriesList: document.querySelector('.categories'),
  productsList: document.querySelector('.products'),
  modal: document.querySelector('.modal'),
  modalProduct: document.querySelector('.modal-product'),
  modalCloseBtn: document.querySelector('.modal__close-btn'),
  searchForm: document.querySelector('.search-form'),
  notFound: document.querySelector('.not-found'),
  searchFormBtnClear: document.querySelector('.search-form__btn-clear'),
  addToCartBtn: document.querySelector('.modal-product__btn--cart'),
  cartCount: document.querySelector('span[data-cart-count]'),
  addToWishlistBtn: document.querySelector('.modal-product__btn--wishlist'),
  wishlistCount: document.querySelector('span[data-wishlist-count]'),
  cartSummaryItem: document.querySelector('span[data-count]'),
  cartSummaryPrice: document.querySelector('span[data-price]'),
};
