import { db } from "@/lib/db";
import { AdminFoodItemsList } from "@/components/admin/food-items-list";

export default async function AdminFoodItemsPage() {
  const foodItems = await db.foodItem.findMany({
    include: {
      category: { select: { id: true, name: true, slug: true } },
      _count: { select: { posts: true, labReports: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Food Items Database</h1>
        <p className="text-muted-foreground">
          Manage the local food database
        </p>
      </div>
      <AdminFoodItemsList foodItems={foodItems} />
    </div>
  );
}
