import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { io } from "socket.io-client";
import "../../css/Chat.css";

const URL = import.meta.env.VITE_BASE_URL;
const socket = io(URL);

const Chat = () => {
  const { patient } = useOutletContext();
  const { doctors } = patient.data;

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [prevMessages, setPrevMessages] = useState([]);
  const [doctorId, setDoctorId] = useState("");

  useEffect(() => {
    if (room) {
      const localChat = JSON.parse(localStorage.getItem(room)) || [];
      setPrevMessages(localChat);

      socket.on("receive_message", (data) => {
        setPrevMessages((prev) => {
          const updatedMessages = [...prev, data];
          localStorage.setItem(room, JSON.stringify(updatedMessages));
          return updatedMessages;
        });
      });
    }

    return () => {
      socket.off("receive_message");
    };
  }, [room]);

  const handleClick = () => {
    const patientId = patient.data._id;
    if (message.trim()) {
      socket.emit("send_message", {
        patientId,
        doctorId,
        message,
        senderRole: "Patient",
      });
      setMessage("");
    }
  };

  const handleUser = (id) => {
    const patientId = patient.data._id;
    if (patientId && id) {
      const roomName = `${patientId}-${id}`;
      setRoom(roomName);
      setDoctorId(id);
      setPrevMessages(JSON.parse(localStorage.getItem(roomName)) || []);
      socket.emit("join_room", { patientId, doctorId: id });
    }
  };

  const chosenDoctor = doctors.find((doctor) => doctor._id === doctorId);

  return (
    <div className="bg-[#02b4bd2c] p-5">
      <div className="flex gap-6 w-full flex-wrap">
        {doctors.length > 0 ?doctors.map(({ picture, last_name, _id }, id) => (
          <div key={id} className="cursor-pointer w-14">
            <img src={picture} alt="doctor" className="rounded-full object-cover" onClick={() => handleUser(_id)} />
            <p className="text-center text-sm">{`Dr. ${last_name}`}</p>
          </div>
        )): <p className="flex justify-center items-center mx-auto h-[70vh]">No Doctors Available. Try Book An Appointment Or Refresh</p>}
      </div>

      {doctorId && (
        <section className="h-[80vh] bg-[#02b4bd2c] mt-5 rounded overflow-auto relative">
          <div className="cursor-pointer bg-[#02b4bdd5] sticky py-2 top-0">
            <img
              src={chosenDoctor.picture}
              alt="doctor"
              className="w-7 inline rounded-full object-cover"
              onClick={() => handleUser(_id)}
            />
            <p className="text-sm inline">{`${chosenDoctor.first_name} ${chosenDoctor.last_name}`}</p>
          </div>
          <div className="messages">
            {prevMessages.length === 0 ? (
              <p>No messages yet. Start the conversation!</p>
            ) : (
              prevMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.senderRole === "Patient" ? "patients" : "doctor"
                  }`}
                >
                  <p>{msg.message}</p>
                  <p className="message-time">{msg.time}</p>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {doctorId && (
        <section className="flex items-center gap-5 mt-5">
          <input
            type="text"
            className="w-[95%] bg-[#02b4bd2c] placeholder:text-black"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
          />
          <MdSend
            className="text-3xl text-dark-blue-800 -mt-5 cursor-pointer"
            onClick={handleClick}
          />
        </section>
      )}
    </div>
  );
};

export default Chat;
