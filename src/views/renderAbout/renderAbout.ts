import { createElement } from "../../utils/dom/createElement";
import { getState } from "../../state/state";
import { createHeader } from "../../components/header/header";
import { createFooter } from "../../components/footer/footer";
import { SCHOOL_INFO, TEAM_MEMBERS } from "../../assets/data/teamMembers";
import { TeamMember } from "../../interfaces/interfaces";

import aboutPanda from "../../assets/images/three-pandas.png";
import schoolLogo from "../../assets/images/school-logo.png";
import "./renderAbout.css";

export function renderAbout(parent: HTMLElement): void {
  const isAuth = getState("userAuth");
  const customer = getState("customer");

  // Background image container (keeping your original structure)
  const imageContainer = createElement("div", { class: "about-image-container" }, [
    createElement("img", {
      src: aboutPanda,
      alt: "Three red pandas on stone steps",
      class: "about-panda-image",
    }),
  ]);

  // Create content container to hold cards
  const contentContainer = createElement("div", { class: "about-content" });

  // Cards container
  const cardsContainer = createElement("div", { class: "cards-container" });

  // Create school card
  cardsContainer.append(createCard(SCHOOL_INFO, 0));

  // Create team member cards
  TEAM_MEMBERS.forEach((member, index) => {
    cardsContainer.append(createCard(member, index + 1));
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

  // Set up animation observer after DOM is loaded
  setTimeout(() => {
    setupCardAnimations();
    adjustForMobile();
  }, 100);
}

function createCard(info: TeamMember | any, index: number): HTMLElement {
  const card = createElement("div", {
    class: "about-card",
    id: `card-${info.id}`,
  });

  // Image section
  const imageContainer = createElement("div", { class: "about-card-image" });
  const image = createElement("img", {
    src: info.image,
    alt: info.name,
  });
  imageContainer.append(image);

  // Content section
  const contentContainer = createElement("div", { class: "about-card-content" });
  const name = createElement("h3", { class: "about-card-name" }, [info.name]);
  contentContainer.append(name);

  const role = createElement("h4", { class: "about-card-role" }, [info.role]);
  contentContainer.append(role);

  const description = createElement("p", { class: "about-card-description" }, [info.description]);
  contentContainer.append(description);

  // Create contributions list if available
  if (info.contributions && info.contributions.length > 0) {
    const contributionsTitle = createElement("h5", { class: "contributions-title" }, [
      "Key Contributions:",
    ]);
    contentContainer.append(contributionsTitle);

    const contributionsList = createElement("ul", { class: "contributions-list" });

    info.contributions.forEach((contribution: string) => {
      const item = createElement("li", {}, [contribution]);
      contributionsList.append(item);
    });

    contentContainer.append(contributionsList);
  }

  // Create button with appropriate link
  const link = info.githubUrl || info.websiteUrl;
  const linkText = info.githubUrl && !info.websiteUrl ? "Learn More" : "Visit Website";

  const button = createElement(
    "a",
    {
      href: link,
      class: "learn-more-btn",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    [linkText]
  );
  contentContainer.append(button);

  // Add social links section
  if (info.websiteUrl) {
    const socialLinks = createElement("div", { class: "social-links" });
    const schoolLink = createElement(
      "a",
      {
        href: info.websiteUrl,
        class: "school-link",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      ["RS School Website"]
    );

    socialLinks.append(schoolLink);
    contentContainer.append(socialLinks);
  }

  // Assemble card
  card.append(imageContainer);
  card.append(contentContainer);

  return card;
}

function setupCardAnimations(): void {
  document.querySelectorAll(".about-card").forEach((card, index) => {
    (card as HTMLElement).style.setProperty("--card-index", (index + 1).toString());
  });
}

setTimeout(() => {
  setupCardAnimations();
}, 100);

function adjustForMobile(): void {
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  const cards = document.querySelectorAll(".about-card");

  function handleScreenChange(e: MediaQueryListEvent | MediaQueryList): void {
    cards.forEach((card) => {
      if (e.matches) {
        // Switch to column layout on mobile
        (card as HTMLElement).style.flexDirection = "column";
      } else {
        (card as HTMLElement).style.flexDirection = "row";
      }
    });
  }

  // Initial check
  handleScreenChange(mediaQuery);
  // Add listener
  mediaQuery.addEventListener("change", handleScreenChange);
}
