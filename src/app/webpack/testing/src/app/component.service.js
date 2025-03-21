export class ComponentService { // kapott egy export kulcsszót
    constructor() {
        this.numberOneInput = document.getElementById("numberOne");
        this.numberTwoInput = document.getElementById("numberTwo");
        this.addValuesButton = document.getElementById("addValues");
        this.resultDiv = document.getElementById("result");
    }

    getInputs() {
        return [this.numberOneInput.value, this.numberTwoInput.value];
    }

    setResult(str) {
        this.resultDiv.innerText = str;
    }

    onClick(cb) { // a cb egy callback függvény, amelyet az onClick paraméterként kap meg
        this.addValuesButton.addEventListener("click", cb);
    }
}