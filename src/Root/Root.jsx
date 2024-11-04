import styles from "./root.module.css";

import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
