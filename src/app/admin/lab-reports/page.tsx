import { db } from "@/lib/db";
import { AdminLabReportsList } from "@/components/admin/lab-reports-list";

export default async function AdminLabReportsPage() {
  const reports = await db.labReport.findMany({
    include: {
      foodItem: { select: { id: true, name: true } },
      uploader: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Lab Reports</h1>
        <p className="text-muted-foreground">
          Review and verify uploaded lab reports
        </p>
      </div>
      <AdminLabReportsList reports={reports} />
    </div>
  );
}
