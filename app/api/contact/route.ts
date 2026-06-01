import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Validate the body (common cause of 500s)
    if (!body.email || !body.message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 2. Wrap external logic (like Nodemailer or Database) in this try block
    // await sendEmail(body); 

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error); // This shows up in your terminal
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}