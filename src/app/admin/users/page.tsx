import { db } from "@/lib/db";
import { AdminUsersList } from "@/components/admin/users-list";

export default async function AdminUsersPage() {
  const users = await db.user.findMany({
    include: {
      _count: { select: { posts: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">
          Manage user accounts and roles
        </p>
      </div>
      <AdminUsersList users={users} />
    </div>
  );
}
