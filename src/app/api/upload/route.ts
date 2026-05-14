import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

// POST /api/upload - Handle file uploads for lab reports
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const foodItemId = formData.get("foodItemId") as string;

    if (!file || !title || !foodItemId) {
      return NextResponse.json(
        { error: "File, title, and food item are required" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PDF, JPEG, PNG, and WebP files are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 }
      );
    }

    // In production, upload to cloud storage (S3, Vercel Blob, etc.)
    // For now, we'll store file info and simulate upload
    const fileUrl = `/uploads/${Date.now()}-${file.name}`;

    const labReport = await db.labReport.create({
      data: {
        title,
        fileUrl,
        fileName: file.name,
        fileType: file.type,
        foodItemId,
        uploadedBy: session.user.id,
      },
    });

    return NextResponse.json(labReport, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
