// Функції, які передаються колбеками в addEventListners
import iziToast from 'izitoast';
import { getCategories, getProductById, getProducts, getProductsByCategory, getProductsByQuery } from './products-api';
import { refs } from './refs';
import { clearProductsList, renderAsideCart, renderCategories, renderProductById, renderProducts } from './render-function';
import 'izitoast/dist/css/iziToast.min.css';
import { getFromStorage, removeFromStorage, saveToStorage } from './storage';

// Функція викликається при завантаженні сторінки
export async function onDOMContentLoaded() {
  try {
    const categories = await getCategories();
    renderCategories(categories);

    const { products } = await getProducts();
    renderProducts(products);
  } catch (error) {
    console.log(error);
  }
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
}
// Функція викликається при кліку на категорію
export async function onCategoryClick(event) {
  try {
    if (event.target.tagName !== 'BUTTON') {
      return;   
    }
    const category = event.target.textContent;
    const categoryBtn = event.target
    const notFound = document.querySelector('.not-found');
    console.log(category)
    if (category === 'All') {
      const { products } = await getProducts();
      console.log('all',products);
      
      renderProducts(products);
      return;
    }
    const { products } = await getProductsByCategory(category);
    console.log(products.length);
    
    if (products.length === 0) {
      console.log('notFound');
      notFound.classList.add('not-found--visible');
      return;
     };
    categoryBtn.classList.add('categories__btn--active');
    //TODO: remove
    console.log(products);
    console.log(categoryBtn);
    
    renderProducts(products);
  } catch (error) {
    console.log(error);
  }
}

export async function onProductClick(event) {
// console.log(event.target.closest('.products__item').classList.contains('products__item'));
// console.log(event.target.closest('.products__item').classList.contains('products__item'));
  if (!event.target.closest('.products__item')) {
    return;
  }console.log(event.target.closest('.products__item'));

console.log(event.target.closest('.products__item'));
  const productId = event.target.closest('.products__item').dataset.id;
  const productInCart = await getFromStorage('cart')
  const productInWishlist = await getFromStorage('wishlist')
  console.log(productInCart);
  if (productInCart && productInCart.includes(productId)) {
    refs.addToCartBtn.textContent = 'Remove from cart';
  } else {
    refs.addToCartBtn.textContent = 'Add to cart';
  }
  if (productInWishlist && productInWishlist.includes(productId)) {
    refs.addToWishlistBtn.textContent = 'Remove from Wishlist';
  } else {
    refs.addToWishlistBtn.textContent = 'Add to Wishlist';
  }
  const product = await getProductById(productId);
  refs.modal.classList.add('modal--is-open');
  renderProductById(product);

  // Добавляем слушатель для клавиши Escape
  document.addEventListener('keydown', onEscKeyPress);
}

export function onModalCloseBtnClick() {
  refs.modal.classList.remove('modal--is-open');

  // Удаляем слушатель для клавиши Escape
  document.removeEventListener('keydown', onEscKeyPress);
}

export function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    refs.modal.classList.remove('modal--is-open');
  }
}
export function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    refs.modal.classList.remove('modal--is-open');
  }
}

export async function onSearchFormSubmit(event) {
  event.preventDefault();
  console.log(event.target.elements.searchValue.value);
  const searchValue = event.target.elements.searchValue.value.trim();
  if (searchValue === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query',
      position: 'topRight',
      timeout: 3000,
      
    });
    console.log('Please enter a search query');
    
    return;
  }
  const { products } = await getProductsByQuery(searchValue);
  console.log(products);
  if (products.length === 0) {
    clearProductsList();
    refs.notFound.classList.add('not-found--visible');
    return;
  };
  clearProductsList();
  renderProducts(products);
}

export async function onSearchFormBtnClearClick() {
  refs.searchForm.elements.searchValue.value = '';
  if (refs.notFound.classList.contains('not-found--visible')) {
    refs.notFound.classList.remove('not-found--visible');
  }
  clearProductsList();
  const products  = await getProducts();
  renderProducts(products.products);
};

export function onAddToCartBtnClick(event) {
  // console.log('add to cart');
  // console.log(event.target);
  const productId = event.target.closest('.modal__content').querySelector('.modal-product').id;
  if (event.target.textContent === 'Remove from cart') {
    removeFromStorage('cart', productId);
    event.target.textContent='Add to cart';
    const cart = getFromStorage('cart');
    if (window.location.pathname === '/cart.html') {
      // const products = getFromStorage('cart');
      // console.log(products);
      console.log('cart lenght',cart.length);
      
      if (cart.length === 0) {
        refs.productsList.innerHTML = '<p>Cart is empty</p>';
      } else {
        const products= cart.map(async (id) => {
          const product = await getProductById(id);
          return product;
        });
        Promise.all(products).then((products) => {
          clearProductsList();
          renderProducts(products);
          renderAsideCart();
        });
      }
    }
  
    if (cart.length === 0) {
      refs.cartCount.textContent = 0;
    } else {
      refs.cartCount.textContent = cart.length;
    }

  }else{
  saveToStorage('cart', productId);
  event.target.textContent='Remove from cart';}
  const cart = getFromStorage('cart');
  refs.cartCount.textContent = cart.length;
  
};

export function onAddToWishlistBtnClick(event) {
  // console.log('add to wishlist');
  // console.log(event.target);
  const productId = event.target.closest('.modal__content').querySelector('.modal-product').id;
  if (event.target.textContent === 'Remove from Wishlist') {
    removeFromStorage('wishlist', productId);
    event.target.textContent='Add to Wishlist';
    const wishlist = getFromStorage('wishlist');
    if (window.location.pathname === '/wishlist.html') {
      // const products = getFromStorage('wishlist');
      // console.log(products);
      console.log('wishlist lenght',wishlist.length);
      
      if (wishlist.length === 0) {
        refs.productsList.innerHTML = '<p>Wishlist is empty</p>';
      } else {
        const products= wishlist.map(async (id) => {
          const product = await getProductById(id);
          return product;
        });
        Promise.all(products).then((products) => {
          clearProductsList();
          renderProducts(products);
        });
      }
    }
    if (wishlist.length === 0) {
      refs.wishlistCount.textContent = 0;
    }
    else {
      refs.wishlistCount.textContent = wishlist.length;
    }
    
  }else{
  saveToStorage('wishlist', productId);
  event.target.textContent='Remove from Wishlist';}
  const wishlist = getFromStorage('wishlist');
  refs.wishlistCount.textContent = wishlist.length;
};