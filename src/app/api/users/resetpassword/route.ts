import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    // Find user by token and check expiration
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // Hash new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Password has been reset successfully",
      success: true,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
