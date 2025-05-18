import { routeHandler } from "./routing/router";
import "./styles/styles.css";

window.addEventListener("load", routeHandler);
window.addEventListener("popstate", routeHandler);