import { J as sanitize_props, K as spread_props, M as slot, T as head, D as pop, A as push } from "../../../../chunks/index2.js";
import { C as Card } from "../../../../chunks/Card.js";
import { B as Button } from "../../../../chunks/Button.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { T as Trash_2 } from "../../../../chunks/trash-2.js";
function Download($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
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
    ["path", { "d": "M12 15V3" }],
    ["path", { "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
    ["path", { "d": "m7 10 5 5 5-5" }]
  ];
  Icon($$payload, spread_props([
    { name: "download" },
    $$sanitized_props,
    {
      /**
       * @component @name Download
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgMTVWMyIgLz4KICA8cGF0aCBkPSJNMjEgMTV2NGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnYtNCIgLz4KICA8cGF0aCBkPSJtNyAxMCA1IDUgNS01IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/download
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$payload2) => {
        $$payload2.out.push(`<!---->`);
        slot($$payload2, $$props, "default", {});
        $$payload2.out.push(`<!---->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function _page($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Settings - Budget Tracker</title>`;
  });
  $$payload.out.push(`<div class="space-y-6"><div><h1 class="text-2xl font-bold text-gray-900">Settings</h1> <p class="text-gray-500 mt-1">Manage your budget tracker preferences and data</p></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`);
  Card($$payload, {
    title: "Data Management",
    subtitle: "Export or manage your financial data",
    children: ($$payload2) => {
      $$payload2.out.push(`<div class="space-y-4"><div><h4 class="font-medium text-gray-900 mb-2">Export Data</h4> <p class="text-sm text-gray-600 mb-4">Download your budget and expense data as a CSV file.</p> `);
      Button($$payload2, {
        children: ($$payload3) => {
          Download($$payload3, { class: "w-4 h-4 mr-2" });
          $$payload3.out.push(`<!----> Export to CSV`);
        },
        $$slots: { default: true }
      });
      $$payload2.out.push(`<!----></div> <hr class="border-gray-200"/> <div><h4 class="font-medium text-gray-900 mb-2">Clear All Data</h4> <p class="text-sm text-gray-600 mb-4">Remove all your budget and expense data. This action cannot be undone.</p> `);
      Button($$payload2, {
        variant: "danger",
        children: ($$payload3) => {
          Trash_2($$payload3, { class: "w-4 h-4 mr-2" });
          $$payload3.out.push(`<!----> Clear All Data`);
        },
        $$slots: { default: true }
      });
      $$payload2.out.push(`<!----></div></div>`);
    },
    $$slots: { default: true }
  });
  $$payload.out.push(`<!----> `);
  Card($$payload, {
    title: "About Budget Tracker",
    subtitle: "Application information and help",
    children: ($$payload2) => {
      $$payload2.out.push(`<div class="space-y-4"><div><h4 class="font-medium text-gray-900">Version</h4> <p class="text-sm text-gray-600">Budget Tracker v1.0.0</p></div> <div><h4 class="font-medium text-gray-900">Features</h4> <ul class="text-sm text-gray-600 space-y-1"><li>• Monthly budget planning</li> <li>• Daily expense tracking</li> <li>• Visual analytics and charts</li> <li>• Savings goal tracking</li> <li>• Data export capabilities</li></ul></div> <div><h4 class="font-medium text-gray-900">Support</h4> <p class="text-sm text-gray-600">For help or questions, please refer to the user guide or contact support.</p></div></div>`);
    },
    $$slots: { default: true }
  });
  $$payload.out.push(`<!----></div> `);
  Card($$payload, {
    title: "Quick Stats",
    subtitle: "Overview of your data",
    children: ($$payload2) => {
      $$payload2.out.push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="text-center p-4 bg-gray-50 rounded-lg"><div class="text-2xl font-bold text-gray-900">1</div> <div class="text-sm text-gray-600">Active Budgets</div></div> <div class="text-center p-4 bg-gray-50 rounded-lg"><div class="text-2xl font-bold text-gray-900">12</div> <div class="text-sm text-gray-600">Categories</div></div> <div class="text-center p-4 bg-gray-50 rounded-lg"><div class="text-2xl font-bold text-gray-900">0</div> <div class="text-sm text-gray-600">Expenses</div></div> <div class="text-center p-4 bg-gray-50 rounded-lg"><div class="text-2xl font-bold text-gray-900">0</div> <div class="text-sm text-gray-600">Savings Goals</div></div></div>`);
    },
    $$slots: { default: true }
  });
  $$payload.out.push(`<!----></div>`);
  pop();
}
export {
  _page as default
};
