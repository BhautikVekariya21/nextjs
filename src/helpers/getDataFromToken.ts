import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define a type for the expected decoded token
interface DecodedToken extends JwtPayload {
    id: string;
}

export const getDataFromToken = (request: NextRequest): string => {
    try {
        const token = request.cookies.get("token")?.value || '';
        
        // Verify the token and cast it to the DecodedToken interface
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;
        
        return decodedToken.id;
    } catch (error: unknown) {
        let errorMessage = "An unexpected error occurred.";

        // Check if the error is an instance of the Error class
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }
}
