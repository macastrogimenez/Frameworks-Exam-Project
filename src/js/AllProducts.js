// if there is a registered name in local storage, display a personalized message to the user
var registeredName = localStorage.getItem("registeredName");
if (registeredName) {
  document.getElementById("message-for-user").textContent =
    "See something you like, " + registeredName + "?";
}

// Bootstrap Dropdown menu to filter gender and color. Fetch the "categories" section from the html first
const categories = document.getElementById("categories");
categories.innerHTML += `
    <div class="dropdown">
      <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Color
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">Red</a>
        <a class="dropdown-item" href="#">Orange</a>
        <a class="dropdown-item" href="#">Yellow</a>
        <a class="dropdown-item" href="#">Green</a>
        <a class="dropdown-item" href="#">Blue</a>
        <a class="dropdown-item" href="#">Purple</a>
        <a class="dropdown-item" href="#">Black</a>
        <a class="dropdown-item" href="#">White</a>
      </div>
    </div>
    
      <div class="dropdown">
      <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Gender
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">Men</a>
        <a class="dropdown-item" href="#">Women</a>
      </div>
    </div>
  `;

// TODO: discuss changes -> products array exported to common JS file

// fetch the productsRow div to insert the created cards from the array into the HTML
const productsRow = document.getElementById("productsRow");
products.forEach((product) => {
  // col-12 col-md-4 mb-3 --> Bootstrap Grid class that creates a horizontal row with 3 cards
  // card -->Bootstrap class that styles the card container/content/image.
  productsRow.innerHTML += `
    <div class="col-12 col-md-4 mb-3">
      <div class="card h-100">
      <a href="ProductDetail.html?id=${product.id}"> 
        <img class="card-img-top" src="${product.image}" alt="${product.name}" />
        </a>
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p align=left>${product.price} EUR</p>
          <button class="btn btn-dark" onclick="addToBasket(${product.id})" >Add to basket</button>
        </div>
      </div>
    </div>
  `;
});
// TODO: discuss changes in line 48 and 53
