"use client";

import { useState } from "react";
import {
  UserPlus,
  Users,
  Stethoscope,
  Activity,
  ClipboardList,
  DollarSign,
  Clock3,
  Search,
  UserCheck,
  HeartPulse,
  CalendarDays,
  FileText,
  Pill,
  X,
  Save,
} from "lucide-react";



export default function OPDPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [patients, setPatients] = useState([
    {
      id: "OPD-1001",
      name: "John Dube",
      doctor: "Dr. Moyo",
      vitals: "BP: 120/80",
      diagnosis: "Malaria",
      billing: "$35",
      status: "Waiting",
      followup: "25 May 2026",
    },
    {
      id: "OPD-1002",
      name: "Sarah Ncube",
      doctor: "Dr. Sibanda",
      vitals: "BP: 110/70",
      diagnosis: "Flu",
      billing: "$20",
      status: "Consulting",
      followup: "28 May 2026",
    },
  ]);

  const [formData, setFormData] = useState({
    patientName: "",
    doctor: "",
    temperature: "",
    bloodPressure: "",
    pulse: "",
    consultationNotes: "",
    diagnosis: "",
    prescription: "",
    billing: "",
    followup: "",
  });

  const modules = [
    {
      title: "Walk-in Consultations",
      icon: UserPlus,
      desc: "Register walk-in patients for consultations.",
    },
    {
      title: "Queue Management",
      icon: Clock3,
      desc: "Track waiting patients and queue flow.",
    },
    {
      title: "Doctor Assignment",
      icon: UserCheck,
      desc: "Assign doctors to outpatient consultations.",
    },
    {
      title: "Consultation Notes",
      icon: ClipboardList,
      desc: "Record doctor consultation notes.",
    },
    {
      title: "Follow-up Scheduling",
      icon: CalendarDays,
      desc: "Schedule return visits and reviews.",
    },
    {
      title: "Vital Signs Recording",
      icon: HeartPulse,
      desc: "Capture patient vitals before consultation.",
    },
    {
      title: "OPD Billing",
      icon: DollarSign,
      desc: "Generate and manage outpatient billing.",
    },
    {
      title: "Prescription Management",
      icon: Pill,
      desc: "Manage patient prescriptions and medication.",
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

  const handleSaveConsultation = () => {
    if (!formData.patientName || !formData.doctor) {
      alert("Please complete required fields");
      return;
    }

    const newPatient = {
      id: `OPD-${Math.floor(Math.random() * 9000 + 1000)}`,
      name: formData.patientName,
      doctor: formData.doctor,
      vitals: `BP: ${formData.bloodPressure}`,
      diagnosis: formData.diagnosis || "Pending",
      billing: `$${formData.billing || 0}`,
      status: "Waiting",
      followup: formData.followup || "N/A",
    };

    setPatients([newPatient, ...patients]);

    setFormData({
      patientName: "",
      doctor: "",
      temperature: "",
      bloodPressure: "",
      pulse: "",
      consultationNotes: "",
      diagnosis: "",
      prescription: "",
      billing: "",
      followup: "",
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
              OPD Management Dashboard
            </h1>

            <p className="text-slate-300 mt-1">
              Outpatient Department • Consultations & Queue Tracking
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-2xl font-medium shadow-lg flex items-center gap-2"
          >
            <UserPlus size={20} />
            New Consultation
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
                  OPD Consultation Entry
                </h2>

                <p className="text-slate-500 mt-1">
                  Register outpatient consultation
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
                    Assign Doctor *
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

                {/* TEMPERATURE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Temperature
                  </label>

                  <input
                    type="text"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    placeholder="36.5°C"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* BLOOD PRESSURE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Blood Pressure
                  </label>

                  <input
                    type="text"
                    name="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={handleInputChange}
                    placeholder="120/80"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* PULSE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Pulse Rate
                  </label>

                  <input
                    type="text"
                    name="pulse"
                    value={formData.pulse}
                    onChange={handleInputChange}
                    placeholder="72 bpm"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* BILLING */}
                <div>
                  <label className="block mb-2 font-medium">
                    OPD Billing
                  </label>

                  <input
                    type="number"
                    name="billing"
                    value={formData.billing}
                    onChange={handleInputChange}
                    placeholder="35"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* FOLLOWUP */}
                <div>
                  <label className="block mb-2 font-medium">
                    Follow-up Date
                  </label>

                  <input
                    type="date"
                    name="followup"
                    value={formData.followup}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* PRESCRIPTION */}
                <div>
                  <label className="block mb-2 font-medium">
                    Prescription
                  </label>

                  <input
                    type="text"
                    name="prescription"
                    value={formData.prescription}
                    onChange={handleInputChange}
                    placeholder="Paracetamol"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* CONSULTATION NOTES */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Consultation Notes
                  </label>

                  <textarea
                    name="consultationNotes"
                    value={formData.consultationNotes}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Enter consultation notes..."
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
                onClick={handleSaveConsultation}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-lg"
              >
                <Save size={18} />
                Save Consultation
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
                Search OPD Patients
              </h2>

              <p className="text-slate-500 mt-1">
                Search consultations and queue records
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
                <p className="text-slate-500">Queue Patients</p>

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
                <p className="text-slate-500">Doctors Available</p>

                <h2 className="text-3xl font-bold mt-2">12</h2>
              </div>

              <div className="bg-green-100 text-green-700 p-4 rounded-2xl">
                <Stethoscope size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">Today's Billing</p>

                <h2 className="text-3xl font-bold mt-2">$1,240</h2>
              </div>

              <div className="bg-amber-100 text-amber-700 p-4 rounded-2xl">
                <DollarSign size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">Follow-ups</p>

                <h2 className="text-3xl font-bold mt-2">28</h2>
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
            OPD Modules
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
              OPD Consultation Queue
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-600">
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Doctor</th>
                  <th className="px-6 py-4">Vitals</th>
                  <th className="px-6 py-4">Diagnosis</th>
                  <th className="px-6 py-4">Billing</th>
                  <th className="px-6 py-4">Follow-up</th>
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
                      {patient.doctor}
                    </td>

                    <td className="px-6 py-5">
                      {patient.vitals}
                    </td>

                    <td className="px-6 py-5">
                      {patient.diagnosis}
                    </td>

                    <td className="px-6 py-5">
                      {patient.billing}
                    </td>

                    <td className="px-6 py-5">
                      {patient.followup}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          patient.status === "Waiting"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
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