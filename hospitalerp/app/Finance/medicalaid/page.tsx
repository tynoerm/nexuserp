"use client";

import { useState } from "react";
import {
  ShieldCheck,
  BadgeDollarSign,
  ClipboardCheck,
  FileCheck2,
  Wallet,
  RefreshCcw,
  Search,
  Save,
  X,
  UserPlus,
  CheckCircle2,
  Clock3,
  Building2,
  CreditCard,
  FileText,
} from "lucide-react";

export default function MedicalAidInsurancePage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [claims, setClaims] = useState([
    {
      id: "CLAIM-1001",
      patient: "John Dube",
      provider: "Cimas Medical Aid",
      service: "IPD Admission",
      amount: "$420",
      status: "Approved",
      authorization: "AUTH-2031",
    },
    {
      id: "CLAIM-1002",
      patient: "Sarah Ncube",
      provider: "PSMAS",
      service: "Lab Billing",
      amount: "$85",
      status: "Pending",
      authorization: "AUTH-2045",
    },
  ]);

  const [formData, setFormData] = useState({
    patientName: "",
    insuranceProvider: "",
    serviceType: "",
    claimAmount: "",
    insuranceVerification: "",
    claimSubmission: "",
    authorizationTracking: "",
    medicalAidApproval: "",
    coPaymentHandling: "",
    claimsReconciliation: "",
  });

  const modules = [
    {
      title: "Insurance Verification",
      icon: ShieldCheck,
      desc: "Verify patient insurance and medical aid eligibility.",
    },
    {
      title: "Claim Submissions",
      icon: FileText,
      desc: "Submit claims electronically to medical aid providers.",
    },
    {
      title: "Authorization Tracking",
      icon: ClipboardCheck,
      desc: "Track claim authorization and approval processes.",
    },
    {
      title: "Medical Aid Approvals",
      icon: FileCheck2,
      desc: "Monitor approved and rejected medical aid requests.",
    },
    {
      title: "Co-payment Handling",
      icon: Wallet,
      desc: "Manage patient co-payments and balances.",
    },
    {
      title: "Claims Reconciliation",
      icon: RefreshCcw,
      desc: "Reconcile insurance claims with hospital billing.",
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

  const handleSaveClaim = () => {
    if (
      !formData.patientName ||
      !formData.insuranceProvider ||
      !formData.claimAmount
    ) {
      alert("Please complete required fields");
      return;
    }

    const newClaim = {
      id: `CLAIM-${Math.floor(
        Math.random() * 9000 + 1000
      )}`,
      patient: formData.patientName,
      provider: formData.insuranceProvider,
      service: formData.serviceType || "General Service",
      amount: `$${formData.claimAmount}`,
      status: "Pending",
      authorization: `AUTH-${Math.floor(
        Math.random() * 9000 + 1000
      )}`,
    };

    setClaims([newClaim, ...claims]);

    setFormData({
      patientName: "",
      insuranceProvider: "",
      serviceType: "",
      claimAmount: "",
      insuranceVerification: "",
      claimSubmission: "",
      authorizationTracking: "",
      medicalAidApproval: "",
      coPaymentHandling: "",
      claimsReconciliation: "",
    });

    setOpenModal(false);
  };

  const filteredClaims = claims.filter((claim) =>
    claim.patient
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-violet-900 via-purple-800 to-slate-900 text-white shadow-2xl">
        <div className="px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Medical Aid & Insurance Dashboard
            </h1>

            <p className="text-slate-300 mt-1">
              Claims processing, authorizations & insurance reconciliation
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-purple-600 hover:bg-purple-700 transition px-5 py-3 rounded-2xl font-medium shadow-lg flex items-center gap-2"
          >
            <UserPlus size={20} />
            New Insurance Claim
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
                  Insurance Claim Entry
                </h2>

                <p className="text-slate-500 mt-1">
                  Register and manage medical aid claims
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

                {/* PROVIDER */}
                <div>
                  <label className="block mb-2 font-medium">
                    Insurance Provider *
                  </label>

                  <select
                    name="insuranceProvider"
                    value={formData.insuranceProvider}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  >
                    <option value="">
                      Select Provider
                    </option>

                    <option value="Cimas Medical Aid">
                      Cimas Medical Aid
                    </option>

                    <option value="PSMAS">
                      PSMAS
                    </option>

                    <option value="Alliance Health">
                      Alliance Health
                    </option>

                    <option value="First Mutual Health">
                      First Mutual Health
                    </option>
                  </select>
                </div>

                {/* SERVICE TYPE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Service Type
                  </label>

                  <input
                    type="text"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    placeholder="e.g. OPD, Lab, Pharmacy"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* CLAIM AMOUNT */}
                <div>
                  <label className="block mb-2 font-medium">
                    Claim Amount *
                  </label>

                  <input
                    type="number"
                    name="claimAmount"
                    value={formData.claimAmount}
                    onChange={handleInputChange}
                    placeholder="Enter claim amount"
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                  />
                </div>

                {/* INSURANCE VERIFICATION */}
                <div>
                  <label className="block mb-2 font-medium">
                    Insurance Verification
                  </label>

                  <textarea
                    name="insuranceVerification"
                    value={formData.insuranceVerification}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Verification details..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* CLAIM SUBMISSION */}
                <div>
                  <label className="block mb-2 font-medium">
                    Claim Submission
                  </label>

                  <textarea
                    name="claimSubmission"
                    value={formData.claimSubmission}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Claim submission notes..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* AUTHORIZATION */}
                <div>
                  <label className="block mb-2 font-medium">
                    Authorization Tracking
                  </label>

                  <textarea
                    name="authorizationTracking"
                    value={formData.authorizationTracking}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Authorization tracking..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* APPROVALS */}
                <div>
                  <label className="block mb-2 font-medium">
                    Medical Aid Approvals
                  </label>

                  <textarea
                    name="medicalAidApproval"
                    value={formData.medicalAidApproval}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Approval details..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* COPAY */}
                <div>
                  <label className="block mb-2 font-medium">
                    Co-payment Handling
                  </label>

                  <textarea
                    name="coPaymentHandling"
                    value={formData.coPaymentHandling}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Co-payment information..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
                  />
                </div>

                {/* RECONCILIATION */}
                <div>
                  <label className="block mb-2 font-medium">
                    Claims Reconciliation
                  </label>

                  <textarea
                    name="claimsReconciliation"
                    value={formData.claimsReconciliation}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Claims reconciliation details..."
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 resize-none"
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
                onClick={handleSaveClaim}
                className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 shadow-lg"
              >
                <Save size={18} />
                Save Claim
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
                Search Insurance Claims
              </h2>

              <p className="text-slate-500 mt-1">
                Search medical aid claims and authorization records
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
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-purple-500"
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
                  Total Claims
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {claims.length}
                </h2>
              </div>

              <div className="bg-purple-100 text-purple-700 p-4 rounded-2xl">
                <BadgeDollarSign size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Approved Claims
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  28
                </h2>
              </div>

              <div className="bg-green-100 text-green-700 p-4 rounded-2xl">
                <CheckCircle2 size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Pending Authorizations
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  14
                </h2>
              </div>

              <div className="bg-amber-100 text-amber-700 p-4 rounded-2xl">
                <Clock3 size={30} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">
                  Insurance Providers
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  12
                </h2>
              </div>

              <div className="bg-blue-100 text-blue-700 p-4 rounded-2xl">
                <Building2 size={30} />
              </div>
            </div>
          </div>
        </div>

        {/* MODULES */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Insurance Management Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition"
                >
                  <div className="bg-purple-100 text-purple-700 p-4 rounded-2xl w-fit">
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
              Insurance Claims Records
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-600">
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Provider</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Authorization</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredClaims.map((claim, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 font-medium">
                      {claim.patient}
                    </td>

                    <td className="px-6 py-5">
                      {claim.provider}
                    </td>

                    <td className="px-6 py-5">
                      {claim.service}
                    </td>

                    <td className="px-6 py-5">
                      {claim.amount}
                    </td>

                    <td className="px-6 py-5">
                      {claim.authorization}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          claim.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {claim.status}
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