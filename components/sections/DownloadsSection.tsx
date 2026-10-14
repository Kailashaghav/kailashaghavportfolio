"use client";

// components/sections/DownloadsSection.tsx
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ----------------------------- config ----------------------------- */
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "lpibhuph";
const PRESET = "portfolio_uploads";
const FOLDER = "portfolio_uploads";
const ACCEPT = ".pdf,.pptx,.ppt,.docx,.doc";
const TABS = ["All", "PDF", "PPTX", "Other"] as const;
type Tab = (typeof TABS)[number];

interface CloudFile {
  public_id: string;
  secure_url: string;
  original_filename: string;
  format: string;
  bytes: number;
  created_at: string;
  thumb_url?: string | null;
  thumb_public_id?: string | null;
}

type ToastState = { kind: "ok" | "err" | "info"; text: string } | null;

/* ----------------------------- helpers ----------------------------- */
const isPpt = (f: string) => ["pptx", "ppt"].includes(f);
const isDoc = (f: string) => ["docx", "doc"].includes(f);

function matchesTab(format: string, tab: Tab) {
  if (tab === "All") return true;
  if (tab === "PDF") return format === "pdf";
  if (tab === "PPTX") return isPpt(format);
  return format !== "pdf" && !isPpt(format);
}

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function getExt(name: string) {
  const m = name.toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? m[1] : "";
}

function getIcon(format: string) {
  if (format === "pdf") return "📄";
  if (isPpt(format)) return "📊";
  if (isDoc(format)) return "📝";
  return "📁";
}

function getColor(format: string) {
  if (format === "pdf") return "#ff4d1c";
  if (isPpt(format)) return "#f59e0b";
  if (isDoc(format)) return "#38bdf8";
  return "#a78bfa";
}

function previewUrl(file: CloudFile) {
  if (file.format === "pdf") return file.secure_url;
  if (isPpt(file.format) || isDoc(file.format)) {
    return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
      file.secure_url
    )}`;
  }
  return null;
}

/** PowerPoint and Word files usually carry a small first-page image inside the zip. */
async function extractEmbeddedThumb(file: File): Promise<Blob | null> {
  try {
    const JSZip = (await import("jszip")).default;
    const zip = await JSZip.loadAsync(file);
    const entry = zip.file(/^docProps\/thumbnail\.(jpe?g|png)$/i)[0];
    if (!entry) return null;
    const buf = await entry.async("arraybuffer");
    const isPng = /\.png$/i.test(entry.name);
    return new Blob([buf], { type: isPng ? "image/png" : "image/jpeg" });
  } catch {
    return null;
  }
}

function uploadToCloudinary(
  file: Blob,
  opts: {
    resource: "raw" | "image";
    tags: string;
    filename?: string;
    onProgress?: (pct: number) => void;
  }
): Promise<any> {
  return new Promise((resolve, reject) => {
    const fd = new FormData();
    const name = opts.filename ?? (file instanceof File ? file.name : "upload");
    fd.append("file", file, name);
    fd.append("upload_preset", PRESET);
    fd.append("folder", FOLDER);
    fd.append("tags", opts.tags);

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${CLOUD}/${opts.resource}/upload`
    );
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && opts.onProgress) {
        opts.onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status < 300 && data.secure_url) resolve(data);
        else reject(new Error(data?.error?.message || "Upload failed."));
      } catch {
        reject(new Error("Upload failed."));
      }
    };
    xhr.onerror = () => reject(new Error("Network error. Check your connection."));
    xhr.send(fd);
  });
}

