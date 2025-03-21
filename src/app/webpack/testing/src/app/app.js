import { inputsAreValid } from "./utils/inputs-are-valid"; // importáltuk
import { parseInputs } from "./utils/parse-inputs"; // importáltuk

export const run = (alertService, componentService) => { // run függvény, ami benementként a két service 1-1 példányát fogadja
    alertService.hideErrors();

    componentService.onClick(() => {
        alertService.hideErrors();
        const inputs = componentService.getInputs();
        const parsedInputs = parseInputs(...inputs);
        if (inputsAreValid(...parsedInputs)) {
            const [numA, numB] = parsedInputs;
            componentService.setResult(numA + numB);
        } else {
            componentService.setResult("");
            alertService.handleAdditionError(inputs, parsedInputs);
        }
    });
};
