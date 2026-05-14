"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  Link2,
  Grid3X3,
  BookOpen,
  FlaskConical,
  Heart,
  MoreHorizontal,
  MessageCircle,
  UserPlus,
  UserCheck,
  Shield,
  ChefHat,
  Play,
  FileText,
  Share2,
  ArrowLeft,
  Settings,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockUsers, mockPosts, mockPostComments } from "@/lib/mock-data";
import type { MockPost } from "@/lib/mock-data";

/* ------------------------------------------------------------------ */
/*  Helper — template badge colors                                     */
/* ------------------------------------------------------------------ */
const templateColor: Record<string, string> = {
  "food-benefit": "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  "lab-report": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  recipe: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  "where-to-find": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  comparison: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "video-story": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  custom: "bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300",
};
const templateLabel: Record<string, string> = {
  "food-benefit": "Health",
  "lab-report": "Lab Report",
  recipe: "Recipe",
  "where-to-find": "Location",
  comparison: "Compare",
  "video-story": "Video",
  custom: "Post",
};

/* ------------------------------------------------------------------ */
/*  Cover patterns — deterministic per user                            */
/* ------------------------------------------------------------------ */
const coverPatterns = [
  "from-emerald-600 via-green-500 to-teal-400",
  "from-blue-600 via-cyan-500 to-sky-400",
  "from-orange-600 via-amber-500 to-yellow-400",
  "from-purple-600 via-fuchsia-500 to-pink-400",
  "from-rose-600 via-red-500 to-orange-400",
];

/* ------------------------------------------------------------------ */
/*  Tabs                                                                */
/* ------------------------------------------------------------------ */
type TabKey = "posts" | "recipes" | "lab-reports" | "liked";
const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "posts", label: "Posts", icon: Grid3X3 },
  { key: "recipes", label: "Recipes", icon: ChefHat },
  { key: "lab-reports", label: "Lab Reports", icon: FlaskConical },
  { key: "liked", label: "Liked", icon: Heart },
];

/* ================================================================== */
/*  Post Grid Thumbnail                                                */
/* ================================================================== */
function PostThumb({ post }: { post: MockPost }) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
    >
      {/* Thumbnail */}
      {post.media && post.media.length > 0 ? (
        <img
          src={post.media[0].thumbnail || post.media[0].url}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50 p-4">
          <p className="text-sm font-medium text-center text-muted-foreground line-clamp-4">
            {post.title}
          </p>
        </div>
      )}

      {/* Type badge */}
      {post.type === "video" && (
        <div className="absolute top-2 right-2">
          <Play className="h-5 w-5 text-white drop-shadow-md fill-white" />
        </div>
      )}
      {post.type === "pdf" && (
        <div className="absolute top-2 right-2">
          <FileText className="h-5 w-5 text-white drop-shadow-md" />
        </div>
      )}
      {post.type === "carousel" && post.media && post.media.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-1.5 py-0.5 rounded-md">
          1/{post.media.length}
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="flex items-center gap-4 text-white text-sm font-semibold">
          <span className="flex items-center gap-1">
            <Heart className="h-4 w-4 fill-white" />
            {post.likes >= 1000
              ? (post.likes / 1000).toFixed(1) + "k"
              : post.likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4 fill-white" />
            {post.comments}
          </span>
        </div>
      </div>

      {/* Template tag */}
      <div className="absolute bottom-2 left-2">
        <span
          className={cn(
            "text-[9px] px-1.5 py-0.5 rounded-full font-semibold backdrop-blur-sm",
            templateColor[post.template]
          )}
        >
          {templateLabel[post.template]}
        </span>
      </div>
    </Link>
  );
}

