"use client";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { usePathname } from "next/navigation";
import { TopCategoryNav } from "./TopCategoryNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin-portal");

  if (isAdmin) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-border">
          <div className="mx-auto max-w-screen-2.5xl px-4">
            <Header />
          </div>
        </header>
        <main className="mx-auto w-full max-w-screen-2.5xl flex-1 px-4 py-8">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden bg-background">
      <TopCategoryNav />
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-6 pb-mobile-nav sm:px-6 sm:py-8 lg:px-8 lg:py-10 lg:pb-10">
        {children}
      </main>
      <footer className="mx-auto hidden w-full max-w-7xl border-t border-border px-8 pb-10 pt-10 lg:block">
        <Footer />
      </footer>
      <MobileBottomNav />
    </div>
  );
}
