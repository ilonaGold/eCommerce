import { Routes } from "../interfaces/interfaces";
import { getState, setView } from "../state/state";
import { renderLogIn } from "../views/login";
import { renderMain } from "../views/main";
import { renderRegistration } from "../views/registration";
import { renderError } from "../views/error";

const routes: Routes = {
  "/": "Log In",
  login: "Log In",
  main: "Main",
  registration: "Registration",
};

export function routeHandler(): void {
  const path = location.pathname;
  const LAST_INDEX = -1;
  const arr = path.split("/").filter(Boolean);
  let endpoint: string | undefined;
  if (arr.length) {
    endpoint = arr.at(LAST_INDEX);
  } else {
    endpoint = "/";
  }
  console.log(endpoint);
  const isAuth = getState("userAuth");
  if (endpoint && routes[endpoint]) {
    if (!isAuth) {
      setView(endpoint);
    } else {
      setView("main");
    }
  } else {
    setView("error");
  }
  renderView();
}

function renderView(): void {
  const view = getState("view");
  const root = document.querySelector("#root");
  if (root) root.innerHTML = "";
  switch (view) {
    case "/":
    case "login":
      renderLogIn();
      break;
    case "registration":
      renderRegistration();
      break;
    case "main":
      renderMain();
      break;
    default:
      renderError();
      break;
  }
}

export function goToView(view: string): void {
  const path = location.pathname;
  const arr = path.split("/").filter(Boolean);
  if (!arr.length) {
    arr.push(view);
  } else {
    arr[arr.length - 1] = view;
  }
  const newPath = `/${arr.join("/")}`;
  history.pushState({}, "", newPath);
  routeHandler();
}
