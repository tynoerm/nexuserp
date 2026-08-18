"use client";

import { useState } from "react";
import {
  Banknote,
  Clock3,
  MinusCircle,
  CalendarDays,
  FileText,
  PiggyBank,
  UserPlus,
  Search,
  Save,
  X,
  Users,
  ReceiptText,
  DollarSign,
} from "lucide-react";

export default function PayrollManagementPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [payrolls, setPayrolls] = useState([
    {
      id: "PAY-1001",
      employee: "Dr. Moyo",
      salary: "$2,500",
      overtime: "$120",
      deductions: "$200",
      netPay: "$2,420",
      status: "Processed",
    },
    {
      id: "PAY-1002",
      employee: "Nurse Chipo",
      salary: "$1,200",
      overtime: "$80",
      deductions: "$100",
      netPay: "$1,180",
      status: "Pending",
    },
  ]);

  const [formData, setFormData] = useState({
    employeeName: "",
    salary: "",
    overtime: "",
    deductions: "",
    leaveIntegration: "",
    payslipGeneration: "",
    pensionManagement: "",
  });

  const modules = [
    {
      title: "Salary Processing",
      icon: Banknote,
      desc: "Process monthly staff salaries.",
    },
    {
      title: "Overtime Calculation",
      icon: Clock3,
      desc: "Compute overtime payments.",
    },
    {
      title: "Deductions",
      icon: MinusCircle,
      desc: "Tax, loans and deductions.",
    },
    {
      title: "Leave Integration",
      icon: CalendarDays,
      desc: "Integrate approved leave.",
    },
    {
      title: "Payslip Generation",
      icon: FileText,
      desc: "Generate employee payslips.",
    },
    {
      title: "Pension Management",
      icon: PiggyBank,
      desc: "Manage pension contributions.",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateNet = () => {
    const salary = Number(formData.salary || 0);
    const overtime = Number(formData.overtime || 0);
    const deductions = Number(formData.deductions || 0);
    return salary + overtime - deductions;
  };

  const handleSave = () => {
    if (!formData.employeeName || !formData.salary) return;

    const newPayroll = {
      id: `PAY-${Math.floor(Math.random() * 9000 + 1000)}`,
      employee: formData.employeeName,
      salary: `$${formData.salary}`,
      overtime: `$${formData.overtime || 0}`,
      deductions: `$${formData.deductions || 0}`,
      netPay: `$${calculateNet()}`,
      status: "Processed",
    };

    setPayrolls([newPayroll, ...payrolls]);
    setOpenModal(false);

    setFormData({
      employeeName: "",
      salary: "",
      overtime: "",
      deductions: "",
      leaveIntegration: "",
      payslipGeneration: "",
      pensionManagement: "",
    });
  };

  const filtered = payrolls.filter((p) =>
    p.employee.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER (MATCH YOUR ERP STYLE) */}
      <header className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white shadow-2xl">
        <div className="px-8 py-6 flex flex-col lg:flex-row lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Payroll Management
            </h1>
            <p className="text-slate-300 mt-1">
              Salary processing • Payslips • Pension • Deductions
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2"
          >
            <UserPlus size={20} />
            New Payroll
          </button>
        </div>
      </header>

      {/* MODAL (MATCH DESIGN SYSTEM) */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden">

            {/* MODAL HEADER */}
            <div className="flex justify-between items-center px-8 py-5 border-b bg-slate-50">
              <div>
                <h2 className="text-2xl font-bold">
                  Payroll Entry
                </h2>
                <p className="text-slate-500">
                  Process salary & deductions
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="p-2 rounded-xl hover:bg-red-100"
              >
                <X />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

              <input
                name="employeeName"
                placeholder="Employee Name"
                className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm"
                onChange={handleInputChange}
              />

              <input
                name="salary"
                placeholder="Salary"
                type="number"
                className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm"
                onChange={handleInputChange}
              />

              <input
                name="overtime"
                placeholder="Overtime"
                type="number"
                className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm"
                onChange={handleInputChange}
              />

              <input
                name="deductions"
                placeholder="Deductions"
                type="number"
                className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm"
                onChange={handleInputChange}
              />

              <input
                name="leaveIntegration"
                placeholder="Leave Integration"
                className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm"
                onChange={handleInputChange}
              />

              <input
                name="pensionManagement"
                placeholder="Pension Management"
                className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm"
                onChange={handleInputChange}
              />

              <input
                name="payslipGeneration"
                placeholder="Payslip Reference"
                className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm md:col-span-2"
                onChange={handleInputChange}
              />
            </div>

            {/* FOOTER */}
            <div className="px-8 py-5 border-t bg-slate-50 flex justify-end gap-4">
              <button
                onClick={() => setOpenModal(false)}
                className="px-6 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 shadow"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center gap-2"
              >
                <Save size={18} />
                Save Payroll
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="p-6 md:p-8">

        {/* SEARCH (MATCH DESIGN) */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                Search Payroll
              </h2>
              <p className="text-slate-500">
                Find employee payroll records
              </p>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employee..."
              className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm w-full lg:w-[400px]"
            />
          </div>
        </div>

        {/* STATS (MATCH YOUR ERP CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <Users className="text-blue-600" />
            <h2 className="text-2xl font-bold mt-2">
              {payrolls.length}
            </h2>
            <p className="text-slate-500">Payroll Records</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <Banknote className="text-green-600" />
            <h2 className="text-2xl font-bold mt-2">$12,400</h2>
            <p className="text-slate-500">Total Salary</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <Clock3 className="text-amber-600" />
            <h2 className="text-2xl font-bold mt-2">$860</h2>
            <p className="text-slate-500">Overtime</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <ReceiptText className="text-purple-600" />
            <h2 className="text-2xl font-bold mt-2">38</h2>
            <p className="text-slate-500">Payslips</p>
          </div>

        </div>

        {/* MODULES (MATCH CARD STYLE) */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-5">
            Payroll Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {modules.map((m, i) => {
              const Icon = m.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6"
                >
                  <Icon className="text-blue-600" />
                  <h3 className="font-semibold mt-4">{m.title}</h3>
                  <p className="text-slate-500 mt-2">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* TABLE (MATCH STYLE) */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">
              Payroll Records
            </h2>
          </div>

          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left">Employee</th>
                <th className="px-6 py-4 text-left">Salary</th>
                <th className="px-6 py-4 text-left">Overtime</th>
                <th className="px-6 py-4 text-left">Deductions</th>
                <th className="px-6 py-4 text-left">Net Pay</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p, i) => (
                <tr key={i} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-5">{p.employee}</td>
                  <td className="px-6 py-5">{p.salary}</td>
                  <td className="px-6 py-5">{p.overtime}</td>
                  <td className="px-6 py-5">{p.deductions}</td>
                  <td className="px-6 py-5 font-semibold">{p.netPay}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      p.status === "Processed"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </main>
    </div>
  );
}