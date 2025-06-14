import * as styles from "./page.css";
import { button } from "../components/Button.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Next.js with Vanilla Extract!</h1>
      <p className={styles.description}>
        This page is styled with vanilla-extract instead of Tailwind CSS.
        Vanilla Extract provides type-safe CSS-in-JS with zero runtime overhead
        and theme support.
      </p>
      <div className={styles.buttonContainer}>
        <button className={button({ variant: "primary", size: "medium" })}>
          Get Started
        </button>
        <button className={button({ variant: "secondary", size: "medium" })}>
          Learn More
        </button>
        <button className={button({ variant: "outline", size: "medium" })}>
          View Docs
        </button>
      </div>
    </div>
  );
}
