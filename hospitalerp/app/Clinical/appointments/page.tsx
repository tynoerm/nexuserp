"use client";

import { useState } from "react";
import {
  CalendarDays,
  UserPlus,
  Clock3,
  Bell,
  RefreshCcw,
  ListOrdered,
  Search,
  Save,
  X,
  Users,
  Stethoscope,
  Mail,
  Phone,
  CheckCircle2,
} from "lucide-react";

export default function AppointmentSchedulingPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [appointments, setAppointments] = useState([
    {
      id: "APT-1001",
      patient: "John Dube",
      doctor: "Dr. Moyo",
      department: "Cardiology",
      date: "24 May 2026",
      time: "09:00 AM",
      reminder: "SMS Sent",
      status: "Confirmed",
    },
    {
      id: "APT-1002",
      patient: "Sarah Ncube",
      doctor: "Dr. Sibanda",
      department: "Pediatrics",
      date: "25 May 2026",
      time: "11:30 AM",
      reminder: "Email Sent",
      status: "Waiting",
    },
  ]);

  const [formData, setFormData] = useState({
    patientName: "",
    doctor: "",
    department: "",
    appointmentDate: "",
    appointmentTime: "",
    reminderType: "",
    rescheduleDate: "",
    waitingList: "",
  });

  const modules = [
    {
      title: "Online Booking",
      icon: UserPlus,
      desc: "Allow patients to book appointments online.",
    },
    {
      title: "Doctor Schedules",
      icon: Stethoscope,
      desc: "Manage doctor appointment schedules.",
    },
    {
      title: "Calendar Management",
      icon: CalendarDays,
      desc: "Organize appointments using calendar tracking.",
    },
    {
      title: "SMS/Email Reminders",
      icon: Bell,
      desc: "Send automated appointment reminders.",
    },
    {
      title: "Rescheduling",
      icon: RefreshCcw,
      desc: "Reschedule missed or delayed appointments.",
    },
    {
      title: "Waiting List Management",
      icon: ListOrdered,
      desc: "Track patients on appointment waiting lists.",
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

  const handleSaveAppointment = () => {
    if (
      !formData.patientName ||
      !formData.doctor ||
      !formData.appointmentDate
    ) {
      alert("Please complete required fields");
      return;
    }

    const newAppointment = {
      id: `APT-${Math.floor(Math.random() * 9000 + 1000)}`,
      patient: formData.patientName,
      doctor: formData.doctor,
      department: formData.department || "General",
      date: formData.appointmentDate,
      time: formData.appointmentTime || "09:00 AM",
      reminder:
        formData.reminderType || "Pending Reminder",
      status: formData.waitingList
        ? "Waiting"
        : "Confirmed",
    };

    setAppointments([newAppointment, ...appointments]);

    setFormData({
      patientName: "",
      doctor: "",
      department: "",
      appointmentDate: "",
      appointmentTime: "",
      reminderType: "",
      rescheduleDate: "",
      waitingList: "",
    });

    setOpenModal(false);
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patient
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
              Appointment & Scheduling Dashboard
            </h1>

            <p className="text-slate-300 mt-1">
              Manage bookings, doctor schedules & reminders
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-2xl font-medium shadow-lg flex items-center gap-2"
          >
            <UserPlus size={20} />
            New Appointment
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
                  Appointment Booking
                </h2>

                <p className="text-slate-500 mt-1">
                  Schedule and manage patient appointments
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

                {/* DOCTOR */}
                <div>
                  <label className="block mb-2 font-medium">
                    Doctor *
                  </label>

                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">Select Doctor</option>
                    <option value="Dr. Moyo">Dr. Moyo</option>
                    <option value="Dr. Sibanda">
                      Dr. Sibanda
                    </option>
                    <option value="Dr. Chuma">
                      Dr. Chuma
                    </option>
                  </select>
                </div>

                {/* DEPARTMENT */}
                <div>
                  <label className="block mb-2 font-medium">
                    Department
                  </label>

                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">Select Department</option>
                    <option value="Cardiology">
                      Cardiology
                    </option>
                    <option value="Pediatrics">
                      Pediatrics
                    </option>
                    <option value="Orthopedics">
                      Orthopedics
                    </option>
                    <option value="General">
                      General
                    </option>
                  </select>
                </div>

                {/* DATE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Appointment Date *
                  </label>

                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* TIME */}
                <div>
                  <label className="block mb-2 font-medium">
                    Appointment Time
                  </label>

                  <input
                    type="time"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* REMINDERS */}
                <div>
                  <label className="block mb-2 font-medium">
                    Reminder Type
                  </label>

                  <select
                    name="reminderType"
                    value={formData.reminderType}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">
                      Select Reminder
                    </option>
                    <option value="SMS Sent">
                      SMS Reminder
                    </option>
                    <option value="Email Sent">
                      Email Reminder
                    </option>
                  </select>
                </div>

                {/* RESCHEDULE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Reschedule Date
                  </label>

                  <input
                    type="date"
                    name="rescheduleDate"
                    value={formData.rescheduleDate}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* WAITING LIST */}
                <div>
                  <label className="block mb-2 font-medium">
                    Waiting List
                  </label>

                  <input
                    type="text"
                    name="waitingList"
                    value={formData.waitingList}
                    onChange={handleInputChange}
                    placeholder="Add to waiting list..."
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
                onClick={handleSaveAppointment}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-lg"
              >
                <Save size={18} />
                Save Appointment
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
                Search Appointments
              </h2>

              <p className="text-slate-500 mt-1">
                Search patient bookings and schedules
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
                  Total Appointments
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {appointments.length}
                </h2>
              </div>

              <div className="bg-blue-100 text-blue-700 p-4 rounded-2xl">
                <CalendarDays size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Doctors Scheduled
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  14
                </h2>
              </div>

              <div className="bg-green-100 text-green-700 p-4 rounded-2xl">
                <Stethoscope size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  SMS/Email Sent
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  58
                </h2>
              </div>

              <div className="bg-amber-100 text-amber-700 p-4 rounded-2xl">
                <Bell size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Waiting List
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  9
                </h2>
              </div>

              <div className="bg-purple-100 text-purple-700 p-4 rounded-2xl">
                <Users size={30} />
              </div>
            </div>
          </div>
        </div>

        {/* MODULES */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Appointment & Scheduling Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
              Appointment Records
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-600">
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Doctor</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Reminder</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.map(
                  (appointment, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-5 font-medium">
                        {appointment.patient}
                      </td>

                      <td className="px-6 py-5">
                        {appointment.doctor}
                      </td>

                      <td className="px-6 py-5">
                        {appointment.department}
                      </td>

                      <td className="px-6 py-5">
                        {appointment.date}
                      </td>

                      <td className="px-6 py-5">
                        {appointment.time}
                      </td>

                      <td className="px-6 py-5">
                        {appointment.reminder}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-4 py-1 rounded-full text-sm font-medium ${
                            appointment.status ===
                            "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {appointment.status}
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