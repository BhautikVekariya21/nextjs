import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });

        // Set cookie to clear the token
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
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
