"use client";

import { useState } from "react";
import {
  Boxes,
  Package,
  Truck,
  Bell,
  Archive,
  Activity,
  Plus,
  Search,
  Save,
  X,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

export default function InventoryStoresPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [items, setItems] = useState([
    {
      id: "STK-1001",
      name: "Surgical Gloves",
      category: "Consumables",
      quantity: 120,
      location: "Main Store",
      status: "OK",
    },
    {
      id: "STK-1002",
      name: "Paracetamol",
      category: "Medicine",
      quantity: 18,
      location: "Pharmacy",
      status: "Low Stock",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    location: "",
  });

  const modules = [
    {
      title: "Stock Management",
      icon: Boxes,
      desc: "Track hospital stock levels in real time.",
    },
    {
      title: "Medical Supplies Tracking",
      icon: Package,
      desc: "Monitor usage of medical consumables.",
    },
    {
      title: "Store Transfers",
      icon: Truck,
      desc: "Move stock between departments.",
    },
    {
      title: "Reorder Alerts",
      icon: Bell,
      desc: "Automatic low-stock alerts.",
    },
    {
      title: "Asset Inventory",
      icon: Archive,
      desc: "Manage hospital equipment & assets.",
    },
    {
      title: "Consumables Tracking",
      icon: Activity,
      desc: "Track daily usage of consumables.",
    },
  ];

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.category) {
      alert("Please fill required fields");
      return;
    }

    const qty = Number(formData.quantity || 0);

    const newItem = {
      id: `STK-${Math.floor(Math.random() * 9000 + 1000)}`,
      name: formData.name,
      category: formData.category,
      quantity: qty,
      location: formData.location || "Main Store",
      status: qty < 30 ? "Low Stock" : "OK",
    };

    setItems([newItem, ...items]);

    setFormData({
      name: "",
      category: "",
      quantity: "",
      location: "",
    });

    setOpenModal(false);
  };

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HEADER (MATCH YOUR ERP STYLE) */}
      <header className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white shadow-2xl">
        <div className="px-8 py-6 flex flex-col lg:flex-row justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold">
              Inventory & Stores
            </h1>
            <p className="text-slate-300 mt-1">
              Stock • Supplies • Assets • Reorder System
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2"
          >
            <Plus size={20} />
            Add Item
          </button>

        </div>
      </header>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden">

            <div className="flex justify-between items-center px-8 py-5 border-b bg-slate-50">
              <div>
                <h2 className="text-2xl font-bold">
                  Add Inventory Item
                </h2>
                <p className="text-slate-500">
                  Register stock or hospital asset
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="p-2 rounded-xl hover:bg-red-100"
              >
                <X />
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

              <input
                name="name"
                placeholder="Item Name *"
                className="border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleInputChange}
              />

              <input
                name="category"
                placeholder="Category"
                className="border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleInputChange}
              />

              <input
                name="quantity"
                type="number"
                placeholder="Quantity"
                className="border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 shadow-sm"
                onChange={handleInputChange}
              />

              <input
                name="location"
                placeholder="Location"
                className="border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 shadow-sm"
                onChange={handleInputChange}
              />

            </div>

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
                Save Item
              </button>

            </div>

          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="p-6 md:p-8">

        {/* SEARCH CARD (MATCH DESIGN SYSTEM) */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between gap-4">

            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Inventory Search
              </h2>
              <p className="text-slate-500">
                Track stock across all hospital stores
              </p>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search item..."
              className="w-full lg:w-[400px] border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>
        </div>

        {/* STATS (CONSISTENT CARD STYLE) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <Boxes className="text-blue-600" />
            <h2 className="text-3xl font-bold mt-2">{items.length}</h2>
            <p className="text-slate-500">Total Items</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <Activity className="text-green-600" />
            <h2 className="text-3xl font-bold mt-2">
              {items.filter(i => i.status === "OK").length}
            </h2>
            <p className="text-slate-500">In Stock</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <AlertTriangle className="text-red-600" />
            <h2 className="text-3xl font-bold mt-2">
              {items.filter(i => i.status === "Low Stock").length}
            </h2>
            <p className="text-slate-500">Low Stock</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <RefreshCw className="text-purple-600" />
            <h2 className="text-3xl font-bold mt-2">Live</h2>
            <p className="text-slate-500">Auto Sync</p>
          </div>

        </div>

        {/* MODULES (MATCH YOUR ERP MODULE STYLE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition"
              >
                <Icon className="text-blue-600" />
                <h3 className="font-semibold mt-4 text-slate-800">
                  {m.title}
                </h3>
                <p className="text-slate-500 mt-2">
                  {m.desc}
                </p>
              </div>
            );
          })}

        </div>

        {/* TABLE (CLEAN ERP STYLE) */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">

          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-slate-800">
              Stock Records
            </h2>
          </div>

          <table className="w-full">

            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left">Item</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Qty</th>
                <th className="px-6 py-4 text-left">Location</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((i, idx) => (
                <tr key={idx} className="border-t hover:bg-slate-50">

                  <td className="px-6 py-5 font-medium">{i.name}</td>
                  <td className="px-6 py-5">{i.category}</td>
                  <td className="px-6 py-5">{i.quantity}</td>
                  <td className="px-6 py-5">{i.location}</td>

                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      i.status === "OK"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {i.status}
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