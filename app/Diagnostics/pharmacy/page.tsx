"use client";

import { useState } from "react";
import {
  Pill,
  PackageSearch,
  UserPlus,
  Search,
  Save,
  X,
  ClipboardList,
  Boxes,
  AlertTriangle,
  Truck,
  Barcode,
  ShieldCheck,
  Receipt,
  RefreshCcw,
} from "lucide-react";

export default function PharmacyPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [prescriptions, setPrescriptions] = useState([
    {
      id: "RX-3001",
      patient: "Farai Chikara",
      medicine: "Amoxicillin 500mg",
      quantity: "21",
      prescriber: "Dr. Chikafu",
      status: "Dispensed",
      stock: "In Stock",
    },
    {
      id: "RX-3002",
      patient: "Nyasha Muponda",
      medicine: "Metformin 850mg",
      quantity: "60",
      prescriber: "Dr. Mavhunga",
      status: "Pending",
      stock: "Low Stock",
    },
  ]);

  const [formData, setFormData] = useState({
    patientName: "",
    medicineName: "",
    dosage: "",
    quantity: "",
    prescriber: "",
    batchNumber: "",
    expiryDate: "",
    supplier: "",
    instructions: "",
    substitutionAllowed: "",
  });

  const modules = [
    {
      title: "Prescription Dispensing",
      icon: Pill,
      desc: "Verify and dispense prescribed medications.",
    },
    {
      title: "Inventory Management",
      icon: Boxes,
      desc: "Track stock levels across the pharmacy store.",
    },
    {
      title: "Stock Alerts",
      icon: AlertTriangle,
      desc: "Monitor low stock and expiring medications.",
    },
    {
      title: "Supplier Orders",
      icon: Truck,
      desc: "Manage purchase orders and supplier deliveries.",
    },
    {
      title: "Drug Lookup",
      icon: PackageSearch,
      desc: "Search formulary details and interactions.",
    },
    {
      title: "Barcode Scanning",
      icon: Barcode,
      desc: "Scan medication packaging for fast dispensing.",
    },
    {
      title: "Batch & Expiry Tracking",
      icon: ShieldCheck,
      desc: "Track batch numbers and expiry compliance.",
    },
    {
      title: "Pharmacy Billing",
      icon: Receipt,
      desc: "Generate invoices for dispensed medication.",
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

  const handleSavePrescription = () => {
    if (
      !formData.patientName ||
      !formData.medicineName ||
      !formData.quantity
    ) {
      alert("Please complete required fields");
      return;
    }

    const newPrescription = {
      id: `RX-${Math.floor(Math.random() * 9000 + 1000)}`,
      patient: formData.patientName,
      medicine: `${formData.medicineName}${
        formData.dosage ? ` ${formData.dosage}` : ""
      }`,
      quantity: formData.quantity,
      prescriber: formData.prescriber || "Unassigned",
      status: "Pending",
      stock: "In Stock",
    };

    setPrescriptions([newPrescription, ...prescriptions]);

    setFormData({
      patientName: "",
      medicineName: "",
      dosage: "",
      quantity: "",
      prescriber: "",
      batchNumber: "",
      expiryDate: "",
      supplier: "",
      instructions: "",
      substitutionAllowed: "",
    });

    setOpenModal(false);
  };

  const filteredPrescriptions = prescriptions.filter((rx) =>
    rx.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-emerald-900 via-teal-800 to-slate-900 text-white shadow-2xl">
        <div className="px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Pharmacy Dashboard
            </h1>

            <p className="text-slate-300 mt-1">
              Prescriptions, inventory & dispensing management
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 transition px-5 py-3 rounded-2xl font-medium shadow-lg flex items-center gap-2"
          >
            <UserPlus size={20} />
            New Prescription
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
                  Prescription Entry
                </h2>

                <p className="text-slate-500 mt-1">
                  Create prescriptions and dispense medication
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

                {/* MEDICINE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Medicine Name *
                  </label>

                  <input
                    type="text"
                    name="medicineName"
                    value={formData.medicineName}
                    onChange={handleInputChange}
                    placeholder="e.g. Amoxicillin"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* DOSAGE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Dosage / Strength
                  </label>

                  <input
                    type="text"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleInputChange}
                    placeholder="e.g. 500mg"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* QUANTITY */}
                <div>
                  <label className="block mb-2 font-medium">
                    Quantity *
                  </label>

                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Enter quantity"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* PRESCRIBER */}
                <div>
                  <label className="block mb-2 font-medium">
                    Prescribing Doctor
                  </label>

                  <input
                    type="text"
                    name="prescriber"
                    value={formData.prescriber}
                    onChange={handleInputChange}
                    placeholder="Enter prescriber name"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* BATCH NUMBER */}
                <div>
                  <label className="block mb-2 font-medium">
                    Batch Number
                  </label>

                  <input
                    type="text"
                    name="batchNumber"
                    value={formData.batchNumber}
                    onChange={handleInputChange}
                    placeholder="Enter batch number"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* EXPIRY DATE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Expiry Date
                  </label>

                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* SUPPLIER */}
                <div>
                  <label className="block mb-2 font-medium">
                    Supplier
                  </label>

                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    placeholder="Enter supplier name"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* SUBSTITUTION */}
                <div>
                  <label className="block mb-2 font-medium">
                    Generic Substitution Allowed
                  </label>

                  <select
                    name="substitutionAllowed"
                    value={formData.substitutionAllowed}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* INSTRUCTIONS */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Dosage Instructions
                  </label>

                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    placeholder="e.g. Take one tablet twice daily after meals"
                    rows={3}
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
                onClick={handleSavePrescription}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 shadow-lg"
              >
                <Save size={18} />
                Save Prescription
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
                Search Prescriptions
              </h2>

              <p className="text-slate-500 mt-1">
                Search by patient name across all prescriptions
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
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-500"
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
                  Total Prescriptions
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {prescriptions.length}
                </h2>
              </div>

              <div className="bg-emerald-100 text-emerald-700 p-4 rounded-2xl">
                <ClipboardList size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Medicines in Stock
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  1,284
                </h2>
              </div>

              <div className="bg-teal-100 text-teal-700 p-4 rounded-2xl">
                <Boxes size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Low Stock Items
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  9
                </h2>
              </div>

              <div className="bg-amber-100 text-amber-700 p-4 rounded-2xl">
                <AlertTriangle size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Pending Orders
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  5
                </h2>
              </div>

              <div className="bg-purple-100 text-purple-700 p-4 rounded-2xl">
                <RefreshCcw size={30} />
              </div>
            </div>
          </div>
        </div>

        {/* MODULES */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Pharmacy Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition"
                >
                  <div className="bg-emerald-100 text-emerald-700 p-4 rounded-2xl w-fit">
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
              Prescription Records
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-600">
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Medicine</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Prescriber</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredPrescriptions.map((rx, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 font-medium">
                      {rx.patient}
                    </td>

                    <td className="px-6 py-5">
                      {rx.medicine}
                    </td>

                    <td className="px-6 py-5">
                      {rx.quantity}
                    </td>

                    <td className="px-6 py-5">
                      {rx.prescriber}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          rx.stock === "In Stock"
                            ? "bg-green-100 text-green-700"
                            : rx.stock === "Low Stock"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {rx.stock}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          rx.status === "Dispensed"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {rx.status}
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
