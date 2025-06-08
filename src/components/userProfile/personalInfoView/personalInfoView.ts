import { getState } from "../../../state/state";
import { createElement } from "../../../utils/dom/createElement";
import { createInfoGroup } from "../../../utils/dom/userProfile/createInfoGroup";

import "./personalInfoView.css";

export const personalInfoView = (): HTMLElement => {
  const user = getState("customer");
  if (!user) {
    const message = createElement("section", { class: "user-info__personal-info" }, [
      "Personal information is not available",
    ]);
    return message;
  }

  const firstName = createInfoGroup({
    headerText: "First name",
    contentClass: "user-profile__content",
    contentText: user?.firstName,
  });
  const lastName = createInfoGroup({
    headerText: "Last name",
    contentClass: "user-profile__content",
    contentText: user?.lastName,
  });
  const email = createInfoGroup({
    headerText: "Email",
    contentClass: "user-profile__content",
    contentText: user?.email,
  });
  const dateOfBirth = createInfoGroup({
    headerText: "Date of birth",
    contentClass: "user-profile__content",
    contentText: user?.dateOfBirth,
  });
  const headerOfSection = createElement("h2", { class: "user-info__section-header" }, [
    "Personal information",
  ]);
  const personalInfo = createElement("section", { class: "user-info__personal-info" }, [
    headerOfSection,
    firstName,
    lastName,
    dateOfBirth,
    email,
  ]);
  return personalInfo;
};
