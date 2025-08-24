import { J as sanitize_props, K as spread_props, M as slot, T as head, F as escape_html, O as ensure_array_like, U as bind_props, D as pop, A as push, R as stringify, Q as attr_class, V as attr_style } from "../../../chunks/index2.js";
import { g as getDaysUntilPayday, i as isPayday, f as formatCurrency, a as getMonthName, b as formatDate } from "../../../chunks/date.js";
import { C as Card } from "../../../chunks/Card.js";
import { B as Button } from "../../../chunks/Button.js";
import { B as BudgetStatus } from "../../../chunks/BudgetStatus.js";
import { T as Trending_down, C as Chart_1 } from "../../../chunks/Chart.js";
import { T as Trending_up } from "../../../chunks/trending-up.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { C as Calendar } from "../../../chunks/calendar.js";
import { P as Plus } from "../../../chunks/plus.js";
function Target($$payload, $$props) {
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
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["circle", { "cx": "12", "cy": "12", "r": "6" }],
    ["circle", { "cx": "12", "cy": "12", "r": "2" }]
  ];
  Icon($$payload, spread_props([
    { name: "target" },
    $$sanitized_props,
    {
      /**
       * @component @name Target
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI2IiAvPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/target
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
  let hasBudget, daysUntilPayday, isCurrentPayday, categoryChartData, summaryStats;
  let data = $$props["data"];
  hasBudget = !!data.budget;
  daysUntilPayday = getDaysUntilPayday();
  isCurrentPayday = isPayday();
  categoryChartData = data.categoryBreakdown?.length > 0 ? {
    labels: data.categoryBreakdown.map((item) => item.category_name),
    datasets: [
      {
        data: data.categoryBreakdown.map((item) => item.actual),
        backgroundColor: data.categoryBreakdown.map((item) => item.category_color),
        borderWidth: 2,
        borderColor: "#ffffff"
      }
    ]
  } : null;
  summaryStats = data.budgetSummary ? [
    {
      title: "Monthly Income",
      value: formatCurrency(data.budgetSummary.salary),
      icon: Trending_up,
      color: "text-success-600"
    },
    {
      title: "Total Spent",
      value: formatCurrency(data.budgetSummary.totalActual),
      icon: Trending_down,
      color: "text-danger-600"
    },
    {
      title: "Remaining",
      value: formatCurrency(data.budgetSummary.remainingBudget),
      icon: Target,
      color: data.budgetSummary.remainingBudget > 0 ? "text-success-600" : "text-danger-600"
    }
  ] : [];
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Dashboard - Budget Tracker</title>`;
  });
  $$payload.out.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-gray-900">Dashboard - ${escape_html(getMonthName(data.currentMonth))} ${escape_html(data.currentYear)}</h1> <p class="text-gray-500 mt-1">`);
  if (isCurrentPayday) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`It's payday! Time to track your expenses.`);
  } else {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`${escape_html(daysUntilPayday)} days until payday (${escape_html(getMonthName(data.currentMonth))} 25th)`);
  }
  $$payload.out.push(`<!--]--></p></div> `);
  if (!hasBudget) {
    $$payload.out.push("<!--[-->");
    Button($$payload, {
      href: "/budget",
      children: ($$payload2) => {
        Plus($$payload2, { class: "w-4 h-4 mr-2" });
        $$payload2.out.push(`<!----> Create Budget`);
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div> `);
  if (data.error) {
    $$payload.out.push("<!--[-->");
    Card($$payload, {
      title: "Error",
      children: ($$payload2) => {
        $$payload2.out.push(`<p class="text-danger-600">${escape_html(data.error)}</p>`);
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out.push("<!--[!-->");
    if (!hasBudget) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<div class="text-center py-12">`);
      Calendar($$payload, { class: "w-16 h-16 mx-auto text-gray-400 mb-4" });
      $$payload.out.push(`<!----> <h3 class="text-lg font-medium text-gray-900 mb-2">No Budget Set Up</h3> <p class="text-gray-500 mb-6">Create your monthly budget to start tracking your finances.</p> `);
      Button($$payload, {
        href: "/budget",
        children: ($$payload2) => {
          $$payload2.out.push(`<!---->Set Up Budget`);
        },
        $$slots: { default: true }
      });
      $$payload.out.push(`<!----></div>`);
    } else {
      $$payload.out.push("<!--[!-->");
      const each_array = ensure_array_like(summaryStats);
      $$payload.out.push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-6"><!--[-->`);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let stat = each_array[$$index];
        Card($$payload, {
          children: ($$payload2) => {
            $$payload2.out.push(`<div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center"><!---->`);
            stat.icon?.($$payload2, { class: `w-5 h-5 ${stringify(stat.color)}` });
            $$payload2.out.push(`<!----></div></div> <div class="ml-4"><p class="text-sm font-medium text-gray-500">${escape_html(stat.title)}</p> <p${attr_class(`text-2xl font-bold ${stringify(stat.color)}`)}>${escape_html(stat.value)}</p></div></div>`);
          },
          $$slots: { default: true }
        });
      }
      $$payload.out.push(`<!--]--></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`);
      if (data.budgetSummary) {
        $$payload.out.push("<!--[-->");
        BudgetStatus($$payload, {
          remaining: data.budgetSummary.remainingBudget,
          total: data.budgetSummary.salary
        });
      } else {
        $$payload.out.push("<!--[!-->");
      }
      $$payload.out.push(`<!--]--> `);
      if (categoryChartData) {
        $$payload.out.push("<!--[-->");
        Card($$payload, {
          title: "Spending by Category",
          children: ($$payload2) => {
            Chart_1($$payload2, { type: "doughnut", data: categoryChartData, height: 250 });
          },
          $$slots: { default: true }
        });
      } else {
        $$payload.out.push("<!--[!-->");
      }
      $$payload.out.push(`<!--]--></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`);
      Card($$payload, {
        title: "Recent Expenses",
        subtitle: "Last 5 transactions",
        children: ($$payload2) => {
          if (data.recentExpenses?.length > 0) {
            $$payload2.out.push("<!--[-->");
            const each_array_1 = ensure_array_like(data.recentExpenses);
            $$payload2.out.push(`<div class="space-y-3"><!--[-->`);
            for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
              let expense = each_array_1[$$index_1];
              $$payload2.out.push(`<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div><p class="font-medium text-gray-900">${escape_html(expense.category_name)}</p> <p class="text-sm text-gray-500">${escape_html(expense.description || "No description")} • ${escape_html(formatDate(expense.expense_date))}</p></div> <p class="font-semibold text-gray-900">${escape_html(formatCurrency(expense.amount))}</p></div>`);
            }
            $$payload2.out.push(`<!--]--></div> <div class="mt-4">`);
            Button($$payload2, {
              href: "/expenses",
              variant: "secondary",
              size: "sm",
              children: ($$payload3) => {
                $$payload3.out.push(`<!---->View All Expenses`);
              },
              $$slots: { default: true }
            });
            $$payload2.out.push(`<!----></div>`);
          } else {
            $$payload2.out.push("<!--[!-->");
            $$payload2.out.push(`<p class="text-gray-500 text-center py-6">No expenses recorded yet.</p>`);
          }
          $$payload2.out.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$payload.out.push(`<!----> `);
      Card($$payload, {
        title: "Savings Goals",
        children: ($$payload2) => {
          if (data.savingsGoals?.length > 0) {
            $$payload2.out.push("<!--[-->");
            const each_array_2 = ensure_array_like(data.savingsGoals);
            $$payload2.out.push(`<div class="space-y-4"><!--[-->`);
            for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
              let goal = each_array_2[$$index_2];
              $$payload2.out.push(`<div class="p-4 border border-gray-200 rounded-lg"><div class="flex items-center justify-between mb-2"><h4 class="font-medium text-gray-900">${escape_html(goal.title)}</h4> <span class="text-sm text-gray-500">${escape_html(formatCurrency(goal.current_amount))} / ${escape_html(formatCurrency(goal.target_amount))}</span></div> <div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-primary-600 h-2 rounded-full transition-all duration-300"${attr_style(`width: ${stringify(Math.min(100, goal.current_amount / goal.target_amount * 100))}%`)}></div></div> <p class="text-xs text-gray-500 mt-1">${escape_html((goal.current_amount / goal.target_amount * 100).toFixed(1))}% complete `);
              if (goal.deadline) {
                $$payload2.out.push("<!--[-->");
                $$payload2.out.push(`• Due ${escape_html(formatDate(goal.deadline))}`);
              } else {
                $$payload2.out.push("<!--[!-->");
              }
              $$payload2.out.push(`<!--]--></p></div>`);
            }
            $$payload2.out.push(`<!--]--></div>`);
          } else {
            $$payload2.out.push("<!--[!-->");
            $$payload2.out.push(`<p class="text-gray-500 text-center py-6">No savings goals set.</p>`);
          }
          $$payload2.out.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$payload.out.push(`<!----></div>`);
    }
    $$payload.out.push(`<!--]-->`);
  }
  $$payload.out.push(`<!--]--></div>`);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
