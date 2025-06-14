import type { Metadata } from "next";
import * as styles from "./page.css";

export const metadata: Metadata = {
  title: "Streaming - The Family App",
  description: "Discover and manage your family's streaming content",
};

export default function StreamingPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Family Streaming</h1>
      <p className={styles.subtitle}>
        Discover movies and shows to watch together. Keep track of what's on
        your family's watchlist and what you've enjoyed.
      </p>

      {/* Stats Overview */}
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>47</span>
          <span className={styles.statLabel}>Watchlist Items</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>5</span>
          <span className={styles.statLabel}>Currently Watching</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>23</span>
          <span className={styles.statLabel}>Completed Shows</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>6</span>
          <span className={styles.statLabel}>Active Services</span>
        </div>
      </div>

      {/* Feature Cards */}
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.watchlistIcon}>📺</div>
          <h3 className={styles.cardTitle}>Watchlist</h3>
          <p className={styles.cardDescription}>
            Movies and shows you want to watch together. Add recommendations
            from family members and discover new content to enjoy.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.currentlyWatchingIcon}>🎬</div>
          <h3 className={styles.cardTitle}>Currently Watching</h3>
          <p className={styles.cardDescription}>
            Shows and series you're currently enjoying as a family. Track
            episodes and coordinate viewing schedules.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.favoritesIcon}>⭐</div>
          <h3 className={styles.cardTitle}>Favorites</h3>
          <p className={styles.cardDescription}>
            Movies and shows your family has loved watching together. Rate and
            review your favorite entertainment experiences.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.servicesIcon}>🎭</div>
          <h3 className={styles.cardTitle}>Streaming Services</h3>
          <p className={styles.cardDescription}>
            Manage your family's streaming service subscriptions. Track costs,
            usage, and discover which services offer the best value.
          </p>

          {/* Popular Services Preview */}
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div style={{ fontSize: "1.5rem" }}>📺</div>
              <div className={styles.serviceName}>Netflix</div>
            </div>
            <div className={styles.serviceCard}>
              <div style={{ fontSize: "1.5rem" }}>🎬</div>
              <div className={styles.serviceName}>Disney+</div>
            </div>
            <div className={styles.serviceCard}>
              <div style={{ fontSize: "1.5rem" }}>📺</div>
              <div className={styles.serviceName}>Prime Video</div>
            </div>
            <div className={styles.serviceCard}>
              <div style={{ fontSize: "1.5rem" }}>🎭</div>
              <div className={styles.serviceName}>Hulu</div>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.currentlyWatchingIcon}>🎯</div>
          <h3 className={styles.cardTitle}>Recommendations</h3>
          <p className={styles.cardDescription}>
            Get personalized recommendations based on your family's viewing
            history and preferences. Discover hidden gems and trending content.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.favoritesIcon}>📊</div>
          <h3 className={styles.cardTitle}>Watch Statistics</h3>
          <p className={styles.cardDescription}>
            Track your family's viewing habits, screen time, and favorite
            genres. Get insights into your entertainment preferences.
          </p>
        </div>
      </div>
    </div>
  );
}
