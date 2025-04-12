// Функції, які передаються колбеками в addEventListners
import { getCategories, getProducts, getProductsByCategory } from './products-api';
import { renderCategories, renderProducts } from './render-function';

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