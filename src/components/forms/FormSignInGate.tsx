"use client";

import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { SignInBenefits } from "@/components/auth/SignInBenefits";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FormSignInGate({
  title,
  description,
  bannerSrc = "https://res.cloudinary.com/dvw5qhccb/image/upload/v1730133636/rec-header.png_reznpj.jpg",
  bannerAlt = "The HIT Times",
}: {
  title: string;
  description: string;
  bannerSrc?: string;
  bannerAlt?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="animate-in-subtle mx-auto max-w-lg space-y-8 py-4 sm:py-8">
      <div className="overflow-hidden border border-border">
        <Image
          src={bannerSrc}
          alt={bannerAlt}
          width={1200}
          height={200}
          className="h-auto w-full object-cover"
          priority
        />
      </div>

      <div className="space-y-6 border border-border bg-card/30 p-6 sm:p-8">
        <div className="space-y-2 text-center">
          <p className="tag-editorial">Sign in required</p>
          <h1 className="editorial-heading text-3xl font-normal">{title}</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>

        <GoogleSignInButton callbackUrl={pathname} size="lg" />

        <p className="text-center text-xs text-muted-foreground">
          <Link
            href={`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`}
            className="underline underline-offset-2 hover:text-foreground"
          >
            View full sign-in page
          </Link>
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Why sign in?
        </h2>
        <SignInBenefits compact />
      </div>
    </div>
  );
}
