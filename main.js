import './style.css';

const accordion = document.querySelector('.accordion');
const accordionTitle = accordion.querySelector('.accordion-title');
const cartButton = document.getElementById('cart');
const cartDrawer = document.getElementById('cartDrawer');
const cartCloseBtn = document.getElementById('cartClose');
const cartList = document.getElementById('cartList');
const summ = document.getElementById('summ');

let cartItems = [];
const screenWidth = window.innerWidth;

if(screenWidth < 450) {
    accordionTitle.textContent = accordionTitle.textContent.slice(0, 14);
}

window.addEventListener('resize', function() {
    const screenWidthRes = window.innerWidth;
    if(screenWidthRes < 450) {
        accordionTitle.textContent = accordionTitle.textContent.slice(0, 14);
    } else {
        accordionTitle.textContent = 'Important info regarding our service';
    }
  });

productList.addEventListener('click', addToCart);
cartList.addEventListener('click', changeQuantity);

cartButton.addEventListener('click', () => {
    cartDrawer.style.right = '0';
    document.body.style.overflow = 'hidden';
})

cartCloseBtn.addEventListener('click', () => {
    cartDrawer.style.right = '-100%';
    document.body.style.overflow = '';
})

accordion.addEventListener('click', () => {
    const panel = accordion.nextElementSibling;
    const arrow = accordion.querySelector('.arrow');

    accordion.classList.toggle('active');

    if(panel.style.maxHeight) {
      panel.style.maxHeight = null;
      arrow.style.rotate = '0deg';
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      arrow.style.rotate = '180deg'
    } 
})

function addToCart(e) {
    if(e.target.id === 'addToCart') {
        const productId = +e.target.dataset.productId;
        const elem = productsFromApi.find(item => item.id === productId);
        const productInCart = cartItems.find(item => item.id === productId)

        if(!productInCart) {
            const cartObj = {
                id: elem.id,
                title: elem.title,
                price: elem.variants[0].price,
                img: elem.images[0] ? elem.images[0].src : 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg',
                quantity: 1
            }
    
            cartItems.push(cartObj);

            const cartElement = document.createElement('li');
            cartElement.className = 'flex justify-between mb-[40px] py-[10px]';
            cartElement.setAttribute('data-product-id', cartObj.id);
        
            cartElement.innerHTML = `
                <div class="flex items-center">
                <div class="flex justify-center w-[74px] h-[74px] mr-[18px] border-[1px] rounded">
                    <img src="${cartObj.img}" alt="${cartObj.title}" />
                </div>
                <div>
                <h3 class="font-bold max-w-[200px] truncate mb-[8px]">${cartObj.title}</h3>
                <p class="font-bold mb-[8px]">${cartObj.price}</p>
                <div class="flex items-center">
                    <button data-product-id='${cartObj.id}' id='minus' class="p-[5px] font-bold">-</button>
                    <p class="quantity mx-[10px] font-bold">${cartObj.quantity}</p>
                    <button data-product-id='${cartObj.id}' id='plus' class="p-[5px] font-bold">+</button>
                </div>
                </div>
            </div>
            <img id="cartRemove" data-product-id='${cartObj.id}' src="https://i.ibb.co/g78CjK9/trash.png" class="w-[24px] h-[24px] text-white cursor-pointer" alt="remove" />
            `;
        
            cartList.appendChild(cartElement);
        }
        calculateSumm();
    }
}

function changeQuantity(e) {
    const productId = +e.target.dataset.productId;
    const cartItem = cartItems.find(item => item.id === productId);
    const cartElement = document.querySelector(`[data-product-id="${productId}"]`);

    if (cartItem) {
        if (e.target.id === 'plus') {
            cartItem.quantity++;
            if (cartElement) {
                const quantityElement = cartElement.querySelector('.quantity');
                quantityElement.textContent = cartItem.quantity;
            }
        } else if (e.target.id === 'minus') {
            cartItem.quantity--;
            if(cartItem.quantity <= 0) {
                cartItems.filter(item => item !== cartItem);
                cartElement.remove();
            }
            if (cartElement) {
                const quantityElement = cartElement.querySelector('.quantity');
                quantityElement.textContent = cartItem.quantity;
            }
        } else if(e.target.id === 'cartRemove') {
            cartItems = cartItems.filter(item => item !== cartItem);
            if (cartElement) {
                cartElement.remove();
            }
        }

    }
    calculateSumm();
}

function calculateSumm(){
    const cartSummary = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    summ.textContent = cartSummary.toFixed(2) + ' KR.';
}

calculateSumm();