import { routeHandler } from "./routing/router";
import { authFromStorage } from "./services/auth/authFromStorage";
import "./styles/styles.css";

const startApp = async (): Promise<void> => {
  await authFromStorage();
  routeHandler();
};

window.addEventListener("load", startApp);
window.addEventListener("popstate", routeHandler);
