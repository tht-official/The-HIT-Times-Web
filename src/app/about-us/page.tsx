import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Instagram, Linkedin } from "lucide-react";

const contactData = [
  {
    title: "Email",
    icon: Mail,
    handle: "thehittimes@gmail.com",
    link: "mailto:thehittimes@gmail.com",
  },
  {
    title: "Instagram",
    icon: Instagram,
    handle: "@thehittimes",
    link: "https://www.instagram.com/thehittimes/",
  },
  {
    title: "LinkedIn",
    icon: Linkedin,
    handle: "@The_HIT_Times",
    link: "https://www.linkedin.com/company/the-hit-times/mycompany/",
  },
];

const AboutUs = () => {
  return (
    <div className="animate-in-subtle mx-auto max-w-3xl space-y-12">
      <header>
        <h1 className="editorial-heading text-4xl font-normal sm:text-5xl">
          About Us
        </h1>
        <Separator className="mt-4 w-16 bg-primary" />
      </header>

      <Image
        src="/aboutusImage.jpg"
        alt="The HIT Times team"
        height={400}
        width={800}
        className="w-full rounded-xl border border-border object-cover"
      />

      <div className="prose-editorial text-base leading-relaxed">
        <p>
          Founded in the year of 2013, The HIT Times is only the second student
          run tabloid in the Eastern zone of India. A progressive induction into
          a world full of semesters, assignments, placements, and an unending
          voyage through the premises of{" "}
          <Link
            href="https://hithaldia.ac.in/"
            className="text-primary underline-offset-4 hover:underline"
          >
            Haldia Institute of Technology
          </Link>
          , we aim at being your eyes and ears on the campus. Hailing as the
          official media group of the Institution, we are set to bring forth the
          events and the affairs while providing an impulse to your conscience.
          With technology running the game heavily these days, our Android app is
          a part of our expansion to newer, tech-friendly avenues. So, stay tuned
          and never miss out on a notification.
        </p>
      </div>

      <section id="contact-us" className="scroll-mt-24">
        <h2 className="editorial-heading mb-6 text-2xl font-normal">
          Contact Us
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {contactData.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              <Card className="micro-lift h-full border-border/80 transition-[border-color,box-shadow] duration-200 hover:border-border hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
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

export default AboutUs;
