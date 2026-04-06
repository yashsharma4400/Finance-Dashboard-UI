const STORAGE_KEY = "ledger_txs_v2";

const SEED = [
  {
    id: 1,
    date: "2026-04-01",
    desc: "April Salary",
    cat: "salary",
    type: "income",
    amount: 85000,
  },
  {
    id: 2,
    date: "2026-04-02",
    desc: "Grocery Store",
    cat: "food",
    type: "expense",
    amount: 3200,
  },
  {
    id: 3,
    date: "2026-04-02",
    desc: "Metro Card Reload",
    cat: "transport",
    type: "expense",
    amount: 500,
  },
  {
    id: 4,
    date: "2026-03-30",
    desc: "Netflix Subscription",
    cat: "entertainment",
    type: "expense",
    amount: 649,
  },
  {
    id: 5,
    date: "2026-03-28",
    desc: "Freelance Project",
    cat: "freelance",
    type: "income",
    amount: 22000,
  },
  {
    id: 6,
    date: "2026-03-27",
    desc: "Pharmacy",
    cat: "health",
    type: "expense",
    amount: 1100,
  },
  {
    id: 7,
    date: "2026-03-25",
    desc: "Amazon Order",
    cat: "shopping",
    type: "expense",
    amount: 4500,
  },
  {
    id: 8,
    date: "2026-03-24",
    desc: "Electricity Bill",
    cat: "utilities",
    type: "expense",
    amount: 2100,
  },
  {
    id: 9,
    date: "2026-03-22",
    desc: "Restaurant Dinner",
    cat: "food",
    type: "expense",
    amount: 1800,
  },
  {
    id: 10,
    date: "2026-03-20",
    desc: "Mutual Fund Dividend",
    cat: "investment",
    type: "income",
    amount: 5600,
  },
  {
    id: 11,
    date: "2026-03-18",
    desc: "Uber Rides",
    cat: "transport",
    type: "expense",
    amount: 780,
  },
  {
    id: 12,
    date: "2026-03-15",
    desc: "March Salary",
    cat: "salary",
    type: "income",
    amount: 85000,
  },
  {
    id: 13,
    date: "2026-03-14",
    desc: "Cinema Tickets",
    cat: "entertainment",
    type: "expense",
    amount: 900,
  },
  {
    id: 14,
    date: "2026-03-12",
    desc: "Supermarket",
    cat: "food",
    type: "expense",
    amount: 2800,
  },
  {
    id: 15,
    date: "2026-03-10",
    desc: "Internet Bill",
    cat: "utilities",
    type: "expense",
    amount: 999,
  },
  {
    id: 16,
    date: "2026-03-08",
    desc: "Gym Membership",
    cat: "health",
    type: "expense",
    amount: 1500,
  },
  {
    id: 17,
    date: "2026-03-05",
    desc: "Clothing Purchase",
    cat: "shopping",
    type: "expense",
    amount: 6200,
  },
  {
    id: 18,
    date: "2026-02-28",
    desc: "Freelance Design",
    cat: "freelance",
    type: "income",
    amount: 18000,
  },
  {
    id: 19,
    date: "2026-02-28",
    desc: "February Salary",
    cat: "salary",
    type: "income",
    amount: 85000,
  },
  {
    id: 20,
    date: "2026-02-25",
    desc: "Restaurant Lunch",
    cat: "food",
    type: "expense",
    amount: 950,
  },
  {
    id: 21,
    date: "2026-02-22",
    desc: "Bus Pass",
    cat: "transport",
    type: "expense",
    amount: 400,
  },
  {
    id: 22,
    date: "2026-02-20",
    desc: "Doctor Visit",
    cat: "health",
    type: "expense",
    amount: 800,
  },
  {
    id: 23,
    date: "2026-02-18",
    desc: "Spotify",
    cat: "entertainment",
    type: "expense",
    amount: 199,
  },
  {
    id: 24,
    date: "2026-02-15",
    desc: "Electronics",
    cat: "shopping",
    type: "expense",
    amount: 12000,
  },
  {
    id: 25,
    date: "2026-02-10",
    desc: "Water Bill",
    cat: "utilities",
    type: "expense",
    amount: 650,
  },
  {
    id: 26,
    date: "2026-01-31",
    desc: "January Salary",
    cat: "salary",
    type: "income",
    amount: 85000,
  },
  {
    id: 27,
    date: "2026-01-28",
    desc: "Grocery",
    cat: "food",
    type: "expense",
    amount: 3100,
  },
  {
    id: 28,
    date: "2026-01-25",
    desc: "Cab to Airport",
    cat: "transport",
    type: "expense",
    amount: 1200,
  },
  {
    id: 29,
    date: "2026-01-22",
    desc: "Investment Return",
    cat: "investment",
    type: "income",
    amount: 8000,
  },
  {
    id: 30,
    date: "2026-01-18",
    desc: "Movie Night",
    cat: "entertainment",
    type: "expense",
    amount: 600,
  },
];

