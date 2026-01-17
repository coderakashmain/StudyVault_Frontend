import React, { useEffect, useState } from "react";
import { useAdminLogin } from "../../Context/AdminLoginCheck/AdminLoginCheck";
import useApi from "../../hooks/useApi";
import { FileText } from "lucide-react";

const AdmineControl = () => {
  const { adminToken } = useAdminLogin();
  const { get, post, loading } = useApi();

  const [pending, setPending] = useState([]);
  const [remarkMap, setRemarkMap] = useState({});
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // 🔹 Fetch pending uploads
  const fetchPending = async () => {
    const res = await get("/Admin/pending-uploads", adminToken);

    if (res?.status) {
      setPending(res.data);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  // 🔹 Approve
  const handleApprove = async (id) => {
    setActionLoadingId(id);
    const res = await post(`/Admin/submissions/${id}/approve`, adminToken);
    if (res?.status) {
      setPending((prev) => prev.filter((p) => p.id !== id));
    }
    setActionLoadingId(null);
  };

  // 🔹 Reject
  const handleReject = async (id) => {
    const remark = remarkMap[id];
    if (!remark || remark.trim().length < 5) {
      alert("Remark must be at least 5 characters");
      return;
    }

    setActionLoadingId(id);
    const res = await post(
      `/Admin/submissions/${id}/reject`,
      adminToken,
      { remark }
    );

    if (res?.status) {
      setPending((prev) => prev.filter((p) => p.id !== id));
    }
    setActionLoadingId(null);
  };

  // 🔹 Update Remark (for rejected submissions)
  const handleUpdateRemark = async (id) => {
    const remark = remarkMap[id];
    if (!remark || remark.trim().length < 5) {
      alert("Remark must be at least 5 characters");
      return;
    }

    setActionLoadingId(id);
    const res = await post(
      `/Admin/submissions/${id}/update-remark`,
      adminToken,
      { remark }
    );

    if (res?.status) {
      alert("Remark updated successfully");
    }

    setActionLoadingId(null);
  };

  const openPdf = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };



  return (
    <div className="p-6! max-w-7xl mx-auto!">
      <h1 className="text-2xl font-semibold! mb-6!">
        Pending Paper Submissions
      </h1>

      {pending.length === 0 && (
        <p className="text-gray-500">No pending submissions 🎉</p>
      )}

      <div className="space-y-4!">
        {pending.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 rounded-sm p-4! bg-white shadow-sm transition"
          >
            {/* Paper Info */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold! text-lg flex items-center gap-2!">
                  {item.title}
                

                  {/* 👁 View PDF icon */}
                  <button
                    onClick={() => openPdf(item.url)}
                    title="View PDF"
                    className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
                  >
                    <FileText color="blue" size={18} />
                  </button>

                  {/* Duplicate badge */}
                  
                </h2>

                <p className="text-sm text-gray-600">
                  {item.departmentName} • {item.years} • {item.semester}
                </p>

                <p className="text-sm text-gray-500 mt-1!">
                  Uploaded by: {item.uploaded_by_name} ({item.uploaded_by_email})
                </p>
              </div>

              <span className="text-xs text-gray-400">
                {new Date(item.created_at).toLocaleString()}
              </span>
            </div>
              {item.is_duplicate === 1 &&
                    Array.isArray(item.duplicate_titles) &&
                    item.duplicate_titles.length > 0 && (
                      
                      <div className="mt-2! bg-red-50 border border-red-200 rounded-sm p-2!">
                        <p className="text-sm mb-5!">Original : <br /> {item.title}</p>
                        <p className="text-sm font-semibold text-red-700">
                          Existing papers for this semester:
                        </p>

                        <ul className="list-disc list-inside text-sm text-red-600 mt-1!">
                          {item.duplicate_titles.map((t, idx) => (
                            <li key={idx}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    )}


            {/* Remark */}
            <textarea
              placeholder="Reject / Update remark"
              className="mt-3! w-full border border-gray-300 rounded-sm p-2! text-sm resize-none focus:outline-none focus:ring-1 focus:ring-gray-300"
              rows={2}
              value={remarkMap[item.id] || ""}
              onChange={(e) =>
                setRemarkMap({ ...remarkMap, [item.id]: e.target.value })
              }
            />

            {/* Actions */}
            <div className="flex gap-3 mt-3!">
              <button
                onClick={() => handleApprove(item.id)}
                disabled={actionLoadingId === item.id}
                className="px-4! py-1.5! cursor-pointer bg-green-600 text-white! text-sm rounded-sm hover:bg-green-700 transition disabled:opacity-50"
              >
                Approve
              </button>

              <button
                onClick={() => handleReject(item.id)}
                disabled={actionLoadingId === item.id}
                className="px-4! py-1.5! cursor-pointer bg-red-600 text-white! text-sm rounded-sm hover:bg-red-700 transition disabled:opacity-50"
              >
                Reject
              </button>

              <button
                onClick={() => handleUpdateRemark(item.id)}
                disabled={actionLoadingId === item.id}
                className="px-4! py-1.5! cursor-pointer bg-gray-700 text-white! text-sm rounded-sm hover:bg-gray-800 transition disabled:opacity-50"
              >
                Update Remark
              </button>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <p className="mt-4! text-sm text-gray-500">Processing...</p>
      )}
    </div>
  );
};

export default AdmineControl;
