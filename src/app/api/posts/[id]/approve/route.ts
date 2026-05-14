import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

// POST /api/posts/[id]/approve - Approve or reject a post (admin only)
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action, reason } = await req.json();

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be 'approve' or 'reject'" },
        { status: 400 }
      );
    }

    const post = await db.post.findUnique({ where: { id } });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const updatedPost = await db.post.update({
      where: { id },
      data: {
        status: action === "approve" ? "APPROVED" : "REJECTED",
        rejectionReason: action === "reject" ? reason : null,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Approve post error:", error);
    return NextResponse.json(
      { error: "Failed to update post status" },
      { status: 500 }
    );
  }
}
