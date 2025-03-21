import { inputsAreValid } from "./utils/inputs-are-valid"; // nem default-ot importálunk, hanem konkrét nevet, ezért a kapcsos zárójel

export class AlertService { // kapott egy export kulcsszót
    constructor() {
        this.errorBox = document.getElementById("error");
    }

    handleAdditionError(inputs, numbers) {
        const fullMessage = inputs.reduce((message, str, index) => {
            if (inputsAreValid(numbers[index])) {
                return message + "";
            } else {
                return message + `${str} is not a number. `;
            }
        }, "Please enter two valid numbers! ");

        this.errorBox.classList.remove("invisible");
        this.errorBox.innerText = fullMessage;
    }

    hideErrors() {
        this.errorBox.classList.add("invisible");
    }
}