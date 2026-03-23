import { json } from "@sveltejs/kit";
import { g as getDatabase } from "../../../../../chunks/db.js";
import { S as SessionManager } from "../../../../../chunks/session.js";
const POST = async ({ cookies }) => {
  try {
    const sessionId = cookies.get("session");
    if (!sessionId) {
      return json({ message: "Already logged out" });
    }
    const db = getDatabase();
    const sessionManager = new SessionManager(db);
    await sessionManager.deleteSession(sessionId);
    cookies.set("session", "", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 0
    });
    return json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return json({ error: "Logout failed" }, { status: 500 });
  }
};
export {
  POST
};
