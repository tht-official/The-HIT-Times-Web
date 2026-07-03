"use client";

import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { SignInBenefits } from "@/components/auth/SignInBenefits";
import { SiteLogo } from "@/components/common/SiteLogo";
import { BrandLoader } from "@/components/common/loader/Loaders";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function getCallbackLabel(callbackUrl: string) {
  if (callbackUrl.startsWith("/recruitment")) return "recruitment application";
  if (callbackUrl.startsWith("/forms/tsp-form")) return "TSP application";
  if (callbackUrl.startsWith("/my-bookmarks")) return "bookmarks";
  return "previous page";
}

export function SignInClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const safeCallback =
    callbackUrl.startsWith("/") && !callbackUrl.startsWith("//") ? callbackUrl : "/";
  const returnLabel = getCallbackLabel(safeCallback);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(safeCallback);
    }
  }, [status, router, safeCallback]);

  if (status === "loading") {
    return <BrandLoader variant="page" />;
  }

  if (status === "authenticated") {
    return <BrandLoader variant="page" />;
  }

  return (
    <div className="animate-in-subtle mx-auto flex w-full max-w-md flex-col justify-center py-6 sm:max-w-lg sm:py-10">
      <div className="space-y-8 text-center sm:space-y-10">
        <div className="space-y-5">
          <Link
            href="/"
            className="inline-flex transition-opacity active:opacity-70"
            aria-label="The HIT Times home"
          >
            <SiteLogo className="mx-auto h-6 w-auto sm:h-7" />
          </Link>
          <div className="space-y-3">
            <p className="tag-editorial">Member access</p>
            <h1 className="editorial-heading text-balance text-3xl font-normal leading-tight sm:text-4xl">
              Sign in to The HIT Times
            </h1>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              One secure step with Google to access applications, society programs, and
              member-only pages across campus media.
            </p>
          </div>
        </div>

        <div className="space-y-4 border border-border bg-card/30 p-5 text-left sm:p-6">
          {safeCallback !== "/" && (
            <p className="border-b border-border pb-4 text-center text-sm text-muted-foreground">
              After signing in, you&apos;ll return to your{" "}
              <span className="text-foreground">{returnLabel}</span>.
            </p>
          )}

          <GoogleSignInButton callbackUrl={safeCallback} size="lg" />

          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link href="/terms-of-service" className="underline underline-offset-2 hover:text-foreground">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div className="space-y-5 text-left">
          <div className="section-divider" />
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Why sign in?
          </h2>
          <SignInBenefits />
        </div>

        <div className="space-y-3 border-t border-border pt-6">
          <Link href="/" className="btn-pill-ghost w-full sm:w-auto">
            Continue browsing without signing in
          </Link>
          <p className="text-xs text-muted-foreground">
            Questions?{" "}
            <a
              href="mailto:thehittimes@gmail.com"
              className="underline underline-offset-2 hover:text-foreground"
            >
              thehittimes@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
