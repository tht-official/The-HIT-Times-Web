"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/the.hit.times/", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/thehittimes/", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/the-hit-times/mycompany/", icon: Linkedin },
  { label: "YouTube", href: "https://www.youtube.com/@thehittimes_", icon: Youtube },
];

export const UserFooter = () => {
  return (
    <footer className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-md space-y-6 text-center lg:text-left">
        <p className="editorial-heading text-2xl font-normal">Stay in the loop</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Campus stories, sport, and culture from The HIT Times — delivered by students, for students.
        </p>
        <Link href="/tht-links" className="btn-pill-ghost w-full sm:inline-flex sm:w-auto">
          Subscribe
        </Link>
        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          &copy; {new Date().getFullYear()} The HIT Times
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 lg:items-end">
        <div className="flex gap-4">
          {socials.map((social) => (
            <Link
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <social.icon className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          ))}
        </div>
        <div className="flex gap-4 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          <Link href="/privacy-policy" className="hover:text-foreground">Privacy</Link>
          <Link href="/terms-of-service" className="hover:text-foreground">Terms</Link>
          <Link href="/about-us" className="hover:text-foreground">About</Link>
        </div>
      </div>
    </footer>
  );
};
