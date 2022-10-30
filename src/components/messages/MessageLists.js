import { useRef, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { MessageListItem } from "./MessageListItem";

export const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <>
      <ListGroup variant="flush" style={{ width: "95%", margin: "1rem" }}>
        {messages.map((msg) => (
          <MessageListItem key={Math.random()} msg={msg} />
        ))}
        <span ref={messagesEndRef}></span>
      </ListGroup>
    </>
  );
};
