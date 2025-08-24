import { J as sanitize_props, K as spread_props, M as slot, T as head, U as bind_props, D as pop, A as push, F as escape_html, Q as attr_class, O as ensure_array_like, V as attr_style, R as stringify } from "../../../../chunks/index2.js";
import { a as getMonthName, f as formatCurrency } from "../../../../chunks/date.js";
import { C as Card } from "../../../../chunks/Card.js";
import { T as Trending_down, C as Chart_1 } from "../../../../chunks/Chart.js";
import { C as Chart_column } from "../../../../chunks/chart-column.js";
import { T as Trending_up } from "../../../../chunks/trending-up.js";
import { I as Icon } from "../../../../chunks/Icon.js";
function Chart_pie($$payload, $$props) {
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
        "d": "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"
      }
    ],
    ["path", { "d": "M21.21 15.89A10 10 0 1 1 8 2.83" }]
  ];
  Icon($$payload, spread_props([
    { name: "chart-pie" },
    $$sanitized_props,
    {
      /**
       * @component @name ChartPie
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEgMTJjLjU1MiAwIDEuMDA1LS40NDkuOTUtLjk5OGExMCAxMCAwIDAgMC04Ljk1My04Ljk1MWMtLjU1LS4wNTUtLjk5OC4zOTgtLjk5OC45NXY4YTEgMSAwIDAgMCAxIDF6IiAvPgogIDxwYXRoIGQ9Ik0yMS4yMSAxNS44OUExMCAxMCAwIDEgMSA4IDIuODMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/chart-pie
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
  let categoryChartData, comparisonChartData, trendsChartData, averageSpending, averageSavings, currentMonthSpending, currentMonthSavings, spendingTrend, savingsTrend, topSpendingCategories;
  let data = $$props["data"];
  categoryChartData = data.categoryBreakdown?.length > 0 ? {
    labels: data.categoryBreakdown.map((item) => item.category_name),
    datasets: [
      {
        label: "Actual Spending",
        data: data.categoryBreakdown.map((item) => item.actual),
        backgroundColor: data.categoryBreakdown.map((item) => item.category_color),
        borderWidth: 2,
        borderColor: "#ffffff"
      }
    ]
  } : null;
  comparisonChartData = data.categoryBreakdown?.length > 0 ? {
    labels: data.categoryBreakdown.map((item) => item.category_name),
    datasets: [
      {
        label: "Planned",
        data: data.categoryBreakdown.map((item) => item.planned),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1
      },
      {
        label: "Actual",
        data: data.categoryBreakdown.map((item) => item.actual),
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 1
      }
    ]
  } : null;
  trendsChartData = data.trends?.length > 0 ? {
    labels: data.trends.map((item) => `${getMonthName(item.month)} ${item.year}`),
    datasets: [
      {
        label: "Income",
        data: data.trends.map((item) => item.income),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4
      },
      {
        label: "Expenses",
        data: data.trends.map((item) => item.expenses),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        fill: true,
        tension: 0.4
      },
      {
        label: "Savings",
        data: data.trends.map((item) => item.savings),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4
      }
    ]
  } : null;
  averageSpending = data.trends?.length > 0 ? data.trends.reduce((sum, trend) => sum + trend.expenses, 0) / data.trends.length : 0;
  averageSavings = data.trends?.length > 0 ? data.trends.reduce((sum, trend) => sum + trend.savings, 0) / data.trends.length : 0;
  currentMonthSpending = data.budgetSummary?.totalActual || 0;
  currentMonthSavings = data.budgetSummary ? data.budgetSummary.salary - data.budgetSummary.totalActual : 0;
  spendingTrend = currentMonthSpending > averageSpending ? "up" : "down";
  savingsTrend = currentMonthSavings > averageSavings ? "up" : "down";
  topSpendingCategories = data.categoryBreakdown?.filter((item) => item.actual > 0).sort((a, b) => b.actual - a.actual).slice(0, 3) || [];
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Analytics - Budget Tracker</title>`;
  });
  $$payload.out.push(`<div class="space-y-6"><div><h1 class="text-2xl font-bold text-gray-900">Analytics &amp; Insights</h1> <p class="text-gray-500 mt-1">Analyze your spending patterns and financial trends</p></div> `);
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
    $$payload.out.push(`<div class="grid grid-cols-1 md:grid-cols-4 gap-6">`);
    Card($$payload, {
      children: ($$payload2) => {
        $$payload2.out.push(`<div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">`);
        Chart_column($$payload2, { class: "w-5 h-5 text-primary-600" });
        $$payload2.out.push(`<!----></div></div> <div class="ml-4"><p class="text-sm font-medium text-gray-500">This Month</p> <p class="text-2xl font-bold text-gray-900">${escape_html(formatCurrency(currentMonthSpending))}</p> <p${attr_class(`text-xs flex items-center ${stringify(spendingTrend === "up" ? "text-danger-600" : "text-success-600")}`)}><!---->`);
        (spendingTrend === "up" ? Trending_up : Trending_down)?.($$payload2, { class: "w-3 h-3 mr-1" });
        $$payload2.out.push(`<!----> vs ${escape_html(formatCurrency(averageSpending))} avg</p></div></div>`);
      },
      $$slots: { default: true }
    });
    $$payload.out.push(`<!----> `);
    Card($$payload, {
      children: ($$payload2) => {
        $$payload2.out.push(`<div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">`);
        Trending_up($$payload2, { class: "w-5 h-5 text-success-600" });
        $$payload2.out.push(`<!----></div></div> <div class="ml-4"><p class="text-sm font-medium text-gray-500">Savings</p> <p class="text-2xl font-bold text-gray-900">${escape_html(formatCurrency(currentMonthSavings))}</p> <p${attr_class(`text-xs flex items-center ${stringify(savingsTrend === "up" ? "text-success-600" : "text-danger-600")}`)}><!---->`);
        (savingsTrend === "up" ? Trending_up : Trending_down)?.($$payload2, { class: "w-3 h-3 mr-1" });
        $$payload2.out.push(`<!----> vs ${escape_html(formatCurrency(averageSavings))} avg</p></div></div>`);
      },
      $$slots: { default: true }
    });
    $$payload.out.push(`<!----> `);
    Card($$payload, {
      children: ($$payload2) => {
        $$payload2.out.push(`<div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">`);
        Chart_pie($$payload2, { class: "w-5 h-5 text-warning-600" });
        $$payload2.out.push(`<!----></div></div> <div class="ml-4"><p class="text-sm font-medium text-gray-500">Categories</p> <p class="text-2xl font-bold text-gray-900">${escape_html(data.categoryBreakdown?.length || 0)}</p> <p class="text-xs text-gray-500">with spending</p></div></div>`);
      },
      $$slots: { default: true }
    });
    $$payload.out.push(`<!----> `);
    Card($$payload, {
      children: ($$payload2) => {
        $$payload2.out.push(`<div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-danger-100 rounded-lg flex items-center justify-center">`);
        Trending_down($$payload2, { class: "w-5 h-5 text-danger-600" });
        $$payload2.out.push(`<!----></div></div> <div class="ml-4"><p class="text-sm font-medium text-gray-500">Budget Used</p> <p class="text-2xl font-bold text-gray-900">${escape_html(data.budgetSummary ? Math.round(data.budgetSummary.totalActual / data.budgetSummary.salary * 100) : 0)}%</p> <p class="text-xs text-gray-500">of monthly budget</p></div></div>`);
      },
      $$slots: { default: true }
    });
    $$payload.out.push(`<!----></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`);
    if (categoryChartData) {
      $$payload.out.push("<!--[-->");
      Card($$payload, {
        title: "Spending Distribution",
        subtitle: "Current month breakdown",
        children: ($$payload2) => {
          Chart_1($$payload2, { type: "doughnut", data: categoryChartData, height: 300 });
        },
        $$slots: { default: true }
      });
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--> `);
    if (comparisonChartData) {
      $$payload.out.push("<!--[-->");
      Card($$payload, {
        title: "Budget vs Actual",
        subtitle: "Planned vs actual spending by category",
        children: ($$payload2) => {
          Chart_1($$payload2, {
            type: "bar",
            data: comparisonChartData,
            height: 300,
            options: {
              responsive: true,
              plugins: { legend: { position: "top" } },
              scales: {
                x: { beginAtZero: true },
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback(value) {
                      return "$" + value.toLocaleString();
                    }
                  }
                }
              }
            }
          });
        },
        $$slots: { default: true }
      });
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></div> `);
    if (trendsChartData) {
      $$payload.out.push("<!--[-->");
      Card($$payload, {
        title: "Monthly Trends",
        subtitle: "Income, expenses, and savings over time",
        children: ($$payload2) => {
          Chart_1($$payload2, {
            type: "line",
            data: trendsChartData,
            height: 350,
            options: {
              responsive: true,
              plugins: { legend: { position: "top" } },
              scales: {
                x: { beginAtZero: true },
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback(value) {
                      return "$" + value.toLocaleString();
                    }
                  }
                }
              }
            }
          });
        },
        $$slots: { default: true }
      });
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--> `);
    if (topSpendingCategories.length > 0) {
      $$payload.out.push("<!--[-->");
      Card($$payload, {
        title: "Top Spending Categories",
        subtitle: "Your biggest expense categories this month",
        children: ($$payload2) => {
          const each_array = ensure_array_like(topSpendingCategories);
          $$payload2.out.push(`<div class="space-y-4"><!--[-->`);
          for (let index = 0, $$length = each_array.length; index < $$length; index++) {
            let category = each_array[index];
            $$payload2.out.push(`<div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="text-lg font-bold text-gray-400">#${escape_html(index + 1)}</div> <div class="w-4 h-4 rounded-full"${attr_style(`background-color: ${stringify(category.category_color)}`)}></div> <div><p class="font-medium text-gray-900">${escape_html(category.category_name)}</p> <p class="text-sm text-gray-500">${escape_html((category.actual / currentMonthSpending * 100).toFixed(1))}% of total spending</p></div></div> <div class="text-right"><p class="font-bold text-gray-900">${escape_html(formatCurrency(category.actual))}</p> `);
            if (category.planned > 0) {
              $$payload2.out.push("<!--[-->");
              $$payload2.out.push(`<p${attr_class(`text-xs ${stringify(category.actual > category.planned ? "text-danger-600" : "text-success-600")}`)}>${escape_html(category.actual > category.planned ? "Over" : "Under")} budget by ${escape_html(formatCurrency(Math.abs(category.actual - category.planned)))}</p>`);
            } else {
              $$payload2.out.push("<!--[!-->");
            }
            $$payload2.out.push(`<!--]--></div></div>`);
          }
          $$payload2.out.push(`<!--]--></div>`);
        },
        $$slots: { default: true }
      });
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--> `);
    Card($$payload, {
      title: "Insights & Recommendations",
      children: ($$payload2) => {
        $$payload2.out.push(`<div class="space-y-4">`);
        if (data.budgetSummary) {
          $$payload2.out.push("<!--[-->");
          if (data.budgetSummary.remainingBudget < 0) {
            $$payload2.out.push("<!--[-->");
            $$payload2.out.push(`<div class="p-4 bg-danger-50 border border-danger-200 rounded-lg"><p class="text-danger-800 font-medium">⚠️ You're over budget by ${escape_html(formatCurrency(Math.abs(data.budgetSummary.remainingBudget)))}</p> <p class="text-danger-700 text-sm mt-1">Consider reducing spending in your top categories or adjusting your budget.</p></div>`);
          } else {
            $$payload2.out.push("<!--[!-->");
            if (data.budgetSummary.remainingBudget < data.budgetSummary.salary * 0.1) {
              $$payload2.out.push("<!--[-->");
              $$payload2.out.push(`<div class="p-4 bg-warning-50 border border-warning-200 rounded-lg"><p class="text-warning-800 font-medium">💡 You're close to your budget limit</p> <p class="text-warning-700 text-sm mt-1">You have ${escape_html(formatCurrency(data.budgetSummary.remainingBudget))} remaining. Consider tracking expenses more carefully.</p></div>`);
            } else {
              $$payload2.out.push("<!--[!-->");
              $$payload2.out.push(`<div class="p-4 bg-success-50 border border-success-200 rounded-lg"><p class="text-success-800 font-medium">✅ You're doing well with your budget!</p> <p class="text-success-700 text-sm mt-1">You have ${escape_html(formatCurrency(data.budgetSummary.remainingBudget))} remaining this month.</p></div>`);
            }
            $$payload2.out.push(`<!--]-->`);
          }
          $$payload2.out.push(`<!--]-->`);
        } else {
          $$payload2.out.push("<!--[!-->");
        }
        $$payload2.out.push(`<!--]--> `);
        if (currentMonthSpending > averageSpending && averageSpending > 0) {
          $$payload2.out.push("<!--[-->");
          $$payload2.out.push(`<div class="p-4 bg-blue-50 border border-blue-200 rounded-lg"><p class="text-blue-800 font-medium">📈 Higher spending this month</p> <p class="text-blue-700 text-sm mt-1">You're spending ${escape_html(formatCurrency(currentMonthSpending - averageSpending))} more than your 6-month average.</p></div>`);
        } else {
          $$payload2.out.push("<!--[!-->");
        }
        $$payload2.out.push(`<!--]--> `);
        if (topSpendingCategories.length > 0 && topSpendingCategories[0].actual > currentMonthSpending * 0.4) {
          $$payload2.out.push("<!--[-->");
          $$payload2.out.push(`<div class="p-4 bg-purple-50 border border-purple-200 rounded-lg"><p class="text-purple-800 font-medium">🎯 Consider diversifying expenses</p> <p class="text-purple-700 text-sm mt-1">${escape_html(topSpendingCategories[0].category_name)} represents ${escape_html((topSpendingCategories[0].actual / currentMonthSpending * 100).toFixed(1))}% of your spending. Consider if this balance is right for your goals.</p></div>`);
        } else {
          $$payload2.out.push("<!--[!-->");
        }
        $$payload2.out.push(`<!--]--></div>`);
      },
      $$slots: { default: true }
    });
    $$payload.out.push(`<!---->`);
  }
  $$payload.out.push(`<!--]--></div>`);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
