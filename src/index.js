import { compareAsc, format } from 'date-fns';
import { control } from "./logic"
import { memory } from "./storage";
import { display } from "./display"


window.control = control;
window.memory = memory;

display.refresh()