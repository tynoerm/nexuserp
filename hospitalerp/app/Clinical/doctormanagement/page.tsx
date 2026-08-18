"use client";

import { useState } from "react";
import {
  UserPlus,
  Stethoscope,
  ClipboardList,
  CalendarDays,
  FileText,
  Activity,
  Pill,
  Search,
  Users,
  Building2,
  Clock3,
  BarChart3,
  Plane,
  ArrowRightLeft,
  Save,
  X,
  HeartPulse,
} from "lucide-react";

export default function DoctorManagementPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [doctors, setDoctors] = useState([
    {
      id: "DOC-1001",
      name: "Dr. Moyo",
      department: "Cardiology",
      duty: "Day Shift",
      appointments: 18,
      performance: "Excellent",
      status: "Active",
    },
    {
      id: "DOC-1002",
      name: "Dr. Sibanda",
      department: "Pediatrics",
      duty: "Night Shift",
      appointments: 12,
      performance: "Good",
      status: "On Leave",
    },
  ]);

  const [formData, setFormData] = useState({
    doctorName: "",
    department: "",
    dutyRoster: "",
    appointmentSchedule: "",
    consultationRecord: "",
    prescription: "",
    diagnosis: "",
    procedureTracking: "",
    performance: "",
    leaveManagement: "",
    referralManagement: "",
  });

  const modules = [
    {
      title: "Doctor Profiles",
      icon: Users,
      desc: "Manage doctor personal and professional records.",
    },
    {
      title: "Department Assignment",
      icon: Building2,
      desc: "Assign doctors to hospital departments.",
    },
    {
      title: "Duty Rosters",
      icon: Clock3,
      desc: "Manage doctor shifts and schedules.",
    },
    {
      title: "Appointment Schedules",
      icon: CalendarDays,
      desc: "Track and manage doctor appointments.",
    },
    {
      title: "Consultation Records",
      icon: ClipboardList,
      desc: "Maintain patient consultation records.",
    },
    {
      title: "Digital Prescriptions",
      icon: Pill,
      desc: "Generate and manage digital prescriptions.",
    },
    {
      title: "Diagnosis Records",
      icon: HeartPulse,
      desc: "Track patient diagnosis history.",
    },
    {
      title: "Procedure Tracking",
      icon: Activity,
      desc: "Monitor medical procedures performed.",
    },
    {
      title: "Performance Monitoring",
      icon: BarChart3,
      desc: "Evaluate doctor performance metrics.",
    },
    {
      title: "Leave Management",
      icon: Plane,
      desc: "Manage doctor leave requests and approvals.",
    },
    {
      title: "Referral Management",
      icon: ArrowRightLeft,
      desc: "Track referrals between specialists.",
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

  const handleSaveDoctor = () => {
    if (!formData.doctorName || !formData.department) {
      alert("Please complete required fields");
      return;
    }

    const newDoctor = {
      id: `DOC-${Math.floor(Math.random() * 9000 + 1000)}`,
      name: formData.doctorName,
      department: formData.department,
      duty: formData.dutyRoster || "Day Shift",
      appointments: Math.floor(Math.random() * 20),
      performance: formData.performance || "Good",
      status: formData.leaveManagement
        ? "On Leave"
        : "Active",
    };

    setDoctors([newDoctor, ...doctors]);

    setFormData({
      doctorName: "",
      department: "",
      dutyRoster: "",
      appointmentSchedule: "",
      consultationRecord: "",
      prescription: "",
      diagnosis: "",
      procedureTracking: "",
      performance: "",
      leaveManagement: "",
      referralManagement: "",
    });

    setOpenModal(false);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white shadow-2xl">
        <div className="px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Doctor Management Dashboard
            </h1>

            <p className="text-slate-300 mt-1">
              Manage doctors, schedules, consultations & performance
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-2xl font-medium shadow-lg flex items-center gap-2"
          >
            <UserPlus size={20} />
            Add Doctor
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
                  Doctor Registration
                </h2>

                <p className="text-slate-500 mt-1">
                  Register and manage doctor details
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
                {/* DOCTOR NAME */}
                <div>
                  <label className="block mb-2 font-medium">
                    Doctor Name *
                  </label>

                  <input
                    type="text"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleInputChange}
                    placeholder="Enter doctor name"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* DEPARTMENT */}
                <div>
                  <label className="block mb-2 font-medium">
                    Department *
                  </label>

                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">Select Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="ICU">ICU</option>
                  </select>
                </div>

                {/* DUTY ROSTER */}
                <div>
                  <label className="block mb-2 font-medium">
                    Duty Roster
                  </label>

                  <select
                    name="dutyRoster"
                    value={formData.dutyRoster}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">Select Shift</option>
                    <option value="Day Shift">Day Shift</option>
                    <option value="Night Shift">Night Shift</option>
                    <option value="Weekend Shift">Weekend Shift</option>
                  </select>
                </div>

                {/* APPOINTMENTS */}
                <div>
                  <label className="block mb-2 font-medium">
                    Appointment Schedule
                  </label>

                  <input
                    type="date"
                    name="appointmentSchedule"
                    value={formData.appointmentSchedule}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* PRESCRIPTION */}
                <div>
                  <label className="block mb-2 font-medium">
                    Digital Prescription
                  </label>

                  <input
                    type="text"
                    name="prescription"
                    value={formData.prescription}
                    onChange={handleInputChange}
                    placeholder="Paracetamol 500mg"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* PERFORMANCE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Performance
                  </label>

                  <select
                    name="performance"
                    value={formData.performance}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">Select Rating</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                  </select>
                </div>

                {/* CONSULTATION */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Consultation Records
                  </label>

                  <textarea
                    name="consultationRecord"
                    value={formData.consultationRecord}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Enter consultation records..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* DIAGNOSIS */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Diagnosis Records
                  </label>

                  <textarea
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Enter diagnosis details..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* PROCEDURE */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">
                    Procedure Tracking
                  </label>

                  <textarea
                    name="procedureTracking"
                    value={formData.procedureTracking}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Track procedures performed..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* LEAVE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Leave Management
                  </label>

                  <input
                    type="text"
                    name="leaveManagement"
                    value={formData.leaveManagement}
                    onChange={handleInputChange}
                    placeholder="Annual Leave"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* REFERRALS */}
                <div>
                  <label className="block mb-2 font-medium">
                    Referral Management
                  </label>

                  <input
                    type="text"
                    name="referralManagement"
                    value={formData.referralManagement}
                    onChange={handleInputChange}
                    placeholder="Referred to Specialist"
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
                onClick={handleSaveDoctor}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-lg"
              >
                <Save size={18} />
                Save Doctor
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
                Search Doctors
              </h2>

              <p className="text-slate-500 mt-1">
                Search doctor profiles and schedules
              </p>
            </div>

            <div className="relative w-full lg:w-[400px]">
              <Search
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search doctor..."
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
                <p className="text-slate-500">Total Doctors</p>
                <h2 className="text-3xl font-bold mt-2">
                  {doctors.length}
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
                <p className="text-slate-500">Appointments</p>
                <h2 className="text-3xl font-bold mt-2">86</h2>
              </div>

              <div className="bg-green-100 text-green-700 p-4 rounded-2xl">
                <CalendarDays size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">Procedures</p>
                <h2 className="text-3xl font-bold mt-2">34</h2>
              </div>

              <div className="bg-amber-100 text-amber-700 p-4 rounded-2xl">
                <Activity size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">Doctors On Leave</p>
                <h2 className="text-3xl font-bold mt-2">3</h2>
              </div>

              <div className="bg-purple-100 text-purple-700 p-4 rounded-2xl">
                <Plane size={30} />
              </div>
            </div>
          </div>
        </div>

        {/* MODULES */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Doctor Management Modules
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
              Doctor Records
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-600">
                  <th className="px-6 py-4">Doctor</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Duty</th>
                  <th className="px-6 py-4">Appointments</th>
                  <th className="px-6 py-4">Performance</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredDoctors.map((doctor, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 font-medium">
                      {doctor.name}
                    </td>

                    <td className="px-6 py-5">
                      {doctor.department}
                    </td>

                    <td className="px-6 py-5">
                      {doctor.duty}
                    </td>

                    <td className="px-6 py-5">
                      {doctor.appointments}
                    </td>

                    <td className="px-6 py-5">
                      {doctor.performance}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          doctor.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {doctor.status}
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