import { NextResponse } from "next/server";
import { client } from "@/config/sanity";
import { sendBookingEmail } from "@/lib/email";

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
    };

    const result = await client.create(payload);

    // Send email notification (fire and forget)
    try {
      await sendBookingEmail("Construction Supervision", data);
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // Continue execution to return success for the booking
    }

    return NextResponse.json(
      {
        success: true,
        documentId: result._id,
        message: "Booking submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting construction supervision form:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
