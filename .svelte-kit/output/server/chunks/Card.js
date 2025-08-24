import { W as fallback, Q as attr_class, F as escape_html, M as slot, U as bind_props, R as stringify } from "./index2.js";
function Card($$payload, $$props) {
  let title = fallback($$props["title"], "");
  let subtitle = fallback($$props["subtitle"], "");
  let padding = fallback($$props["padding"], true);
  let hover = fallback($$props["hover"], false);
  $$payload.out.push(`<div${attr_class(`bg-white rounded-xl shadow-sm border border-gray-100 ${stringify(hover ? "hover:shadow-md transition-shadow duration-200" : "")} ${stringify(padding ? "p-6" : "")}`)}>`);
  if (title || subtitle) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<div class="mb-4">`);
    if (title) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<h3 class="text-lg font-semibold text-gray-900">${escape_html(title)}</h3>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--> `);
    if (subtitle) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<p class="text-sm text-gray-500 mt-1">${escape_html(subtitle)}</p>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></div>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <!---->`);
  slot($$payload, $$props, "default", {});
  $$payload.out.push(`<!----></div>`);
  bind_props($$props, { title, subtitle, padding, hover });
}
export {
  Card as C
};
