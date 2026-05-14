import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/location/sources - Get food sources near a location
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lng = parseFloat(searchParams.get("lng") || "0");
    const radius = parseFloat(searchParams.get("radius") || "50"); // km
    const type = searchParams.get("type");

    const where: Record<string, unknown> = {};

    if (type) {
      where.type = type;
    }

    // Get all food sources (in a real app, you'd use PostGIS for geospatial queries)
    const sources = await db.foodSource.findMany({
      where,
      include: {
        foodItems: {
          include: {
            foodItem: { select: { id: true, name: true, image: true } },
          },
        },
      },
      orderBy: { name: "asc" },
    });

    // Calculate distance and filter by radius
    const sourcesWithDistance = sources
      .map((source: { latitude: number; longitude: number }) => {
        const distance = calculateDistance(
          lat,
          lng,
          source.latitude,
          source.longitude
        );
        return { ...source, distance };
      })
      .filter((source: { distance: number }) => source.distance <= radius)
      .sort((a: { distance: number }, b: { distance: number }) => a.distance - b.distance);

    return NextResponse.json(sourcesWithDistance);
  } catch (error) {
    console.error("Get food sources error:", error);
    return NextResponse.json(
      { error: "Failed to fetch food sources" },
      { status: 500 }
    );
  }
}

// Haversine formula to calculate distance between two points
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}
