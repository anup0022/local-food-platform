"use client";

import { useState } from "react";
import { mockUsers } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Heart,
  MessageCircle,
  UserPlus,
  Star,
  CheckCircle,
  Bell,
  Settings,
} from "lucide-react";

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "approve" | "mention";
  user: (typeof mockUsers)[0];
  message: string;
  time: string;
  read: boolean;
  postTitle?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "like",
    user: mockUsers[2],
    message: "liked your post",
    postTitle: "Turmeric Milk - The Golden Immunity Booster",
    time: "5m ago",
    read: false,
  },
  {
    id: "n2",
    type: "comment",
    user: mockUsers[4],
    message: "commented on your post: \"This is so informative! Thanks for sharing.\"",
    postTitle: "5 Forgotten Indian Superfoods",
    time: "12m ago",
    read: false,
  },
  {
    id: "n3",
    type: "follow",
    user: mockUsers[1],
    message: "started following you",
    time: "1h ago",
    read: false,
  },
  {
    id: "n4",
    type: "approve",
    user: mockUsers[3],
    message: "approved your post for publishing",
    postTitle: "Organic vs Commercial Honey Lab Report",
    time: "2h ago",
    read: true,
  },
  {
    id: "n5",
    type: "like",
    user: mockUsers[0],
    message: "and 12 others liked your post",
    postTitle: "How We Grow Organic Ragi",
    time: "3h ago",
    read: true,
  },
  {
    id: "n6",
    type: "mention",
    user: mockUsers[4],
    message: "mentioned you in a comment: \"@you check this millet comparison!\"",
    time: "5h ago",
    read: true,
  },
  {
    id: "n7",
    type: "follow",
    user: mockUsers[2],
    message: "and 3 others started following you",
    time: "8h ago",
    read: true,
  },
  {
    id: "n8",
    type: "comment",
    user: mockUsers[1],
    message: "replied to your comment: \"Great question! The calcium content is...\"",
    postTitle: "Millet vs Quinoa Analysis",
    time: "1d ago",
    read: true,
  },
];

const filterOptions = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "likes", label: "Likes" },
  { id: "comments", label: "Comments" },
  { id: "follows", label: "Follows" },
];

const iconMap = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  approve: CheckCircle,
  mention: Star,
};

const colorMap = {
  like: "text-red-500 bg-red-500/10",
  comment: "text-blue-500 bg-blue-500/10",
  follow: "text-purple-500 bg-purple-500/10",
  approve: "text-green-500 bg-green-500/10",
  mention: "text-amber-500 bg-amber-500/10",
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const filtered = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    if (filter === "likes") return n.type === "like";
    if (filter === "comments") return n.type === "comment";
    if (filter === "follows") return n.type === "follow";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead} className="text-xs">
              Mark all read
            </Button>
          )}
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {filterOptions.map((opt) => (
          <Button
            key={opt.id}
            variant={filter === opt.id ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(opt.id)}
            className="shrink-0 rounded-full"
          >
            {opt.label}
          </Button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-1">
        {filtered.map((notification) => {
          const Icon = iconMap[notification.type];
          const color = colorMap[notification.type];

          return (
            <div
              key={notification.id}
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl transition-colors cursor-pointer",
                notification.read
                  ? "hover:bg-muted"
                  : "bg-primary/5 hover:bg-primary/10"
              )}
            >
              <div className="relative shrink-0">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={notification.user.image} />
                  <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className={cn("absolute -bottom-1 -right-1 p-1 rounded-full", color)}>
                  <Icon className="h-3 w-3" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold">{notification.user.name}</span>{" "}
                  <span className="text-muted-foreground">{notification.message}</span>
                </p>
                {notification.postTitle && (
                  <p className="text-sm text-primary mt-0.5 truncate font-medium">
                    {notification.postTitle}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </div>
              {!notification.read && (
                <div className="h-2.5 w-2.5 bg-primary rounded-full shrink-0 mt-2" />
              )}
              {notification.type === "follow" && (
                <Button variant="outline" size="sm" className="shrink-0 rounded-full text-xs">
                  Follow back
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Bell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-1">No notifications</h3>
          <p className="text-sm text-muted-foreground">
            {filter === "unread"
              ? "You're all caught up! No unread notifications."
              : "When someone interacts with your posts, you'll see it here."}
          </p>
        </div>
      )}
    </div>
  );
}
