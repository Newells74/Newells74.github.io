import {  getProducto ,getProductos} from "./firebase.js";

const cart = []

let total = 0;

const finalizar = document.querySelector('.finalizar')

const vaciar = document.querySelector('.vaciar')




const emptyCart = () => {

    total = 0;

    document.querySelector('.visualTotal').textContent = total;
    
    cart.length = 0;
     
    document.querySelector('.innerCart').innerHTML = '';

}

finalizar.addEventListener('click', emptyCart);

vaciar.addEventListener('click', emptyCart);

const renderCart = () => {

    const innerCart = document.querySelector('.innerCart');

innerCart.innerHTML = '';

cart.forEach(producto  =>{

    const card = document.createElement('div');

    card.className = 'card mb-3';

    card.innerHTML = ` 

    <div class="row g-0">
    <div class="col-md-4">
      <img src=${producto.data().img} class="img-fluid rounded-start" alt=${producto.data().name}>
    </div>

    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${producto.data().name}</h5>
        <p class="card-text">${producto.data().price}</p>
      </div>
    </div>

  </div>

    `;

    innerCart.append(card);

});

}

const checkCart = (id) => cart.some(producto => producto.id === id);

const updateTotal = (price) => {

  const visualTotal = document.querySelector('.visualTotal');

  total += price;  

  visualTotal.textContent = total;

}

const addTocart = async (e) => {

   const productoId = e.target.id;

   if(checkCart (productoId)) {
    return false;
   }
   else {
    
    const productToCart = await getProducto(productoId);

   updateTotal(productToCart.data().price)

    cart.push(productToCart);

    renderCart();

   }


}

const addEvent = () => {

    const buyBtns = document.querySelectorAll('.buyBtn');
 
    buyBtns.forEach(btn => btn.addEventListener('click',addTocart));

 }

const renderCards = async (productosArr) => {

    const productos = await productosArr;

    const cards = document.querySelector('.cards')

productos.forEach(productos => {

   const card = document.createElement('div');

    card.className = 'card col-12 col-xl-6';

   card.innerHTML = `

    <img src=${productos.data().img} class="card-img-top productImg" alt=${productos.data().name}>

     <div class="card-body">
       <h5 class="card-title"${productos.data().name}</h5>
        <p class="card-text text-succes">${productos.data().price}</p>
       <a href="#" class="btn btn-primary buyBtn" id=${productos.id}>comprar</a>
     </div>

    `;

    cards.append(card)

 });

 addEvent();

  } 

 renderCards(getProductos());



