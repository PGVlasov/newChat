import { ListGroup } from "react-bootstrap";

export const ChatBar = () => {
  let users = [
    { name: "user1" },
    { name: "user2" },
    { name: "user3" },
    { name: "user4" },
  ];

  if (!users) return <div>Пользователи подключаются...</div>;
  return (
    <div className="chat__sidebar">
      <h4>Пользователи онлайн</h4>

      <div>
        <ListGroup variant="flush" style={{ width: "50%", margin: "1rem" }}>
          {users.map((user) => (
            <ListGroup.Item action variant="success" key={Math.random()}>
              {user}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default ChatBar;
