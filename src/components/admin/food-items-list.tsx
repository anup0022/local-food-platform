"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Apple, Search, FileText, FlaskConical } from "lucide-react";

interface FoodItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  season: string | null;
  region: string | null;
  benefits: string[];
  image: string | null;
  category: { id: string; name: string; slug: string } | null;
  _count: { posts: number; labReports: number };
}

export function AdminFoodItemsList({
  foodItems: initialItems,
}: {
  foodItems: FoodItem[];
}) {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    season: "",
    region: "",
    benefits: "",
  });
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/food-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        benefits: formData.benefits
          .split("\n")
          .filter((b) => b.trim()),
      }),
    });

    if (res.ok) {
      const newItem = await res.json();
      setItems((prev) => [...prev, { ...newItem, _count: { posts: 0, labReports: 0 } }]);
      setDialogOpen(false);
      setFormData({ name: "", description: "", season: "", region: "", benefits: "" });
    }
    setLoading(false);
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.region?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search food items..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger className="inline-flex items-center justify-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
            Add Food Item
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Food Item</DialogTitle>
              <DialogDescription>
                Add a local food item to the database
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Turmeric, Amla, Ragi"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the food item..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, description: e.target.value }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="season">Season</Label>
                  <Input
                    id="season"
                    placeholder="e.g., Summer, All Year"
                    value={formData.season}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, season: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    placeholder="e.g., South India, Punjab"
                    value={formData.region}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, region: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits (one per line)</Label>
                <Textarea
                  id="benefits"
                  placeholder={"Rich in antioxidants\nBoosts immunity\nAnti-inflammatory properties"}
                  value={formData.benefits}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, benefits: e.target.value }))
                  }
                  className="min-h-[100px]"
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Food Item"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Apple className="h-4 w-4 text-primary" />
                  {item.name}
                </CardTitle>
                {item.category && (
                  <Badge variant="secondary" className="text-xs">
                    {item.category.name}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {item.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              )}
              <div className="flex flex-wrap gap-1">
                {item.season && (
                  <Badge variant="outline" className="text-xs">
                    {item.season}
                  </Badge>
                )}
                {item.region && (
                  <Badge variant="outline" className="text-xs">
                    {item.region}
                  </Badge>
                )}
              </div>
              {item.benefits.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-1">
                    Benefits:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {item.benefits.slice(0, 3).map((b, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {b.length > 30 ? b.substring(0, 30) + "..." : b}
                      </Badge>
                    ))}
                    {item.benefits.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{item.benefits.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 pt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {item._count.posts} posts
                </span>
                <span className="flex items-center gap-1">
                  <FlaskConical className="h-3 w-3" />
                  {item._count.labReports} reports
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Apple className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No food items found</p>
        </div>
      )}
    </div>
  );
}
