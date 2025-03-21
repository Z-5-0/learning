import { AlertService } from "./app/alert.service"; // importáltuk
import { ComponentService } from "./app/component.service"; // importáltuk
import "./main.scss";
import { run } from "./app/app";

const alertService = new AlertService(); // példányosítjuk az AlertService-t
const componentService = new ComponentService(); // példányosítjuk az ComponentService-t

run(alertService, componentService); // itt indítjuk az app-unkat
