import { routeHandler } from "./routing/router";
import { isCustomerLoggedIn } from "./services/auth/isCustomerLoggedIn";
import "./styles/styles.css";

await isCustomerLoggedIn();

window.addEventListener("load", routeHandler);
window.addEventListener("popstate", routeHandler);
