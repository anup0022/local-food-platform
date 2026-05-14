"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    excerpt?: string | null;
    content: string;
    images: string[];
    createdAt: string;
    author: {
      id: string;
      name: string | null;
      image: string | null;
    };
    category?: {
      id: string;
      name: string;
      slug: string;
    } | null;
    _count: {
      likes: number;
      comments: number;
    };
    userLiked?: boolean;
  };
}

export function PostCard({ post }: PostCardProps) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(post.userLiked || false);
  const [likesCount, setLikesCount] = useState(post._count.likes);

  const handleLike = async () => {
    if (!session) return;

    const res = await fetch(`/api/posts/${post.id}/like`, {
      method: "POST",
    });

    if (res.ok) {
      const data = await res.json();
      setLiked(data.liked);
      setLikesCount((prev) => (data.liked ? prev + 1 : prev - 1));
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: `/post/${post.id}`,
      });
    } else {
      navigator.clipboard.writeText(
        `${window.location.origin}/post/${post.id}`
      );
    }
  };

  const excerpt =
    post.excerpt || post.content.replace(/<[^>]*>/g, "").substring(0, 200);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.image || ""} />
              <AvatarFallback>
                {post.author.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          {post.category && (
            <Badge variant="secondary" className="text-xs">
              {post.category.name}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <Link href={`/post/${post.id}`} className="group">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {excerpt}...
          </p>
        </Link>

        {post.images.length > 0 && (
          <div className="mt-3 rounded-md overflow-hidden">
            <img
              src={post.images[0]}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex items-center gap-1 w-full">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-1 ${liked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            <span className="text-xs">{likesCount}</span>
          </Button>
          <Link href={`/post/${post.id}#comments`}>
            <Button variant="ghost" size="sm" className="gap-1">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{post._count.comments}</span>
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="gap-1">
            <Bookmark className="h-4 w-4" />
          </Button>
          <div className="flex-1" />
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
