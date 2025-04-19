import"./assets/styles-BK7AYJoX.js";import{a as r,i as _}from"./assets/vendor-4yCzdkXl.js";r.defaults.baseURL="https://dummyjson.com/products";async function C(){const{data:t}=await r.get("/category-list");return t}async function y(t,e=1){const{data:o}=await r.get(`/category/${t}?limit=12&skip=${(e-1)*12}`);return o}async function u(t=1){const{data:e}=await r.get(`?limit=12&skip=${(t-1)*12}`);return e}async function w(t){const{data:e}=await r.get(`/${t}`);return e}async function L(t,e=1){const{data:o}=await r.get(`/search?q=${t}&limit=12&skip=${(e-1)*12}`);return o}const n={categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products"),modal:document.querySelector(".modal"),modalProduct:document.querySelector(".modal-product"),modalCloseBtn:document.querySelector(".modal__close-btn"),searchForm:document.querySelector(".search-form"),notFound:document.querySelector(".not-found"),searchFormBtnClear:document.querySelector(".search-form__btn-clear"),addToCartBtn:document.querySelector(".modal-product__btn--cart"),cartCount:document.querySelector("span[data-cart-count]"),addToWishlistBtn:document.querySelector(".modal-product__btn--wishlist"),wishlistCount:document.querySelector("span[data-wishlist-count]")};function S(t){const o=["All",...t].map(s=>`
        <li class="categories__item">
            <button class="categories__btn" type="button">${s}</button>
        </li>
        `).join("");n.categoriesList.insertAdjacentHTML("beforeend",o)}function i(t){const e=t.map(({id:o,title:s,thumbnail:c,brand:l,category:f,price:h})=>`
         <li class="products__item" data-id="${o}">
    <img class="products__image" src="${c}" alt="${s}"/>
    <p class="products__title">${s}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${l}</span></p>
    <p class="products__category">Category: ${f}</p>
    <p class="products__price">Price: ${h}$</p>
 </li>
          `).join("");n.productsList.insertAdjacentHTML("beforeend",e)}function b(t){n.modalProduct.id=t.id;const e=`<img class="modal-product__img" src="${t.images[0]}" alt="" />
      <div class="modal-product__content">
        <p class="modal-product__title">${t.title}</p>
        <ul class="modal-product__tags">${t.tags.map(o=>`<li class="modal-product__tag">${o}</li>`).join("")}</ul>
        <p class="modal-product__description">${t.description}</p>
        <p class="modal-product__shipping-information">Shipping: ${t.shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${t.returnPolicy}</p>
        <p class="modal-product__price">Price: ${t.price} $</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`;n.modalProduct.innerHTML=e,console.log(t)}function d(){n.productsList.innerHTML=""}function m(t,e){let o=a(t)||[];Array.isArray(o)||(o=[o]),o.push(e),localStorage.setItem(t,JSON.stringify(o))}function a(t){const e=localStorage.getItem(t);return e?JSON.parse(e):null}function g(t,e){let o=a(t)||[];Array.isArray(o)||(o=[o]),o=o.filter(s=>s!==e),localStorage.setItem(t,JSON.stringify(o)),o.length}async function x(){try{const o=await C();S(o);const{products:s}=await u();i(s)}catch(o){console.log(o)}const t=a("cart");t?n.cartCount.textContent=t.length:n.cartCount.textContent=0;const e=a("wishlist");e?n.wishlistCount.textContent=e.length:n.wishlistCount.textContent=0}async function B(t){try{if(t.target.tagName!=="BUTTON")return;const e=t.target.textContent,o=t.target,s=document.querySelector(".not-found");if(console.log(e),e==="All"){const{products:l}=await u();console.log("all",l),i(l);return}const{products:c}=await y(e);if(console.log(c.length),c.length===0){console.log("notFound"),s.classList.add("not-found--visible");return}o.classList.add("categories__btn--active"),console.log(c),console.log(o),i(c)}catch(e){console.log(e)}}async function $(t){if(!t.target.closest(".products__item"))return;console.log(t.target.closest(".products__item")),console.log(t.target.closest(".products__item"));const e=t.target.closest(".products__item").dataset.id,o=await a("cart"),s=await a("wishlist");console.log(o),o&&o.includes(e)?n.addToCartBtn.textContent="Remove from cart":n.addToCartBtn.textContent="Add to cart",s&&s.includes(e)?n.addToWishlistBtn.textContent="Remove from Wishlist":n.addToWishlistBtn.textContent="Add to Wishlist";const c=await w(e);n.modal.classList.add("modal--is-open"),b(c),document.addEventListener("keydown",p)}function v(){n.modal.classList.remove("modal--is-open"),document.removeEventListener("keydown",p)}function k(t){t.target===t.currentTarget&&n.modal.classList.remove("modal--is-open")}function p(t){t.code==="Escape"&&n.modal.classList.remove("modal--is-open")}async function T(t){t.preventDefault(),console.log(t.target.elements.searchValue.value);const e=t.target.elements.searchValue.value.trim();if(e===""){_.warning({title:"Warning",message:"Please enter a search query",position:"topRight",timeout:3e3}),console.log("Please enter a search query");return}const{products:o}=await L(e);if(console.log(o),o.length===0){d(),n.notFound.classList.add("not-found--visible");return}d(),i(o)}async function q(){n.searchForm.elements.searchValue.value="",n.notFound.classList.contains("not-found--visible")&&n.notFound.classList.remove("not-found--visible"),d();const t=await u();i(t.products)}function P(t){console.log("add to cart"),console.log(t.target);const e=t.target.closest(".modal__content").querySelector(".modal-product").id;if(t.target.textContent==="Remove from cart"){g("cart",e),t.target.textContent="Add to cart";const s=a("cart");s.length===0?n.cartCount.textContent=0:n.cartCount.textContent=s.length}else m("cart",e),t.target.textContent="Remove from cart";const o=a("cart");n.cartCount.textContent=o.length}function A(t){console.log("add to wishlist"),console.log(t.target);const e=t.target.closest(".modal__content").querySelector(".modal-product").id;if(t.target.textContent==="Remove from Wishlist"){g("wishlist",e),t.target.textContent="Add to Wishlist";const s=a("wishlist");s.length===0?n.wishlistCount.textContent=0:n.wishlistCount.textContent=s.length}else m("wishlist",e),t.target.textContent="Remove from Wishlist";const o=a("wishlist");n.wishlistCount.textContent=o.length}document.addEventListener("DOMContentLoaded",x);n.categoriesList.addEventListener("click",B);n.productsList.addEventListener("click",$);n.modalCloseBtn.addEventListener("click",v);n.modal.addEventListener("click",k);n.searchForm.addEventListener("submit",T);n.searchFormBtnClear.addEventListener("click",q);n.addToCartBtn.addEventListener("click",P);n.addToWishlistBtn.addEventListener("click",A);
//# sourceMappingURL=index.js.map
