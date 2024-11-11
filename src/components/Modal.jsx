import {useState} from "react";

const Modal = ({ isOpen, onClose, onConfirm, message , type }) => {
    const [date, setDate] = useState("");
  if (!isOpen) return null;

  return (
    <div className="fixed  top-0 left-0 right-0 text-left  flex justify-center items-center">
      <div className="bg-[#02b4bd65] p-5 rounded-md shadow-md w-[300px] mx-auto">
        {type === "Reschedule" ? (
            <>
            <label htmlFor="reschedule">Schedule A Date</label>
            <input type="datetime-local" id="reschedule" className="border p-1 rounded-md" onChange={(e) => setDate(e.target.value)}/>
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
