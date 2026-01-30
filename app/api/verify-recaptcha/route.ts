import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "No reCAPTCHA token provided" },
        { status: 400 }
      );
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY is not configured");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Verify the token with Google's reCAPTCHA API
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    const verificationResponse = await fetch(verificationUrl, {
      method: "POST",
    });

    const verificationData = await verificationResponse.json();

    if (verificationData.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "reCAPTCHA verification failed",
          details: verificationData["error-codes"],
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
