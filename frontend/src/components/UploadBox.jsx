export default function UploadBox({ onUpload }) {
  return (
    <label className="w-full max-w-md border-2 border-dashed border-blue-500 rounded-xl p-10 text-center cursor-pointer bg-blue-50 hover:bg-blue-100">
      <p className="text-blue-600 font-medium">
        Click to upload files
      </p>
      <input type="file" hidden multiple onChange={onUpload} />
    </label>
  );
}
