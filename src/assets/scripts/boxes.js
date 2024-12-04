console.log('---------------- BOXES 1 ----------------');

/*
1. doboz:
Kattintásra adjunk hozzá egy "blur" nevű class attribútumot, majd újabb kattintásra vegyük
le róla azt.
*/

console.log(document.getElementById('element-one'));
console.dir(document.getElementById('element-one'));

var isBlured = false;

document.getElementById('element-one').onclick = function () {
    isBlured = !isBlured;

    /* if (isBlured) {
        document.getElementById('element-one').classList.add('blur');
    } else {
        document.getElementById('element-one').classList.remove('blur');
    } */

    isBlured ? document.getElementById('element-one').classList.add('blur') : document.getElementById('element-one').classList.remove('blur');
}

/*
2. doboz:
Ha az egérrel fölé megyünk változzon meg a háttérszíne pirosra, ha levesszük róla az egeret
változzon vissza az eredeti színére.
*/

var isHovered = false;
var elementTwo = document.getElementById('element-two');

elementTwo.onmouseover = function () {
    isHovered = true;
    renderSecondBox();
}

elementTwo.onmouseout = function () {
    isHovered = false;
    renderSecondBox();
}

function renderSecondBox() {
    isHovered ? (elementTwo.style.backgroundColor = 'red') : (elementTwo.style.backgroundColor = '');
}

/*
3. doboz:
Dupla kattintással sorsoljon egy számot 1 és 20 között és módosítsa a kapott számmal a doboz tartalmát. 
*/

var elementThree = document.getElementById('element-three');

elementThree.ondblclick = function () {
    // document.getElementById('element-three').firstElementChild.innerHTML = randomNumberGenerator(1, 20);
    elementThree.innerHTML = '<span class="text">' + randomNumberGenerator(1, 20); + '</span>'
}

function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/*
4. doboz:
Kattintásra tűnjön el, majd egy 1 másodperces várakozás után ismét jelenjen meg.
*/

var elementFour = document.getElementById('element-four');

elementFour.onclick = function () {
    // elementFour.classList.add('hidden') ;
    elementFour.style.visibility = 'hidden';
    elementFourIsVisibleAgain();
}

function elementFourIsVisibleAgain() {
    setTimeout(() => {
        // elementFour.classList.remove('hidden');
        elementFour.style.visibility = 'visible';
    }, 1000);
}

/*
5. doboz:
Kattintásra alakítsa kör alakúra az összes dobozt.
*/

var elementFive = document.getElementById('element-five');
var containerChildren = document.querySelector('.container').children;
var allElements = document.querySelectorAll('.shape');
var elements = document.getElementsByClassName('shape');

var rounded = false;

elementFive.onclick = function () {
    console.log('containerChildren HTMLCollection: ', containerChildren);
    /* Array.from(elements).forEach(function (element) {
        console.log('element',  element);
        element.classList.add('box5style');
    }); */

    rounded = !rounded;

    allElements.forEach(function (element) {
        console.log('NodeList element: ', element);
        // element.style.borderRadius = '50%'; // Classal célszerűbb
        rounded ? element.classList.add('box5style') : element.classList.remove('box5style');
    });

    /* for (var element of allElements) { // Szintén forEach()
        element.classList.add('box5style');
    } */
}

/*
6. doboz:
Form submit eseményre módosítsuk a doboz tartalmát az input mezőbe írt értékkel
*/

var elementSixFormItem = document.getElementById('box-6');

elementSixFormItem.onsubmit = function (event) {
    event.preventDefault();
    console.log('Element 6 event: ', event);
    console.log('Element 6 event / target: ', event.target);
    console.log('Element 6 event / target / elements: ', event.target.elements);
    console.log('Element 6 event / target / elements[0]: ', event.target.elements[0]);
    console.log('Element 6 event / target / elements[0] / value: ', event.target.elements[0].value);
    console.log('Element 6 event / target / boxName / value: ', event.target.elements.boxNumber.value);

    elementSixFormItemInputValue = event.target.elements.boxNumber.value;

    console.log('elementSixFormItem / parentElement: ', elementSixFormItem.parentElement);
    console.log('elementSixFormItem / parentElement / firstChild: ', elementSixFormItem.parentElement.firstElementChild);

    elementSixFormItem.parentElement.firstElementChild.innerHTML = elementSixFormItemInputValue;
};

/*
7. doboz:
Keypress eseményre írjuk be a dobozba az adott karaktert, amit leütöttek
*/

var elementSevenFormInputValue = document.getElementById('box7-input');
var character = '';

elementSevenFormInputValue.onkeypress = function (event) { // Az onkeypress deprecated!
    var currentCharacter = event.key;
    if (currentCharacter.length < 2) {
        elementSevenFormInputValue.parentElement.firstElementChild.innerHTML = currentCharacter;
        character = currentCharacter;
    }
}

elementSevenFormInputValue.addEventListener('blur', function () {
    elementSevenFormInputValue.parentElement.firstElementChild.innerHTML = '7';
    elementSevenFormInputValue.value = '';
});

/*
8. doboz:
Egérmozdítás eseményre írjuk be az egér pozíciójának x és y koordinátáját, 
a következő séma szerint: "X: {x-koordináta}, Y: {y-koordináta}"
*/

var elementEightText = document.getElementById('element-eight').firstElementChild;

elementEightText.innerHTML = '10';

document.onmousemove = function (event) {
    elementEightText.innerHTML = '<div>X: ' + event.x + '</div><div>Y: ' + event.y + '</div>'
}

/*
9. doboz:
Submit eseményre módosítsuk a doboz tartalmát azzal az értékkel ami úgy áll elő, 
hogy végrehajtjuk a select inputban kiválasztott operációt,
a state-en és number inputba beírt értéken.

Az előállt végeredményt tároljuk el új state-ként!

Pl:
  Number input mezőbe írt érték: 5
  Select inputban kiválasztott érték: "mult"
  Aktuális state: 9

  Operáció: 9 * 5
  
  Dobozba és state-be beírandó érték: 45
*/

var state = 9;
var elementNineForm = document.getElementById('box-9');

elementNineForm.onsubmit = function (event) {
    event.preventDefault();
    var operand = Number(event.target.elements.operand.value); // Inputba írt szám
    var operator = event.target.elements.operator.value; // Művelet
    var currentNumber = Number(elementNineForm.parentElement.firstElementChild.textContent.trim()); // vagy .innerHTML
    elementNineForm.parentElement.firstElementChild.innerHTML = eredmeny(currentNumber, operator, operand);
}

function eredmeny(currentNumber, muvelet, inputNumber) {
    switch (muvelet) {
        case 'mult':
            state = currentNumber * inputNumber;
            break;
        case 'div':
            state = currentNumber / inputNumber;
            break;
        case 'add':
            state = currentNumber + inputNumber;
            break;
        case 'sub':
            state = currentNumber - inputNumber;
            break;
    }
    return state;
}