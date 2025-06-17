import { TeamMember } from "../../interfaces/interfaces";
import schoolLogo from "../images/school-logo.png";
import redPandaImage from "../images/red-panda.png";
import pandaIlona from "../images/panda-Ilona.png";
import pandaAnastasia from "../images/panda-Anastasia.png";
import pandaBeqa from "../images/panda-Beqa.png";

export const SCHOOL_INFO = {
  id: "school",
  name: "RS School",
  role: "Educational Platform",
  image: schoolLogo,
  description:
    "The Rolling Scopes School is a free educational program conducted by The Rolling Scopes community since 2013. The mentoring program focuses on helping beginners learn frontend development and improve their coding skills through practical tasks and teamwork.",
  websiteUrl: "https://rs.school/",
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member1",
    name: "Beka Shekiladze",
    role: "Frontend Developer",
    image: pandaBeqa,
    description: "",
    githubUrl: "https://github.com/beqarion",
    contributions: [
      "API Integration",
      "Data Management",
      "Performance Optimization",
      "XXXXX",
      "XXXXX",
      "XXXXX",
      "XXXXX",
      "XXXXX",
      "XXXXX",
      "XXXXX",
    ],
  },
  {
    id: "member2",
    name: "Ilona Goldmane",
    role: "Frontend Developer, Team Lead & UI/UX Designer",
    image: pandaIlona,
    description: "",
    githubUrl: "https://github.com/ilonagold",
    contributions: [
      "UI Design",
      "CSS Animations",
      "Responsive Layout",
      "User Profile",
      "XXXXX",
      "XXXXX",
      "XXXXX",
      "XXXXX",
      "XXXXX",
      "XXXXX",
    ],
  },
  {
    id: "member3",
    name: "Anastasia Kudrevich",
    role: "Frontend Developer",
    image: pandaAnastasia,
    description: "",
    githubUrl: "https://github.com/silvermockingjay",
    contributions: [
      "Authentication",
      "Product Catalog",
      "XXXXX",
      "XXXXX",
      "XXXXX",
      "XXXXX",
      "XXXXX",
      "XXXXX",
      "XXXXX",
      "XXXXX",
    ],
  },
];
