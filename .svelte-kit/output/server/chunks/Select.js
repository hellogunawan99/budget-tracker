import { J as sanitize_props, K as spread_props, M as slot, W as fallback, P as attr, F as escape_html, Q as attr_class, U as bind_props, R as stringify, O as ensure_array_like, Z as maybe_selected } from "./index2.js";
import { I as Icon } from "./Icon.js";
function Square_pen($$payload, $$props) {
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
    [
      "path",
      {
        "d": "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      }
    ],
    [
      "path",
      {
        "d": "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "square-pen" },
    $$sanitized_props,
    {
      /**
       * @component @name SquarePen
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgM0g1YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNGEyIDIgMCAwIDAgMi0ydi03IiAvPgogIDxwYXRoIGQ9Ik0xOC4zNzUgMi42MjVhMSAxIDAgMCAxIDMgM2wtOS4wMTMgOS4wMTRhMiAyIDAgMCAxLS44NTMuNTA1bC0yLjg3My44NGEuNS41IDAgMCAxLS42Mi0uNjJsLjg0LTIuODczYTIgMiAwIDAgMSAuNTA2LS44NTJ6IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/square-pen
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
function Input($$payload, $$props) {
  let label = fallback($$props["label"], "");
  let type = fallback($$props["type"], "text");
  let value = fallback($$props["value"], "");
  let placeholder = fallback($$props["placeholder"], "");
  let required = fallback($$props["required"], false);
  let disabled = fallback($$props["disabled"], false);
  let error = fallback($$props["error"], "");
  let id = fallback($$props["id"], "");
  let step = fallback($$props["step"], "");
  let min = fallback($$props["min"], "");
  function focus() {
  }
  $$payload.out.push(`<div class="space-y-1">`);
  if (label) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<label${attr("for", id)} class="block text-sm font-medium text-gray-700">${escape_html(label)} `);
    if (required) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<span class="text-danger-500">*</span>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></label>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <input${attr("value", value)}${attr("type", type)}${attr("id", id)}${attr("placeholder", placeholder)}${attr("required", required, true)}${attr("disabled", disabled, true)}${attr("step", step)}${attr("min", min)}${attr_class(`block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500 ${stringify(error ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500" : "")}`)}/> `);
  if (error) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<p class="text-sm text-danger-600">${escape_html(error)}</p>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div>`);
  bind_props($$props, {
    label,
    type,
    value,
    placeholder,
    required,
    disabled,
    error,
    id,
    step,
    min,
    focus
  });
}
function Select($$payload, $$props) {
  let label = fallback($$props["label"], "");
  let value = fallback($$props["value"], "");
  let options = fallback($$props["options"], () => [], true);
  let required = fallback($$props["required"], false);
  let disabled = fallback($$props["disabled"], false);
  let error = fallback($$props["error"], "");
  let id = fallback($$props["id"], "");
  let placeholder = fallback($$props["placeholder"], "Select an option");
  const each_array = ensure_array_like(options);
  $$payload.out.push(`<div class="space-y-1">`);
  if (label) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<label${attr("for", id)} class="block text-sm font-medium text-gray-700">${escape_html(label)} `);
    if (required) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<span class="text-danger-500">*</span>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></label>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <select${attr("id", id)}${attr("required", required, true)}${attr("disabled", disabled, true)}${attr_class(`block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500 ${stringify(error ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500" : "")}`)}>`);
  $$payload.select_value = value;
  $$payload.out.push(`<option value=""${maybe_selected($$payload, "")} disabled>${escape_html(placeholder)}</option><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let option = each_array[$$index];
    $$payload.out.push(`<option${attr("value", option.value)}${maybe_selected($$payload, option.value)}>${escape_html(option.label)}</option>`);
  }
  $$payload.out.push(`<!--]-->`);
  $$payload.select_value = void 0;
  $$payload.out.push(`</select> `);
  if (error) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<p class="text-sm text-danger-600">${escape_html(error)}</p>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div>`);
  bind_props($$props, {
    label,
    value,
    options,
    required,
    disabled,
    error,
    id,
    placeholder
  });
}
export {
  Input as I,
  Select as S,
  Square_pen as a
};
