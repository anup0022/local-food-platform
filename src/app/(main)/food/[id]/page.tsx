import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Leaf,
  MapPin,
  Calendar,
  FlaskConical,
  Heart,
  FileText,
} from "lucide-react";

export default async function FoodDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const foodItem = await db.foodItem.findUnique({
    where: { id },
    include: {
      category: true,
      labReports: {
        where: { verified: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      posts: {
        where: { status: "APPROVED" },
        include: {
          author: { select: { name: true, image: true } },
        },
        take: 5,
        orderBy: { createdAt: "desc" },
      },
      foodSources: {
        include: {
          foodSource: true,
        },
      },
    },
  });

  if (!foodItem) {
    notFound();
  }

  const nutritionalInfo = foodItem.nutritionalInfo as Record<string, string> | null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {foodItem.category && (
                <Badge variant="secondary">{foodItem.category.name}</Badge>
              )}
              {foodItem.season && (
                <Badge variant="outline" className="gap-1">
                  <Calendar className="h-3 w-3" />
                  {foodItem.season}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{foodItem.name}</h1>
            {foodItem.region && (
              <p className="text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                {foodItem.region}
              </p>
            )}
          </div>
          {foodItem.image && (
            <img
              src={foodItem.image}
              alt={foodItem.name}
              className="w-32 h-32 rounded-lg object-cover"
            />
          )}
        </div>
        {foodItem.description && (
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {foodItem.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Benefits */}
        <div className="md:col-span-2 space-y-6">
          {foodItem.benefits.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Health Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {foodItem.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <Leaf className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Related Posts */}
          {foodItem.posts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Community Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {foodItem.posts.map((post: { id: string; title: string; author: { name: string | null; image: string | null } }) => (
                    <a
                      key={post.id}
                      href={`/post/${post.id}`}
                      className="block p-3 border rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <p className="font-medium text-sm">{post.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        by {post.author.name}
                      </p>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Nutritional Info */}
          {nutritionalInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Nutritional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(nutritionalInfo).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between text-sm py-1 border-b last:border-0"
                    >
                      <span className="text-muted-foreground capitalize">
                        {key}
                      </span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lab Reports */}
          {foodItem.labReports.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <FlaskConical className="h-4 w-4" />
                  Verified Lab Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {foodItem.labReports.map((report: { id: string; title: string; fileUrl: string; fileName: string }) => (
                    <a
                      key={report.id}
                      href={report.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 border rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs font-medium">{report.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {report.fileName}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Where to Find */}
          {foodItem.foodSources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  Where to Find
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {foodItem.foodSources.map((source: { id: string; foodSource: { name: string; address: string }; price: string | null }) => (
                    <div
                      key={source.id}
                      className="p-2 border rounded-md text-sm"
                    >
                      <p className="font-medium">
                        {source.foodSource.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {source.foodSource.address}
                      </p>
                      {source.price && (
                        <p className="text-xs text-primary mt-1">
                          {source.price}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
