const CONFIG = {
  Open:        { bg: "#052e16", color: "#22c55e", dot: "#22c55e" },
  "In Progress":{ bg: "#1e3a5f", color: "#60a5fa", dot: "#3b82f6" },
  Closed:      { bg: "#1c1c1f", color: "#6b7280", dot: "#6b7280" },
};

export default function StatusBadge({ status }) {
  const c = CONFIG[status] || CONFIG.Closed;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: c.bg, color: c.color,
      padding: "4px 12px", borderRadius: 20,
      fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.04em",
      fontFamily: "var(--font-head)",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

