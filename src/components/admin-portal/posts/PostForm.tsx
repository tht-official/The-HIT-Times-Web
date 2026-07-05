"use client";

import {
  adminInputClass,
  adminLabelClass,
  adminSelectClass,
} from "@/components/forms/form-styles";
import { dropdownsToSections } from "@/components/weekly-portion/WeeklyPortion";
import ArticleImage from "@/components/weekly-portion/ArticleImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import uploadFile from "@/lib/uploadFile";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface PostFormProps {
  postId?: string;
}

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "link",
  "image",
];

const PostForm = ({ postId }: PostFormProps) => {
  const [message, setMessage] = useState({
    error: false,
    success: false,
    message: "",
  });

  const [postDetails, setPostDetails] = useState({
    title: "",
    description: "",
    link: "",
    dropdown: "00",
    htmlBody: "",
  });

  const [value, setValue] = useState("");
  const [fileN, setFile] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState("");
  const [uploading, setUploading] = useState(false);

  const loadPost = async (id: string) => {
    try {
      const response = await fetch(`/api/v1/post/${id}`);
      if (response.ok) {
        const data = await response.json();
        const postData = data.data;
        setPostDetails({
          title: postData.title,
          description: postData.description,
          link: postData.link,
          dropdown: postData.dropdown,
          htmlBody: postData.htmlBody,
        });
        setValue(postData.htmlBody);
      }
    } catch (error) {
      console.error("Error loading post:", error);
    }
  };

  useEffect(() => {
    if (postId) {
      loadPost(postId);
    }
  }, [postId]);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const form = event.currentTarget;
      const title = (form.elements.namedItem("title") as HTMLInputElement).value;
      const description = (
        form.elements.namedItem("description") as HTMLTextAreaElement
      ).value;
      const link = (form.elements.namedItem("imgurl") as HTMLInputElement).value;
      const dropdown = (form.elements.namedItem("dropdown") as HTMLSelectElement)
        .value;
      const body = value;
      const htmlBody = value;

      const data = { title, description, body, link, dropdown, htmlBody };

      const response = await fetch(
        postId ? `/api/v1/post/${postId}` : "/api/v1/posts",
        {
          method: postId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setMessage({
          error: false,
          success: true,
          message: postId
            ? "Post updated successfully."
            : "Post created successfully.",
        });
        if (!postId) {
          setPostDetails({
            title: "",
            description: "",
            link: "",
            dropdown: "00",
            htmlBody: "",
          });
          setValue("");
          setImageLink("");
        }
      } else {
        setMessage({
          error: true,
          success: false,
          message: `Failed to ${postId ? "update" : "create"} post.`,
        });
      }
    } catch (error: unknown) {
      setMessage({
        error: true,
        success: false,
        message:
          error instanceof Error
            ? error.message
            : `Failed to ${postId ? "update" : "create"} post.`,
      });
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
    }
  };

  const onFileUpload = async () => {
    if (!fileN) return;
    setUploading(true);
    try {
      const imageUrl = await uploadFile(fileN, "/posts");
      if (imageUrl) {
        setImageLink(imageUrl);
        setPostDetails((prev) => ({ ...prev, link: imageUrl }));
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const previewLink = imageLink || postDetails.link;

  return (
    <Card className="border-border/80">
      <CardContent className="space-y-6 pt-6">
        {message.error && (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {message.message}
          </p>
        )}
        {message.success && (
          <p className="rounded-md border border-border bg-muted px-4 py-3 text-sm text-foreground">
            {message.message}
          </p>
        )}

        {previewLink && (
          <div className="space-y-2">
            <p className={adminLabelClass}>Cover image preview</p>
            <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border border-border bg-muted">
              <ArticleImage
                src={previewLink.startsWith("http") ? previewLink : "https://placehold.co/600x400.png"}
                alt="Cover preview"
                className="h-full w-full object-cover"
                width={600}
                height={400}
              />
            </div>
          </div>
        )}

        <form className="grid gap-5" onSubmit={handleOnSubmit}>
          <div className="space-y-2">
            <label className={adminLabelClass} htmlFor="title">
              Title
            </label>
            <input
              className={adminInputClass}
              type="text"
              id="title"
              name="title"
              required
              placeholder="Article title"
              value={postDetails.title}
              onChange={(e) =>
                setPostDetails({ ...postDetails, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className={adminLabelClass} htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className={adminInputClass}
              rows={3}
              required
              placeholder="Short description for cards and previews"
              value={postDetails.description}
              onChange={(e) =>
                setPostDetails({ ...postDetails, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className={adminLabelClass} htmlFor="link">
              Image URL
            </label>
            <input
              required
              placeholder="https://..."
              type="url"
              id="link"
              name="imgurl"
              className={adminInputClass}
              value={imageLink || postDetails.link}
              onChange={(e) => setImageLink(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              className="text-sm text-muted-foreground file:mr-3 file:rounded-md file:border file:border-border file:bg-muted file:px-3 file:py-1.5 file:text-sm file:text-foreground"
              onChange={onFileChange}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!fileN || uploading}
              onClick={onFileUpload}
            >
              {uploading ? "Uploading…" : "Upload image"}
            </Button>
          </div>

          <div className="space-y-2">
            <label className={adminLabelClass} htmlFor="dropdown">
              Section
            </label>
            <select
              className={adminSelectClass}
              id="dropdown"
              name="dropdown"
              value={postDetails.dropdown}
              onChange={(e) =>
                setPostDetails({ ...postDetails, dropdown: e.target.value })
              }
            >
              {Object.entries(dropdownsToSections).map(([code, label]) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className={adminLabelClass}>Body</label>
            <div className="overflow-hidden rounded-md border border-border">
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={quillModules}
                formats={quillFormats}
              />
            </div>
          </div>

          <div className="flex justify-end border-t border-border pt-4">
            <Button type="submit">
              {postId ? "Save changes" : "Create post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostForm;
