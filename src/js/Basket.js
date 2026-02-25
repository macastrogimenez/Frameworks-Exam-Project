
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

const basketBody = document.getElementById("basketBody");  

const basketArray = basketFromLStoArray(localStorage.getItem('basketProducts'));

let total = 0;

for(let i = 0; i < basketArray.length; i++){
  if(basketArray[i]!==0){
    let prod = products[i];
    total = Number(total + (basketArray[i]*prod.price));
    basketBody.innerHTML += `
      <tr>
        <td>${i}<td/>
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


function placeOrder(){
  localStorage.clear();
}





