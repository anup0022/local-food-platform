"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Story {
  id: string;
  user: { id: string; name: string; image: string };
  thumbnail: string;
  viewed: boolean;
}

export function StoriesBar({ stories }: { stories: Story[] }) {
  return (
    <div className="bg-card rounded-xl border p-4 mb-5 overflow-hidden">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
        {/* Your Story */}
        <div className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer">
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-muted">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-0.5">
              <Plus className="h-3.5 w-3.5" />
            </div>
          </div>
          <span className="text-[11px] text-muted-foreground font-medium">
            Your Story
          </span>
        </div>

        {/* Other Stories */}
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
          >
            <div
              className={cn(
                "rounded-full p-[3px]",
                story.viewed
                  ? "bg-muted"
                  : "bg-gradient-to-br from-primary via-green-400 to-emerald-600"
              )}
            >
              <Avatar className="h-16 w-16 border-2 border-card group-hover:scale-105 transition-transform">
                <AvatarImage src={story.thumbnail} />
                <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-[11px] text-muted-foreground font-medium truncate w-16 text-center">
              {story.user.name.split(" ")[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
