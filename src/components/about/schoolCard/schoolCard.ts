import { createElement } from "../../../utils/dom/createElement";
import { SCHOOL_INFO, TEAM_INFO } from "../../../assets/data/teamMembers";
import { createTeamModal } from "../teamModal/teamModal";
import "./schoolCard.css";

export function createSchoolCard(): HTMLElement {
  const card = createElement("div", {
    class: "about-card",
    "data-index": "0",
  });

  // Create front face of the card
  const cardFront = createElement("div", { class: "card-face card-front" });

  // Left part - School info
  const leftPart = createElement("div", { class: "school-card-left" });

  // Create horizontal layout for logo + name/role on school side
  const schoolHeaderContainer = createElement("div", { class: "card-header-container" });

  const imageContainer = createElement("div", { class: "about-card-image school-image" });
  const image = createElement("img", { src: SCHOOL_INFO.image, alt: SCHOOL_INFO.name });
  imageContainer.append(image);

  const nameRoleContainer = createElement("div", { class: "name-role-container" });
  const name = createElement("h2", { class: "about-card-name" }, [SCHOOL_INFO.name]);
  const role = createElement("p", { class: "about-card-role" }, [SCHOOL_INFO.role]);
  nameRoleContainer.append(name, role);

  schoolHeaderContainer.append(imageContainer, nameRoleContainer);

  // Description container
  const descriptionContainer = createElement("div", { class: "description-container" });
  const description = createElement("p", { class: "about-card-description school-description" }, [
    SCHOOL_INFO.description,
  ]);
  descriptionContainer.append(description);

  // Buttons container
  const buttonsContainer = createElement("div", { class: "card-buttons" });

  const websiteButton = createElement(
    "a",
    {
      href: SCHOOL_INFO.websiteUrl,
      class: "card-btn website-btn",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    ["Visit School"]
  );
  buttonsContainer.append(websiteButton);

  // Add all elements to left part
  leftPart.append(schoolHeaderContainer, descriptionContainer, buttonsContainer);

  // Right part - Team logo
  const rightPart = createElement("div", { class: "school-card-right" });

  // Create horizontal layout for logo + name/role on team side
  const teamHeaderContainer = createElement("div", { class: "card-header-container" });

  const teamLogoContainer = createElement("div", { class: "about-card-image team-logo-wrapper" });
  const teamLogo = createElement("div", { class: "team-logo" }, [TEAM_INFO.logoText]);
  teamLogoContainer.append(teamLogo);

  const teamNameRoleContainer = createElement("div", { class: "name-role-container" });
  const teamName = createElement("h2", { class: "about-card-name" }, [TEAM_INFO.name]);
  const teamRole = createElement("p", { class: "about-card-role" }, [TEAM_INFO.role]);
  teamNameRoleContainer.append(teamName, teamRole);

  teamHeaderContainer.append(teamLogoContainer, teamNameRoleContainer);

  // Team description
  const teamDescriptionContainer = createElement("div", { class: "description-container" });
  const teamDescription = createElement(
    "div",
    { class: "about-card-description team-description" },
    [TEAM_INFO.description]
  );
  teamDescriptionContainer.append(teamDescription);

  // Team button container
  const teamButtonsContainer = createElement("div", { class: "card-buttons" });
  const teamButton = createElement(
    "button",
    {
      class: "card-btn team-btn",
      type: "button",
    },
    [TEAM_INFO.buttonText]
  );

  // Modal handler
  teamButton.addEventListener("click", () => {
    const teamModal = createTeamModal();
    document.body.appendChild(teamModal);

    setTimeout(() => {
      teamModal.classList.add("active");
    }, 10);
  });

  teamButtonsContainer.append(teamButton);

  // Build right side content
  rightPart.append(teamHeaderContainer, teamDescriptionContainer, teamButtonsContainer);

  // Add both parts to card front
  cardFront.append(leftPart, rightPart);

  // Create empty back face for the school card
  const cardBack = createElement("div", { class: "card-face card-back" });

  // Add front and back faces to the card
  card.append(cardFront, cardBack);

  function createResponsiveLayoutHandler(): void {
    // Monitor window width and add appropriate class
    const handleResize = () => {
      const card = document.querySelector('.about-card[data-index="0"]');
      if (!card) return;

      if (window.innerWidth <= 540) {
        card.classList.add("stacked-layout");
      } else {
        card.classList.remove("stacked-layout");
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);
  }

  createResponsiveLayoutHandler();

  return card;
}
