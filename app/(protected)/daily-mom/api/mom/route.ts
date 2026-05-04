import MOM from "@/lib/models/MOM";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// GET all MOM entries for a user
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 },
      );
    }

    const moms = await MOM.find({ userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: moms,
    });
  } catch (error) {
    console.error("GET MOM Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch MOM records",
      },
      { status: 500 },
    );
  }
}

// CREATE new MOM entry
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const newMOM = await MOM.create(body);

    return NextResponse.json(
      {
        success: true,
        data: newMOM,
        message: "MOM created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST MOM Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create MOM",
      },
      { status: 500 },
    );
  }
}
