import { useEffect, useState } from "react";
import api from "../services/api";
import UploadBox from "../components/UploadBox";
import FileCard from "../components/FileCard";

export default function Dashboard() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    api.get("/files").then(res => setFiles(res.data));
  }, []);

  const upload = async e => {
    const data = new FormData();
    for (let f of e.target.files) data.append("file", f);

    const res = await api.post("/files/upload", data);

    const uploaded = Array.isArray(res.data) ? res.data : [res.data];
    setFiles(prev => [...uploaded, ...prev]);
    e.target.value = "";
  };

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-center mb-10">
          <UploadBox onUpload={upload} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {files.map(f => (
            <FileCard key={f._id} file={f} />
          ))}
        </div>

      </div>
    </div>
  );
}
