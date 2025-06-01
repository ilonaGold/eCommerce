import { Routes } from "../interfaces/interfaces";
import { getState, setView, setAuth } from "../state/state";
import { createElement } from "../utils/dom/createElement";
import { renderLogin } from "../views/renderLogin/renderLogin";
import { renderRegistration } from "../views/renderRegistration/renderRegistration";
import { renderMain } from "../views/renderMain/renderMain";
import { renderError } from "../views/renderError/renderError";
import { renderHome } from "../views/renderHome/renderHome";
import { renderAbout } from "../views/renderAbout/renderAbout";
import { renderContacts } from "../views/renderContacts/renderContacts";
import { renderProductDetails } from "../views/renderProductDetails/renderProductDetails";

const routes: Routes[] = [
  {
    path: "/",
    handle: (): void => {
      setView("main");
      renderMain(getRoot());
    },
  },
  {
    path: "main",
    handle: (): void => {
      setView("main");
      renderMain(getRoot());
    },
  },
  {
    path: "login",
    handle: (): void => {
      setView("login");
      renderLogin(getRoot());
    },
  },
  {
    path: "registration",
    handle: (): void => {
      setView("registration");
      renderRegistration(getRoot());
    },
  },
  {
    path: "home",
    handle: (): void => {
      setView("home");
      renderHome(getRoot());
    },
  },
  {
    path: "about",
    handle: (): void => {
      setView("about");
      renderAbout(getRoot());
    },
  },
  {
    path: "contacts",
    handle: (): void => {
      setView("contacts");
      renderContacts(getRoot());
    },
  },
  {
    path: "main/:slug",
    handle: (): void => {
      setView("product-details");
      renderProductDetails(getRoot());
    },
  },
  {
    path: "*",
    handle: (): void => {
      setView("error");
      renderError(getRoot());
    },
  },
];

const protectedRoutes = ["login", "registration"];

function getRoot(): HTMLElement {
  let root: HTMLElement | null = document.querySelector("#root");
  if (root) {
    root.innerHTML = "";
  } else {
    root = createElement("div", { id: "root" });
    document.body.append(root);
  }
  return root;
}

export function routeHandler(): void {
  const path = location.pathname.replace(/^\/+/, "") || "/";
  const isAuth = getState("userAuth");
  setAuth(isAuth);
  for (const route of routes) {
    let pattern = route.path;
    if (pattern === "*") {
      pattern = ".*";
    } else {
      const slugRegExp = new RegExp(":[^/]+", "g");
      pattern = pattern.replace(slugRegExp, "([^/]+)");
    }
    const patternRegEx = new RegExp(`^${pattern}$`);
    const match = path.match(patternRegEx);

    if (match) {
      if (!isAuth) {
        route.handle();
      } else {
        if (protectedRoutes.includes(path)) {
          history.replaceState(null, "", "main");
          setView("main");
          renderMain(getRoot());
        } else {
          route.handle();
        }
      }
      return;
    }
  }
  setView("error");
  renderError(getRoot());
}

export function goToView(view: string): void {
  history.pushState({}, "", `/${view}`);
  routeHandler();
}

/*const routes: Routes = {
  "/": "Main",
  main: "Main",
  login: "Log In",
  registration: "Registration",
  home: "Home",
  about: "About",
  contacts: "Contacts",
};

const restrictedRoutes = ["login", "registration"];

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
  const isAuth = getState("userAuth");
  console.log(isAuth);

  setAuth(isAuth);
  if (endpoint && routes[endpoint]) {
    if (!isAuth) {
      setView(endpoint);
    } else {
      if (restrictedRoutes.includes(endpoint)) {
        const newPath = createNewPath("main");
        history.replaceState(null, "", newPath);
        setView("main");
      } else {
        setView(endpoint);
      }
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
    case "main":
      renderMain(root);
      break;
    case "login":
      renderLogin(root);
      break;
    case "registration":
      renderRegistration(root);
      break;
    case "home":
      renderHome(root);
      break;
    case "about":
      renderAbout(root);
      break;
    case "contacts":
      renderContacts(root);
      break;
    default:
      renderError(root);
      break;
  }
*/

/*export function goToView(view: string): void {
  const newPath = createNewPath(view);
  history.pushState({}, "", newPath);
  routeHandler();
}

export function createNewPath(view: string): string {
  const path = location.pathname;
  const arr = path.split("/").filter(Boolean);
  if (!arr.length) {
    arr.push(view);
  } else {
    arr[arr.length - 1] = view;
  }
  const newPath = `/${arr.join("/")}`;
  return newPath;
}
*/
