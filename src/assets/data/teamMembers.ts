// Create file: src\assets\data\teamMembers.ts
import { TeamMember } from "../../interfaces/interfaces";
import schoolLogo from "../images/school-logo.png";
import redPandaImage from "../images/red-panda.png";

export const SCHOOL_INFO = {
  id: "school",
  name: "RS School",
  role: "Educational Platform",
  image: schoolLogo,
  description:
    "The Rolling Scopes School is a free educational program conducted by The Rolling Scopes community since 2013. The mentoring program focuses on helping beginners learn frontend development and improve their coding skills through practical tasks and teamwork.",
  githubUrl: "https://github.com/rolling-scopes-school",
  // websiteUrl: "https://rs.school/",
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member1",
    name: "Ilona Goldmane",
    role: "Frontend Developer, Team Lead & UI/UX Designer",
    image: redPandaImage,
    description: "",
    githubUrl: "https://github.com/member1",
    contributions: ["UI Design", "CSS Animations", "Responsive Layout", "User Profile"],
  },
  {
    id: "member2",
    name: "Anastasia Kudrevich",
    role: "Frontend Developer",
    image: redPandaImage,
    description: "",
    githubUrl: "https://github.com/member2",
    contributions: ["Authentication", "Product Catalog"],
  },
  {
    id: "member3",
    name: "Beka Shekiladze",
    role: "Frontend Developer",
    image: redPandaImage,
    description: "",
    githubUrl: "https://github.com/member3",
    contributions: ["API Integration", "Data Management", "Performance Optimization"],
  },
];
