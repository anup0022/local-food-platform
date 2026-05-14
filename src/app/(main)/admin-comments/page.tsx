"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  Shield,
  Filter,
  ArrowLeft,
  ExternalLink,
  Eye,
  ThumbsUp,
  AlertTriangle,
  Search,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockPostComments, mockPosts } from "@/lib/mock-data";
import type { MockComment } from "@/lib/mock-data";

/* ------------------------------------------------------------------ */
/*  Flatten all comments into a single list with post context          */
/* ------------------------------------------------------------------ */
interface FlatComment extends MockComment {
  postId: string;
  postTitle: string;
}

function flattenComments(): FlatComment[] {
  const flat: FlatComment[] = [];
  for (const [postId, comments] of Object.entries(mockPostComments)) {
    const post = mockPosts.find((p) => p.id === postId);
    for (const c of comments) {
      flat.push({
        ...c,
        postId,
        postTitle: post?.title || postId,
      });
    }
  }
  return flat;
}

/* ------------------------------------------------------------------ */
/*  Status config                                                      */
/* ------------------------------------------------------------------ */
const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle,
    color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    dot: "bg-green-500",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    dot: "bg-red-500",
  },
};

type FilterStatus = "all" | "pending" | "approved" | "rejected";

/* ================================================================== */
/*  Comment Card                                                       */
/* ================================================================== */
function CommentCard({
  comment,
  onApprove,
  onReject,
}: {
  comment: FlatComment;
  onApprove: () => void;
  onReject: () => void;
}) {
  const config = statusConfig[comment.status];
  const StatusIcon = config.icon;

  return (
    <div
      className={cn(
        "bg-card border rounded-xl p-4 transition-all hover:shadow-sm",
        comment.status === "pending" && "border-amber-300/50 bg-amber-50/30 dark:bg-amber-950/10 dark:border-amber-800/30"
      )}
    >
      {/* Header: user + status */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link href={`/profile/${comment.user.id}`}>
            <Avatar className="h-9 w-9 shrink-0 hover:ring-2 hover:ring-primary/30 transition-all">
              <AvatarImage src={comment.user.image} />
              <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Link href={`/profile/${comment.user.id}`} className="hover:underline">
                <span className="text-sm font-semibold truncate">{comment.user.name}</span>
              </Link>
              <span className="text-xs text-muted-foreground">{comment.time}</span>
            </div>
            <Link href={`/post/${comment.postId}`} className="group">
              <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                on <span className="font-medium truncate max-w-[200px] inline-block align-bottom">{comment.postTitle}</span>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </Link>
          </div>
        </div>
        <Badge className={cn("text-[10px] px-2 py-0.5 shrink-0 gap-1", config.color)}>
          <StatusIcon className="h-3 w-3" />
          {config.label}
        </Badge>
      </div>

      {/* Comment text */}
      <div className="mt-3 ml-12">
        <p className="text-sm leading-relaxed">{comment.text}</p>
        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" />
            {comment.likes} likes
          </span>
        </div>
      </div>

      {/* Action buttons */}
      {comment.status === "pending" && (
        <div className="mt-3 ml-12 flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            className="h-8 gap-1.5 rounded-full px-4 text-xs bg-green-600 hover:bg-green-700 text-white"
            onClick={onApprove}
          >
            <CheckCircle className="h-3.5 w-3.5" />
            Approve
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 rounded-full px-4 text-xs text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:hover:bg-red-950"
            onClick={onReject}
          >
            <XCircle className="h-3.5 w-3.5" />
            Reject
          </Button>
          <Link href={`/post/${comment.postId}`}>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 rounded-full px-3 text-xs"
            >
              <Eye className="h-3.5 w-3.5" />
              View Post
            </Button>
          </Link>
        </div>
      )}

      {comment.status !== "pending" && (
        <div className="mt-3 ml-12 flex items-center gap-2">
          {comment.status === "approved" && (
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1 rounded-full px-3 text-[11px] text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
              onClick={onReject}
            >
              <XCircle className="h-3 w-3" />
              Revoke
            </Button>
          )}
          {comment.status === "rejected" && (
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1 rounded-full px-3 text-[11px] text-green-600 border-green-200 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-950"
              onClick={onApprove}
            >
              <CheckCircle className="h-3 w-3" />
              Approve
            </Button>
          )}
          <Link href={`/post/${comment.postId}`}>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 rounded-full px-3 text-[11px]"
            >
              <Eye className="h-3 w-3" />
              View
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Main Page                                                          */
/* ================================================================== */
export default function AdminCommentsPage() {
  const [comments, setComments] = useState<FlatComment[]>(() => flattenComments());
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* Stats */
  const stats = useMemo(() => {
    const all = comments.length;
    const pending = comments.filter((c) => c.status === "pending").length;
    const approved = comments.filter((c) => c.status === "approved").length;
    const rejected = comments.filter((c) => c.status === "rejected").length;
    return { all, pending, approved, rejected };
  }, [comments]);

  /* Filter + search */
  const filteredComments = useMemo(() => {
    let result = comments;
    if (filter !== "all") {
      result = result.filter((c) => c.status === filter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.text.toLowerCase().includes(q) ||
          c.user.name.toLowerCase().includes(q) ||
          c.postTitle.toLowerCase().includes(q)
      );
    }
    // Sort: pending first, then by likes desc
    return [...result].sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (b.status === "pending" && a.status !== "pending") return 1;
      return b.likes - a.likes;
    });
  }, [comments, filter, searchQuery]);

  const handleApprove = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, status: "approved" as const } : c))
    );
  };

  const handleReject = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, status: "rejected" as const } : c))
    );
  };

  const handleApproveAll = () => {
    setComments((prev) =>
      prev.map((c) => (c.status === "pending" ? { ...c, status: "approved" as const } : c))
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/feed">
          <Button variant="ghost" size="sm" className="rounded-full gap-1.5 h-9">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">Comment Moderation</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Review and moderate user comments across all posts
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", value: stats.all, color: "text-foreground", bgColor: "bg-card" },
          { label: "Pending", value: stats.pending, color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-950/20" },
          { label: "Approved", value: stats.approved, color: "text-green-600", bgColor: "bg-green-50 dark:bg-green-950/20" },
          { label: "Rejected", value: stats.rejected, color: "text-red-600", bgColor: "bg-red-50 dark:bg-red-950/20" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={cn("rounded-xl border p-4 text-center", stat.bgColor)}
          >
            <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search comments, users, or posts..."
            className="w-full h-10 pl-9 pr-4 text-sm bg-muted rounded-full outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          {(["all", "pending", "approved", "rejected"] as FilterStatus[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "text-xs font-medium px-3 py-1.5 rounded-full transition-colors capitalize",
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {f === "all" ? "All" : f}
              {f === "pending" && stats.pending > 0 && (
                <span className="ml-1 inline-flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] rounded-full bg-white/20">
                  {stats.pending}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk actions */}
      {stats.pending > 0 && filter !== "approved" && filter !== "rejected" && (
        <div className="flex items-center justify-between bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-xl px-4 py-3 mb-5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
              {stats.pending} comment{stats.pending !== 1 ? "s" : ""} awaiting review
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 rounded-full text-xs border-amber-300 hover:bg-amber-100 dark:border-amber-700 dark:hover:bg-amber-900/30"
            onClick={handleApproveAll}
          >
            <CheckCircle className="h-3.5 w-3.5 text-green-600" />
            Approve All
          </Button>
        </div>
      )}

      {/* Comment list */}
      <div className="space-y-3">
        {filteredComments.length > 0 ? (
          filteredComments.map((comment) => (
            <CommentCard
              key={`${comment.postId}-${comment.id}`}
              comment={comment}
              onApprove={() => handleApprove(comment.id)}
              onReject={() => handleReject(comment.id)}
            />
          ))
        ) : (
          <div className="text-center py-16">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-muted-foreground">
              {searchQuery
                ? "No comments match your search"
                : `No ${filter === "all" ? "" : filter + " "}comments`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
