import"./assets/styles-JE8YjOlG.js";import{a as n}from"./assets/vendor-N5iQpiFS.js";function d(e,t,o){e.forEach(s=>{s.classList.remove(o)}),t.classList.add(o)}const g="https://dummyjson.com",a={CATEGORIES:"/products/category-list",PRODUCTS:"/products"};n.defaults.baseURL=g;function p(){return n.get(a.CATEGORIES).then(({data:e})=>e)}function _(){return n.get(a.PRODUCTS).then(({data:e})=>e)}const c={categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products")};function m(e){const o=["All",...e].map(r=>`<li class="categories__item">
        <button class="categories__btn" type="button">${r}</button>
      </li>`).join("");c.categoriesList.innerHTML=o;const s=document.querySelector(".categories__btn");s&&s.classList.add("categories__btn--active")}function L(e){const t=e.map(({id:o,thumbnail:s,title:r,brand:i,category:u,price:l})=>`<li class="products__item" data-id="${o}">
        <img class="products__image" src="${s}" alt="${r}"/>
        <p class="products__title">${r}</p>
        <p class="products__brand">
        <span class="products__brand--bold">Brand: ${i}</span>
        </p>
        <p class="products__category">Category: ${u}</p>
        <p class="products__price">Price: ${l}$</p>
        </li>`).join("");c.productsList.insertAdjacentHTML("beforeend",t)}function f(e){p().then(t=>{m(t)}).catch(t=>{console.log("Error on load Categories in Home page",t)}),_().then(({products:t})=>{L(t)}).catch(t=>{console.log("Error on load Products in Home page",t)})}function b(e){const t=e.target.closest(".categories__btn");if(!t)return;const o=c.categoriesList.querySelectorAll(".categories__btn");d(o,t,"categories__btn--active")}document.addEventListener("DOMContentLoaded",f);c.categoriesList.addEventListener("click",b);
//# sourceMappingURL=index.js.map
