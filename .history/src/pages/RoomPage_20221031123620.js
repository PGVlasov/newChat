import { useEffect, useState } from "react";
import { v4 } from "uuid";
import ACTIONS from "../socket/actions";
import { socket } from "../socket/socket";
import { MessageForm } from "../components/messages/MessageForm";
import { MessageList } from "../components/messages/MessageLists";
import { MyModalForGuest } from "../components/modals/ModalForGuest";
import { useParams } from "react-router";
import ChatBar from "../components/chatBar/ChatBar";
import { VideoChat } from "../components/videoChat/VideaChat";
import { Button } from "react-bootstrap";

export const RoomPage = () => {
  const [users, setUsers] = useState("");
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [isVideoStarted, setVideoStarted] = useState(false);
  const roomID = useParams();

  let author = {
    authorName: sessionStorage.getItem("userName"),
    authorId: v4(),
  };

  useEffect(() => {
    socket.emit(ACTIONS.JOIN, { room: roomID.id });
    socket.emit(ACTIONS.NEW_USER, {
      room: roomID.id,
      userName: author.authorName,
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on(ACTIONS.MESSAGE_RESPONSE, (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on(ACTIONS.NEW_USER_RESPONSE, (data) => {
      setUsers([...users, data]);
      console.log(data);
    });
  }, [users]);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    let day = new Date();
    let dd = String(day.getDate()).padStart(2, "0");
    let mm = String(day.getMonth() + 1).padStart(2, "0");
    let yyyy = day.getFullYear();
    let today = dd + "." + mm + "." + yyyy;

    let hour = day.getHours();
    let minute = day.getMinutes();
    if (parseInt(minute, 10) < 10) minute = "0" + minute;

    let moment = hour + "." + minute;

    const message = {
      author: author,
      messageText: value,
      messageId: v4(),
      createdAtDay: today,
      createdAtHour: moment,
      roomID: roomID.id,
    };
    socket.emit(ACTIONS.MESSAGE, message);

    setValue("");
  };

  console.log(users);

  if (sessionStorage.getItem("userName") === null) return <MyModalForGuest />;

  if (!isVideoStarted)
    return (
      <div
        style={{
          margin: "2rem",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            margin: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "90%",
          }}
        >
          <h2>Chat</h2>
          <MessageList messages={messages} />
          <div
            style={{
              margin: "2rem",
              display: "flex",
              flexDirection: "roe",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90%",
            }}
          >
            <MessageForm
              sendMessage={sendMessage}
              value={value}
              onChangeHandler={onChangeHandler}
            />
            <ChatBar users={users} />
            <Button onClick={() => setVideoStarted(true)}>
              Начать видеочат
            </Button>
          </div>
        </div>
      </div>
    );

  return (
    <div
      style={{
        margin: "2rem",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <VideoChat style={{ width: "30%" }} />
      <Button
        onClick={() => {
          setVideoStarted(false);
        }}
      >
        Завершить видеочат
      </Button>
    </div>
  );
};
