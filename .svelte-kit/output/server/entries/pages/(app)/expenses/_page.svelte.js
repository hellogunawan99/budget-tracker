import { J as sanitize_props, K as spread_props, M as slot, A as push, W as fallback, X as copy_payload, Y as assign_payload, U as bind_props, D as pop, F as escape_html, T as head, O as ensure_array_like, V as attr_style, R as stringify, Q as attr_class } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "clsx";
import "../../../../chunks/state.svelte.js";
import { a as getMonthName, b as formatDate, f as formatCurrency } from "../../../../chunks/date.js";
import { C as Card } from "../../../../chunks/Card.js";
import { B as Button } from "../../../../chunks/Button.js";
import { S as Select, I as Input, a as Square_pen } from "../../../../chunks/Select.js";
import { B as BudgetStatus } from "../../../../chunks/BudgetStatus.js";
import { C as Calendar } from "../../../../chunks/calendar.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { T as Trash_2 } from "../../../../chunks/trash-2.js";
function Receipt($$payload, $$props) {
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
        "d": "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"
      }
    ],
    ["path", { "d": "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }],
    ["path", { "d": "M12 17.5v-11" }]
  ];
  Icon($$payload, spread_props([
    { name: "receipt" },
    $$sanitized_props,
    {
      /**
       * @component @name Receipt
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNCAydjIwbDItMSAyIDEgMi0xIDIgMSAyLTEgMiAxIDItMSAyIDFWMmwtMiAxLTItMS0yIDEtMi0xLTIgMS0yLTEtMiAxWiIgLz4KICA8cGF0aCBkPSJNMTYgOGgtNmEyIDIgMCAxIDAgMCA0aDRhMiAyIDAgMSAxIDAgNEg4IiAvPgogIDxwYXRoIGQ9Ik0xMiAxNy41di0xMSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/receipt
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
function ExpenseForm($$payload, $$props) {
  push();
  let categoryOptions;
  let categories = fallback($$props["categories"], () => [], true);
  let loading = fallback($$props["loading"], false);
  let submitText = fallback($$props["submitText"], "Add Expense");
  let form = {
    categoryId: "",
    amount: "",
    description: "",
    expenseDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  };
  categoryOptions = categories.map((cat) => ({ value: cat.id.toString(), label: cat.name }));
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out.push(`<form class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
    Select($$payload2, {
      label: "Category",
      options: categoryOptions,
      required: true,
      placeholder: "Select a category",
      get value() {
        return form.categoryId;
      },
      set value($$value) {
        form.categoryId = $$value;
        $$settled = false;
      }
    });
    $$payload2.out.push(`<!----> `);
    Input($$payload2, {
      label: "Amount",
      type: "number",
      step: "0.01",
      min: "0",
      placeholder: "0.00",
      required: true,
      get value() {
        return form.amount;
      },
      set value($$value) {
        form.amount = $$value;
        $$settled = false;
      }
    });
    $$payload2.out.push(`<!----></div> `);
    Input($$payload2, {
      label: "Date",
      type: "date",
      required: true,
      get value() {
        return form.expenseDate;
      },
      set value($$value) {
        form.expenseDate = $$value;
        $$settled = false;
      }
    });
    $$payload2.out.push(`<!----> `);
    Input($$payload2, {
      label: "Description (Optional)",
      placeholder: "What was this expense for?",
      get value() {
        return form.description;
      },
      set value($$value) {
        form.description = $$value;
        $$settled = false;
      }
    });
    $$payload2.out.push(`<!----> <div class="flex justify-end">`);
    Button($$payload2, {
      type: "submit",
      loading,
      children: ($$payload3) => {
        $$payload3.out.push(`<!---->${escape_html(submitText)}`);
      },
      $$slots: { default: true }
    });
    $$payload2.out.push(`<!----></div></form>`);
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { categories, loading, submitText });
  pop();
}
function _page($$payload, $$props) {
  push();
  let groupedExpenses;
  let data = $$props["data"];
  let loading = false;
  function groupExpensesByDate(expenses) {
    const grouped = {};
    expenses.forEach((expense) => {
      const date = expense.expense_date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(expense);
    });
    return Object.entries(grouped).sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime()).map(([date, expenses2]) => ({ date, expenses: expenses2 }));
  }
  data.categories?.map((cat) => ({ value: cat.id.toString(), label: cat.name })) || [];
  groupedExpenses = data.actualExpenses ? groupExpensesByDate(data.actualExpenses) : [];
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Expenses - Budget Tracker</title>`;
    });
    $$payload2.out.push(`<div class="space-y-6"><div><h1 class="text-2xl font-bold text-gray-900">Expenses - ${escape_html(getMonthName(data.currentMonth || 1))} ${escape_html(data.currentYear)}</h1> <p class="text-gray-500 mt-1">Track your daily expenses and monitor your spending</p></div> `);
    if (data.error) {
      $$payload2.out.push("<!--[-->");
      Card($$payload2, {
        title: "Error",
        children: ($$payload3) => {
          $$payload3.out.push(`<p class="text-danger-600">${escape_html(data.error)}</p>`);
        },
        $$slots: { default: true }
      });
    } else {
      $$payload2.out.push("<!--[!-->");
      if (!data.budget) {
        $$payload2.out.push("<!--[-->");
        $$payload2.out.push(`<div class="text-center py-12">`);
        Calendar($$payload2, { class: "w-16 h-16 mx-auto text-gray-400 mb-4" });
        $$payload2.out.push(`<!----> <h3 class="text-lg font-medium text-gray-900 mb-2">No Budget Found</h3> <p class="text-gray-500 mb-6">You need to set up a budget before you can track expenses.</p> `);
        Button($$payload2, {
          href: "/budget",
          children: ($$payload3) => {
            $$payload3.out.push(`<!---->Set Up Budget`);
          },
          $$slots: { default: true }
        });
        $$payload2.out.push(`<!----></div>`);
      } else {
        $$payload2.out.push("<!--[!-->");
        $$payload2.out.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`);
        Card($$payload2, {
          title: "Add New Expense",
          children: ($$payload3) => {
            ExpenseForm($$payload3, { categories: data.categories, loading });
          },
          $$slots: { default: true }
        });
        $$payload2.out.push(`<!----> `);
        if (data.budgetSummary) {
          $$payload2.out.push("<!--[-->");
          BudgetStatus($$payload2, {
            remaining: data.budgetSummary.remainingBudget,
            total: data.budgetSummary.salary
          });
        } else {
          $$payload2.out.push("<!--[!-->");
        }
        $$payload2.out.push(`<!--]--></div> `);
        Card($$payload2, {
          title: "Your Expenses",
          subtitle: "All recorded expenses for this month",
          children: ($$payload3) => {
            if (data.actualExpenses?.length > 0) {
              $$payload3.out.push("<!--[-->");
              const each_array = ensure_array_like(groupedExpenses);
              $$payload3.out.push(`<div class="space-y-6"><!--[-->`);
              for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
                let group = each_array[$$index_1];
                const each_array_1 = ensure_array_like(group.expenses);
                $$payload3.out.push(`<div><h4 class="text-sm font-medium text-gray-500 mb-3 flex items-center">`);
                Calendar($$payload3, { class: "w-4 h-4 mr-2" });
                $$payload3.out.push(`<!----> ${escape_html(formatDate(group.date))}</h4> <div class="space-y-3 ml-6"><!--[-->`);
                for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                  let expense = each_array_1[$$index];
                  $$payload3.out.push(`<div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">`);
                  {
                    $$payload3.out.push("<!--[!-->");
                    $$payload3.out.push(`<div class="flex-1 flex items-center space-x-4"><div class="w-3 h-3 rounded-full flex-shrink-0"${attr_style(`background-color: ${stringify(expense.category_color)}`)}></div> <div class="flex-1 min-w-0"><p class="font-medium text-gray-900">${escape_html(expense.category_name)}</p> <p class="text-sm text-gray-500 truncate">${escape_html(expense.description || "No description")}</p></div> `);
                    if (expense.receipt_path) {
                      $$payload3.out.push("<!--[-->");
                      Receipt($$payload3, { class: "w-4 h-4 text-gray-400" });
                    } else {
                      $$payload3.out.push("<!--[!-->");
                    }
                    $$payload3.out.push(`<!--]--></div> <div class="flex items-center space-x-4"><span class="font-semibold text-gray-900">${escape_html(formatCurrency(expense.amount))}</span> <div class="flex space-x-2">`);
                    Button($$payload3, {
                      size: "sm",
                      variant: "secondary",
                      children: ($$payload4) => {
                        Square_pen($$payload4, { class: "w-4 h-4" });
                      },
                      $$slots: { default: true }
                    });
                    $$payload3.out.push(`<!----> `);
                    Button($$payload3, {
                      size: "sm",
                      variant: "danger",
                      children: ($$payload4) => {
                        Trash_2($$payload4, { class: "w-4 h-4" });
                      },
                      $$slots: { default: true }
                    });
                    $$payload3.out.push(`<!----></div></div>`);
                  }
                  $$payload3.out.push(`<!--]--></div>`);
                }
                $$payload3.out.push(`<!--]--> <div class="ml-4 pt-2 border-t border-gray-200"><div class="flex justify-between text-sm"><span class="text-gray-500">Daily total:</span> <span class="font-semibold text-gray-900">${escape_html(formatCurrency(group.expenses.reduce((sum, exp) => sum + exp.amount, 0)))}</span></div></div></div></div>`);
              }
              $$payload3.out.push(`<!--]--></div> `);
              if (data.budgetSummary) {
                $$payload3.out.push("<!--[-->");
                $$payload3.out.push(`<div class="mt-6 pt-6 border-t border-gray-200"><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="text-center"><p class="text-sm text-gray-500">Total Spent</p> <p class="text-2xl font-bold text-gray-900">${escape_html(formatCurrency(data.budgetSummary.totalActual))}</p></div> <div class="text-center"><p class="text-sm text-gray-500">Budget Remaining</p> <p${attr_class(`text-2xl font-bold ${stringify(data.budgetSummary.remainingBudget >= 0 ? "text-success-600" : "text-danger-600")}`)}>${escape_html(formatCurrency(data.budgetSummary.remainingBudget))}</p></div> <div class="text-center"><p class="text-sm text-gray-500">Total Expenses</p> <p class="text-2xl font-bold text-gray-900">${escape_html(data.actualExpenses.length)}</p></div></div></div>`);
              } else {
                $$payload3.out.push("<!--[!-->");
              }
              $$payload3.out.push(`<!--]-->`);
            } else {
              $$payload3.out.push("<!--[!-->");
              $$payload3.out.push(`<div class="text-center py-12">`);
              Receipt($$payload3, { class: "w-16 h-16 mx-auto text-gray-400 mb-4" });
              $$payload3.out.push(`<!----> <h3 class="text-lg font-medium text-gray-900 mb-2">No Expenses Yet</h3> <p class="text-gray-500">Start tracking your expenses by adding your first expense above.</p></div>`);
            }
            $$payload3.out.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
        $$payload2.out.push(`<!---->`);
      }
      $$payload2.out.push(`<!--]-->`);
    }
    $$payload2.out.push(`<!--]--></div>`);
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
