import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books - The Family App",
  description: "Discover and manage your family's book collection",
};

export default function BooksPage() {
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
        Family Books
      </h1>
      <p
        style={{
          fontSize: "1.125rem",
          color: "#6B7280",
          marginBottom: "2rem",
        }}
      >
        Welcome to your family&apos;s book collection. Here you can discover,
        organize, and track your reading adventures together.
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
            Reading List
          </h3>
          <p style={{ color: "#6B7280" }}>
            Keep track of books you want to read as a family
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
            Currently Reading
          </h3>
          <p style={{ color: "#6B7280" }}>
            Books that family members are currently enjoying
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
            Completed
          </h3>
          <p style={{ color: "#6B7280" }}>
            Books you&apos;ve finished reading together
          </p>
        </div>
      </div>
    </div>
  );
}
