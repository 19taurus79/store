import"./assets/styles-BK7AYJoX.js";import{a as n}from"./assets/vendor-N5iQpiFS.js";n.defaults.baseURL="https://dummyjson.com/products";async function m(){const{data:t}=await n.get("/category-list");return t}async function g(t,o=1){const{data:e}=await n.get(`/category/${t}?limit=12&skip=${(o-1)*12}`);return e}async function l(t=1){const{data:o}=await n.get(`?limit=12&skip=${(t-1)*12}`);return o}async function _(t){const{data:o}=await n.get(`/${t}`);return o}const s={categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products"),modal:document.querySelector(".modal"),modalProduct:document.querySelector(".modal-product"),modalCloseBtn:document.querySelector(".modal__close-btn")};function y(t){const e=["All",...t].map(c=>`
        <li class="categories__item">
            <button class="categories__btn" type="button">${c}</button>
        </li>
        `).join("");s.categoriesList.insertAdjacentHTML("beforeend",e)}function i(t){const o=t.map(({id:e,title:c,thumbnail:a,brand:r,category:u,price:p})=>`
         <li class="products__item" data-id="${e}">
    <img class="products__image" src="${a}" alt="${c}"/>
    <p class="products__title">${c}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${r}</span></p>
    <p class="products__category">Category: ${u}</p>
    <p class="products__price">Price: ${p}$</p>
 </li>
          `).join("");s.productsList.insertAdjacentHTML("beforeend",o)}function f(t){const o=`<img class="modal-product__img" src="${t.images[0]}" alt="" />
      <div class="modal-product__content">
        <p class="modal-product__title">${t.title}</p>
        <ul class="modal-product__tags">${t.tags.map(e=>`<li class="modal-product__tag">${e}</li>`).join("")}</ul>
        <p class="modal-product__description">${t.description}</p>
        <p class="modal-product__shipping-information">Shipping: ${t.shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${t.returnPolicy}</p>
        <p class="modal-product__price">Price: ${t.price} $</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`;s.modalProduct.innerHTML=o}async function L(){try{const t=await m();y(t);const{products:o}=await l();i(o)}catch(t){console.log(t)}}async function $(t){try{if(t.target.tagName!=="BUTTON")return;const o=t.target.textContent,e=t.target,c=document.querySelector(".not-found");if(console.log(o),o==="All"){const{products:r}=await l();console.log("all",r),i(r);return}const{products:a}=await g(o);if(console.log(a.length),a.length===0){console.log("notFound"),c.classList.add("not-found--visible");return}e.classList.add("categories__btn--active"),console.log(a),console.log(e),i(a)}catch(o){console.log(o)}}async function b(t){if(!t.target.closest(".products__item"))return;console.log(t.target.closest(".products__item")),console.log(t.target.closest(".products__item"));const o=t.target.closest(".products__item").dataset.id,e=await _(o);s.modal.classList.add("modal--is-open"),f(e),document.addEventListener("keydown",d)}function k(){s.modal.classList.remove("modal--is-open"),document.removeEventListener("keydown",d)}function C(t){t.target===t.currentTarget&&s.modal.classList.remove("modal--is-open")}function d(t){t.code==="Escape"&&s.modal.classList.remove("modal--is-open")}document.addEventListener("DOMContentLoaded",L);s.categoriesList.addEventListener("click",$);s.productsList.addEventListener("click",b);s.modalCloseBtn.addEventListener("click",k);s.modal.addEventListener("click",C);
//# sourceMappingURL=index.js.map
