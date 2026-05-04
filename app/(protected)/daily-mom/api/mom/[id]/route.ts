import MOM from "@/lib/models/MOM";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// UPDATE MOM by ID
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const body = await req.json();

    const updatedMOM = await MOM.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedMOM) {
      return NextResponse.json(
        {
          success: false,
          message: "MOM not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedMOM,
      message: "MOM updated successfully",
    });
  } catch (error) {
    console.error("PUT MOM Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update MOM",
      },
      { status: 500 },
    );
  }
}

// DELETE MOM by ID
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();

    const { id } = await params;

    const deletedMOM = await MOM.findByIdAndDelete(id);

    if (!deletedMOM) {
      return NextResponse.json(
        {
          success: false,
          message: "MOM not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "MOM deleted successfully",
    });
  } catch (error) {
    console.error("DELETE MOM Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete MOM",
      },
      { status: 500 },
    );
  }
}
