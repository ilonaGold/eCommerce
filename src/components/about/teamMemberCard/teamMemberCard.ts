import { createElement } from "../../../utils/dom/createElement";
import { TeamMember } from "../../../interfaces/interfaces";
import "./teamMemberCard.css";

export function createTeamMemberCard(info: TeamMember, index: number): HTMLElement {
  const card = createElement("div", {
    class: "about-card",
    "data-index": index.toString(),
  });

  // Create front face of the card
  const cardFront = createElement("div", { class: "card-face card-front" });

  // Create card content
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

  // Add Learn More button
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

  // Create back face of card
  const cardBack = createElement("div", { class: "card-face card-back" });

  const backContent = createElement("div", { class: "back-content" });
  const backName = createElement("h2", { class: "about-card-name" }, [info.name]);

  const bioParagraph = createElement("div", { class: "about-card-description" });

  // Use custom HTML bio if available, otherwise generate one
  if (info.bioHtml) {
    bioParagraph.innerHTML = info.bioHtml;
  } else {
    // Legacy fallback with safety check for contributions
    const contributionsText = info.contributions
      ? info.contributions.join(", ")
      : "various aspects";
    const fallbackBio =
      "<p>As a dedicated developer on the PandaShop team, " +
      info.name +
      " brings unique skills and passion to our project.</p>" +
      "<p>With expertise in " +
      contributionsText +
      ", they have been instrumental in creating the seamless experience you see today.</p>" +
      "<p>Their journey in web development started with a deep curiosity about how digital experiences are built, and has evolved into a mastery of modern frontend technologies.</p>" +
      "<p>When not coding, they enjoy exploring new technologies and finding innovative solutions to complex problems.</p>";
    bioParagraph.innerHTML = fallbackBio;
  }

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

  backContent.append(backName, bioParagraph, goBackButton);
  cardBack.append(backContent);

  // Add front and back faces to the card
  card.append(cardFront, cardBack);

  // Add click handler for the whole card
  card.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) return;
    card.classList.toggle("flipped");
  });

  return card;
}
