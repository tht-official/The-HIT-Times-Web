"use client";

import {
  adminInputClass,
  adminLabelClass,
} from "@/components/forms/form-styles";
import { MatchImage } from "@/components/matches/MatchImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import uploadFile from "@/lib/uploadFile";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NotifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
    }
  };

  const onFileUpload = async () => {
    if (!file) return;
    setUploading(true);
    setMessage(null);
    try {
      const imageUrl = await uploadFile(file, "/notifications");
      if (imageUrl) {
        setImageLink(imageUrl);
      } else {
        setMessage({ type: "error", text: "Image upload failed." });
      }
    } catch {
      setMessage({ type: "error", text: "Image upload failed." });
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setTitle("");
    setBody("");
    setImageLink("");
    setFile(null);
    setMessage(null);
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !body.trim()) {
      setMessage({ type: "error", text: "Title and body are required." });
      return;
    }

    setSending(true);
    setMessage(null);
    try {
      const response = await fetch("/api/v1/sendnotification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, imageURL: imageLink }),
      });

      const result = await response.json();
      if (result.success) {
        setMessage({ type: "success", text: "Notification sent successfully." });
        handleClear();
      } else {
        setMessage({
          type: "error",
          text: result.msg || "Failed to send notification.",
        });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to send notification." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="animate-in-subtle mx-auto max-w-2xl space-y-8">
      <header className="space-y-4">
        <Button variant="ghost" size="sm" className="-ml-2 gap-1.5" asChild>
          <Link href="/admin-portal">
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">
            Send notification
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Push a notification to app users with a title, image, and message.
          </p>
        </div>
      </header>

      <Card className="border-border/80">
        <CardContent className="space-y-6 pt-6">
          {message && (
            <p
              className={
                message.type === "error"
                  ? "rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  : "rounded-md border border-border bg-muted px-4 py-3 text-sm text-foreground"
              }
            >
              {message.text}
            </p>
          )}

          {imageLink && (
            <div className="space-y-2">
              <p className={adminLabelClass}>Image preview</p>
              <MatchImage
                src={imageLink}
                alt="Notification image"
                className="h-40 w-full max-w-sm rounded-lg border border-border object-cover"
                size={400}
                fallback={<span className="text-xs text-muted-foreground">No image</span>}
              />
            </div>
          )}

          <form className="grid gap-5" onSubmit={handleOnSubmit}>
            <div className="space-y-2">
              <label className={adminLabelClass} htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="Notification title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={adminInputClass}
              />
            </div>

            <div className="space-y-2">
              <label className={adminLabelClass} htmlFor="image">
                Image URL
              </label>
              <input
                type="url"
                id="image"
                name="imgurl"
                required
                placeholder="https://..."
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
                className={adminInputClass}
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
                disabled={!file || uploading}
                onClick={onFileUpload}
              >
                {uploading ? "Uploading…" : "Upload image"}
              </Button>
            </div>

            <div className="space-y-2">
              <label className={adminLabelClass} htmlFor="body">
                Message
              </label>
              <textarea
                id="body"
                name="body"
                required
                placeholder="Notification body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                className={adminInputClass}
              />
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-4">
              <Button type="button" variant="outline" onClick={handleClear}>
                Clear
              </Button>
              <Button type="submit" disabled={sending}>
                {sending ? "Sending…" : "Send notification"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
