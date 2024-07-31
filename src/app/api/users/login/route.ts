import connectDB from "@/dbconfig/dbConfig";
import User from "@/models/user";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
var jwt = require('jsonwebtoken');

export async function POST(req: NextRequest, res: NextResponse) {
    try {
      await connectDB();
  
      const reqBody = await req.json();
      const { email, password } = reqBody;
  
      // Validate fields
      if (!email || !password) {
        console.log('password is required em is required');
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      // Find the user by email
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        console.log('existingUser is not found');

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
  
      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      // Create token data
      const tokenData = {
        userId: existingUser._id,
        username: existingUser.username,
        email: existingUser.email
      };

      // Generate token
      const token = await jwt.sign(tokenData, process.env.JWT_SECRET , { expiresIn: '5h' });

      // Add token to the user object
  
      // Omit password from the returned user object
      const loggedInUser = existingUser.toObject();
      delete loggedInUser.password;
  
      // Return success response with user data (without password)
      const response  =  NextResponse.json({ message: 'Login successful', user: loggedInUser }, { status: 200 });
      console.log(response);
    // Set token as a cookie in the response
    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });

    return response;
    } catch (error: any) {
      console.error('MongoDB connection error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }