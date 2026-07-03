"use client";

import { dropdownsToSections } from "@/components/weekly-portion/WeeklyPortion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { Menu, ChevronRight, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const primaryNav = [
  { title: "Alumni", href: "/alumni" },
  { title: "Gazette", href: "/posts/category/09" },
  { title: "Reportopolis", href: "/posts/category/10" },
  { title: "Tabloids", href: "/tabloids" },
  { title: "Matches", href: "/matches" },
];

const sectionsNav = Object.entries(dropdownsToSections).map(([code, name]) => ({
  title: name,
  href: `/posts/category/${code}`,
}));

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-sm font-medium transition-colors duration-200",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}

function AccountMenu() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => signIn(undefined, { callbackUrl: pathname })}
        className="hidden sm:inline-flex"
      >
        Sign in
      </Button>
    );
  }

  const initials = session.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hidden gap-2 sm:inline-flex"
        >
          <Avatar className="h-7 w-7">
            <AvatarImage src={session.user?.image ?? undefined} alt="" />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <span className="max-w-[100px] truncate text-sm">
            {session.user?.name?.split(" ")[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{session.user?.name}</p>
            <p className="text-xs text-muted-foreground">{session.user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/my-bookmarks">My Bookmarks</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const UserHeader = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="flex h-16 items-center justify-between gap-4">
      <Link href="/" className="flex shrink-0 items-center gap-2 transition-opacity duration-200 hover:opacity-80">
        <Image
          src="/header/hit_logo_black.webp"
          alt="The HIT Times"
          width={120}
          height={40}
          className="h-8 w-auto dark:invert"
          priority
        />
      </Link>

      <div className="hidden items-center gap-6 lg:flex">
        {primaryNav.map((link) => (
          <NavLink key={link.href} href={link.href}>
            {link.title}
          </NavLink>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus:outline-none">
            Sections
            <ChevronRight className="h-3.5 w-3.5 rotate-90" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            {sectionsNav.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href}>{item.title}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <AccountMenu />
        <Button
          variant="outline"
          size="sm"
          onClick={() => signIn(undefined, { callbackUrl: pathname })}
          className="sm:hidden"
        >
          Sign in
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-sm">
            <SheetHeader>
              <SheetTitle className="font-serif text-left">Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-1">
              <NavLink href="/" onClick={() => setOpen(false)}>
                <span className="block py-2.5 text-base">Home</span>
              </NavLink>
              {primaryNav.map((link) => (
                <NavLink key={link.href} href={link.href} onClick={() => setOpen(false)}>
                  <span className="block py-2.5 text-base">{link.title}</span>
                </NavLink>
              ))}
              <NavLink href="/my-bookmarks" onClick={() => setOpen(false)}>
                <span className="block py-2.5 text-base">My Bookmarks</span>
              </NavLink>
              <div className="my-3 h-px bg-border" />
              <p className="px-0 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Sections
              </p>
              {sectionsNav.map((item) => (
                <NavLink key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <span className="block py-2 text-sm">{item.title}</span>
                </NavLink>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
