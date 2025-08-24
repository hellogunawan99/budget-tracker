import { X as copy_payload, Y as assign_payload, U as bind_props, D as pop, A as push, T as head, F as escape_html, Q as attr_class, O as ensure_array_like, V as attr_style, R as stringify } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "clsx";
import "../../../../chunks/state.svelte.js";
import { a as getMonthName, f as formatCurrency } from "../../../../chunks/date.js";
import { C as Card } from "../../../../chunks/Card.js";
import { B as Button } from "../../../../chunks/Button.js";
import { I as Input, S as Select, a as Square_pen } from "../../../../chunks/Select.js";
import { B as BudgetStatus } from "../../../../chunks/BudgetStatus.js";
import { P as Plus } from "../../../../chunks/plus.js";
import { T as Trash_2 } from "../../../../chunks/trash-2.js";
function _page($$payload, $$props) {
  push();
  let categoryOptions;
  let data = $$props["data"];
  let budgetForm = { salary: data.budget?.salary || "" };
  let expenseForm = { categoryId: "", amount: "", description: "" };
  let loading = false;
  categoryOptions = data.categories?.map((cat) => ({ value: cat.id.toString(), label: cat.name })) || [];
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Budget Planning - Budget Tracker</title>`;
    });
    $$payload2.out.push(`<div class="space-y-6"><div><h1 class="text-2xl font-bold text-gray-900">Budget Planning - ${escape_html(getMonthName(data.currentMonth || 1))} ${escape_html(data.currentYear)}</h1> <p class="text-gray-500 mt-1">Set up your monthly income and planned expenses</p></div> `);
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
      $$payload2.out.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`);
      Card($$payload2, {
        title: "Monthly Income",
        children: ($$payload3) => {
          $$payload3.out.push(`<form class="space-y-4">`);
          Input($$payload3, {
            label: "Monthly Salary",
            type: "number",
            step: "0.01",
            min: "0",
            placeholder: "Enter your monthly income",
            required: true,
            get value() {
              return budgetForm.salary;
            },
            set value($$value) {
              budgetForm.salary = $$value;
              $$settled = false;
            }
          });
          $$payload3.out.push(`<!----> `);
          Button($$payload3, {
            type: "submit",
            loading,
            children: ($$payload4) => {
              $$payload4.out.push(`<!---->${escape_html(data.budget ? "Update" : "Create")} Budget`);
            },
            $$slots: { default: true }
          });
          $$payload3.out.push(`<!----></form>`);
        },
        $$slots: { default: true }
      });
      $$payload2.out.push(`<!----> `);
      if (data.budgetSummary) {
        $$payload2.out.push("<!--[-->");
        BudgetStatus($$payload2, {
          remaining: data.budgetSummary.plannedRemaining,
          total: data.budgetSummary.salary,
          title: "Planned Budget Status"
        });
      } else {
        $$payload2.out.push("<!--[!-->");
      }
      $$payload2.out.push(`<!--]--></div> `);
      if (data.budget) {
        $$payload2.out.push("<!--[-->");
        $$payload2.out.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`);
        Card($$payload2, {
          title: "Add Planned Expense",
          children: ($$payload3) => {
            $$payload3.out.push(`<form class="space-y-4">`);
            Select($$payload3, {
              label: "Category",
              options: categoryOptions,
              required: true,
              placeholder: "Select a category",
              get value() {
                return expenseForm.categoryId;
              },
              set value($$value) {
                expenseForm.categoryId = $$value;
                $$settled = false;
              }
            });
            $$payload3.out.push(`<!----> `);
            Input($$payload3, {
              label: "Amount",
              type: "number",
              step: "0.01",
              min: "0",
              placeholder: "0.00",
              required: true,
              get value() {
                return expenseForm.amount;
              },
              set value($$value) {
                expenseForm.amount = $$value;
                $$settled = false;
              }
            });
            $$payload3.out.push(`<!----> `);
            Input($$payload3, {
              label: "Description (Optional)",
              placeholder: "What is this expense for?",
              get value() {
                return expenseForm.description;
              },
              set value($$value) {
                expenseForm.description = $$value;
                $$settled = false;
              }
            });
            $$payload3.out.push(`<!----> `);
            Button($$payload3, {
              type: "submit",
              loading,
              children: ($$payload4) => {
                Plus($$payload4, { class: "w-4 h-4 mr-2" });
                $$payload4.out.push(`<!----> Add Expense`);
              },
              $$slots: { default: true }
            });
            $$payload3.out.push(`<!----></form>`);
          },
          $$slots: { default: true }
        });
        $$payload2.out.push(`<!----> `);
        Card($$payload2, {
          title: "Budget Summary",
          children: ($$payload3) => {
            if (data.budgetSummary) {
              $$payload3.out.push("<!--[-->");
              $$payload3.out.push(`<div class="space-y-4"><div class="flex justify-between"><span class="text-gray-600">Monthly Income:</span> <span class="font-semibold">${escape_html(formatCurrency(data.budgetSummary.salary))}</span></div> <div class="flex justify-between"><span class="text-gray-600">Planned Expenses:</span> <span class="font-semibold">${escape_html(formatCurrency(data.budgetSummary.totalPlanned))}</span></div> <hr/> <div class="flex justify-between text-lg font-bold"><span>Remaining:</span> <span${attr_class(data.budgetSummary.plannedRemaining >= 0 ? "text-success-600" : "text-danger-600")}>${escape_html(formatCurrency(data.budgetSummary.plannedRemaining))}</span></div></div>`);
            } else {
              $$payload3.out.push("<!--[!-->");
            }
            $$payload3.out.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
        $$payload2.out.push(`<!----></div> `);
        Card($$payload2, {
          title: "Planned Expenses",
          subtitle: "Your expected monthly expenses",
          children: ($$payload3) => {
            if (data.plannedExpenses?.length > 0) {
              $$payload3.out.push("<!--[-->");
              const each_array = ensure_array_like(data.plannedExpenses);
              $$payload3.out.push(`<div class="space-y-3"><!--[-->`);
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let expense = each_array[$$index];
                $$payload3.out.push(`<div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">`);
                {
                  $$payload3.out.push("<!--[!-->");
                  $$payload3.out.push(`<div class="flex-1"><div class="flex items-center space-x-3"><div class="w-3 h-3 rounded-full"${attr_style(`background-color: ${stringify(expense.category_color)}`)}></div> <div><p class="font-medium text-gray-900">${escape_html(expense.category_name)}</p> <p class="text-sm text-gray-500">${escape_html(expense.description || "No description")}</p></div></div></div> <div class="flex items-center space-x-4"><span class="font-semibold text-gray-900">${escape_html(formatCurrency(expense.amount))}</span> <div class="flex space-x-2">`);
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
              $$payload3.out.push(`<!--]--></div>`);
            } else {
              $$payload3.out.push("<!--[!-->");
              $$payload3.out.push(`<p class="text-gray-500 text-center py-8">No planned expenses yet. Add some above to get started.</p>`);
            }
            $$payload3.out.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
        $$payload2.out.push(`<!---->`);
      } else {
        $$payload2.out.push("<!--[!-->");
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
