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

// test comment
const products = [
  {
    name: "Classic Black Tee",
    color: "Black",
    gender: "Women",
    image: "../images/tshirt1.png",
    detailsPage: "ClassicBlackTee.html",
    description:
      "A timeless black tee that pairs well with any outfit. Made from soft, breathable cotton for all-day comfort.",
  },
  {
    name: "Flamin' Hot Red Tee",
    color: "Red",
    gender: "Women",
    image: "../images/tshirt2.png",
    detailsPage: "FlaminHotRedTee.html",
    description:
      "Turn up the heat with our Flamin' Hot Red Tee! This vibrant red shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a bold pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.",
  },
  {
    name: "Ocean Blue Tee",
    color: "Blue",
    gender: "Women",
    image: "../images/tshirt3.png",
    detailsPage: "OceanBlueTee.html",
    description:
      "Dive into style with our Ocean Blue Tee! This vibrant blue shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a refreshing pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.",
  },
  {
    name: "Striped White Sailor Tee",
    color: "White",
    gender: "Men",
    image: "../images/tshirt4.png",
    detailsPage: "StripedWhiteSailorTee.html",
    description:
      "Sail into style with our Striped White Sailor Tee! This classic striped shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a nautical touch to your wardrobe, it's a must-have for anyone who loves timeless fashion with a modern twist.",
  },
  {
    name: "Tinky Winky Purple Tee",
    color: "Purple",
    gender: "Men",
    image: "../images/tshirt5.png",
    detailsPage: "TinkyWinkyPurpleTee.html",
    description:
      "Embrace your inner Tinky Winky with our Tinky Winky Purple Tee! This vibrant purple shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a playful pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.",
  },
  {
    name: "Sunny Yellow Tee",
    color: "Yellow",
    gender: "Women",
    image: "../images/tshirt6.png",
    detailsPage: "SunnyYellowTee.html",
    description:
      "Brighten up your day with our Sunny Yellow Tee! This vibrant yellow shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a cheerful pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.",
  },
  {
    name: "Capri-Sun Orange Tee",
    color: "Orange",
    gender: "Men",
    image: "../images/tshirt7.png",
    detailsPage: "CapriSunOrangeTee.html",
    description:
      "Dive into summer vibes with our Capri-Sun Orange Tee! This vibrant orange shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a sunny pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.",
  },
  {
    name: "Trendy Teal Tee",
    color: "Blue",
    gender: "Men",
    image: "../images/tshirt8.png",
    detailsPage: "TrendyTealTee.html",
    description:
      "Make a splash with our Trendy Teal Tee! This vibrant teal shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a cool pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.",
  },
  {
    name: "Earth Green Tee",
    color: "Green",
    gender: "Women",
    image: "../images/tshirt9.png",
    detailsPage: "EarthGreenTee.html",
    description:
      "Embrace nature with our Earth Green Tee! This vibrant green shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a natural pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.",
  },
  {
    name: "Army Green Tee",
    color: "Green",
    gender: "Men",
    image: "../images/tshirt10.png",
    detailsPage: "ArmyGreenTee.html",
    description:
      "Go for a rugged look with our Army Green Tee! This versatile green shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a military-inspired touch to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.",
  },
  {
    name: "Washed Black Tee",
    color: "Black",
    gender: "Men",
    image: "../images/tshirt11.png",
    detailsPage: "WashedBlackTee.html",
    description:
      "Add a vintage vibe to your wardrobe with our Washed Black Tee! This faded black shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a worn-in pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.",
  },
  {
    name: "Off-White Tee",
    color: "White",
    gender: "Women",
    image: "../images/tshirt12.png",
    detailsPage: "OffWhiteTee.html",
    description:
      "Keep it classic with our Off-White Tee! This versatile off-white shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a neutral pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.",
  },
  {
    name: "Washed Red Tee",
    color: "Red",
    gender: "Men",
    image: "../images/tshirt13.png",
    detailsPage: "WashedRedTee.html",
    description:
      "Add a vintage vibe to your wardrobe with our Washed Red Tee! This faded red shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a worn-in pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.",
  },
  {
    name: "Turquoise Tee",
    color: "Blue",
    gender: "Women",
    image: "../images/tshirt14.png",
    detailsPage: "TurquoiseTee.html",
    description:
      "Make a splash with our Turquoise Tee! This vibrant turquoise shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a cool pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.",
  },
  {
    name: "Spicy Purple Tee",
    color: "Purple",
    gender: "Women",
    image: "../images/tshirt15.png",
    detailsPage: "SpicyPurpleTee.html",
    description:
      "Turn up the heat with our Spicy Purple Tee! This vibrant purple shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a bold pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.",
  },
];

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
      (p) => `
    <div class="col-12 col-md-4 mb-3">
      <div class="card h-100">
        <img class="card-img-top" src="${p.image}" alt="${p.name}" />
        <div class="card-body"><h5 class="card-title">${p.name}</h5></div>
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

renderProducts();
