import { Bookmark, FileText, ShieldCheck, Users } from "lucide-react";

const benefits = [
  {
    icon: FileText,
    title: "Official applications",
    description: "Submit recruitment and TSP forms with your verified campus identity.",
  },
  {
    icon: Users,
    title: "Society membership",
    description: "Join programs and opportunities run by The HIT Times editorial team.",
  },
  {
    icon: Bookmark,
    title: "Personalised experience",
    description: "Return to the page you were on and pick up right where you left off.",
  },
  {
    icon: ShieldCheck,
    title: "Secure sign-in",
    description: "We use Google sign-in only — no separate passwords to remember.",
  },
];

export function SignInBenefits({ compact }: { compact?: boolean }) {
  return (
    <ul className={compact ? "space-y-4" : "space-y-5"}>
      {benefits.map(({ icon: Icon, title, description }) => (
        <li key={title} className="flex gap-3 sm:gap-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40 sm:h-10 sm:w-10">
            <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          </span>
          <div className="min-w-0 space-y-0.5">
            <p className="text-sm font-medium text-foreground">{title}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
