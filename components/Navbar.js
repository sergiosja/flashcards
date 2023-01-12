import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const router = useRouter();

  const back = (way) => {
    if (!router.query.categoryId || way === "home") {
      router.push("/");
    } else {
      router.push(`/category/${router.query.categoryId}`);
    }
  };

  return (
    <nav>
      <button onClick={() => back("home")} className={styles.navbarButton}>
        Home
      </button>

      <button onClick={() => back("back")} className={styles.navbarButton}>
        Back
      </button>
    </nav>
  );
};

export default Navbar;
