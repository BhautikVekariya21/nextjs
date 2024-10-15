import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        // Check if user is found
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User found",
            data: user,
        });
    } catch (error: unknown) {
        let errorMessage = "An unexpected error occurred.";

        // Check if the error is an instance of the Error class
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}
