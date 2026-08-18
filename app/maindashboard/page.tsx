"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  CalendarDays,
  DollarSign,
  Bed,
  Pill,
  FlaskConical,
  Stethoscope,
  FileText,
  Search,
  UserPlus,
  X,
  FileCheck,
  Wallet,
  Building2,
  Briefcase,
  Cpu,
  Menu,
  ChevronLeft,
  Activity,
} from "lucide-react";

const sidebarModules = [
  {
    group: "Clinical",
    icon: Stethoscope,
    items: [
      { label: "Patient Management", path: "/Clinical/patientmanagement" },
      { label: "OPD", path: "/Clinical/opd" },
      { label: "IPD", path: "/Clinical/ipd" },
      { label: "Emergency", path: "/Clinical/emergency" },
      { label: "Doctor Management", path: "/Clinical/doctormanagement" },
      { label: "Nursing / Treatment", path: "/Clinical/nursingmanagement" },
      { label: "Appointments", path: "/Clinical/appointments" },
      { label: "EMR/EHR", path: "/Clinical/emr" },
    ],
  },
  {
    group: "Finance",
    icon: Wallet,
    items: [
      { label: "Billing", path: "/Finance/billing" },
      { label: "Insurance Medical Aid", path: "/Finance/medicalaid" },
      { label: "Accounts", path: "/Finance/accounts" },
      { label: "Payroll", path: "/Finance/payroll" },
    ],
  },
  {
    group: "Diagnostics",
    icon: FlaskConical,
    items: [
      { label: "Laboratory", path: "/Diagnostics/laboratory" },
      { label: "Radiology", path: "/Diagnostics/radiology" },
      { label: "Pharmacy", path: "/Diagnostics/pharmacy" },
      { label: "Blood Bank", path: "/Diagnostics/blood-bank" },
    ],
  },
  {
    group: "Operations",
    icon: Building2,
    items: [
      { label: "Bed Management", path: "/Operations/bed-management" },
      { label: "Theatre", path: "/Operations/theatre" },
      { label: "ICU", path: "/Operations/icu" },
      { label: "Ambulance", path: "/Operations/ambulance" },
      { label: "Infection Control", path: "/Operations/infection-control" },
    ],
  },
  {
    group: "Admin",
    icon: Briefcase,
    items: [
      { label: "HR", path: "/Admin/hr" },
      { label: "Attendance", path: "/Admin/attendance" },
      { label: "Procurement", path: "/Admin/procurement" },
      { label: "Inventory", path: "/Admin/inventory" },
      { label: "Assets", path: "/Admin/assets" },
      { label: "Administration", path: "/Admin/administration" },
    ],
  },
  {
    group: "Tech",
    icon: Cpu,
    items: [
      { label: "Reports", path: "/Tech/reports" },
      { label: "BI Dashboard", path: "/Tech/bi-dashboard" },
      { label: "Notifications", path: "/Tech/notifications" },
      { label: "Patient Portal", path: "/Tech/patient-portal" },
      { label: "Telemedicine", path: "/Tech/telemedicine" },
      { label: "API Integration", path: "/Tech/api-integration" },
      { label: "Security", path: "/Tech/security" },
      { label: "Compliance", path: "/Tech/compliance" },
      { label: "Backup", path: "/Tech/backup" },
    ],
  },
  {
    group: "Advanced",
    icon: Activity,
    items: [
      { label: "User Management", path: "/Advanced/user-management" },
      { label: "Multi-Branch", path: "/Advanced/multi-branch" },
      { label: "CRM", path: "/Advanced/crm" },
      { label: "Helpdesk", path: "/Advanced/helpdesk" },
      { label: "Training", path: "/Advanced/training" },
      { label: "AI Features", path: "/Advanced/ai-features" },
    ],
  },
];

