import { ListGroup, Card } from "react-bootstrap";

export const MessageListItem = ({ msg }) => {
  const { messageText, createdAtDay, createdAtHour, author } = msg.data;
  let currentUser = false;

  if (sessionStorage.getItem("userName") === author.authorName) {
    currentUser = true;
  }

  return (
    <ListGroup.Item
      className={`d-flex ${currentUser ? "justify-content-end" : ""}`}
    >
      <Card
        bg={`${currentUser ? "primary" : "secondary"}`}
        text="light"
        style={{ width: "55%" }}
      >
        <Card.Header className="d-flex justify-content-between align-items-center">
          <Card.Text className="small">
            Отправлено {author.authorName} {createdAtDay} в {createdAtHour}
          </Card.Text>
        </Card.Header>
        <Card.Body className="d-flex justify-content-between align-items-center">
          <Card.Text>{messageText}</Card.Text>
        </Card.Body>
      </Card>
    </ListGroup.Item>
  );
};
