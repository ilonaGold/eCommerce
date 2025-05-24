import { routeHandler } from "./routing/router";
import { initAuth } from "./services/auth/initAuth";
import "./styles/styles.css";

const startApp = async () => {
  await initAuth();
  routeHandler();
};

window.addEventListener("load", startApp);
window.addEventListener("popstate", routeHandler);
