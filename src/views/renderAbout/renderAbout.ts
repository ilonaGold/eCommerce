import { createElement } from "../../utils/dom/createElement";
import { getState } from "../../state/state";
import { createHeader } from "../../components/header/header";
import { createFooter } from "../../components/footer/footer";
import { TEAM_MEMBERS } from "../../assets/data/teamMembers";
import { createAboutBanner } from "../../components/about/aboutBanner/aboutBanner";
import { createSchoolCard } from "../../components/about/schoolCard/schoolCard";
import { createTeamMemberCard } from "../../components/about/teamMemberCard/teamMemberCard";

import "./renderAbout.css";

export function renderAbout(parent: HTMLElement): void {
  const isAuth = getState("userAuth");
  const customer = getState("customer");

  // Background image container
  const imageContainer = createAboutBanner();

  // Create content container to hold cards
  const contentContainer = createElement("div", { class: "about-content" });

  // Cards container
  const cardsContainer = createElement("div", { class: "cards-container" });

  // Create school card
  cardsContainer.append(createSchoolCard());

  // Create team member cards with staggered animations
  TEAM_MEMBERS.forEach((member, index) => {
    const card = createTeamMemberCard(member, index + 1);
    cardsContainer.append(card);

    // Add slide-in animation class after a delay
    setTimeout(
      () => {
        card.classList.add(index % 2 === 0 ? "slide-in-left" : "slide-in-right");
      },
      100 * (index + 1)
    );
  });

  // Add cards container to content
  contentContainer.append(cardsContainer);

  // Main element
  const main = createElement("main", { class: "about-main" }, [imageContainer, contentContainer]);

  // Container with header and footer
  const container = createElement("main", { class: "about-container" }, [
    createHeader(isAuth, customer),
    main,
    createFooter(),
  ]);

  parent.append(container);
}
