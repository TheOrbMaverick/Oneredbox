import { NextResponse } from "next/server";
import { client } from "@/config/sanity";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create document in Sanity
    const payload = {
      _type: "constructionSupervision",
      ...data,
      submittedAt: new Date().toISOString(),
    };

    const result = await client.create(payload);

    return NextResponse.json({
      success: true,
      documentId: result._id,
    });
  } catch (error) {
    console.error("Error submitting construction supervision form:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
