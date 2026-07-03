"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const quickActions = [
  { title: "Create a Post", url: "/admin-portal/posts/create-post" },
  { title: "See all posts", url: "/admin-portal/posts" },
  { title: "Create a Match", url: "/admin-portal/matches/create-match" },
  { title: "See all matches", url: "/admin-portal/matches" },
  { title: "Add Alumni", url: "/admin-portal/alumni/create-alumni" },
  { title: "See all Alumni", url: "/admin-portal/alumni" },
  { title: "Send a Notification", url: "/admin-portal/notify" },
  { title: "All Notices", url: "/admin-portal/notices" },
  { title: "Manage Teams", url: "/admin-portal/teams" },
];

export default function AdminPortal() {
  const { data: session } = useSession();

  return (
    <div className="animate-in-subtle space-y-8">
      <header>
        <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">
          Welcome, {session?.user?.name?.split(" ")[0]}
        </h1>
        <p className="mt-2 text-muted-foreground">Admin dashboard</p>
      </header>

      <div>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Quick actions
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.url}>
              <Card
                className={cn(
                  "micro-lift flex h-full items-center justify-center border-border/80 p-6 text-center transition-[border-color,box-shadow] duration-200 hover:border-border hover:shadow-md"
                )}
              >
                <span className="font-medium">{action.title}</span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
