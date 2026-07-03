export function FormClosedState({ programName }: { programName: string }) {
  return (
    <div className="border border-border bg-card px-6 py-10 text-center">
      <p className="tag-editorial mb-3">Closed</p>
      <h2 className="editorial-heading text-2xl font-normal sm:text-3xl">
        {programName} form is closed
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        Registrations are not open right now. Check back later or follow The HIT Times for
        announcements.
      </p>
    </div>
  );
}
