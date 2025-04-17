//Функцію для створення, рендеру або видалення розмітки
import { refs } from './refs';


export function renderCategories(categories) {
  const categoriesAll = ['All', ...categories];
  const markup = categoriesAll
    .map(
      category => `
        <li class="categories__item">
            <button class="categories__btn" type="button">${category}</button>
        </li>
        `
    )
    .join('');

  refs.categoriesList.insertAdjacentHTML('beforeend', markup);
}

export function renderProducts(products) {
  const markup = products
    .map(
      ({ id, title, thumbnail, brand, category, price }) => `
         <li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${brand}</span></p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}$</p>
 </li>
          `
    )
    .join('');

  refs.productsList.insertAdjacentHTML('beforeend', markup);
}

export function renderProductById(product){
const markup = `<img class="modal-product__img" src="${product.images[0]}" alt="" />
      <div class="modal-product__content">
        <p class="modal-product__title">${product.title}</p>
        <ul class="modal-product__tags">${product.tags.map(tag => `<li class="modal-product__tag">${tag}</li>`).join('')}</ul>
        <p class="modal-product__description">${product.description}</p>
        <p class="modal-product__shipping-information">Shipping: ${product.shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${product.returnPolicy}</p>
        <p class="modal-product__price">Price: ${product.price} $</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`
refs.modalProduct.innerHTML = markup;
}
export function clearProductsList() {
  refs.productsList.innerHTML = '';
}