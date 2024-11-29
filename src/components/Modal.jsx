import { useState } from "react";
import { FaStar } from "react-icons/fa";
const Modal = ({ isOpen, onClose, onConfirm, message, type }) => {
  const [date, setDate] = useState("");
  const [rating, setRating] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center text-left text-white z-10">
      <div className="bg-dark-blue-800 p-5 rounded-md shadow-md w-[300px] mx-auto">
        {type === "Reschedule" ? (
          <>
            <label htmlFor="reschedule" className="text-white">
              Schedule A Date:
            </label>
            <input
              type="datetime-local"
              id="reschedule"
              className="border p-1 rounded-md mt-4 mb-1"
              onChange={(e) => setDate(e.target.value)}
            />
          </>
        ) : type === "Rating" ? (
          <>
            <label
              htmlFor="rating"
              className="text-white pb-2 text-sm"
            >{`${message}`}</label>
            <select
              name="rating"
              id="rating"
              className="bg-dark-blue-800 border-white border-2"
              required
              onChange={(e) => setRating(e.target.value)}
            >
              <option value={0}>Select rating</option>
              <option value={1}>★</option>
              <option value={2}>★★</option>
              <option value={3}>★★★</option>
              <option value={4}>★★★★</option>
              <option value={5}>★★★★★</option>
            </select>
          </>
        ) : (
          <p>{message}</p>
        )}
        <div className="mt-4 flex justify-end gap-2">
          {type === "Notes" ? (
            <button
              className="bg-blue-500 p-2 px-4 hover:bg-blue-700 hover:text-white"
              onClick={onClose}
            >
              Close
            </button>
          ) : (
            <>
              <button
                className="bg-gray-400 p-2 px-4 hover:bg-gray-600 hover:text-white"
                onClick={onClose}
              >
                {type === "Reschedule" || "Rating" ? "Cancel" : "NO"}
              </button>
              <button
                className="bg-blue-500 p-2 px-4 hover:bg-blue-700 hover:text-white"
                onClick={() => onConfirm(date, rating)}
              >
                {type === "Reschedule"
                  ? "Reschedule"
                  : type === "Rating"
                  ? "Rate"
                  : "YES"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
