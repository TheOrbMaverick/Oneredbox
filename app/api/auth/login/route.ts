import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { verifyPassword } from "@/utils/verify-password";

export async function POST(req: Request) {
  const { clientId, passcode } = await req.json();

  const clientLogin = await client.fetch(
    `*[_type == "client" && _id == "${clientId}"][0]`,
    { clientId },
  );

  if (!clientLogin) {
    return NextResponse.json(
      { error: "Invalid Credentials No User" },
      { status: 401 },
    );
  }

  const isValidUser = await verifyPassword(passcode, clientLogin.passcodeHash);

  if (!isValidUser) {
    return NextResponse.json(
      { error: "Invalid Credentials. Wrong Password" },
      { status: 401 },
    );
  }
  const res = NextResponse.json({ success: true });

  res.cookies.set("dashboard_session", clientLogin._id, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
  return res;
}
