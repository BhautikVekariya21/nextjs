import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

// Establish DB connection
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password }: { username: string; email: string; password: string } = reqBody;

    console.log(reqBody);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred.";
    
    // Refine the error to handle specific cases
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
