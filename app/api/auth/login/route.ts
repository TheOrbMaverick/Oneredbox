import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

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

  const isValidUser = await bcrypt.compare(passcode, clientLogin.passcodeHash);

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

// http://localhost:3333/studio/structure/client;026b5b43-e749-465b-915a-b399aa56e886
