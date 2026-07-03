import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function FormActions({
  isSubmitting,
  submitLabel = "Submit",
  onClear,
  clearLabel = "Clear form",
}: {
  isSubmitting?: boolean;
  submitLabel?: string;
  onClear?: () => void;
  clearLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? "Submitting…" : submitLabel}
      </Button>
      {onClear && (
        <Button type="button" variant="ghost" onClick={onClear} className="w-full sm:w-auto">
          {clearLabel}
        </Button>
      )}
    </div>
  );
}
