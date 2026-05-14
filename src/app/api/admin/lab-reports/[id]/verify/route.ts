import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

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

    const { verified } = await req.json();

    const report = await db.labReport.update({
      where: { id },
      data: {
        verified,
        verifiedAt: verified ? new Date() : null,
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Verify lab report error:", error);
    return NextResponse.json(
      { error: "Failed to update lab report" },
      { status: 500 }
    );
  }
}
