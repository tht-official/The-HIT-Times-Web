import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token === null || token?.role !== "admin") {
    return Response.json(
      { success: false, msg: "Unauthorized" },
      { status: 401 },
    );
  }
  return Response.json({ token });
}
