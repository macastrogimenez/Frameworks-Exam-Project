// In the array basketProducts which is saved in localStorage
// the index will be the item id, and the value at each position the qty

function addToBasket(productId) {
  let basketInStorage = localStorage.getItem("basketProducts");
  const numberOfItems = products.length;

  // Initialize basket if it doesn't exist
  if (basketInStorage === null) {
    const basketProducts = new Array(numberOfItems).fill(0);
    saveBasketToLS(basketProducts);
    basketInStorage = localStorage.getItem("basketProducts");
  }

  // Convert string from localStorage to array
  const basket = basketFromLStoArray(basketInStorage);
  increaseProductCounter(productId, basket);
  showToast();
}

// helper function - saves array to localStorage as comma-separated string
function saveBasketToLS(basketArray) {
  localStorage.setItem("basketProducts", basketArray.join(","));
}

// helper function - converts localStorage string to array of numbers
function basketFromLStoArray(basketString) {
  if (!basketString) return [];
  return basketString.split(",").map((item) => Number(item));
}

// helper function - increases quantity for a product
function increaseProductCounter(productId, basket) {
  basket[productId] = basket[productId] + 1;
  saveBasketToLS(basket);
}

// function called by the 'Place an order' button -> it simply clears basketProducts from localStorage
function placeOrder() {
  localStorage.removeItem("basketProducts");
}

// called by the removeButton next to every ite-> it retrieves basketProducts from localStorage, then reduces the number of products
    // of a specific product id by one, saves basketProducts to localStorage once more and reloads the page.
function removeFromBasket(prodId){
  let basketArray = basketFromLStoArray(localStorage.getItem("basketProducts"));
  basketArray[prodId] = basketArray[prodId] - 1;
  saveBasketToLS(basketArray);
  document.location.reload();
}

// It creates the table of products in the basket by retrieving the basketProducts array from localStorage
  // then it iterates over every index and if the count > 0 it adds the product to the table with id, name,
  // price per unit, quantity, total price and the possibility to remove an item. 
  // Lastly, it calculates the total price of the basket
function renderBasketPage() {
  const basket = document.getElementById("basket");
  if (!basket || typeof products === "undefined") return;

  const registeredName = localStorage.getItem("registeredName");
  if (registeredName !== null) {
    document.getElementById("title").innerHTML =
      `${registeredName}, your basket looks cool!`;
  }

  basket.innerHTML += `
    <table class="table">
      <thead class="table-light">
        <tr>
          <th scope="col">Product Id<th/>
          <th scope="col">Product Name<th/>
          <th scope="col">Price Per Unit<th/>
          <th scope="col">Quantity<th/>
          <th scope="col">Total Price<th/>
          <th scope="col">Remove an item<th/>
        </tr>
      </thead>
      <tbody id="basketBody">
      </tbody>
    </table>
  `;

  const basketBody = document.getElementById("basketBody");
  const basketArray = basketFromLStoArray(
    localStorage.getItem("basketProducts"),
  );
  let total = 0;

  for (let i = 0; i < basketArray.length; i++) {
    if (basketArray[i] !== 0) {
      const prod = products[i];
      total = Number(total + basketArray[i] * prod.price);
      basketBody.innerHTML += `
        <tr>
          <td>#${i}<td/>
          <td>${prod.name}<td/>
          <td>${prod.price} EUR<td/>
          <td>${basketArray[i]}<td/>
          <td>${(basketArray[i] * prod.price).toFixed(2)} EUR<td/>
          <td><button id="removeButton" class="btn btn-dark" onclick="removeFromBasket(${i})">-</button></td>
        </tr>
    `;
    }
  }

  basketBody.innerHTML += `
      <tr class="table-group-divider">
        <td><td/>
        <td><td/>
        <td><td/>
        <td><td/>
        <td><b>${total.toFixed(2)} EUR<b/><td/>
      </tr>
    `;
}

renderBasketPage();
