
registeredName = localStorage.getItem('registeredName');
if(registeredName !== null){
  document.getElementById('title').innerHTML = `${registeredName}, your basket looks cool!`;
} 

const basket = document.getElementById("basket");
basket.innerHTML += `
  <table class="table">
    <thead class="table-light">
      <tr>
        <th scope="col">Product Id<th/>
        <th scope="col">Product Name<th/>
        <th scope="col">Price Per Unit<th/>
        <th scope="col">Quantity<th/>
        <th scope="col">Total Price<th/>
      </tr>
    </thead>
    <tbody id="basketBody">
    </tbody>
  </table>
  `;

const basketBody = document.getElementById("basketBody");  // body of the table 
const basketArray = basketFromLStoArray(localStorage.getItem('basketProducts')); // retrieving basket array from memory
let total = 0;
// accumulator variable that is increased as the table is generated, used to provide total price of basket

for(let i = 0; i < basketArray.length; i++){
  if(basketArray[i]!==0){ // if the qty in the basketArray is 0, skip the product, else retrieve it and add it to table
    let prod = products[i]; 
    total = Number(total + (basketArray[i]*prod.price)); // increasing the total price of the basket
    basketBody.innerHTML += `
      <tr>
        <td>#${i}<td/>
        <td>${prod.name}<td/>
        <td>${prod.price} EUR<td/>
        <td>${basketArray[i]}<td/>
        <td>${(basketArray[i]*prod.price).toFixed(2)} EUR<td/>
      </tr>
    `
  }
};

basketBody.innerHTML += `
      <tr class="table-group-divider">
        <td><td/>
        <td><td/>
        <td><td/>
        <td><td/>
        <td><b>${total.toFixed(2)} EUR<b/><td/>
      </tr>
    `








