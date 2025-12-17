import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function SharedFile() {
  const { token } = useParams();
  const [file, setFile] = useState(null);

  useEffect(() => {
    api.get(`/share/access/${token}`).then(res => setFile(res.data));
  }, []);

  if (!file) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h2 className="text-xl font-bold">{file.originalName}</h2>
      <p>Type: {file.mimetype}</p>
      <p>Size: {(file.size / 1024).toFixed(2)} KB</p>

      <a
        href={`http://localhost:5000/uploads/${file.filename}`}
        className="text-blue-600 underline"
      >
        Download
      </a>
    </div>
  );
}
