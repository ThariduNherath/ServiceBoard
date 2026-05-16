"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import StatusBadge from "@/components/StatusBadge";
import { getJobs } from "@/lib/api";
import { 
  Wrench, 
  Zap, 
  Paintbrush, 
  Hammer, 
  Search, 
  MapPin, 
  Calendar, 
  Folder,
  ClipboardList,
  ChevronRight
} from "lucide-react";

const CATS = ["", "Plumbing", "Electrical", "Painting", "Joinery"];


const ICONS = {
  Plumbing: { icon: <Wrench size={20} />, color: "#60a5fa", bg: "rgba(96, 165, 250, 0.15)" },
  Electrical: { icon: <Zap size={20} />, color: "#fbbf24", bg: "rgba(251, 191, 36, 0.15)" },
  Painting: { icon: <Paintbrush size={20} />, color: "#f472b6", bg: "rgba(244, 114, 182, 0.15)" },
  Joinery: { icon: <Hammer size={20} />, color: "#fb923c", bg: "rgba(251, 146, 60, 0.15)" },
};

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const p = {};
    if (category) p.category = category;
    if (search)   p.search   = search;
    getJobs(p).then(d => { 
      setJobs(Array.isArray(d) ? d : []); 
      setLoading(false); 
    });
  }, [category, search]);

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "2.5rem 1.5rem" }}>

        {/* Header Section */}
        <div className="fade-up" style={{ marginBottom: "2.5rem" }}>
          <p style={{ color: "var(--amber)", fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Dashboard</p>
          <h1 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.2rem)", letterSpacing: "-0.04em", lineHeight: 1 }}>
            Service Requests
          </h1>
          <p style={{ color: "var(--muted)", marginTop: 12, fontSize: "1.05rem", maxWidth: 600 }}>Manage and track all maintenance tasks from a single interface.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="fade-up delay-1" style={{ display: "flex", gap: 12, marginBottom: "2.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 280 }}>
            <Search size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search by title or description..." 
              style={{ paddingLeft: 44, height: 48, background: "var(--surface)", border: "1px solid var(--border)" }} 
            />
          </div>
          <select 
            value={category} 
            onChange={e => setCategory(e.target.value)} 
            style={{ maxWidth: 200, height: 48, background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            {CATS.map(c => <option key={c} value={c}>{c || "All Categories"}</option>)}
          </select>
        </div>

        {/* Status Counters */}
        <div className="fade-up delay-2" style={{ display: "flex", gap: 16, marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {["Open", "In Progress", "Closed"].map(s => {
            const count = jobs.filter(j => j.status === s).length;
            return (
              <div key={s} style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: "var(--radius)", padding: "14px 20px",
                display: "flex", alignItems: "center", gap: 12, flex: "1 1 150px"
              }}>
                <StatusBadge status={s} />
                <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.3rem" }}>{count}</span>
              </div>
            );
          })}
        </div>

        {/* Jobs Listing */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
             <div className="animate-spin" style={{ display: "inline-block", border: "3px solid var(--surface2)", borderTopColor: "var(--amber)", borderRadius: "50%", width: 32, height: 32, marginBottom: 15 }}></div>
             <p style={{ color: "var(--muted)", fontWeight: 500 }}>Syncing with Database...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 2rem", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px dashed var(--border)" }}>
            <ClipboardList size={50} strokeWidth={1.5} style={{ color: "var(--muted)", marginBottom: 16, margin: "0 auto" }} />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: 6 }}>No requests found</h3>
            <p style={{ color: "var(--muted)" }}>Try adjusting your search or category filters.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {jobs.map((job, i) => {
              const catData = ICONS[job.category] || { icon: <Hammer size={20} />, color: "#9ca3af", bg: "rgba(156, 163, 175, 0.1)" };
              
              return (
                <Link key={job._id} href={`/jobs/${job._id}`}
                  className="fade-up"
                  style={{
                    animationDelay: `${0.05 * i}s`,
                    display: "block",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "1.25rem",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    textDecoration: "none"
                  }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.borderColor = "var(--amber)"; 
                    e.currentTarget.style.transform = "translateX(6px)";
                    e.currentTarget.style.background = "var(--surface2)";
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.borderColor = "var(--border)"; 
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.background = "var(--surface)";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 0 }}>
                      {/* Icon with colored background */}
                      <div style={{ 
                        background: catData.bg, 
                        color: catData.color,
                        padding: "12px", 
                        borderRadius: "12px", 
                        display: "flex",
                        flexShrink: 0
                      }}>
                        {catData.icon}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h2 style={{ 
                          fontFamily: "var(--font-head)", 
                          fontWeight: 700, 
                          fontSize: "1.1rem", 
                          color: "var(--text)",
                          marginBottom: 4,
                          whiteSpace: "nowrap", 
                          overflow: "hidden", 
                          textOverflow: "ellipsis" 
                        }}>
                          {job.title}
                        </h2>
                        
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, fontSize: "0.85rem", color: "var(--muted)" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <MapPin size={14} /> {job.location || "Remote"}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <Calendar size={14} /> {new Date(job.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <Folder size={14} /> {job.category || "General"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <StatusBadge status={job.status} />
                      <ChevronRight size={18} style={{ color: "var(--border)" }} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}