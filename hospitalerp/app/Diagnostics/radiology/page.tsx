"use client";

import { useState } from "react";
import {
  Scan,
  Radiation,
  Bone,
  Waves,
  FileImage,
  Stethoscope,
  UserPlus,
  Search,
  Save,
  X,
  ClipboardList,
  CalendarClock,
  Activity,
  Archive,
  UserCog,
} from "lucide-react";

export default function RadiologyPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [studies, setStudies] = useState([
    {
      id: "RAD-2001",
      patient: "Tendai Moyo",
      modality: "X-Ray",
      bodyPart: "Chest",
      radiologist: "Dr. Chikafu",
      status: "Reported",
      priority: "Routine",
    },
    {
      id: "RAD-2002",
      patient: "Rutendo Gwenzi",
      modality: "CT Scan",
      bodyPart: "Abdomen",
      radiologist: "Dr. Mavhunga",
      status: "Pending",
      priority: "Urgent",
    },
  ]);

  const [formData, setFormData] = useState({
    patientName: "",
    modality: "",
    bodyPart: "",
    priority: "",
    referringDoctor: "",
    radiologist: "",
    scheduledDate: "",
    clinicalNotes: "",
    contrastRequired: "",
    reportNotes: "",
  });

  const modules = [
    {
      title: "X-Ray Imaging",
      icon: Bone,
      desc: "Order and track plain film radiography studies.",
    },
    {
      title: "CT Scan",
      icon: Scan,
      desc: "Manage computed tomography scheduling and results.",
    },
    {
      title: "MRI Scanning",
      icon: Radiation,
      desc: "Coordinate magnetic resonance imaging studies.",
    },
    {
      title: "Ultrasound",
      icon: Waves,
      desc: "Track sonography exams across departments.",
    },
    {
      title: "Radiologist Assignment",
      icon: UserCog,
      desc: "Assign studies to on-duty radiologists.",
    },
    {
      title: "Study Scheduling",
      icon: CalendarClock,
      desc: "Book imaging slots and manage equipment time.",
    },
    {
      title: "Report Generation",
      icon: FileImage,
      desc: "Draft, review and finalize radiology reports.",
    },
    {
      title: "Image Archive",
      icon: Archive,
      desc: "Store and retrieve DICOM images and film records.",
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

  const handleSaveStudy = () => {
    if (
      !formData.patientName ||
      !formData.modality ||
      !formData.bodyPart
    ) {
      alert("Please complete required fields");
      return;
    }

    const newStudy = {
      id: `RAD-${Math.floor(Math.random() * 9000 + 1000)}`,
      patient: formData.patientName,
      modality: formData.modality,
      bodyPart: formData.bodyPart,
      radiologist: formData.radiologist || "Unassigned",
      status: "Pending",
      priority: formData.priority || "Routine",
    };

    setStudies([newStudy, ...studies]);

    setFormData({
      patientName: "",
      modality: "",
      bodyPart: "",
      priority: "",
      referringDoctor: "",
      radiologist: "",
      scheduledDate: "",
      clinicalNotes: "",
      contrastRequired: "",
      reportNotes: "",
    });

    setOpenModal(false);
  };

  const filteredStudies = studies.filter((study) =>
    study.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F6F5F1] text-slate-800">
      {/* HEADER */}
      <header className="bg-[#0F2A3B] text-white shadow-md">
        <div className="px-6 py-6 md:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Radiology Dashboard
            </h1>

            <p className="text-slate-300 text-sm mt-0.5">
              Imaging orders, scheduling & report management
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 transition px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm flex items-center gap-2"
          >
            <UserPlus size={17} />
            New Imaging Order
          </button>
        </div>
      </header>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            {/* MODAL HEADER */}
            <div className="flex justify-between items-center px-7 py-5 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Radiology Order Entry
                </h2>

                <p className="text-slate-500 text-sm mt-0.5">
                  Create imaging orders and assign studies
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                aria-label="Close"
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-7 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* PATIENT */}
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-slate-700">
                    Patient Name *
                  </label>

                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    placeholder="Enter patient name"
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  />
                </div>

                {/* MODALITY */}
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-slate-700">
                    Imaging Modality *
                  </label>

                  <select
                    name="modality"
                    value={formData.modality}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  >
                    <option value="">Select Modality</option>
                    <option value="X-Ray">X-Ray</option>
                    <option value="CT Scan">CT Scan</option>
                    <option value="MRI">MRI</option>
                    <option value="Ultrasound">Ultrasound</option>
                    <option value="Mammography">Mammography</option>
                  </select>
                </div>

                {/* BODY PART */}
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-slate-700">
                    Body Part / Region *
                  </label>

                  <input
                    type="text"
                    name="bodyPart"
                    value={formData.bodyPart}
                    onChange={handleInputChange}
                    placeholder="e.g. Chest, Abdomen, Knee"
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  />
                </div>

                {/* PRIORITY */}
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-slate-700">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  >
                    <option value="">Select Priority</option>
                    <option value="Routine">Routine</option>
                    <option value="Urgent">Urgent</option>
                    <option value="STAT">STAT</option>
                  </select>
                </div>

                {/* REFERRING DOCTOR */}
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-slate-700">
                    Referring Doctor
                  </label>

                  <input
                    type="text"
                    name="referringDoctor"
                    value={formData.referringDoctor}
                    onChange={handleInputChange}
                    placeholder="Enter referring doctor"
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  />
                </div>

                {/* RADIOLOGIST */}
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-slate-700">
                    Assigned Radiologist
                  </label>

                  <input
                    type="text"
                    name="radiologist"
                    value={formData.radiologist}
                    onChange={handleInputChange}
                    placeholder="Enter radiologist name"
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  />
                </div>

                {/* SCHEDULED DATE */}
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-slate-700">
                    Scheduled Date
                  </label>

                  <input
                    type="date"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  />
                </div>

                {/* CONTRAST */}
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-slate-700">
                    Contrast Required
                  </label>

                  <select
                    name="contrastRequired"
                    value={formData.contrastRequired}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* CLINICAL NOTES */}
                <div className="md:col-span-2">
                  <label className="block mb-1.5 text-sm font-medium text-slate-700">
                    Clinical Notes
                  </label>

                  <textarea
                    name="clinicalNotes"
                    value={formData.clinicalNotes}
                    onChange={handleInputChange}
                    placeholder="Relevant clinical history or indication"
                    rows={3}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  />
                </div>

                {/* REPORT NOTES */}
                <div className="md:col-span-2">
                  <label className="block mb-1.5 text-sm font-medium text-slate-700">
                    Report Notes
                  </label>

                  <textarea
                    name="reportNotes"
                    value={formData.reportNotes}
                    onChange={handleInputChange}
                    placeholder="Preliminary findings or report details"
                    rows={3}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-7 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveStudy}
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-sm transition"
              >
                <Save size={16} />
                Save Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="p-6 md:p-8">
        {/* SEARCH */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-7">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Search Imaging Studies
              </h2>

              <p className="text-slate-500 text-sm mt-0.5">
                Search by patient name across all studies
              </p>
            </div>

            <div className="relative w-full lg:w-[360px]">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={17}
              />

              <input
                type="text"
                placeholder="Search patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm">Total Studies</p>
                <h2 className="text-2xl font-semibold mt-1.5 tracking-tight">
                  {studies.length}
                </h2>
              </div>
              <div className="bg-indigo-50 text-indigo-700 p-2.5 rounded-xl">
                <FileImage size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm">Reports Completed</p>
                <h2 className="text-2xl font-semibold mt-1.5 tracking-tight">
                  128
                </h2>
              </div>
              <div className="bg-green-50 text-green-700 p-2.5 rounded-xl">
                <ClipboardList size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm">Pending Scans</p>
                <h2 className="text-2xl font-semibold mt-1.5 tracking-tight">
                  17
                </h2>
              </div>
              <div className="bg-amber-50 text-amber-700 p-2.5 rounded-xl">
                <Activity size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm">Radiologists On Duty</p>
                <h2 className="text-2xl font-semibold mt-1.5 tracking-tight">
                  6
                </h2>
              </div>
              <div className="bg-purple-50 text-purple-700 p-2.5 rounded-xl">
                <Stethoscope size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* MODULES */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Radiology Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {modules.map((module, index) => {
              const Icon = module.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition"
                >
                  <div className="bg-indigo-50 text-indigo-700 p-2.5 rounded-xl w-fit">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-sm font-semibold mt-4 text-slate-800">
                    {module.title}
                  </h3>

                  <p className="text-slate-500 text-sm mt-1.5">
                    {module.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">
              Imaging Study Records
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-100">
                  <th className="px-6 py-3 font-medium">Patient</th>
                  <th className="px-6 py-3 font-medium">Modality</th>
                  <th className="px-6 py-3 font-medium">Body Part</th>
                  <th className="px-6 py-3 font-medium">Radiologist</th>
                  <th className="px-6 py-3 font-medium">Priority</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudies.map((study, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition"
                  >
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {study.patient}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {study.modality}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {study.bodyPart}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {study.radiologist}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          study.priority === "STAT"
                            ? "bg-red-50 text-red-700"
                            : study.priority === "Urgent"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {study.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          study.status === "Reported"
                            ? "bg-teal-50 text-teal-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {study.status}
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
  );
}
