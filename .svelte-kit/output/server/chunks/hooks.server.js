import { i as initDatabase } from "./db.js";
let dbInitialized = false;
const handle = async ({ event, resolve }) => {
  if (!dbInitialized) {
    try {
      await initDatabase();
      dbInitialized = true;
      console.log("Database initialized successfully");
    } catch (error) {
      console.error("Failed to initialize database:", error);
    }
  }
  return resolve(event);
};
export {
  handle
};
