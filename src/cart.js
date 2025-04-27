//Логіка сторінки Cart
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from "izitoast";
import { onAddToCartBtnClick, onAddToWishlistBtnClick, onModalCloseBtnClick, onOverlayClick, onProductClick, onSearchFormBtnClearClick, onSearchFormSubmit } from "./js/handlers";
import { getProductById } from "./js/products-api";
import { refs } from "./js/refs";
import { clearProductsList, renderAsideCart, renderProductById, renderProducts } from "./js/render-function";
import { getFromStorage } from "./js/storage";

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
refs.productsList.addEventListener('click', (onProductClick));
refs.modalCloseBtn.addEventListener('click', onModalCloseBtnClick);
refs.modal.addEventListener('click', onOverlayClick);
refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.searchFormBtnClear.addEventListener('click', onSearchFormBtnClearClick);
refs.addToCartBtn.addEventListener('click', onAddToCartBtnClick);
refs.addToWishlistBtn.addEventListener('click', onAddToWishlistBtnClick);
refs.cartSummaryBtn.addEventListener('click', onCartSummaryBtnClick);

export async function onDOMContentLoaded() {
  
  const cart = getFromStorage('cart');
  if (cart) {
    refs.cartCount.textContent = cart.length;
    refs.cartSummaryItem.textContent = cart.length;
    // const products = await Promise.all(cart.map(id => getProductById(id)));
    // const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
    // refs.cartSummaryPrice.textContent = totalPrice;
    renderAsideCart();
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
    const cart = getFromStorage('cart');
    console.log("cart",cart);
    
    if (cart.length > 0) {
        const products= cart.map(async (id) => {
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

export function onCartSummaryBtnClick(event) {
    // const cart = getFromStorage('cart');
    // console.log('summary',cart);
    localStorage.setItem('cart', JSON.stringify([]));
    clearProductsList();
    renderAsideCart();
    iziToast.success({
      title: 'Success',
      message: 'You have successfully purchased all products',
      position: 'center',
      class: 'my-custom-toast',
      
    });
}
