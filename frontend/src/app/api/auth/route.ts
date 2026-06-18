import { NextResponse } from "next/server";
import { readLocalUsers, writeLocalUsers } from "@/lib/localDb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password credentials." }, { status: 400 });
    }

    const currentUsers = readLocalUsers();

    // ACTION: SIGNUP LOGIC
    if (action === "signup") {
      const userExists = currentUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
      }

      const newUser = {
        id: "usr_" + Math.random().toString(36).substring(2, 9),
        name: name || "Premium Fleet Guest",
        email: email.toLowerCase(),
        password, // Note: Ready to swap with 'await bcrypt.hash(password, 10)' when migrating to live database
        createdAt: new Date().toISOString()
      };

      currentUsers.push(newUser);
      writeLocalUsers(currentUsers);

      return NextResponse.json({
        message: "Registration successful!",
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
      }, { status: 201 });
    }

    // ACTION: LOGIN LOGIC
    if (action === "login") {
      const user = currentUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (!user || user.password !== password) {
        return NextResponse.json({ error: "Invalid email or matching credentials." }, { status: 401 });
      }

      return NextResponse.json({
        message: "Access authorized!",
        user: { id: user.id, name: user.name, email: user.email }
      }, { status: 200 });
    }

    // ACTION: MOCK FORGOT PASSWORD ROUTINE
    if (action === "forgot") {
      const user = currentUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        return NextResponse.json({ error: "No profile matching that email address found." }, { status: 404 });
      }
      
      // In production, an asynchronous transaction email handler executes here
      return NextResponse.json({ 
        message: "Password recovery credentials dispatched! (Mock server confirmation: Your password is '" + user.password + "')" 
      }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid action type executed." }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Internal operational data stack breakdown." }, { status: 500 });
  }
}