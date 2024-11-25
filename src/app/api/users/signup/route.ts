import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function post(request: NextRequest) {
  try {
    if (!request.body) {
      return NextResponse.json(
        { error: "Request body is null" },
        { status: 400 }
      );
    }
    const body = await request.json();

    const user = new User({
      email: body.email,
      password: body.password,
    });

    await user.save();

    return NextResponse.redirect("/login");
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
