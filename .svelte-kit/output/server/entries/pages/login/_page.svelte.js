import { D as push, T as head, K as push_element, N as pop_element, M as escape_html, V as attr, G as pop, I as FILENAME } from "../../../chunks/index.js";
import "../../../chunks/client.js";
import { P as Piggy_bank } from "../../../chunks/piggy-bank.js";
_page[FILENAME] = "src/routes/login/+page.svelte";
function _page($$payload, $$props) {
  push(_page);
  let email = "";
  let password = "";
  let loading = false;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html("Sign In")} - Budget Tracker</title>`;
  });
  $$payload.out.push(`<div class="auth-container svelte-6xmy3x">`);
  push_element($$payload, "div", 55, 0);
  $$payload.out.push(`<div class="auth-card svelte-6xmy3x">`);
  push_element($$payload, "div", 56, 1);
  $$payload.out.push(`<div class="brand-section svelte-6xmy3x">`);
  push_element($$payload, "div", 58, 2);
  $$payload.out.push(`<div class="logo svelte-6xmy3x">`);
  push_element($$payload, "div", 59, 3);
  Piggy_bank($$payload, { size: 32 });
  $$payload.out.push(`<!----></div>`);
  pop_element();
  $$payload.out.push(` <h1 class="brand-name svelte-6xmy3x">`);
  push_element($$payload, "h1", 62, 3);
  $$payload.out.push(`Budget Tracker</h1>`);
  pop_element();
  $$payload.out.push(` <p class="brand-tagline svelte-6xmy3x">`);
  push_element($$payload, "p", 63, 3);
  $$payload.out.push(`Manage your finances with ease</p>`);
  pop_element();
  $$payload.out.push(`</div>`);
  pop_element();
  $$payload.out.push(` <div class="form-section svelte-6xmy3x">`);
  push_element($$payload, "div", 67, 2);
  $$payload.out.push(`<div class="form-header svelte-6xmy3x">`);
  push_element($$payload, "div", 68, 3);
  $$payload.out.push(`<h2 class="svelte-6xmy3x">`);
  push_element($$payload, "h2", 69, 4);
  $$payload.out.push(`${escape_html("Welcome back")}</h2>`);
  pop_element();
  $$payload.out.push(` <p class="svelte-6xmy3x">`);
  push_element($$payload, "p", 70, 4);
  $$payload.out.push(`${escape_html("Sign in to continue")}</p>`);
  pop_element();
  $$payload.out.push(`</div>`);
  pop_element();
  $$payload.out.push(` <form class="auth-form svelte-6xmy3x">`);
  push_element($$payload, "form", 73, 3);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <div class="form-group svelte-6xmy3x">`);
  push_element($$payload, "div", 87, 4);
  $$payload.out.push(`<label for="email" class="svelte-6xmy3x">`);
  push_element($$payload, "label", 88, 5);
  $$payload.out.push(`Email</label>`);
  pop_element();
  $$payload.out.push(` <input id="email" type="email"${attr("value", email)} required placeholder="you@example.com" class="svelte-6xmy3x"/>`);
  push_element($$payload, "input", 89, 5);
  pop_element();
  $$payload.out.push(`</div>`);
  pop_element();
  $$payload.out.push(` <div class="form-group svelte-6xmy3x">`);
  push_element($$payload, "div", 98, 4);
  $$payload.out.push(`<label for="password" class="svelte-6xmy3x">`);
  push_element($$payload, "label", 99, 5);
  $$payload.out.push(`Password</label>`);
  pop_element();
  $$payload.out.push(` <div class="password-wrapper svelte-6xmy3x">`);
  push_element($$payload, "div", 100, 5);
  $$payload.out.push(`<input id="password"${attr("type", "password")}${attr("value", password)} required minlength="8" placeholder="Min. 8 characters" class="svelte-6xmy3x"/>`);
  push_element($$payload, "input", 101, 6);
  pop_element();
  $$payload.out.push(` <button type="button" class="password-toggle svelte-6xmy3x">`);
  push_element($$payload, "button", 109, 6);
  {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`);
    push_element($$payload, "svg", 116, 8);
    $$payload.out.push(`<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-8z">`);
    push_element($$payload, "path", 117, 9);
    $$payload.out.push(`</path>`);
    pop_element();
    $$payload.out.push(`<circle cx="12" cy="12" r="3">`);
    push_element($$payload, "circle", 118, 9);
    $$payload.out.push(`</circle>`);
    pop_element();
    $$payload.out.push(`</svg>`);
    pop_element();
  }
  $$payload.out.push(`<!--]--></button>`);
  pop_element();
  $$payload.out.push(`</div>`);
  pop_element();
  $$payload.out.push(`</div>`);
  pop_element();
  $$payload.out.push(` `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <button type="submit"${attr("disabled", loading, true)} class="submit-btn svelte-6xmy3x">`);
  push_element($$payload, "button", 136, 4);
  {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`${escape_html("Sign In")}`);
  }
  $$payload.out.push(`<!--]--></button>`);
  pop_element();
  $$payload.out.push(`</form>`);
  pop_element();
  $$payload.out.push(` <div class="form-footer svelte-6xmy3x">`);
  push_element($$payload, "div", 146, 3);
  $$payload.out.push(`<p class="svelte-6xmy3x">`);
  push_element($$payload, "p", 147, 4);
  $$payload.out.push(`${escape_html("Don't have an account?")} <button type="button" class="svelte-6xmy3x">`);
  push_element($$payload, "button", 149, 5);
  $$payload.out.push(`${escape_html("Sign up")}</button>`);
  pop_element();
  $$payload.out.push(`</p>`);
  pop_element();
  $$payload.out.push(`</div>`);
  pop_element();
  $$payload.out.push(`</div>`);
  pop_element();
  $$payload.out.push(`</div>`);
  pop_element();
  $$payload.out.push(`</div>`);
  pop_element();
  pop();
}
_page.render = function() {
  throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
export {
  _page as default
};
