import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const dynamic = "force-dynamic";
export const revalidate = 0;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("folder:portfolio_uploads")
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute();

    const files = (result.resources || []).map((r: any) => {
      const publicId = String(r.public_id || "");
      const last = publicId.split("/").pop() || "";
      const urlExt = String(r.secure_url || "").split("?")[0].split(".").pop() || "";
      const ext = String(
        r.format || (last.includes(".") ? last.split(".").pop() : "") || urlExt
      ).toLowerCase();
      const rawName =
        r.original_filename || r.display_name || r.filename || last || "file";
      const name = String(rawName).replace(/\.[^.]+$/, "") || "file";

      return {
        public_id: publicId,
        secure_url: r.secure_url,
        original_filename: name,
        format: ext,
        bytes: r.bytes || 0,
        created_at: r.created_at,
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