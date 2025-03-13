import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import admin from '@/lib/firebase'; 

const NOTIFICATION_LIVE = "live_notification";

export async function POST(request: NextRequest) {
  console.log("🚀 Received request at /api/v1/sendnotification");

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token || token.role !== "admin") {
    return NextResponse.json(
      { success: false, msg: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const data = await request.json();
    console.log("📩 Received payload:", data);

    const body = data.data || "New live event is happening now!";
    const imageURL = data.imageURL || ""; 
    let postId = data.postId || "";

    const message = {
      topic: NOTIFICATION_LIVE, 
      notification: { body, image: imageURL }, 
      data: { postId: postId.toString(), type: "LIVE" },  
    };

    const response = await admin.messaging().send(message);

    console.log("✅ Notification sent to topic. Response:", response);
    return NextResponse.json(
      { success: true, msg: "Notification Sent" },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("🔥 Error while sending notification:", error.message);
    return NextResponse.json(
      { success: false, msg: error.message },
      { status: 400 }
    );
  }
}