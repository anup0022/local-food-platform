import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-bold text-primary">LocalBite</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover the benefits of local food, find fresh produce near you,
              and join a community passionate about healthy, sustainable eating.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/feed" className="hover:text-primary">
                  Food Feed
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-primary">
                  Find Nearby
                </Link>
              </li>
              <li>
                <Link href="/food" className="hover:text-primary">
                  Food Database
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/post/new" className="hover:text-primary">
                  Share Knowledge
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-primary">
                  Guidelines
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/lab-reports" className="hover:text-primary">
                  Lab Reports
                </Link>
              </li>
              <li>
                <Link href="/nutrition" className="hover:text-primary">
                  Nutrition Guide
                </Link>
              </li>
              <li>
                <Link href="/seasonal" className="hover:text-primary">
                  Seasonal Calendar
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LocalBite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
