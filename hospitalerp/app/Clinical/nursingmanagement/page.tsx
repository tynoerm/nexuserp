"use client";

import { useState } from "react";
import {
  UserPlus,
  Users,
  Clock3,
  ClipboardList,
  Pill,
  Activity,
  FileText,
  CheckSquare,
  Search,
  Save,
  X,
  Bed,
  HeartPulse,
  CalendarDays,
} from "lucide-react";

export default function NursingManagementPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [nurses, setNurses] = useState([
    {
      id: "NUR-1001",
      name: "Sister Moyo",
      ward: "Ward A",
      shift: "Day Shift",
      medication: "Completed",
      observations: "Stable",
      status: "On Duty",
    },
    {
      id: "NUR-1002",
      name: "Sister Ncube",
      ward: "ICU",
      shift: "Night Shift",
      medication: "Pending",
      observations: "Critical",
      status: "On Duty",
    },
  ]);

  const [formData, setFormData] = useState({
    nurseName: "",
    ward: "",
    shift: "",
    nursingNotes: "",
    medicationAdministration: "",
    patientObservations: "",
    handoverReport: "",
    taskAssignments: "",
  });

  const modules = [
    {
      title: "Nurse Allocation",
      icon: Users,
      desc: "Assign nurses to wards and patient care units.",
    },
    {
      title: "Shift Management",
      icon: Clock3,
      desc: "Manage nurse schedules and shift rotations.",
    },
    {
      title: "Nursing Notes",
      icon: ClipboardList,
      desc: "Capture patient nursing care notes.",
    },
    {
      title: "Medication Administration",
      icon: Pill,
      desc: "Track patient medication administration records.",
    },
    {
      title: "Patient Observations",
      icon: Activity,
      desc: "Record patient vitals and observations.",
    },
    {
      title: "Ward Handover Reports",
      icon: FileText,
      desc: "Generate shift handover reports between nurses.",
    },
    {
      title: "Nurse Task Assignments",
      icon: CheckSquare,
      desc: "Assign and monitor nursing responsibilities.",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveNurse = () => {
    if (!formData.nurseName || !formData.ward) {
      alert("Please complete required fields");
      return;
    }

    const newNurse = {
      id: `NUR-${Math.floor(Math.random() * 9000 + 1000)}`,
      name: formData.nurseName,
      ward: formData.ward,
      shift: formData.shift || "Day Shift",
      medication: formData.medicationAdministration
        ? "Completed"
        : "Pending",
      observations:
        formData.patientObservations || "Stable",
      status: "On Duty",
    };

    setNurses([newNurse, ...nurses]);

    setFormData({
      nurseName: "",
      ward: "",
      shift: "",
      nursingNotes: "",
      medicationAdministration: "",
      patientObservations: "",
      handoverReport: "",
      taskAssignments: "",
    });

    setOpenModal(false);
  };

  const filteredNurses = nurses.filter((nurse) =>
    nurse.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white shadow-2xl">
        <div className="px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Nursing Management Dashboard
            </h1>

            <p className="text-slate-300 mt-1">
              Manage nurses, patient care, medication & ward handovers
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-2xl font-medium shadow-lg flex items-center gap-2"
          >
            <UserPlus size={20} />
            Add Nurse
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
                  Nurse Registration
                </h2>

                <p className="text-slate-500 mt-1">
                  Register nurse assignments and ward duties
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
                {/* NURSE NAME */}
                <div>
                  <label className="block mb-2 font-medium">
                    Nurse Name *
                  </label>

                  <input
                    type="text"
                    name="nurseName"
                    value={formData.nurseName}
                    onChange={handleInputChange}
                    placeholder="Enter nurse name"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* WARD */}
                <div>
                  <label className="block mb-2 font-medium">
                    Ward Allocation *
                  </label>

                  <select
                    name="ward"
                    value={formData.ward}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">Select Ward</option>
                    <option value="Ward A">Ward A</option>
                    <option value="Ward B">Ward B</option>
                    <option value="ICU">ICU</option>
                    <option value="Maternity">Maternity</option>
                  </select>
                </div>

                {/* SHIFT */}
                <div>
                  <label className="block mb-2 font-medium">
                    Shift Management
                  </label>

                  <select
                    name="shift"
                    value={formData.shift}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">Select Shift</option>
                    <option value="Day Shift">Day Shift</option>
                    <option value="Night Shift">Night Shift</option>
                    <option value="Weekend Shift">Weekend Shift</option>
                  </select>
                </div>

                {/* MEDICATION */}
                <div>
                  <label className="block mb-2 font-medium">
                    Medication Administration
                  </label>

                  <input
                    type="text"
                    name="medicationAdministration"
                    value={formData.medicationAdministration}
                    onChange={handleInputChange}
                    placeholder="Administered medication..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* NURSING NOTES */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Nursing Notes
                  </label>

                  <textarea
                    name="nursingNotes"
                    value={formData.nursingNotes}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Enter nursing notes..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* OBSERVATIONS */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Patient Observations
                  </label>

                  <textarea
                    name="patientObservations"
                    value={formData.patientObservations}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Enter patient observations..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* HANDOVER */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Ward Handover Reports
                  </label>

                  <textarea
                    name="handoverReport"
                    value={formData.handoverReport}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Enter handover report..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* TASK ASSIGNMENTS */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Nurse Task Assignments
                  </label>

                  <textarea
                    name="taskAssignments"
                    value={formData.taskAssignments}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Assign nursing tasks..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="px-8 py-5 border-t border-slate-200 bg-slate-50 flex justify-end gap-4">
              <button
                onClick={() => setOpenModal(false)}
                className="px-6 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveNurse}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-lg"
              >
                <Save size={18} />
                Save Nurse
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
                Search Nurses
              </h2>

              <p className="text-slate-500 mt-1">
                Search nursing staff and ward assignments
              </p>
            </div>

            <div className="relative w-full lg:w-[400px]">
              <Search
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search nurse..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">Total Nurses</p>

                <h2 className="text-3xl font-bold mt-2">
                  {nurses.length}
                </h2>
              </div>

              <div className="bg-blue-100 text-blue-700 p-4 rounded-2xl">
                <Users size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">Active Shifts</p>

                <h2 className="text-3xl font-bold mt-2">12</h2>
              </div>

              <div className="bg-green-100 text-green-700 p-4 rounded-2xl">
                <Clock3 size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">Medication Tasks</p>

                <h2 className="text-3xl font-bold mt-2">48</h2>
              </div>

              <div className="bg-amber-100 text-amber-700 p-4 rounded-2xl">
                <Pill size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">Ward Reports</p>

                <h2 className="text-3xl font-bold mt-2">24</h2>
              </div>

              <div className="bg-purple-100 text-purple-700 p-4 rounded-2xl">
                <FileText size={30} />
              </div>
            </div>
          </div>
        </div>

        {/* MODULES */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Nursing Management Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition"
                >
                  <div className="bg-blue-100 text-blue-700 p-4 rounded-2xl w-fit">
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
              Nursing Staff Records
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-600">
                  <th className="px-6 py-4">Nurse</th>
                  <th className="px-6 py-4">Ward</th>
                  <th className="px-6 py-4">Shift</th>
                  <th className="px-6 py-4">Medication</th>
                  <th className="px-6 py-4">Observations</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredNurses.map((nurse, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 font-medium">
                      {nurse.name}
                    </td>

                    <td className="px-6 py-5">
                      {nurse.ward}
                    </td>

                    <td className="px-6 py-5">
                      {nurse.shift}
                    </td>

                    <td className="px-6 py-5">
                      {nurse.medication}
                    </td>

                    <td className="px-6 py-5">
                      {nurse.observations}
                    </td>

                    <td className="px-6 py-5">
                      <span className="px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                        {nurse.status}
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