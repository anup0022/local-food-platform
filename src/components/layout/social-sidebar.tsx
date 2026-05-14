"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Home,
  Search,
  PlusSquare,
  MapPin,
  MessageCircle,
  Bell,
  Bookmark,
  User,
  Leaf,
  TrendingUp,
  Settings,
  Shield,
  MessageSquareWarning,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { href: "/feed", icon: Home, label: "Home" },
  { href: "/explore", icon: Search, label: "Explore" },
  { href: "/create", icon: PlusSquare, label: "Create" },
  { href: "/map", icon: MapPin, label: "Nearby" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/notifications", icon: Bell, label: "Alerts" },
  { href: "/bookmarks", icon: Bookmark, label: "Saved" },
  { href: "/trending", icon: TrendingUp, label: "Trending" },
];

export function SocialSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[72px] lg:w-[240px] border-r bg-card flex-col z-40">
      {/* Logo */}
      <div className="p-4 lg:px-5 lg:py-5">
        <Link href="/feed" className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-primary shrink-0" />
          <span className="text-xl font-bold text-primary hidden lg:block">
            LocalBite
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 lg:px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all group",
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-6 w-6 shrink-0 transition-transform group-hover:scale-110",
                  isActive && "text-primary"
                )}
              />
              <span className="hidden lg:block">{item.label}</span>
              {item.label === "Messages" && (
                <span className="hidden lg:block ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  3
                </span>
              )}
            </Link>
          );
        })}

        {session?.user?.role === "ADMIN" && (
          <>
            <Link
              href="/admin-comments"
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all group",
                pathname.startsWith("/admin-comments")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <MessageSquareWarning className="h-6 w-6 shrink-0" />
              <span className="hidden lg:block">Moderate</span>
            </Link>
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all group",
                pathname.startsWith("/admin")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Shield className="h-6 w-6 shrink-0" />
              <span className="hidden lg:block">Admin</span>
            </Link>
          </>
        )}
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t">
        <Link
          href="/profile/user-1"
          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted transition-colors"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={session?.user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=You"} />
            <AvatarFallback>
              {session?.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="hidden lg:block min-w-0">
            <p className="text-sm font-medium truncate">
              {session?.user?.name || "Guest User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              @{session?.user?.name?.toLowerCase().replace(/\s/g, "") || "guest"}
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
