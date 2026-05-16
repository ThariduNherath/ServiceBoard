"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  return (
    <nav style={{
      background: "var(--surface)",
      borderBottom: "1px solid var(--border)",
      padding: "0 2rem",
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <Link href="/" style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.02em" }}>
        <span style={{ color: "var(--amber)" }}>Service</span>Board
      </Link>
      {path !== "/new" && (
        <Link href="/new" style={{
          background: "var(--amber)",
          color: "#000",
          padding: "8px 18px",
          borderRadius: "var(--radius-sm)",
          fontWeight: 600,
          fontSize: "0.9rem",
          fontFamily: "var(--font-head)",
          letterSpacing: "0.01em",
        }}>+ New Request</Link>
      )}
    </nav>
  );
}