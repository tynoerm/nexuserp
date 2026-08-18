"use client";

import { useState } from "react";
import {
  FlaskConical,
  TestTube,
  Microscope,
  UserPlus,
  Search,
  Save,
  X,
  ClipboardList,
  Droplet,
  Dna,
  FileCheck2,
  AlertOctagon,
  Timer,
  Beaker,
  Stamp,
} from "lucide-react";

export default function LaboratoryPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [orders, setOrders] = useState([
    {
      id: "LAB-4001",
      patient: "Tapiwa Zhou",
      testName: "Full Blood Count",
      sampleType: "Blood",
      requestedBy: "Dr. Chikafu",
      status: "Completed",
      priority: "Routine",
    },
    {
      id: "LAB-4002",
      patient: "Chiedza Nyoni",
      testName: "Urinalysis",
      sampleType: "Urine",
      requestedBy: "Dr. Mavhunga",
      status: "In Progress",
      priority: "Urgent",
    },
  ]);

  const [formData, setFormData] = useState({
    patientName: "",
    testName: "",
    sampleType: "",
    priority: "",
    requestedBy: "",
    collectionDate: "",
    labTechnician: "",
    clinicalNotes: "",
    fastingRequired: "",
    resultNotes: "",
  });

  const modules = [
    {
      title: "Test Ordering",
      icon: ClipboardList,
      desc: "Place and manage laboratory test requests.",
    },
    {
      title: "Sample Collection",
      icon: Droplet,
      desc: "Track specimen collection and labeling.",
    },
    {
      title: "Microbiology",
      icon: Microscope,
      desc: "Manage culture, sensitivity and pathogen testing.",
    },
    {
      title: "Biochemistry",
      icon: FlaskConical,
      desc: "Process blood chemistry and metabolic panels.",
    },
    {
      title: "Hematology",
      icon: TestTube,
      desc: "Run blood count and coagulation studies.",
    },
    {
      title: "Molecular / Genetics",
      icon: Dna,
      desc: "Handle PCR, DNA and molecular diagnostic tests.",
    },
    {
      title: "Result Verification",
      icon: FileCheck2,
      desc: "Review, approve and release lab results.",
    },
    {
      title: "Critical Value Alerts",
      icon: AlertOctagon,
      desc: "Flag and escalate critical test results.",
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

  const handleSaveOrder = () => {
    if (
      !formData.patientName ||
      !formData.testName ||
      !formData.sampleType
    ) {
      alert("Please complete required fields");
      return;
    }

    const newOrder = {
      id: `LAB-${Math.floor(Math.random() * 9000 + 1000)}`,
      patient: formData.patientName,
      testName: formData.testName,
      sampleType: formData.sampleType,
      requestedBy: formData.requestedBy || "Unassigned",
      status: "Pending",
      priority: formData.priority || "Routine",
    };

    setOrders([newOrder, ...orders]);

    setFormData({
      patientName: "",
      testName: "",
      sampleType: "",
      priority: "",
      requestedBy: "",
      collectionDate: "",
      labTechnician: "",
      clinicalNotes: "",
      fastingRequired: "",
      resultNotes: "",
    });

    setOpenModal(false);
  };

  const filteredOrders = orders.filter((order) =>
    order.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-rose-900 via-red-800 to-slate-900 text-white shadow-2xl">
        <div className="px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Laboratory Dashboard
            </h1>

            <p className="text-slate-300 mt-1">
              Test orders, sample tracking & result management
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-rose-600 hover:bg-rose-700 transition px-5 py-3 rounded-2xl font-medium shadow-lg flex items-center gap-2"
          >
            <UserPlus size={20} />
            New Test Order
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
                  Laboratory Order Entry
                </h2>

                <p className="text-slate-500 mt-1">
                  Create test orders and track sample collection
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

                {/* TEST NAME */}
                <div>
                  <label className="block mb-2 font-medium">
                    Test Name *
                  </label>

                  <input
                    type="text"
                    name="testName"
                    value={formData.testName}
                    onChange={handleInputChange}
                    placeholder="e.g. Full Blood Count"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* SAMPLE TYPE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Sample Type *
                  </label>

                  <select
                    name="sampleType"
                    value={formData.sampleType}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">
                      Select Sample Type
                    </option>

                    <option value="Blood">Blood</option>

                    <option value="Urine">Urine</option>

                    <option value="Stool">Stool</option>

                    <option value="Sputum">Sputum</option>

                    <option value="Swab">Swab</option>

                    <option value="Tissue">Tissue</option>
                  </select>
                </div>

                {/* PRIORITY */}
                <div>
                  <label className="block mb-2 font-medium">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">
                      Select Priority
                    </option>

                    <option value="Routine">Routine</option>

                    <option value="Urgent">Urgent</option>

                    <option value="STAT">STAT</option>
                  </select>
                </div>

                {/* REQUESTED BY */}
                <div>
                  <label className="block mb-2 font-medium">
                    Requested By
                  </label>

                  <input
                    type="text"
                    name="requestedBy"
                    value={formData.requestedBy}
                    onChange={handleInputChange}
                    placeholder="Enter requesting doctor"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* LAB TECHNICIAN */}
                <div>
                  <label className="block mb-2 font-medium">
                    Assigned Lab Technician
                  </label>

                  <input
                    type="text"
                    name="labTechnician"
                    value={formData.labTechnician}
                    onChange={handleInputChange}
                    placeholder="Enter technician name"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* COLLECTION DATE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Collection Date
                  </label>

                  <input
                    type="date"
                    name="collectionDate"
                    value={formData.collectionDate}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* FASTING */}
                <div>
                  <label className="block mb-2 font-medium">
                    Fasting Required
                  </label>

                  <select
                    name="fastingRequired"
                    value={formData.fastingRequired}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* CLINICAL NOTES */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Clinical Notes
                  </label>

                  <textarea
                    name="clinicalNotes"
                    value={formData.clinicalNotes}
                    onChange={handleInputChange}
                    placeholder="Relevant clinical history or indication"
                    rows={3}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* RESULT NOTES */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Result Notes
                  </label>

                  <textarea
                    name="resultNotes"
                    value={formData.resultNotes}
                    onChange={handleInputChange}
                    placeholder="Preliminary findings or result details"
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
                onClick={handleSaveOrder}
                className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2 shadow-lg"
              >
                <Save size={18} />
                Save Order
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
                Search Test Orders
              </h2>

              <p className="text-slate-500 mt-1">
                Search by patient name across all lab orders
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
                  Total Test Orders
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {orders.length}
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
                  Results Verified
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  312
                </h2>
              </div>

              <div className="bg-green-100 text-green-700 p-4 rounded-2xl">
                <FileCheck2 size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Samples Pending
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  14
                </h2>
              </div>

              <div className="bg-amber-100 text-amber-700 p-4 rounded-2xl">
                <Timer size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Critical Alerts
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  2
                </h2>
              </div>

              <div className="bg-red-100 text-red-700 p-4 rounded-2xl">
                <AlertOctagon size={30} />
              </div>
            </div>
          </div>
        </div>

        {/* MODULES */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Laboratory Modules
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
              Test Order Records
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-600">
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Test</th>
                  <th className="px-6 py-4">Sample Type</th>
                  <th className="px-6 py-4">Requested By</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 font-medium">
                      {order.patient}
                    </td>

                    <td className="px-6 py-5">
                      {order.testName}
                    </td>

                    <td className="px-6 py-5">
                      {order.sampleType}
                    </td>

                    <td className="px-6 py-5">
                      {order.requestedBy}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          order.priority === "STAT"
                            ? "bg-red-100 text-red-700"
                            : order.priority === "Urgent"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {order.priority}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {order.status}
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
