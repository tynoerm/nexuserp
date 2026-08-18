"use client";

import { useState } from "react";
import {
  Wallet,
  Receipt,
  Landmark,
  DollarSign,
  PiggyBank,
  BarChart3,
  FileSpreadsheet,
  BadgeDollarSign,
  Search,
  Save,
  X,
  UserPlus,
  TrendingUp,
  CreditCard,
  Calculator,
} from "lucide-react";

export default function AccountsFinancePage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [transactions, setTransactions] = useState([
    {
      id: "ACC-1001",
      account: "Medical Supplies",
      type: "Accounts Payable",
      amount: "$2,500",
      status: "Pending",
      date: "22 May 2026",
    },
    {
      id: "ACC-1002",
      account: "Patient Billing",
      type: "Accounts Receivable",
      amount: "$1,200",
      status: "Paid",
      date: "21 May 2026",
    },
  ]);

  const [formData, setFormData] = useState({
    accountName: "",
    transactionType: "",
    amount: "",
    ledgerNotes: "",
    payableDetails: "",
    receivableDetails: "",
    bankReconciliation: "",
    budgeting: "",
    cashFlow: "",
    financialReport: "",
    taxManagement: "",
  });

  const modules = [
    {
      title: "General Ledger",
      icon: Wallet,
      desc: "Manage all accounting entries and ledger transactions.",
    },
    {
      title: "Accounts Payable",
      icon: Receipt,
      desc: "Track supplier invoices and outgoing payments.",
    },
    {
      title: "Accounts Receivable",
      icon: DollarSign,
      desc: "Monitor incoming payments and patient balances.",
    },
    {
      title: "Bank Reconciliation",
      icon: Landmark,
      desc: "Reconcile bank statements and transactions.",
    },
    {
      title: "Budgeting",
      icon: PiggyBank,
      desc: "Plan and manage departmental budgets.",
    },
    {
      title: "Cash Flow Management",
      icon: TrendingUp,
      desc: "Track and analyze hospital cash flow.",
    },
    {
      title: "Financial Reporting",
      icon: BarChart3,
      desc: "Generate financial summaries and reports.",
    },
    {
      title: "Tax Management",
      icon: BadgeDollarSign,
      desc: "Manage tax calculations and compliance records.",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveTransaction = () => {
    if (
      !formData.accountName ||
      !formData.transactionType ||
      !formData.amount
    ) {
      alert("Please complete required fields");
      return;
    }

    const newTransaction = {
      id: `ACC-${Math.floor(Math.random() * 9000 + 1000)}`,
      account: formData.accountName,
      type: formData.transactionType,
      amount: `$${formData.amount}`,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    setTransactions([newTransaction, ...transactions]);

    setFormData({
      accountName: "",
      transactionType: "",
      amount: "",
      ledgerNotes: "",
      payableDetails: "",
      receivableDetails: "",
      bankReconciliation: "",
      budgeting: "",
      cashFlow: "",
      financialReport: "",
      taxManagement: "",
    });

    setOpenModal(false);
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.account
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-emerald-900 via-green-800 to-slate-900 text-white shadow-2xl">
        <div className="px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Accounts & Finance Dashboard
            </h1>

            <p className="text-slate-300 mt-1">
              Financial management, budgeting & reporting
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-green-600 hover:bg-green-700 transition px-5 py-3 rounded-2xl font-medium shadow-lg flex items-center gap-2"
          >
            <UserPlus size={20} />
            New Transaction
          </button>
        </div>
      </header>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden">
            {/* MODAL HEADER */}
            <div className="flex justify-between items-center px-8 py-5 border-b border-slate-200 bg-slate-50">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Finance Transaction Entry
                </h2>

                <p className="text-slate-500 mt-1">
                  Record financial and accounting transactions
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="p-2 rounded-xl hover:bg-red-100 hover:text-red-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-8 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ACCOUNT NAME */}
                <div>
                  <label className="block mb-2 font-medium">
                    Account Name *
                  </label>

                  <input
                    type="text"
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleInputChange}
                    placeholder="Enter account name"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* TRANSACTION TYPE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Transaction Type *
                  </label>

                  <select
                    name="transactionType"
                    value={formData.transactionType}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">
                      Select Transaction Type
                    </option>

                    <option value="Accounts Payable">
                      Accounts Payable
                    </option>

                    <option value="Accounts Receivable">
                      Accounts Receivable
                    </option>

                    <option value="Bank Reconciliation">
                      Bank Reconciliation
                    </option>

                    <option value="Budgeting">
                      Budgeting
                    </option>
                  </select>
                </div>

                {/* AMOUNT */}
                <div>
                  <label className="block mb-2 font-medium">
                    Amount *
                  </label>

                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* LEDGER NOTES */}
                <div>
                  <label className="block mb-2 font-medium">
                    General Ledger Notes
                  </label>

                  <input
                    type="text"
                    name="ledgerNotes"
                    value={formData.ledgerNotes}
                    onChange={handleInputChange}
                    placeholder="Ledger transaction notes"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* PAYABLE DETAILS */}
                <div>
                  <label className="block mb-2 font-medium">
                    Accounts Payable
                  </label>

                  <textarea
                    name="payableDetails"
                    value={formData.payableDetails}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Enter payable details..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* RECEIVABLE DETAILS */}
                <div>
                  <label className="block mb-2 font-medium">
                    Accounts Receivable
                  </label>

                  <textarea
                    name="receivableDetails"
                    value={formData.receivableDetails}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Enter receivable details..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* BANK RECONCILIATION */}
                <div>
                  <label className="block mb-2 font-medium">
                    Bank Reconciliation
                  </label>

                  <textarea
                    name="bankReconciliation"
                    value={formData.bankReconciliation}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Enter reconciliation details..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* BUDGETING */}
                <div>
                  <label className="block mb-2 font-medium">
                    Budgeting
                  </label>

                  <textarea
                    name="budgeting"
                    value={formData.budgeting}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Enter budgeting details..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* CASH FLOW */}
                <div>
                  <label className="block mb-2 font-medium">
                    Cash Flow Management
                  </label>

                  <textarea
                    name="cashFlow"
                    value={formData.cashFlow}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Cash flow information..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* FINANCIAL REPORT */}
                <div>
                  <label className="block mb-2 font-medium">
                    Financial Reporting
                  </label>

                  <textarea
                    name="financialReport"
                    value={formData.financialReport}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Financial reporting notes..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* TAX */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Tax Management
                  </label>

                  <textarea
                    name="taxManagement"
                    value={formData.taxManagement}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Tax records and compliance..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-8 py-5 border-t border-slate-200 bg-slate-50 flex justify-end gap-4">
              <button
                onClick={() => setOpenModal(false)}
                className="px-6 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveTransaction}
                className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 shadow-lg"
              >
                <Save size={18} />
                Save Transaction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="p-6 md:p-8">
        {/* SEARCH */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Search Financial Records
              </h2>

              <p className="text-slate-500 mt-1">
                Search accounting and finance transactions
              </p>
            </div>

            <div className="relative w-full lg:w-[400px]">
              <Search
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search account..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Transactions
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {transactions.length}
                </h2>
              </div>

              <div className="bg-green-100 text-green-700 p-4 rounded-2xl">
                <Wallet size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Accounts Payable
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  $12,500
                </h2>
              </div>

              <div className="bg-red-100 text-red-700 p-4 rounded-2xl">
                <CreditCard size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Accounts Receivable
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  $18,240
                </h2>
              </div>

              <div className="bg-blue-100 text-blue-700 p-4 rounded-2xl">
                <DollarSign size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Financial Reports
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  24
                </h2>
              </div>

              <div className="bg-purple-100 text-purple-700 p-4 rounded-2xl">
                <Calculator size={30} />
              </div>
            </div>
          </div>
        </div>

        {/* MODULES */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Finance Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition"
                >
                  <div className="bg-green-100 text-green-700 p-4 rounded-2xl w-fit">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-lg font-semibold mt-5">
                    {module.title}
                  </h3>

                  <p className="text-slate-500 mt-2">
                    {module.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800">
              Financial Transactions
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-600">
                  <th className="px-6 py-4">Account</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map(
                  (transaction, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-5 font-medium">
                        {transaction.account}
                      </td>

                      <td className="px-6 py-5">
                        {transaction.type}
                      </td>

                      <td className="px-6 py-5">
                        {transaction.amount}
                      </td>

                      <td className="px-6 py-5">
                        {transaction.date}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-4 py-1 rounded-full text-sm font-medium ${
                            transaction.status ===
                            "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}