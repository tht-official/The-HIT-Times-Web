import { PostsLayoutClient } from "@/components/layout/PostsLayoutClient";

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PostsLayoutClient>{children}</PostsLayoutClient>;
}
