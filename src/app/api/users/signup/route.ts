import connectDB from "@/dbconfig/dbConfig";
import User from "@/models/user";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectDB();

        const reqBody  = await req.json();
        const {username , email , password } =  reqBody;
        console.log(username,email,password);
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Validate fields
        if (!username || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Perform additional validation for each field if needed

        // Example: Validate username
        if (username.length < 3 || username.length > 20) {
            console.log('Invalid username');
            return NextResponse.json({ error: 'Invalid username' }, { status: 400 });
        }

        // Example: Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Invalid email');
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
        }

        // Example: Validate password
        // Example: Validate password
        console.log(password.length , password.length < 6 );
        if (password.length < 6 ) {
            console.log('Password must be at least 6 characters long');
            return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
        }


        // All fields are valid, continue with the signup process
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Omit password from the returned user object
        const savedUser = newUser.toObject();
        delete savedUser.password;

        return NextResponse.json({ message: 'User created successfully', user: savedUser }, { status: 200 });
    } catch (error:any) {
        console.error('MongoDB connection error:', error);
        return NextResponse.json({ error: error.message },{status:500});
        
    }
}






