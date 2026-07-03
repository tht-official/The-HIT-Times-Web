import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
}

export function Container({
  className,
  size = "default",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        size === "default" && "max-w-screen-2.5xl 2.5xl:mx-auto",
        size === "narrow" && "max-w-3xl",
        size === "wide" && "max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
