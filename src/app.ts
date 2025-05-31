import { routeHandler } from "./routing/router";
import { authFromStorage } from "./services/auth/authFromStorage";
import { renderMain } from "./views/renderMain/renderMain";
import "./styles/styles.css";

const startApp = async (): Promise<void> => {
  await authFromStorage();
  routeHandler();
};

export const routes = {
  "/": renderMain,
  "/main": renderMain,
  // ...other routes...
};

window.addEventListener("load", startApp);
window.addEventListener("popstate", routeHandler);
