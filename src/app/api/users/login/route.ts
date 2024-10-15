import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Establish the DB connection
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody: { email: string; password: string } = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }
    console.log("User exists");

    // Check if the password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    console.log(user);

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET as string, { expiresIn: "1d" });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure secure cookie in production
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred.";

    // Check if the error is an instance of the Error class to get the message
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
