type LegalDocumentProps = {
  title: string;
  children: React.ReactNode;
};

export const LegalDocument: React.FC<LegalDocumentProps> = ({
  title,
  children,
}) => {
  return (
    <div className="animate-in-subtle mx-auto max-w-3xl">
      <h1 className="editorial-heading text-center text-3xl font-normal sm:text-4xl">
        {title}
      </h1>
      <div className="prose-editorial mt-10">{children}</div>
    </div>
  );
};
