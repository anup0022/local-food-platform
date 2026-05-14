"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trendingTags, suggestedUsers } from "@/lib/mock-data";
import { TrendingUp, UserPlus } from "lucide-react";

export function RightSidebar() {
  return (
    <aside className="hidden lg:block fixed right-0 top-0 h-screen w-[280px] xl:w-[300px] border-l bg-card p-5 overflow-y-auto">
      {/* Trending Tags */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-primary" />
          Trending Now
        </h3>
        <div className="space-y-2">
          {trendingTags.map((item) => (
            <Link
              key={item.tag}
              href={`/explore?tag=${item.tag.replace("#", "")}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <span className="text-sm font-medium text-primary">
                {item.tag}
              </span>
              <span className="text-xs text-muted-foreground">
                {item.posts} posts
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Suggested People */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
          <UserPlus className="h-4 w-4 text-primary" />
          Suggested for You
        </h3>
        <div className="space-y-3">
          {suggestedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3"
            >
              <Link href={`/profile/${user.id}`}>
                <Avatar className="h-9 w-9 hover:ring-2 hover:ring-primary/30 transition-all cursor-pointer">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/profile/${user.id}`} className="hover:underline">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                </Link>
                <p className="text-xs text-muted-foreground truncate">
                  {user.followers.toLocaleString()} followers
                </p>
              </div>
              <Button variant="outline" size="sm" className="text-xs h-7 px-3">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-muted/50 rounded-xl p-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">
          Community Stats
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-lg font-bold">12.5k</p>
            <p className="text-xs text-muted-foreground">Members</p>
          </div>
          <div>
            <p className="text-lg font-bold">3.2k</p>
            <p className="text-xs text-muted-foreground">Posts</p>
          </div>
          <div>
            <p className="text-lg font-bold">450+</p>
            <p className="text-xs text-muted-foreground">Food Items</p>
          </div>
          <div>
            <p className="text-lg font-bold">89</p>
            <p className="text-xs text-muted-foreground">Lab Reports</p>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="mt-6 text-xs text-muted-foreground space-x-2">
        <Link href="/about" className="hover:underline">About</Link>
        <span>&middot;</span>
        <Link href="/guidelines" className="hover:underline">Guidelines</Link>
        <span>&middot;</span>
        <Link href="/privacy" className="hover:underline">Privacy</Link>
        <p className="mt-2 text-xs">&copy; 2026 LocalBite</p>
      </div>
    </aside>
  );
}
