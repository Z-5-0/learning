console.log('---------------- OBJECT BLUEPRINT ----------------');

// Constructor function

function Termek(name, price, isInStock) {
    this.name = name;
    this.price = price;
    this.isInStock = isInStock;
}

console.log(new Termek('kolbasz', 1000, true));

Termek.prototype.applyDiscount = function (discount) {
    this.price = this.price * discount;
}

Termek.prototype.getMessage = function () {
    return `A termék neve: ${this.name}, ára: ${this.price} és ${this.isInStock ? 'elérhető' : 'nem elérhető'}`
}

var termekek = [
    new Termek('kolbasz', 1000, true),
    new Termek('kenyér', 800, true),
    new Termek('hagyma', 300, true),
]

for (var product of termekek) {
    console.log(product.getMessage());
}

// Class declaration

class Termek_ {
    quantity = 1;

    constructor(name, price, isInStock) {
        this.name = name;
        this.price = price;
        this.isInStock = isInStock;
    }

    applyDiscount(discount) {
        this.price = this.price * discount;
    }

    getMessage() {
        return `A termék neve: ${this.name}, ára: ${this.price} és ${this.isInStock ? 'elérhető' : 'nem elérhető'}`
    }
}

const paprika = new Termek_('paprika', 600, false);
paprika.quantity = 3;
console.log(paprika);

paprika.applyDiscount(0.8);
console.log('Paaprika aktuálisan: ', paprika.getMessage());
