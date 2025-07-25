import { createRegistrationForm } from "../../components/registration/registrationForm";
import { goToView } from "../../routing/router";
import { getState } from "../../state/state";
import { createElement } from "../../utils/dom/createElement";
import { createHeader } from "../../components/header/header";
import { createFooter } from "../../components/footer/footer";

import "./registration.css";

export const renderRegistration = (parent: HTMLElement): void => {
  const isAuth = getState("userAuth");
  const customer = getState("customer");
  const container = createElement("div", { class: "register-container" }, [
    createHeader(isAuth, customer),
    createElement("main", { class: "main-content" }, [
      createElement("div", { class: "registration-content" }, [
        createRegistrationForm(),
        createElement(
          "button",
          { type: "button", class: "login-redirect-btn" },
          ["Already have an account? Login"],
          { events: { click: () => goToView("login") } }
        ),
      ]),
    ]),
    createFooter(),
  ]);

  parent.append(container);
};
