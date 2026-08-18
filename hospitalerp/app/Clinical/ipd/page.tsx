"use client";

import { useState } from "react";
import {
  Bed,
  Building2,
  UserPlus,
  ClipboardList,
  Stethoscope,
  UtensilsCrossed,
  FileText,
  ArrowRightLeft,
  Search,
  Users,
  HeartPulse,
  CalendarDays,
  X,
  Save,
} from "lucide-react";

export default function IPDPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [patients, setPatients] = useState([
    {
      id: "IPD-1001",
      name: "John Dube",
      ward: "Ward A",
      bed: "Bed 12",
      doctor: "Dr. Moyo",
      diagnosis: "Pneumonia",
      diet: "Low Sodium",
      admission: "20 May 2026",
      status: "Admitted",
    },
    {
      id: "IPD-1002",
      name: "Sarah Ncube",
      ward: "Ward C",
      bed: "Bed 7",
      doctor: "Dr. Sibanda",
      diagnosis: "Diabetes",
      diet: "Diabetic Diet",
      admission: "21 May 2026",
      status: "Under Review",
    },
  ]);

  const [formData, setFormData] = useState({
    patientName: "",
    ward: "",
    bed: "",
    doctor: "",
    diagnosis: "",
    nursingNotes: "",
    doctorRounds: "",
    diet: "",
    dischargeSummary: "",
    transferWard: "",
    admissionDate: "",
  });

  const modules = [
    {
      title: "Admission Management",
      icon: UserPlus,
      desc: "Manage inpatient admissions and registration.",
    },
    {
      title: "Ward Allocation",
      icon: Building2,
      desc: "Assign patients to available hospital wards.",
    },
    {
      title: "Bed Management",
      icon: Bed,
      desc: "Track occupied and available beds.",
    },
    {
      title: "Nursing Notes",
      icon: ClipboardList,
      desc: "Record daily nursing observations and care.",
    },
    {
      title: "Daily Doctor Rounds",
      icon: Stethoscope,
      desc: "Track doctor reviews and ward rounds.",
    },
    {
      title: "Diet Management",
      icon: UtensilsCrossed,
      desc: "Manage patient meal plans and diet schedules.",
    },
    {
      title: "Discharge Summaries",
      icon: FileText,
      desc: "Generate patient discharge reports.",
    },
    {
      title: "Ward Transfers",
      icon: ArrowRightLeft,
      desc: "Transfer patients between hospital wards.",
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

  const handleSaveAdmission = () => {
    if (!formData.patientName || !formData.doctor) {
      alert("Please complete required fields");
      return;
    }

    const newPatient = {
      id: `IPD-${Math.floor(Math.random() * 9000 + 1000)}`,
      name: formData.patientName,
      ward: formData.ward || "Ward A",
      bed: formData.bed || "Bed 1",
      doctor: formData.doctor,
      diagnosis: formData.diagnosis || "Pending",
      diet: formData.diet || "General Diet",
      admission: formData.admissionDate || "Today",
      status: "Admitted",
    };

    setPatients([newPatient, ...patients]);

    setFormData({
      patientName: "",
      ward: "",
      bed: "",
      doctor: "",
      diagnosis: "",
      nursingNotes: "",
      doctorRounds: "",
      diet: "",
      dischargeSummary: "",
      transferWard: "",
      admissionDate: "",
    });

    setOpenModal(false);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white shadow-2xl">
        <div className="px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              IPD Management Dashboard
            </h1>

            <p className="text-slate-300 mt-1">
              Inpatient Department • Admission & Ward Management
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-2xl font-medium shadow-lg flex items-center gap-2"
          >
            <UserPlus size={20} />
            New Admission
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
                  IPD Admission Entry
                </h2>

                <p className="text-slate-500 mt-1">
                  Register inpatient admission details
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
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* DOCTOR */}
                <div>
                  <label className="block mb-2 font-medium">
                    Assigned Doctor *
                  </label>

                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select Doctor</option>
                    <option value="Dr. Moyo">Dr. Moyo</option>
                    <option value="Dr. Sibanda">Dr. Sibanda</option>
                    <option value="Dr. Chuma">Dr. Chuma</option>
                  </select>
                </div>

                {/* WARD */}
                <div>
                  <label className="block mb-2 font-medium">
                    Ward Allocation
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
                    <option value="Ward C">Ward C</option>
                    <option value="ICU">ICU</option>
                  </select>
                </div>

                {/* BED */}
                <div>
                  <label className="block mb-2 font-medium">
                    Bed Number
                  </label>

                  <input
                    type="text"
                    name="bed"
                    value={formData.bed}
                    onChange={handleInputChange}
                    placeholder="Bed 12"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* ADMISSION DATE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Admission Date
                  </label>

                  <input
                    type="date"
                    name="admissionDate"
                    value={formData.admissionDate}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* DIET */}
                <div>
                  <label className="block mb-2 font-medium">
                    Diet Plan
                  </label>

                  <input
                    type="text"
                    name="diet"
                    value={formData.diet}
                    onChange={handleInputChange}
                    placeholder="Low Sodium Diet"
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

                {/* DOCTOR ROUNDS */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Daily Doctor Rounds
                  </label>

                  <textarea
                    name="doctorRounds"
                    value={formData.doctorRounds}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Enter doctor round notes..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* DIAGNOSIS */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Diagnosis
                  </label>

                  <textarea
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Enter diagnosis..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* DISCHARGE SUMMARY */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Discharge Summary
                  </label>

                  <textarea
                    name="dischargeSummary"
                    value={formData.dischargeSummary}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Enter discharge summary..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* TRANSFER */}
                <div>
                  <label className="block mb-2 font-medium">
                    Transfer Ward
                  </label>

                  <select
                    name="transferWard"
                    value={formData.transferWard}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">Select Transfer Ward</option>
                    <option value="Ward A">Ward A</option>
                    <option value="Ward B">Ward B</option>
                    <option value="Ward C">Ward C</option>
                    <option value="ICU">ICU</option>
                  </select>
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
                onClick={handleSaveAdmission}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-lg"
              >
                <Save size={18} />
                Save Admission
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
                Search IPD Patients
              </h2>

              <p className="text-slate-500 mt-1">
                Search admissions and ward allocations
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
                <p className="text-slate-500">Admitted Patients</p>

                <h2 className="text-3xl font-bold mt-2">
                  {patients.length}
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
                <p className="text-slate-500">Available Beds</p>

                <h2 className="text-3xl font-bold mt-2">48</h2>
              </div>

              <div className="bg-green-100 text-green-700 p-4 rounded-2xl">
                <Bed size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">Doctor Rounds</p>

                <h2 className="text-3xl font-bold mt-2">16</h2>
              </div>

              <div className="bg-amber-100 text-amber-700 p-4 rounded-2xl">
                <HeartPulse size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">Discharges Today</p>

                <h2 className="text-3xl font-bold mt-2">9</h2>
              </div>

              <div className="bg-purple-100 text-purple-700 p-4 rounded-2xl">
                <CalendarDays size={30} />
              </div>
            </div>
          </div>
        </div>

        {/* MODULES */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            IPD Modules
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
              IPD Admissions
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-600">
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Ward</th>
                  <th className="px-6 py-4">Bed</th>
                  <th className="px-6 py-4">Doctor</th>
                  <th className="px-6 py-4">Diagnosis</th>
                  <th className="px-6 py-4">Diet</th>
                  <th className="px-6 py-4">Admission</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredPatients.map((patient, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 font-medium">
                      {patient.name}
                    </td>

                    <td className="px-6 py-5">
                      {patient.ward}
                    </td>

                    <td className="px-6 py-5">
                      {patient.bed}
                    </td>

                    <td className="px-6 py-5">
                      {patient.doctor}
                    </td>

                    <td className="px-6 py-5">
                      {patient.diagnosis}
                    </td>

                    <td className="px-6 py-5">
                      {patient.diet}
                    </td>

                    <td className="px-6 py-5">
                      {patient.admission}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          patient.status === "Admitted"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {patient.status}
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