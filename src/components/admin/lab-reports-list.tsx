"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  XCircle,
  FileText,
  ExternalLink,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface LabReport {
  id: string;
  title: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  verified: boolean;
  verifiedAt: string | Date | null;
  createdAt: string | Date;
  foodItem: { id: string; name: string };
  uploader: { id: string; name: string | null; email: string };
}

export function AdminLabReportsList({
  reports: initialReports,
}: {
  reports: LabReport[];
}) {
  const [reports, setReports] = useState(initialReports);

  const handleVerify = async (reportId: string, verified: boolean) => {
    const res = await fetch(`/api/admin/lab-reports/${reportId}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verified }),
    });

    if (res.ok) {
      setReports((prev) =>
        prev.map((r) =>
          r.id === reportId
            ? { ...r, verified, verifiedAt: new Date().toISOString() }
            : r
        )
      );
    }
  };

  const pendingReports = reports.filter((r) => !r.verified);
  const verifiedReports = reports.filter((r) => r.verified);

  return (
    <div className="space-y-6">
      {/* Pending */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Clock className="h-5 w-5 text-orange-500" />
          Pending Verification ({pendingReports.length})
        </h3>
        {pendingReports.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center text-muted-foreground text-sm">
              No reports pending verification
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {pendingReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{report.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {report.fileName} &middot; For:{" "}
                        <span className="text-primary">
                          {report.foodItem.name}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded by {report.uploader.name || report.uploader.email}{" "}
                        {formatDistanceToNow(new Date(report.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={report.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </a>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleVerify(report.id, true)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verify
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleVerify(report.id, false)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Verified */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          Verified Reports ({verifiedReports.length})
        </h3>
        {verifiedReports.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center text-muted-foreground text-sm">
              No verified reports yet
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {verifiedReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-3 border rounded-md"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">{report.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {report.foodItem.name} &middot; {report.fileName}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-300"
                >
                  Verified
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
