import { Routes } from "../interfaces/interfaces";
import { getState, setAuth } from "../state/state";
import { createElement } from "../utils/dom/createElement";
import { renderLogin } from "../views/renderLogin/renderLogin";
import { renderRegistration } from "../views/renderRegistration/renderRegistration";
import { renderProducts } from "../views/renderProducts/renderProducts";
import { renderError } from "../views/renderError/renderError";
import { renderHome } from "../views/renderHome/renderHome";
import { renderAbout } from "../views/renderAbout/renderAbout";
import { renderContacts } from "../views/renderContacts/renderContacts";
import { handleProductDetails } from "../utils/dom/product/productHandler";
import { renderUserProfile } from "../views/renderUserProfile/renderUserProfile";

const routes: Routes[] = [
  {
    path: "/",
    handle: (): void => {
      renderProducts(getRoot());
    },
  },
  {
    path: "products",
    handle: (): void => {
      renderProducts(getRoot());
    },
  },
  {
    path: "login",
    handle: (): void => {
      renderLogin(getRoot());
    },
  },
  {
    path: "registration",
    handle: (): void => {
      renderRegistration(getRoot());
    },
  },
  {
    path: "user-profile",
    handle: (): void => {
      renderUserProfile(getRoot());
    },
  },
  {
    path: "home",
    handle: (): void => {
      renderHome(getRoot());
    },
  },
  {
    path: "about",
    handle: (): void => {
      renderAbout(getRoot());
    },
  },
  {
    path: "contacts",
    handle: (): void => {
      renderContacts(getRoot());
    },
  },
  {
    path: "products/:slug",
    handle: handleProductDetails,
  },
  {
    path: "*",
    handle: (): void => {
      renderError(getRoot());
    },
  },
];

const protectedRoutes = ["login", "registration"];

export function getRoot(): HTMLElement {
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
        if (path === "user-profile") {
          history.replaceState(null, "", "/login");
          renderLogin(getRoot());
        } else {
          route.handle();
        }
      } else {
        if (protectedRoutes.includes(path)) {
          history.replaceState(null, "", "/main");
          renderProducts(getRoot());
        } else {
          route.handle();
        }
      }
      return;
    }
  }
  renderError(getRoot());
}

export function goToView(view: string): void {
  history.pushState({}, "", `/${view}`);
  routeHandler();
}
