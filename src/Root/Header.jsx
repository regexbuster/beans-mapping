import { Link } from "react-router-dom";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <Link to={`/`} className={styles.linkContainer}>
        <div>Home</div>
      </Link>
      <Link to={`about`} className={styles.linkContainer}>
        <div>About</div>
      </Link>
      <Link to={`polyline`} className={styles.linkContainer}>
        Polyline
      </Link>
      <Link to={`polyline/bleaching`} className={styles.linkContainer}>
        Bleaching
      </Link>
      <Link to={`map`} className={styles.linkContainer}>
        Map
      </Link>
      <Link to={`api`} className={styles.linkContainer}>
        API
      </Link>
    </div>
  );
}
