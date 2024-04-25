export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="w-fit mx-auto prose prose-h1:m-0 prose-h1:p-0 prose-p:pl-1.5 prose-p:mt-0.5 prose-slate prose-img:w-1/3">
      {children}
    </div>
  );
}
