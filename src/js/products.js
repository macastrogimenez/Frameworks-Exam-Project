function tShirt(name, color, gender, image, description, price, id) {
    this.name = name;
    this.color = color;
    this.gender = gender; // male or female
    this.image = image;
    this.description = description;
    this.price = price;
    this.id = id;
}

// replaced the object for a constructor to avoid errors with fields and reduce verbosity
// there was an error in the first object due to this exact reason, also, no prices were set, which makes no sense, probably simply overlooked
// added an id to generate the ProductDetail page off a single html document, but reading different ids

const products = [
    new tShirt("Classic Black Tee", "Black", "Women", "../images/tshirt1.png", "A timeless black tee that pairs well with any outfit. Made from soft, breathable cotton for all-day comfort.", 24.99, 0),
    new tShirt("Flamin' Hot Red Tee", "Red", "Women", "../images/tshirt2.png", "Turn up the heat with our Flamin' Hot Red Tee! This vibrant red shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a bold pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.", 26.99, 1),
    new tShirt("Ocean Blue Tee", "Blue", "Women", "../images/tshirt3.png", "Dive into style with our Ocean Blue Tee! This vibrant blue shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a refreshing pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.", 22.99, 2),
    new tShirt("Striped White Sailor Tee", "White", "Men", "../images/tshirt4.png", "Sail into style with our Striped White Sailor Tee! This classic striped shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a nautical touch to your wardrobe, it's a must-have for anyone who loves timeless fashion with a modern twist.", 28.99, 3),
    new tShirt("Tinky Winky Purple Tee", "Purple", "Men", "../images/tshirt5.png", "Embrace your inner Tinky Winky with our Tinky Winky Purple Tee! This vibrant purple shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a playful pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.", 24.99, 4),
    new tShirt("Sunny Yellow Tee", "Yellow", "Women", "../images/tshirt6.png", "Brighten up your day with our Sunny Yellow Tee! This vibrant yellow shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a cheerful pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.", 22.99, 5),
    new tShirt("Capri-Sun Orange Tee", "Orange", "Men", "../images/tshirt7.png", "Dive into summer vibes with our Capri-Sun Orange Tee! This vibrant orange shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a sunny pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.", 26.99, 6),
    new tShirt("Trendy Teal Tee", "Blue", "Men", "../images/tshirt8.png", "Make a splash with our Trendy Teal Tee! This vibrant teal shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a cool pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.", 29.99, 7),
    new tShirt("Earth Green Tee", "Green", "Women", "../images/tshirt9.png", "Embrace nature with our Earth Green Tee! This vibrant green shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a natural pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.", 24.99, 8),
    new tShirt("Army Green Tee", "Green", "Men", "../images/tshirt10.png", "Go for a rugged look with our Army Green Tee! This versatile green shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a military-inspired touch to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.", 22.99, 9),
    new tShirt("Washed Black Tee", "Black", "Men", "../images/tshirt11.png", "Add a vintage vibe to your wardrobe with our Washed Black Tee! This faded black shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a worn-in pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.", 28.99, 10),
    new tShirt("Off-White Tee", "White", "Men", "../images/tshirt12.png", "Keep it classic with our Off-White Tee! This versatile off-white shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a neutral pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.", 20.00, 11),
    new tShirt("Washed Red Tee", "Red", "Men", "../images/tshirt13.png", "Add a vintage vibe to your wardrobe with our Washed Red Tee! This faded red shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a worn-in pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.", 26.99, 12),
    new tShirt("Turquoise Tee", "Blue", "Women", "../images/tshirt14.png", "Make a splash with our Turquoise Tee! This vibrant turquoise shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a cool pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.", 29.99, 13),
    new tShirt("Spicy Purple Tee", "Purple", "Women", "../images/tshirt15.png", "Turn up the heat with our Spicy Purple Tee! This vibrant purple shirt is made from soft, breathable cotton for all-day comfort. Perfect for adding a bold pop of color to your wardrobe, it's a must-have for anyone who loves to make a statement with their style.", 28.99, 14),
];

