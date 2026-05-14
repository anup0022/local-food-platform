"use client";

import { useState } from "react";
import { mockPosts, mockUsers, trendingTags } from "@/lib/mock-data";
import { SocialPostCard } from "@/components/posts/social-post-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  Flame,
  Clock,
  Award,
  ArrowUp,
  Hash,
} from "lucide-react";

const timeRanges = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "all", label: "All Time" },
];

export default function TrendingPage() {
  const [timeRange, setTimeRange] = useState("week");

  const topPosts = [...mockPosts]
    .filter((p) => p.status === "APPROVED")
    .sort((a, b) => b.likes + b.shares - (a.likes + a.shares));

  const topContributors = [...mockUsers]
    .filter((u) => u.role !== "ADMIN")
    .sort((a, b) => b.followers - a.followers);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">Trending</h1>
      </div>

      {/* Time Range */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {timeRanges.map((range) => (
          <Button
            key={range.id}
            variant={timeRange === range.id ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(range.id)}
            className="shrink-0 rounded-full"
          >
            {range.label}
          </Button>
        ))}
      </div>

      {/* Trending Tags */}
      <div className="bg-card rounded-xl border p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-5 w-5 text-orange-500" />
          <h2 className="font-semibold">Trending Topics</h2>
        </div>
        <div className="space-y-3">
          {trendingTags.map((item, index) => (
            <div
              key={item.tag}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            >
              <span className="text-lg font-bold text-muted-foreground w-6 text-center">
                {index + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm">{item.tag.replace("#", "")}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.posts.toLocaleString()} posts
                </p>
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                <ArrowUp className="h-3 w-3" />
                <span>{Math.floor(Math.random() * 40 + 10)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Contributors */}
      <div className="bg-card rounded-xl border p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-amber-500" />
          <h2 className="font-semibold">Top Contributors</h2>
        </div>
        <div className="space-y-3">
          {topContributors.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            >
              <span
                className={cn(
                  "text-lg font-bold w-6 text-center",
                  index === 0
                    ? "text-amber-500"
                    : index === 1
                    ? "text-gray-400"
                    : index === 2
                    ? "text-orange-600"
                    : "text-muted-foreground"
                )}
              >
                {index + 1}
              </span>
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.image} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.bio}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold">{user.followers.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">followers</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Posts */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-blue-500" />
          <h2 className="font-semibold">Most Popular Posts</h2>
        </div>
        <div className="space-y-4">
          {topPosts.slice(0, 5).map((post) => (
            <SocialPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
