import { json } from "@sveltejs/kit";
import { g as getDatabase, c as config } from "../../../../../chunks/db.js";
import { h as hashPassword, S as SessionManager } from "../../../../../chunks/session.js";
const POST = async ({ request }) => {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }
    if (password.length < 8) {
      return json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }
    const db = getDatabase();
    const existingUser = await db.get("SELECT id FROM users WHERE email = ?", [email]);
    if (existingUser) {
      return json({ error: "User already exists" }, { status: 400 });
    }
    const passwordHash = await hashPassword(password);
    const result = await db.run(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, passwordHash]
    );
    const userId = result.lastID;
    const sessionManager = new SessionManager(db);
    const session = await sessionManager.createSession(userId);
    const isSecure = config.isProduction;
    const response = json(
      {
        user: { id: userId, name, email },
        message: "Registration successful"
      },
      { status: 201 }
    );
    response.headers.set(
      "Set-Cookie",
      `session=${session.id}; Path=/; HttpOnly; ${isSecure ? "Secure;" : ""} SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`
    );
    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return json({ error: "Registration failed" }, { status: 500 });
  }
};
export {
  POST
};
