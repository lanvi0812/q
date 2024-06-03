import productsContent from "/productcontent.js";

// Drop menu
const menu = document.querySelector('#drop-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// Shopping cart
let iconCart = document.querySelector('.navbar__cart .cart__icon');
let closeCart = document.querySelector('.cart .close');
let cart = document.querySelector('.cart');
let cartItems = [];

iconCart.addEventListener('click', () => {
    document.body.classList.toggle('activeCart');
});

closeCart.addEventListener('click', () => {
    document.body.classList.toggle('activeCart');
});

const setProductInCart = (idProduct, quantity, position) => {
    if (quantity > 0) {
        if (position < 0) {
            cartItems.push({
                products_id: idProduct,
                quantity: quantity
            });
        } else {
            cartItems[position].quantity = quantity;
        }
    }
    refreshCartHTML();
};

const refreshCartHTML = () => {
    let listHTML = document.querySelector('.cart__items');
    let defaultQuantity = 0;
    listHTML.innerHTML = null;
    cartItems.forEach(item => {
        defaultQuantity += item.quantity;
        let newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.innerHTML = `
            <div class="image">
                <img src="${productsContent.find(p => p.id == item.products_id).image}" />
            </div>
            <div class="name">${productsContent.find(p => p.id == item.products_id).name}</div>
            <div class="totalPrice">$${productsContent.find(p => p.id == item.products_id).price * item.quantity}</div>
            <div class="quantity">
                <span class="minus">-</span>
                <span>${item.quantity}</span>
                <span class="plus">+</span>
            </div>
        `;
        listHTML.appendChild(newItem);
    });
};

document.addEventListener('click', (event) => {
    let cartClick = event.target;
    let idProduct = cartClick.dataset.id;
    let position = cartItems.findIndex((value) => value.products_id == idProduct);
    let quantity = position < 0 ? 0 : cartItems[position].quantity;

    if (cartClick.classList.contains('addCart')) {
        quantity++;
        setProductInCart(idProduct, quantity, position);
    }
});

// List of products
let content = document.getElementById('content');
let contentTemporary = document.getElementById('contentTemporary');

const loadContent = () => {
    fetch('productlist.html')
    .then(response => response.text())
    .then(html => {
        content.innerHTML = html;
        let productsContainer = document.getElementsByClassName('products')[0];
        productsContainer.innerHTML = contentTemporary.innerHTML;
        contentTemporary.innerHTML = null;
        loadProducts();
    });
};

loadContent();

const loadProducts = () => {
    let productsList = document.querySelector('.products');
    productsList.innerHTML = null;
    productsContent.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.innerHTML = `
            <img src="${product.image}" />
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button class="addCart" data-id="${product.id}">
                Add to Cart
            </button>
        `;
        productsList.appendChild(newProduct);
    });
};
