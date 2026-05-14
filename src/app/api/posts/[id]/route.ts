import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

// GET /api/posts/[id] - Get a single post
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    const post = await db.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, image: true, bio: true },
        },
        category: true,
        foodItem: true,
        comments: {
          include: {
            user: {
              select: { id: true, name: true, image: true },
            },
            replies: {
              include: {
                user: {
                  select: { id: true, name: true, image: true },
                },
              },
            },
          },
          where: { parentId: null },
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: { likes: true, comments: true },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Only show approved posts to non-admins (unless it's the author)
    if (
      post.status !== "APPROVED" &&
      session?.user?.role !== "ADMIN" &&
      session?.user?.id !== post.authorId
    ) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if current user liked this post
    let userLiked = false;
    if (session?.user?.id) {
      const like = await db.like.findUnique({
        where: {
          postId_userId: { postId: id, userId: session.user.id },
        },
      });
      userLiked = !!like;
    }

    return NextResponse.json({ ...post, userLiked });
  } catch (error) {
    console.error("Get post error:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id] - Delete a post
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await db.post.findUnique({ where: { id } });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Only the author or admin can delete
    if (post.authorId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.post.delete({ where: { id } });

    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
