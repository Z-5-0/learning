export const inputsAreValid = (...input) => { // kapott egy export kulcsszót
    return input.every(num => typeof num === "number" && !isNaN(num));
};