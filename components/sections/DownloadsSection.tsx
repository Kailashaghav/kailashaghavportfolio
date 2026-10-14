"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = ["All", "PDF", "PPTX", "Other"];
const ADMIN_PASSWORD = "kailash2026";

interface CloudFile {
  public_id: string;
  secure_url: string;
  original_filename: string;
  format: string;
  bytes: number;
  created_at: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function getIcon(format: string) {
  if (format === "pdf") return "📄";
  if (["pptx", "ppt"].includes(format)) return "📊";
  if (["docx", "doc"].includes(format)) return "📝";
  return "📁";
}

function getColor(format: string) {
  if (format === "pdf") return "#ff4d1c";
  if (["pptx", "ppt"].includes(format)) return "#f59e0b";
  if (["docx", "doc"].includes(format)) return "#38bdf8";
  return "#a78bfa";
}

export default function DownloadsSection() {
  const [activeTab, setActiveTab] = useState("All");
  const [files, setFiles] = useState<CloudFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/files");
      const data = await res.json();
      if (data.success) setFiles(data.files);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFiles(); }, []);

  const filtered = files.filter((f) => {
    if (activeTab === "All") return true;
    if (activeTab === "PDF") return f.format === "pdf";
    if (activeTab === "PPTX") return ["pptx", "ppt"].includes(f.format);
    return !["pdf", "pptx", "ppt"].includes(f.format);
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadMsg("Uploading...");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "portfolio_uploads");
      formData.append("folder", "portfolio_uploads");
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/lpibhuph/raw/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.secure_url) {
        setUploadMsg("✅ Uploaded successfully!");
        await fetchFiles();
      } else {
        setUploadMsg("❌ Upload failed. Check upload preset.");
      }
    } catch {
      setUploadMsg("❌ Upload error.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <section id="downloads" className="relative section-pad overflow-hidden bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-ember tracking-widest">07 /</span>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">Downloads</span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-ghost">
            FILES &amp;<br /><span className="text-ember">RESOURCES</span>
          </motion.h2>

          <button onClick={() => setShowAdmin(!showAdmin)} className="font-mono text-xs text-muted tracking-widest uppercase border border-white/10 px-4 py-2 hover:border-ember/50 hover:text-ember transition-all duration-300">
            {isAdmin ? "⬆ Upload File" : "🔐 Admin"}
          </button>
        </div>

        {/* Admin Panel */}
        <AnimatePresence>
          {showAdmin && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-10 border border-white/10 p-6 bg-void/40">
              {!isAdmin ? (
                <div className="flex gap-4 items-center">
                  <input type="password" placeholder="Enter admin password" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="bg-void/60 border border-white/10 px-4 py-2 font-mono text-sm text-ghost focus:outline-none focus:border-ember/60 w-64"
                  />
                  <button onClick={() => { if (password === ADMIN_PASSWORD) { setIsAdmin(true); setUploadMsg(""); } else setUploadMsg("❌ Wrong password"); }}
                    className="px-6 py-2 bg-ember text-void font-mono text-xs tracking-widest uppercase hover:bg-ghost transition-colors">
                    Login
                  </button>
                  {uploadMsg && <p className="font-mono text-xs text-muted">{uploadMsg}</p>}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="font-mono text-xs text-aurora tracking-widest uppercase">✅ Admin logged in — upload any PDF or PPTX</p>
                  <div className="flex gap-4 items-center flex-wrap">
                    <input ref={fileRef} type="file" accept=".pdf,.pptx,.ppt,.docx,.doc" onChange={handleUpload} disabled={uploading}
                      className="font-mono text-xs text-muted file:mr-4 file:py-2 file:px-4 file:border file:border-ember file:text-ember file:bg-transparent file:font-mono file:text-xs file:cursor-pointer hover:file:bg-ember hover:file:text-void file:transition-all"
                    />
                    {uploadMsg && <p className="font-mono text-xs" style={{ color: uploadMsg.includes("✅") ? "#00ffd1" : "#ff4d1c" }}>{uploadMsg}</p>}
                  </div>
                  <button onClick={() => { setIsAdmin(false); setPassword(""); setShowAdmin(false); }} className="self-start font-mono text-xs text-muted hover:text-ghost transition-colors">
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-5 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-300"
              style={{ border: `1px solid ${activeTab === tab ? "#ff4d1c" : "rgba(255,255,255,0.1)"}`, color: activeTab === tab ? "#ff4d1c" : "#5a5a72", background: activeTab === tab ? "rgba(255,77,28,0.08)" : "transparent" }}
            >
              {tab} {tab !== "All" && `(${files.filter(f => tab === "PDF" ? f.format === "pdf" : tab === "PPTX" ? ["pptx","ppt"].includes(f.format) : !["pdf","pptx","ppt"].includes(f.format)).length})`}
            </button>
          ))}
        </div>

        {/* Files Grid */}
        {loading ? (
          <div className="py-20 text-center"><p className="font-mono text-muted text-sm animate-pulse">Loading files...</p></div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center"><p className="font-mono text-muted text-sm">No files yet. Upload via Admin panel.</p></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((file) => (
              <motion.div key={file.public_id} whileHover={{ y: -4 }}
                className="group relative border border-white/5 bg-void/40 hover:border-white/15 transition-all duration-500 p-6 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${getColor(file.format)}, transparent)` }} />
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{getIcon(file.format)}</span>
                  <div className="flex gap-2">
                    <span className="font-mono text-xs px-2 py-1 border border-white/10 text-muted uppercase">{file.format}</span>
                    <span className="font-mono text-xs px-2 py-1 border border-white/10 text-muted">{formatSize(file.bytes)}</span>
                  </div>
                </div>
                <p className="font-mono text-xs text-muted tracking-widest uppercase mb-2">{new Date(file.created_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</p>
                <h3 className="font-display text-ghost text-base leading-tight mb-6">{file.original_filename.replace(/_/g, " ")}</h3>
                <a href={file.secure_url} download target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-all duration-300 px-4 py-2 border"
                  style={{ borderColor: getColor(file.format), color: getColor(file.format) }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </a>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: getColor(file.format) }} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
