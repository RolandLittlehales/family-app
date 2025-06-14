import type { Metadata } from "next";
import * as styles from "./page.css";

export const metadata: Metadata = {
  title: "Books - The Family App",
  description: "Discover and manage your family's book collection",
};

export default function BooksPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Family Books</h1>
      <p className={styles.subtitle}>
        Welcome to your family's book collection. Here you can discover,
        organize, and track your reading adventures together.
      </p>

      {/* Stats Overview */}
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>24</span>
          <span className={styles.statLabel}>Total Books</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>3</span>
          <span className={styles.statLabel}>Currently Reading</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>18</span>
          <span className={styles.statLabel}>Completed</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>12</span>
          <span className={styles.statLabel}>Wishlist</span>
        </div>
      </div>

      {/* Feature Cards */}
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.readingListIcon}>📚</div>
          <h3 className={styles.cardTitle}>Reading List</h3>
          <p className={styles.cardDescription}>
            Keep track of books you want to read as a family. Add new
            discoveries and organize your future reading adventures.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.currentlyReadingIcon}>📖</div>
          <h3 className={styles.cardTitle}>Currently Reading</h3>
          <p className={styles.cardDescription}>
            Books that family members are currently enjoying. Track progress and
            share thoughts about ongoing reads.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.completedIcon}>✅</div>
          <h3 className={styles.cardTitle}>Completed</h3>
          <p className={styles.cardDescription}>
            Books you've finished reading together. Rate them, write reviews,
            and remember your favorite family reading moments.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.readingListIcon}>🎯</div>
          <h3 className={styles.cardTitle}>Reading Goals</h3>
          <p className={styles.cardDescription}>
            Set and track reading goals for each family member. Celebrate
            achievements and build healthy reading habits together.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.currentlyReadingIcon}>🏆</div>
          <h3 className={styles.cardTitle}>Recommendations</h3>
          <p className={styles.cardDescription}>
            Discover new books based on your family's reading history and
            preferences. Get personalized suggestions for your next great read.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.completedIcon}>👥</div>
          <h3 className={styles.cardTitle}>Family Library</h3>
          <p className={styles.cardDescription}>
            Manage your physical and digital book collection. Track who has what
            books and coordinate sharing within the family.
          </p>
        </div>
      </div>
    </div>
  );
}
