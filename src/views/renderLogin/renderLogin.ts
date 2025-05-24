import { createElement } from "../../utils/dom/createElement";
import { createLoginForm } from "../../components/login/loginForm";
import { createHeader } from "../../components/header/header";
import { createFooter } from "../../components/footer/footer";

import "../../components/login/loginForm.css";

export const renderLogin = (parent: HTMLElement): void => {
  const container = createElement("div", { class: "login-container" }, [
    // Header
    createHeader(),
    // Main content
    createElement("main", { class: "main-content" }, [
      createElement("h2", { class: "welcome-text" }, ["Welcome to Red Panda Squad Shop"]),
      createElement("div", { class: "login-content" }, [
        createElement("div", { class: "form-container" }, [createLoginForm()]),
        createElement("div", { class: "image-container" }, [
          createElement("img", {
            src: "../../assets/images/panda-ninja.png",
            alt: "Panda Ninja",
            class: "panda-image",
          }),
        ]),
      ]),
    ]),
    // Footer
    createFooter(),
  ]);
  parent.append(container);
};