let transactions = [];
let currentRole = "admin";
let typeFilter = "all";
let trendChart, donutChart, barChart;

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    transactions = raw ? JSON.parse(raw) : [...SEED];
  } catch (e) {
    transactions = [...SEED];
  }
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (e) {}
}

function setRole(role) {
  currentRole = role;
  const badge = document.getElementById("role-badge");
  badge.textContent = role.charAt(0).toUpperCase() + role.slice(1);
  badge.className = "role-badge " + role;
  document.getElementById("add-btn").style.display =
    role === "admin" ? "" : "none";
  document.getElementById("actions-header").textContent =
    role === "admin" ? "Actions" : "";
  renderTx();
  renderInsights();
}

function showPage(id) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".nav-btn")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById("page-" + id).classList.add("active");
  event.target.classList.add("active");
}

function fmt(n) {
  return "₹" + Math.abs(n).toLocaleString("en-IN");
}

function renderSummaryCards() {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const monthTx = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });
  const monthExp = monthTx
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  const cards = [
    {
      label: "Total Balance",
      val: fmt(balance),
      delta: "+2.4% vs last month",
      dir: "up",
      gold: true,
    },
    {
      label: "Total Income",
      val: fmt(income),
      delta: "All time",
      dir: "up",
      gold: false,
    },
    {
      label: "Total Expenses",
      val: fmt(expense),
      delta: "All time",
      dir: "down",
      gold: false,
    },
    {
      label: "This Month Spend",
      val: fmt(monthExp),
      delta: "April 2026",
      dir: "down",
      gold: false,
    },
  ];

  document.getElementById("summary-cards").innerHTML = cards
    .map(
      (c) => `
    <div class="card${c.gold ? " gold-border" : ""}">
      <div class="card-label">${c.label}</div>
      <div class="card-value">${c.val}</div>
      <div class="card-delta ${c.dir}">${c.dir === "up" ? "▲" : "▼"} ${c.delta}</div>
    </div>
  `,
    )
    .join("");
}

function renderCharts() {
  const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  const monthData = [
    { income: 85000, expense: 28000 },
    { income: 103000, expense: 31500 },
    { income: 93000, expense: 26000 },
    { income: 188000, expense: 34300 },
    { income: 107000, expense: 28979 },
    { income: 85000, expense: 3200 + 500 + 649 },
  ];

  const balances = monthData.reduce((acc, m, i) => {
    const prev = i === 0 ? 150000 : acc[i - 1];
    acc.push(prev + m.income - m.expense);
    return acc;
  }, []);

  const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
  };

  if (trendChart) trendChart.destroy();
  trendChart = new Chart(document.getElementById("trendChart"), {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          data: balances,
          borderColor: "#c9a84c",
          backgroundColor: "rgba(201,168,76,0.08)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#c9a84c",
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2,
        },
      ],
    },
    options: {
      ...chartDefaults,
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#5c5a57", font: { family: "Outfit", size: 11 } },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: {
            color: "#5c5a57",
            font: { family: "Outfit", size: 11 },
            callback: (v) => "₹" + (v / 1000).toFixed(0) + "k",
          },
        },
      },
    },
  });

  const catColors = {
    food: "#ffb347",
    transport: "#5b9cf6",
    entertainment: "#9f7aea",
    health: "#4caf7d",
    shopping: "#f56565",
    utilities: "#818cf8",
    other: "#9ca3af",
  };
  const expByCat = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const c = t.cat in catColors ? t.cat : "other";
      expByCat[c] = (expByCat[c] || 0) + t.amount;
    });
  const catLabels = Object.keys(expByCat);
  const catVals = catLabels.map((c) => expByCat[c]);
  const catColorsArr = catLabels.map((c) => catColors[c] || "#9ca3af");
  const total = catVals.reduce((a, b) => a + b, 0);

  document.getElementById("donut-legend").innerHTML = catLabels
    .map(
      (c, i) => `
    <div class="legend-row"><span class="legend-dot" style="background:${catColorsArr[i]}"></span>${c} <span style="margin-left:auto;font-family:'DM Mono',monospace;">${Math.round((catVals[i] / total) * 100)}%</span></div>
  `,
    )
    .join("");

  if (donutChart) donutChart.destroy();
  donutChart = new Chart(document.getElementById("donutChart"), {
    type: "doughnut",
    data: {
      labels: catLabels,
      datasets: [
        {
          data: catVals,
          backgroundColor: catColorsArr,
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      ...chartDefaults,
      cutout: "65%",
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => " ₹" + ctx.parsed.toLocaleString("en-IN"),
          },
        },
      },
    },
  });

  if (barChart) barChart.destroy();
  barChart = new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: months,
      datasets: [
        {
          label: "Income",
          data: monthData.map((m) => m.income),
          backgroundColor: "rgba(76,175,125,0.7)",
          borderRadius: 4,
        },
        {
          label: "Expenses",
          data: monthData.map((m) => m.expense),
          backgroundColor: "rgba(224,86,86,0.7)",
          borderRadius: 4,
        },
      ],
    },
    options: {
      ...chartDefaults,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "#9a9690",
            font: { family: "Outfit", size: 11 },
            boxWidth: 12,
            boxHeight: 8,
            borderRadius: 2,
          },
        },
      },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#5c5a57", font: { family: "Outfit", size: 11 } },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: {
            color: "#5c5a57",
            font: { family: "Outfit", size: 11 },
            callback: (v) => "₹" + (v / 1000).toFixed(0) + "k",
          },
        },
      },
    },
  });
}

