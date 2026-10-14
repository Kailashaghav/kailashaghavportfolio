// app/api/files/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

export const dynamic = "force-dynamic";
export const revalidate = 0;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const sha = (s: string) => crypto.createHash("sha256").update(s).digest();

function checkAdmin(req: Request): "ok" | "unset" | "denied" {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return "unset";
  const given = req.headers.get("x-admin-password") || "";
  return crypto.timingSafeEqual(sha(given), sha(expected)) ? "ok" : "denied";
}

/* ------------------------------------------------------------------ */
/* GET: list every file in the folder, with its cover image attached   */
/* ------------------------------------------------------------------ */
export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("folder:portfolio_uploads")
      .sort_by("created_at", "desc")
      .max_results(100)
      .with_field("tags")
      .execute();

    const resources: any[] = result.resources || [];

    const uidOf = (r: any): string =>
      (r.tags || []).find((t: string) => t.startsWith("uid_")) || "";
    const isThumb = (r: any): boolean => (r.tags || []).includes("thumb");

    // Cover images are uploaded with the tags: thumb + uid_<same id as the file>
    const thumbs = new Map<string, any>();
    resources.filter(isThumb).forEach((r) => {
      const uid = uidOf(r);
      if (uid) thumbs.set(uid, r);
    });

    const files = resources
      .filter((r) => !isThumb(r))
      .map((r) => {
        const publicId = String(r.public_id || "");
        const last = publicId.split("/").pop() || "";
        const urlExt =
          String(r.secure_url || "").split("?")[0].split(".").pop() || "";
        const ext = String(
          r.format || (last.includes(".") ? last.split(".").pop() : "") || urlExt
        ).toLowerCase();
        const rawName =
          r.original_filename || r.display_name || r.filename || last || "file";
        const name = String(rawName).replace(/\.[^.]+$/, "") || "file";

        const t = thumbs.get(uidOf(r));
        return {
          public_id: publicId,
          secure_url: r.secure_url,
          original_filename: name,
          format: ext,
          bytes: r.bytes || 0,
          created_at: r.created_at,
          thumb_url: t
            ? String(t.secure_url).replace(
                "/upload/",
                "/upload/c_fill,w_640,h_360,q_auto,f_auto/"
              )
            : null,
          thumb_public_id: t ? t.public_id : null,
        };
      });

    return NextResponse.json(
      { success: true, files },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}

/* ------------------------------------------------------------------ */
/* DELETE: admin only. Removes the file and its cover image.           */
/* ------------------------------------------------------------------ */
export async function DELETE(req: Request) {
  const auth = checkAdmin(req);
  if (auth === "unset") {
    return NextResponse.json(
      { success: false, error: "ADMIN_PASSWORD is not set on the server." },
      { status: 500 }
    );
  }
  if (auth === "denied") {
    return NextResponse.json(
      { success: false, error: "Wrong admin password." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const publicId = String(body?.public_id || "");
    const thumbId = body?.thumb_public_id ? String(body.thumb_public_id) : "";
    if (!publicId) {
      return NextResponse.json(
        { success: false, error: "Missing file id." },
        { status: 400 }
      );
    }

    const res = await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
      invalidate: true,
    });
    if (res.result !== "ok" && res.result !== "not found") {
      return NextResponse.json(
        { success: false, error: "Cloudinary could not delete this file." },
        { status: 502 }
      );
    }

    if (thumbId) {
      try {
        await cloudinary.uploader.destroy(thumbId, {
          resource_type: "image",
          invalidate: true,
        });
      } catch {
        /* the cover is optional, ignore */
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Delete failed." },
      { status: 500 }
    );
  }
}
