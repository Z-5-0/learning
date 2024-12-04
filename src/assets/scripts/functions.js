console.log('---------------- FUNCTIONS ----------------');

function susdMegARantottat() {
    console.log('Önts olajat a serpenyőbe');
    console.log('Adj hozzá 3 tojást');
    console.log('Adj hozzá fűszereket');
    console.log('Süsd meg');
    console.log('Kész');
}

function adjHozzaFuszereket() {
    console.log('Adj hozzá sót');
    console.log('Adj hozzá borsot');
    console.log('Adj hozzá paprikát');
}

console.log('------------------');
susdMegARantottat();
console.log('susdMegARantottat függvény lefutott');
console.log('------------------');

function addOne(szam) {
    // console.log(szam);
    return szam + 1;
}

addOne(5);
console.log(addOne(5));
console.log('------------------');
console.log(addOne(addOne(addOne(3))));
console.log('------------------');

function addTwo(szam){
    return {
        0: 2,
        1: 3,
        2: 4,
    }[szam];
}

console.log(addTwo(addTwo(0)));
console.log('------------------');


var addThree = function(szam) {
    return szam + 3;
}

console.log('------------------');