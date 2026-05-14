"use client";

import { usePathname } from "next/navigation";
import { SocialSidebar } from "@/components/layout/social-sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPostDetail = pathname.startsWith("/post/") && pathname !== "/post/new";

  /* Post detail pages are fully immersive — no sidebars at all */
  if (isPostDetail) {
    return (
      <div className="min-h-screen bg-background">
        <main className="min-h-screen">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SocialSidebar />
      <main className="ml-[72px] lg:ml-[240px] xl:mr-[300px] min-h-screen">
        {children}
      </main>
      <RightSidebar />
    </div>
  );
}
