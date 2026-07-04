import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "THT Admin Portal",
  description: "Admin portal for handling THT app and database",
};

export default function AdminPortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        theme="colored"
        toastClassName="!rounded-lg !text-sm"
      />
      {children}
    </div>
  );
}
