"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { createJob } from "@/lib/api";
import { ArrowLeft, PlusCircle, CheckCircle2 } from "lucide-react";

const CATS = ["Plumbing", "Electrical", "Painting", "Joinery"];


const Field = ({ fieldName, label, required, type = "text", multiline, form, errors, handleInputChange }) => (
  <div>
    <label style={{ display: "block", fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>
      {label}{required && <span style={{ color: "var(--amber)", marginLeft: 4 }}>*</span>}
    </label>
    {multiline ? (
      <textarea 
        name={fieldName}
        rows={4} 
        value={form[fieldName] || ""} 
        onChange={handleInputChange(fieldName)} 
        style={{ resize: "vertical" }} 
      />
    ) : (
      <input 
        type={type} 
        name={fieldName}
        value={form[fieldName] || ""} 
        onChange={handleInputChange(fieldName)} 
      />
    )}
    {errors[fieldName] && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: 6 }}>{errors[fieldName]}</p>}
  </div>
);

export default function NewJob() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", category: "Plumbing", location: "", contactName: "", contactEmail: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.description.trim()) e.description = "Required";
    if (form.contactEmail && !/^\S+@\S+\.\S+$/.test(form.contactEmail)) e.contactEmail = "Invalid email";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setLoading(true);
    const res = await createJob(form);
    if (res._id) router.push(`/jobs/${res._id}`);
    else { setErrors({ api: res.message }); setLoading(false); }
  };

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 640, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        
        <button onClick={() => router.push("/")} style={{
          background: "none", border: "none", color: "var(--muted)", fontSize: "0.9rem",
          marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 8,
          transition: "all 0.2s", cursor: "pointer"
        }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.transform = "translateX(-4px)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.transform = "translateX(0)"; }}
        >
          <ArrowLeft size={18} /> Back to Board
        </button>

        <div className="fade-up" style={{ marginBottom: "2rem" }}>
          <p style={{ color: "var(--amber)", fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Post a Job</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
             <h1 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "2.2rem", letterSpacing: "-0.03em" }}>New Request</h1>
             <PlusCircle size={28} color="var(--amber)" strokeWidth={2.5} />
          </div>
        </div>

        <div className="fade-up delay-1" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {errors.api && <div style={{ background: "#2d0a0a", border: "1px solid #7f1d1d", color: "#ef4444", borderRadius: "var(--radius-sm)", padding: "12px 16px", fontSize: "0.9rem" }}>{errors.api}</div>}

          
          <Field fieldName="title" label="Title" required form={form} errors={errors} handleInputChange={handleInputChange} />
          <Field fieldName="description" label="Description" required multiline form={form} errors={errors} handleInputChange={handleInputChange} />

          <div>
            <label style={{ display: "block", fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>Category</label>
            <select value={form.category} onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}>
              {CATS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <Field fieldName="location" label="Location" form={form} errors={errors} handleInputChange={handleInputChange} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field fieldName="contactName" label="Your Name" form={form} errors={errors} handleInputChange={handleInputChange} />
            <Field fieldName="contactEmail" label="Email" type="email" form={form} errors={errors} handleInputChange={handleInputChange} />
          </div>

          <button onClick={submit} disabled={loading} style={{
            background: loading ? "var(--amber-dim)" : "var(--amber)",
            color: "#000",
            fontFamily: "var(--font-head)",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "0.02em",
            padding: "13px",
            borderRadius: "var(--radius-sm)",
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'all 0.2s',
            boxShadow: '0 4px 14px 0 rgba(251, 191, 36, 0.2)',
            cursor: "pointer"
          }}
          onMouseEnter={e => { if(!loading) e.currentTarget.style.transform = "scale(1.02)"; }}
          onMouseLeave={e => { if(!loading) e.currentTarget.style.transform = "scale(1)"; }}
          >
            {loading ? "Submitting…" : (
              <>
                Submit Request <CheckCircle2 size={18} />
              </>
            )}
          </button>
        </div>
      </main>
    </>
  );
}