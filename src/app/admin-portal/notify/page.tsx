"use client";

import { useState } from "react";
import { ImgurClient } from "imgur";
import { IBM_Plex_Serif } from "next/font/google";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const clientId = "67d26cd8e568fc7"; // Imgur Client ID

const CreatePostPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const onFileUpload = async () => {
    if (!file) return;

    const client = new ImgurClient({ clientId });
    const reader = new FileReader();

    reader.onloadend = async () => {
      if (typeof reader.result !== "string") return;
      const imageData = reader.result.split(",")[1]; // Extract base64 data

      try {
        const response = await client.upload({
          image: imageData,
          type: "base64",
        });

        if (response.success) {
          setImageLink(response.data.link);
        } else {
          console.error("❌ Image upload failed:", response.data);
        }
      } catch (error) {
        console.error("❌ Error uploading image:", error);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !body) {
      alert("Title and body are required!");
      return;
    }

    try {
      const response = await fetch("/api/v1/sendnotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body, imageURL: imageLink }),
      });

      const result = await response.json();
      if (result.success) {
        console.log("✅ Notification sent:", result.msg);
      } else {
        console.error("❌ Error sending notification:", result.msg);
      }
    } catch (error) {
      console.error("❌ Error sending notification:", error);
    }
  };

  return (
    <div>
      <h1 className={`${ibmPlexSerif.className} text-zinc-800 text-5xl font-semibold py-8`}>
        Notify
      </h1>

      <form className="grid grid-flow-row gap-2 my-2" onSubmit={handleOnSubmit}>
        <label htmlFor="title" className="block text-sm font-medium text-gray-900">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="outline-none px-3 w-full rounded-md border ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm py-1.5"
        />

        <label htmlFor="image" className="block text-sm font-medium text-gray-900">
          Image
        </label>
        <input
          type="text"
          id="image"
          name="imgurl"
          required
          placeholder="Image URL"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
          className="outline-none px-3 w-full rounded-md border ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm py-1.5"
        />

        <div>
          <input type="file" id="imageInput" accept="image/*" onChange={onFileChange} />
          <button
            type="button"
            onClick={onFileUpload}
            className="rounded-full bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
          >
            Upload
          </button>
        </div>

        <label htmlFor="body" className="block text-sm font-medium text-gray-900">
          Body
        </label>
        <textarea
          id="body"
          name="body"
          required
          placeholder="Message"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          className="outline-none px-3 w-full rounded-md border ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm py-1.5"
        ></textarea>

        <div className="flex justify-end gap-4">
          <button
            type="reset"
            className="rounded-full py-1.5 px-2.5 text-sm font-semibold text-gray-900"
            onClick={() => {
              setTitle("");
              setBody("");
              setImageLink("");
            }}
          >
            Clear
          </button>
          <button
            type="submit"
            className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-indigo-600"
          >
            Notify
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