// Signature element: a faint ECG/pulse trace that draws itself in behind the
// header on load — the one visual flourish, tied directly to the subject.
function PulseTrace() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full opacity-[0.18]"
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M0,40 L280,40 L310,10 L335,70 L360,40 L420,40 L445,25 L465,40 L1200,40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function HospitalERPDashboard() {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const flatItems = useMemo(() => {
    return sidebarModules.flatMap((section) =>
      section.items.map((it) => ({
        group: section.group,
        label: it.label,
        path: it.path,
      }))
    );
  }, []);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return flatItems;
    return flatItems.filter((x) => x.label.toLowerCase().includes(q));
  }, [flatItems, search]);

  const selectedLabel = useMemo(() => {
    const match = flatItems.find((x) => x.path === pathname);
    return match?.label ?? "Dashboard";
  }, [flatItems, pathname]);

  const cards = [
    { label: "Patients", value: "1,240", icon: Users, tone: "teal" },
    { label: "Doctors", value: "85", icon: Stethoscope, tone: "navy" },
    { label: "Admissions", value: "320", icon: Bed, tone: "amber" },
    { label: "Revenue", value: "$45K", icon: DollarSign, tone: "teal" },
    { label: "Lab Tests", value: "560", icon: FlaskConical, tone: "navy" },
    { label: "Pharmacy", value: "980", icon: Pill, tone: "teal" },
    { label: "Appointments", value: "430", icon: CalendarDays, tone: "amber" },
    { label: "Reports", value: "210", icon: FileText, tone: "navy" },
  ];

  const toneClasses = {
    teal: "bg-teal-50 text-teal-700",
    navy: "bg-slate-100 text-slate-700",
    amber: "bg-amber-50 text-amber-700",
  };

  const isDashboard = selectedLabel === "Dashboard";

  const rows = [
    {
      patient: "John Dube",
      category: isDashboard ? "OPD" : selectedLabel,
      amount: "$45",
      invoice: "INV-1001",
      receipt: "RCT-1001",
      payment: "Paid",
    },
    {
      patient: "Sarah Ncube",
      category: isDashboard ? "Pharmacy" : selectedLabel,
      amount: "$85",
      invoice: "INV-1002",
      receipt: "RCT-1002",
      payment: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F5F1] text-slate-800">
      {/* HEADER */}
      <header className="relative overflow-hidden bg-[#0F2A3B] text-white shadow-md">
        <div className="relative z-10 px-6 py-6 md:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label={sidebarOpen ? "Collapse navigation" : "Expand navigation"}
              className="p-2 rounded-lg hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
            >
              {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Nexus Healthcare Erp System
              </h1>
              <p className="text-slate-300 text-sm mt-0.5">
                
              </p>
            </div>
          </div>

          
        </div>

        <PulseTrace />
      </header>

      {/* MODAL */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4"
            onClick={() => setOpenModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center px-7 py-5 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    New record
                  </h2>
                  <p className="text-slate-500 text-sm mt-0.5">
                    Added to {selectedLabel}
                  </p>
                </div>
                <button
                  onClick={() => setOpenModal(false)}
                  aria-label="Close"
                  className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-7 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">
                      Patient / subject *
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                      placeholder="Enter name"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">
                      Module
                    </label>
                    <input
                      type="text"
                      value={selectedLabel}
                      readOnly
                      className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 bg-slate-100 text-slate-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">
                      Amount
                    </label>
                    <input
                      type="number"
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">
                      Reference
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                      placeholder="INV- / RCT- / ID"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">
                      Notes
                    </label>
                    <textarea
                      rows={3}
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                      placeholder="Add brief notes"
                    />
                  </div>
                </div>
              </div>

              <div className="px-7 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                <button
                  onClick={() => setOpenModal(false)}
                  className="px-5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setOpenModal(false)}
                  className="px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-2 shadow-sm transition"
                >
                  <FileCheck size={16} />
                  Save record
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BODY */}
      <div className="flex min-h-[calc(100vh-88px)]">
        {/* SIDEBAR */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 272 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="shrink-0 bg-white border-r border-slate-200 overflow-hidden"
        >
          <nav className="w-[272px] h-full overflow-y-auto py-4">
            <Link
              href="/"
              className={`mx-3 mb-2 flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isDashboard
                  ? "bg-teal-50 text-teal-800"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Activity size={17} />
              Dashboard
            </Link>

            {sidebarModules.map((section) => {
              const GroupIcon = section.icon;
              return (
                <div key={section.group} className="mt-4 first:mt-0">
                  <div className="flex items-center gap-2 px-4 mb-1.5">
                    <GroupIcon size={13} className="text-slate-400" />
                    <h2 className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                      {section.group}
                    </h2>
                  </div>

                  {section.items.map((it) => {
                    const isActive = pathname === it.path;
                    return (
                      <Link
                        key={it.path}
                        href={it.path}
                        className={`mx-3 flex items-center px-3 py-2 rounded-lg text-sm transition ${
                          isActive
                            ? "bg-teal-50 text-teal-800 font-medium"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {it.label}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </motion.aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-2xl font-semibold tracking-tight text-slate-800">
              {selectedLabel}
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              {isDashboard
                ? "Today's snapshot across every department"
                : `Records and activity for ${selectedLabel.toLowerCase()}`}
            </p>
          </motion.div>

          {/* Search card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-7">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={17}
                />
                <input
                  type="text"
                  placeholder="Search across every module…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
              </div>
            </div>

            {search.trim().length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {filteredItems.slice(0, 10).map((m) => (
                  <Link
                    key={m.path}
                    href={m.path}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition text-sm text-slate-700"
                  >
                    {m.label}
                    <span className="text-slate-400 ml-1.5 text-xs">
                      {m.group}
                    </span>
                  </Link>
                ))}
                {filteredItems.length === 0 && (
                  <div className="text-sm text-slate-500 py-1">
                    No modules match "{search}".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* DASHBOARD CARDS */}
          {isDashboard && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-slate-500 text-sm">{card.label}</p>
                        <h2 className="text-2xl font-semibold mt-1.5 tracking-tight">
                          {card.value}
                        </h2>
                      </div>
                      <div className={`p-2.5 rounded-xl ${toneClasses[card.tone]}`}>
                        <Icon size={20} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* MODULE VIEW */}
          {!isDashboard && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-1">
                {selectedLabel}
              </h2>
              <p className="text-slate-500 text-sm mb-5">
                Everything related to {selectedLabel.toLowerCase()} lives here.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Create / add", desc: "Add new records" },
                  { title: "View records", desc: "Manage existing data" },
                  { title: "Reports", desc: "Generate analytics" },
                  { title: "Settings", desc: "Configure this module" },
                ].map((item) => (
                  <button
                    key={item.title}
                    className="text-left p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/40 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                  >
                    <div className="font-medium text-slate-800 flex items-center gap-2 text-sm">
                      <FileCheck size={15} className="text-teal-700" />
                      {item.title}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TABLE-LIKE SNAPSHOT */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">
                Billing & activity
              </h2>
              <p className="text-slate-500 text-sm mt-0.5">
                Most recent entries — replace with live module data
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-100">
                    <th className="px-6 py-3 font-medium">Patient</th>
                    <th className="px-6 py-3 font-medium">Category</th>
                    <th className="px-6 py-3 font-medium">Amount</th>
                    <th className="px-6 py-3 font-medium">Invoice</th>
                    <th className="px-6 py-3 font-medium">Receipt</th>
                    <th className="px-6 py-3 font-medium">Payment</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((billing, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition"
                    >
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {billing.patient}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {billing.category}
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-700">
                        {billing.amount}
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-500">
                        {billing.invoice}
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-500">
                        {billing.receipt}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            billing.payment === "Paid"
                              ? "bg-teal-50 text-teal-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {billing.payment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="h-6" />
        </main>
      </div>
    </div>
  );
}
