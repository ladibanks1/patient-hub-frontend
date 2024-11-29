import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { io } from "socket.io-client";
import "../../css/Chat.css";

const URL = import.meta.env.VITE_BASE_URL;
const socket = io(URL);

const Chat = () => {
  const { staff: doctor } = useOutletContext();
  const { patients } = doctor;

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [prevMessages, setPrevMessages] = useState([]);
  const [patientId, setPatientId] = useState("");

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
    const doctorId = doctor._id;
    if (message.trim()) {
      socket.emit("send_message", {
        doctorId,
        patientId,
        message,
        senderRole: "Doctor",
      });
      setMessage("");
    }
  };

  const handleUser = (id) => {
    const doctorId = doctor._id;
    if (doctorId && id) {
      const roomName = `${id}-${doctorId}`;
      setRoom(roomName);
      setPatientId(id);
      setPrevMessages(JSON.parse(localStorage.getItem(roomName)) || []);
      socket.emit("join_room", { doctorId, patientId: id });
    }
  };

  const chosenPatient = patients.find((patient) => patient._id === patientId);

  return (
    <div className="bg-[#02b4bd2c] p-5">
      <div className="flex gap-6 w-full flex-wrap">
        {patients.length > 0 ? (
          patients.map(({ picture, last_name, first_name, _id }, id) => (
            <div key={id} className="cursor-pointer w-14">
              <img
                src={picture}
                alt="patient"
                className="w-7 rounded-full object-cover"
                onClick={() => handleUser(_id)}
              />
              <p className="text-center text-sm">{`${first_name} ${last_name}`}</p>
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center mx-auto h-[70vh]">
            It seems like you're not currently assigned to a patient.
            <br /> Please try refreshing the page or check back later.
          </p>
        )}
      </div>

      {patientId && (
        <section className="h-[80vh] bg-[#02b4bd2c] mt-5 rounded overflow-auto relative">
          <div className="cursor-pointer bg-[#02b4bdd5] sticky py-2 top-0">
            <img
              src={chosenPatient.picture}
              alt="doctor"
              className="w-10 inline rounded-full object-cover"
              onClick={() => handleUser(_id)}
            />
            <p className="text-sm inline">{`${chosenPatient.first_name} ${chosenPatient.last_name}`}</p>
          </div>
          <div className="messages">
            {prevMessages.length === 0 ? (
              <p>No messages yet. Start the conversation!</p>
            ) : (
              prevMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.senderRole === "Patient" ? "patient" : "doctors"
                  }`}
                >
                  {console.log(msg)}
                  <p>{msg.message}</p>
                  <p className="message-time">{msg.time}</p>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {patientId && (
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
