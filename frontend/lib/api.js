const BASE = process.env.NEXT_PUBLIC_API_URL;
export const getJobs = (p = {}) => fetch(`${BASE}/jobs?${new URLSearchParams(p)}`).then(r => r.json());
export const getJob = id => fetch(`${BASE}/jobs/${id}`).then(r => r.json());
export const createJob = d => fetch(`${BASE}/jobs`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) }).then(r => r.json());
export const updateStatus = (id, status) => fetch(`${BASE}/jobs/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }).then(r => r.json());
export const deleteJob = id => fetch(`${BASE}/jobs/${id}`, { method: "DELETE" }).then(r => r.json());
