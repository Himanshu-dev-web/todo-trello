import { NextRequest,NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    // Perform logout logic here
    // For example, clear session, remove tokens, etc.

    try {
        console.log("Logging out");

        const response = NextResponse.json({message : "Logout Successful",success:"true"});
       response.cookies.set('token', '', {
        httpOnly: true,
        expires: new Date(0),
      });
      return response;
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}