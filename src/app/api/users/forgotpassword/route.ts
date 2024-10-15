import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Send the reset password email
    await sendEmail({
      email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json({ message: "Reset password email sent." });

  } catch (error) {
    return NextResponse.json({ error: "Error sending reset email"+ error }, { status: 500 });
  }
}
