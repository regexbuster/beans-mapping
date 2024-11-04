import { useRouteError, Link } from "react-router-dom";

import styles from "./error.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.container}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <Link to={`/`}>Return Home</Link>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
