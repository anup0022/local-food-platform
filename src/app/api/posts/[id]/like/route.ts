import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

// POST /api/posts/[id]/like - Toggle like on a post
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingLike = await db.like.findUnique({
      where: {
        postId_userId: { postId: id, userId: session.user.id },
      },
    });

    if (existingLike) {
      // Unlike
      await db.like.delete({ where: { id: existingLike.id } });
      return NextResponse.json({ liked: false });
    } else {
      // Like
      await db.like.create({
        data: { postId: id, userId: session.user.id },
      });
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error("Like error:", error);
    return NextResponse.json(
      { error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
