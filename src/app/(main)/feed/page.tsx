"use client";

import { useState } from "react";
import { mockPosts, mockStories } from "@/lib/mock-data";
import { SocialPostCard } from "@/components/posts/social-post-card";
import { StoriesBar } from "@/components/posts/stories-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Image, Video, FileText, Sparkles } from "lucide-react";

export default function FeedPage() {
  const [posts] = useState(mockPosts.filter((p) => p.status === "APPROVED"));

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Stories */}
      <StoriesBar stories={mockStories} />

      {/* Create Post Quick Action */}
      <div className="bg-card rounded-xl border p-4 mb-5">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Link href="/create" className="flex-1">
            <div className="bg-muted rounded-full px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer">
              Share something about local food...
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 mt-3 flex-wrap">
          <Link href="/create?type=image">
            <Button variant="ghost" size="sm" className="text-green-600 gap-1.5 text-xs">
              <Image className="h-4 w-4" />
              Photo
            </Button>
          </Link>
          <Link href="/create?type=video">
            <Button variant="ghost" size="sm" className="text-blue-600 gap-1.5 text-xs">
              <Video className="h-4 w-4" />
              Video
            </Button>
          </Link>
          <Link href="/create?type=pdf">
            <Button variant="ghost" size="sm" className="text-red-600 gap-1.5 text-xs">
              <FileText className="h-4 w-4" />
              Document
            </Button>
          </Link>
          <Link href="/create?template=true">
            <Button variant="ghost" size="sm" className="text-purple-600 gap-1.5 text-xs">
              <Sparkles className="h-4 w-4" />
              Template
            </Button>
          </Link>
        </div>
      </div>

      {/* Feed Posts */}
      <div className="space-y-5">
        {posts.map((post) => (
          <SocialPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
