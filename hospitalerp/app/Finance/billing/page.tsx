"use client";

import { useState } from "react";
import {
  Receipt,
  DollarSign,
  Pill,
  FlaskConical,
  FileText,
  CreditCard,
  Wallet,
  UserPlus,
  Search,
  Save,
  X,
  ClipboardList,
  Building2,
  BadgeDollarSign,
  Banknote,
} from "lucide-react";

export default function BillingInvoicingPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [billings, setBillings] = useState([
    {
      id: "BILL-1001",
      patient: "John Dube",
      category: "OPD Billing",
      amount: "$45",
      payment: "Paid",
      invoice: "INV-1001",
      receipt: "RCT-1001",
    },
    {
      id: "BILL-1002",
      patient: "Sarah Ncube",
      category: "Pharmacy Billing",
      amount: "$85",
      payment: "Pending",
      invoice: "INV-1002",
      receipt: "RCT-1002",
    },
  ]);

  const [formData, setFormData] = useState({
    patientName: "",
    billingCategory: "",
    amount: "",
    opdBilling: "",
    ipdBilling: "",
    consultationBilling: "",
    pharmacyBilling: "",
    labBilling: "",
    insuranceBilling: "",
    invoiceGeneration: "",
    paymentReceipts: "",
  });

  const modules = [
    {
      title: "OPD Billing",
      icon: ClipboardList,
      desc: "Manage outpatient billing transactions.",
    },
    {
      title: "IPD Billing",
      icon: Building2,
      desc: "Handle inpatient admission and ward billing.",
    },
    {
      title: "Consultation Billing",
      icon: DollarSign,
      desc: "Track doctor consultation charges.",
    },
    {
      title: "Pharmacy Billing",
      icon: Pill,
      desc: "Generate pharmacy invoices and receipts.",
    },
    {
      title: "Lab Billing",
      icon: FlaskConical,
      desc: "Manage laboratory service billing.",
    },
    {
      title: "Insurance Billing",
      icon: BadgeDollarSign,
      desc: "Process medical aid and insurance claims.",
    },
    {
      title: "Invoice Generation",
      icon: FileText,
      desc: "Automatically generate billing invoices.",
    },
    {
      title: "Payment Receipts",
      icon: Receipt,
      desc: "Issue digital and printed receipts.",
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

  const handleSaveBilling = () => {
    if (
      !formData.patientName ||
      !formData.billingCategory ||
      !formData.amount
    ) {
      alert("Please complete required fields");
      return;
    }

    const newBilling = {
      id: `BILL-${Math.floor(
        Math.random() * 9000 + 1000
      )}`,
      patient: formData.patientName,
      category: formData.billingCategory,
      amount: `$${formData.amount}`,
      payment: "Pending",
      invoice: `INV-${Math.floor(
        Math.random() * 9000 + 1000
      )}`,
      receipt: `RCT-${Math.floor(
        Math.random() * 9000 + 1000
      )}`,
    };

    setBillings([newBilling, ...billings]);

    setFormData({
      patientName: "",
      billingCategory: "",
      amount: "",
      opdBilling: "",
      ipdBilling: "",
      consultationBilling: "",
      pharmacyBilling: "",
      labBilling: "",
      insuranceBilling: "",
      invoiceGeneration: "",
      paymentReceipts: "",
    });

    setOpenModal(false);
  };

  const filteredBillings = billings.filter((billing) =>
    billing.patient
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-cyan-900 via-sky-800 to-slate-900 text-white shadow-2xl">
        <div className="px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Billing & Invoicing Dashboard
            </h1>

            <p className="text-slate-300 mt-1">
              Hospital billing, invoicing & payment management
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-cyan-600 hover:bg-cyan-700 transition px-5 py-3 rounded-2xl font-medium shadow-lg flex items-center gap-2"
          >
            <UserPlus size={20} />
            New Billing Entry
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
                  Billing & Invoice Entry
                </h2>

                <p className="text-slate-500 mt-1">
                  Create billing records and invoices
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
                {/* PATIENT */}
                <div>
                  <label className="block mb-2 font-medium">
                    Patient Name *
                  </label>

                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    placeholder="Enter patient name"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="block mb-2 font-medium">
                    Billing Category *
                  </label>

                  <select
                    name="billingCategory"
                    value={formData.billingCategory}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">
                      Select Billing Type
                    </option>

                    <option value="OPD Billing">
                      OPD Billing
                    </option>

                    <option value="IPD Billing">
                      IPD Billing
                    </option>

                    <option value="Consultation Billing">
                      Consultation Billing
                    </option>

                    <option value="Pharmacy Billing">
                      Pharmacy Billing
                    </option>

                    <option value="Lab Billing">
                      Lab Billing
                    </option>

                    <option value="Insurance Billing">
                      Insurance Billing
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

                {/* OPD BILLING */}
                <div>
                  <label className="block mb-2 font-medium">
                    OPD Billing
                  </label>

                  <input
                    type="text"
                    name="opdBilling"
                    value={formData.opdBilling}
                    onChange={handleInputChange}
                    placeholder="OPD billing details"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* IPD BILLING */}
                <div>
                  <label className="block mb-2 font-medium">
                    IPD Billing
                  </label>

                  <input
                    type="text"
                    name="ipdBilling"
                    value={formData.ipdBilling}
                    onChange={handleInputChange}
                    placeholder="IPD billing details"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* CONSULTATION */}
                <div>
                  <label className="block mb-2 font-medium">
                    Consultation Billing
                  </label>

                  <input
                    type="text"
                    name="consultationBilling"
                    value={formData.consultationBilling}
                    onChange={handleInputChange}
                    placeholder="Consultation charges"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* PHARMACY */}
                <div>
                  <label className="block mb-2 font-medium">
                    Pharmacy Billing
                  </label>

                  <input
                    type="text"
                    name="pharmacyBilling"
                    value={formData.pharmacyBilling}
                    onChange={handleInputChange}
                    placeholder="Medication charges"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* LAB */}
                <div>
                  <label className="block mb-2 font-medium">
                    Lab Billing
                  </label>

                  <input
                    type="text"
                    name="labBilling"
                    value={formData.labBilling}
                    onChange={handleInputChange}
                    placeholder="Lab charges"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* INSURANCE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Insurance Billing
                  </label>

                  <input
                    type="text"
                    name="insuranceBilling"
                    value={formData.insuranceBilling}
                    onChange={handleInputChange}
                    placeholder="Insurance claim details"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* INVOICE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Invoice Generation
                  </label>

                  <input
                    type="text"
                    name="invoiceGeneration"
                    value={formData.invoiceGeneration}
                    onChange={handleInputChange}
                    placeholder="Invoice details"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* RECEIPT */}
                <div>
                  <label className="block mb-2 font-medium">
                    Payment Receipts
                  </label>

                  <input
                    type="text"
                    name="paymentReceipts"
                    value={formData.paymentReceipts}
                    onChange={handleInputChange}
                    placeholder="Receipt details"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
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
                onClick={handleSaveBilling}
                className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2 shadow-lg"
              >
                <Save size={18} />
                Save Billing
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
                Search Billing Records
              </h2>

              <p className="text-slate-500 mt-1">
                Search invoices, receipts and patient bills
              </p>
            </div>

            <div className="relative w-full lg:w-[400px]">
              <Search
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-cyan-500"
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
                  Total Invoices
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {billings.length}
                </h2>
              </div>

              <div className="bg-cyan-100 text-cyan-700 p-4 rounded-2xl">
                <FileText size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Payments Received
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  $18,540
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
                  Insurance Claims
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  42
                </h2>
              </div>

              <div className="bg-amber-100 text-amber-700 p-4 rounded-2xl">
                <BadgeDollarSign size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Receipts Issued
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  215
                </h2>
              </div>

              <div className="bg-purple-100 text-purple-700 p-4 rounded-2xl">
                <Banknote size={30} />
              </div>
            </div>
          </div>
        </div>

        {/* MODULES */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Billing Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition"
                >
                  <div className="bg-cyan-100 text-cyan-700 p-4 rounded-2xl w-fit">
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
              Billing Transactions
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-600">
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Invoice</th>
                  <th className="px-6 py-4">Receipt</th>
                  <th className="px-6 py-4">Payment</th>
                </tr>
              </thead>

              <tbody>
                {filteredBillings.map((billing, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 font-medium">
                      {billing.patient}
                    </td>

                    <td className="px-6 py-5">
                      {billing.category}
                    </td>

                    <td className="px-6 py-5">
                      {billing.amount}
                    </td>

                    <td className="px-6 py-5">
                      {billing.invoice}
                    </td>

                    <td className="px-6 py-5">
                      {billing.receipt}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          billing.payment === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
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
      </main>
    </div>
  );
}