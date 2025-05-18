import { Routes } from "../interfaces/interfaces";
import { getState, setView } from "../state/state";
import { renderLogIn } from "../views/login";
import { renderMain } from "../views/main";
import { renderError } from "../views/error";

import { renderRegistration } from "../view

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
  let root: HTMLElement | null = document.querySelector("#root");
  if (root) {
    root.innerHTML = "";
  } else {
    root = createElement("div", { id: "root" });
    document.body.append(root);
  }
  switch (view) {
    case "/":
    case "login":
      renderLogIn(root);
      break;
    case "registration":
      renderRegistration(root);
      break;
    case "main":
      renderMain(root);
      break;
    default:
      renderError(root);
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
