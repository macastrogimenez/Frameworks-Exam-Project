const params = new URLSearchParams(window.location.search);
const productId = Number(params.get('id'));

const product = products.find(tShirt => tShirt.id === productId);

document.title = `Product Detail: ${product.name}`;

document.getElementById('title').innerHTML = `${product.name}`;

document.getElementById('ProductInfo').innerHTML += 

`<div class="card mb-3" style="max-width: 60%;">
    <img src="${product.image}" class="card-img-top" >
    <div class="card-body">
        <h5 class="card-title">${product.price} EUR</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text" id="gender">${product.gender}</p>
        <p class="card-text"><small class="text-body-secondary">Product Id: #${product.id}</small></p>
    </div>
    <div class="dropdown">
    <button id=sizeButton class="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Size
    </button>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">XS</a></li>
        <li><a class="dropdown-item" href="#">S</a></li>
        <li><a class="dropdown-item" href="#">M</a></li>
        <li><a class="dropdown-item" href="#">L</a></li>
        <li><a class="dropdown-item" href="#">XL</a></li>
    </ul>
</div>
</div>
`;




