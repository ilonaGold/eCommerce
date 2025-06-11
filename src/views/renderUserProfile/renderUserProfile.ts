import { getState } from "../../state/state";
import { createHeader } from "../../components/header/header";
import { mainComponent } from "../../components/main/main";
import { createFooter } from "../../components/footer/footer";
import { createElement } from "../../utils/dom/createElement";
import { personalInfoView } from "../../components/userProfile/personalInfoView/personalInfoView";
import { addressesView } from "../../components/userProfile/addressesView/addressesView";
import { openModal } from "../../components/modal/modal";
import { createEditPersonalInfoView } from "../../components/userProfile/editPersonalInfoView/editPersonalInfoView";
import { createChangePasswordView } from "../../components/userProfile/changePasswordView/changePasswordView";

import "./renderUserProfile.css";

export function renderUserProfile(parent: HTMLElement): void {
  const isAuth = getState("userAuth");
  const customer = getState("customer");

  const header = createHeader(isAuth, customer);
  const editProfileButton = createElement("button", { class: "user-profile__edit-button" }, [
    "Edit profile",
  ]);
  const changePassword = createElement(
    "button",
    {
      class: "user-profile__change-password-button",
    },
    ["Change password"]
  );

  editProfileButton.addEventListener("click", () => {
    const editForm = createEditPersonalInfoView();
    openModal(editForm, "Edit Personal Information");
  });

  changePassword.addEventListener("click", () => {
    const passwordForm = createChangePasswordView();
    openModal(passwordForm, "Change Password");
  });

  const buttonContainer = createElement("div", { class: "user-profile__button-container" });
  buttonContainer.append(editProfileButton, changePassword);
  const userPersonalInfo = personalInfoView();
  const userAddresses = addressesView();
  const personalInfoAndAddress = createElement("div", { class: "user-profile__info-and-address" }, [
    userPersonalInfo,
    userAddresses,
  ]);
  const userProfile = createElement("div", { class: "user-profile__container" });
  userProfile.append(buttonContainer, personalInfoAndAddress);
  const main = mainComponent(userProfile);
  const footer = createFooter();
  const viewContainer = createElement("div", { class: "product-details-page view-container" }, [
    header,
    main,
    footer,
  ]);
  parent.append(viewContainer);
}
