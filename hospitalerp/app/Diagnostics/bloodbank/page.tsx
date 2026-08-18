"use client";

import { useState } from "react";
import {
  Droplet,
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

export default function BloodBankPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [donations, setDonations] = useState([
    {
      id: "BB-3001",
      donor: "Farai Chikara",
      bloodGroup: "O+",
      units: "1",
      collectionSite: "Harare Central",
      status: "Screened",
      stock: "In Stock",
    },
    {
      id: "BB-3002",
      donor: "Nyasha Muponda",
      bloodGroup: "A-",
      units: "2",
      collectionSite: "Mbare Clinic",
      status: "Pending",
      stock: "Low Stock",
    },
  ]);

  const [formData, setFormData] = useState({
    donorName: "",
    bloodGroup: "",
    units: "",
    collectionSite: "",
    batchNumber: "",
    expiryDate: "",
    supplier: "",
    notes: "",
    crossMatchRequired: "",
  });

  const modules = [
    {
      title: "Donation Collection",
      icon: Droplet,
      desc: "Register and screen new blood donations.",
    },
    {
      title: "Inventory Management",
      icon: Boxes,
      desc: "Track blood unit stock levels by group.",
    },
    {
      title: "Stock Alerts",
      icon: AlertTriangle,
      desc: "Monitor low stock and expiring blood units.",
    },
    {
      title: "Supplier Orders",
      icon: Truck,
      desc: "Manage inter-facility transfers and deliveries.",
    },
    {
      title: "Donor Lookup",
      icon: PackageSearch,
      desc: "Search donor history and eligibility records.",
    },
    {
      title: "Barcode Scanning",
      icon: Barcode,
      desc: "Scan blood bag labels for fast issuing.",
    },
    {
      title: "Batch & Expiry Tracking",
      icon: ShieldCheck,
      desc: "Track batch numbers and shelf-life compliance.",
    },
    {
      title: "Blood Bank Billing",
      icon: Receipt,
      desc: "Generate invoices for issued blood units.",
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

  const handleSaveDonation = () => {
    if (
      !formData.donorName ||
      !formData.bloodGroup ||
      !formData.units
    ) {
      alert("Please complete required fields");
      return;
    }

    const newDonation = {
      id: `BB-${Math.floor(Math.random() * 9000 + 1000)}`,
      donor: formData.donorName,
      bloodGroup: formData.bloodGroup,
      units: formData.units,
      collectionSite: formData.collectionSite || "Unassigned",
      status: "Pending",
      stock: "In Stock",
    };

    setDonations([newDonation, ...donations]);

    setFormData({
      donorName: "",
      bloodGroup: "",
      units: "",
      collectionSite: "",
      batchNumber: "",
      expiryDate: "",
      supplier: "",
      notes: "",
      crossMatchRequired: "",
    });

    setOpenModal(false);
  };

  const filteredDonations = donations.filter((bb) =>
    bb.donor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-rose-900 via-red-800 to-slate-900 text-white shadow-2xl">
        <div className="px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Blood Bank Dashboard
            </h1>

            <p className="text-slate-300 mt-1">
              Donations, inventory & issuing management
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-rose-600 hover:bg-rose-700 transition px-5 py-3 rounded-2xl font-medium shadow-lg flex items-center gap-2"
          >
            <UserPlus size={20} />
            New Donation
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
                  Donation Entry
                </h2>

                <p className="text-slate-500 mt-1">
                  Register donations and manage blood units
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
                {/* DONOR */}
                <div>
                  <label className="block mb-2 font-medium">
                    Donor Name *
                  </label>

                  <input
                    type="text"
                    name="donorName"
                    value={formData.donorName}
                    onChange={handleInputChange}
                    placeholder="Enter donor name"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* BLOOD GROUP */}
                <div>
                  <label className="block mb-2 font-medium">
                    Blood Group *
                  </label>

                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">Select group</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                {/* UNITS */}
                <div>
                  <label className="block mb-2 font-medium">
                    Units *
                  </label>

                  <input
                    type="number"
                    name="units"
                    value={formData.units}
                    onChange={handleInputChange}
                    placeholder="Enter number of units"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* COLLECTION SITE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Collection Site
                  </label>

                  <input
                    type="text"
                    name="collectionSite"
                    value={formData.collectionSite}
                    onChange={handleInputChange}
                    placeholder="Enter collection site"
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
                    Source Facility
                  </label>

                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    placeholder="Enter source facility name"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* CROSS MATCH */}
                <div>
                  <label className="block mb-2 font-medium">
                    Cross-Match Required
                  </label>

                  <select
                    name="crossMatchRequired"
                    value={formData.crossMatchRequired}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* NOTES */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Screening Notes
                  </label>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. Passed infectious disease screening"
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
                onClick={handleSaveDonation}
                className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2 shadow-lg"
              >
                <Save size={18} />
                Save Donation
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
                Search Donations
              </h2>

              <p className="text-slate-500 mt-1">
                Search by donor name across all donations
              </p>
            </div>

            <div className="relative w-full lg:w-[400px]">
              <Search
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search donor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-rose-500"
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
                  Total Donations
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {donations.length}
                </h2>
              </div>

              <div className="bg-rose-100 text-rose-700 p-4 rounded-2xl">
                <ClipboardList size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Units in Stock
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  842
                </h2>
              </div>

              <div className="bg-red-100 text-red-700 p-4 rounded-2xl">
                <Boxes size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Low Stock Groups
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  4
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
                  Pending Transfers
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  3
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
            Blood Bank Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition"
                >
                  <div className="bg-rose-100 text-rose-700 p-4 rounded-2xl w-fit">
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
              Donation Records
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-600">
                  <th className="px-6 py-4">Donor</th>
                  <th className="px-6 py-4">Blood Group</th>
                  <th className="px-6 py-4">Units</th>
                  <th className="px-6 py-4">Collection Site</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredDonations.map((bb, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 font-medium">
                      {bb.donor}
                    </td>

                    <td className="px-6 py-5">
                      {bb.bloodGroup}
                    </td>

                    <td className="px-6 py-5">
                      {bb.units}
                    </td>

                    <td className="px-6 py-5">
                      {bb.collectionSite}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          bb.stock === "In Stock"
                            ? "bg-green-100 text-green-700"
                            : bb.stock === "Low Stock"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {bb.stock}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          bb.status === "Screened"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {bb.status}
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
