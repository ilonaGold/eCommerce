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

  // Background image container
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

  // Create team member cards with staggered animations
  TEAM_MEMBERS.forEach((member, index) => {
    const card = createCard(member, index + 1);
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

function createCard(info: TeamMember | any, index: number): HTMLElement {
  const card = createElement("div", {
    class: "about-card",
    "data-index": index.toString(),
  });

  // Create front face of the card
  const cardFront = createElement("div", { class: "card-face card-front" });

  const imageContainer = createElement("div", { class: "about-card-image" });
  const image = createElement("img", { src: info.image, alt: info.name });
  imageContainer.append(image);

  const contentContainer = createElement("div", { class: "about-card-content" });
  const name = createElement("h2", { class: "about-card-name" }, [info.name]);
  const role = createElement("p", { class: "about-card-role" }, [info.role]);

  const buttonsContainer = createElement("div", { class: "card-buttons" });

  // Add Github button
  if (info.githubUrl) {
    const githubButton = createElement(
      "a",
      {
        href: info.githubUrl,
        class: "card-btn check-github-btn",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      ["Check Github"]
    );
    buttonsContainer.append(githubButton);
  }

  // Add Learn More button for team members only
  if (info.id !== "school") {
    const learnMoreButton = createElement(
      "button",
      {
        class: "card-btn learn-more-btn",
        type: "button",
      },
      ["Learn More"]
    );

    learnMoreButton.addEventListener("click", (e) => {
      e.stopPropagation();
      card.classList.add("flipped");
    });

    buttonsContainer.append(learnMoreButton);
  }

  // Add Website button for school only
  if (info.websiteUrl && info.id === "school") {
    const websiteButton = createElement(
      "a",
      {
        href: info.websiteUrl,
        class: "card-btn website-btn",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      ["Visit Website"]
    );
    buttonsContainer.append(websiteButton);
  }

  // Build front content
  contentContainer.append(name, role);
  if (info.description) {
    const description = createElement("p", { class: "about-card-description" }, [info.description]);
    contentContainer.append(description);
  }

  // Add contributions to front face
  if (info.contributions && info.contributions.length > 0) {
    const contributionsTitle = createElement("h3", { class: "contributions-title" }, [
      "Key Contributions:",
    ]);
    const contributionsList = createElement("ul", { class: "contributions-list" });

    info.contributions.forEach((contribution: string) => {
      const item = createElement("li", {}, [contribution]);
      contributionsList.append(item);
    });

    contentContainer.append(contributionsTitle, contributionsList);
  }

  contentContainer.append(buttonsContainer);
  cardFront.append(imageContainer, contentContainer);

  // Create back face of card (only for team members)
  const cardBack = createElement("div", { class: "card-face card-back" });

  if (info.id !== "school") {
    const backContent = createElement("div", { class: "back-content" });
    const backName = createElement("h2", { class: "about-card-name" }, [info.name]);

    const loremText = `
      <p>As a dedicated developer on the PandaShop team, ${info.name} brings unique skills and passion to our project.</p>
      <p>With expertise in ${info.contributions.join(", ")}, they have been instrumental in creating the seamless experience you see today.</p>
      <p>Their journey in web development started with a deep curiosity about how digital experiences are built, and has evolved into a mastery of modern frontend technologies.</p>
      <p>When not coding, they enjoy exploring new technologies and finding innovative solutions to complex problems.</p>
    `;

    const loremParagraph = createElement("div", { class: "about-card-description" });
    loremParagraph.innerHTML = loremText;

    const goBackButton = createElement(
      "button",
      {
        class: "card-btn go-back-btn",
        type: "button",
      },
      ["Go Back"]
    );

    goBackButton.addEventListener("click", (e) => {
      e.stopPropagation();
      card.classList.remove("flipped");
    });

    backContent.append(backName, loremParagraph, goBackButton);
    cardBack.append(backContent);
  }

  card.append(cardFront, cardBack);

  // Add click handler for the whole card
  card.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) return;
    if (info.id !== "school") {
      card.classList.toggle("flipped");
    }
  });

  return card;
}
