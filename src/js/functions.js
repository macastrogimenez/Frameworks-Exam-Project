// In the array basketProducts which is saved in localStorage
// the index will be the item id, and the value at each position the qty 

// main function     
function addToBasket(productId){
    let basketInStorage = localStorage.getItem('basketProducts');
    const numberOfItems = products.length;

    // Initialize basket if it doesn't exist
    if(basketInStorage === null){
        basketProducts = new Array(numberOfItems).fill(0);
        saveBasketToLS(basketProducts);
        basketInStorage = localStorage.getItem('basketProducts'); // Get it back as string
    }
    
    // Convert string from localStorage to array
    let basket = basketFromLStoArray(basketInStorage);
    increaseProductCounter(productId, basket);
    popUp();
}

// helper function - saves array to localStorage as comma-separated string
function saveBasketToLS(basketArray){
    localStorage.setItem('basketProducts', basketArray.join(','));
}

// helper function - converts localStorage string to array of numbers
function basketFromLStoArray(basketString){
    return basketString.split(',').map(item => Number(item));
}

// helper function - increases quantity for a product
function increaseProductCounter(productId, basket){
    /*
        if the button add to basket is clicked, 
            then increase the value of the index productId + 1 
                Make sure it is a Number
    */
    basket[productId] = basket[productId] + 1;
    saveBasketToLS(basket);
    
    //console.log('Product ' + productId + ' quantity: ' + basket[productId]);
}

//TODO [KAN-20]: discuss popUp 
function popUp(){
    const popup = document.createElement("div");
    popup.className = "popup";

    popup.innerHTML = `
        <p>Straight into your basket!</p>
        <div class="checkmark">✓</div>
    `;

    document.body.appendChild(popup);

    // Trigger animation
    setTimeout(() => popup.classList.add("show"), 10);

    // Hide after 2 seconds
    setTimeout(() => {
        popup.classList.remove("show");
        setTimeout(() => popup.remove(), 350);
    }, 1000);
}



/*
    Used in the Basket page, for now it only removes the array from localStorage
*/

function placeOrder(){
    localStorage.removeItem('basketProducts');
}