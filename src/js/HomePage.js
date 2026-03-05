const newArrivalProducts = products.filter(product => product.newArrival === true).slice(0, 3);
const newArrivalsContainer = document.getElementById('newArrivalsContainer');

newArrivalProducts.forEach(product => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
        <a href="ProductDetail.html?id=${product.id}" class="text-decoration-none text-dark">
            <div class="card mb-4 h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 250px; object-fit: contain; background-color: #f8f9fa;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title mb-0">${product.name}</h5>
                    <div class="mt-auto">
                        <span class="text-muted fw-bold">€ ${product.price.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </a>
    `;
    newArrivalsContainer.appendChild(col);
});


const discountedProducts = products.filter(product => product.discount > 0).slice(0, 3);
const discountsContainer = document.getElementById('discountsContainer');

discountedProducts.forEach(product => {
    const discountedPrice = (product.price * (1 - product.discount)).toFixed(2);
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
        <a href="ProductDetail.html?id=${product.id}" class="text-decoration-none text-dark">
            <div class="card mb-4 h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 250px; object-fit: contain; background-color: #f8f9fa;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title mb-0">${product.name}</h5>
                    <div class="mt-auto">
                        <div class="d-flex align-items-center">
                            <span class="text-decoration-line-through me-2">€ ${product.price.toFixed(2)}</span>
                            <span class="text-dark fw-bold">€ ${discountedPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    `;
    discountsContainer.appendChild(col);
});
