import { redirect } from "next/navigation";

/* Middleware rewrites "/" → "/feed". This is a safety fallback. */
export default function RootPage() {
  redirect("/feed");
}
