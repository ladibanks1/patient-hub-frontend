import {useState} from "react";

const Modal = ({ isOpen, onClose, onConfirm, message , type }) => {
    const [date, setDate] = useState("");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center text-left text-white z-10">
      <div className="bg-dark-blue-800 p-5 rounded-md shadow-md w-[300px] mx-auto">
        {type === "Reschedule" ? (
            <>
            <label htmlFor="reschedule" className="text-white">Schedule A Date:</label>
            <input type="datetime-local" id="reschedule" className="border p-1 rounded-md mt-4 mb-1" onChange={(e) => setDate(e.target.value)}/>
            </>
        ) : (
            <p>{message}</p>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="bg-gray-400 p-2 px-4 hover:bg-gray-600 hover:text-white"
            onClick={onClose}
          >
            {type === "Reschedule" ? "Cancel" : "NO"}
          </button>
          <button
            className="bg-blue-500 p-2 px-4 hover:bg-blue-700 hover:text-white"
            onClick={() => onConfirm(date)}
          >
            {type === "Reschedule" ? "Reschedule" : "YES"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
