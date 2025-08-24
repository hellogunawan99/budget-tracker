import { W as fallback, F as escape_html, Q as attr_class, V as attr_style, U as bind_props, D as pop, A as push, R as stringify } from "./index2.js";
import { f as formatCurrency, e as getBudgetStatus } from "./date.js";
function BudgetStatus($$payload, $$props) {
  push();
  let status, percentage, statusClasses;
  let remaining = $$props["remaining"];
  let total = $$props["total"];
  let title = fallback($$props["title"], "Budget Status");
  status = getBudgetStatus(remaining, total);
  percentage = total > 0 ? Math.max(0, remaining / total * 100) : 0;
  statusClasses = {
    good: "budget-status-good",
    warning: "budget-status-warning",
    danger: "budget-status-danger"
  }[status];
  $$payload.out.push(`<div class="card"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900">${escape_html(title)}</h3> <div${attr_class(`px-3 py-1 rounded-full text-sm font-medium ${stringify(statusClasses)}`)}>`);
  if (status === "good") {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`Good`);
  } else {
    $$payload.out.push("<!--[!-->");
    if (status === "warning") {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`Warning`);
    } else {
      $$payload.out.push("<!--[!-->");
      $$payload.out.push(`Over Budget`);
    }
    $$payload.out.push(`<!--]-->`);
  }
  $$payload.out.push(`<!--]--></div></div> <div class="space-y-3"><div class="flex justify-between text-sm"><span class="text-gray-500">Remaining</span> <span class="font-semibold text-gray-900">${escape_html(formatCurrency(remaining))}</span></div> <div class="w-full bg-gray-200 rounded-full h-3"><div${attr_class(`h-3 rounded-full transition-all duration-300 ${stringify(status === "good" ? "bg-success-500" : status === "warning" ? "bg-warning-500" : "bg-danger-500")}`)}${attr_style(`width: ${stringify(Math.min(100, percentage))}%`)}></div></div> <div class="flex justify-between text-sm text-gray-500"><span>0%</span> <span>${escape_html(percentage.toFixed(1))}%</span> <span>100%</span></div></div></div>`);
  bind_props($$props, { remaining, total, title });
  pop();
}
export {
  BudgetStatus as B
};
