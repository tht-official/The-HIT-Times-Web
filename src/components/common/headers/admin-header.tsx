"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

const links = [
  { title: "Dashboard", href: "/admin-portal" },
  { title: "Posts", href: "/admin-portal/posts" },
  { title: "Matches", href: "/admin-portal/matches" },
  { title: "Alumni", href: "/admin-portal/alumni" },
  { title: "Teams", href: "/admin-portal/teams" },
  { title: "Notify", href: "/admin-portal/notify" },
  { title: "Notices", href: "/admin-portal/notices" },
];

export const AdminHeader = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const initials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <nav className="flex h-16 items-center justify-between gap-4">
      <Link href="/admin-portal" className="flex items-center gap-3">
        <Image
          src="/header/hit_logo_black.webp"
          alt="The HIT Times"
          width={100}
          height={32}
          className="h-7 w-auto dark:invert"
        />
        <span className="hidden text-xs font-medium uppercase tracking-widest text-muted-foreground sm:inline">
          Admin
        </span>
      </Link>

      <div className="hidden items-center gap-1 md:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200",
              pathname === link.href ||
                (link.href !== "/admin-portal" && pathname.startsWith(`${link.href}/`))
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {link.title}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={session?.user?.image ?? undefined} />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">View site</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
