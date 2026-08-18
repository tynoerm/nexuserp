"use client";

import { useState } from "react";
import {
  Siren,
  Ambulance,
  Activity,
  ClipboardList,
  FileWarning,
  DollarSign,
  BellRing,
  UserPlus,
  Search,
  Save,
  X,
  HeartPulse,
  Clock3,
  ShieldAlert,
  Users,
} from "lucide-react";

export default function EmergencyCasualtyPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [emergencies, setEmergencies] = useState([
    {
      id: "EMG-1001",
      patient: "John Dube",
      triage: "Critical",
      ambulance: "Assigned",
      treatment: "Emergency Surgery",
      billing: "$450",
      status: "Under Treatment",
    },
    {
      id: "EMG-1002",
      patient: "Sarah Ncube",
      triage: "Moderate",
      ambulance: "Not Required",
      treatment: "Fracture Stabilization",
      billing: "$180",
      status: "Stable",
    },
  ]);

  const [formData, setFormData] = useState({
    patientName: "",
    triageLevel: "",
    ambulanceCoordination: "",
    criticalTracking: "",
    treatmentRecords: "",
    accidentDocumentation: "",
    rapidBilling: "",
    emergencyAlerts: "",
  });

  const modules = [
    {
      title: "Emergency Triage",
      icon: Siren,
      desc: "Prioritize emergency patients based on severity.",
    },
    {
      title: "Ambulance Coordination",
      icon: Ambulance,
      desc: "Manage ambulance dispatch and emergency transport.",
    },
    {
      title: "Critical Patient Tracking",
      icon: Activity,
      desc: "Monitor critical patients in real time.",
    },
    {
      title: "Emergency Treatment Records",
      icon: ClipboardList,
      desc: "Capture emergency treatment procedures and notes.",
    },
    {
      title: "Accident Documentation",
      icon: FileWarning,
      desc: "Record accident and incident details securely.",
    },
    {
      title: "Rapid Billing",
      icon: DollarSign,
      desc: "Generate emergency bills quickly and efficiently.",
    },
    {
      title: "Emergency Alerts",
      icon: BellRing,
      desc: "Trigger emergency alerts and notifications instantly.",
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

  const handleSaveEmergency = () => {
    if (!formData.patientName || !formData.triageLevel) {
      alert("Please complete required fields");
      return;
    }

    const newEmergency = {
      id: `EMG-${Math.floor(Math.random() * 9000 + 1000)}`,
      patient: formData.patientName,
      triage: formData.triageLevel,
      ambulance:
        formData.ambulanceCoordination || "Pending",
      treatment:
        formData.treatmentRecords || "Awaiting Treatment",
      billing: `$${formData.rapidBilling || 0}`,
      status:
        formData.triageLevel === "Critical"
          ? "Under Treatment"
          : "Stable",
    };

    setEmergencies([newEmergency, ...emergencies]);

    setFormData({
      patientName: "",
      triageLevel: "",
      ambulanceCoordination: "",
      criticalTracking: "",
      treatmentRecords: "",
      accidentDocumentation: "",
      rapidBilling: "",
      emergencyAlerts: "",
    });

    setOpenModal(false);
  };

  const filteredEmergencies = emergencies.filter(
    (emergency) =>
      emergency.patient
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-red-900 via-rose-800 to-slate-900 text-white shadow-2xl">
        <div className="px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Emergency / Casualty Dashboard
            </h1>

            <p className="text-slate-300 mt-1">
              Emergency response, triage & critical care management
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-2xl font-medium shadow-lg flex items-center gap-2"
          >
            <UserPlus size={20} />
            New Emergency Case
          </button>
        </div>
      </header>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden">
            {/* HEADER */}
            <div className="flex justify-between items-center px-8 py-5 border-b border-slate-200 bg-slate-50">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Emergency Case Entry
                </h2>

                <p className="text-slate-500 mt-1">
                  Register emergency patient details
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="p-2 rounded-xl hover:bg-red-100 hover:text-red-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* BODY */}
            <div className="p-8 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PATIENT NAME */}
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

                {/* TRIAGE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Emergency Triage *
                  </label>

                  <select
                    name="triageLevel"
                    value={formData.triageLevel}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">Select Triage Level</option>
                    <option value="Critical">
                      Critical
                    </option>
                    <option value="Moderate">
                      Moderate
                    </option>
                    <option value="Minor">Minor</option>
                  </select>
                </div>

                {/* AMBULANCE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Ambulance Coordination
                  </label>

                  <input
                    type="text"
                    name="ambulanceCoordination"
                    value={formData.ambulanceCoordination}
                    onChange={handleInputChange}
                    placeholder="Ambulance assigned..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* CRITICAL TRACKING */}
                <div>
                  <label className="block mb-2 font-medium">
                    Critical Patient Tracking
                  </label>

                  <input
                    type="text"
                    name="criticalTracking"
                    value={formData.criticalTracking}
                    onChange={handleInputChange}
                    placeholder="Patient monitoring details..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* TREATMENT */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Emergency Treatment Records
                  </label>

                  <textarea
                    name="treatmentRecords"
                    value={formData.treatmentRecords}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Enter treatment records..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* ACCIDENT DOC */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Accident Documentation
                  </label>

                  <textarea
                    name="accidentDocumentation"
                    value={formData.accidentDocumentation}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Enter accident details..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* RAPID BILLING */}
                <div>
                  <label className="block mb-2 font-medium">
                    Rapid Billing
                  </label>

                  <input
                    type="number"
                    name="rapidBilling"
                    value={formData.rapidBilling}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* ALERTS */}
                <div>
                  <label className="block mb-2 font-medium">
                    Emergency Alerts
                  </label>

                  <input
                    type="text"
                    name="emergencyAlerts"
                    value={formData.emergencyAlerts}
                    onChange={handleInputChange}
                    placeholder="Emergency alerts..."
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
                onClick={handleSaveEmergency}
                className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 shadow-lg"
              >
                <Save size={18} />
                Save Emergency
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
                Search Emergency Cases
              </h2>

              <p className="text-slate-500 mt-1">
                Search casualty and emergency patient records
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
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-red-500"
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
                  Emergency Cases
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {emergencies.length}
                </h2>
              </div>

              <div className="bg-red-100 text-red-700 p-4 rounded-2xl">
                <Siren size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Ambulances Active
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  6
                </h2>
              </div>

              <div className="bg-blue-100 text-blue-700 p-4 rounded-2xl">
                <Ambulance size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Critical Patients
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  14
                </h2>
              </div>

              <div className="bg-amber-100 text-amber-700 p-4 rounded-2xl">
                <ShieldAlert size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Emergency Alerts
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  18
                </h2>
              </div>

              <div className="bg-purple-100 text-purple-700 p-4 rounded-2xl">
                <BellRing size={30} />
              </div>
            </div>
          </div>
        </div>

        {/* MODULES */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Emergency Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition"
                >
                  <div className="bg-red-100 text-red-700 p-4 rounded-2xl w-fit">
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
              Emergency Patient Records
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-600">
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Triage</th>
                  <th className="px-6 py-4">Ambulance</th>
                  <th className="px-6 py-4">Treatment</th>
                  <th className="px-6 py-4">Billing</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmergencies.map(
                  (emergency, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-5 font-medium">
                        {emergency.patient}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-4 py-1 rounded-full text-sm font-medium ${
                            emergency.triage ===
                            "Critical"
                              ? "bg-red-100 text-red-700"
                              : emergency.triage ===
                                "Moderate"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {emergency.triage}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        {emergency.ambulance}
                      </td>

                      <td className="px-6 py-5">
                        {emergency.treatment}
                      </td>

                      <td className="px-6 py-5">
                        {emergency.billing}
                      </td>

                      <td className="px-6 py-5">
                        <span className="px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                          {emergency.status}
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