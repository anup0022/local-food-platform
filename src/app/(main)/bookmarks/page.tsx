"use client";

import { useState } from "react";
import { mockPosts } from "@/lib/mock-data";
import { SocialPostCard } from "@/components/posts/social-post-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  Grid3X3,
  LayoutList,
  FolderOpen,
} from "lucide-react";

const collections = [
  { id: "all", label: "All Saved", count: 3 },
  { id: "recipes", label: "Recipes", count: 1 },
  { id: "research", label: "Research", count: 1 },
  { id: "tips", label: "Health Tips", count: 1 },
];

export default function BookmarksPage() {
  const [activeCollection, setActiveCollection] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const bookmarkedPosts = mockPosts.filter((p) => p.bookmarked && p.status === "APPROVED");

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Saved Posts</h1>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", viewMode === "list" && "bg-muted")}
            onClick={() => setViewMode("list")}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", viewMode === "grid" && "bg-muted")}
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Collections */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {collections.map((col) => (
          <Button
            key={col.id}
            variant={activeCollection === col.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCollection(col.id)}
            className="shrink-0 rounded-full gap-1.5"
          >
            <FolderOpen className="h-3.5 w-3.5" />
            {col.label}
            <span className="text-xs opacity-70">({col.count})</span>
          </Button>
        ))}
      </div>

      {/* Bookmarked Posts */}
      {viewMode === "list" ? (
        <div className="space-y-4">
          {bookmarkedPosts.map((post) => (
            <SocialPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {bookmarkedPosts.map((post) => (
            <div
              key={post.id}
              className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer bg-muted"
            >
              {post.media?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.media[0].thumbnail || post.media[0].url}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 to-primary/5">
                  <p className="text-sm font-medium text-center line-clamp-4">{post.title}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-4 text-white text-sm font-semibold">
                  <span>&#9825; {post.likes}</span>
                  <span>&#128172; {post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {bookmarkedPosts.length === 0 && (
        <div className="text-center py-16">
          <Bookmark className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-1">No saved posts yet</h3>
          <p className="text-sm text-muted-foreground">
            Save posts by tapping the bookmark icon. They'll show up here for easy access.
          </p>
        </div>
      )}
    </div>
  );
}
