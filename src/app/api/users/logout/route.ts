import { NextRequest,NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    // Perform logout logic here
    // For example, clear session, remove tokens, etc.

    try {
       const response = NextResponse.json({message : "Logout Successful",success:"true"}, {status: 200});
       response.cookies.set('token', '', {
        httpOnly: true,
        expires: new Date(0),
      });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}