# Finance Dashboard

This project is a responsive personal finance dashboard built with HTML, CSS, and vanilla JavaScript. It helps users track their money in one place by showing income, expenses, balance trends, category-wise spending, and transaction insights through interactive charts.

The app includes three main sections:

- Overview: Snapshot cards and charts for balance trend, spending categories, and monthly income vs expenses.
- Transactions: Search, filter, sort, and manage transaction history.
- Insights: Quick observations and spending breakdown by category.

It also supports role-based behavior:

- Admin can add and delete transactions.
- Viewer can explore data in read-only mode.

Transaction data is saved in browser local storage, so changes persist between sessions without any backend setup.

## Getting Started

1. Download or clone this project.
2. Open the project folder in VS Code.
3. Open `index.html` in your browser.

No installation is required because this is a pure frontend project.

## How to Use

- Switch between Overview, Transactions, and Insights from the top navigation.
- Use the role selector (Admin/Viewer) in the top-right corner.
- As Admin, click `+ Add Transaction` to add new entries.
- In Transactions, use search, type filters, and sorting to explore records.
