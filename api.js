const element = document.querySelector(".pagination ul");
const productList = document.querySelector('.product-list');
const allProducts = 461;
const limit = 24;
let totalPages = Math.ceil(allProducts / limit);
let page = 1;
let productsFromApi;

element.innerHTML = createPagination(totalPages, page);
function createPagination(totalPages, page){
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;

  getData(page);
  window.scrollTo(0, 0);

  if(page > 1){
    liTag += `<li class="hidden" onclick="createPagination(totalPages, ${page - 1})"><span>Prev</span></li>`;
  }
  if(page > 2){
    liTag += `<li class="w-[40px] h-[40px] border-[1px] text-center text-lg pt-[5px] mr-[10px] border-black rounded-full hover:bg-black hover:text-white cursor-pointer" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
    if(page > 3){
      liTag += `<li class="w-[40px] h-[40px] border-[1px] text-center text-lg pt-[5px] mr-[10px] border-black rounded-full"><span>...</span></li>`;
    }
  }

  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }

  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage  = afterPage + 1;
  }
  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) { 
      continue;
    }
    if (plength == 0) {
      plength = plength + 1;
    }
    if(page == plength){
      active = "active";
    }else{ 
      active = "";
    }
    liTag += `<li class="w-[40px] h-[40px] border-[1px] text-center text-lg pt-[5px] mr-[10px] border-black rounded-full hover:bg-black hover:text-white cursor-pointer ${active && 'text-white bg-black'}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
  }
  if(page < totalPages - 1){
    if(page < totalPages - 2){
      liTag += `<li class="w-[40px] h-[40px] border-[1px] text-center text-lg pt-[5px] mr-[10px] border-black rounded-full"><span>...</span></li>`;
    }
    liTag += `<li class="w-[40px] h-[40px] border-[1px] text-center text-lg pt-[5px] mr-[10px] border-black rounded-full hover:bg-black hover:text-white cursor-pointer" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }
  if (page < totalPages) {
    liTag += `<li class="hidden" onclick="createPagination(totalPages, ${page + 1})"><span>Next</span></li>`;
  }
  element.innerHTML = liTag;
  return liTag;
}

function getData(curPage){
    fetch(`https://voodoo-sandbox.myshopify.com/products.json?page=${curPage}&limit=${limit}`)
    .then(res => res.json())
    .then(data => {
        productsFromApi = data.products;
        createProductElements();
    })
    .catch(error => {
        console.log(error);
        const errorTitle = document.createElement('h1');
        errorTitle.textContent = 'Cant fetch data, please refresh the page or try later';
        productList.appendChild(errorTitle);
        pagination.style.display = 'none';
    })
}

const createProductElements = () => {
    productList.innerHTML = '';
    productsFromApi.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'card w-[300px]';
    
        productElement.innerHTML = `
            <div class="relative w-full h-[300px] border-2 border-black rounded flex justify-center mb-[12px]" alt="product">
                <span class="absolute top-[12px] left-[12px] p-[8px] bg-black text-white text-[12px] uppercase rounded">Used</span>
                <img src='${product.images[0] ? product.images[0].src : 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'}'/>
            </div>
    
            <div class="flex justify-between mb-[12px] text-sm">
            <div>
                <h3 class="font-bold">${product.title.length > 25 ? product.title.slice(0, 25) + '...' : product.title}</h3>
                <p class="font-bold">${product.variants[0].price + ' KR.'}</p>
            </div>
            <div>
                <p class="font-medium text-right">Condition</p>
                <p class="text-right">Slightly used</p>
            </div>
            </div>
    
            <button id="addToCart" data-product-id='${product.id}' class="add w-full py-[16px] bg-black font-bold text-white text-center rounded uppercase transition-colors hover:bg-transparent hover:text-black border border-black">Add to cart</button>
        `;
      productList.appendChild(productElement);
    })
}