/* ----------------------------- icons ----------------------------- */
const Svg = ({ children }: { children: React.ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);
const IconDownload = () => (
  <Svg>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </Svg>
);
const IconEye = () => (
  <Svg>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);
const IconTrash = () => (
  <Svg>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </Svg>
);
const IconLock = () => (
  <Svg>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Svg>
);
const IconUpload = () => (
  <Svg>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </Svg>
);
const IconSearch = () => (
  <Svg>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Svg>
);

/* ----------------------------- small components ----------------------------- */
function Placeholder({ format }: { format: string }) {
  const c = getColor(format);
  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={{
        background: `radial-gradient(120% 120% at 0% 0%, ${c}33 0%, transparent 60%), linear-gradient(135deg, #0d0d14 0%, #07070b 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative flex flex-col items-center gap-2">
        <span className="text-5xl">{getIcon(format)}</span>
        <span className="font-display text-2xl tracking-widest" style={{ color: c }}>
          {(format || "file").toUpperCase()}
        </span>
      </div>
    </div>
  );
}

function Thumb({
  url,
  format,
  name,
}: {
  url?: string | null;
  format: string;
  name: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!url || failed) return <Placeholder format={format} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={`Cover of ${name}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
    />
  );
}

function FileCard({
  file,
  isAdmin,
  confirming,
  deleting,
  onAskDelete,
  onCancel,
  onDelete,
}: {
  file: CloudFile;
  isAdmin: boolean;
  confirming: boolean;
  deleting: boolean;
  onAskDelete: () => void;
  onCancel: () => void;
  onDelete: () => void;
}) {
  const color = getColor(file.format);
  const name = (file.original_filename || "Untitled").replace(/_/g, " ");
  const preview = previewUrl(file);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col overflow-hidden border border-white/10 bg-void/50 transition-colors duration-300 hover:border-white/25"
    >
      {/* cover */}
      <div className="relative aspect-video overflow-hidden bg-black">
        <Thumb url={file.thumb_url} format={file.format} name={name} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />

        <span
          className="absolute left-3 top-3 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
          style={{ background: color, color: "#07070b" }}
        >
          {file.format || "file"}
        </span>

        {isAdmin && !confirming && (
          <button
            onClick={onAskDelete}
            aria-label={`Delete ${name}`}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center border border-white/20 bg-black/70 text-ghost backdrop-blur transition-colors hover:border-red-500 hover:bg-red-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            <IconTrash />
          </button>
        )}

        {/* delete confirmation */}
        <AnimatePresence>
          {confirming && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/90 p-4 text-center"
            >
              <p className="font-mono text-xs text-ghost">
                Delete this file for good? This can&apos;t be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onDelete}
                  disabled={deleting}
                  className="bg-red-600 px-4 py-2 font-mono text-xs text-white transition-colors hover:bg-red-500 disabled:opacity-60"
                >
                  {deleting ? "Deleting…" : "Yes, delete"}
                </button>
                <button
                  onClick={onCancel}
                  disabled={deleting}
                  className="border border-white/20 px-4 py-2 font-mono text-xs text-ghost transition-colors hover:border-white/50"
                >
                  Keep it
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* details */}
      <div className="flex flex-1 flex-col gap-5 p-5">
        <div>
          <h3
            title={name}
            className="font-display text-lg leading-tight text-ghost"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              wordBreak: "break-word",
            }}
          >
            {name}
          </h3>
          <div className="mt-2 flex items-center gap-3 font-mono text-xs text-muted">
            <span>{formatSize(file.bytes)}</span>
            <span className="h-3 w-px bg-white/15" />
            <span>
              {new Date(file.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <a
            href={file.secure_url}
            download
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ background: color, color: "#07070b", outlineColor: color }}
          >
            <IconDownload />
            Download
          </a>
          {preview && (
            <a
              href={preview}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/15 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-ghost transition-colors hover:border-white/40"
            >
              <IconEye />
              Preview
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ----------------------------- main section ----------------------------- */
export default function DownloadsSection() {
  const [files, setFiles] = useState<CloudFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [query, setQuery] = useState("");

  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [pending, setPending] = useState<File | null>(null);
  const [autoThumb, setAutoThumb] = useState<Blob | null>(null);
  const [customThumb, setCustomThumb] = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLInputElement>(null);
  const pickToken = useRef(0);
  // Cloudinary search can lag a few seconds, so remember local changes.
  const addedRef = useRef<Map<string, CloudFile>>(new Map());
  const deletedRef = useRef<Set<string>>(new Set());

  const notify = useCallback(
    (kind: "ok" | "err" | "info", text: string) => setToast({ kind, text }),
    []
  );

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), toast.kind === "err" ? 6000 : 3500);
    return () => clearTimeout(t);
  }, [toast]);

  /* ---------- load files ---------- */
  const fetchFiles = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const res = await fetch("/api/files", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        const server: CloudFile[] = (data.files as CloudFile[]).filter(
          (f) => !deletedRef.current.has(f.public_id)
        );
        const ids = new Set(server.map((f) => f.public_id));
        addedRef.current.forEach((_, id) => {
          if (ids.has(id)) addedRef.current.delete(id);
        });
        setFiles([...Array.from(addedRef.current.values()), ...server]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  /* ---------- cover preview for the file being uploaded ---------- */
  useEffect(() => {
    const src = customThumb || autoThumb;
    if (!src) {
      setThumbPreview(null);
      return;
    }
    const url = URL.createObjectURL(src);
    setThumbPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [customThumb, autoThumb]);

  /* ---------- derived lists ---------- */
  const counts = useMemo(
    () => ({
      All: files.length,
      PDF: files.filter((f) => matchesTab(f.format, "PDF")).length,
      PPTX: files.filter((f) => matchesTab(f.format, "PPTX")).length,
      Other: files.filter((f) => matchesTab(f.format, "Other")).length,
    }),
    [files]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return files.filter(
      (f) =>
        matchesTab(f.format, activeTab) &&
        (!q || (f.original_filename || "").toLowerCase().includes(q))
    );
  }, [files, activeTab, query]);

  /* ---------- admin: login / logout ---------- */
  const login = async () => {
    if (!password.trim()) return;
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdmin(true);
        setAdminPass(password);
        setPassword("");
        notify("ok", "Admin mode is on.");
      } else {
        notify("err", data.error || "Wrong password.");
      }
    } catch {
      notify("err", "Couldn't reach the server. Try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  const clearPending = () => {
    pickToken.current++;
    setPending(null);
    setAutoThumb(null);
    setCustomThumb(null);
    setProgress(0);
  };

  const logout = () => {
    setIsAdmin(false);
    setAdminPass("");
    setPassword("");
    setShowAdmin(false);
    setConfirmId(null);
    clearPending();
  };

  /* ---------- admin: choose + upload ---------- */
  const pickFile = async (file: File | undefined | null) => {
    if (!file) return;
    const ext = getExt(file.name);
    if (!ACCEPT.split(",").includes("." + ext)) {
      notify("err", "Choose a PDF, PowerPoint or Word file.");
      return;
    }
    const token = ++pickToken.current;
    setPending(file);
    setCustomThumb(null);
    setAutoThumb(null);
    setProgress(0);
    if (ext === "pptx" || ext === "docx") {
      const t = await extractEmbeddedThumb(file);
      if (token === pickToken.current) setAutoThumb(t);
    }
  };

  const doUpload = async () => {
    if (!pending) return;
    setUploading(true);
    setProgress(0);
    const uid = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

    try {
      const fileRes = await uploadToCloudinary(pending, {
        resource: "raw",
        tags: `uid_${uid}`,
        onProgress: setProgress,
      });

      // The cover is optional. If it fails, the file is still saved.
      let thumbRes: any = null;
      const coverSource: Blob | null = customThumb || autoThumb;
      if (coverSource) {
        try {
          const isPng = coverSource.type === "image/png";
          thumbRes = await uploadToCloudinary(coverSource, {
            resource: "image",
            tags: `thumb,uid_${uid}`,
            filename:
              coverSource instanceof File
                ? coverSource.name
                : `cover.${isPng ? "png" : "jpg"}`,
          });
        } catch {
          notify("info", "File saved, but the cover image didn't upload.");
        }
      }

      const ext = getExt(pending.name);
      const item: CloudFile = {
        public_id: fileRes.public_id,
        secure_url: fileRes.secure_url,
        original_filename: pending.name.replace(/\.[^.]+$/, ""),
        format: ext,
        bytes: fileRes.bytes || pending.size,
        created_at: fileRes.created_at || new Date().toISOString(),
        thumb_url: thumbRes
          ? String(thumbRes.secure_url).replace(
              "/upload/",
              "/upload/c_fill,w_640,h_360,q_auto,f_auto/"
            )
          : null,
        thumb_public_id: thumbRes ? thumbRes.public_id : null,
      };
      addedRef.current.set(item.public_id, item);
      setFiles((prev) => [item, ...prev.filter((f) => f.public_id !== item.public_id)]);
      notify("ok", "Uploaded. It's live on your site.");
      clearPending();
      setTimeout(() => fetchFiles(true), 5000);
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  /* ---------- admin: delete ---------- */
  const handleDelete = async (file: CloudFile) => {
    setDeletingId(file.public_id);
    try {
      const res = await fetch("/api/files", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPass,
        },
        body: JSON.stringify({
          public_id: file.public_id,
          thumb_public_id: file.thumb_public_id || null,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Delete failed.");
      deletedRef.current.add(file.public_id);
      addedRef.current.delete(file.public_id);
      setFiles((prev) => prev.filter((f) => f.public_id !== file.public_id));
      notify("ok", "File deleted.");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  const pendingExt = pending ? getExt(pending.name) : "";
  const coverNote = customThumb
    ? "Using the cover image you chose."
    : autoThumb
    ? "Cover found inside the file."
    : "No cover found in this file. Add an image, or a file-type tile will be shown.";

  /* ----------------------------- render ----------------------------- */
  return (
    <section id="downloads" className="relative section-pad overflow-hidden bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-ember tracking-widest">07 /</span>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">Downloads</span>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>

        {/* title + admin toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-ghost"
          >
            FILES &amp;
            <br />
            <span className="text-ember">RESOURCES</span>
          </motion.h2>

          <button
            onClick={() => setShowAdmin((v) => !v)}
            aria-expanded={showAdmin}
            className={`inline-flex items-center gap-2 border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
              isAdmin
                ? "border-aurora/50 text-aurora"
                : "border-white/10 text-muted hover:border-ember/50 hover:text-ember"
            }`}
          >
            {isAdmin ? <IconUpload /> : <IconLock />}
            {isAdmin ? "Manage files" : "Admin"}
          </button>
        </div>

        {/* admin panel */}
        <AnimatePresence initial={false}>
          {showAdmin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10 overflow-hidden"
            >
              <div className="border border-white/10 bg-void/40 p-6 md:p-8">
                {!isAdmin ? (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                    <label className="flex flex-1 flex-col gap-2 sm:max-w-sm">
                      <span className="font-mono text-xs text-muted">Admin password</span>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && login()}
                        autoComplete="current-password"
                        className="border border-white/10 bg-void/60 px-4 py-2.5 font-mono text-sm text-ghost focus:border-ember/60 focus:outline-none"
                      />
                    </label>
                    <button
                      onClick={login}
                      disabled={loggingIn || !password.trim()}
                      className="bg-ember px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-void transition-colors hover:bg-ghost disabled:opacity-50"
                    >
                      {loggingIn ? "Checking…" : "Log in"}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-mono text-xs text-aurora">
                        Admin mode is on. You can upload files here and delete them from any card.
                      </p>
                      <button
                        onClick={logout}
                        className="font-mono text-xs text-muted transition-colors hover:text-ghost"
                      >
                        Log out
                      </button>
                    </div>

                    <input
                      ref={fileRef}
                      type="file"
                      accept={ACCEPT}
                      className="hidden"
                      onChange={(e) => {
                        pickFile(e.target.files?.[0]);
                        e.target.value = "";
                      }}
                    />
                    <input
                      ref={thumbRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) setCustomThumb(f);
                        e.target.value = "";
                      }}
                    />

                    {!pending ? (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => fileRef.current?.click()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            fileRef.current?.click();
                          }
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragOver(true);
                        }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOver(false);
                          pickFile(e.dataTransfer.files?.[0]);
                        }}
                        className={`flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed px-6 py-12 text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember ${
                          dragOver
                            ? "border-ember bg-ember/10"
                            : "border-white/15 hover:border-ember/50 hover:bg-white/[0.02]"
                        }`}
                      >
                        <span className="text-ember">
                          <IconUpload />
                        </span>
                        <p className="font-display text-xl text-ghost">
                          Drop a file here, or click to browse
                        </p>
                        <p className="max-w-md font-mono text-xs leading-relaxed text-muted">
                          PDF, PowerPoint or Word files. PowerPoint covers are picked up
                          automatically when the file has one.
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-6 md:flex-row">
                        <div className="relative aspect-video w-full shrink-0 overflow-hidden border border-white/10 bg-black md:w-72">
                          {thumbPreview ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={thumbPreview}
                              alt="Cover preview"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Placeholder format={pendingExt} />
                          )}
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col gap-4">
                          <div className="min-w-0">
                            <p className="truncate font-display text-lg text-ghost">
                              {pending.name}
                            </p>
                            <p className="mt-1 font-mono text-xs leading-relaxed text-muted">
                              {formatSize(pending.size)}. {coverNote}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={doUpload}
                              disabled={uploading}
                              className="inline-flex items-center gap-2 bg-ember px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-void transition-colors hover:bg-ghost disabled:opacity-60"
                            >
                              <IconUpload />
                              {uploading ? "Uploading…" : "Upload file"}
                            </button>
                            <button
                              onClick={() => thumbRef.current?.click()}
                              disabled={uploading}
                              className="border border-white/15 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-ghost transition-colors hover:border-white/40 disabled:opacity-60"
                            >
                              {customThumb ? "Change cover" : "Add cover image"}
                            </button>
                            {customThumb && (
                              <button
                                onClick={() => setCustomThumb(null)}
                                disabled={uploading}
                                className="px-3 py-2.5 font-mono text-xs text-muted transition-colors hover:text-ghost"
                              >
                                Remove cover
                              </button>
                            )}
                            <button
                              onClick={clearPending}
                              disabled={uploading}
                              className="px-3 py-2.5 font-mono text-xs text-muted transition-colors hover:text-ghost"
                            >
                              Cancel
                            </button>
                          </div>

                          {uploading && (
                            <div className="flex items-center gap-3">
                              <div className="h-1 flex-1 bg-white/10">
                                <div
                                  className="h-full bg-ember transition-[width] duration-200"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <span className="w-10 text-right font-mono text-xs text-muted">
                                {progress}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* tabs + search */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  aria-pressed={active}
                  className="px-5 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-300"
                  style={{
                    border: `1px solid ${active ? "#ff4d1c" : "rgba(255,255,255,0.1)"}`,
                    color: active ? "#ff4d1c" : "#5a5a72",
                    background: active ? "rgba(255,77,28,0.08)" : "transparent",
                  }}
                >
                  {tab} ({counts[tab]})
                </button>
              );
            })}
          </div>

          <label className="relative block w-full md:w-72">
            <span className="sr-only">Search files</span>
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              <IconSearch />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search files"
              className="w-full border border-white/10 bg-void/40 py-2.5 pl-10 pr-4 font-mono text-xs text-ghost placeholder:text-muted focus:border-ember/60 focus:outline-none"
            />
          </label>
        </div>

        {/* grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="animate-pulse border border-white/5 bg-void/40">
                <div className="aspect-video bg-white/5" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-3/4 bg-white/5" />
                  <div className="h-3 w-1/3 bg-white/5" />
                  <div className="h-10 w-full bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="border border-dashed border-white/10 py-20 text-center">
            <p className="font-display text-2xl text-ghost">
              {files.length === 0 ? "No files yet" : "Nothing matches that"}
            </p>
            <p className="mt-2 font-mono text-xs text-muted">
              {files.length === 0
                ? "Log in as admin to upload your first file."
                : "Try another tab or a different search."}
            </p>
          </div>
        ) : (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filtered.map((file) => (
                <FileCard
                  key={file.public_id}
                  file={file}
                  isAdmin={isAdmin}
                  confirming={confirmId === file.public_id}
                  deleting={deletingId === file.public_id}
                  onAskDelete={() => setConfirmId(file.public_id)}
                  onCancel={() => setConfirmId(null)}
                  onDelete={() => handleDelete(file)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.text}
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 right-6 z-[100] max-w-sm border bg-void/95 px-5 py-3 font-mono text-xs backdrop-blur"
            style={{
              borderColor:
                toast.kind === "err" ? "#ff4d1c" : toast.kind === "ok" ? "#00ffd1" : "rgba(255,255,255,0.25)",
              color: toast.kind === "err" ? "#ff4d1c" : toast.kind === "ok" ? "#00ffd1" : "#e8e8f0",
            }}
          >
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
