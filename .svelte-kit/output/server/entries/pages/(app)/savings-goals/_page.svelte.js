import { O as sanitize_props, D as push, P as spread_props, F as prevent_snippet_stringification, Q as slot, G as pop, I as FILENAME, T as head, K as push_element, N as pop_element, M as escape_html, S as ensure_array_like, U as attr_class, V as attr, X as attr_style, Z as bind_props, Y as stringify } from "../../../../chunks/index.js";
import "../../../../chunks/client.js";
import { f as formatCurrency } from "../../../../chunks/date.js";
import { B as Button } from "../../../../chunks/Button.js";
import { P as Piggy_bank } from "../../../../chunks/piggy-bank.js";
import { C as Check } from "../../../../chunks/check.js";
import { D as Dollar_sign } from "../../../../chunks/dollar-sign.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { T as Trending_up, a as Target } from "../../../../chunks/trending-up.js";
import { C as Calendar } from "../../../../chunks/calendar.js";
import { T as Trash_2 } from "../../../../chunks/trash-2.js";
import { P as Plus } from "../../../../chunks/plus.js";
Award[FILENAME] = "node_modules/lucide-svelte/dist/icons/award.svelte";
function Award($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(Award);
  /**
   * @license lucide-svelte v0.541.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * ---
   *
   * The MIT License (MIT) (for portions derived from Feather)
   *
   * Copyright (c) 2013-2023 Cole Bemis
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   */
  const iconNode = [
    [
      "path",
      {
        "d": "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"
      }
    ],
    ["circle", { "cx": "12", "cy": "8", "r": "6" }]
  ];
  Icon($$payload, spread_props([
    { name: "award" },
    $$sanitized_props,
    {
      /**
       * @component @name Award
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTUuNDc3IDEyLjg5IDEuNTE1IDguNTI2YS41LjUgMCAwIDEtLjgxLjQ3bC0zLjU4LTIuNjg3YTEgMSAwIDAgMC0xLjE5NyAwbC0zLjU4NiAyLjY4NmEuNS41IDAgMCAxLS44MS0uNDY5bDEuNTE0LTguNTI2IiAvPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iNiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/award
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: prevent_snippet_stringification(($$payload2) => {
        $$payload2.out.push(`<!---->`);
        slot($$payload2, $$props, "default", {});
        $$payload2.out.push(`<!---->`);
      }),
      $$slots: { default: true }
    }
  ]));
  pop();
}
Award.render = function() {
  throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
Clock[FILENAME] = "node_modules/lucide-svelte/dist/icons/clock.svelte";
function Clock($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(Clock);
  /**
   * @license lucide-svelte v0.541.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * ---
   *
   * The MIT License (MIT) (for portions derived from Feather)
   *
   * Copyright (c) 2013-2023 Cole Bemis
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   */
  const iconNode = [
    ["path", { "d": "M12 6v6l4 2" }],
    ["circle", { "cx": "12", "cy": "12", "r": "10" }]
  ];
  Icon($$payload, spread_props([
    { name: "clock" },
    $$sanitized_props,
    {
      /**
       * @component @name Clock
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgNnY2bDQgMiIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/clock
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: prevent_snippet_stringification(($$payload2) => {
        $$payload2.out.push(`<!---->`);
        slot($$payload2, $$props, "default", {});
        $$payload2.out.push(`<!---->`);
      }),
      $$slots: { default: true }
    }
  ]));
  pop();
}
Clock.render = function() {
  throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
_page[FILENAME] = "src/routes/(app)/savings-goals/+page.svelte";
function _page($$payload, $$props) {
  push(_page);
  let fullyFundedGoals, partiallyFundedGoals, totalGoals;
  let data = $$props["data"];
  let form = $$props["form"];
  let editingGoal = null;
  let editFormData = { id: 0, title: "", targetAmount: "", deadline: "" };
  function getProgressColor(percentage) {
    if (percentage >= 100) return "completed";
    if (percentage >= 75) return "excellent";
    if (percentage >= 50) return "good";
    if (percentage >= 25) return "fair";
    return "low";
  }
  function getDaysRemaining(deadline) {
    if (!deadline) return null;
    const today = /* @__PURE__ */ new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diff / (1e3 * 60 * 60 * 24));
  }
  fullyFundedGoals = data.savingsGoals?.filter((goal) => (goal.progressPercentage || 0) >= 100).length || 0;
  partiallyFundedGoals = data.savingsGoals?.filter((goal) => (goal.progressPercentage || 0) > 0 && (goal.progressPercentage || 0) < 100).length || 0;
  totalGoals = data.savingsGoals?.length || 0;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Savings Goals - Budget Tracker</title>`;
  });
  $$payload.out.push(`<div class="savings-page svelte-znkokt">`);
  push_element($$payload, "div", 69, 0);
  $$payload.out.push(`<div class="page-header svelte-znkokt">`);
  push_element($$payload, "div", 71, 1);
  $$payload.out.push(`<div class="header-content svelte-znkokt">`);
  push_element($$payload, "div", 72, 2);
  $$payload.out.push(`<div class="header-icon svelte-znkokt">`);
  push_element($$payload, "div", 73, 3);
  Piggy_bank($$payload, {});
  $$payload.out.push(`<!----></div>`);
  pop_element();
  $$payload.out.push(` <div>`);
  push_element($$payload, "div", 76, 3);
  $$payload.out.push(`<h1 class="svelte-znkokt">`);
  push_element($$payload, "h1", 77, 4);
  $$payload.out.push(`Savings Goals</h1>`);
  pop_element();
  $$payload.out.push(` <p class="svelte-znkokt">`);
  push_element($$payload, "p", 78, 4);
  $$payload.out.push(`Track your progress towards financial milestones</p>`);
  pop_element();
  $$payload.out.push(`</div>`);
  pop_element();
  $$payload.out.push(`</div>`);
  pop_element();
  $$payload.out.push(` `);
  Button($$payload, {
    children: prevent_snippet_stringification(($$payload2) => {
      Plus($$payload2, { class: "w-4 h-4" });
      $$payload2.out.push(`<!----> New Goal`);
    }),
    $$slots: { default: true }
  });
  $$payload.out.push(`<!----></div>`);
  pop_element();
  $$payload.out.push(` `);
  if (form?.error) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="error-banner svelte-znkokt">`);
    push_element($$payload, "div", 88, 2);
    $$payload.out.push(`<div class="error-icon svelte-znkokt">`);
    push_element($$payload, "div", 89, 3);
    $$payload.out.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">`);
    push_element($$payload, "svg", 90, 4);
    $$payload.out.push(`<circle cx="12" cy="12" r="10">`);
    push_element($$payload, "circle", 91, 5);
    $$payload.out.push(`</circle>`);
    pop_element();
    $$payload.out.push(`<line x1="12" y1="8" x2="12" y2="12">`);
    push_element($$payload, "line", 92, 5);
    $$payload.out.push(`</line>`);
    pop_element();
    $$payload.out.push(`<line x1="12" y1="16" x2="12.01" y2="16">`);
    push_element($$payload, "line", 93, 5);
    $$payload.out.push(`</line>`);
    pop_element();
    $$payload.out.push(`</svg>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(` <div>`);
    push_element($$payload, "div", 96, 3);
    $$payload.out.push(`<h3 class="svelte-znkokt">`);
    push_element($$payload, "h3", 97, 4);
    $$payload.out.push(`Error</h3>`);
    pop_element();
    $$payload.out.push(` <p class="svelte-znkokt">`);
    push_element($$payload, "p", 98, 4);
    $$payload.out.push(`${escape_html(form.error)}</p>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> `);
  if (form?.success) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="success-banner svelte-znkokt">`);
    push_element($$payload, "div", 104, 2);
    $$payload.out.push(`<div class="success-icon svelte-znkokt">`);
    push_element($$payload, "div", 105, 3);
    Check($$payload, {});
    $$payload.out.push(`<!----></div>`);
    pop_element();
    $$payload.out.push(` <div>`);
    push_element($$payload, "div", 108, 3);
    $$payload.out.push(`<h3 class="svelte-znkokt">`);
    push_element($$payload, "h3", 109, 4);
    $$payload.out.push(`Success</h3>`);
    pop_element();
    $$payload.out.push(` <p class="svelte-znkokt">`);
    push_element($$payload, "p", 110, 4);
    $$payload.out.push(`Action completed successfully!</p>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> `);
  if (!data.error) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="overview-grid svelte-znkokt">`);
    push_element($$payload, "div", 117, 2);
    $$payload.out.push(`<div class="overview-card total-card svelte-znkokt">`);
    push_element($$payload, "div", 118, 3);
    $$payload.out.push(`<div class="card-accent svelte-znkokt">`);
    push_element($$payload, "div", 119, 4);
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(` <div class="card-content svelte-znkokt">`);
    push_element($$payload, "div", 120, 4);
    $$payload.out.push(`<div class="card-icon svelte-znkokt">`);
    push_element($$payload, "div", 121, 5);
    Dollar_sign($$payload, {});
    $$payload.out.push(`<!----></div>`);
    pop_element();
    $$payload.out.push(` <div class="card-details svelte-znkokt">`);
    push_element($$payload, "div", 124, 5);
    $$payload.out.push(`<span class="card-label svelte-znkokt">`);
    push_element($$payload, "span", 125, 6);
    $$payload.out.push(`Total Accumulated</span>`);
    pop_element();
    $$payload.out.push(` <span class="card-value svelte-znkokt">`);
    push_element($$payload, "span", 126, 6);
    $$payload.out.push(`${escape_html(formatCurrency(data.totalAccumulatedSavings || 0))}</span>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(` <div class="overview-card achieved-card svelte-znkokt">`);
    push_element($$payload, "div", 131, 3);
    $$payload.out.push(`<div class="card-accent svelte-znkokt">`);
    push_element($$payload, "div", 132, 4);
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(` <div class="card-content svelte-znkokt">`);
    push_element($$payload, "div", 133, 4);
    $$payload.out.push(`<div class="card-icon achieved svelte-znkokt">`);
    push_element($$payload, "div", 134, 5);
    Award($$payload, {});
    $$payload.out.push(`<!----></div>`);
    pop_element();
    $$payload.out.push(` <div class="card-details svelte-znkokt">`);
    push_element($$payload, "div", 137, 5);
    $$payload.out.push(`<span class="card-label svelte-znkokt">`);
    push_element($$payload, "span", 138, 6);
    $$payload.out.push(`Goals Achieved</span>`);
    pop_element();
    $$payload.out.push(` <span class="card-value svelte-znkokt">`);
    push_element($$payload, "span", 139, 6);
    $$payload.out.push(`${escape_html(fullyFundedGoals)} <span class="card-sub svelte-znkokt">`);
    push_element($$payload, "span", 139, 50);
    $$payload.out.push(`of ${escape_html(totalGoals)}</span>`);
    pop_element();
    $$payload.out.push(`</span>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(` <div class="overview-card progress-card svelte-znkokt">`);
    push_element($$payload, "div", 144, 3);
    $$payload.out.push(`<div class="card-accent svelte-znkokt">`);
    push_element($$payload, "div", 145, 4);
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(` <div class="card-content svelte-znkokt">`);
    push_element($$payload, "div", 146, 4);
    $$payload.out.push(`<div class="card-icon progress svelte-znkokt">`);
    push_element($$payload, "div", 147, 5);
    Trending_up($$payload, {});
    $$payload.out.push(`<!----></div>`);
    pop_element();
    $$payload.out.push(` <div class="card-details svelte-znkokt">`);
    push_element($$payload, "div", 150, 5);
    $$payload.out.push(`<span class="card-label svelte-znkokt">`);
    push_element($$payload, "span", 151, 6);
    $$payload.out.push(`In Progress</span>`);
    pop_element();
    $$payload.out.push(` <span class="card-value svelte-znkokt">`);
    push_element($$payload, "span", 152, 6);
    $$payload.out.push(`${escape_html(partiallyFundedGoals)}</span>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(` <div class="tip-banner svelte-znkokt">`);
    push_element($$payload, "div", 159, 2);
    $$payload.out.push(`<div class="tip-icon svelte-znkokt">`);
    push_element($$payload, "div", 160, 3);
    Trending_up($$payload, {});
    $$payload.out.push(`<!----></div>`);
    pop_element();
    $$payload.out.push(` <p class="svelte-znkokt">`);
    push_element($$payload, "p", 163, 3);
    $$payload.out.push(`Each goal shows progress based on your total accumulated savings. You can achieve multiple goals with the same savings!</p>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> `);
  if (data.error) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="error-card svelte-znkokt">`);
    push_element($$payload, "div", 168, 2);
    $$payload.out.push(`<div class="error-icon svelte-znkokt">`);
    push_element($$payload, "div", 169, 3);
    $$payload.out.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">`);
    push_element($$payload, "svg", 170, 4);
    $$payload.out.push(`<circle cx="12" cy="12" r="10">`);
    push_element($$payload, "circle", 171, 5);
    $$payload.out.push(`</circle>`);
    pop_element();
    $$payload.out.push(`<line x1="12" y1="8" x2="12" y2="12">`);
    push_element($$payload, "line", 172, 5);
    $$payload.out.push(`</line>`);
    pop_element();
    $$payload.out.push(`<line x1="12" y1="16" x2="12.01" y2="16">`);
    push_element($$payload, "line", 173, 5);
    $$payload.out.push(`</line>`);
    pop_element();
    $$payload.out.push(`</svg>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
    $$payload.out.push(` <h3 class="svelte-znkokt">`);
    push_element($$payload, "h3", 176, 3);
    $$payload.out.push(`Unable to Load Savings Goals</h3>`);
    pop_element();
    $$payload.out.push(` <p class="svelte-znkokt">`);
    push_element($$payload, "p", 177, 3);
    $$payload.out.push(`${escape_html(data.error)}</p>`);
    pop_element();
    $$payload.out.push(`</div>`);
    pop_element();
  } else {
    $$payload.out.push("<!--[!-->");
    {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--> `);
    if (data.savingsGoals && data.savingsGoals.length > 0) {
      $$payload.out.push("<!--[-->");
      const each_array = ensure_array_like(data.savingsGoals);
      $$payload.out.push(`<div class="goals-grid svelte-znkokt">`);
      push_element($$payload, "div", 243, 3);
      $$payload.out.push(`<!--[-->`);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let goal = each_array[$$index];
        const progressPercentage = goal.progressPercentage || 0;
        const progressColor = getProgressColor(progressPercentage);
        const daysRemaining = getDaysRemaining(goal.deadline);
        $$payload.out.push(`<div${attr_class("goal-card svelte-znkokt", void 0, { "completed": progressPercentage >= 100 })}>`);
        push_element($$payload, "div", 248, 5);
        $$payload.out.push(`<div class="goal-header svelte-znkokt">`);
        push_element($$payload, "div", 250, 6);
        $$payload.out.push(`<div${attr_class("goal-icon svelte-znkokt", void 0, { "completed": progressPercentage >= 100 })}>`);
        push_element($$payload, "div", 251, 7);
        Target($$payload, {});
        $$payload.out.push(`<!----></div>`);
        pop_element();
        $$payload.out.push(` <div class="goal-title-area svelte-znkokt">`);
        push_element($$payload, "div", 254, 7);
        $$payload.out.push(`<h3 class="svelte-znkokt">`);
        push_element($$payload, "h3", 255, 8);
        $$payload.out.push(`${escape_html(goal.title)}</h3>`);
        pop_element();
        $$payload.out.push(` `);
        if (goal.deadline) {
          $$payload.out.push("<!--[-->");
          $$payload.out.push(`<p class="goal-deadline svelte-znkokt">`);
          push_element($$payload, "p", 257, 9);
          Calendar($$payload, { class: "w-3 h-3" });
          $$payload.out.push(`<!----> `);
          if (daysRemaining !== null) {
            $$payload.out.push("<!--[-->");
            if (daysRemaining < 0) {
              $$payload.out.push("<!--[-->");
              $$payload.out.push(`<span class="overdue svelte-znkokt">`);
              push_element($$payload, "span", 261, 12);
              $$payload.out.push(`Deadline passed</span>`);
              pop_element();
            } else {
              $$payload.out.push("<!--[!-->");
              if (daysRemaining === 0) {
                $$payload.out.push("<!--[-->");
                $$payload.out.push(`<span class="today svelte-znkokt">`);
                push_element($$payload, "span", 263, 12);
                $$payload.out.push(`Due today</span>`);
                pop_element();
              } else {
                $$payload.out.push("<!--[!-->");
                $$payload.out.push(`<span>`);
                push_element($$payload, "span", 265, 12);
                $$payload.out.push(`${escape_html(daysRemaining)} days left</span>`);
                pop_element();
              }
              $$payload.out.push(`<!--]-->`);
            }
            $$payload.out.push(`<!--]-->`);
          } else {
            $$payload.out.push("<!--[!-->");
          }
          $$payload.out.push(`<!--]--></p>`);
          pop_element();
        } else {
          $$payload.out.push("<!--[!-->");
        }
        $$payload.out.push(`<!--]--></div>`);
        pop_element();
        $$payload.out.push(` <div class="goal-actions svelte-znkokt">`);
        push_element($$payload, "div", 271, 7);
        $$payload.out.push(`<button class="action-btn svelte-znkokt" title="Edit">`);
        push_element($$payload, "button", 272, 8);
        $$payload.out.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">`);
        push_element($$payload, "svg", 273, 9);
        $$payload.out.push(`<path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">`);
        push_element($$payload, "path", 274, 10);
        $$payload.out.push(`</path>`);
        pop_element();
        $$payload.out.push(`</svg>`);
        pop_element();
        $$payload.out.push(`</button>`);
        pop_element();
        $$payload.out.push(` <form method="POST" action="?/delete" class="delete-form svelte-znkokt">`);
        push_element($$payload, "form", 277, 8);
        $$payload.out.push(`<input type="hidden" name="id"${attr("value", goal.id)}/>`);
        push_element($$payload, "input", 278, 9);
        pop_element();
        $$payload.out.push(` <button type="submit" class="action-btn delete svelte-znkokt" title="Delete">`);
        push_element($$payload, "button", 279, 9);
        Trash_2($$payload, { class: "w-4 h-4" });
        $$payload.out.push(`<!----></button>`);
        pop_element();
        $$payload.out.push(`</form>`);
        pop_element();
        $$payload.out.push(`</div>`);
        pop_element();
        $$payload.out.push(`</div>`);
        pop_element();
        $$payload.out.push(` `);
        if (editingGoal === goal.id) {
          $$payload.out.push("<!--[-->");
          $$payload.out.push(`<div class="edit-form svelte-znkokt">`);
          push_element($$payload, "div", 297, 7);
          $$payload.out.push(`<form method="POST" action="?/update">`);
          push_element($$payload, "form", 298, 8);
          $$payload.out.push(`<input type="hidden" name="id"${attr("value", editFormData.id)}/>`);
          push_element($$payload, "input", 299, 9);
          pop_element();
          $$payload.out.push(` <div class="edit-grid svelte-znkokt">`);
          push_element($$payload, "div", 300, 9);
          $$payload.out.push(`<input type="text" name="title"${attr("value", editFormData.title)} required class="form-input svelte-znkokt"/>`);
          push_element($$payload, "input", 301, 10);
          pop_element();
          $$payload.out.push(` <input type="number" name="targetAmount" step="0.01" min="0"${attr("value", editFormData.targetAmount)} required class="form-input svelte-znkokt"/>`);
          push_element($$payload, "input", 308, 10);
          pop_element();
          $$payload.out.push(` <input type="date" name="deadline"${attr("value", editFormData.deadline)} class="form-input svelte-znkokt"/>`);
          push_element($$payload, "input", 317, 10);
          pop_element();
          $$payload.out.push(`</div>`);
          pop_element();
          $$payload.out.push(` <div class="edit-actions svelte-znkokt">`);
          push_element($$payload, "div", 324, 9);
          Button($$payload, {
            type: "submit",
            size: "sm",
            children: prevent_snippet_stringification(($$payload2) => {
              Check($$payload2, { class: "w-4 h-4" });
              $$payload2.out.push(`<!----> Save`);
            }),
            $$slots: { default: true }
          });
          $$payload.out.push(`<!----> `);
          Button($$payload, {
            type: "button",
            size: "sm",
            variant: "secondary",
            children: prevent_snippet_stringification(($$payload2) => {
              $$payload2.out.push(`<!---->Cancel`);
            }),
            $$slots: { default: true }
          });
          $$payload.out.push(`<!----></div>`);
          pop_element();
          $$payload.out.push(`</form>`);
          pop_element();
          $$payload.out.push(`</div>`);
          pop_element();
        } else {
          $$payload.out.push("<!--[!-->");
        }
        $$payload.out.push(`<!--]--> <div class="goal-progress svelte-znkokt">`);
        push_element($$payload, "div", 338, 6);
        $$payload.out.push(`<div class="progress-amounts svelte-znkokt">`);
        push_element($$payload, "div", 339, 7);
        $$payload.out.push(`<span class="current-amount svelte-znkokt">`);
        push_element($$payload, "span", 340, 8);
        $$payload.out.push(`${escape_html(formatCurrency(goal.actualProgress || 0))}</span>`);
        pop_element();
        $$payload.out.push(` <span class="target-amount svelte-znkokt">`);
        push_element($$payload, "span", 341, 8);
        $$payload.out.push(`of ${escape_html(formatCurrency(goal.target_amount))}</span>`);
        pop_element();
        $$payload.out.push(`</div>`);
        pop_element();
        $$payload.out.push(` <div class="progress-bar-track svelte-znkokt">`);
        push_element($$payload, "div", 343, 7);
        $$payload.out.push(`<div${attr_class(`progress-bar-fill ${stringify(progressColor)}`, "svelte-znkokt")}${attr_style(`width: ${stringify(Math.min(100, progressPercentage))}%`)}>`);
        push_element($$payload, "div", 344, 8);
        $$payload.out.push(`</div>`);
        pop_element();
        $$payload.out.push(`</div>`);
        pop_element();
        $$payload.out.push(` <div class="progress-percentage svelte-znkokt">`);
        push_element($$payload, "div", 349, 7);
        $$payload.out.push(`<span class="percent svelte-znkokt">`);
        push_element($$payload, "span", 350, 8);
        $$payload.out.push(`${escape_html(progressPercentage.toFixed(1))}%</span>`);
        pop_element();
        $$payload.out.push(` `);
        if (progressPercentage >= 100) {
          $$payload.out.push("<!--[-->");
          $$payload.out.push(`<span class="achieved-badge svelte-znkokt">`);
          push_element($$payload, "span", 352, 9);
          Award($$payload, { class: "w-3 h-3" });
          $$payload.out.push(`<!----> Achieved!</span>`);
          pop_element();
        } else {
          $$payload.out.push("<!--[!-->");
        }
        $$payload.out.push(`<!--]--></div>`);
        pop_element();
        $$payload.out.push(`</div>`);
        pop_element();
        $$payload.out.push(` <div class="goal-info svelte-znkokt">`);
        push_element($$payload, "div", 361, 6);
        $$payload.out.push(`<div class="info-item svelte-znkokt">`);
        push_element($$payload, "div", 362, 7);
        Dollar_sign($$payload, { class: "w-4 h-4" });
        $$payload.out.push(`<!----> <span>`);
        push_element($$payload, "span", 364, 8);
        $$payload.out.push(`Auto-funded from savings</span>`);
        pop_element();
        $$payload.out.push(`</div>`);
        pop_element();
        $$payload.out.push(`</div>`);
        pop_element();
        $$payload.out.push(` `);
        if (goal.recommendation) {
          $$payload.out.push("<!--[-->");
          $$payload.out.push(`<div class="recommendation svelte-znkokt">`);
          push_element($$payload, "div", 370, 7);
          $$payload.out.push(`<div class="rec-header svelte-znkokt">`);
          push_element($$payload, "div", 371, 8);
          Trending_up($$payload, { class: "w-4 h-4" });
          $$payload.out.push(`<!----> <span>`);
          push_element($$payload, "span", 373, 9);
          $$payload.out.push(`Recommendation</span>`);
          pop_element();
          $$payload.out.push(`</div>`);
          pop_element();
          $$payload.out.push(` `);
          if (goal.recommendation.monthsRemaining > 0) {
            $$payload.out.push("<!--[-->");
            $$payload.out.push(`<p class="rec-content svelte-znkokt">`);
            push_element($$payload, "p", 376, 9);
            if (goal.recommendation.isAchievable) {
              $$payload.out.push("<!--[-->");
              $$payload.out.push(`<span class="rec-good svelte-znkokt">`);
              push_element($$payload, "span", 378, 11);
              $$payload.out.push(`On track!</span>`);
              pop_element();
              $$payload.out.push(` Save ${escape_html(formatCurrency(goal.recommendation.monthlyTarget))}/month to reach your goal.`);
            } else {
              $$payload.out.push("<!--[!-->");
              $$payload.out.push(`<span class="rec-warning svelte-znkokt">`);
              push_element($$payload, "span", 381, 11);
              $$payload.out.push(`Challenge ahead:</span>`);
              pop_element();
              $$payload.out.push(` You need ${escape_html(formatCurrency(goal.recommendation.monthlyTarget))}/month, but have ${escape_html(formatCurrency(goal.recommendation.currentMonthlySavings))} available.`);
            }
            $$payload.out.push(`<!--]--></p>`);
            pop_element();
            $$payload.out.push(` <p class="rec-meta svelte-znkokt">`);
            push_element($$payload, "p", 385, 9);
            Clock($$payload, { class: "w-3 h-3" });
            $$payload.out.push(`<!----> ${escape_html(goal.recommendation.monthsRemaining)} months remaining</p>`);
            pop_element();
          } else {
            $$payload.out.push("<!--[!-->");
            $$payload.out.push(`<p class="rec-content rec-danger svelte-znkokt">`);
            push_element($$payload, "p", 390, 9);
            $$payload.out.push(`<span class="rec-warning svelte-znkokt">`);
            push_element($$payload, "span", 391, 10);
            $$payload.out.push(`⚠️</span>`);
            pop_element();
            $$payload.out.push(` This goal's deadline has passed</p>`);
            pop_element();
          }
          $$payload.out.push(`<!--]--></div>`);
          pop_element();
        } else {
          $$payload.out.push("<!--[!-->");
        }
        $$payload.out.push(`<!--]--></div>`);
        pop_element();
      }
      $$payload.out.push(`<!--]--></div>`);
      pop_element();
    } else {
      $$payload.out.push("<!--[!-->");
      $$payload.out.push(`<div class="empty-state svelte-znkokt">`);
      push_element($$payload, "div", 401, 3);
      $$payload.out.push(`<div class="empty-card svelte-znkokt">`);
      push_element($$payload, "div", 402, 4);
      $$payload.out.push(`<div class="empty-icon svelte-znkokt">`);
      push_element($$payload, "div", 403, 5);
      Piggy_bank($$payload, {});
      $$payload.out.push(`<!----></div>`);
      pop_element();
      $$payload.out.push(` <h2 class="svelte-znkokt">`);
      push_element($$payload, "h2", 406, 5);
      $$payload.out.push(`No Savings Goals Yet</h2>`);
      pop_element();
      $$payload.out.push(` <p class="svelte-znkokt">`);
      push_element($$payload, "p", 407, 5);
      $$payload.out.push(`Start building your financial future by setting your first savings goal.</p>`);
      pop_element();
      $$payload.out.push(` `);
      Button($$payload, {
        children: prevent_snippet_stringification(($$payload2) => {
          Plus($$payload2, { class: "w-4 h-4" });
          $$payload2.out.push(`<!----> Create Your First Goal`);
        }),
        $$slots: { default: true }
      });
      $$payload.out.push(`<!----></div>`);
      pop_element();
      $$payload.out.push(`</div>`);
      pop_element();
    }
    $$payload.out.push(`<!--]-->`);
  }
  $$payload.out.push(`<!--]--></div>`);
  pop_element();
  bind_props($$props, { data, form });
  pop();
}
_page.render = function() {
  throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
export {
  _page as default
};
