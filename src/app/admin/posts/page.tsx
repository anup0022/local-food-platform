import { db } from "@/lib/db";
import { AdminPostsList } from "@/components/admin/posts-list";

export default async function AdminPostsPage() {
  const posts = await db.post.findMany({
    include: {
      author: { select: { id: true, name: true, email: true, image: true } },
      category: { select: { id: true, name: true } },
    },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Post Management</h1>
        <p className="text-muted-foreground">
          Review, approve, or reject community posts
        </p>
      </div>
      <AdminPostsList posts={posts} />
    </div>
  );
}
