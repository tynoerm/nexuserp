"use client";

import { useState } from "react";
import {
  Truck,
  Users,
  ClipboardList,
  FileText,
  PackageCheck,
  Wallet,
  Gavel,
  UserPlus,
  Search,
  Save,
  X,
  ShoppingCart,
  ReceiptText,
  Banknote,
} from "lucide-react";

export default function ProcurementPurchasingPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [procurements, setProcurements] = useState([
    {
      id: "PR-1001",
      supplier: "MedSupplies Ltd",
      item: "Syringes",
      amount: "$1,200",
      status: "Approved",
      type: "Purchase Order",
    },
    {
      id: "PR-1002",
      supplier: "HealthCare Distributors",
      item: "Gloves",
      amount: "$450",
      status: "Pending",
      type: "Quotation",
    },
  ]);

  const [formData, setFormData] = useState({
    supplier: "",
    item: "",
    amount: "",
    requisition: "",
    quotation: "",
    purchaseOrder: "",
    goodsReceiving: "",
    vendorPayment: "",
    tender: "",
  });

  const modules = [
    {
      title: "Supplier Management",
      icon: Users,
      desc: "Manage approved hospital suppliers.",
    },
    {
      title: "Purchase Requisitions",
      icon: ClipboardList,
      desc: "Handle internal purchase requests.",
    },
    {
      title: "Quotations",
      icon: FileText,
      desc: "Compare supplier quotations.",
    },
    {
      title: "Purchase Orders",
      icon: ShoppingCart,
      desc: "Generate official purchase orders.",
    },
    {
      title: "Goods Receiving",
      icon: PackageCheck,
      desc: "Record received stock and supplies.",
    },
    {
      title: "Vendor Payments",
      icon: Wallet,
      desc: "Process supplier payments.",
    },
    {
      title: "Tender Management",
      icon: Gavel,
      desc: "Manage procurement tenders.",
    },
  ];

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (!formData.supplier || !formData.item) {
      alert("Please fill required fields");
      return;
    }

    const newRecord = {
      id: `PR-${Math.floor(Math.random() * 9000 + 1000)}`,
      supplier: formData.supplier,
      item: formData.item,
      amount: `$${formData.amount || 0}`,
      status: "Pending",
      type: formData.purchaseOrder || "Requisition",
    };

    setProcurements([newRecord, ...procurements]);

    setFormData({
      supplier: "",
      item: "",
      amount: "",
      requisition: "",
      quotation: "",
      purchaseOrder: "",
      goodsReceiving: "",
      vendorPayment: "",
      tender: "",
    });

    setOpenModal(false);
  };

  const filtered = procurements.filter((p) =>
    p.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-emerald-900 via-green-800 to-slate-900 text-white shadow-2xl">
        <div className="px-8 py-6 flex flex-col lg:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Procurement & Purchasing
            </h1>
            <p className="text-slate-300 mt-1">
              Suppliers • Purchase Orders • Tenders • Payments
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2"
          >
            <UserPlus size={20} />
            New Procurement
          </button>
        </div>
      </header>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="flex justify-between items-center px-8 py-5 border-b bg-slate-50">
              <div>
                <h2 className="text-2xl font-bold">
                  Procurement Entry
                </h2>
                <p className="text-slate-500">
                  Create requisition / purchase order
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="p-2 rounded-xl hover:bg-red-100"
              >
                <X />
              </button>
            </div>

            {/* BODY */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

              <input name="supplier" placeholder="Supplier Name *"
                className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm"
                onChange={handleInputChange}
              />

              <input name="item" placeholder="Item / Product *"
                className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm"
                onChange={handleInputChange}
              />

              <input name="amount" type="number" placeholder="Amount"
                className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm"
                onChange={handleInputChange}
              />

              <input name="requisition" placeholder="Purchase Requisition"
                className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm"
                onChange={handleInputChange}
              />

              <input name="quotation" placeholder="Quotation Reference"
                className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm"
                onChange={handleInputChange}
              />

              <input name="purchaseOrder" placeholder="Purchase Order Ref"
                className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm"
                onChange={handleInputChange}
              />

              <input name="goodsReceiving" placeholder="Goods Receiving Note"
                className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm"
                onChange={handleInputChange}
              />

              <input name="vendorPayment" placeholder="Vendor Payment Status"
                className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm"
                onChange={handleInputChange}
              />

              <input name="tender" placeholder="Tender Reference"
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
                className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white shadow-lg flex items-center gap-2"
              >
                <Save size={18} />
                Save Procurement
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="p-6 md:p-8">

        {/* SEARCH */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 mb-8">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search supplier..."
            className="border rounded-2xl px-4 py-3 bg-slate-50 shadow-sm w-full lg:w-[400px]"
          />
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <Truck />
            <h2 className="text-2xl font-bold mt-2">{procurements.length}</h2>
            <p className="text-slate-500">Procurements</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <Users />
            <h2 className="text-2xl font-bold mt-2">18</h2>
            <p className="text-slate-500">Suppliers</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <Banknote />
            <h2 className="text-2xl font-bold mt-2">$8,540</h2>
            <p className="text-slate-500">Total Spend</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <ReceiptText />
            <h2 className="text-2xl font-bold mt-2">32</h2>
            <p className="text-slate-500">Purchase Orders</p>
          </div>

        </div>

        {/* MODULES */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
                <Icon className="mb-3" />
                <h3 className="font-semibold">{m.title}</h3>
                <p className="text-slate-500 mt-2">{m.desc}</p>
              </div>
            );
          })}
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left">Supplier</th>
                <th className="px-6 py-4 text-left">Item</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p, i) => (
                <tr key={i} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-5">{p.supplier}</td>
                  <td className="px-6 py-5">{p.item}</td>
                  <td className="px-6 py-5">{p.amount}</td>
                  <td className="px-6 py-5">{p.type}</td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-700">
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