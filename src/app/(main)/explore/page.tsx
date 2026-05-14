"use client";

import { useState } from "react";
import { mockPosts, mockUsers, trendingTags } from "@/lib/mock-data";
import { SocialPostCard } from "@/components/posts/social-post-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Search,
  TrendingUp,
  Users,
  FileText,
  MapPin,
  Grid3X3,
  LayoutList,
} from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: Grid3X3 },
  { id: "health", label: "Health", icon: TrendingUp },
  { id: "people", label: "People", icon: Users },
  { id: "research", label: "Research", icon: FileText },
  { id: "nearby", label: "Nearby", icon: MapPin },
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const allPosts = mockPosts.filter((p) => p.status === "APPROVED");

  const filteredPosts = allPosts.filter((post) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Search Header */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search posts, food items, users, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 bg-muted border-none rounded-xl text-base"
          />
        </div>
      </div>

      {/* Trending Tags */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">TRENDING TAGS</h3>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((item) => (
            <button
              key={item.tag}
              onClick={() => setSearchQuery(item.tag.replace("#", ""))}
              className="group"
            >
              <Badge
                variant="secondary"
                className="px-3 py-1.5 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {item.tag}
                <span className="ml-1.5 text-xs text-muted-foreground group-hover:text-primary-foreground/70">
                  {item.posts}
                </span>
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat.id)}
            className="gap-1.5 shrink-0 rounded-full"
          >
            <cat.icon className="h-4 w-4" />
            {cat.label}
          </Button>
        ))}
        <div className="ml-auto flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", viewMode === "grid" && "bg-muted")}
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", viewMode === "list" && "bg-muted")}
            onClick={() => setViewMode("list")}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Suggested People */}
      {!searchQuery && (
        <div className="mb-6 bg-card rounded-xl border p-4">
          <h3 className="text-sm font-semibold mb-3">Suggested for you</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {mockUsers.filter((u) => u.role !== "ADMIN").map((user) => (
              <div
                key={user.id}
                className="flex flex-col items-center gap-2 min-w-[100px] p-3 rounded-xl hover:bg-muted transition-colors cursor-pointer"
              >
                <Avatar className="h-14 w-14">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-xs font-medium text-center truncate w-full">{user.name}</p>
                <p className="text-[10px] text-muted-foreground">{user.followers} followers</p>
                <Button variant="outline" size="sm" className="text-xs h-7 w-full rounded-full">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {filteredPosts.map((post) => (
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
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <SocialPostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-1">No results found</h3>
          <p className="text-sm text-muted-foreground">
            Try different keywords or browse trending tags above.
          </p>
        </div>
      )}
    </div>
  );
}
