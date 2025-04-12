import"./assets/styles-BK7AYJoX.js";import{a}from"./assets/vendor-N5iQpiFS.js";a.defaults.baseURL="https://dummyjson.com/products";async function g(){const{data:t}=await a.get("/category-list");return t}async function p(t,o=1){const{data:e}=await a.get(`/category/${t}?limit=12&skip=${(o-1)*12}`);return e}async function i(t=1){const{data:o}=await a.get(`?limit=12&skip=${(t-1)*12}`);return o}const d={categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products"),modal:document.querySelector(".modal")};function m(t){const e=["All",...t].map(s=>`
        <li class="categories__item">
            <button class="categories__btn" type="button">${s}</button>
        </li>
        `).join("");d.categoriesList.insertAdjacentHTML("beforeend",e)}function r(t){const o=t.map(({id:e,title:s,thumbnail:c,brand:n,category:l,price:u})=>`
         <li class="products__item" data-id="${e}">
    <img class="products__image" src="${c}" alt="${s}"/>
    <p class="products__title">${s}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${n}</span></p>
    <p class="products__category">Category: ${l}</p>
    <p class="products__price">Price: ${u}$</p>
 </li>
          `).join("");d.productsList.insertAdjacentHTML("beforeend",o)}async function y(){try{const t=await g();m(t);const{products:o}=await i();r(o)}catch(t){console.log(t)}}async function _(t){try{if(t.target.tagName!=="BUTTON")return;const o=t.target.textContent,e=t.target,s=document.querySelector(".not-found");if(console.log(o),o==="All"){const{products:n}=await i();console.log("all",n),r(n);return}const{products:c}=await p(o);if(console.log(c.length),c.length===0){console.log("notFound"),s.classList.add("not-found--visible");return}e.classList.add("categories__btn--active"),console.log(c),console.log(e),r(c)}catch(o){console.log(o)}}document.addEventListener("DOMContentLoaded",y);document.addEventListener("click",_);
//# sourceMappingURL=index.js.map
