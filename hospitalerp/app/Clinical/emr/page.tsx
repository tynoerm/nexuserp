"use client";

import { useState } from "react";
import {
  FileText,
  UserPlus,
  Search,
  Save,
  X,
  ClipboardList,
  Activity,
  FlaskConical,
  ScanLine,
  ShieldCheck,
  Upload,
  PenTool,
  Users,
  HeartPulse,
  FileBadge,
} from "lucide-react";

export default function EMRPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [records, setRecords] = useState([
    {
      id: "EMR-1001",
      patient: "John Dube",
      diagnosis: "Hypertension",
      doctor: "Dr. Moyo",
      lab: "Blood Test",
      imaging: "Chest X-Ray",
      treatment: "Medication Plan",
      status: "Active",
    },
    {
      id: "EMR-1002",
      patient: "Sarah Ncube",
      diagnosis: "Pneumonia",
      doctor: "Dr. Sibanda",
      lab: "CBC Report",
      imaging: "CT Scan",
      treatment: "Antibiotic Therapy",
      status: "Reviewed",
    },
  ]);

  const [formData, setFormData] = useState({
    patientName: "",
    doctor: "",
    diagnosisHistory: "",
    clinicalNotes: "",
    labReports: "",
    imagingReports: "",
    treatmentPlans: "",
    documentUploads: "",
    eSignature: "",
  });

  const modules = [
    {
      title: "Digital Patient Records",
      icon: FileText,
      desc: "Manage electronic patient records securely.",
    },
    {
      title: "Diagnosis History",
      icon: ClipboardList,
      desc: "Track patient diagnosis history over time.",
    },
    {
      title: "Clinical Notes",
      icon: Activity,
      desc: "Capture doctor and nursing clinical notes.",
    },
    {
      title: "Lab Reports",
      icon: FlaskConical,
      desc: "Store and manage laboratory reports.",
    },
    {
      title: "Imaging Reports",
      icon: ScanLine,
      desc: "Access radiology and imaging reports.",
    },
    {
      title: "Treatment Plans",
      icon: HeartPulse,
      desc: "Monitor patient treatment plans and care.",
    },
    {
      title: "Document Uploads",
      icon: Upload,
      desc: "Upload prescriptions and medical documents.",
    },
    {
      title: "e-Signatures",
      icon: PenTool,
      desc: "Securely sign digital medical records.",
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

  const handleSaveRecord = () => {
    if (!formData.patientName || !formData.doctor) {
      alert("Please complete required fields");
      return;
    }

    const newRecord = {
      id: `EMR-${Math.floor(Math.random() * 9000 + 1000)}`,
      patient: formData.patientName,
      diagnosis:
        formData.diagnosisHistory || "Pending",
      doctor: formData.doctor,
      lab: formData.labReports || "N/A",
      imaging: formData.imagingReports || "N/A",
      treatment:
        formData.treatmentPlans || "Pending",
      status: "Active",
    };

    setRecords([newRecord, ...records]);

    setFormData({
      patientName: "",
      doctor: "",
      diagnosisHistory: "",
      clinicalNotes: "",
      labReports: "",
      imagingReports: "",
      treatmentPlans: "",
      documentUploads: "",
      eSignature: "",
    });

    setOpenModal(false);
  };

  const filteredRecords = records.filter((record) =>
    record.patient
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white shadow-2xl">
        <div className="px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Electronic Medical Records (EMR/EHR)
            </h1>

            <p className="text-slate-300 mt-1">
              Digital patient records, diagnosis tracking & treatment management
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-2xl font-medium shadow-lg flex items-center gap-2"
          >
            <UserPlus size={20} />
            New Medical Record
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
                  Create Medical Record
                </h2>

                <p className="text-slate-500 mt-1">
                  Enter patient medical history and reports
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

                {/* DOCTOR */}
                <div>
                  <label className="block mb-2 font-medium">
                    Attending Doctor *
                  </label>

                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">Select Doctor</option>
                    <option value="Dr. Moyo">
                      Dr. Moyo
                    </option>
                    <option value="Dr. Sibanda">
                      Dr. Sibanda
                    </option>
                    <option value="Dr. Chuma">
                      Dr. Chuma
                    </option>
                  </select>
                </div>

                {/* DIAGNOSIS HISTORY */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Diagnosis History
                  </label>

                  <textarea
                    name="diagnosisHistory"
                    value={formData.diagnosisHistory}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Enter diagnosis history..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
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
                    rows={4}
                    placeholder="Enter clinical notes..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* LAB REPORTS */}
                <div>
                  <label className="block mb-2 font-medium">
                    Lab Reports
                  </label>

                  <input
                    type="text"
                    name="labReports"
                    value={formData.labReports}
                    onChange={handleInputChange}
                    placeholder="Blood Test, CBC..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* IMAGING */}
                <div>
                  <label className="block mb-2 font-medium">
                    Imaging Reports
                  </label>

                  <input
                    type="text"
                    name="imagingReports"
                    value={formData.imagingReports}
                    onChange={handleInputChange}
                    placeholder="X-Ray, MRI..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* TREATMENT */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Treatment Plans
                  </label>

                  <textarea
                    name="treatmentPlans"
                    value={formData.treatmentPlans}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Enter treatment plan..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* DOCUMENT UPLOADS */}
                <div>
                  <label className="block mb-2 font-medium">
                    Document Uploads
                  </label>

                  <input
                    type="text"
                    name="documentUploads"
                    value={formData.documentUploads}
                    onChange={handleInputChange}
                    placeholder="Upload documents..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* E-SIGNATURE */}
                <div>
                  <label className="block mb-2 font-medium">
                    e-Signature
                  </label>

                  <input
                    type="text"
                    name="eSignature"
                    value={formData.eSignature}
                    onChange={handleInputChange}
                    placeholder="Doctor signature..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
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
                onClick={handleSaveRecord}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-lg"
              >
                <Save size={18} />
                Save Record
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
                Search Medical Records
              </h2>

              <p className="text-slate-500 mt-1">
                Search patient EMR/EHR records and reports
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
                <p className="text-slate-500">
                  Total Records
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {records.length}
                </h2>
              </div>

              <div className="bg-blue-100 text-blue-700 p-4 rounded-2xl">
                <FileText size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Diagnosis Reports
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  82
                </h2>
              </div>

              <div className="bg-green-100 text-green-700 p-4 rounded-2xl">
                <ClipboardList size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Lab & Imaging
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  126
                </h2>
              </div>

              <div className="bg-amber-100 text-amber-700 p-4 rounded-2xl">
                <FlaskConical size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Signed Records
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  54
                </h2>
              </div>

              <div className="bg-purple-100 text-purple-700 p-4 rounded-2xl">
                <ShieldCheck size={30} />
              </div>
            </div>
          </div>
        </div>

        {/* MODULES */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            EMR/EHR Modules
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
              Electronic Medical Records
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-600">
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Diagnosis</th>
                  <th className="px-6 py-4">Doctor</th>
                  <th className="px-6 py-4">Lab Reports</th>
                  <th className="px-6 py-4">Imaging</th>
                  <th className="px-6 py-4">Treatment</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 font-medium">
                      {record.patient}
                    </td>

                    <td className="px-6 py-5">
                      {record.diagnosis}
                    </td>

                    <td className="px-6 py-5">
                      {record.doctor}
                    </td>

                    <td className="px-6 py-5">
                      {record.lab}
                    </td>

                    <td className="px-6 py-5">
                      {record.imaging}
                    </td>

                    <td className="px-6 py-5">
                      {record.treatment}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          record.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {record.status}
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