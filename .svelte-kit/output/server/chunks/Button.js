import { W as fallback, P as attr, Q as attr_class, M as slot, U as bind_props, R as stringify } from "./index2.js";
function Button($$payload, $$props) {
  let variant = fallback($$props["variant"], "primary");
  let size = fallback($$props["size"], "md");
  let disabled = fallback($$props["disabled"], false);
  let loading = fallback($$props["loading"], false);
  let type = fallback($$props["type"], "button");
  let href = fallback($$props["href"], "");
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    success: "bg-success-600 hover:bg-success-700 text-white",
    warning: "bg-warning-500 hover:bg-warning-600 text-white",
    danger: "bg-danger-600 hover:bg-danger-700 text-white"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  if (href) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<a${attr("href", href)}${attr_class(`inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${stringify(variants[variant])} ${stringify(sizes[size])}`)}><!---->`);
    slot($$payload, $$props, "default", {});
    $$payload.out.push(`<!----></a>`);
  } else {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<button${attr("type", type)}${attr("disabled", disabled, true)}${attr_class(`inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${stringify(variants[variant])} ${stringify(sizes[size])}`)}>`);
    if (loading) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--> <!---->`);
    slot($$payload, $$props, "default", {});
    $$payload.out.push(`<!----></button>`);
  }
  $$payload.out.push(`<!--]-->`);
  bind_props($$props, { variant, size, disabled, loading, type, href });
}
export {
  Button as B
};