let activeTypeFilter = "all";

function setTypeFilter(val, el) {
  activeTypeFilter = val;
  document
    .querySelectorAll("#type-filters .filter-btn")
    .forEach((b) => b.classList.remove("active"));
  el.classList.add("active");
  filterTx();
}

function filterTx() {
  const q = document.getElementById("search-input").value.toLowerCase();
  const sort = document.getElementById("sort-sel").value;

  let filtered = transactions.filter((t) => {
    const matchType = activeTypeFilter === "all" || t.type === activeTypeFilter;
    const matchQ =
      !q || t.desc.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q);
    return matchType && matchQ;
  });

  filtered.sort((a, b) => {
    if (sort === "date-desc") return new Date(b.date) - new Date(a.date);
    if (sort === "date-asc") return new Date(a.date) - new Date(b.date);
    if (sort === "amt-desc") return b.amount - a.amount;
    if (sort === "amt-asc") return a.amount - b.amount;
  });

  renderTxRows(filtered);
}

function renderTx() {
  filterTx();
}

function catPill(cat) {
  return `<span class="cat-pill cat-${cat}">${cat}</span>`;
}

function renderTxRows(list) {
  const tbody = document.getElementById("tx-tbody");
  const empty = document.getElementById("empty-state");
  if (!list.length) {
    tbody.innerHTML = "";
    empty.style.display = "";
    return;
  }
  empty.style.display = "none";
  tbody.innerHTML = list
    .map(
      (t) => `
    <tr>
      <td style="color:var(--text2);font-size:12px;">${new Date(t.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
      <td style="font-weight:500;">${t.desc}</td>
      <td>${catPill(t.cat)}</td>
      <td><span class="type-badge type-${t.type}">${t.type === "income" ? "+ Income" : "− Expense"}</span></td>
      <td style="text-align:right;" class="amt-${t.type}">${t.type === "income" ? "+" : "-"}${fmt(t.amount)}</td>
      <td style="text-align:center;">${currentRole === "admin" ? `<button onclick="deleteTx(${t.id})" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:16px;padding:2px 6px;" title="Delete">×</button>` : ""}</td>
    </tr>
  `,
    )
    .join("");
}

function deleteTx(id) {
  transactions = transactions.filter((t) => t.id !== id);
  saveData();
  renderSummaryCards();
  renderCharts();
  filterTx();
  renderInsights();
}

function openModal() {
  if (currentRole !== "admin") return;
  document.getElementById("f-date").value = new Date()
    .toISOString()
    .slice(0, 10);
  document.getElementById("modal-overlay").classList.add("open");
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
}

function saveTransaction() {
  const desc = document.getElementById("f-desc").value.trim();
  const amount = parseFloat(document.getElementById("f-amount").value);
  const date = document.getElementById("f-date").value;
  const type = document.getElementById("f-type").value;
  const cat = document.getElementById("f-cat").value;
  if (!desc || !amount || !date) return;

  const newTx = { id: Date.now(), date, desc, cat, type, amount };
  transactions.unshift(newTx);
  saveData();
  closeModal();
  document.getElementById("f-desc").value = "";
  document.getElementById("f-amount").value = "";
  renderSummaryCards();
  renderCharts();
  filterTx();
  renderInsights();
}

function renderInsights() {
  const expenses = transactions.filter((t) => t.type === "expense");
  const income = transactions.filter((t) => t.type === "income");
  const catTotals = {};
  expenses.forEach((t) => {
    catTotals[t.cat] = (catTotals[t.cat] || 0) + t.amount;
  });
  const topCat = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0];

  const now = new Date();
  const thisM = now.getMonth(),
    thisY = now.getFullYear();
  const lastM = thisM === 0 ? 11 : thisM - 1;
  const lastY = thisM === 0 ? thisY - 1 : thisY;

  const thisMonthExp = expenses
    .filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === thisM && d.getFullYear() === thisY;
    })
    .reduce((s, t) => s + t.amount, 0);
  const lastMonthExp = expenses
    .filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === lastM && d.getFullYear() === lastY;
    })
    .reduce((s, t) => s + t.amount, 0);
  const monthDiff = lastMonthExp
    ? (((thisMonthExp - lastMonthExp) / lastMonthExp) * 100).toFixed(1)
    : 0;

  const totalIncome = income.reduce((s, t) => s + t.amount, 0);
  const totalExp = expenses.reduce((s, t) => s + t.amount, 0);
  const savingsRate = totalIncome
    ? (((totalIncome - totalExp) / totalIncome) * 100).toFixed(1)
    : 0;

  const avgMonthlyExp = totalExp / 6;

  document.getElementById("insights-grid").innerHTML = `
    <div class="insight-card">
      <div class="insight-icon">🏆</div>
      <div class="insight-title">Top Spending Category</div>
      <div class="insight-val">${topCat ? topCat[0] : "—"}</div>
      <div class="insight-desc">${topCat ? fmt(topCat[1]) + " total spent" : "No expense data"}</div>
    </div>
    <div class="insight-card">
      <div class="insight-icon">${Number(monthDiff) <= 0 ? "📉" : "📈"}</div>
      <div class="insight-title">Month-on-Month</div>
      <div class="insight-val" style="color:${Number(monthDiff) > 0 ? "var(--red)" : "var(--green)"};">${monthDiff > 0 ? "+" : ""}${monthDiff}%</div>
      <div class="insight-desc">${Number(monthDiff) > 0 ? "Spending increased" : "Spending decreased"} vs last month</div>
    </div>
    <div class="insight-card">
      <div class="insight-icon">💰</div>
      <div class="insight-title">Savings Rate</div>
      <div class="insight-val" style="color:var(--green);">${savingsRate}%</div>
      <div class="insight-desc">Of total income retained as savings</div>
    </div>
    <div class="insight-card">
      <div class="insight-icon">📊</div>
      <div class="insight-title">Avg Monthly Spend</div>
      <div class="insight-val">${fmt(Math.round(avgMonthlyExp))}</div>
      <div class="insight-desc">Based on last 6 months of data</div>
    </div>
    <div class="insight-card">
      <div class="insight-icon">📝</div>
      <div class="insight-title">Total Transactions</div>
      <div class="insight-val">${transactions.length}</div>
      <div class="insight-desc">${income.length} income · ${expenses.length} expenses</div>
    </div>
    <div class="insight-card">
      <div class="insight-icon">🎯</div>
      <div class="insight-title">Net Worth Delta</div>
      <div class="insight-val" style="color:var(--gold2);">${fmt(Math.round(totalIncome - totalExp))}</div>
      <div class="insight-desc">Total surplus across all records</div>
    </div>
  `;

  const catSorted = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
  const maxVal = catSorted[0]?.[1] || 1;
  const catColorMap = {
    food: "#ffb347",
    transport: "#5b9cf6",
    entertainment: "#9f7aea",
    health: "#4caf7d",
    shopping: "#f56565",
    utilities: "#818cf8",
    other: "#9ca3af",
  };

  document.getElementById("cat-breakdown").innerHTML = catSorted
    .map(
      ([cat, val]) => `
    <div style="margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <span style="font-size:13px;text-transform:capitalize;">${cat}</span>
        <span style="font-size:13px;font-family:'DM Mono',monospace;color:var(--text2);">${fmt(val)}</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width:${Math.round((val / maxVal) * 100)}%;background:${catColorMap[cat] || "#9ca3af"};"></div>
      </div>
    </div>
  `,
    )
    .join("");
}

loadData();
renderSummaryCards();
renderInsights();
setRole("admin");

setTimeout(() => {
  renderCharts();
  filterTx();
}, 100);

document
  .getElementById("modal-overlay")
  .addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });
