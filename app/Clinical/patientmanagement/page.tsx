"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Search,
  Users,
  FileText,
  HeartPulse,
  Clock3,
  UserCircle2,
  Activity,
  ChevronRight,
  X,
  Save,
} from "lucide-react";

// Same signature trace used on the main dashboard header, reused here so the
// two pages read as one product rather than two different UIs.
function PulseTrace() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full opacity-[0.18]"
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M0,40 L280,40 L310,10 L335,70 L360,40 L420,40 L445,25 L465,40 L1200,40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
    </svg>
  );
}

type FormState = {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  phone: string;
  nationalId: string;
  allergies: string;
  nextOfKin: string;
  address: string;
  visitType: string;
};

type Patient = {
  name: string;
  id: string;
  gender: string;
  age: number;
  visit: string;
  status: "Active" | "Admitted";
};

export default function PatientManagementPage() {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [patients, setPatients] = useState<Patient[]>([
    {
      name: "John Dube",
      id: "PT-10021",
      gender: "Male",
      age: 42,
      visit: "General Checkup",
      status: "Active",
    },
    {
      name: "Rumbidzai Moyo",
      id: "PT-10022",
      gender: "Female",
      age: 31,
      visit: "Cardiology",
      status: "Admitted",
    },
  ]);

  const [formData, setFormData] = useState<FormState>({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    phone: "",
    nationalId: "",
    allergies: "",
    nextOfKin: "",
    address: "",
    visitType: "",
  });

  const modules = [
    {
      title: "Patient Registration",
      icon: UserPlus,
      desc: "Register new patients and generate hospital records.",
    },
    {
      title: "Patient Profiles",
      icon: UserCircle2,
      desc: "Manage complete patient demographic information.",
    },
    {
      title: "Medical History",
      icon: FileText,
      desc: "Track diagnoses and patient treatments.",
    },
    {
      title: "Allergies",
      icon: HeartPulse,
      desc: "Manage allergy and reaction records.",
    },
    {
      title: "Visit History",
      icon: Clock3,
      desc: "Track consultations and appointments.",
    },
    {
      title: "Patient Tracking",
      icon: Search,
      desc: "Search and monitor patient activities.",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleRegisterPatient = () => {
    if (!formData.firstName || !formData.lastName || !formData.gender || !formData.dob) {
      alert("Please complete all required fields");
      return;
    }

    const newPatient: Patient = {
      name: `${formData.firstName} ${formData.lastName}`,
      id: `PT-${Math.floor(Math.random() * 90000 + 10000)}`,
      gender: formData.gender,
      age: calculateAge(formData.dob),
      visit: formData.visitType || "General Consultation",
      status: "Active",
    };

    setPatients([newPatient, ...patients]);

    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      phone: "",
      nationalId: "",
      allergies: "",
      nextOfKin: "",
      address: "",
      visitType: "",
    });

    setOpenModal(false);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  const statusTone: Record<Patient["status"], string> = {
    Active: "bg-teal-50 text-teal-700",
    Admitted: "bg-amber-50 text-amber-700",
  };

  return (
    <div className="min-h-screen bg-[#F6F5F1] text-slate-800">
      {/* HEADER */}
      <header className="relative overflow-hidden bg-gradient-to-r from-[#0F2A3B] via-[#173B4F] to-[#0F2A3B] text-white shadow-md">
        <div className="relative z-10 px-6 py-6 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Patient Management
            </h1>
            <p className="text-slate-300 text-sm mt-0.5">
              Hospital ERP · Patient records & tracking
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium flex items-center gap-2 shadow-sm transition"
          >
            <UserPlus size={16} />
            Register patient
          </button>
        </div>

        <PulseTrace />
      </header>

      {/* REGISTER MODAL */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4"
            onClick={() => setOpenModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* MODAL HEADER */}
              <div className="flex justify-between items-center px-7 py-5 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    Register new patient
                  </h2>
                  <p className="text-slate-500 text-sm mt-0.5">
                    Complete patient registration form
                  </p>
                </div>
                <button
                  onClick={() => setOpenModal(false)}
                  aria-label="Close"
                  className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                  <X size={20} />
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="p-7 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">
                      First name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">
                      Last name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">
                      Date of birth *
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">
                      Phone number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="077..."
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">
                      National ID / passport
                    </label>
                    <input
                      type="text"
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleInputChange}
                      placeholder="63-..."
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Patient address"
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">
                      Allergies
                    </label>
                    <input
                      type="text"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleInputChange}
                      placeholder="Penicillin..."
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">
                      Next of kin
                    </label>
                    <input
                      type="text"
                      name="nextOfKin"
                      value={formData.nextOfKin}
                      onChange={handleInputChange}
                      placeholder="Relative name"
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">
                      Visit type
                    </label>
                    <select
                      name="visitType"
                      value={formData.visitType}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    >
                      <option value="">Select visit type</option>
                      <option value="General Consultation">General Consultation</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Laboratory">Laboratory</option>
                      <option value="Radiology">Radiology</option>
                      <option value="Maternity">Maternity</option>
                      <option value="Cardiology">Cardiology</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="px-7 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                <button
                  onClick={() => setOpenModal(false)}
                  className="px-5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-200 transition text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegisterPatient}
                  className="px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium flex items-center gap-2 shadow-sm transition"
                >
                  <Save size={16} />
                  Save patient
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN */}
      <main className="p-6 md:p-8">
        {/* SEARCH */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-7">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Search patient records
              </h2>
              <p className="text-slate-500 text-sm mt-0.5">
                Search patients by name
              </p>
            </div>

            <div className="relative w-full lg:w-[420px]">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={17}
              />
              <input
                type="text"
                placeholder="Search patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm">Total patients</p>
                <h2 className="text-2xl font-semibold mt-1.5 tracking-tight">
                  {patients.length}
                </h2>
              </div>
              <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700">
                <Users size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm">Today's visits</p>
                <h2 className="text-2xl font-semibold mt-1.5 tracking-tight">
                  324
                </h2>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
                <Activity size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* MODULES */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Patient modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700">
                      <Icon size={20} />
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </div>

                  <h3 className="text-base font-semibold mt-4 text-slate-800">
                    {module.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">{module.desc}</p>

                  <button className="mt-5 w-full bg-slate-50 hover:bg-teal-600 hover:text-white py-2.5 rounded-lg transition text-sm font-medium">
                    Open module
                  </button>
                </div>
              );
            })}
          </div>
        </div>


        

        {/* PATIENT TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">
              Patient records
            </h2>
            <p className="text-slate-500 text-sm mt-0.5">
              {filteredPatients.length} of {patients.length} shown
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-100">
                  <th className="px-6 py-3 font-medium">Patient</th>
                  <th className="px-6 py-3 font-medium">Patient ID</th>
                  <th className="px-6 py-3 font-medium">Gender</th>
                  <th className="px-6 py-3 font-medium">Age</th>
                  <th className="px-6 py-3 font-medium">Department</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredPatients.map((patient, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition"
                  >
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-500">
                      {patient.id}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{patient.gender}</td>
                    <td className="px-6 py-4 text-slate-600">{patient.age}</td>
                    <td className="px-6 py-4 text-slate-600">{patient.visit}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusTone[patient.status]}`}
                      >
                        {patient.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredPatients.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500 text-sm">
                      No patients match "{search}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="h-6" />
      </main>
    </div>
  );
}
