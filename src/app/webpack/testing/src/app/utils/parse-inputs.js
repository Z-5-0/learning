export const parseInputs = (...input) => { // kapott egy export kulcsszót
    return input.map(str => parseInt(str));
};