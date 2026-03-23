import { createId } from "@paralleldrive/cuid2";
import bcrypt from "bcryptjs";
async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
function generateSessionId() {
  return createId();
}
class SessionManager {
  db;
  constructor(db) {
    this.db = db;
  }
  /**
   * Create a new session for a user
   */
  async createSession(userId, expiresInDays = 30) {
    const sessionId = generateSessionId();
    const expiresAt = /* @__PURE__ */ new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);
    await this.db.run(
      "INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)",
      [sessionId, userId, expiresAt.toISOString()]
    );
    return {
      id: sessionId,
      user_id: userId,
      expires_at: expiresAt,
      created_at: /* @__PURE__ */ new Date()
    };
  }
  /**
   * Validate a session and return the user
   */
  async validateSession(sessionId) {
    const session = await this.db.get(
      "SELECT * FROM sessions WHERE id = ? AND expires_at > datetime('now')",
      [sessionId]
    );
    if (!session) {
      return null;
    }
    const user = await this.db.get("SELECT * FROM users WHERE id = ?", [session.user_id]);
    if (!user) {
      await this.deleteSession(sessionId);
      return null;
    }
    return { user, session };
  }
  /**
   * Delete a session (logout)
   */
  async deleteSession(sessionId) {
    await this.db.run("DELETE FROM sessions WHERE id = ?", [sessionId]);
  }
  /**
   * Clean up expired sessions
   */
  async cleanExpiredSessions() {
    await this.db.run("DELETE FROM sessions WHERE expires_at <= datetime('now')");
  }
  /**
   * Delete all sessions for a user
   */
  async deleteAllUserSessions(userId) {
    await this.db.run("DELETE FROM sessions WHERE user_id = ?", [userId]);
  }
}
export {
  SessionManager as S,
  hashPassword as h,
  verifyPassword as v
};
