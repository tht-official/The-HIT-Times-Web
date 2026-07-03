import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const links = [
  {
    title: "Instagram",
    handle: "@thehittimes",
    href: "https://www.instagram.com/thehittimes/",
    icon: "/socials/3d-instagram.png",
  },
  {
    title: "Facebook",
    handle: "The HIT Times",
    href: "https://www.facebook.com/the.hit.times/",
    icon: "/socials/3d-facebook.png",
  },
  {
    title: "LinkedIn",
    handle: "@The_HIT_Times",
    href: "https://www.linkedin.com/company/the-hit-times/mycompany/",
    icon: "/socials/3d-linkedin.png",
  },
  {
    title: "YouTube",
    handle: "The HIT Times",
    href: "https://www.youtube.com/@thehittimes_",
    icon: "/socials/3d-youtube.png",
  },
];

const THTLinksPage = () => {
  return (
    <div className="animate-in-subtle mx-auto max-w-lg space-y-10">
      <header className="text-center">
        <Image
          src="/The-HIT-Times1.png"
          width={96}
          height={96}
          alt="The HIT Times"
          className="mx-auto rounded-full border border-border"
        />
        <h1 className="editorial-heading mt-4 text-3xl font-normal">
          The HIT Times
        </h1>
        <p className="mt-1 text-muted-foreground">
          An impulse to your conscience
        </p>
      </header>

      <div className="space-y-3">
        <Button asChild className="w-full">
          <Link
            href="https://play.google.com/store/apps/details?id=com.thehittimes.tht"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get the THT Khabri App
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild className="w-full">
          <Link href="/">
            Visit our website
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Separator />

      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Social handles
        </h2>
        <div className="space-y-3">
          {links.map((item) => (
            <Link key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
              <Card className="micro-lift border-border/80 transition-[border-color,box-shadow] duration-200 hover:border-border hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-4">
                  <Image src={item.icon} width={36} height={36} alt="" />
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.handle}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default THTLinksPage;
