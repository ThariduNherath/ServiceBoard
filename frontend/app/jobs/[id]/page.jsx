"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import StatusBadge from "@/components/StatusBadge";
import { getJob, updateStatus, deleteJob } from "@/lib/api";
import Swal from 'sweetalert2';

import { 
  Wrench, 
  Zap, 
  Paintbrush, 
  Hammer, 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Folder, 
  User, 
  Mail, 
  Trash2, 
  Loader2 
} from "lucide-react";

const STATUSES = ["Open", "In Progress", "Closed"];

const ICONS = {
  Plumbing: { icon: <Wrench size={24} />, color: "#60a5fa", bg: "rgba(96, 165, 250, 0.15)" },
  Electrical: { icon: <Zap size={24} />, color: "#fbbf24", bg: "rgba(251, 191, 36, 0.15)" },
  Painting: { icon: <Paintbrush size={24} />, color: "#f472b6", bg: "rgba(244, 114, 182, 0.15)" },
  Joinery: { icon: <Hammer size={24} />, color: "#fb923c", bg: "rgba(251, 146, 60, 0.15)" },
};

export default function JobDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { getJob(id).then(setJob); }, [id]);

  const handleStatus = async (val) => {
    setSaving(true);
    const updated = await updateStatus(id, val);
    setJob(updated);
    setSaving(false);
    
   
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      background: '#1c1c1f',
      color: '#fff'
    });
    Toast.fire({ icon: 'success', title: `Status changed to ${val}` });
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: 'Yes, delete it!',
      background: '#141416', 
      color: '#fff',
    });

    if (result.isConfirmed) {
      try {
        setDeleting(true);
        await deleteJob(id);
        await Swal.fire({
          title: 'Deleted!',
          text: 'The request has been removed.',
          icon: 'success',
          background: '#141416',
          color: '#fff',
          confirmButtonColor: 'var(--amber)'
        });
        router.push("/");
      } catch (error) {
        Swal.fire({ title: 'Error!', icon: 'error', background: '#141416', color: '#fff' });
      } finally {
        setDeleting(false);
      }
    }
  };

  if (!job) return (
    <>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 12 }}>
        <Loader2 className="animate-spin" size={32} color="var(--amber)" />
        <p style={{ color: "var(--muted)" }}>Loading request details...</p>
      </div>
    </>
  );

  const catData = ICONS[job.category] || { icon: <Hammer size={24} />, color: "#9ca3af", bg: "rgba(156, 163, 175, 0.1)" };

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "2.5rem 1.5rem" }}>

        <button onClick={() => router.push("/")} style={{
          background: "none", color: "var(--muted)", fontSize: "0.9rem",
          marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 8,
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.transform = "translateX(-4px)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.transform = "translateX(0)"; }}
        >
          <ArrowLeft size={18} /> Back to Board
        </button>

       
        <div className="fade-up" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "2.5rem", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ background: catData.bg, color: catData.color, padding: 12, borderRadius: 12 }}>
                {catData.icon}
              </div>
              <div>
                <div style={{ marginBottom: 6 }}>
                  <StatusBadge status={job.status} />
                </div>
                <h1 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "2rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{job.title}</h1>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 20, fontSize: "0.9rem", color: "var(--muted)", marginBottom: "2rem", flexWrap: "wrap" }}>
            {job.category && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Folder size={16} /> {job.category}</span>}
            {job.location && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={16} /> {job.location}</span>}
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={16} /> {new Date(job.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
            <p style={{ color: "#c4c0bb", lineHeight: 1.8, fontSize: "1.05rem", whiteSpace: "pre-wrap" }}>{job.description}</p>
          </div>
        </div>

     
        {(job.contactName || job.contactEmail) && (
          <div className="fade-up delay-1" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.5rem", marginBottom: 16 }}>
            <p style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>Contact Information</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
              {job.contactName && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ color: "var(--muted)" }}><User size={20} /></div>
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: 'uppercase' }}>Name</p>
                    <p style={{ fontWeight: 500 }}>{job.contactName}</p>
                  </div>
                </div>
              )}
              {job.contactEmail && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ color: "var(--muted)" }}><Mail size={20} /></div>
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: 'uppercase' }}>Email</p>
                    <p style={{ color: "var(--amber)", fontWeight: 500 }}>{job.contactEmail}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="fade-up delay-2" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <p style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>Update Progress</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {STATUSES.map(s => (
                <button 
                  key={s} 
                  onClick={() => handleStatus(s)} 
                  disabled={saving} 
                  style={{
                    padding: "10px 20px",
                    borderRadius: 12,
                    fontSize: "0.85rem",
                    fontFamily: "var(--font-head)",
                    fontWeight: 700,
                    background: job.status === s ? "var(--amber)" : "var(--surface2)",
                    color: job.status === s ? "#000" : "var(--muted)",
                    border: `1px solid ${job.status === s ? "var(--amber)" : "var(--border)"}`,
                    opacity: saving ? 0.6 : 1,
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => { if(job.status !== s) e.currentTarget.style.borderColor = "var(--muted)"; }}
                  onMouseLeave={e => { if(job.status !== s) e.currentTarget.style.borderColor = "var(--border)"; }}
                >{s}</button>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              onClick={handleDelete} 
              disabled={deleting} 
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                color: "#ef4444",
                fontFamily: "var(--font-head)",
                fontWeight: 700,
                fontSize: "0.9rem",
                padding: "12px 24px",
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                opacity: deleting ? 0.6 : 1,
                transition: "all 0.2s"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#ef4444"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"; e.currentTarget.style.color = "#ef4444"; }}
            >
              {deleting ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
              {deleting ? "Deleting…" : "Delete Request"}
            </button>
          </div>
        </div>

      </main>
    </>
  );
}