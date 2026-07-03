import { Alumni } from "@/models/Alumnus";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function formatImageSrc(src: string): string {
  if (!src || typeof src !== "string") return "/no-image.png";
  if (src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return `/${src}`;
}

const extractImageUrl = (url: string): string => {
  const googleDriveMatch = url.match(
    /https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([^\/&]+)/
  );
  const extractedUrl = googleDriveMatch
    ? `https://drive.google.com/thumbnail?id=${googleDriveMatch[1]}&sz=w500`
    : url;
  return formatImageSrc(extractedUrl);
};

const AlumniCard: React.FC<Alumni> = ({ name, profile_image, position, linkedin }) => {
  const content = (
    <Card
      className={cn(
        "micro-lift flex w-36 flex-col items-center border-border/80 bg-card p-4 text-center transition-[border-color,box-shadow] duration-200 hover:border-border hover:shadow-md",
        linkedin && "cursor-pointer"
      )}
    >
      <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full ring-2 ring-border transition-[ring-color] duration-200 group-hover:ring-primary/40">
        <Image
          src={extractImageUrl(profile_image)}
          alt={`${name}`}
          fill
          className="object-cover"
        />
      </div>
      <h4 className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
        {name}
      </h4>
      {position && (
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{position}</p>
      )}
    </Card>
  );

  if (linkedin) {
    return (
      <Link href={linkedin} target="_blank" rel="noopener noreferrer" className="group">
        {content}
      </Link>
    );
  }

  return content;
};

export default AlumniCard;
