//Логіка сторінки Wishlist

import { onAddToCartBtnClick, onAddToWishlistBtnClick, onModalCloseBtnClick, onOverlayClick, onProductClick, onSearchFormBtnClearClick, onSearchFormSubmit } from "./js/handlers";
import { getProductById } from "./js/products-api";
import { refs } from "./js/refs";
import { renderProductById, renderProducts } from "./js/render-function";
import { getFromStorage } from "./js/storage";

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
refs.productsList.addEventListener('click', (onProductClick));
refs.modalCloseBtn.addEventListener('click', onModalCloseBtnClick);
refs.modal.addEventListener('click', onOverlayClick);
refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.searchFormBtnClear.addEventListener('click', onSearchFormBtnClearClick);
refs.addToCartBtn.addEventListener('click', onAddToCartBtnClick);
refs.addToWishlistBtn.addEventListener('click', onAddToWishlistBtnClick);

export async function onDOMContentLoaded() {
  
  const cart = getFromStorage('cart');
  if (cart) {
    refs.cartCount.textContent = cart.length;
  } else {
    refs.cartCount.textContent = 0;
  }
  const wishlist = getFromStorage('wishlist');
  if (wishlist) {
    refs.wishlistCount.textContent = wishlist.length;
  }
  else {
    refs.wishlistCount.textContent = 0;
  }
  try {
    const wishlist = getFromStorage('wishlist');
    console.log("wishlist",wishlist);
    
    if (wishlist.length > 0) {
        const products= wishlist.map(async (id) => {
          const product = await getProductById(id);
          return product;
        });
        Promise.all(products).then((products) => {
          renderProducts(products);
        });
    //   const products = await getProductById(wishlist);
    //   console.log("whishlist",products);
      
    //   renderProducts(products);
    } else {
      refs.productsList.innerHTML = '<p>Wishlist is empty</p>';

    }
  } catch (error) {
    console.log(error);
  }
}