/* ================================================================== */
/*  Stat Pill                                                          */
/* ================================================================== */
function StatPill({
  value,
  label,
}: {
  value: number | string;
  label: string;
}) {
  const display =
    typeof value === "number"
      ? value >= 10000
        ? (value / 1000).toFixed(1) + "k"
        : value >= 1000
        ? (value / 1000).toFixed(1) + "k"
        : value.toString()
      : value;

  return (
    <div className="text-center">
      <p className="text-xl font-bold leading-none">{display}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

/* ================================================================== */
/*  Main Profile Page                                                  */
/* ================================================================== */
export default function ProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const [activeTab, setActiveTab] = useState<TabKey>("posts");
  const [following, setFollowing] = useState(false);

  /* Find user */
  const user = mockUsers.find((u) => u.id === userId);

  /* Gather user's posts */
  const userPosts = useMemo(
    () => mockPosts.filter((p) => p.author.id === userId && p.status === "APPROVED"),
    [userId]
  );

  /* Count comments across all posts */
  const totalComments = useMemo(() => {
    let count = 0;
    for (const comments of Object.values(mockPostComments)) {
      count += comments.filter((c) => c.user.id === userId && c.status === "approved").length;
    }
    return count;
  }, [userId]);

  /* Tab filtering */
  const filteredPosts = useMemo(() => {
    switch (activeTab) {
      case "recipes":
        return userPosts.filter((p) => p.template === "recipe");
      case "lab-reports":
        return userPosts.filter((p) => p.template === "lab-report");
      case "liked":
        return mockPosts.filter((p) => p.liked && p.status === "APPROVED");
      default:
        return userPosts;
    }
  }, [activeTab, userPosts]);

  /* Cover gradient */
  const coverIdx = user
    ? mockUsers.indexOf(user) % coverPatterns.length
    : 0;

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          User not found.
        </p>
        <Link href="/feed">
          <Button variant="outline" className="mt-4 gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to feed
          </Button>
        </Link>
      </div>
    );
  }

  const isAdmin = user.role === "ADMIN";
  const joinDate = "January 2025";

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12">
      {/* ---- Cover Section ---- */}
      <div className="relative">
        {/* Cover gradient */}
        <div
          className={cn(
            "h-48 sm:h-56 md:h-64 w-full bg-gradient-to-r rounded-b-3xl relative overflow-hidden",
            coverPatterns[coverIdx]
          )}
        >
          {/* Decorative pattern overlay */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          {/* Leaf pattern */}
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              <path
                d="M100 0C100 0 130 60 180 80C180 80 120 100 100 200C100 200 80 100 20 80C20 80 70 60 100 0Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        {/* Avatar — positioned to overlap cover and content */}
        <div className="absolute -bottom-16 left-6 sm:left-8">
          <div className="relative">
            <Avatar className="h-32 w-32 ring-4 ring-background shadow-xl">
              <AvatarImage src={user.image} />
              <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {isAdmin && (
              <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1.5 shadow-md">
                <Shield className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>

        {/* Top action buttons */}
        <div className="absolute top-4 left-4">
          <Link href="/feed">
            <Button
              variant="ghost"
              size="sm"
              className="bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 rounded-full gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </Link>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 rounded-full"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 rounded-full"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ---- Profile Info ---- */}
      <div className="px-6 sm:px-8 pt-20">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold truncate">{user.name}</h1>
              {isAdmin && (
                <Badge
                  variant="secondary"
                  className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary"
                >
                  Official
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              @{user.name.toLowerCase().replace(/\s+/g, "").replace(/\./g, "")}
            </p>
          </div>

          {/* Follow / Message buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={() => setFollowing(!following)}
              variant={following ? "outline" : "default"}
              size="sm"
              className={cn(
                "gap-1.5 rounded-full px-5",
                following && "text-muted-foreground"
              )}
            >
              {following ? (
                <>
                  <UserCheck className="h-4 w-4" /> Following
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" /> Follow
                </>
              )}
            </Button>
            <Link href="/messages">
              <Button variant="outline" size="sm" className="rounded-full gap-1.5 px-4">
                <MessageCircle className="h-4 w-4" /> Message
              </Button>
            </Link>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-3 text-sm leading-relaxed max-w-xl">{user.bio}</p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> India
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> Joined {joinDate}
          </span>
          <span className="flex items-center gap-1">
            <Link2 className="h-3.5 w-3.5" /> localbite.in/{user.name.toLowerCase().replace(/\s+/g, "")}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 mt-6 pb-6 border-b">
          <StatPill value={userPosts.length} label="Posts" />
          <StatPill value={user.followers} label="Followers" />
          <StatPill value={user.following} label="Following" />
          <StatPill value={totalComments} label="Comments" />
        </div>
      </div>

      {/* ---- Tabs ---- */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b">
        <div className="flex px-6 sm:px-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
              )}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ---- Post Grid ---- */}
      <div className="px-6 sm:px-8 pt-6">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredPosts.map((post) => (
              <PostThumb key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              {activeTab === "recipes" ? (
                <ChefHat className="h-7 w-7 text-muted-foreground" />
              ) : activeTab === "lab-reports" ? (
                <FlaskConical className="h-7 w-7 text-muted-foreground" />
              ) : activeTab === "liked" ? (
                <Heart className="h-7 w-7 text-muted-foreground" />
              ) : (
                <Grid3X3 className="h-7 w-7 text-muted-foreground" />
              )}
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              {activeTab === "liked"
                ? "No liked posts yet"
                : `No ${activeTab.replace("-", " ")} yet`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
