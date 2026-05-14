"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Play,
  FileText,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import type { MockPost } from "@/lib/mock-data";

export function SocialPostCard({ post }: { post: MockPost }) {
  const [liked, setLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [bookmarked, setBookmarked] = useState(post.bookmarked);
  const [expanded, setExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [muted, setMuted] = useState(true);
  const [showComments, setShowComments] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const contentText = post.content;
  const isLong = contentText.length > 200;
  const displayContent = expanded ? contentText : contentText.slice(0, 200);

  const templateLabel: Record<string, string> = {
    "food-benefit": "Health Benefit",
    "lab-report": "Lab Report",
    "recipe": "Recipe",
    "where-to-find": "Location",
    "comparison": "Comparison",
    "video-story": "Video",
    "custom": "Post",
  };

  const templateColor: Record<string, string> = {
    "food-benefit": "bg-green-100 text-green-700",
    "lab-report": "bg-blue-100 text-blue-700",
    "recipe": "bg-orange-100 text-orange-700",
    "where-to-find": "bg-purple-100 text-purple-700",
    "comparison": "bg-amber-100 text-amber-700",
    "video-story": "bg-red-100 text-red-700",
    "custom": "bg-gray-100 text-gray-700",
  };

  return (
    <article className="bg-card rounded-xl border overflow-hidden hover:shadow-sm transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.author.id}`} onClick={(e) => e.stopPropagation()}>
            <Avatar className="h-10 w-10 ring-2 ring-primary/20 hover:ring-primary/50 transition-all cursor-pointer">
              <AvatarImage src={post.author.image} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <div className="flex items-center gap-1.5">
              <Link href={`/profile/${post.author.id}`} onClick={(e) => e.stopPropagation()} className="hover:underline">
                <span className="text-sm font-semibold">{post.author.name}</span>
              </Link>
              {post.author.role === "ADMIN" && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  Official
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </span>
              {post.template && (
                <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium", templateColor[post.template])}>
                  {templateLabel[post.template]}
                </span>
              )}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Clickable area linking to detail page */}
      <Link href={`/post/${post.id}`} className="block">
        {/* Media Section */}
        {post.media && post.media.length > 0 && (
          <div className="relative">
            {post.type === "video" ? (
              <div className="relative aspect-video bg-black">
                <video
                  className="w-full h-full object-cover"
                  poster={post.media[0].thumbnail}
                  muted={muted}
                  loop
                  playsInline
                >
                  <source src={post.media[0].url} type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-black/50 backdrop-blur-sm rounded-full p-4 hover:bg-black/70 transition-colors">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </button>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMuted(!muted);
                  }}
                  className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2"
                >
                  {muted ? (
                    <VolumeX className="h-4 w-4 text-white" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-white" />
                  )}
                </button>
                <Badge className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white border-0">
                  <Play className="h-3 w-3 mr-1 fill-white" />
                  Video
                </Badge>
              </div>
            ) : post.type === "pdf" ? (
              <div className="relative aspect-video">
                <img
                  src={post.media[0].thumbnail}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <FileText className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm font-medium">PDF Document</p>
                    <span className="inline-flex items-center gap-1.5 mt-2 text-xs bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Report
                    </span>
                  </div>
                </div>
                <Badge className="absolute top-3 left-3 bg-red-600 text-white border-0">
                  <FileText className="h-3 w-3 mr-1" />
                  PDF
                </Badge>
              </div>
            ) : post.media.length > 1 ? (
              // Carousel
              <div className="relative aspect-square">
                <img
                  src={post.media[currentSlide].url}
                  alt={`${post.title} - slide ${currentSlide + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                {currentSlide > 0 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentSlide((prev) => prev - 1);
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:bg-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}
                {currentSlide < post.media.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentSlide((prev) => prev + 1);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:bg-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {post.media.map((_, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        idx === currentSlide
                          ? "w-4 bg-white"
                          : "w-1.5 bg-white/50"
                      )}
                    />
                  ))}
                </div>
                <Badge className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white border-0 text-xs">
                  {currentSlide + 1}/{post.media.length}
                </Badge>
              </div>
            ) : (
              // Single image
              <div className="relative">
                <img
                  src={post.media[0].url}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-4 pt-3 pb-2">
          <p className="text-sm font-semibold mb-1">{post.title}</p>
          <p className="text-sm text-foreground/80 whitespace-pre-line">
            {displayContent}
            {isLong && !expanded && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setExpanded(true);
                }}
                className="text-muted-foreground hover:text-foreground ml-1"
              >
                ...more
              </button>
            )}
          </p>
        </div>
      </Link>

      {/* Actions - outside the link */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-9 w-9 p-0 rounded-full transition-all",
              liked && "text-red-500"
            )}
            onClick={handleLike}
          >
            <Heart
              className={cn(
                "h-6 w-6 transition-transform",
                liked && "fill-current scale-110"
              )}
            />
          </Button>
          <Link href={`/post/${post.id}#comments`}>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 rounded-full"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-9 w-9 p-0 rounded-full",
            bookmarked && "text-primary"
          )}
          onClick={(e) => {
            e.preventDefault();
            setBookmarked(!bookmarked);
          }}
        >
          <Bookmark className={cn("h-6 w-6", bookmarked && "fill-current")} />
        </Button>
      </div>

      {/* Likes */}
      <div className="px-4 pb-1">
        <p className="text-sm font-semibold">
          {likesCount.toLocaleString()} likes
        </p>
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="px-4 pb-3 flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/explore?tag=${tag}`} onClick={(e) => e.stopPropagation()}>
              <span className="text-xs text-primary font-medium hover:underline">
                #{tag}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Comments Preview */}
      {post.comments > 0 && (
        <div className="px-4 pb-3">
          <Link
            href={`/post/${post.id}#comments`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View all {post.comments} comments
          </Link>
        </div>
      )}

      {/* Comment Input */}
      {showComments && (
        <div className="border-t px-4 py-3 flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
          />
          <Button variant="ghost" size="sm" className="text-primary text-sm font-semibold">
            Post
          </Button>
        </div>
      )}
    </article>
  );
}
