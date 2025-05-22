import { ensureRoot } from "../utils/dom/ensureRoot";
import { renderLogin } from "../views/renderLogin/renderLogin";
import { renderMain } from "../views/renderMain/renderMain";
import { renderRegistration } from "../views/renderRegistration/renderRegistration";

const routes: Record<string, (root: HTMLElement) => void> = {
  "/": renderMain,
  "/registration": renderRegistration,
  "/login": renderLogin,
};

export function routeHandler(): void {
  const path = window.location.pathname;

  const renderPage = routes[path];
  renderPage(ensureRoot());
}

export function navigateTo(path: string): void {
  window.history.pushState({}, "", path);
  routeHandler();
}
