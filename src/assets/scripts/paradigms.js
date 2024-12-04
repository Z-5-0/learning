console.log('---------------- PARADIGMS ----------------');

var product = {
    name: 'Fűnyíró',
    price: 45000,
    isInStock: true,
}

product.price *= 0.9;

var message = `A termék neve: ${product.name}, ára: ${product.price} és ${product.isInStock ? 'elérhető' : 'nem elérhető'}`

console.log(message);

// --------------------------------

function withDiscount(product, discount) {
    return {
        name: product.name,
        price: product.price * discount,
        isInStock: product.isInStock,
    }
}

function toMessage(product) {
    return `A termék neve: ${product.name}, ára: ${product.price} és ${product.isInStock ? 'elérhető' : 'nem elérhető'}`
}

console.log(toMessage(withDiscount(product, 0.9)));

// --------------------------------

var Product = {
    name: 'Fűnyíró',
    price: 45000,
    isInStock: true,
    applyDiscount: function (discount) { // function (discount) {}
        this.price = this.price * discount;
    },
    getMessage: function () {// function () {}
        return `A termék neve: ${this.name}, ára: ${this.price} és ${this.isInStock ? 'elérhető' : 'nem elérhető'}`
    }
}
Product.applyDiscount(0.8)
console.log('getMessage: ', Product.getMessage());
