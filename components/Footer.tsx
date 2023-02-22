import { BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <p>
        <a href="https://github.com/sergiosja" target="_blank">
          <BsGithub />
        </a>
      </p>

      <p>
        <a
          href="https://www.linkedin.com/in/sergey-jakobsen-b2597a1a4/"
          target="_blank"
        >
          <BsLinkedin />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
