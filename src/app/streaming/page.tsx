import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Streaming - The Family App",
  description: "Discover and manage your family's streaming content",
};

export default function StreamingPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#111827",
        }}
      >
        Family Streaming
      </h1>
      <p
        style={{
          fontSize: "1.125rem",
          color: "#6B7280",
          marginBottom: "2rem",
        }}
      >
        Discover movies and shows to watch together. Keep track of what&apos;s
        on your family&apos;s watchlist and what you&apos;ve enjoyed.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #E5E7EB",
            borderRadius: "0.5rem",
            backgroundColor: "#F9FAFB",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Watchlist
          </h3>
          <p style={{ color: "#6B7280" }}>
            Movies and shows you want to watch together
          </p>
        </div>

        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #E5E7EB",
            borderRadius: "0.5rem",
            backgroundColor: "#F9FAFB",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Currently Watching
          </h3>
          <p style={{ color: "#6B7280" }}>
            Shows and series you&apos;re currently enjoying as a family
          </p>
        </div>

        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #E5E7EB",
            borderRadius: "0.5rem",
            backgroundColor: "#F9FAFB",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Favorites
          </h3>
          <p style={{ color: "#6B7280" }}>
            Movies and shows your family has loved watching together
          </p>
        </div>

        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #E5E7EB",
            borderRadius: "0.5rem",
            backgroundColor: "#F9FAFB",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Streaming Services
          </h3>
          <p style={{ color: "#6B7280" }}>
            Manage your family&apos;s streaming service subscriptions
          </p>
        </div>
      </div>
    </div>
  );
}
