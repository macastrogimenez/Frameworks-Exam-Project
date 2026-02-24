function tShirt(id, gender, color, price, pictureFileName, description) {
    this.id = id;
    this.gender = gender; // male or female
    this.color = color;
    this.price = price;
    this.pictureFileName = pictureFileName;
    this.description = description;
}

// Array of t-shirt products
const tShirts = [
    new tShirt(1, "male", "black", 19.99, "tshirt-black-male.jpg", "Classic black cotton t-shirt with crew neck"),
    new tShirt(2, "male", "white", 19.99, "tshirt-white-male.jpg", "Essential white t-shirt in premium cotton"),
    new tShirt(3, "male", "navy", 22.99, "tshirt-navy-male.jpg", "Navy blue t-shirt with modern fit"),
    new tShirt(4, "male", "grey", 21.99, "tshirt-grey-male.jpg", "Heather grey comfortable everyday tee"),
    new tShirt(5, "male", "red", 24.99, "tshirt-red-male.jpg", "Bold red t-shirt for standout style"),
    new tShirt(6, "male", "black", 23.99, "tshirt-black-male-2.jpg", "Premium black t-shirt with V-neck design"),
    new tShirt(7, "male", "blue", 22.99, "tshirt-blue-male.jpg", "Sky blue relaxed fit t-shirt"),
    new tShirt(8, "male", "white", 24.99, "tshirt-white-male-2.jpg", "Organic white cotton athletic tee"),
    new tShirt(9, "male", "grey", 25.99, "tshirt-grey-male-2.jpg", "Charcoal grey premium blend tee"),
    new tShirt(10, "male", "navy", 23.99, "tshirt-navy-male-2.jpg", "Navy blue long sleeve t-shirt"),
    new tShirt(11, "female", "black", 19.99, "tshirt-black-female.jpg", "Classic black fitted t-shirt"),
    new tShirt(12, "female", "white", 19.99, "tshirt-white-female.jpg", "Clean white essential tee"),
    new tShirt(13, "female", "pink", 24.99, "tshirt-pink-female.jpg", "Soft pink v-neck t-shirt"),
    new tShirt(14, "female", "black", 25.99, "tshirt-black-female-2.jpg", "Black scoop neck premium tee"),
    new tShirt(15, "female", "grey", 23.99, "tshirt-grey-female.jpg", "Light grey minimalist tee"),
    new tShirt(16, "female", "pink", 24.99, "tshirt-pink-female-2.jpg", "Rose pink crop style t-shirt"),
    new tShirt(17, "female", "white", 21.99, "tshirt-white-female-2.jpg", "White oversized comfort tee"),
    new tShirt(18, "female", "navy", 22.99, "tshirt-navy-female.jpg", "Navy blue versatile t-shirt"),
    new tShirt(19, "female", "grey", 26.99, "tshirt-grey-female-2.jpg", "Heather grey fitted athletic tee"),
    new tShirt(20, "female", "blue", 25.99, "tshirt-blue-female.jpg", "Sky blue casual everyday t-shirt")
];

