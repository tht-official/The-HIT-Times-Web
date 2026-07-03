"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function MobileSheet({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex max-h-[min(88dvh,640px)] flex-col gap-0 rounded-t-2xl border-border p-0 pb-safe [&>button]:top-5 [&>button]:right-5"
      >
        <div className="flex shrink-0 flex-col items-center pt-3">
          <div className="h-1 w-10 rounded-full bg-border" aria-hidden />
        </div>
        <SheetHeader className="shrink-0 space-y-1 px-6 pb-4 pt-2 text-left">
          <SheetTitle className="font-serif text-xl font-normal">{title}</SheetTitle>
        </SheetHeader>
        <div className="mobile-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-6">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
