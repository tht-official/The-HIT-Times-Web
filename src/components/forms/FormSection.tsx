import { cn } from "@/lib/utils";

export function FormSection({
  title,
  description,
  required,
  children,
  className,
}: {
  title?: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border border-border bg-card", className)}>
      {(title || description) && (
        <div className="border-b border-border px-6 py-4">
          {title && (
            <p className="text-sm font-medium text-foreground">
              {title}
              {required && <span className="ml-1 text-destructive">*</span>}
            </p>
          )}
          {description && (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}
