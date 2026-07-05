import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const teams = await Team.find({});
    return Response.json({ code: "success", data: teams }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { success: false, msg: error.message },
      { status: 400 }
    );
  }
}

export async function POST(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token === null || token?.role !== "admin") {
    return Response.json(
      { success: false, msg: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await dbConnect();
    const data = await request.json();

    if (!data.team_code || !data.dept_name) {
      return Response.json(
        { success: false, msg: "team_code and dept_name are required" },
        { status: 400 }
      );
    }

    const existingTeam = await Team.findOne({ team_code: data.team_code });
    if (existingTeam) {
      return Response.json(
        { success: false, msg: "Team with this code already exists" },
        { status: 400 }
      );
    }

    
    const newTeam = await Team.create({
      team_code: data.team_code,
      dept_name: data.dept_name,
    });

    return Response.json({ code: "success", data: newTeam }, { status: 201 });
  } catch (error: any) {
    return Response.json(
      { success: false, msg: error.message },
      { status: 400 }
    );
  }
}