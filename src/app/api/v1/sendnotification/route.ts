import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import admin from '@/lib/firebase'

export const dynamic = "force-dynamic"; // defaults to force-static

const NOTIFICATION_POST = "posts_notification";
const NOTIFICATION_LIVE = "live_notification";

export async function POST(request: NextRequest) {
  console.log("🚀 Received a request at /api/v1/sendnotification");

  // Retrieve and log the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("🔑 Token received:", token);

  // Check authorization
  if (token === null || token?.role !== "admin") {
    console.error("❌ Unauthorized access attempt");
    return Response.json(
      { success: false, msg: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Parse request body
    const data = await request.json();
    console.log("📩 Request payload:", data);

    const title = data.title;
    const body = data.body;
    const imageURL = data.imageURL;
    var postId = data.postId;
    var notificationType = "POST";

    if (postId == undefined) {
      postId = "";
    }

    const payload = {
      notification: {
        title: title,
        body: body,
        image: imageURL,
      },
      data: {
        postId: postId.toString(),
        type: notificationType,
      },
    };

    console.log("📡 Sending notification with payload:", payload);

    await admin.messaging().sendToTopic(NOTIFICATION_POST, payload);

    console.log("✅ Notification sent successfully");

    return Response.json({ success: true, msg: "Notification Sent" }, { status: 200 });

  } catch (error: any) {
    console.error("🔥 Error while sending notification:", error.message);
    return Response.json(
      { success: false, msg: error.message },
      { status: 400 }
    );
  }
}