function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}
function getCurrentMonth() {
  return (/* @__PURE__ */ new Date()).getMonth() + 1;
}
function getCurrentYear() {
  return (/* @__PURE__ */ new Date()).getFullYear();
}
function getMonthName(month) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return months[month - 1];
}
function isPayday() {
  const today = /* @__PURE__ */ new Date();
  return today.getDate() >= 25;
}
function getNextPayday() {
  const today = /* @__PURE__ */ new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  if (today.getDate() >= 25) {
    return new Date(currentYear, currentMonth + 1, 25);
  } else {
    return new Date(currentYear, currentMonth, 25);
  }
}
function getDaysUntilPayday() {
  const today = /* @__PURE__ */ new Date();
  const nextPayday = getNextPayday();
  const diffTime = nextPayday.getTime() - today.getTime();
  return Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
}
function getBudgetStatus(remaining, total) {
  const percentage = remaining / total * 100;
  if (percentage > 20) return "good";
  if (percentage > 5) return "warning";
  return "danger";
}
export {
  getMonthName as a,
  formatDate as b,
  getCurrentMonth as c,
  getCurrentYear as d,
  getBudgetStatus as e,
  formatCurrency as f,
  getDaysUntilPayday as g,
  isPayday as i
};
