import { createElement } from "../../utils/dom/createElement";
import { createLoginForm } from "../../components/login/loginForm";
import { createHeader } from "../../components/header/header";
import { createFooter } from "../../components/footer/footer";
import { getState } from "../../state/state";

import pandaNinjaImg from "../../assets/images/panda-ninja.png";
import "../../components/login/loginForm.css";
import "./renderLogin.css";

export const renderLogin = (parent: HTMLElement): void => {
  const isAuth = getState("userAuth");
  const customer = getState("customer");
  const container = createElement("div", { class: "login-container" }, [
    // Header
    createHeader(isAuth, customer),
    // Welcome section
    createElement("h2", { class: "welcome-text" }, ["Welcome to Red Panda Squad Shop"]),
    // Main content
    createElement("main", { class: "main-content" }, [
      createElement("div", { class: "login-content" }, [
        createElement("div", { class: "form-container" }, [createLoginForm()]),
        createElement("div", { class: "image-container" }, [
          createElement("img", {
            src: pandaNinjaImg,
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
