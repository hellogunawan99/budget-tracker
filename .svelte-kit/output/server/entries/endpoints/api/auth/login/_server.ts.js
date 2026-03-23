import { json } from "@sveltejs/kit";
import { g as getDatabase, c as config } from "../../../../../chunks/db.js";
import { v as verifyPassword, S as SessionManager } from "../../../../../chunks/session.js";
const POST = async ({ request }) => {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return json({ error: "Missing email or password" }, { status: 400 });
    }
    const db = getDatabase();
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user || !user.password_hash) {
      return json({ error: "Invalid email or password" }, { status: 401 });
    }
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return json({ error: "Invalid email or password" }, { status: 401 });
    }
    const sessionManager = new SessionManager(db);
    const session = await sessionManager.createSession(user.id);
    const isSecure = config.isProduction;
    const response = json({
      user: { id: user.id, name: user.name, email: user.email },
      message: "Login successful"
    });
    response.headers.set(
      "Set-Cookie",
      `session=${session.id}; Path=/; HttpOnly; ${isSecure ? "Secure;" : ""} SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`
    );
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return json({ error: "Login failed" }, { status: 500 });
  }
};
export {
  POST
};
