import { SignInClient } from "@/app/sign-in/SignInClient";
import type { Metadata } from "next";
import { Suspense } from "react";
import { BrandLoader } from "@/components/common/loader/Loaders";

export const metadata: Metadata = {
  title: "Sign in | The HIT Times",
  description:
    "Sign in with Google to access recruitment, TSP applications, and member pages on The HIT Times.",
};

export default function SignInPage() {
  return (
    <Suspense fallback={<BrandLoader variant="page" />}>
      <SignInClient />
    </Suspense>
  );
}
