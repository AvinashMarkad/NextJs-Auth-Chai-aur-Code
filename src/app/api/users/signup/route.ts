import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import IUser from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helper/mailer";

connect();

export async function post(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { username, email, password } = requestBody;
    //validation
    console.log(requestBody);

    const user = await User.findOne({ email });

    if (User) {
      return NextResponse.json(
        { error: "Please fill all fields" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new IUser({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    //send verification email
    await sendMail(email, "VERIFY", savedUser._id);

    return NextResponse.json({
      message: "User created",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
