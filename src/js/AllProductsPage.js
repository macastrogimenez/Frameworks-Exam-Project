// if there is a registered name in local storage, display a personalized message to the user
var registeredName = localStorage.getItem("registeredName");
if (registeredName) {
  document.getElementById("message-for-user").textContent =
    "See something you like, " + registeredName + "?";
}

// Bootstrap Dropdown menu to filter gender and color. Fetch the "filterDropdowns" section from the html first
// each dropdown item has been given a data attribute, (e.g. "data-color="Red"), to identify if selected
const filterDropdowns = document.getElementById("filterDropdowns");
filterDropdowns.innerHTML += `
    <div class="dropdown">
      <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Color
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" data-color="Red" href="#">Red</a>
        <a class="dropdown-item" data-color="Orange" href="#">Orange</a>
        <a class="dropdown-item" data-color="Yellow" href="#">Yellow</a>
        <a class="dropdown-item" data-color="Green" href="#">Green</a>
        <a class="dropdown-item" data-color="Blue" href="#">Blue</a>
        <a class="dropdown-item" data-color="Purple" href="#">Purple</a>
        <a class="dropdown-item" data-color="Black" href="#">Black</a>
        <a class="dropdown-item" data-color="White" href="#">White</a>
        <a class="dropdown-item" data-color="All" href="#">All</a>
      </div>
    </div>
    
      <div class="dropdown">
      <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Gender
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" data-gender="Men" href="#">Men</a>
        <a class="dropdown-item" data-gender="Women" href="#">Women</a>
        <a class="dropdown-item" data-gender="All" href="#">All</a>
      </div>
    </div>
  `;

// TODO: discuss changes -> products array exported to common JS file

// fetch the productsRow div to insert the created cards from the array into the HTML
const productsRow = document.getElementById("productsRow");

// Sorting logic starts here
let selectedColor = "All";
let selectedGender = "All";

function renderProducts() {
  // Go through every item in the products array .
  // Catch user's selected product color and gender
  const filteredProducts = products.filter((p) => {
    const colorFilter = selectedColor === "All" || p.color === selectedColor;
    const genderFilter =
      selectedGender === "All" || p.gender === selectedGender;
    return colorFilter && genderFilter;
  });
  // Turn the filtered items into cards and place them in productsRow div
  // map() creates one card string for each filtered product
  // join() combines all the card strings into a single string (because innerHTML needs a single string))

  // col-12 col-md-4 mb-3 --> Bootstrap Grid class that creates a horizontal row with 3 cards
  // card -->Bootstrap class that styles the card container/content/image.
  productsRow.innerHTML = filteredProducts
    .map(
      (product) => `
    <div class="col-12 col-md-4 mb-3">
      <div class="card h-100">
      <a href="ProductDetail.html?id=${product.id}"> 
        <img class="card-img-top" src="${product.image}" alt="${product.name}" />
        </a>
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p align=left>${product.price} EUR</p>
          <button id="basketButton" class="btn btn-dark" onclick="addToBasket(${product.id})" >Add to basket</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

// Listens for clicks inside the dropdown menus
// click is a buil-in event type that listens to click event on filterDropdowns.
filterDropdowns.addEventListener("click", (e) => {
  const color = e.target.dataset.color; // what the user picks
  const gender = e.target.dataset.gender;

  if (color) selectedColor = color; //saves it in selectedColor
  if (gender) selectedGender = gender;

  // re-render cards immediately after filter state changes
  renderProducts();
});
// TODO: discuss changes in line 48 and 53

renderProducts();
