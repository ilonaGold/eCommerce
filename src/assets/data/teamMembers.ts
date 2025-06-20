import { TeamMember } from "../../interfaces/interfaces";
import schoolLogo from "../images/school-logo.png";
import pandaIlona from "../images/panda-Ilona.png";
import pandaAnastasia from "../images/panda-Anastasia.png";
import pandaBeqa from "../images/panda-Beqa.png";

// School information
export const SCHOOL_INFO = {
  id: "school",
  name: "RS School",
  role: "Educational Platform",
  image: schoolLogo,
  description:
    "The Rolling Scopes School is a free educational program conducted by The Rolling Scopes community since 2013. The mentoring program focuses on helping beginners learn frontend development and improve their coding skills through practical tasks and teamwork.",
  websiteUrl: "https://rs.school/",
};

// Team information
export const TEAM_INFO = {
  name: "RP Squad",
  role: "RSS Programme Team",
  logoText: "RPS",
  description:
    "The Red Panda Squad is a team of web developers dedicated to creating exceptional web experiences by our combining creativity with technical expertise. Our focus on user-centered design and performance optimization ensures that every project meets the highest standards of quality and usability.",
  buttonText: "Meet Team",
};

// Team modal content
export const TEAM_MODAL = {
  title: "About Red Panda Squad",
  content: `
  <p>We are a team of passionate web developers who have come together to create PandaShop, a modern e-commerce application. Our project showcases our skills in frontend development, UI/UX design, and collaborative software engineering.</p> 
  <p>The Red Panda Squad consists of three members - Ilona Goldmane, Anastasia Kudrevich and Bekar Shekiladze - each bringing unique strengths and expertise to the project:</p>
  <p>Ilona brought to the team project exceptional skills in graphic and UI/UX design. She created the visual identity of the website and designed a responsive, animated interface with a strong sense of color harmony, composition, and brand development. In addition to her design contributions, she implemented several pages from scratch on the frontend, including the user profile UI and product card components, both of which were seamlessly integrated with backend services. Ilona also designed and built this About page to represent the team not only verbally but also visually. Her artistic vision and hands-on coding greatly contributed to the user experience and the overall aesthetic of the project.</p>
  <p>Anastasia demonstrated a strong ability to read and analyze code written by other team members, identifying potential issues early in the development process. She played a key role in code review, helping to improve code quality by filtering out bugs and inconsistencies from pull requests. In addition, she contributed heavily to the technical foundation of the app—setting up application state, routing, and validation. Anastasia also created product entries in the API dashboard and ensured the integration aligned with the necessary business concepts. Her involvement extended to nearly every aspect of the project.</p>
  <p>Beqa consistently demonstrated a strong drive for technical excellence and forward-thinking development. He proactively applied advanced techniques and modern approaches to tasks, significantly raising the overall code quality and architecture of the project. One of his key contributions was designing and implementing the entire authentication process, including creation of user, login, registration, and session handling. Additionally, Beqa built out essential features like product search, filtering, sorting and product retrieval, category navigation, often ensuring seamless integration of backend. Beyond technical implementation, Beqa is a collaborative team member — always willing to support others, suggest architectural improvements, and uphold best practices across the codebase.</p>
  <p>Collaboration: Throughout the project, our team collaborated closely - sharing ideas, giving constructive feedback, and supporting one another at every stage of development. We balanced our strengths: Anastasia’s architectural insight and backend integration, Ilona’s visual creativity and responsive UI design, and Beqa’s technical leadership and advanced feature implementation. Effective communication and shared ownership of tasks helped us overcome challenges and deliver a successful, well-rounded application.</p>
  <p>We believe in continuous learning and improvement, and this project represents our commitment to excellence in web development.</p>
  `,
};

// Team members data
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member1",
    name: "Bekar Shekiladze",
    role: "Frontend Developer",
    image: pandaBeqa,
    description: "",
    githubUrl: "https://github.com/beqarion",
    contributions: [
      "Development Environment Configuration",
      "Development Scripts",
      "Integration with Authentication Service",
      "Access token management across the app",
      "Work with API for User Profiles and Addresses",
      "Login, Registration, Automatic Login implementation",
      "Category navigation",
      "Fetching products from commercetools",
      "Product Filtering, Sorting, and Searching",
      "Page layout implementation",
    ],
    bioHtml: `
      <p>With several years of experience in the telecommunications industry, I realized that working with bits and numbers alone wasn't as fulfilling as I had hoped.</p>
      <p>My childhood passion for drawing inspired me to explore the world of design, and eventually led me to the exciting field of frontend web development.</p> 
      <p>While I'm not yet working as a web developer, I'm actively learning and applying my technical skills to merge logic with creativity, and I'm eager to bring beautiful, functional websites to life in the near future.</p>
    `,
  },
  {
    id: "member2",
    name: "Ilona Goldmane",
    role: "Frontend Developer, UI/UX Designer & Team Lead",
    image: pandaIlona,
    description: "",
    githubUrl: "https://github.com/ilonagold",
    contributions: [
      "UI/UX Design & CSS Animation",
      "Responsive Design Implementation",
      "Comprehensive ReadMe Documentation",
      "Centralized Navigation",
      "Catalog Product List Implementation",
      "Interactive Product Cards Implementation",
      "Enlarged Image Modal with Slider for Products",
      "Work with API for Customer Update",
      "Work with API for Address Management",
      "User password change and profile edit functionality",
    ],
    bioHtml: `
      <p>My background in teaching English, strong research skills and passion for design led me to explore the world of web development.</p>
      <p>As a frontend developer, I enjoy the challenge of turning complex ideas into simple, elegant solutions. My goal is to create websites that are not only functional but also visually appealing, ensuring that users have a delightful experience.</p>
      <p>I believe that collaboration is key to success, and I enjoy working with teams to bring projects to life. Whether it's through design or coding, I'm dedicated to making a positive impact in the digital world.</p>
      `,
  },
  {
    id: "member3",
    name: "Anastasia Kudrevich",
    role: "Frontend Developer",
    image: pandaAnastasia,
    description: "",
    githubUrl: "https://github.com/silvermockingjay",
    contributions: [
      "Jira task board setup and update",
      "CommerceTools Project and API Client Setup",
      "Router configuration",
      "State management implementation",
      "Form data validation",
      "Product Information display",
      "View user profile functionality",
      "Integration with commercetools for discount policies",
      "Page layout implementation",
      "Code review",
    ],
    bioHtml: `
      <p>I’m a motivated frontend developer with a strong foundation in computer science and web development. Skilled in HTML, CSS, JavaScript, TypeScript, Node.js, Python, Webpack, SQLite.</p>
      <p>My background in retail management, where I led strategic planning and store optimization, strengthened my problem-solving and collaboration skills, but I’ve always been driven by a deeper purpose: using technology to improve people’s quality of life.</p>
      <p>I enjoy building useful products that contribute to the community - created a dog-walking app for my neighbours. I'm eager to continue learning and growing in a professional tech environment.</p>
    `,
  },
];
