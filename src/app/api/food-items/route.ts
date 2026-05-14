import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/food-items - List all food items
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};

    if (category) {
      where.categoryId = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { benefits: { has: search } },
      ];
    }

    const foodItems = await db.foodItem.findMany({
      where,
      include: {
        category: { select: { id: true, name: true, slug: true } },
        _count: { select: { posts: true, labReports: true } },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(foodItems);
  } catch (error) {
    console.error("Get food items error:", error);
    return NextResponse.json(
      { error: "Failed to fetch food items" },
      { status: 500 }
    );
  }
}

// POST /api/food-items - Create a food item (admin only)
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, categoryId, season, region, benefits, nutritionalInfo, image } =
      await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Food item name is required" },
        { status: 400 }
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const foodItem = await db.foodItem.create({
      data: {
        name,
        slug,
        description,
        categoryId: categoryId || null,
        season,
        region,
        benefits: benefits || [],
        nutritionalInfo: nutritionalInfo || null,
        image,
      },
    });

    return NextResponse.json(foodItem, { status: 201 });
  } catch (error) {
    console.error("Create food item error:", error);
    return NextResponse.json(
      { error: "Failed to create food item" },
      { status: 500 }
    );
  }
}
