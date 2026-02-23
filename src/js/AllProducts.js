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

const products = [
  {
    name: "Classic Black Tee",
    color: "Black",
    color: "Women",
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
    gender: "Men",
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
products.forEach((product) => {
  // col-12 col-md-4 mb-3 --> Bootstrap Grid class that creates a horizontal row with 3 cards
  // card -->Bootstrap class that styles the card container/content/image.
  productsRow.innerHTML += `
    <div class="col-12 col-md-4 mb-3">
      <div class="card h-100">
      <a href="${product.detailsPage}">
        <img class="card-img-top" src="${product.image}" alt="${product.name}" />
        </a>
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <button class="btn btn-dark">Add to cart</button>
        </div>
      </div>
    </div>
  `;
});
