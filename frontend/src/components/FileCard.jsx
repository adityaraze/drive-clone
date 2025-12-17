import { useState } from "react";
import api from "../services/api";

// 🔑 Helper to get readable file type
const getFileType = (file) => {
  if (file.mimetype) {
    if (file.mimetype.includes("pdf")) return "PDF Document";
    if (file.mimetype.includes("image")) return "Image";
    if (file.mimetype.includes("video")) return "Video";
    if (file.mimetype.includes("csv")) return "CSV File";
    return file.mimetype;
  }

  // fallback using filename extension
  if (file.originalName) {
    const ext = file.originalName.split(".").pop().toUpperCase();
    return `${ext} File`;
  }

  return "Unknown";
};

export default function FileCard({ file }) {
  const [email, setEmail] = useState("");

  const shareWithUser = async () => {
    if (!email) {
      alert("Please enter user email");
      return;
    }
    await api.post(`/files/share/user/${file._id}`, { email });
    alert("File shared with user");
    setEmail("");
  };

  const shareLink = async () => {
    const res = await api.post(`/share/${file._id}`);
    alert(res.data.link);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
      {/* Filename */}
      <h3 className="font-semibold text-gray-800 truncate">
        {file.originalName}
      </h3>

      {/* Metadata */}
      <div className="text-sm text-gray-600 mt-2 space-y-1">
        <p>
          <span className="font-medium">Type:</span>{" "}
          {getFileType(file)}
        </p>
        <p>
          <span className="font-medium">Size:</span>{" "}
          {(file.size / 1024).toFixed(2)} KB
        </p>
        <p>
          <span className="font-medium">Uploaded:</span>{" "}
          {new Date(file.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Share with user */}
      <input
        className="border p-2 mt-4 w-full rounded text-sm"
        placeholder="User email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button
        onClick={shareWithUser}
        className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Share with User
      </button>

      {/* Share via link */}
      <button
        onClick={shareLink}
        className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Share via Link
      </button>
    </div>
  );
}
