// Функції, які передаються колбеками в addEventListners
import { getCategories, getProductById, getProducts, getProductsByCategory } from './products-api';
import { refs } from './refs';
import { renderCategories, renderProductById, renderProducts } from './render-function';

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