import { error } from "@sveltejs/kit";
function requireAuth(event) {
  if (!event.locals.user) {
    throw error(401, "Unauthorized");
  }
  return event.locals.user.id;
}
export {
  requireAuth as r
};
